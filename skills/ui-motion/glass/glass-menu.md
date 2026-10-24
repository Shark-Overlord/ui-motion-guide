---
slug: glass-menu
category: glass
---

# Glass Menu · 玻璃拟态菜单

自触发器物理平滑形变为毛玻璃菜单、支持子菜单横向交接自适应高度测量、滑动高光胶囊与就地撤销通知的高端浮动菜单。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 共享外壳 | 玻璃外壳容器（`.glass-menu-shell`） | 触发时自按钮尺寸与圆角原地弹簧膨胀为 256px 菜单面板，毛玻璃模糊与微高光渐显 | 核心玻璃外壳引擎 |
| 菜单项与高光 | 菜单项与滑动高光（`.glass-menu-highlight`） | 光标或方向键游走时高光胶囊在 Y 轴物理滑动，危险项变红，右箭头指示子菜单 | 菜单导航与高光系统 |
| 子菜单交接 | 二级子视图（`.glass-menu-sub`） | 进入时主菜单向左滑出 36px，子菜单向左滑入，外壳同步弹簧测量子菜单高度 | 级联子菜单过渡 |
| 撤销通知条 | 操作反馈条（`.glass-menu-notice`） | 执行删除操作后，菜单收起，底部平滑滑入带有撤销（Undo）按钮的通知条 | 撤销与反馈机制 |
| 演示外壳 | 顶部照片预览、外观切换按钮、演示卡片 | 演示环境布局 | 演示外壳，已删除 |

## 适用

- 多媒体、相册、创意画板等富视觉应用中，针对特定对象的高级操作菜单。
- 菜单包含二级分类（如“移动到相册”），需要在同一玻璃面板内流畅横向滑入滑出并连续重测高度。
- 需要包含防误触的安全撤销（Undo）就地通知条。

## 不适用

- 常规纯文本紧凑型右键或工具栏上下文菜单 → [dropdown-menu](../menus/dropdown-menu.md)
- 围绕单点向外放射展开的圆形弧度菜单 → [orbit-menu](../docks-and-tabs/orbit-menu.md)
- 个人名片与详情展开毛玻璃卡片 → [glass-card](glass-card.md)
- 底部多工具常驻停靠坞与形状托盘 → [dock](../docks-and-tabs/dock.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| closed | 初始默认态；或点击外部/关闭 | 仅呈现毛玻璃触发按钮，菜单折叠 | root-menu |
| root-menu | 点击触发按钮或按上下方向键 | 外壳膨胀展开至 256px 菜单，展示收藏、移动、复制、删除等根选项 | closed / submenu / notice |
| submenu | 点击或右箭头进入“移动到相册” | 根菜单向左退出 36px，子菜单自右侧滑入，外壳高度平滑插值到子菜单高度 | root-menu / closed |
| notice | 点击“删除”等破坏性操作 | 菜单关闭，底部滑入带高斯微模糊的通知条，展示撤销按钮 | closed |

```mermaid
stateDiagram-v2
    [*] --> closed
    closed --> root-menu: 点击触发器 / 方向键
    root-menu --> closed: 点击外部 / Escape
    root-menu --> submenu: 点击二级项 / 右方向键
    submenu --> root-menu: 点击返回 / 左方向键
    submenu --> closed: 点击外部 / Escape
    root-menu --> notice: 点击删除
    notice --> root-menu: 点击撤销 (Undo)
    notice --> closed: 自动超时 / 点击完成
```

## 最小 DOM

```html
<div class="glass-menu-root">
  <!-- 触发器按钮 -->
  <button type="button" class="glass-menu-trigger" aria-haspopup="menu" aria-expanded="false">
    <span>操作选项</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
  </button>

  <!-- 浮动玻璃外壳 -->
  <div class="glass-menu-shell" inert>
    <!-- 滑动高光胶囊 -->
    <div class="glass-menu-highlight" aria-hidden="true"></div>

    <!-- 视图承载层 -->
    <div class="glass-menu-views">
      <!-- 1. 根菜单视图 -->
      <div class="glass-menu-view glass-menu-view-root" role="menu">
        <button type="button" role="menuitem" class="glass-menu-item" data-action="fav">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <span class="glass-menu-item-text">收藏</span>
        </button>
        <button type="button" role="menuitem" class="glass-menu-item" data-action="move" aria-haspopup="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <span class="glass-menu-item-text">移动到相册</span>
          <svg class="glass-menu-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button type="button" role="menuitem" class="glass-menu-item" data-action="copy">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span class="glass-menu-item-text">复制副本</span>
        </button>
        <div class="glass-menu-sep" role="separator"></div>
        <button type="button" role="menuitem" class="glass-menu-item" data-action="delete" data-tone="danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          <span class="glass-menu-item-text">删除照片</span>
        </button>
      </div>

      <!-- 2. 二级相册子菜单 -->
      <div class="glass-menu-view glass-menu-view-sub" role="menu" inert>
        <div class="glass-menu-sub-header">
          <button type="button" class="glass-menu-back-btn" aria-label="返回上级">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span class="glass-menu-sub-title">选择相册</span>
        </div>
        <button type="button" role="menuitem" class="glass-menu-item" data-album="favorites">个人精选</button>
        <button type="button" role="menuitem" class="glass-menu-item" data-album="travel">秋季旅行</button>
        <button type="button" role="menuitem" class="glass-menu-item" data-album="work">工作素材</button>
      </div>
    </div>
  </div>

  <!-- 操作完成通知条 (含撤销) -->
  <div class="glass-menu-notice" aria-live="polite" data-show="false">
    <span class="glass-menu-notice-msg">已删除照片</span>
    <button type="button" class="glass-menu-undo-btn">撤销</button>
  </div>
</div>
```

- `.glass-menu-root`：宿主定位上下文。
- `.glass-menu-trigger`：初始毛玻璃触发器按钮。
- `.glass-menu-shell`：核心物理毛玻璃外壳，动态调整高度与展开动画。
- `.glass-menu-highlight`：项间滑动高光胶囊，自适应危险动作变红。
- `.glass-menu-views` / `.glass-menu-view`：多级菜单视图承载层，在 X 轴实现方向性交接。
- `.glass-menu-notice`：执行删除后出现的浮动撤销通知条。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 外壳展开弹簧 | `visualDuration: 0.42s, bounce: 0.16` | `.glass-menu-shell` 尺寸与高度过渡 | 原型 |
| 视图交接弹簧 | `visualDuration: 0.40s, bounce: 0` | 子菜单横向 X 轴位移 | 原型 |
| 菜单固定宽度 | `256px` | 菜单主体横向宽度 | 原型 |
| 外壳圆角 | `22px` | 玻璃外壳 border-radius | 原型 |
| 子菜单滑移行程 | `36px` | X 轴进退场交接距离 | 原型 |
| 入场模糊时长 | `240ms` 延迟 `60ms` | 菜单项微模糊入场 | 原型 |
| 退场时长 | `120ms` | 菜单项退出 | 原型 |
| 撤销通知条时长 | `360ms` | `.glass-menu-notice` 升起动画 | 原型 |

## CSS

```css
.glass-menu-root {
  --gm-bg: rgba(255, 255, 255, 0.72);
  --gm-fg: #111111;
  --gm-muted: #666666;
  --gm-border: rgba(255, 255, 255, 0.5);
  --gm-shadow: 0 16px 36px rgba(0, 0, 0, 0.14), 0 2px 6px rgba(0, 0, 0, 0.05);
  --gm-highlight: rgba(0, 0, 0, 0.06);
  --gm-danger: #e11d48;
  --gm-danger-bg: rgba(225, 29, 72, 0.12);

  position: relative;
  display: inline-block;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13.5px;
  color: var(--gm-fg);
  user-select: none;
}

/* 触发器 */
.glass-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--gm-border);
  border-radius: 9999px;
  background: var(--gm-bg);
  color: var(--gm-fg);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  backdrop-filter: blur(20px) saturate(1.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  outline: none;
  transition: transform 120ms ease;
}
.glass-menu-trigger:active {
  transform: scale(0.97);
}
.glass-menu-trigger:focus-visible {
  outline: 2px solid currentColor;
}

/* 玻璃外壳 */
.glass-menu-shell {
  position: absolute;
  top: 44px;
  left: 0;
  z-index: 50;
  overflow: hidden;
  width: 256px;
  border: 1px solid var(--gm-border);
  border-radius: 22px;
  background: var(--gm-bg);
  -webkit-backdrop-filter: blur(24px) saturate(1.8);
  backdrop-filter: blur(24px) saturate(1.8);
  box-shadow: var(--gm-shadow);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.95);
  transform-origin: top left;
  transition: opacity 160ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1), height 300ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: height, transform, opacity;
}
.glass-menu-shell:not([inert]) {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

/* 滑动高光胶囊 */
.glass-menu-highlight {
  position: absolute;
  top: 0;
  right: 6px;
  left: 6px;
  border-radius: 10px;
  background: var(--gm-highlight);
  pointer-events: none;
  opacity: 0;
  transition: opacity 120ms ease, transform 180ms cubic-bezier(0.22, 1, 0.36, 1), height 180ms ease, background-color 160ms ease;
  will-change: transform, height;
}
.glass-menu-highlight[data-tone="danger"] {
  background: var(--gm-danger-bg);
}

/* 视图滑动交接层 */
.glass-menu-views {
  position: relative;
  width: 100%;
}
.glass-menu-view {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease;
  will-change: transform, opacity;
}
.glass-menu-view-sub {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transform: translateX(36px);
  opacity: 0;
}
.glass-menu-view-sub:not([inert]) {
  transform: translateX(0);
  opacity: 1;
}
.glass-menu-shell[data-view="sub"] .glass-menu-view-root {
  transform: translateX(-36px);
  opacity: 0;
}

/* 菜单项 */
.glass-menu-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;
  text-align: left;
}
.glass-menu-item[data-tone="danger"] {
  color: var(--gm-danger);
}
.glass-menu-item-text {
  flex: 1;
}
.glass-menu-arrow {
  color: var(--gm-muted);
}
.glass-menu-sep {
  height: 1px;
  margin: 4px 6px;
  background: rgba(0, 0, 0, 0.06);
}

/* 二级菜单顶栏 */
.glass-menu-sub-header {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 4px 4px;
}
.glass-menu-back-btn {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--gm-muted);
  cursor: pointer;
}
.glass-menu-back-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--gm-fg);
}
.glass-menu-sub-title {
  font-weight: 600;
  font-size: 13px;
}

/* 底部撤销通知条 */
.glass-menu-notice {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid var(--gm-border);
  background: var(--gm-bg);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  backdrop-filter: blur(20px) saturate(1.6);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
  opacity: 0;
  pointer-events: none;
  transition: transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.15), opacity 200ms ease;
}
.glass-menu-notice[data-show="true"] {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.glass-menu-undo-btn {
  padding: 2px 8px;
  border: 0;
  border-radius: 6px;
  background: #111111;
  color: #ffffff;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .glass-menu-shell,
  .glass-menu-view,
  .glass-menu-notice,
  .glass-menu-highlight {
    transition: none !important;
  }
}
```

## JS

```js
export function createGlassMenu(root, options = {}) {
  const trigger = root.querySelector('.glass-menu-trigger');
  const shell = root.querySelector('.glass-menu-shell');
  const highlight = root.querySelector('.glass-menu-highlight');
  const rootView = root.querySelector('.glass-menu-view-root');
  const subView = root.querySelector('.glass-menu-view-sub');
  const backBtn = root.querySelector('.glass-menu-back-btn');
  const items = Array.from(root.querySelectorAll('.glass-menu-item'));
  const notice = root.querySelector('.glass-menu-notice');
  const undoBtn = root.querySelector('.glass-menu-undo-btn');

  let isOpen = false;
  let currentView = 'root'; // 'root' | 'sub'
  let noticeTimer = null;

  function updateShellHeight() {
    const activeView = currentView === 'sub' ? subView : rootView;
    if (activeView) {
      shell.style.height = `${activeView.offsetHeight}px`;
    }
  }

  function setOpen(open) {
    if (isOpen === open) return;
    isOpen = open;
    trigger.setAttribute('aria-expanded', String(open));

    if (open) {
      shell.removeAttribute('inert');
      setView('root');
      updateShellHeight();
    } else {
      shell.setAttribute('inert', '');
      setHighlight(null);
      trigger.focus();
    }

    if (typeof options.onToggle === 'function') {
      options.onToggle(open);
    }
  }

  function setView(view) {
    currentView = view;
    shell.dataset.view = view;

    if (view === 'sub') {
      rootView.setAttribute('inert', '');
      subView.removeAttribute('inert');
      subView.querySelector('.glass-menu-item')?.focus({ preventScroll: true });
    } else {
      subView.setAttribute('inert', '');
      rootView.removeAttribute('inert');
      rootView.querySelector('.glass-menu-item')?.focus({ preventScroll: true });
    }
    setHighlight(null);
    updateShellHeight();
  }

  function setHighlight(item) {
    if (!highlight) return;
    if (!item) {
      highlight.style.opacity = '0';
      return;
    }
    highlight.style.opacity = '1';
    highlight.style.transform = `translateY(${item.offsetTop}px)`;
    highlight.style.height = `${item.offsetHeight}px`;
    highlight.dataset.tone = item.dataset.tone || 'default';
  }

  function showNotice(msg) {
    if (!notice) return;
    clearTimeout(noticeTimer);
    const msgEl = notice.querySelector('.glass-menu-notice-msg');
    if (msgEl) msgEl.textContent = msg;
    notice.dataset.show = 'true';

    noticeTimer = setTimeout(() => {
      notice.dataset.show = 'false';
    }, 4000);
  }

  // 绑定事件
  trigger.addEventListener('click', () => setOpen(!isOpen));

  items.forEach(it => {
    it.addEventListener('click', () => {
      const action = it.dataset.action;
      if (action === 'move') {
        setView('sub');
      } else if (action === 'delete') {
        setOpen(false);
        showNotice('已删除照片');
        if (typeof options.onDelete === 'function') options.onDelete();
      } else {
        setOpen(false);
        if (typeof options.onAction === 'function') options.onAction(action);
      }
    });

    it.addEventListener('pointerenter', () => setHighlight(it));
    it.addEventListener('focus', () => setHighlight(it));
  });

  shell.addEventListener('pointerleave', () => setHighlight(null));
  backBtn?.addEventListener('click', () => setView('root'));

  undoBtn?.addEventListener('click', () => {
    notice.dataset.show = 'false';
    if (typeof options.onUndo === 'function') options.onUndo();
  });

  function onKeyDown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      if (currentView === 'sub') setView('root');
      else setOpen(false);
    } else if (e.key === 'ArrowRight' && currentView === 'root') {
      const focused = document.activeElement;
      if (focused?.dataset.action === 'move') {
        e.preventDefault();
        setView('sub');
      }
    } else if (e.key === 'ArrowLeft' && currentView === 'sub') {
      e.preventDefault();
      setView('root');
    }
  }

  function onDocPointerDown(e) {
    if (isOpen && !root.contains(e.target)) {
      setOpen(false);
    }
  }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('pointerdown', onDocPointerDown);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    getState: () => ({ isOpen, currentView }),
    destroy: () => {
      clearTimeout(noticeTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onDocPointerDown);
    }
  };
}
```

## 接入目标项目

- 状态来源：
  - 调用 `createGlassMenu(rootEl, { onAction: (action) => { ... }, onDelete: () => { ... }, onUndo: () => { ... } })` 挂载实例。
  - 用户触发动作或点击撤销按钮时触发对应业务回调。
- 尺寸策略：
  - 菜单宽度固定为 `256px`，高度根据当前激活的视图列表项数量自适应连续重测并过渡。
- 驱动方式：
  - 支持光标点击/悬停，也支持键盘上下左右方向键在层级菜单间穿梭。
  - 卸载时调用 `destroy()` 释放所有定时器与文档级监听器。

## 重入与清理

- 快速切换子菜单：主副菜单通过绝对定位与 `inert` 属性阻断交互，高度变换继承当前高度平滑过渡，无外壳高度抖动。
- 撤销通知条超时防护：4 秒自动超时隐藏通知条，期间再次触发删除自动刷新计时器。
- 卸载清理：`destroy()` 清除 `noticeTimer`，解绑全局 `keydown` 与 `pointerdown` 监听器。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 停用外壳的高度渐变与横向 X 轴滑动动画，子菜单瞬时切换。
  - 高光药丸瞬时跳跃定位，无滑动补间。

## 焦点与键盘

- 键盘可达性：
  - 触发按钮按上下箭头可打开菜单，在“移动到相册”项上按向右箭头进入子菜单，按向左箭头或返回按钮返回主菜单。
  - 任意视图按 `Escape` 逐级退出：子菜单返回主菜单，主菜单关闭。
  - 非活动视图设置 `inert`，键盘 Tab 不会游走到不可见的菜单选项中。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| `backdrop-filter: blur(...)` | 降级为高不透明度纯色表面（如 `background: rgba(255, 255, 255, 0.95)`） |

## 验收清单

- [ ] 点击触发按钮，毛玻璃外壳原地平滑展开至 256px，高光跟随悬停项滑动。
- [ ] 悬停或点击“移动到相册”，主菜单向左滑出，子菜单向左滑入，外壳自适应重测高度。
- [ ] 点击二级菜单返回按钮或按向左方向键，平滑滑回主菜单。
- [ ] 点击“删除照片”，菜单关闭并于底部滑出带撤销（Undo）按钮的毛玻璃通知条。
- [ ] 开启系统减少动态效果偏好时，无位移与高度补间，瞬时完成层级切换。
