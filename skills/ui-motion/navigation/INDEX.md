# Navigation 类别索引

导航、分页与上下文路径流转。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 层级化多级路径回溯：需要父子继承关系的路径深浅切换、FLIP 位移重排与折行高度平滑伸缩 | FLIP 平滑位移重排、绝对定位脱流出场、ResizeObserver 容器折行高度伸缩、::after 占位中等字重防抖 | [breadcrumb.md](breadcrumb.md) |
| 大批量数据分批翻页：多页码列表浏览，需要数字滑动传送带与首尾边界步进按压反馈 | 5 页可视窗口传送带、独立浮动高光指示器、420ms 弹簧跟随、步进微物理按压反馈 | [pagination.md](pagination.md) |
| 同级视图或内容维度切换：同一上下文中并列模块分段浏览，需要滑动高光胶囊与内容微模糊淡入淡出 | 共享硬件加速滑动高光胶囊、微模糊沉降文本置换、全键盘 Roving Tabindex 循环巡礼 | [tabs.md](tabs.md) |

## 跨类别分流

- 垂直多区域手风琴折叠展开 → [accordion](../expand/accordion.md)
- 包含富文本操作项与分组的弹出菜单 → [dropdown-menu](../menus/dropdown-menu.md)
- 紧凑工具栏内的单选按钮组（带数字计数器） → [button-group](../buttons/button-group.md)
