# Special Data 类别索引

专门用于多维度数据追踪、排期订座、滚筒日历与跨时区全球协作的特殊领域交互组件。先根据 **Step 1 端型（`Web` vs `Mobile`）** 过滤，再按交互意图选定组件。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `通用` | 多维度日常目标量化达成、健康运动三环、周度习惯打卡历史回溯 | 三重同心 SVG 刻度遮罩、超额环延伸、极坐标游标臂、中心达成率微模糊推移、周视图滑动高光胶囊 | [activity-rings.md](activity-rings.md) |
| `Mobile / 通用` | 餐厅订座、活动时段预约，从紧凑胶囊原位连续展开多步填单表单 | 原地尺寸物理弹簧变型（164×52px 展開）、个位/十位独立数字滚动与复数变形、21 天惯性日期卷带与透镜、4 列时间槽位滑动高光、穿孔小票与打勾生长 | [booking-pill.md](booking-pill.md) |
| `Mobile` | 移动端 3D 滚筒日期时间选择（`Web` 桌面端常规表单优先用 `pickers/date-picker` 或 `time-picker`） | 3D 滚筒圆柱正弦投影与透镜视窗、4 列解耦滚筒独立循环（日期/小时/分钟/上下午）、惯性滑动与临界阻尼磁吸、快捷预设依次错峰入场 | [date-reel.md](date-reel.md) |
| `Web / 通用` | 跨国远程团队时间协调、跨时区全球会议预约与时差可视化 | 24 小时极坐标表盘与多城市同心轨道、15 分钟连续磁吸与动画接管、工作时间扇区扫掠弧线、"Find Overlap" 智能重叠会议时段寻优 | [time-dial.md](time-dial.md) |

## 跨类别分流

- `Web` 常规日历网格选择与日期范围选取 → [date-picker](../pickers/date-picker.md) / [date-range-picker](../pickers/date-range-picker.md)
- `Web` 常规下拉或输入框时间点选择器 → [time-picker](../pickers/time-picker.md)
- 通用多步骤表单与操作按钮触感反馈 → [button](../buttons/button.md)
