# L6 有方向的数字滚动

参考 [button-group 成品](../assets/style-1/button-group/index.html)，静态起点 [04_button_group](../assets/style-1/raw_buttons/04_button_group.html)。定位 `.zoom-sizer`、`.counter-column`、`.counter-glyph`、`DigitColumn`、`AnimatedCounter`、`updateZoomState()`。

先决定数字变化是否值得动画，以及尺寸是否固定。示例缩放组用隐藏 `400%` 撑出最大占位；真实滚轮叠放在稳定的槽内。最大值和最长格式由业务范围决定，不把 `400%` 当作任意数字组件的固定模板。负号、千分位、小数、单位和本地化格式要先处理，不能直接套只支持正整数的类。

示例每列包含 0–9 的绝对定位字形，使用 requestAnimationFrame 更新循环位置，**不是一个包含字符串 0123456789 的单条 translateY 百分比滚带**。单列滚动时长 400ms，easing `1 - (1 - t)^3`；每列 25ms 错峰，增值和减值的列顺序相反。

源码字形偏移：

```js
const offset = ((((i - pos) % 10) + 15) % 10) - 5;
// 位移 offset em；透明度 max(0, 1 - abs(offset))
// abs(offset) >= 1.05 时隐藏；运动时模糊 abs(offset) * 2.5 px
```

从当前可见位置开始下一段，而不是强行回到旧目标再滚。循环应只保留一个，停止时不再 requestAnimationFrame。示例支持增减列，但其 `width: 0 → auto` 不可直接视为平滑插值的保证；固定外槽能隔离周边布局，若确需自适应外宽应测量数值宽度并过渡像素值。

视觉滚轮设为 aria-hidden，同时提供语义数值或更新现有可访问标签。不要让读屏逐位播报每个中间字形。减少动态效果时 JS 直接 render 最终值并停止循环，仅缩短 CSS duration 无法关闭这段动画。

验收：`25 → 100 → 400 → 25`、连续快速正反操作、位数增减、上下界禁用。固定尺寸要求用过渡前后 bounding rect 验证周边布局稳定；当前值与业务数据始终一致。
