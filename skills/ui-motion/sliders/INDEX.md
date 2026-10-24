# Sliders 类别索引

滑块与连续数值调节交互组件，涵盖常规连续/范围滑动条以及具备触觉橡皮筋拉伸的高级弹性滑块。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 连续数值或双滑块区间调整：音量、预算区间、时间范围调节，需要平滑拇指抬升与停留气泡 | 双滑块区间防碰撞、最近点智能吸附、1.16 拇指抬升、700ms 停留气泡 | [slider.md](slider.md) |
| 物理感播放速率/音调弹性调节：需要橡皮筋超界拉伸、强回弹振荡、刻度磁吸与速度倾斜气泡 | 26px 橡皮筋超界拉伸、500ms 强回弹、刻度 scale(2.1) 脉冲、气泡速度倾角 | [elastic-slider.md](elastic-slider.md) |

## 跨类别分流

- 离散步进数字字段或带加减微调的输入框 → [number-field](../special-inputs/number-field.md)
- 带有货币符号与千分位的金额输入框 → [money-input](../special-inputs/money-input.md)
- 二值功能开关切换器 → [switch](../toggles/switch.md)
- 视图分段选择胶囊 → [segmented-control](../toggles/segmented-control.md)
