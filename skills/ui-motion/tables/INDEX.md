# Tables 类别索引

结构化数据呈现、会话对话流、协作批注、多层级折叠树与交互数据网格组件，涵盖即时通讯消息流、嵌套回复讨论树、语法高亮 JSON 探针、列头排序与行选择表格、以及阶梯文件目录树。根据用户数据形态与交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 即时通讯、AI 助手对话流、客服支持会话与动态消息追加 | 底部磁吸锚定（48px Stick）、未读悬浮胶囊、消息生长滑入、表情反应徽标 | [chat-thread.md](chat-thread.md) |
| 文档批注、代码审查楼中楼讨论、多级评论与线程解决状态 | 递归评论树、平滑高度收展（420ms Height Spring）、原地行内回复框、解决摘要 | [comment-thread.md](comment-thread.md) |
| API 响应体调试、配置文件检视、键值高亮与结构化数据探针 | 类型语法色彩、折叠分支计数、实时全文搜索匹配与高亮、键值/路径一键复制 | [json-viewer.md](json-viewer.md) |
| 项目看板、订单清单多列排序、复选框多选与批量操作 | 列头升降序切换、FLIP 弹簧行位移重排（400ms）、Shift 连续区间多选、响应式卡片流 | [sortable-data-table.md](sortable-data-table.md) |
| 代码文件目录、组织部门架构、层级类目浏览与开合检索 | 阶梯缩进（18px）、38px 行高折叠过渡、平滑移动选中底色胶囊、WAI-ARIA 键盘巡航 | [tree-view.md](tree-view.md) |

## 跨类别分流

- 超海量十万级行列虚拟平铺与双向列冻结 → [data-grid.md](../advanced-charts/data-grid.md)
- 层级多嵌套分类面积权重矩形树图 → [treemap.md](../advanced-charts/treemap.md)
- 向心多层多环占比旭日图 → [sunburst.md](../advanced-charts/sunburst.md)
- 日期分组活动审计流与生命周期时间线 → [timeline.md](../charts/timeline.md)
- 离散时序柱状图对比 → [bar-chart.md](../charts/bar-chart.md)
