---
slug: orbit-menu
category: docks-and-tabs
---

# Orbit Menu · 环形放射菜单

以触发点为圆心沿圆弧轨迹错峰展开、集成磁吸透镜吸附、手势牵引绳与矢量图标形变的放射型交互菜单。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 触发按钮 | 主触发器（`.orbit-trigger`） | 按压缩小，拖拽时产生橡皮筋牵引位移（最大 26px），图标在三点/关闭/对勾之间形态插值 | 核心触发与手势系统 |
| 轨道弧线 | 背景 SVG 弧线（`.orbit-track`） | 随菜单展开从中心向两侧扇面描边生长（半径 104px） | 弧线绘制层 |
| 放射子项 | 5 项圆形操作按钮（`.orbit-item`） | 沿 -165° 至 -15° 弧线错峰 35ms 弹出，靠近光标时触发磁吸位移（最大 14px）与微放大（scale 1.32） | 放射选项与磁吸计算 |
| 高光透镜 | 扇区透镜（`.orbit-lens`） | 随当前命中或聚焦项在圆弧轨道上快速平移旋转，危险操作（删除）变红 | 透镜指示器 |
| 说明胶囊 | 提示浮条（`.orbit-pill`） | 根据当前选定操作展示对应名称，宽度弹簧自适应伸缩，完成时展示对勾反馈 | 提示胶囊组件 |
| 演示外壳 | 照片卡片预览、已收藏/已分享标签条、重置按钮 | 演示环境布局与状态反馈 | 演示外壳，已删除 |

## 适用

- 相册、多媒体卡片、文件项等需要轻量级悬浮菜单的场景，用户可点击展开也可按住直接拖向目标操作。
- 需要高度符合人体工学的扇形放射操作，减少光标/手指移动距离。
- 追求极致的物理触觉回馈（牵引绳、磁吸引力、多态图标形变）。

## 不适用

- 项数过多（超过 6 项）且包含复杂子菜单的列表 → [dropdown-menu](../menus/dropdown-menu.md)
- 常驻视口底部的多功能工具切换栏 → [dock](dock.md)
- 原地扩展为多步骤录入表单的悬浮操作 → [action-morph](action-morph.md)
- 移动端底部滑出的分享面板 → [share-sheet](share-sheet.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| closed | 初始默认态；或操作完成复原 | 仅显示居中触发按钮，图标为三点，子项全部收拢且透明 | open / dragging |
| open | 短按触发按钮，或键盘方向键打开 | 轨道弧线展开，5 个子项错峰沿弧线弹出，图标切换为叉号 | closed / target-active |
| dragging | 按住触发按钮直接向外拖动 | 触发按钮产生弹性牵引绳位移，光标靠近子项时子项向光标磁吸偏移 | closed / done |
| target-active | 光标移入有效扇区，或键盘切换子项 | 对应子项高亮放大，透镜转至该角度，提示胶囊更新名称 | open / done |
| done | 松手命中某操作，或点击操作项 | 触发图标形变为对勾，执行操作动画，停留 1400ms 后还原 | closed |

```mermaid
stateDiagram-v2
    [*] --> closed
    closed --> open: 点击触发按钮
    closed --> dragging: 按住向外拖拽
    open --> closed: 点击关闭 / Escape
    open --> target-active: 光标悬停 / 方向键选择
    target-active --> done: 点击 / 快捷键确认
    dragging --> done: 松手在有效扇区内
    dragging --> closed: 松手在无效区域
    done --> closed: 保持 1400ms 自动还原
```

## 最小 DOM

```html
<div class="orbit-root">
  <!-- 弧线与透镜容器 -->
  <div class="orbit-stage" aria-hidden="true">
    <svg class="orbit-track" width="240" height="140" viewBox="-120 -120 240 140">
      <path class="orbit-arc orbit-arc-left" d="" />
      <path class="orbit-arc orbit-arc-right" d="" />
    </svg>
    <div class="orbit-lens"></div>
  </div>

  <!-- 环形放射操作按钮列表 -->
  <div class="orbit-menu" role="menu" aria-label="快捷操作" inert>
    <button type="button" role="menuitem" class="orbit-item" data-action="like" aria-label="收藏" style="--angle: -165deg;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    </button>
    <button type="button" role="menuitem" class="orbit-item" data-action="album" aria-label="加入相册" style="--angle: -127.5deg;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    </button>
    <button type="button" role="menuitem" class="orbit-item" data-action="share" aria-label="分享" style="--angle: -90deg;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
    </button>
    <button type="button" role="menuitem" class="orbit-item" data-action="download" aria-label="下载" style="--angle: -52.5deg;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
    </button>
    <button type="button" role="menuitem" class="orbit-item" data-action="delete" data-tone="danger" aria-label="删除" style="--angle: -15deg;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    </button>
  </div>

  <!-- 中心主触发按钮 -->
  <button type="button" class="orbit-trigger" aria-label="操作选项" aria-haspopup="menu" aria-expanded="false">
    <svg class="orbit-glyph" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
      <circle class="orbit-dot orbit-dot-1" cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle class="orbit-dot orbit-dot-2" cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle class="orbit-dot orbit-dot-3" cx="18" cy="12" r="1.6" fill="currentColor" />
    </svg>
  </button>

  <!-- 提示文字胶囊 -->
  <div class="orbit-pill" aria-hidden="true">
    <span class="orbit-pill-text">操作选项</span>
  </div>
</div>
```

- `.orbit-root`：放射组件挂载基准点，通常定位在卡片正下方或中央。
- `.orbit-trigger`：中心触发按钮，负责接收点击与拖拽手势，并执行牵引绳位移。
- `.orbit-menu`：子选项容器，展开时通过三角函数沿极坐标散开（半径 104px）。
- `.orbit-lens`：高光透镜药丸，根据选中角度旋转并放大，删除项自适应为危险红色。
- `.orbit-track`：背景 SVG 描边圆弧，伴随菜单展开从中央向两侧展开。
- `.orbit-pill`：提示指示胶囊，展示当前高亮动作的友好文案。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 展开半径 | `104px` | 子项相对中心的散开半径 | 原型 |
| 选项角度分布 | `[-165°, -127.5°, -90°, -52.5°, -15°]` | 5 项操作的极坐标角度 | 原型 |
| 展开弹簧 | `visualDuration: 0.50s, bounce: 0.22` | 子项沿径向弹出 | 原型 |
| 收拢弹簧 | `visualDuration: 0.32s, bounce: 0` | 子项收拢回中心 | 原型 |
| 透镜移动弹簧 | `visualDuration: 0.26s, bounce: 0.12` | 高光透镜角度与缩放 | 原型 |
| 子项错峰延迟 | `35ms`（收拢倒序 `18ms`） | 子项逐个弹出时序 | 原型 |
| 磁吸最大范围 | `92px`（最大位移 `14px`） | 光标靠近子项时的吸引力 | 原型 |
| 牵引绳最大位移 | `26px`（橡皮筋阻尼 `0.55`） | 中心按钮随拖拽的拉伸 | 原型 |
| 有效命中范围 | 径向 `34px - 180px`，角偏差 `< 0.35rad` | 拖拽松手触发扇区判定 | 原型 |
| 成功停留保持 | `1400ms` | 对勾反馈保持时长 | 原型 |

## CSS

```css
.orbit-root {
  --orbit-bg: #ffffff;
  --orbit-fg: #111111;
  --orbit-muted: #737373;
  --orbit-shadow: 0 10px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.05);
  --orbit-danger: #e11d48;

  position: relative;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  user-select: none;
  font-family: system-ui, -apple-system, sans-serif;
}

/* 中心触发器 */
.orbit-trigger {
  position: relative;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--orbit-bg);
  color: var(--orbit-fg);
  box-shadow: var(--orbit-shadow);
  cursor: pointer;
  outline: none;
  touch-action: none;
  will-change: transform;
}
.orbit-trigger:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.orbit-glyph {
  transition: transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.15);
}
.orbit-root[data-open="true"] .orbit-glyph {
  transform: rotate(90deg);
}

/* 弧形轨道 */
.orbit-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.orbit-track {
  position: absolute;
  top: -120px;
  left: -120px;
}
.orbit-arc {
  fill: none;
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 1.5px;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
  transition: stroke-dashoffset 360ms ease;
}
.orbit-root[data-open="true"] .orbit-arc {
  stroke-dashoffset: 0;
}

/* 放射子项 */
.orbit-menu {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.orbit-menu:not([inert]) {
  pointer-events: auto;
}

.orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--orbit-bg);
  color: var(--orbit-fg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  outline: none;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 200ms ease, transform 360ms cubic-bezier(0.16, 1, 0.3, 1), background-color 160ms ease;
  will-change: transform, opacity;
}
.orbit-item[data-tone="danger"] {
  color: var(--orbit-danger);
}
.orbit-item:focus-visible {
  outline: 2px solid currentColor;
}
.orbit-item[data-active="true"] {
  transform: scale(1.15) !important;
  background: #f4f4f5;
}

/* 高光透镜 */
.orbit-lens {
  position: absolute;
  top: -22px;
  left: -22px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.06);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.8);
  transition: opacity 160ms ease, transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.orbit-lens[data-danger="true"] {
  background: rgba(225, 29, 72, 0.12);
}

/* 提示文字胶囊 */
.orbit-pill {
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 9999px;
  background: #111111;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.orbit-root[data-open="true"] .orbit-pill {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .orbit-trigger,
  .orbit-glyph,
  .orbit-item,
  .orbit-arc,
  .orbit-lens,
  .orbit-pill {
    transition: none !important;
  }
}
```

## JS

```js
export function createOrbitMenu(root, options = {}) {
  const trigger = root.querySelector('.orbit-trigger');
  const menu = root.querySelector('.orbit-menu');
  const items = Array.from(root.querySelectorAll('.orbit-item'));
  const lens = root.querySelector('.orbit-lens');
  const pill = root.querySelector('.orbit-pill');
  const pillText = root.querySelector('.orbit-pill-text');
  const arcs = Array.from(root.querySelectorAll('.orbit-arc'));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const radius = 104;
  const angles = [-165, -127.5, -90, -52.5, -15].map(deg => (deg * Math.PI) / 180);

  let isOpen = false;
  let activeIndex = null;
  let isDragging = false;
  let dragStart = null;
  let doneTimer = null;

  // 极坐标变换
  function getPoint(r, angle) {
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  }

  // 布局子项
  function layoutItems(open) {
    items.forEach((item, i) => {
      if (open) {
        const pt = getPoint(radius, angles[i]);
        item.style.transform = `translate(${Math.round(pt.x)}px, ${Math.round(pt.y)}px) scale(1)`;
        item.style.opacity = '1';
        item.style.transitionDelay = reducedMotion ? '0ms' : `${i * 35}ms`;
      } else {
        item.style.transform = 'translate(0px, 0px) scale(0.5)';
        item.style.opacity = '0';
        item.style.transitionDelay = reducedMotion ? '0ms' : `${(4 - i) * 18}ms`;
      }
    });
  }

  // 计算弧线 SVG 路径
  function updateArcs() {
    if (arcs.length >= 2) {
      const p1 = getPoint(radius, angles[0]);
      const pMid = getPoint(radius, -Math.PI / 2);
      const p2 = getPoint(radius, angles[4]);

      arcs[0].setAttribute('d', `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 1 ${pMid.x} ${pMid.y}`);
      arcs[1].setAttribute('d', `M ${pMid.x} ${pMid.y} A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}`);
    }
  }

  function setOpen(open) {
    if (isOpen === open) return;
    isOpen = open;
    root.dataset.open = String(open);
    trigger.setAttribute('aria-expanded', String(open));

    if (open) {
      menu.removeAttribute('inert');
      layoutItems(true);
      items[0]?.focus({ preventScroll: true });
    } else {
      menu.setAttribute('inert', '');
      layoutItems(false);
      setActive(null);
      trigger.focus({ preventScroll: true });
    }
  }

  function setActive(index) {
    activeIndex = index;
    items.forEach((it, i) => {
      it.dataset.active = String(i === index);
    });

    if (index !== null) {
      const pt = getPoint(radius, angles[index]);
      lens.style.opacity = '1';
      lens.style.transform = `translate(${pt.x}px, ${pt.y}px) scale(1.2)`;
      const isDanger = items[index].dataset.tone === 'danger';
      lens.dataset.danger = String(isDanger);

      if (pillText) {
        pillText.textContent = items[index].getAttribute('aria-label') || '';
      }
    } else {
      lens.style.opacity = '0';
      lens.style.transform = 'scale(0.8)';
      if (pillText) pillText.textContent = '操作选项';
    }
  }

  function fireAction(index) {
    if (index === null || !items[index]) return;
    const action = items[index].dataset.action;
    setOpen(false);

    if (pillText) {
      pillText.textContent = `已${items[index].getAttribute('aria-label')}`;
    }

    if (typeof options.onAction === 'function') {
      options.onAction(action, index);
    }
  }

  // 命中测试 (以原点为中心的坐标)
  function hitTest(x, y) {
    const dist = Math.hypot(x, y);
    if (dist < 34 || dist > 180) return null;

    const angle = Math.atan2(y, x);
    let best = null, minDiff = Infinity;
    angles.forEach((a, i) => {
      const diff = Math.abs(Math.atan2(Math.sin(angle - a), Math.cos(angle - a)));
      if (diff < minDiff) {
        minDiff = diff;
        best = i;
      }
    });

    return minDiff <= 0.35 ? best : null;
  }

  // 事件绑定
  function onTriggerClick() {
    setOpen(!isOpen);
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    isDragging = true;
    const rect = root.getBoundingClientRect();
    dragStart = {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2
    };
    trigger.setPointerCapture(e.pointerId);
    if (!isOpen) setOpen(true);
  }

  function onPointerMove(e) {
    if (!isDragging || !dragStart) return;
    const x = e.clientX - dragStart.cx;
    const y = e.clientY - dragStart.cy;

    // 牵引绳阻尼拉伸
    const dist = Math.hypot(x, y);
    const pull = dist < 0.1 ? 0 : (dist * 26 * 0.55) / (26 + 0.55 * dist);
    const tx = dist < 0.1 ? 0 : (x / dist) * pull;
    const ty = dist < 0.1 ? 0 : (y / dist) * pull;

    trigger.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;

    // 命中测试
    const hit = hitTest(x, y);
    setActive(hit);
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    trigger.style.transform = 'none';
    try {
      if (trigger.hasPointerCapture(e.pointerId)) {
        trigger.releasePointerCapture(e.pointerId);
      }
    } catch {}

    if (activeIndex !== null) {
      fireAction(activeIndex);
    } else {
      setOpen(false);
    }
  }

  trigger.addEventListener('click', onTriggerClick);
  trigger.addEventListener('pointerdown', onPointerDown);
  trigger.addEventListener('pointermove', onPointerMove);
  trigger.addEventListener('pointerup', onPointerUp);
  trigger.addEventListener('pointercancel', onPointerUp);

  items.forEach((btn, i) => {
    btn.addEventListener('click', () => fireAction(i));
    btn.addEventListener('pointerenter', () => setActive(i));
    btn.addEventListener('focus', () => setActive(i));
  });

  function onKeyDown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = activeIndex === null ? 0 : (activeIndex + 1) % items.length;
      items[next].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = activeIndex === null ? 0 : (activeIndex - 1 + items.length) % items.length;
      items[next].focus();
    }
  }
  root.addEventListener('keydown', onKeyDown);

  // 初始化
  updateArcs();
  layoutItems(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    getState: () => ({ isOpen, activeIndex }),
    destroy: () => {
      clearTimeout(doneTimer);
      trigger.removeEventListener('click', onTriggerClick);
      trigger.removeEventListener('pointerdown', onPointerDown);
      trigger.removeEventListener('pointermove', onPointerMove);
      trigger.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('keydown', onKeyDown);
    }
  };
}
```

## 接入目标项目

- 状态来源：
  - 调用 `createOrbitMenu(rootEl, { onAction: (action, index) => { ... } })` 挂载实例。
  - 用户选定操作后触发 `onAction` 回调（如收藏、相册、分享、下载、删除）。
- 尺寸策略：
  - 核心外框仅 `44×44px`，展开后沿负 Y 轴半圆展开至 `240×140px` 扇区，因此上方建议预留至少 `120px` 呼吸空间。
- 驱动方式：
  - 可点击展开后点按操作，也可直接通过按住拖向目标操作的连续手势驱动。
  - 卸载时调用 `destroy()` 释放全部监听器和定时器。

## 重入与清理

- 连续手势重入：`pointerdown` 时自动重置旧的完成定时器，即时展开并接管指针捕获；拖拽取消事件（`pointercancel`）安全恢复触发器位移并回退菜单。
- 卸载清理：`destroy()` 清理延迟还原定时器，释放 PointerCapture 并注销键盘与指针监听器。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 停用子项弹出时的错峰延迟（stagger），全部选项即时定位于极坐标位置。
  - 停用触发按钮的牵引绳微位移，停用弧线描边动画。
  - 停用高光透镜的旋转与缩放动画，直接显示透明度。

## 焦点与键盘

- 键盘可达性：
  - 聚焦触发器后按回车展开菜单，按左右/上下方向键在 5 个选项间循环游走。
  - 处于任意状态按 `Escape` 键即时收拢菜单并恢复触发按钮焦点。
  - 菜单闭合时子项设置 `inert`，确保键盘不会误聚焦不可见按钮。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| Pointer Events (`setPointerCapture`) | 降级为常规 Mouse/Touch 事件，放弃拖拽手势仅保留点击展开与点选 |

## 验收清单

- [ ] 点击触发按钮，5 项操作沿 -165° 至 -15° 弧线错峰弹出，触发图标旋转 90°。
- [ ] 按住触发按钮向外拖动，触发按钮具有弹性牵引位移，移向某项时该项微放大且高光透镜吸附。
- [ ] 松手在操作项扇区内，执行对应操作并关闭菜单。
- [ ] 方向键在各个子项间循环切换，`Escape` 键即时退出。
- [ ] 开启系统减少动态效果时，所有项瞬时定位，无多余补间。
