# Docks & Tabs 类别索引

常驻视口边缘的停靠坞（Dock）、主导航标签栏（Tab Bar）及其相关的有机表面形变、流体高光与多级展开面板。先根据 **Step 1 端型（`Web` vs `Mobile`）** 过滤，再按交互意图选定组件。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `通用` | 悬浮主操作新建：点击 FAB 原地平滑展开为多操作菜单或就地快速录入表单，无页面跳转 | 物理弹簧插值外壳尺寸与圆角、面板横向微模糊交接、校验失败弹性微晃（nudge shake） | [action-morph.md](action-morph.md) |
| `Web` | 桌面富创作工具栏：需要常驻视口底部的 Mac 风格多工具切换坞，且包含二级折叠形状托盘 | 动态 SVG 拱形底座路径计算、二级托盘错峰展开、滑动高光、温和提示气泡与数字滚轮 | [dock.md](dock.md) |
| `Mobile` | 移动端主导航流体标签栏：需要高品质液态拉伸过渡，激活项展开文字、未激活项收缩为纯图标 | 双边缘解耦快慢弹簧、CSS clip-path 裁切反色透镜、自适应文字宽度测量、水平拖拽惯性吸附 | [liquid-tab-bar.md](liquid-tab-bar.md) |
| `Web` | 桌面官网或大型产品顶栏导航：需要在不同尺寸的 Mega Menu 面板之间无缝变形切换 | 共享表面外壳测量扩展、方向性微模糊滑入滑出、悬停防抖与离开缓冲、共享滑动高光条 | [morph-nav.md](morph-nav.md) |
| `Mobile` | 移动端单手快捷操作：点击或按住直接拖向目标操作，单手拇指圆弧手势完成触发 | 极坐标圆弧错峰放射弹出、距离衰减磁吸引力、中心牵引绳位移、触发图标多态矢量变异 | [orbit-menu.md](orbit-menu.md) |
| `通用（双态）` | 协作分享与权限邀请：桌面端原地弹簧膨胀为对话框，移动端自适应为底部原生滑出抽屉 | 响应式双态切换、手势下滑阈值与速度关闭、链接复制微模糊状态置换、异步提交 Spinner | [share-sheet.md](share-sheet.md) |

## 跨类别分流

- `Web / 通用` 常规内容区平行标签页切换 → [tabs](../navigation/tabs.md)
- `Mobile` 随页面滚动智能收缩的毛玻璃底部标签栏 → [glass-tabbar](../glass/glass-tabbar.md)
- 局部表单提交或带加载状态的常规按钮 → [action-button](../buttons/action-button.md)
- 常规分段单选按钮组或紧凑工具条 → [button-group](../buttons/button-group.md)
- `Web` 纯图标浮动操作条与智能提示 → [floating-button-group](../buttons/floating-button-group.md)
- 常规上下文与下拉选项菜单 → [dropdown-menu](../menus/dropdown-menu.md)
