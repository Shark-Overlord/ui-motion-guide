---
slug: dock
category: docks-and-tabs
---

# Dock · 浮动工具栏与形状托盘

集成子工具托盘有机形变、滑动高光、温和提示气泡与机械数字滚轮的浮动应用工具栏。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 工具栏底壳 | SVG 路径底板（`path`） | 静止为圆角胶囊；展开 Shapes 时向上凸起弯曲底托，动态插值高度、中心与宽度 | 核心 SVG 动态路径 |
| 选中高光 | 悬浮高光条（`.dock-selection`） | 切换工具时在各槽位之间平滑物理滑动（spring 0.34s, bounce 0.1） | 工具选中驱动 |
| 形状托盘 | 二级子托盘（`.dock-tray`） | 伴随底板凹口升起，4 项形状（矩形/椭圆/三角/星形）以 35ms 错峰淡入上升 | 子托盘形变与展开 |
| 提示气泡 | 动态提示（`.dock-tip`） | 延迟 380ms 出现；进入 warm 态后横向滑动无延迟；宽度随文字弹性测量过渡 | 提示气泡系统 |
| 评论徽标 | 评论计数（`.dock-badge`） | 垂直 Odometer 滚轮数字滚动（`translateY(-${digit*10}%)`） | 徽标滚轮组件 |
| 拖拽排序 | 工具槽位（`.dock-slot`） | 指针拖动或 Alt+方向键重排时相邻工具计算位移平滑让位 | 工具重排机制 |
| 画布与编辑 | 画布、便签、评论图钉、重置按钮、双击编辑 | 演示环境布局与画布模拟 | 演示外壳，已删除 |
| 顶栏切换 | 外观切换、舞台容器 | 演示环境布局 | 演示外壳，已删除 |

## 适用

- 画板、白板、富媒体或文档编辑应用，需要常驻视口底部的多功能工具切换面板。
- 工具项包含二级子分类（如形状集合），要求子托盘在展开时与父级工具栏保持无缝有机材质形变。
- 需要支持键盘单手高效导航（左右切换、上下进入/退出子托盘、Alt+方向键重排工具）。

## 不适用

- 仅用于页面级 Tab 标签切换的胶囊导航 → [liquid-tab-bar](liquid-tab-bar.md)
- 围绕单点以圆形轨道向外散射的放射型菜单 → [orbit-menu](orbit-menu.md)
- 右下角快捷展开为多类型表单录入的浮动操作按钮 → [action-morph](action-morph.md)
- 顶部网站品牌与多层级导航下拉面板 → [morph-nav](morph-nav.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| idle | 初始静止态；子托盘闭合 | SVG 为 52px 高圆角胶囊，高光停留在当前激活工具 | tray-open / tool-selected / dragging |
| tool-selected | 点击或键盘切换其他工具 | 高光滑动到新工具槽位，形状工具同步更新图标 | idle / tray-open |
| tray-open | 点击 Shapes 工具展开子项 | 底壳 SVG 路径向上拱起 48px，子托盘错峰渐显展开 | idle / tool-selected |
| tooltip-warm | 鼠标悬停超过 380ms 或键盘聚焦 | 提示气泡浮现；700ms 内移向相邻工具时气泡直接平滑滑行，无再次延迟 | idle |
| dragging | 按住工具项水平拖动超过阈值 | 拖动项浮起微缩放大（1.12），相邻工具计算偏移量实时让位 | idle |

```mermaid
stateDiagram-v2
    [*] --> idle
    idle --> tool-selected: 选择工具
    tool-selected --> idle: 动画就绪
    idle --> tray-open: 点击 Shapes 工具
    tray-open --> idle: 再次点击 / 选中子形状 / Escape
    idle --> dragging: 水平拖动工具
    dragging --> idle: 松手吸附归位
```

## 最小 DOM

```html
<div class="dock-root">
  <!-- 动态 SVG 背景底壳 -->
  <svg class="dock-surface" height="52" preserveAspectRatio="none">
    <path class="dock-surface-path" d="" />
  </svg>

  <!-- 二级形状托盘（动态展开） -->
  <div class="dock-tray" role="group" aria-label="形状选项" data-open="false">
    <button type="button" class="dock-tray-item" data-tool="rectangle" aria-label="矩形, R">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
    </button>
    <button type="button" class="dock-tray-item" data-tool="ellipse" aria-label="椭圆, O">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="9"/></svg>
    </button>
    <button type="button" class="dock-tray-item" data-tool="triangle" aria-label="三角形">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3 2 21h20Z"/></svg>
    </button>
    <button type="button" class="dock-tray-item" data-tool="star" aria-label="星形">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    </button>
  </div>

  <!-- 工具栏主体 -->
  <div class="dock-bar" role="toolbar" aria-label="主工具栏">
    <div class="dock-slot" data-tool="move">
      <span class="dock-selection" aria-hidden="true"></span>
      <button type="button" class="dock-item" data-tool="move" aria-label="选择与移动, V" aria-pressed="true">
        <span class="dock-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="m3 3 7 17 2.5-6.5L19 11Z"/></svg></span>
      </button>
    </div>
    <div class="dock-slot" data-tool="hand">
      <button type="button" class="dock-item" data-tool="hand" aria-label="平移画布, H" aria-pressed="false">
        <span class="dock-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v7M10 10.5V6a2 2 0 0 0-4 0v8M6 14v-1.5a1.5 1.5 0 0 0-3 0v4.5A7 7 0 0 0 10 24h4a7 7 0 0 0 7-7v-3a2 2 0 0 0-3-1.7"/></svg></span>
      </button>
    </div>
    <div class="dock-slot" data-tool="shapes">
      <button type="button" class="dock-item" data-tool="shapes" aria-label="形状, R" aria-haspopup="true" aria-expanded="false">
        <span class="dock-icon dock-glyph-slot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
        </span>
      </button>
    </div>
    <div class="dock-slot" data-tool="text">
      <button type="button" class="dock-item" data-tool="text" aria-label="文本, T" aria-pressed="false">
        <span class="dock-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7V4h16v3M12 4v16M9 20h6"/></svg></span>
      </button>
    </div>
    <div class="dock-slot" data-tool="comment">
      <button type="button" class="dock-item" data-tool="comment" aria-label="评论, C" aria-pressed="false">
        <span class="dock-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></span>
        <span class="dock-badge-anchor">
          <span class="dock-badge" data-count="2">
            <span class="dock-digit"><span class="dock-column"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span></span>
          </span>
        </span>
      </button>
    </div>
  </div>

  <!-- 提示气泡 -->
  <div class="dock-tip" aria-hidden="true">
    <span class="dock-tip-measure"></span>
    <span class="dock-tip-row">移动 <kbd class="dock-kbd">V</kbd></span>
  </div>
</div>
```

- `.dock-root`：宿主定位根容器，承载 SVG 底壳、子托盘与提示气泡。
- `.dock-surface` / `.dock-surface-path`：自绘 SVG 背景，根据子托盘展开状态实时计算贝塞尔曲线坐标并渲染出自然隆起的底座凹槽。
- `.dock-tray`：形状子托盘，内部选项错峰出现。
- `.dock-selection`：当前激活工具项的背景高光药丸，通过 JS 在各插槽间连续平移。
- `.dock-badge` / `.dock-column`：机械数字滚轮，数字变动时沿 Y 轴按百分比位移。
- `.dock-tip`：平滑悬浮指示，在工具间连续滑动并根据内容弹性撑开宽度。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 托盘展开弹簧 | `visualDuration: 0.42s, bounce: 0.14` | 托盘高度与 SVG 凸起展开 | 原型 |
| 托盘收起弹簧 | `visualDuration: 0.30s, bounce: 0` | 托盘高度收回 | 原型 |
| 托盘宽度弹簧 | `visualDuration: 0.42s, bounce: 0.08` | SVG 凸起宽度由 40px 扩展至 168px | 原型 |
| 高光药丸滑动 | `visualDuration: 0.34s, bounce: 0.10` | `.dock-selection` 槽位平移 | 原型 |
| 提示气泡弹簧 | `visualDuration: 0.30s, bounce: 0.06` | `.dock-tip` 水平跟随与定位 | 原型 |
| 托盘凸起高度 | `48px` | SVG 路径负 Y 轴上升幅度 | 原型 |
| 托盘展开宽度 | `168px` | `.dock-tray` 宽度与底座平坦段 | 原型 |
| 托盘项错峰延迟 | `35ms` / 初始延迟 `80ms` | 子选项逐个上升动画 | 原型 |
| 提示气泡首次延迟 | `380ms` | 鼠标进入工具后的静默期 | 原型 |
| 提示温和期 | `700ms` | 离开工具后保持 warm 状态的时间 | 原型 |
| 工具拖动比例 | `scale(1.12)` / 弹性系数 `0.14` | 水平拖动排序浮动效果 | 原型 |

## CSS

```css
.dock-root {
  --dock-bg: rgba(255, 255, 255, 0.94);
  --dock-border: rgba(0, 0, 0, 0.08);
  --dock-fg: #111111;
  --dock-muted: #737373;
  --dock-selection-bg: rgba(0, 0, 0, 0.06);
  --dock-shadow: 0 16px 36px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  --dock-badge-bg: #2563eb;
  --dock-badge-fg: #ffffff;

  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  color: var(--dock-fg);
}

/* 自绘 SVG 背景 */
.dock-surface {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.1));
}
.dock-surface-path {
  fill: var(--dock-bg);
  stroke: var(--dock-border);
  stroke-width: 1px;
}

/* 主工具栏 */
.dock-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 6px;
  gap: 2px;
}
.dock-slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}
.dock-item {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--dock-muted);
  cursor: pointer;
  outline: none;
  transition: color 140ms ease;
}
.dock-item:hover,
.dock-item[aria-pressed="true"],
.dock-item[data-selected="true"] {
  color: var(--dock-fg);
}
.dock-item:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}
.dock-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
}

/* 选中高光药丸 */
.dock-selection {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 12px;
  background: var(--dock-selection-bg);
  pointer-events: none;
  will-change: transform;
}

/* 形状子托盘 */
.dock-tray {
  position: absolute;
  bottom: 52px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 44px;
  padding: 0 6px;
  border-radius: 14px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: opacity 160ms ease, transform 160ms ease;
}
.dock-tray[data-open="true"] {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.dock-tray-item {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--dock-muted);
  cursor: pointer;
  outline: none;
  transition: background-color 140ms ease, color 140ms ease;
}
.dock-tray-item:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--dock-fg);
}
.dock-tray-item:focus-visible {
  outline: 2px solid currentColor;
}

/* 评论数字滚轮徽标 */
.dock-badge-anchor {
  position: absolute;
  top: 4px;
  right: 4px;
  pointer-events: none;
}
.dock-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: var(--dock-badge-bg);
  color: var(--dock-badge-fg);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  overflow: hidden;
}
.dock-digit {
  display: inline-block;
  height: 10px;
  overflow: hidden;
}
.dock-column {
  display: flex;
  flex-direction: column;
  transition: transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.15);
}
.dock-column span {
  height: 10px;
  display: grid;
  place-items: center;
}

/* 悬浮提示气泡 */
.dock-tip {
  position: absolute;
  top: -34px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 8px;
  border-radius: 6px;
  background: #111111;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform-origin: center bottom;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  will-change: transform, width, opacity;
}
.dock-tip-measure {
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
}
.dock-tip-row {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.dock-kbd {
  padding: 0 4px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 3px;
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.7);
}

@media (prefers-reduced-motion: reduce) {
  .dock-selection,
  .dock-tip,
  .dock-column {
    transition: none !important;
  }
}
```

## JS

```js
export function createDock(root, options = {}) {
  const surface = root.querySelector('.dock-surface');
  const path = root.querySelector('.dock-surface-path');
  const bar = root.querySelector('.dock-bar');
  const slots = Array.from(root.querySelectorAll('.dock-slot'));
  const items = Array.from(root.querySelectorAll('.dock-item'));
  const selection = root.querySelector('.dock-selection');
  const tray = root.querySelector('.dock-tray');
  const trayItems = Array.from(root.querySelectorAll('.dock-tray-item'));
  const tip = root.querySelector('.dock-tip');
  const tipMeasure = root.querySelector('.dock-tip-measure');
  const tipRow = root.querySelector('.dock-tip-row');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeTool = options.defaultTool || 'move';
  let trayOpen = false;
  let trayH = 0; // 0 to 48
  let trayX = 0;
  let trayW = 40;
  let animId = null;
  let tipTimer = null;
  let warmTimer = null;
  let isWarm = false;

  // 工具提示文案配置
  const toolTips = {
    move: { label: '选择与移动', kbd: 'V' },
    hand: { label: '平移画布', kbd: 'H' },
    shapes: { label: '几何形状', kbd: 'R' },
    text: { label: '添加文本', kbd: 'T' },
    comment: { label: '添加评论', kbd: 'C' },
    rectangle: { label: '矩形', kbd: 'R' },
    ellipse: { label: '椭圆', kbd: 'O' },
    triangle: { label: '三角形', kbd: '' },
    star: { label: '星形', kbd: '' }
  };

  // 生成 SVG 路径
  function getDockPath(w, h, tx, tw) {
    const width = Math.round(w);
    const closed = `M20 0 L${width - 20} 0 A20 20 0 0 1 ${width} 20 L${width} 32 A20 20 0 0 1 ${width - 20} 52 L20 52 A20 20 0 0 1 0 32 L0 20 A20 20 0 0 1 20 0 Z`;
    if (h < 0.5) return closed;

    const neck = Math.min(10, h / 2);
    const wide = Math.min(tw, width - 40 - 2 * neck);
    const center = Math.max(20 + neck + wide / 2, Math.min(width - 20 - neck - wide / 2, tx));
    const l = Math.round(center - wide / 2);
    const r = Math.round(center + wide / 2);
    const curH = Math.round(h);
    const n = Math.round(neck);
    const c = Math.round(Math.max(0, Math.min(18, curH - neck, wide / 2)));

    return `M20 0 L${Math.round(l - n)} 0 Q${l} 0 ${l} ${-n} L${l} ${Math.round(-curH + c)} Q${l} ${-curH} ${Math.round(l + c)} ${-curH} L${Math.round(r - c)} ${-curH} Q${r} ${-curH} ${r} ${Math.round(-curH + c)} L${r} ${-n} Q${r} 0 ${Math.round(r + n)} 0 L${width - 20} 0 A20 20 0 0 1 ${width} 20 L${width} 32 A20 20 0 0 1 ${width - 20} 52 L20 52 A20 20 0 0 1 0 32 L0 20 A20 20 0 0 1 20 0 Z`;
  }

  function renderSurface() {
    const barW = bar.offsetWidth || 240;
    surface.setAttribute('width', `${barW}`);
    path.setAttribute('d', getDockPath(barW, trayH, trayX, trayW));
    if (tray) {
      tray.style.left = `${Math.round(trayX - 84)}px`;
    }
  }

  // 托盘拱起弹簧动画
  function animateTray(targetH, targetW, targetX) {
    cancelAnimationFrame(animId);
    if (reducedMotion) {
      trayH = targetH;
      trayW = targetW;
      trayX = targetX;
      renderSurface();
      return;
    }

    let hPos = trayH, hVel = 0;
    let wPos = trayW, wVel = 0;
    let xPos = trayX, xVel = 0;
    const stiffness = 240, damping = 22;
    let last = performance.now();

    function step(now) {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      const fH = -stiffness * (hPos - targetH) - damping * hVel;
      hVel += fH * dt; hPos += hVel * dt;

      const fW = -stiffness * (wPos - targetW) - damping * wVel;
      wVel += fW * dt; wPos += wVel * dt;

      const fX = -stiffness * (xPos - targetX) - damping * xVel;
      xVel += fX * dt; xPos += xVel * dt;

      trayH = hPos; trayW = wPos; trayX = xPos;
      renderSurface();

      const doneH = Math.abs(hPos - targetH) < 0.2 && Math.abs(hVel) < 1;
      const doneW = Math.abs(wPos - targetW) < 0.2 && Math.abs(wVel) < 1;
      const doneX = Math.abs(xPos - targetX) < 0.2 && Math.abs(xVel) < 1;

      if (!doneH || !doneW || !doneX) {
        animId = requestAnimationFrame(step);
      } else {
        trayH = targetH; trayW = targetW; trayX = targetX;
        renderSurface();
      }
    }
    animId = requestAnimationFrame(step);
  }

  // 切换工具
  function setTool(toolName) {
    activeTool = toolName;
    const targetSlot = slots.find(s => s.dataset.tool === toolName);
    if (targetSlot && selection) {
      targetSlot.prepend(selection);
    }

    items.forEach(btn => {
      const isSelected = btn.dataset.tool === toolName;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.dataset.selected = String(isSelected);
    });

    if (typeof options.onChange === 'function') {
      options.onChange(toolName);
    }
  }

  // 打开/关闭形状托盘
  function toggleTray(open) {
    trayOpen = open;
    const shapesSlot = slots.find(s => s.dataset.tool === 'shapes');
    const shapesBtn = shapesSlot?.querySelector('.dock-item');
    shapesBtn?.setAttribute('aria-expanded', String(open));
    tray?.setAttribute('data-open', String(open));

    if (open) {
      const centerX = shapesSlot ? shapesSlot.offsetLeft + shapesSlot.offsetWidth / 2 : 120;
      animateTray(48, 168, centerX);
    } else {
      animateTray(0, 40, trayX);
    }
  }

  // 提示气泡
  function showTip(btn, immediate = false) {
    if (!tip || !btn) return;
    clearTimeout(tipTimer);
    clearTimeout(warmTimer);

    const tool = btn.dataset.tool;
    const info = toolTips[tool] || { label: tool, kbd: '' };

    tipMeasure.textContent = info.kbd ? `${info.label} ${info.kbd}` : info.label;
    const measuredW = tipMeasure.offsetWidth + 18;

    const run = () => {
      tipRow.innerHTML = `${info.label}${info.kbd ? ` <kbd class="dock-kbd">${info.kbd}</kbd>` : ''}`;
      tip.style.width = `${measuredW}px`;
      tip.style.opacity = '1';
      const slot = btn.closest('.dock-slot') || btn;
      const tipX = slot.offsetLeft + slot.offsetWidth / 2 - measuredW / 2;
      tip.style.transform = `translateX(${tipX}px)`;
      isWarm = true;
    };

    if (immediate || isWarm) {
      run();
    } else {
      tipTimer = setTimeout(run, 380);
    }
  }

  function hideTip() {
    clearTimeout(tipTimer);
    if (tip) tip.style.opacity = '0';
    clearTimeout(warmTimer);
    warmTimer = setTimeout(() => {
      isWarm = false;
    }, 700);
  }

  // 绑定事件
  items.forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      if (tool === 'shapes') {
        toggleTray(!trayOpen);
      } else {
        toggleTray(false);
        setTool(tool);
      }
    });

    btn.addEventListener('pointerenter', e => {
      if (e.pointerType === 'mouse') showTip(btn);
    });
    btn.addEventListener('pointerleave', hideTip);
    btn.addEventListener('focus', () => showTip(btn, true));
    btn.addEventListener('blur', hideTip);
  });

  trayItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      setTool('shapes');
      toggleTray(false);
    });
    btn.addEventListener('pointerenter', () => showTip(btn, true));
    btn.addEventListener('pointerleave', hideTip);
  });

  // 键盘快捷键导航
  function onKeyDown(e) {
    if (e.key === 'Escape' && trayOpen) {
      toggleTray(false);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const idx = items.indexOf(document.activeElement);
      if (idx >= 0) {
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
        items[next].focus();
      }
    }
  }
  root.addEventListener('keydown', onKeyDown);

  // 初始化表面
  setTool(activeTool);
  renderSurface();

  return {
    changeTool: setTool,
    toggleTray,
    getState: () => ({ activeTool, trayOpen }),
    destroy: () => {
      cancelAnimationFrame(animId);
      clearTimeout(tipTimer);
      clearTimeout(warmTimer);
      root.removeEventListener('keydown', onKeyDown);
    }
  };
}
```

## 接入目标项目

- 状态来源：
  - 工具栏通过 `createDock(rootEl, { defaultTool: 'move', onChange: (tool) => { ... } })` 创建。
  - 画布层通过订阅 `onChange` 切换绘图指针状态（Move、Hand、Shapes、Text、Comment）。
- 尺寸策略：
  - 工具栏固定高度 `52px`，宽度根据插槽数量自然展开，居中悬浮于视口底部（如 `bottom: 24px; left: 50%; transform: translateX(-50%);`）。
- 驱动方式：
  - 实例公开 `changeTool(tool)` 与 `toggleTray(open)` 方法，便于外部快捷键联动。
  - 页面注销时调用 `destroy()` 释放全部定时器、事件与动画帧。

## 重入与清理

- 连续快速切换工具：托盘展开与高光滑动采用物理弹簧插值，连续调用自动中断旧帧并从当前物理位置接续，无跳变闪烁。
- 提示气泡温和期防抖：设置 `700ms` warm 周期，避免光标快速横向滑过缝隙时频繁重建/销毁 DOM 节点。
- 卸载清理：`destroy()` 终止 requestAnimationFrame 循环，移除全局键盘与光标监听，防止内存泄露。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 停用 SVG 底座抬升与宽度的连续弹簧动画，瞬时刷新路径坐标。
  - 停用提示气泡位移过渡与工具选中药丸的滑动补间，改为瞬时显隐。
  - 停用评论数字滚轮滚动，数字直接切换。

## 焦点与键盘

- 键盘循环：
  - 左右方向键在主工具栏内循环移动焦点，`Home`/`End` 快速跳转到首尾工具。
  - 在 Shapes 激活状态下按向上箭头展开托盘，托盘内按左右方向键循环，向下方向键或 `Escape` 返回主工具栏。
  - 提示气泡在 `:focus-visible` 时即时呈现，失焦后柔和退出。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| SVG `d` 属性平滑插值 | 降级为直接赋值目标路径字符串，无中间变形过渡 |
| CSS `drop-shadow` | 降级为常规容器 `box-shadow` |

## 验收清单

- [ ] 点击 Shapes 工具，底部 SVG 底座向上平滑凸起成拱桥状，子托盘错峰淡入。
- [ ] 再次点击 Shapes 或选择子形状，拱形底座平滑回缩为常规椭圆胶囊。
- [ ] 切换工具项时，高光药丸连续平移滑动到目标插槽。
- [ ] 鼠标停留 380ms 出现提示气泡，移至相邻工具时气泡水平滑行无延迟。
- [ ] 开启减少动态效果时，所有尺寸与路径瞬时更新，无多余补间。
