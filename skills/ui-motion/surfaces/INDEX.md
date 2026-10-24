# Surfaces 类别索引

高阶复合表面（Surfaces）交互系统。涵盖磁贴膨胀仪表盘、全息 3D 双面卡片、富文本行内胶囊到大卡片形变、多层级深度抽屉堆叠以及 3D 纵向钱包卡包。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 综合控制台与快捷偏好：需要磁贴原地膨胀为完整详情面板、子元素逆缩放校正、弹性微调滑块与时间拨盘 | 共享几何投影外壳插值、子元素逆缩放补偿、离散分段垂直增厚滑块、径向阻尼旋转拨盘 | [control-center.md](control-center.md) |
| 会员勋章与数字资产卡片：需要 3D 空间倾角、全息彩虹彩膜、闪粉微粒反光与左右方向性 3D 翻转 | 900px 透视双面旋转、双弹簧（倾斜 vs 光泽）物理材质解耦、正弦三角彩膜色相偏移、反向闪粉视差 | [holo-card.md](holo-card.md) |
| 富文本链接内嵌富媒体预览：键入或粘贴 URL 原地生成行内胶囊，点击平滑展开为大图卡片并支持下拉折叠 | Favicon 锚定绝对坐标映射、非对称双轴展开（水平优先 $1-(1-p)^{1.6}$、垂直跟随 $p^{1.35}$）、半隐式欧拉弹簧、手势下拉折叠 | [link-unfurl.md](link-unfurl.md) |
| 移动端与桌面端多级任务流：设置 → 资料编辑 → 头像选择，深入次级任务时底层平滑沉降退行 | 阶梯深度缩放（$\text{scale} = 1 - \text{depth} \times 0.05$）、向上 0.3 橡皮筋阻尼、位移（$>35\%$）或速度（$>450\text{px/s}$）Dismiss 释放、焦点陷阱隔离 | [sheet-stack.md](sheet-stack.md) |
| 多卡资产与凭证管理：需要紧凑叠放、悬停展开微浮动预备、展开均分铺展、纵向滑动速度投射与 3D 倾斜 | ISO 标准卡片比例、临界阻尼弹簧（$\omega \approx 13.09, \zeta=1.0$）、速度上限截断（Velocity Cap）、惯性衰减投射（0.995）与镜面高光 | [wallet-stack.md](wallet-stack.md) |

## 跨类别分流

- 悬浮主按钮原地平滑展开为多操作菜单或快捷录入表单 → [action-morph](../docks-and-tabs/action-morph.md)
- 常驻视口底部的多工具切换坞与折叠形状子托盘 → [dock](../docks-and-tabs/dock.md)
- 协作分享与权限邀请自适应对话框/底部抽屉 → [share-sheet](../docks-and-tabs/share-sheet.md)
- 通透毛玻璃拟态质感卡片与详情展开 → [glass-card](../glass/glass-card.md)
- 玻璃菜单多层级横向滑动交接 → [glass-menu](../glass/glass-menu.md)
