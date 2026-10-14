# L10 持久开关与图标切换

参考 [icon-morph 成品](../assets/style-1/icon-morph/index.html)，静态起点 [08_icon_morph](../assets/style-1/raw_buttons/08_icon_morph.html)。定位 `PLAY_D`、`PAUSE_D`、`cardPlay`、`cardPlus`、`cardMenu`、`cardTheme`、`.icon-card` 和各图标的 CSS。

先区分两种语义：播放/暂停、菜单/关闭、喜欢/取消属于持续状态；复制后的对勾属于短暂结果，业务语义走 L3。状态和可访问名称/aria-pressed 或 aria-expanded 一起变化，不能只有图标变化。

根据图标结构二次分支：

| 条件 | 选用机制 |
| --- | --- |
| 路径命令类型、数量、顺序兼容 | 同路径坐标插值，如示例 Play/Pause、Plus/Check |
| 多笔画结构清晰 | 线段移动/旋转、描边进度，如 Menu/Close |
| 路径拓扑不同或当前浏览器插值不可靠 | 两图标叠在固定槽内，opacity + 轻微 scale/rotate 交叉过渡 |
| 用户只需轻反馈 | 保持清晰的最终图标，沿用简单 opacity/transform |

成品主体按压 scale 0.95，图标 morph 360ms；对勾描边延迟 50ms。心形是独立 keyframe：450ms 的 0.72 → 1.14 → 1 缩放，带 burst 装饰；只在命中“喜欢反馈”且需求适合时采用，不把粒子推广到所有按钮。

主题参考限制：`style-1/raw_buttons/10_theme_switch.html` 是无 JS 静态太阳按钮，没有动态配对成品；本页 `cardTheme` 可以参考日月图标形态变化，但它只是局部状态演示，没有切换整站主题。需要主题切换时使用项目已有主题状态和持久化，不伪造全局效果、不自动引入其他 style 的皮肤。

减少动态效果时取消 burst、旋转和位移，保留最终图标与实际开关语义。SVG d/r/cx/cy 的 CSS 过渡需在目标浏览器观察，声明存在不代表实际发生插值。
