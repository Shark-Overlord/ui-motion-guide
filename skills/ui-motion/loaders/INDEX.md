# Loaders 类别索引

全品类加载器与异步进度过渡动效组件集。专注于几何形态无缝变换、骨架屏就地内容展开与手势阻尼刷新。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 几何无缝变换与结果脉冲：在 Dots、Bars、Ring、Square 之间连续形变，并呈现成功/失败结果反馈 | 7 通道参数化路径插值、波形积分自转、1.14 倍结果缩放脉冲与 1700ms 自动复原 | [morph-loader.md](morph-loader.md) |
| 首屏骨架屏就地内容展开：真实数据返回时，骨架占位块原地平滑形变为头像与文字，卡片高度自适应 | FLIP 占位几何变换、380ms 错峰渐隐、4px 高斯微模糊入场与 ResizeObserver 高度缓动 | [skeleton-morph.md](skeleton-morph.md) |
| 列表手势阻尼下拉刷新：触摸或鼠标下拉具有物理阻力感，达到 72px 就绪停靠，新行错峰下落 | 非线性阻尼公式（`196*raw / (.7*raw+280)`）、层叠张力投影、停靠弹簧与微模糊新行插入 | [stretch-refresh.md](stretch-refresh.md) |

## 跨类别分流

- 单个按钮内置提交加载与成功勾选 → [action-button](../buttons/action-button.md)
- 纯矢量单图标形变（如汉堡切关闭） → [icon-morph](../buttons/icon-morph.md)
- 终端会话流式任务安装进度条 → [typewriter-terminal](../special-type/typewriter-terminal.md)
