# Toggles 类别索引

切换、开关与单选交互组件，涵盖二值机械拉伸开关、真实笔触复选框、分段视图控制胶囊、垂直滑动高光单选组、方案对比单选卡片以及计费周期切换胶囊。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 即时二值状态开关：开启/关闭系统功能（蓝牙、推送、暗黑模式），需要拟物机械按压伸长与释放滑行 | 按压横向拉伸 5px、300ms 释放平滑滑翔、快速打断反向寻路 | [switch.md](switch.md) |
| 表单多选项或协议勾选：需要极具触感的物理按压缩放与真实矢量对勾书写动画 | 0.95 按压缩放微回弹、填充层 scale(0.6) 扩张、SVG stroke-dashoffset 路径书写 | [checkbox.md](checkbox.md) |
| 紧凑视图或模式切换：横向分段互斥胶囊，支持大量选项滚动揭示与两端边缘遮罩 | 相对位移 Delta Jump 瞬时锚定、420ms 弹性滑动拉伸、溢出滚动居中 | [segmented-control.md](segmented-control.md) |
| 垂直单选列表：标题与辅助文案排布，单选高光层在 Y 轴平滑吸附游走 | 单例高光块 420ms 垂直滑动自适应测高、单选小圆点弹性缩放 | [radio-group.md](radio-group.md) |
| 会员方案或支付渠道选择：大尺寸卡片横向网格排布，共享单个外轮廓指示框 | 单例外框 420ms 2D 坐标弹性追踪、ResizeObserver 响应式断点零延迟自适应 | [radio-cards.md](radio-cards.md) |
| SaaS 订购周期切换：Monthly 与 Yearly 联动，价格卡片数字滚轮翻转与折扣划线展开 | 测量滑动背景胶囊、Ghost Sizer 零抖动徽章锁死、数字滚轮与划线原价伸缩 | [billing-toggle.md](billing-toggle.md) |

## 跨类别分流

- 常规单动作按钮与异步提交流转 → [button](../buttons/button.md)
- 下拉选择菜单与单选候选项列表 → [select](../selects/select.md)
- 原地平铺分类标签过滤组 → [chip-group](../selects/chip-group.md)
- 连续拖拽数值调节滑块 → [slider](../sliders/slider.md)
