# Glass 类别索引

高品质毛玻璃（Glassmorphism）与通透流体拟态交互组件。结合背景高斯模糊（backdrop-filter）、3D 物理倾斜、菲涅尔边缘镜面反光与动态尺寸弹簧插值。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 个人名片与角色卡片展示：需要 3D 空间弹簧倾斜、镜面反光光泽跟随与卡片详情就地高度展开 | 900px 透视 ±6° 倾斜、CSS 径向光斑跟随、自适应高度测量弹簧、文字微模糊升起 | [glass-card.md](glass-card.md) |
| 多媒体与富卡片操作菜单：需要从触发按钮原地膨胀为玻璃菜单，多层级子菜单平滑横向滑动交接 | 共享外壳弹簧膨胀、子菜单 X 轴 36px 交接与高度重测、滑动高光胶囊、操作撤销（Undo）通知条 | [glass-menu.md](glass-menu.md) |
| 移动端或应用主导航底栏：需要悬浮玻璃透镜跟随切换、水平手势擦动吸附以及随页面滚动折叠收缩 | 速度拉伸透镜弹簧、水平拖拽吸附、随内容滚动 62px ↔ 48px 智能收缩、独立搜索解耦 | [glass-tabbar.md](glass-tabbar.md) |

## 跨类别分流

- 常规平面内容卡片或指标卡片 → [card](../cards/card.md)
- 双面带有方向性翻转的全息闪粉会员卡 → [holo-card](../surfaces/holo-card.md)
- 底部多工具常驻停靠坞与折叠形状子托盘 → [dock](../docks-and-tabs/dock.md)
- 双边缘解耦快慢弹簧黏性拉伸标签栏 → [liquid-tab-bar](../docks-and-tabs/liquid-tab-bar.md)
- 顶部全功能网站大型下拉导航条 → [morph-nav](../docks-and-tabs/morph-nav.md)
