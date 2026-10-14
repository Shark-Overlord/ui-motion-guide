# 操作反馈：L1 / L2 / L3

## L1 按压与轻量状态反馈

参考 [button 成品](../assets/style-1/button/index.html)，静态起点 [01_button](../assets/style-1/raw_buttons/01_button.html)。定位 `.arc-btn`、`.btn-label-swap`、`.icon-swap-wrapper` 和 `swapText()`。

适合只有 hover/press、轻量文本替换或图标替换的按钮。按压在当前按钮上发生，释放回到原尺寸；状态文本用 opacity/filter/transform 退出后更换，再进入。固定槽或最大文本占位用于避免周边布局被短暂的空文本拉动。主动作里真正需要等待请求时走 L2。

源码 `swapText()` 在 160ms 后更换文本；复制演示 2200ms 后复原。它展示视觉节奏，基础页的 Copy 事件没有实际剪贴板写入，不能直接当成业务复制实现。

不要为每次 hover 更换业务文案；不要覆盖已有 drag、position 或父级 transform。需要同时保留布局 transform 和按压缩放时拆成外部定位层与内部反馈层。

## L2 异步状态流转

参考 [action-button 成品](../assets/style-1/action-button/index.html)，静态起点 [02_action_button](../assets/style-1/raw_buttons/02_action_button.html)。定位 `.arc-action-btn`、`updateTextMorph()`、`setState()` 和 `ResizeObserver`。

状态：`idle --触发--> pending --结果--> success / error`。示例只有成功模拟；真实错误分支应沿用项目已有错误处理并提供重新操作的入口。pending 防止重复提交，`aria-busy` 与当前状态一致。是否禁用整个按钮或保持取消入口由业务决定。

原始节奏：按压 `scale(0.97)`；文案/图标标准过渡 240ms；槽宽 420ms；pending 后 80ms 显示 spinner；success 后 60ms 显示对勾；对勾描边有 50ms 延迟。源码模拟 1300ms 后成功并驻留 2400ms 后复原。

移植时删除模拟成功定时器，使用真实 promise/任务结果。视觉驻留可以保留，不能把请求完成时间写死为 1300ms。及时反馈 pending，不为动画延迟发送操作。旧请求可通过 operation id 或取消机制防止覆盖更新后的状态。

文字形态机制：公共前后缀复用；退出字符锁定原坐标并脱离排版；新字符进入；观察真实内容宽度，更新外部槽宽。目标无需逐字效果时使用整段交叉淡化更简单。

## L3 复制反馈

参考 [copy-button 成品](../assets/style-1/copy-button/index.html)，静态起点 [07_copy_button](../assets/style-1/raw_buttons/07_copy_button.html)。定位 `copyToClipboard()`、`morphLabel()`、`linkTimer`、`codeTimer`、`.c-glyph`。

状态：`idle → copying → copied / error → idle`。只有成功写入后才展示 copied。示例使用图标缩放/淡化、对勾描边和文字逐字形态切换；该成品不是 `rotateY(180deg)` 的 3D 翻转。

原始节奏：按压 `scale(0.97)`；文字入场错峰 `min(i × 18ms, 100ms)`；退出字符 180ms 后移除；对勾描边 340ms + 50ms 延迟；成功驻留 **1900ms** 后复原。

源码的重要修正点：`copyToClipboard()` 返回布尔值，但 click handler 忽略它；fallback 调用 `execCommand('copy')` 也没有检查其返回值。迁移时必须检查真实成功结果，失败保持可重试并显示项目已有错误反馈。不要为了演示 Copied 写入固定的 `example.com` 或 `ARC-4821`；使用业务提供的内容。需要回退时按目标环境选择并验证，不把过时 API 当作通用要求。

快速再次复制时，取消旧的复原 timer；一次写入结束前避免并发写入造成错误反馈。对复制按钮所在的 toolbar 组合 L8，保留其焦点模型。
