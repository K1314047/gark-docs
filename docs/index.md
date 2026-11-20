## G.Ark Docs
> 技术教程、实用工具与交易赛复盘的个人文档库。

内容主要分两部分：一是 Linux、代理、部署上线等实战教程与工具配置的踩坑记录；二是每场交易赛的实时交易量、门槛变化与预测复盘，沉淀可复用的预测模型和执行打法。

::: info 声明
本站图床服务器位于海外，未针对中国大陆地区做访问优化。如果您无法正常加载图片，请自行尝试使用网络代理等方式解决，感谢理解。
:::    





<div style="
  margin-top: 24px;
  padding: 16px 20px;
  background: #f8f9fa;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  font-size: 14px;
">
  <span style="font-weight: 600; color: #333;">📬 联系我：</span>
  <a href="https://t.me/ayig61" target="_blank" style="color: #0088cc; text-decoration: none;">Telegram @ayig61</a>
  <a href="https://x.com/ayig61" target="_blank" style="color: #1da1f2; text-decoration: none;">X @ayig61</a>
  <a href="mailto:1314047@gmail.com" style="color: #ea4335; text-decoration: none;">1314047@gmail.com</a>
</div>
## 2026-11-20 1ST-COLLECT落榜

### 1ST-COLLECT

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261120/image.92qyv0mqhm.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261120/image.7i17vjube1.webp)

大意了，没进榜。

### 数据

| 比赛日 | 全场当日交易量 | 老用户倍率 | 新人倍率 | 当日门槛 | 门槛增长 |
| ----- | ------------- | ---------- | -------- | -------- | -------- |
| 第1天 | 1,805,390.21 | 2.0 | 3.2 | 0.00 | 0.00 |
| 第2天 | 4,686,502.62 | 2.0 | 3.2 | 0.00 | 0.00 |
| 第3天 | 2,063,273.25 | 1.8 | 3.0 | 0.00 | 0.00 |
| 第4天 | 38,736,836.16 | 1.8 | 3.0 | 0.00 | 0.00 |
| 第5天 | 196,449,053.81 | 1.5 | 2.7 | 1,811.04 | 1,811.04 |
| 第6天 | 98,004,565.08 | 1.3 | 2.5 | 45,262.93 | 43,451.89 |
| 第7天 | 77,944,436.10 | 1.0 | 2.2 | 217,724.89 | 172,461.96 |

- 全场交易量合计：**419,690,137.23**
- 我的实际交易量（实刷）：**131,109.22**
- 我的参赛交易量（×倍率折算后）：**209,784**
- 最终上榜门槛：**217,724.89**
- 差额：**7,940.89（3.65%）**

### 复盘

差一点就进了——实刷 13.1 万、折算参赛量 20.98 万，离最终门槛 21.77 万只差 **7940.89**（3.65%）。是临门一脚式的落榜，不是方向性错误。

**根因：最后一天没盯住尾盘加速。** 门槛最后一天从 45,262.93 一口气跳到 217,724.89（单日 +172,461.96，是第 6 天收盘值的 3.8 倍），而我的参赛量在最后阶段停滞，被这波尾盘暴拉顶了出去。

**这场真正暴露的问题是"转化率"这个锚失效了：**

| 预测口径 | 估算门槛 | 与实际误差 |
| -------- | -------- | ---------- |
| 第6天门槛 + 近3天日均增量 | 67,894 | 低 69% |
| 第7天交易量 × 12‱ | 93,533 | 低 57% |
| 第7天交易量 × 7‱ | 54,561 | 低 75% |
| 实际转化率 27.93‱ | 217,465 | 几乎命中 |

最终门槛 ÷ 第7天交易量 = **27.93‱**，是历史经验值（7‱~12‱，ZEST 场的三场平均 11.5‱）的 **2.5~4 倍**。有人在最后一天用大额订单集中冲榜，把转化率顶到了远超历史规律的水平。纯靠"日均增量 + 7‱~12‱ 转化率"模型，最多看到 9.3 万，会误判"稳了"，实际是最危险的状态。

### 三条硬规则

1. **加"转化率失控"熔断线。** 当"当日门槛 ÷ 当日交易量"突破 **15‱** 时，立即切尾盘加速模式：目标不再用 7‱~12‱ 外推，改按当前转化率 × 预估剩余交易量上修，再加 10% 余量。本场 27.93‱ 就是典型触发场景。
2. **把"前 3 天零量"设为高危形态因子。** 前三天合计才 845 万（占全场 2%），第 4 天才启动——这是"大家都在憋着等最后冲"的信号，默认最后一天会暴拉，目标直接上浮 2~3 倍。
3. **最后一天的补量窗口要前置。** 差额只有 7941，离达标非常近，问题不是能力，是最后一天没留出"实时盯盘 + 补量"的窗口。

## 2026-11-19 1ST-LAB

### 1ST-LAB

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261119/image.4n8jodglyd.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261119/image.9o0mfxrdnz.webp)

7天交易赛总交易量：**471,471,173.69**

币安被盗后第一个交易赛，一开始以为大家没币刷分，会很卷，没想到大家都不怎么刷了

------

## 2026-11-09 2ND-AXIS

### 2ND-AXIS

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261110/image.5momnxnnia.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261110/image.8dxow0d439.webp)

7天交易赛总交易量：**35082705.55**

Axis这个交易赛也算是生不逢时了，偏偏是base链，偏偏遇到币安被盗关闭即时订单，项目方也摆烂把奖励砸没了，两期交易量一共才285072944.9，目前也没有新的交易赛上线，不过估计本周应该会恢复了，趁这段时间休息休息。

## 2026-11-05 2ND-ON

### 2ND-ON

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261105/image.58i6qpr6be.webp)

前两天刷完了，今天没关注榜单了

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261105/image.2a5wn7pife.webp)

7天交易赛总交易量：**564,071,026.06**



## 2026-11-03 2ND-NDA

### 2ND-NDA

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261103/image.icxpdg415.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261103/image.73urgem27u.webp)

7天交易赛总交易量：**1610952635.32**

## 2026-11-02 1ST-AXIS

### 1ST-AXIS

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261102/image.362dyb5e7s.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261102/image.17677zfpa9.webp)

AXIS交易赛期间遇到币安被盗，币安关闭了即时订单，加上币价一直下跌，就没什么人在刷，所以这次的数据没什么参考意义

7天交易赛总交易量：**249,990,239.35**

------

## 2026-10-29 1ST-ON

### 1ST-ON

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261029/image.etbkj9mns.webp)

19、20点交易量有点大，最后又多补了一些交易量

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261029/image.5xbg0op54z.webp)

7天交易赛总交易量：**521175608.86**



------

## 2026-10-28 2ND-DGAI

### 2ND-DGAI

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261028/image.2ksq4wu65h.webp)

第一期就把第二期的套保了，第二期早早的也刷完了就没关注这个币最后一天的交易量。

7天交易赛总交易量：**685156646.92**

## 2026-10-27 1ST-DNA

### 1ST-DNA

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261027/image.3k8tgoiul3.webp)

四倍币交易量大，提早刷也要亏本，当刷分补贴。

7天交易赛总交易量：**1,597,995,151.04**

## 2026-10-23 2ND-STABLE/1ST-ACU

### 2ND-STABLE

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261023/image.6t7x7lr3pa.webp)

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261023/image.3d5lfihr2m.webp)

7天交易赛总交易量：**755,422,715.58**

### 1ST-ACU

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261023/image.5xbfs5jv7c.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261029/image.362drc4idg.webp)

7天交易赛总交易量：**429,653,664.41**



------

## 2026-10-22 2ND-ZEST

### 2ND-ZEST

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261022/image.2kspwb1ekx.webp)

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261022/image.7i16q5fpk1.webp)

交易赛期间4小时走势图

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261029/image.6m4pjf9j8s.webp)

ZEST 这一场验证了两件事：

- **日锚最稳。** 第 6 天门槛加近两天日均增量，连续两场误差在 ±0.5% 以内。
- **最后两小时的转化率应该用三场的平均约 11.5‱，而不是最近一小时的数值。**



------

## 2026-10-21 1ST-DGAI

### 1ST-DGAI

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261021/image.2vfjo4gzt7.webp)

![](https://github.com/K1314047/picx-images-hosting/raw/master/20261021/image.2dphzjl5s9.webp)

DGAI 这一场证明了两件事：**预测要以交易量为主锚，不能只用门槛增量的倍数外推；同时不能丢掉"每日增量稳定"这个最简单的锚。** 前两轮预测都在 ±0.4% 以内，最后一轮因为假设尾盘会衰减，低估了 5.4%，但之前建议的 48.5–49 万目标仍然稳稳覆盖了实际门槛。

**以后的打法：**

1. 第 6 天收盘后，先用"第 6 天门槛 + 近 3 天日均增量"给出基础目标。
2. 第 7 天按 7‱ 和 12‱ 两个转化率交叉验证。
3. 20:00 之后盯实时交易量：只要没有回落，就按尾盘加速处理。
4. 最终目标取最高值加 10% 余量。
5. 老用户尽量在前两天用 2 倍倍数建仓，最后一天只补差额。

------

## 2026-10-16 1ST-STABLE

### 1ST-STABLE

| 时间  | 交易量        | 门槛       |
| ----- | ------------- | ---------- |
| 16:00 | 5,114,952     | 1,474.82   |
| 17:00 | 9,813,311     | 1,943.38   |
| 18:00 | 27,494,933    | 6,738.68   |
| 19:00 | 50,895,560.83 | 36,053.72  |
| 20:00 | 62,980,529.63 | 127,516.41 |
| 21:00 | 50,717,966    | 187,220.10 |

16:33开始来量

![](https://github.com/K1314047/picx-images-hosting/raw/master/image.1vzg3c0k9q.webp)

------

## 2026-10-15 2ND-CT/1ST-ZEST

### 2ND-CT

| 时间  | 交易量    | 门槛      |
| ----- | --------- | --------- |
| 16:00 | 1,872,857 | 528305.75 |
| 17:00 | 2,534,779 | 528609.96 |
| 18:00 | 2,794,218 | 533495.79 |
| 19:00 | 4,100,820 | 535893.95 |
| 20:00 | 8,245,787 | 551289.22 |
| 21:00 | 9,040,094 | 571510.92 |

20:11开始来量

![](https://github.com/K1314047/picx-images-hosting/raw/master/image.4g5aexxxis.webp)

------

### 1ST-ZEST

| 时间  | 交易量     | 门槛      |
| ----- | ---------- | --------- |
| 16:00 | 1,875,532  | 288235.39 |
| 17:00 | 4,592,994  | 290518.8  |
| 18:00 | 20,867,350 | 300051.26 |
| 19:00 | 36,193,853 | 314811.45 |
| 20:00 | 45,631,994 | 347197.13 |
| 21:00 | 31,253,092 | 379682.9  |

17:10开始来量

![](https://github.com/K1314047/picx-images-hosting/raw/master/image.7p4eblm6uv.webp)
