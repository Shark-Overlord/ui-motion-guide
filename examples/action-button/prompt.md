# 本次使用 skill 的改造请求

```text
使用 $component-motion-tree 改造 examples/action-button/before.html。
保留静态 Publish 按钮的配色、圆角、高度、字体、边框和阴影。
添加等待、成功和失败反馈；等待时防止重复触发；成功后复原，失败可重试。
文案与图标平滑切换，宽度按当前内容自然过渡。
支持键盘与 prefers-reduced-motion，把结果保存为 after.html。
当前是演示，使用明确标注的本地 Promise 任务适配器，接入业务时可替换为真实请求。
```

决策路径：`buttons → 操作需要等待结果 → buttons/L2`。

读取 [反馈分支](../../skills/component-motion-tree/references/feedback.md) 和 [action-button 源码](../../skills/component-motion-tree/assets/style-1/action-button/index.html)。采用整段交叉过渡与内容测宽，沿用源码的 120ms 按压、240ms 状态过渡、420ms 槽宽过渡、0.97 按压缩放和 2400ms 成功驻留。新增失败与重试状态、操作序号、AbortController 和卸载清理。

这是本次实际按 skill 新增的改造案例。`before.html` 与原始静态毛坯逐字节一致，`after.html` 是本次生成的结果；skill 的原始成品参考保持原样。
