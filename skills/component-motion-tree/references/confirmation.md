# L9 原地确认与取消/撤销

参考 [confirm-morph 成品](../assets/style-1/confirm-morph/index.html)，静态起点 [09_confirm_morph](../assets/style-1/raw_buttons/09_confirm_morph.html)。定位 `switchFace()`、`syncSurfaceWidth()`、`toConfirming()`、`toCounting()`、`toPending()`、`startHold()`、`cancelHold()`、`toDone()`、`toError()`。

采用此分支前读取业务已有确认约定。用户只要过渡时，为已有确认界面补充形态连续性；只有需求本身要原地确认时才改变交互结构。

```text
idle → confirming
confirming → cancel → idle
confirming → press / hold完成 / countdown完成 → pending
pending → done / error
done → undo请求 → pending → idle（仅真实恢复成功）
error → retry请求 → pending
```

确认模式按业务选择一个：

- press：第二次明确点击确认。
- hold：示例按住 1000ms，提前松开或 pointercancel 取消蓄力；应保留项目可用的键盘确认方式。
- countdown：示例 **3000ms** 倒计时，30ms 采样更新进度，允许取消；不是旧说明中的 5 秒确认倒计时。

视觉将旧面板退出、新面板显示并测量自然宽度，再平滑伸缩。`switchFace()` 的旧面板延后 180ms 隐藏。其注释提到 ResizeObserver，但实际 `syncSurfaceWidth()` 是手动 `getBoundingClientRect()` 测量；不要根据注释声称有持续观察。

演示 pending 使用 1200ms 模拟删除/恢复，done/error 驻留 5000ms 后复原。业务移植用真实结果。**取消提交前的倒计时与提交后的 Undo 是不同能力**：没有真实恢复能力就不展示 Undo；示例的模拟恢复不能证明真实数据可恢复。

重入和模式切换时，清理旧倒计时、蓄力帧、pending 请求和复原 timer，防止过期回调再次执行动作。业务执行只在合法状态下发生一次。退出面板立即停止交互与焦点可达性，最终卸载不能把用户焦点留在隐藏节点。

减少动态效果关闭形态位移/过冲，保留倒计时和按住所表达的业务时间。成功/失败信息通过语义状态呈现，不依赖模糊、颜色或动效本身传达。
