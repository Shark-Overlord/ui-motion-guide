# Overlays 类别索引

浮层、弹窗、抽屉与悬浮提示。先根据 **Step 1 端型（`Web` vs `Mobile`）** 过滤，再按交互意图选定组件。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `Mobile` | 移动端/窄屏自底部滑出面板：需要多档高度停靠吸附（半屏/全屏）、抓手拖拽与橡皮筋阻尼 | 多档位（0.45/0.92）弹簧吸附、顶部抓手跟手拖拽、飞掷惯性释放、遮罩透明度动态联动映射 | [bottom-sheet.md](bottom-sheet.md) |
| `Web / 通用` | 破坏性操作与重大决策二次确认：需要强模态阻断背景、居中缩放弹簧升起与视口滚动条锁定 | 居中 400ms 缩放升起微弹簧、背景 7px 毛玻璃渐隐遮罩、滚动条差值 paddingRight 补偿、焦点陷阱 | [dialog.md](dialog.md) |
| `Web / 通用` | 侧边滑动查阅或编辑详情：需要从屏幕或局部容器右侧滑入、头部手势拖拽退出与模态隔离 | 400ms 侧滑弹簧滑入、头部指针拖拽与 300px/s 飞掷退出、Viewport 与 Contained 双模式、Escape 焦点归还 | [drawer.md](drawer.md) |
| `Web` | 提及与链接富文本卡片悬停预览（移动端无 Hover 禁用，改用 `popover` 或 `surfaces/link-unfurl`） | 500ms 冷启动与 80ms 预热切换、140ms 离开走廊缓冲、视口防碰撞上下翻转、Tab 聚焦即时唤出 | [hover-card.md](hover-card.md) |
| `Web / 通用` | 字段旁点击展开微型表单或复杂解释：需要紧贴触发器弹出、智能碰撞翻转与点击外部关闭 | 锚定跟随与视口防遮挡翻转、400ms 原点对齐缩放弹簧、点击外部延迟关闭、WAI-ARIA Dialog 闭环 | [popover.md](popover.md) |
| `Web / 通用` | 协作空间权限分配与链接分享：包含成员邀请输入、权限下拉切换、成员增删撤回与复制链接 | 锚定弹出面板与层叠角色菜单、邮箱标签化 Chip 输入、成员移除 160ms 折叠与 Undo 恢复、复制链接反馈 | [share-access.md](share-access.md) |
| `Web` | 纯图标或紧凑控件的简短文本提示（依赖光标悬停/键盘聚焦，移动端禁用） | <100ms 快速吸附与保护走廊、幽灵标尺自适应测宽、微模糊文本切换、Tab 聚焦瞬时就位 | [tooltip.md](tooltip.md) |

## 跨类别分流

- 桌面端膨胀为弹窗、移动端自动切换为底部抽屉的响应式双态分享面板 → [share-sheet](../docks-and-tabs/share-sheet.md)
- 移动端/多级任务流底层沉降抽屉栈 → [sheet-stack](../surfaces/sheet-stack.md)
- 垂直多条目手风琴折叠展开 → [accordion](../expand/accordion.md)
- 原地横纵双维拉伸展开卡片 → [expandable-card](../expand/expandable-card.md)
- 动作栏下拉菜单 → [dropdown-menu](../menus/dropdown-menu.md)
