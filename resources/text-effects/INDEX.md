# Text Effects 类别索引

文本入场、状态流转、字符平滑形变与流光扫描微动效规范。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 标题随页面纵向滚动进入视口时触发动效，需支持高斯模糊（Blur）、逐词升起（Words）、逐行滑入（Lines）、字距展开（Tracking）与擦除（Wipe） | IntersectionObserver 视口相交检测（45%）、越过顶部 passed 状态锁定、多变体 CSS 错峰动画、优雅无脚本兜底 | [in-view-title.md](in-view-title.md) |
| 单行文案/按钮状态流转时，新旧字符原地平滑形变、相同字符复用滑动、容器宽度无抖动弹性收敛 | 键控字符频次匹配复用、420ms 弹簧容器测量与伸缩、退场字符脱轨模糊淡出、进场字符阶梯升起 | [text-morph.md](text-morph.md) |
| 落地页引言、品牌宣言或大段正文自然逐词展露，需优雅错峰与羽化留白 | 三轨独立 CSS 动画（位移 760ms / 透明度 440ms / 模糊 580ms）、自适应词间错峰步长、下行字母羽化留白 | [text-reveal.md](text-reveal.md) |
| AI 生成、后台同步或加载中的轻量级文本扫光流光，以及完成时的光斑滑出与状态置换 | 2.2em 渐变高光带周期扫掠（1.8s + 32% 停歇）、视口节能暂停、settle 平滑滑出、微模糊文案置换、对勾变异 | [text-shimmer.md](text-shimmer.md) |

## 跨类别分流

- 包含异步网络请求生命周期、加载环与对勾书写的完整操作按钮 → [action-button](../buttons/action-button.md)
- 页面骨架屏或大块区块加载占位扫光 → [skeleton](../progress/skeleton.md)
