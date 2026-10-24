# Activity 类别索引

用户活跃度、数据空态以及活动条件筛选相关的核心交互与动效流转规范。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 展示全周期/全年密集型贡献记录与活跃打卡分布，需对角波浪入场、光标提示气泡吸附与等级高亮过滤 | 对角波浪错峰入场（--wave）、跟随提示气泡弹性位移与宽度形变、等级过滤暗化、选中指示框平滑移动 | [activity-heatmap.md](activity-heatmap.md) |
| 无数据、未配置或任务清空时的占位引导，需图标与文本微模糊平滑置换、卡片高度自适应与触感按钮 | 键控 DOM 微模糊置换（0.3em 位移 + 4px 模糊）、卡片高度弹性伸缩、图标 0.6x 缩放进场、触感微回弹按钮 | [empty-state.md](empty-state.md) |
| 多条件动态组合数据筛选，需添加按钮变形为菜单、标签平滑展开/收敛与全部清空退场 | 按钮形态拉伸变形为菜单浮层、标签宽度 0 弹性展开/收缩（FLIP）、两级下钻滑动、错峰淡入 | [filter-toolbar.md](filter-toolbar.md) |

## 跨类别分流

- 连续时序数值波动与趋势折线图表 → [line-chart](../charts/line-chart.md)
- 完整日历月视图与排期日期点选 → [calendar](../pickers/calendar.md)
- 异步加载未完成时的主干骨架屏占位 → [skeleton](../progress/skeleton.md)
- 纯静态多选项标签选择组 → [chip-group](../selects/chip-group.md)
- 通用下拉导航菜单与上下文弹出层 → [dropdown-menu](../menus/dropdown-menu.md)
