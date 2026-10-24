# Gestures 类别索引

手势优先的交互模型，涵盖基于触控/指针拖拽、持续按压蓄力及物理阻尼惯性的手势反馈。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 破坏性操作的物理防误触：长按蓄力填色、指针捕获、松手中途弹簧回弹倒带、触觉震颤 | 双面同构 `clip-path` 线性剪裁推进、真实弹簧阻尼回弹、12ms 触觉振动、键盘 Space/Enter 长按等价 | [hold-to-confirm.md](hold-to-confirm.md) |
| 列表行手势滑动操作：左右滑动显露动作、深滑直达触发、投掷惯性判断、无障碍菜单降级 | 8px 双轴冲突锁（放行纵向滚动）、阶梯错峰揭露、阈值蓄力、惯性投射、More actions 辅助菜单 | [swipe-actions.md](swipe-actions.md) |

## 跨类别分流

- 桌面端或非纯手势场景下的高风险操作二次确认（药丸原地伸长、倒计时、Undo）→ [confirm-morph](../buttons/confirm-morph.md)
- 常规工具条操作组（纯点击触发，常驻按钮）→ [button-group](../buttons/button-group.md)
- 单按钮内的矢量变形与点赞微交互 → [icon-morph](../buttons/icon-morph.md)
