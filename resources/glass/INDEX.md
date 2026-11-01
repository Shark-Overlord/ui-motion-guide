# Glass 类别索引

高品质毛玻璃（Glassmorphism）与通透流体拟态交互组件。先根据 **Step 1 端型（`Web` vs `Mobile`）** 过滤，再按交互意图选定组件。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `Web / 通用` | 个人名片与角色卡片展示：需要 3D 空间弹簧倾斜、镜面反光光泽跟随与卡片详情就地高度展开 | 900px 透视 ±6° 倾斜、CSS 径向光斑跟随、自适应高度测量弹簧、文字微模糊升起 | [glass-card.md](glass-card.md) |
| `Web / 通用` | 多媒体与富卡片操作菜单：需要从触发按钮原地膨胀为玻璃菜单，多层级子菜单平滑横向滑动交接 | 共享外壳弹簧膨胀、子菜单 X 轴 36px 交接与高度重测、滑动高光胶囊、操作撤销（Undo）通知条 | [glass-menu.md](glass-menu.md) |
| `Mobile` | 移动端应用主导航底栏：需要悬浮玻璃透镜跟随切换、水平手势擦动吸附以及随页面滚动折叠收缩 | 速度拉伸透镜弹簧、水平拖拽吸附、随内容滚动 62px ↔ 48px 智能收缩、独立搜索解耦 | [glass-tabbar.md](glass-tabbar.md) |

## 跨类别分流

- 常规平面内容卡片或指标卡片 → [card](../cards/card.md)
- 双面带有方向性翻转的全息闪粉会员卡 → [holo-card](../surfaces/holo-card.md)
- `Web` 桌面底部多工具常驻停靠坞 → [dock](../docks-and-tabs/dock.md)
- `Mobile` 双边缘解耦快慢弹簧黏性拉伸底部标签栏 → [liquid-tab-bar](../docks-and-tabs/liquid-tab-bar.md)
- `Web` 顶部全功能网站大型下拉导航条 → [morph-nav](../docks-and-tabs/morph-nav.md)
