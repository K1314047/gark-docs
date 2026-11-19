# 纯 IPv6 VPS 部署 sing-box 完整指南

> 发布于 2026-11-19
> 适用环境：HaloCloud 香港纯 IPv6 NAT 型 VPS（Alpine Linux 3.21 容器）
> 目标：给机器加 IPv4 出口（Cloudflare WARP）+ 部署 sing-box（hysteria2 + Shadowsocks）

## 0. 环境特点（先记住这些坑）

| 特点 | 影响 | 对策 |
|---|---|---|
| 只有 IPv6，无公网 IPv4 | 访问不了 GitHub 等纯 IPv4 服务 | 先装 WARP 拿 IPv4 出口 |
| 公网 IPv6 是商家 NAT66 映射 | **地址可能变化** | 随时用 `iplinks` 查最新链接 |
| busybox wget 是精简版 | 不支持 `-N` 等参数，且只走 IPv4 | 一律用 curl；需要时 `apk add wget` 装 GNU 版 |
| Alpine 没有 systemd | 233boy/Misaka 等一键脚本用不了 | sing-box 手动装 + OpenRC 服务 |
| 无 NAT64 | 没有免费 IPv4 通道 | 同上，WARP 是唯一出路 |

环境自检命令：

```bash
ping 2606:4700:4700::1111        # IPv6 出口通不通（Cloudflare IPv6 DNS）
cat /etc/os-release              # 确认系统
```

## 1. 基础准备：换国内镜像 + 装工具

```bash
sed -i 's#dl-cdn.alpinelinux.org#mirrors.ustc.edu.cn#g' /etc/apk/repositories
apk update
apk add curl wget jq openssl
```

（默认源卡住时用上面 USTC 镜像；装完 curl 后全部下载都用 curl。）

## 2. 添加 IPv4 出口：Cloudflare WARP

### 2.1 下载并运行 warp 脚本（已迁移到 GitLab，GitHub 上的仓库已删除）

```bash
curl -6 -fsSL https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh -o menu.sh && bash menu.sh
```

### 2.2 菜单选择

1. 主菜单选 **1**（WARP IPv4 网络接口）
2. wireguard 方式：内核失败就选 **2（wireguard-go）**，脚本会自动切换
3. 工作模式选 **1（全局）**
4. 优先级别选 **2（IPv6 优先）** —— 保留原生 IPv6 速度，WARP 只兜底 IPv4 网站

### 2.3 【关键修复】Endpoint 必须写死成 IPv6 字面量

脚本生成的配置里 `Endpoint = engage.cloudflareclient.com:2408`，wg 解析域名时会优先选 IPv4，纯 IPv6 机器上握手永远失败。装完如果显示"获取 WARP IP 失败"，按下面修：

```bash
# 停掉保活脚本（它会重写配置）
pkill -f keepalive.sh

# 删掉没配好的接口（wg-quick down 可能静默失败，直接用 ip link del）
wg-quick down warp 2>/dev/null || true
ip link del warp 2>/dev/null || true

# 查 WARP 域名当前的 IPv6 地址
nslookup engage.cloudflareclient.com    # 记下 AAAA 记录

# 把 Endpoint 改成上面查到的 IPv6（示例地址为当时实测值）
sed -i 's#^Endpoint *=.*#Endpoint = [<AAAA记录>]:2408#' /etc/wireguard/warp.conf
# 已知稳定的备选：sed -i 's#^Endpoint *=.*#Endpoint = [2606:4700:4700::1111]:2408#' /etc/wireguard/warp.conf

# 重新拉起接口并验证
wg-quick up warp
wg show        # 出现 "latest handshake: X seconds ago" 即成功
```

验证 IPv4 出口：

```bash
curl -4 -fsSL https://api.ipify.org && echo    # 返回 IP 即通
```

### 2.4 日常维护

- 重启后 WARP 掉线：`warp o` 恢复
- 如果保活脚本自动重连后又不通（配置被写回域名），重复 2.3 的修复步骤

## 3. 安装 sing-box（官方二进制手动装，不用一键脚本）

```bash
V=$(curl -fsSL -o /dev/null -w '%{url_effective}' https://github.com/SagerNet/sing-box/releases/latest | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1)
echo "最新版本: $V"
cd /root
curl -fL -o sb.tar.gz "https://github.com/SagerNet/sing-box/releases/download/$V/sing-box-${V#v}-linux-amd64.tar.gz"
tar xzf sb.tar.gz
cp "sing-box-${V#v}-linux-amd64/sing-box" /usr/local/bin/sing-box
chmod +x /usr/local/bin/sing-box
sing-box version
```

## 4. 生成配置：hysteria2（20005）+ Shadowsocks（20006）

整段复制执行（自动生成证书、随机密码，并保留已有 hysteria2 密码）：

```bash
mkdir -p /etc/sing-box

# 自签证书（hysteria2 需要 TLS）
openssl req -x509 -nodes -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 \
  -keyout /etc/sing-box/server.key -out /etc/sing-box/server.crt \
  -days 3650 -subj "/CN=hysteria2"

# hysteria2 密码 + Shadowsocks 密钥
HYPASS=$(grep -oE '[0-9a-f]{32}' /etc/sing-box/pass.txt 2>/dev/null || openssl rand -hex 16)
SSKEY=$(openssl rand -base64 16)
echo "hysteria2 密码: $HYPASS" | tee /etc/sing-box/pass.txt
echo "SS 密钥: $SSKEY" | tee /etc/sing-box/ss-key.txt

cat > /etc/sing-box/config.json <<EOF
{
  "log": {"level": "info"},
  "inbounds": [
    {
      "type": "hysteria2",
      "tag": "hy2-in",
      "listen": "::",
      "listen_port": 20005,
      "up_mbps": 100,
      "down_mbps": 100,
      "users": [{"password": "$HYPASS"}],
      "tls": {
        "enabled": true,
        "alpn": ["h3"],
        "certificate_path": "/etc/sing-box/server.crt",
        "key_path": "/etc/sing-box/server.key"
      }
    },
    {
      "type": "shadowsocks",
      "tag": "ss-in",
      "listen": "::",
      "listen_port": 20006,
      "method": "2022-blake3-aes-128-gcm",
      "password": "$SSKEY"
    }
  ]
}
EOF

sing-box check -c /etc/sing-box/config.json
```

> 说明：hysteria2 只走 UDP；Shadowsocks 走 TCP+UDP，两者互补。端口可自行修改（见第 7 节）。

## 5. 注册 OpenRC 开机自启并启动

```bash
cat > /etc/init.d/sing-box <<'EOF'
#!/sbin/openrc-run
name="sing-box"
command="/usr/local/bin/sing-box"
command_args="run -c /etc/sing-box/config.json"
command_background=true
pidfile="/run/sing-box.pid"
output_log="/var/log/sing-box.log"
error_log="/var/log/sing-box.log"
depend() {
  need net
}
EOF
chmod +x /etc/init.d/sing-box
rc-update add sing-box default
rc-service sing-box start
sleep 1
rc-service sing-box status
tail -5 /var/log/sing-box.log
```

日志中出现 `tcp server started`、`udp server started` 和 `sing-box started` 即成功。

## 6. 客户端链接 + iplinks 一键查链接工具

### 6.1 安装 iplinks（公网 IPv6 可能变化，随时一键拿最新链接）

```bash
cat > /usr/local/bin/iplinks <<'EOF'
#!/bin/sh
IP=$(curl -6 -fsSL https://api64.ipify.org)
HYPASS=$(grep -oE '[0-9a-f]{32}' /etc/sing-box/pass.txt)
SSKEY=$(awk '{print $NF}' /etc/sing-box/ss-key.txt | tr '+/' '-_' | tr -d '=')
echo "当前公网 IPv6: $IP"
echo "hysteria2:"
echo "hysteria2://${HYPASS}@[${IP}]:20005/?insecure=1&sni=hysteria2#HK-hy2"
echo "Shadowsocks:"
echo "ss://2022-blake3-aes-128-gcm:${SSKEY}@[${IP}]:20006/#HK-ss"
EOF
chmod +x /usr/local/bin/iplinks
iplinks
```

以后在服务器上敲 `iplinks` 即可得到当前地址的两条最新链接。

### 6.2 客户端使用要点

- 客户端（v2rayN / Hiddify）"从剪贴板导入" `ss://` 或 `hysteria2://` 链接；
- hysteria2 是自签证书，必须勾选**允许不安全连接（skip-cert-verify）**；
- **客户端网络必须有 IPv6**（test-ipv6.com 检测）；大陆家宽、手机流量基本都有，公司 Wi-Fi 可能没有；
- 注意：eth0 上的 `fd42:` 开头地址是内网 ULA，不是公网地址，别用。

## 7. 日常维护速查

| 操作 | 命令 |
|---|---|
| 改端口 | `sed -i 's/"listen_port": 20005/"listen_port": 新端口/' /etc/sing-box/config.json && rc-service sing-box restart`（客户端链接同步改） |
| 查服务状态 | `rc-service sing-box status` |
| 查日志 | `tail -20 /var/log/sing-box.log` |
| 重启服务 | `rc-service sing-box restart` |
| 验证配置 | `sing-box check -c /etc/sing-box/config.json` |
| 查当前公网 IPv6 | `curl -6 -fsSL https://api64.ipify.org` |
| 机器重启后 | ① `rc-service sing-box status`（容器可能不自动跑 OpenRC，没起来就 `rc-service sing-box start`）；② WARP 掉了跑 `warp o` |
| 查 IPv4 出口（WARP） | `curl -4 -fsSL https://api.ipify.org` |

关键文件位置：

| 文件 | 用途 |
|---|---|
| `/etc/sing-box/config.json` | 主配置 |
| `/etc/sing-box/pass.txt` | hysteria2 密码 |
| `/etc/sing-box/ss-key.txt` | Shadowsocks 密钥 |
| `/etc/sing-box/server.crt` / `server.key` | 自签证书 |
| `/etc/wireguard/warp.conf` | WARP 配置 |
| `/var/log/sing-box.log` | sing-box 日志 |

## 8. 踩坑记录（下次别再踩）

1. **busybox wget 只支持 IPv4 且参数不全** —— 一律 curl；脚本需要 GNU wget 时 `apk add wget`。
2. **233boy / Misaka 等一键脚本是给 Debian/Ubuntu + systemd 写的**，Alpine 上会卡在下载或服务配置，直接手动装官方二进制最稳。
3. **wg 把 WARP 域名解析成 IPv4** 导致握手失败 —— Endpoint 必须写 IPv6 字面量（2.3 节）。
4. **`wg-quick down` 可能静默失败**，接口删不掉导致 `already exists` —— 排查命令不要加 `2>/dev/null`，必要时直接 `ip link del warp`。
5. **保活脚本会重写 warp.conf** —— 修复 Endpoint 前先 `pkill -f keepalive.sh`。
6. **公网 IPv6 是 NAT66 动态映射，会变** —— 链接连不上先查地址（`iplinks`）。
7. **MTU 黑洞**：ping 通但所有 TCP/HTTPS 卡住，先看 `ip link` 的 mtu（本机是 1280，IPv6 最小 MTU）。
8. **apk 源卡住**：换 USTC 镜像（第 1 节），国内机器必做。
