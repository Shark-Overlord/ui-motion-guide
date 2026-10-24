# Media 类别索引

多媒体呈现、富文件拖拽投递与双图对比交互的核心动效规范。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 多卡片/轮播图水平滑动导览，需手势惯性吸附、相邻卡片透视弱化与高光胶囊指示条 | 轨道惯性投影（Momentum Projection）、边缘弹性阻尼（0.55）、邻卡 0.9x 缩放与 50% 虚化、胶囊拉伸指示器 | [carousel.md](carousel.md) |
| 多媒体与设计素材批量投递区，需三层纸张 3D 扇形展开吸附、呼吸律动与列表折叠退场 | 三层素材纸张扇形偏转展开（±15deg）、SVG 虚线边框 2.2s 呼吸律动、条目移除高度折叠（280ms） | [file-dropzone.md](file-dropzone.md) |
| 图像修图/渲染前后效果对比，需分界手柄跟随、多边形动态裁剪与 90° 旋转切换 | 动态 clip-path 多边形裁剪、指针拖拽跟随与阻尼停靠、手柄双击居中、键盘高精度步进 | [image-compare.md](image-compare.md) |

## 跨类别分流

- 文档与富文本编辑器内的内联附件投递区（区分于独立媒体库投递） → [file-dropzone](../editors/file-dropzone.md)
- 纵向层叠堆叠式卡片拖拽与滑出 → [card-stack](../cards/card-stack.md)
- 常规数据分页与页码导航跳转 → [pagination](../navigation/pagination.md)
