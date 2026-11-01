# Galleries 类别索引

图片画廊、封面流、多列摄影相册与电商商品多视角展示组件。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 音乐专辑、播客海报或徒步路线立体封面浏览，带 3D 景深与地面反射倒影 | 3D 空间透视旋转、临界阻尼弹簧定格、地面镜像倒影、手势与滚轮惯性滑动 | [cover-flow.md](cover-flow.md) |
| 摄影作品集、设计案例流的高性能自适应瀑布流网格，点击展开全屏大图 | 自适应瀑布流网格（Masonry）、共享元素 FLIP 弹簧放大、纵向下拉手势关闭、底部胶片条联动 | [lightbox-gallery.md](lightbox-gallery.md) |
| 相册图库、云相册或时间线相片流，需要调节网格密度（2/3/5 列）并内嵌查看大图 | 动态网格密度切换与 FLIP 重排、等比相框展开、红心收藏弹动与数字滚轮、抓取点锚定下拉关闭 | [photo-grid.md](photo-grid.md) |
| 电商商品详情页（PDP），展示多角度照片、颜色色卡、尺码切换与加购反馈 | 缩略图滑动高光胶囊（Gliding Pill）、主图滑动与交叉淡化、悬停放大镜跟随、规格与价格微模糊置换 | [product-gallery.md](product-gallery.md) |

## 跨类别分流

- 列表项轻量左右滑动决策（保留/忽略卡片）→ [card-stack](../cards/card-stack.md)
- 单张卡片展开为全屏图文阅读详情 → [card](../cards/card.md)
- 纯操作按钮微交互与异步加载流转 → [action-button](../buttons/action-button.md)
