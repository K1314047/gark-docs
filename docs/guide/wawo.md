---
created: 2026-10-24T18:06:06 (UTC +08:00)
tags: []
source: https://www.nodeseek.com/post-1002229-1
author: MJJYYDS评分 83楼主
---

# WAWO-IPV6-ONLY DNS修改与WARP安装

> ## Excerpt
> 收了个Wawo-HK-ipv6only-0.5G-18玩具鸡玩玩配置，优化，安装几个自用脚本折腾了1小时，分享下顺便当个备份。纯IPv6VPS安装WARP通用教程适用场景：Wawo-HK-ipv6only-0.5G-18或同类纯IPv6VPS，重装系统后从零配置WARP。最终效果：原生公共DNS（1.1.1.1/8

---
收了个Wawo-HK-ipv6only-0.5G-18玩具鸡玩玩 

配置，优化，安装几个自用脚本折腾了1小时，分享下顺便当个备份。

## 纯 IPv6 VPS 安装 WARP 通用教程

**适用场景**：Wawo-HK-ipv6only-0.5G-18 或同类纯 IPv6 VPS，重装系统后从零配置 WARP。

**最终效果**：

-   原生公共 DNS（`1.1.1.1` / `8.8.8.8` / Google IPv6），解析快；
-   出口 IPv4 走 Cloudflare WARP（`104.28.x.x`）；
-   出口 IPv6 保持 VPS 原生（`2400:c620:xxxx:xxxx::x` 这类地址，**不使用 WARP 的 IPv6**）；
-   全部配置重启后自动生效。

**整体流程**：

```go
第 0 步：NAT64 DNS 修复（装 WARP 前必须）
          ↓
第 1 步：bash warp-go.sh，菜单选 2 → 4 → 模式
          ↓
第 2 步：systemctl enable --now warp-go
          ↓
第 3 步：改回原生 DNS 并锁定 + 生成验证脚本
          ↓
第 4 步：reboot 后一键验证，7 项全 ✅
```

全程以 **root** 身份操作。文中所有 IPv6 示例均使用脱敏占位符，实际以你自己的 VPS 地址为准。

___

### 第 0 步：NAT64 DNS 修复（装 WARP 前）

**为什么必须做**：纯 IPv6 主机默认 DNS 里带 IPv4 地址，但主机无法与 IPv4 DNS 通信，`warp-go` 脚本的环境检查会因此退出。必须先换成 NAT64 DNS，让主机具备访问 IPv4 的能力，才能下载和安装 WARP。

复制下面**整段**命令，粘贴到终端执行：

```swift
bash -c '
set -u
DNS1=2001:67c:2b0::4
DNS2=2001:67c:2b0::6
HOST=$(hostname)

echo "============================================================"
echo " 第 0 步：NAT64 DNS 修复（装 WARP 前）"
echo "============================================================"

echo
echo "[1/5] 修复 /etc/hosts 主机名解析"
grep -qE "^127\.0\.0\.1[[:space:]].*\b${HOST}\b" /etc/hosts 2>/dev/null || echo "127.0.0.1 ${HOST}" >> /etc/hosts
echo "      ✅ 完成"

echo
echo "[2/5] 修改 cloud-init 网络配置中的 DNS"
F=/etc/network/interfaces.d/50-cloud-init
if [ -f "$F" ]; then
  cp -a "$F" "${F}.bak.$(date +%s)"
  sed -i "s/^\([[:space:]]*dns-nameservers\).*/\1 ${DNS1} ${DNS2}/" "$F"
  echo "      ✅ 已处理 $F"
else
  echo "      ⚠️  未找到 $F，跳过（后面锁定会兜底）"
fi

echo
echo "[3/5] 禁止 cloud-init 管理网络和 resolv.conf"
mkdir -p /etc/cloud/cloud.cfg.d
printf "network: {config: disabled}\n" > /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
printf "manage_resolv_conf: false\n" > /etc/cloud/cloud.cfg.d/99-disable-resolv.conf.cfg
echo "      ✅ 完成"

echo
echo "[4/5] 写入并锁定 NAT64 DNS"
chattr -i /etc/resolv.conf 2>/dev/null || true
rm -f /etc/resolv.conf
printf "nameserver %s\nnameserver %s\n" "$DNS1" "$DNS2" > /etc/resolv.conf
if chattr +i /etc/resolv.conf 2>/dev/null; then
  echo "      ✅ 已锁定（chattr +i）"
else
  echo "      ⚠️  chattr +i 不可用"
fi

echo
echo "[5/5] 验证 DNS 并下载 warp-go.sh"
cat /etc/resolv.conf | sed "s/^/      /"
echo "      → GitHub 解析："
getent ahosts github.com | head -n 1 | sed "s/^/        /"
if [ -f ./warp-go.sh ]; then
  echo "      ✅ 当前目录已存在 warp-go.sh，跳过下载"
else
  wget -N -q https://gitlab.com/fscarmen/warp/-/raw/main/warp-go.sh && echo "      ✅ 已下载 warp-go.sh" || echo "      ❌ 下载失败"
fi

echo
echo "============================================================"
echo " 第 0 步完成，下一步执行：bash warp-go.sh"
echo "============================================================"
'
```

**预期**：`/etc/resolv.conf` 显示两条 NAT64 DNS，GitHub 解析返回 `64:ff9b::` 开头的合成地址，`warp-go.sh` 下载成功。

___

### 第 1 步：安装并打开 WARP

```go
bash warp-go.sh
```

进入菜单后依次选择：

| 顺序 | 选择 | 含义 |
|-----|-------|------------------------|
| 1 | `2` | 简体中文 |
| 2 | `4` | 打开 warp-go (warp-go o) |
| 3 | 按菜单提示 | 选择只接管 IPv4 的模式 |

看到 IPv4 / IPv6 地址输出（如 `104.28.x.x`）即表示安装成功。

> 如果提示 `warp-go.service` 相关错误，先 `systemctl daemon-reload`，再回菜单选 `4` 重试。

___

### 第 2 步：设置 WARP 开机自启

```bash
systemctl enable --now warp-go
```

执行后每次重启 WARP 自动运行。

**确认 WARP 已生效**，再进入第 3 步：

```bash
systemctl is-active warp-go
curl -4 -s --max-time 10 https://api.ipify.org; echo
```

预期：`active`，且 `curl` 返回 `104.28.x.x`。如果这里不是 `104.28.x.x`，先不要改 DNS，回第 1 步重新打开 WARP。

___

### 第 3 步：改回原生 DNS 并锁定 + 生成验证脚本

**为什么改**：NAT64 DNS 位于芬兰，香港到芬兰 RTT 200ms 以上。WARP 起来后 IPv4 出站已走 WARP 隧道，不再依赖 NAT64 合成。改回原生公共 DNS 代理首包延迟明显下降，**油管速度明显提升**。

复制整段执行：

```swift
bash -c '
set -u

echo "============================================================"
echo " 第 3 步：改回原生 DNS 并生成验证脚本"
echo "============================================================"

echo
echo "[1/3] 备份当前 NAT64 DNS 配置"
cp /etc/resolv.conf /etc/resolv.conf.nat64.bak
echo "      ✅ 已备份到 /etc/resolv.conf.nat64.bak"

echo
echo "[2/3] 写入并锁定原生 DNS"
chattr -i /etc/resolv.conf 2>/dev/null || true
cat > /etc/resolv.conf << "EOF"
nameserver 1.1.1.1
nameserver 8.8.8.8
nameserver 2001:4860:4860::8888
nameserver 2001:4860:4860::8844
EOF
if chattr +i /etc/resolv.conf 2>/dev/null; then
  echo "      ✅ 已锁定"
else
  echo "      ⚠️  chattr +i 不可用"
fi
cat /etc/resolv.conf | sed "s/^/      /"

echo
echo "[3/3] 生成验证脚本 /root/check-dns-warp.sh"
cat > /root/check-dns-warp.sh << "CHECKEOF"
#!/bin/bash
PASS=0; FAIL=0
ok()  { PASS=$((PASS+1)); echo "  ✅ $1"; }
bad() { FAIL=$((FAIL+1)); echo "  ❌ $1"; }

echo "============================================================"
echo " DNS + WARP 状态检查（原生 DNS + IPv4 走 WARP，IPv6 原生）"
echo "============================================================"

echo; echo "[1] /etc/resolv.conf"
sed "s/^/      /" /etc/resolv.conf
DNS_OK=1
[ "$(grep -c "^nameserver" /etc/resolv.conf)" = "4" ] || DNS_OK=0
grep -qx "nameserver 1.1.1.1" /etc/resolv.conf || DNS_OK=0
grep -qx "nameserver 8.8.8.8" /etc/resolv.conf || DNS_OK=0
grep -qx "nameserver 2001:4860:4860::8888" /etc/resolv.conf || DNS_OK=0
grep -qx "nameserver 2001:4860:4860::8844" /etc/resolv.conf || DNS_OK=0
[ "$DNS_OK" = "1" ] && ok "原生 DNS 配置正确" || bad "DNS 配置不符"
echo "      预期: 1.1.1.1 / 8.8.8.8 / 2001:4860:4860::8888 / ::8844"

echo; echo "[2] 锁定属性"
ATTR=$(lsattr -d /etc/resolv.conf 2>/dev/null | awk "{print \$1}")
echo "      实际: ${ATTR:-无法读取}"
echo "$ATTR" | grep -q "i" && ok "文件已锁定" || bad "文件未锁定"
echo "      预期: 属性里含 i"

echo; echo "[3] GitHub 解析（原生解析）"
RES=$(getent ahosts github.com 2>/dev/null | head -n 1 | awk "{print \$1}")
echo "      实际: ${RES:-解析失败}"
if [ -z "$RES" ]; then bad "解析失败"
elif echo "$RES" | grep -q "^64:ff9b::"; then bad "仍返回 NAT64 合成地址，DNS 未真正切回原生"
else ok "原生解析正常（返回真实 IP）"; fi
echo "      预期: 返回真实 IPv4/IPv6 地址，非 64:ff9b::"

echo; echo "[4] warp-go 开机自启"
EN=$(systemctl is-enabled warp-go 2>/dev/null || echo "未安装")
echo "      实际: $EN"
[ "$EN" = "enabled" ] && ok "已设置开机自启" || bad "未设置开机自启"
echo "      预期: enabled"

echo; echo "[5] warp-go 运行状态"
AC=$(systemctl is-active warp-go 2>/dev/null || echo "未运行")
echo "      实际: $AC"
[ "$AC" = "active" ] && ok "服务正在运行" || bad "服务未运行"
echo "      预期: active"

echo; echo "[6] 出口 IPv4（应走 WARP）"
IP4=$(curl -4 -s --max-time 10 https://api.ipify.org 2>/dev/null || echo "")
echo "      实际: ${IP4:-超时}"
echo "$IP4" | grep -q "^104\.28\." && ok "走 Cloudflare WARP" || bad "不是 Cloudflare WARP 段"
echo "      预期: 104.28.x.x"

echo; echo "[7] 出口 IPv6（应保持 VPS 原生）"
IP6=$(curl -6 -s --max-time 10 https://api64.ipify.org 2>/dev/null || echo "")
echo "      实际: ${IP6:-超时}"
if echo "$IP6" | grep -q "^2400:c620:"; then ok "保持 VPS 原生 IPv6 出口（符合预期）"
elif echo "$IP6" | grep -qE "^(2606:4700:|2a09:)"; then bad "IPv6 被 WARP 接管了"
else bad "无法识别 IPv6 出口来源"; fi
echo "      预期: 2400:c620:... 开头（VPS 原生地址段）"

echo
echo "============================================================"
echo " 结果：✅ 通过 $PASS 项   ❌ 失败 $FAIL 项"
[ "$FAIL" = "0" ] && echo " 🎉 全部通过：原生 DNS + IPv4 走 WARP + IPv6 原生" || echo " ⚠️  有 $FAIL 项未通过"
echo "============================================================"
CHECKEOF
chmod +x /root/check-dns-warp.sh
echo "      ✅ 已生成 /root/check-dns-warp.sh"

echo
echo "============================================================"
echo " 第 3 步完成。现在执行 reboot，重启后跑："
echo "   bash /root/check-dns-warp.sh"
echo "============================================================"
'
```

___

### 第 4 步：重启后一键验证

```
reboot
```

重启后登录，执行：

```bash
bash /root/check-dns-warp.sh
```

**预期输出**（IPv6 已脱敏）：

```css
[1] /etc/resolv.conf
      ✅ 原生 DNS 配置正确
[2] 锁定属性
      ✅ 文件已锁定
[3] GitHub 解析（原生解析）
      ✅ 原生解析正常（返回真实 IP）
[4] warp-go 开机自启
      ✅ 已设置开机自启
[5] warp-go 运行状态
      ✅ 服务正在运行
[6] 出口 IPv4（应走 WARP）
      实际: 104.28.x.x
  ✅ 走 Cloudflare WARP
[7] 出口 IPv6（应保持 VPS 原生）
      实际: 2400:c620:xxxx:xxxx::x
  ✅ 保持 VPS 原生 IPv6 出口（符合预期）

============================================================
 结果：✅ 通过 7 项   ❌ 失败 0 项
 🎉 全部通过：原生 DNS + IPv4 走 WARP + IPv6 原生
============================================================
```

看到最后一行 **“🎉 全部通过”** 即完成。

___

### 如果重启后 WARP 启动失败（回滚方案）

原生 DNS 前两条是 IPv4 地址，理论上依赖 WARP 才能访问。个别环境 WARP 启动阶段需要解析域名时可能形成循环。如果验证时 `[5]` 不是 `active` 或 `[6]` 不是 `104.28.x.x`，执行回滚：

```bash
chattr -i /etc/resolv.conf
cp /etc/resolv.conf.nat64.bak /etc/resolv.conf
chattr +i /etc/resolv.conf
systemctl restart warp-go
bash /root/check-dns-warp.sh
```

回滚后 WARP 应能正常启动，验证脚本 `[1][3]` 会变为 NAT64 判定。Wawo 这台机器实测不需要回滚，原生 DNS 下 WARP 重启正常。

___

### 验证项对照表

| 项目 | 预期 | 失败时怎么办 |
|----------|---------------------|--------------------------------------|
| [1] DNS | 4 条默认公共 DNS | 重跑第 3 步；先 `chattr -i /etc/resolv.conf` |
| [2] 锁定 | 属性含 `i` | 文件系统不支持可忽略，但重启后需复查 |
| [3] 解析 | 返回真实 IP，非 `64:ff9b::` | 若仍是 `64:ff9b::`，说明 DNS 没切回原生 |
| [4] 自启 | `enabled` | `systemctl enable --now warp-go` |
| [5] 状态 | `active` | 回滚 DNS 后 `systemctl restart warp-go` |
| [6] IPv4 | `104.28.x.x` | 回滚 DNS 排查 WARP 启动 |
| [7] IPv6 | `2400:c620:` 开头 | 回菜单重新选只接管 IPv4 的模式 |

___

### 常见问题

**Q1：为什么装 WARP 前必须用 NAT64 DNS？**

纯 IPv6 主机无法直接与 IPv4 DNS 通信，也无法解析纯 IPv4 域名。NAT64 DNS 在装 WARP 前提供 IPv4 访问能力，让 `wget`、`apt` 正常工作。默认 DNS 里的 IPv4 地址在这台机器上会导致 `warp-go` 环境检查失败退出。

**Q2：为什么装完 WARP 要改回原生 DNS？**

TREX DNS64 位于芬兰，香港到芬兰 RTT 200ms 以上。改回 `1.1.1.1` / `8.8.8.8` 后解析走香港 Anycast 节点，延迟大幅下降，代理首次连接新站点的首包延迟明显改善。

**Q3：原生 DNS 里还有 IPv4 地址，纯 IPv6 主机能用吗？**

能。WARP 起来后系统已获得 IPv4 出站能力，`1.1.1.1` / `8.8.8.8` 通过 WARP 隧道访问。Wawo 实测重启后 WARP 正常启动，DNS 工作正常。

**Q4：`/etc/resolv.conf` 被锁定了怎么改？**

```bash
chattr -i /etc/resolv.conf   # 解锁
# 修改
chattr +i /etc/resolv.conf   # 重新锁定
```

**Q5：`warp-go` 接口用 `ip addr show warp-go` 看不到？**

不影响使用。出口 IP 是 WARP 地址就说明生效了，这个版本可能通过用户态 WireGuard + 路由规则接管流量，不创建可见 TUN 接口。

___

### 日常维护

| 操作 | 命令 |
|---------------|------------------------------------------------------------------------------------------------------------|
| 复查状态 | `bash /root/check-dns-warp.sh` |
| 重启 WARP | `systemctl restart warp-go` |
| 查看 WARP 日志 | `journalctl -u warp-go -f` |
| 临时改 DNS | `chattr -i /etc/resolv.conf` → 修改 → `chattr +i /etc/resolv.conf` |
| 回滚到 NAT64 DNS | `chattr -i /etc/resolv.conf && cp /etc/resolv.conf.nat64.bak /etc/resolv.conf && chattr +i /etc/resolv.conf` |
| 确认 WARP 出口 | `curl -4 -s https://api.ipify.org` |

___
