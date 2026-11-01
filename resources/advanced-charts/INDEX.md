# Advanced Charts 类别索引

高级多维数据可视化、海量数据网格、层级下钻分解、网络与流量拓扑及动态时间轴赛跑图表，涵盖多维刷选、虚拟平铺网格、流向桑基图、有机流图、多环旭日图与 Squarified 矩形树图。根据用户分析场景与交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 跨大时间跨度时序数据的局部窗口缩放与拖拽巡航 | 主副双图联动（Overview + Detail）、SVG 刷选拖拽手柄、阻尼弹簧平滑缩放 | [brush-chart.md](brush-chart.md) |
| 海量十万级行列数据集浏览、列宽拖拽、多维冻结与虚拟滚动 | 可见视口切片虚拟平铺（Virtual Scrolling）、固定列/吸顶表头同步、单元格光标巡航 | [data-grid.md](data-grid.md) |
| 多类别多实体历史跨度指标排位演变与动态追赶竞争 | FLIP 动态位次重排、时间轴播放控制与洗牌动画、实时领跑标签跟随 | [race-bar-chart.md](race-bar-chart.md) |
| 多节点间能量流转、资金链路、渠道转化与流向损耗分析 | 三次贝塞尔曲面带（Cubic Bezier Ribbon）、节点纵向拖拽交互、流带悬停聚焦高亮 | [sankey-flow.md](sankey-flow.md) |
| 多类别随时间连续波动的有机总量与相对份额演进 | 围绕中心基线平滑波动的堆叠面积流（Catmull-Rom）、垂直光标探针、切片高亮 | [streamgraph.md](streamgraph.md) |
| 具有树形层级多深度分类的向心向外多环占比与逐级下钻 | 多层向心圆环切片（Arc Ring）、下钻中心放大动画、面包屑反向回溯导航 | [sunburst.md](sunburst.md) |
| 树状层级构成的多层嵌套面积权重分解与矩形切片展开 | Squarified 黄金宽高比细分算法、矩形下钻平滑过渡、自适应标签排版与高亮 | [treemap.md](treemap.md) |

## 跨类别分流

- 常规离散时序柱状图对比 → [bar-chart.md](../charts/bar-chart.md)
- 单维度平滑趋势曲线与面积图 → [line-chart.md](../charts/line-chart.md)
- 紧凑型微走势折线 → [sparkline.md](../charts/sparkline.md)
- 单维度多分类环形占比分布 → [donut-chart.md](../charts/donut-chart.md)
- 标准轻量排序筛选表格 → [sortable-data-table.md](../tables/sortable-data-table.md)
- 树状层级文件目录视图 → [tree-view.md](../tables/tree-view.md)
