# 菜单与按钮组：L4 / L5 / L7 / L8

## L4 分割菜单

参考 [split-button 成品](../assets/style-1/split-button/index.html)，静态起点 [03_split_button](../assets/style-1/raw_buttons/03_split_button.html)。定位 `.split-group`、`.split-primary-slot`、`.split-menu`、`.split-chevron`、`openMenu()`、`closeMenu()`、`updateMorphText()`。

适合一个主动作加旁边的替代操作入口。菜单从 `translateY(-5px) scale(0.97)`、opacity 0、blur 2px 进入；关闭时 `translateY(-3px) scale(0.985)`，130ms 退出。箭头转 180° 表达展开。主区域按压 `scale(0.97)` 的事件与 trigger 隔离。

文字入场错峰为 `min(i × 16ms, 80ms)`，退出字符清理 180ms；主区宽度用 `ResizeObserver` 测量，槽宽使用 360ms spring 过渡。示例点击后马上显示成功并在 2200ms 复原，这也是演示逻辑；真实提交应组合 L2。

键盘开合、Escape、外部点击、焦点返回应沿用现有菜单库。CSS opacity/pointer-events 本身不会阻止键盘聚焦；隐藏菜单需要同时处理焦点可达性。退出到完成后再卸载，以免 `display:none` 截断退出效果。快速重新打开时，旧 close cleanup 不应关闭新一轮菜单。

## L5 常规按钮组共享高光

参考 [button-group 成品](../assets/style-1/button-group/index.html)，静态起点 [04_button_group](../assets/style-1/raw_buttons/04_button_group.html)。定位 `placeHighlight()`、`measure()`、`fadeLeave()`、`updateQuietDividers()`。

一组位置稳定的按钮共用一个独立背景层。首次进入先把高光直接放到当前目标，再淡入；组内移动则从上个位置连续过渡到新位置。分别管理 hover、focus、pressed 和持久选择态，不让 hover 抹掉选中状态。

测量以组容器为坐标系，注意边框、缩放及设备像素比。禁用项不进入 hover/focus 路由；若当前项目的禁用语义不同，保持其约定。内部高光不是业务页面的全局鼠标跟随层。

有数字变化再组合 L6；要弹出菜单可组合 L4。组内文字反馈槽有 `.phase.sizer`；不要从旧说明里直接套统一 60ms leave timer，当前成品以函数实际实现为准。

## L7 展开按钮组

参考 [expanding-button-group 成品](../assets/style-1/expanding-button-group/index.html)，静态起点 [06_expanding_button_group](../assets/style-1/raw_buttons/06_expanding_button_group.html)。定位 `.ebg-item`、`.sizer`、`calculateExpandedWidth()`、`applyLayout()`、`.is-ready`。

此成品是 **组内某一项展开文字、其他项收起**。不是整个 FAB 弹出一圈新按钮。展开宽度 = 起始留白 + 图标 + gap + 最大状态文本宽度 + 结束留白；折叠项宽度回到高度。先无过渡设置初态，再加 is-ready，避免挂载时从零宽度滑入。

原始参数：width 420ms；`--ease-morph-spring` 为 `linear(...)` 采样弹簧曲线；鼠标意图延时 35ms，边界滞后保护 4px；文字替换间隔 80ms；成功驻留 1400ms。

展开区域改变命中边界，容易触发来回展开。保留源码的光标移动判定与边界滞后思路；键盘 focus 即刻展开相应项。触摸没有 hover，需要沿用现有点击/聚焦入口。只修改视觉时不要重写选择动作。

示例部分附属过渡引用了根区未定义的 `--ease-spring` / `--ease-snappy`；不要不检查就复制。迁移时使用目标组件已定义的曲线或明确 fallback，确保 computed transition 有效。

## L8 浮动或纵向工具栏

参考 [floating-button-group 成品](../assets/style-1/floating-button-group/index.html)，静态起点 [05_floating_button_group](../assets/style-1/raw_buttons/05_floating_button_group.html)。定位 `.fbg-highlight`、`.fbg-tooltip`、`place()`、`measure()`、`queueTooltip()`、`dismissTooltip()`。

与 L5 共用高光机制，额外处理横向/纵向坐标、浮动背景和提示定位。首次 jump 定位后淡入；组内位置变化使用 calm morph。高光起始 scale 0.94；按压高光 scale 0.965；morph token 400ms，snappy token 260ms。

Tooltip 首次延迟 **35ms**，活跃期跨按钮立即跟随；dismiss 立即开始退场，**350ms** 是退出后的预热窗口，不是 tooltip 继续显示的延时。横向默认上方，空间不足改下方；纵向默认右侧，空间不足改左侧；源码有视口边界限制。

不要套旧说明中的“移出后显示 1500ms”到这个成品。提示只辅助理解，按钮本身仍有可访问名称。keyboard focus 也要定位高光和提示，触摸能完成主要动作。resize、容器滚动和字体加载后，按目标布局重新测量，不能只在第一次 hover 测量。
