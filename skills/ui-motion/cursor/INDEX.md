# Cursor 类别索引

光标跟随与物理受力微动效组件集（**仅限 `Web` 桌面端**，依赖鼠标光标位置追踪；**`Mobile` 移动端无持久光标，严禁选用本类别组件**）。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `Web` | 点阵排斥与水波涟漪：光标掠过时点阵向外推开并点亮热度高光，点击向外扩散多层圆形波纹 | Canvas 2D 物理动力学、光标排斥力场（150px）、水波脉冲（0.62px/ms）与三种密度自适应 | [dot-grid.md](dot-grid.md) |
| `Web` | 图片情绪板引力聚拢与冲击波：光标经过时图片向指针中心向心聚拢缩小，点击向外发射强烈冲击波 | 高斯引力势阱（150px）、向心位移微缩放、900px/s 辐射脉冲波与全键盘 Roving 焦点 | [gravity-well.md](gravity-well.md) |

## 跨类别分流

- 粒子吹散重组为特定文字词汇 → [sand-text](../special-type/sand-text.md)
- 双同心轨道差频公转与连接线 → [orbit-logos](../playful/orbit-logos.md)
- 拟真折纸翻书与手势翻页 → [page-curl](../playful/page-curl.md)
