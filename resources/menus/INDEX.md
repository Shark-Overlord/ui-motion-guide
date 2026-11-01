# Menus 类别索引

菜单、动作列表与上下文弹层交互模型，涵盖基于定位算法的浮动面板、滑动高光胶囊、键盘首字母检索与复杂内嵌控制器。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 任意元素右键或长按呼出操作：光标原点自适应展开、视口防溢出裁剪、滑动高光底板 | 光标坐标捕获、`clampTo` 视口四向防溢出、动态 `transform-origin` 弹簧缩放、条目间 Snappy 滑动高光胶囊 | [context-menu.md](context-menu.md) |
| 标准按钮下拉菜单：带触发器标签自适应测量、上下智能翻转碰撞检测、首字母快速检索、模态焦点锁 | 触发器 Label 幽灵标尺测量、上下边距碰撞自适应翻转（`top/bottom`）、首字母键入搜索（Typeahead）、背景模态锁 | [dropdown-menu.md](dropdown-menu.md) |
| 综合型账户/用户设置菜单：个人资料展示、快捷键标签、行内三段式主题切换、登出异步流转 | 触发器带头像姓名联动、内嵌 3 态 Segmented 主题滑动滑块、Sign out 异步加载与退场切换为 Sign in 状态 | [user-menu.md](user-menu.md) |

## 跨类别分流

- 主操作与下拉选项并存的紧凑型组合按钮 → [split-button](../buttons/split-button.md)
- 高风险破坏性操作的原位确认与倒计时撤销 → [confirm-morph](../buttons/confirm-morph.md)
- 移动端列表行手势滑动显露操作项 → [swipe-actions](../gestures/swipe-actions.md)
