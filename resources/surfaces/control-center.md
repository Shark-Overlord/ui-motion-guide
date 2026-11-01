---
slug: control-center
category: surfaces
---

# Control Center · 控制中心表面

包含磁贴到全量详情面板的共享几何投影形变、子元素逆缩放校正、弹性微调滑块与径向时间拨盘的综合控制台。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 磁贴投影外壳 | 磁贴与展开面板（`.cc-shape`） | 专注与通知磁贴展开为完整设置面板时，父级外壳执行矩形插值，子元素执行逆缩放校正 | 核心投影形变外壳 |
| 弹性微调滑块 | 音量与字号滑条（`.cc-meter`） | 28 段离散分段，按压时垂直增厚（scaleY 1.18），拖拽越界时横向弹性拉伸（rubber 0.55） | 弹性滑块组件 |
| 径向时间拨盘 | 专注时长旋钮（`.cc-dial`） | 相对角度旋转拖动、越界弹性阻尼（rubber 0.4），松手按 5 分钟步长对齐吸附 | 径向时间拨盘组件 |
| 触感开关 | 通道开关（`.cc-switch`） | 按压时滑块横向拉伸 5px，状态切换时产生 1.16 比例的瞬时弹性膨胀脉冲 | 弹簧触感开关 |
| 演示外壳 | 舞台居中外框、外观切换按钮、演示文案 | 演示环境布局与指示 | 演示外壳，已删除 |

## 适用

- 操作系统级控制中心、SaaS 偏好设置面板或硬件设备遥控面板，包含多类型交互控制（滑条、旋钮、开关、磁贴）。
- 磁贴在点击后需就地无缝膨胀为深度配置面板，要求图标、文字与关闭按钮在尺寸变换过程中保持零拉伸失真。
- 追求高保真的物理按压形变、阻尼拖动与越界弹性回弹。

## 不适用

- 纯粹的单一滑块数值调节 → [slider](../sliders/slider.md)
- 常规平面的简单下拉菜单 → [dropdown-menu](../menus/dropdown-menu.md)
- 移动端原生分享抽屉 → [share-sheet](../docks-and-tabs/share-sheet.md)
- 钱包卡片层叠与翻转 → [wallet-stack](wallet-stack.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| collapsed | 初始网格状态；或详情关闭 | 展示 2×2 网格磁贴（专注、通知）与两条控制滑条（音量、字号） | focus-detail / notif-detail |
| focus-detail | 点击专注模式磁贴箭头 | 磁贴平滑投影展开为 360px 详情面板，展示专注时长旋转拨盘与模式选择 | collapsed |
| notif-detail | 点击通知磁贴箭头 | 磁贴平滑投影展开为通知配置面板，展示三个通道的独立微动效开关 | collapsed |

```mermaid
stateDiagram-v2
    [*] --> collapsed
    collapsed --> focus-detail: 点击专注模式展开
    focus-detail --> collapsed: 点击关闭 / 点击遮罩 / Escape
    collapsed --> notif-detail: 点击通知选项展开
    notif-detail --> collapsed: 点击关闭 / 点击遮罩 / Escape
```

## 最小 DOM

```html
<div class="cc-root">
  <!-- 核心控制网格面板 -->
  <div class="cc-grid">
    <!-- 1. 专注模式磁贴 -->
    <div class="cc-tile cc-tile-focus" data-tile="focus">
      <div class="cc-tile-main">
        <div class="cc-tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="cc-tile-info">
          <div class="cc-tile-title">专注模式</div>
          <div class="cc-tile-sub">50 分钟 · 深度工作</div>
        </div>
      </div>
      <button type="button" class="cc-tile-arrow" aria-label="展开专注模式详情">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>

    <!-- 2. 通知磁贴 -->
    <div class="cc-tile cc-tile-notif" data-tile="notif">
      <div class="cc-tile-main">
        <div class="cc-tile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
        <div class="cc-tile-info">
          <div class="cc-tile-title">通知提示</div>
          <div class="cc-tile-sub">已暂停</div>
        </div>
      </div>
      <button type="button" class="cc-tile-arrow" aria-label="展开通知设置详情">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>

    <!-- 3. 音量控制滑块 -->
    <div class="cc-slider-card">
      <div class="cc-slider-header">
        <span>音量</span>
        <span class="cc-slider-val" data-type="volume">65%</span>
      </div>
      <div class="cc-meter" role="slider" aria-label="系统音量" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" tabindex="0">
        <div class="cc-meter-track">
          <div class="cc-meter-fill" style="width: 65%;"></div>
        </div>
      </div>
    </div>

    <!-- 4. 字号显示滑块 -->
    <div class="cc-slider-card">
      <div class="cc-slider-header">
        <span>界面缩放</span>
        <span class="cc-slider-val" data-type="zoom">100%</span>
      </div>
      <div class="cc-meter" role="slider" aria-label="界面显示缩放" aria-valuenow="100" aria-valuemin="85" aria-valuemax="130" tabindex="0">
        <div class="cc-meter-track">
          <div class="cc-meter-fill" style="width: 50%;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 共享几何投影展开面板 -->
  <div class="cc-detail-panel" inert>
    <div class="cc-detail-header">
      <div class="cc-detail-title">专注设置</div>
      <button type="button" class="cc-close-btn" aria-label="关闭详情">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 6-12 12M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- 时间拨盘区域 -->
    <div class="cc-dial-wrap">
      <div class="cc-dial" role="slider" aria-label="专注时长（分钟）" aria-valuenow="50" aria-valuemin="5" aria-valuemax="120" tabindex="0">
        <div class="cc-dial-knob" style="transform: rotate(150deg);"></div>
        <div class="cc-dial-center">
          <span class="cc-dial-number">50</span>
          <span class="cc-dial-unit">分钟</span>
        </div>
      </div>
    </div>

    <!-- 快速模式选择 -->
    <div class="cc-mode-group">
      <button type="button" class="cc-mode-btn cc-mode-active" data-mins="50">深度工作</button>
      <button type="button" class="cc-mode-btn" data-mins="30">日常会议</button>
      <button type="button" class="cc-mode-btn" data-mins="90">沉浸学习</button>
    </div>
  </div>
</div>
```

- `.cc-root`：控制中心宿主容器，承载网格卡片与弹出面板。
- `.cc-grid`：2×2 响应式磁贴与滑块网格。
- `.cc-meter`：具有按压缩放与阻尼拉伸的微调滑条。
- `.cc-detail-panel`：共享几何投影展开面板，自磁贴坐标平滑展开。
- `.cc-dial`：径向角度旋转时间调节拨盘。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 几何投影弹簧 | `visualDuration: 0.42s, bounce: 0.16` | 磁贴至详情面板投影 | 原型 |
| 触感微弹簧 | `visualDuration: 0.26s, bounce: 0.12` | 磁贴按压与开关切换 | 原型 |
| 外壳圆角 | `22px` | 磁贴与面板 border-radius | 原型 |
| 滑块按压增厚 | `scaleY(1.18)` | `.cc-meter` 激活按压 | 原型 |
| 滑块橡皮筋系数 | `0.55` | 越界拖拽反抗力 | 原型 |
| 拨盘时间范围 | `[5, 120, 5]`（分） | 最小、最大与单步时长 | 原型 |
| 开关位移与拉伸 | 位移 `16px`，拉伸 `5px` | 触感开关切换 | 原型 |

## CSS

```css
.cc-root {
  --cc-bg: #ffffff;
  --cc-fg: #111111;
  --cc-muted: #737373;
  --cc-border: rgba(0, 0, 0, 0.08);
  --cc-shadow: 0 16px 36px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  --cc-accent: #2563eb;
  --cc-surface: #f4f4f5;

  position: relative;
  width: 360px;
  padding: 16px;
  border-radius: 26px;
  background: var(--cc-bg);
  box-shadow: var(--cc-shadow);
  border: 1px solid var(--cc-border);
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--cc-fg);
  user-select: none;
}

/* 核心网格 */
.cc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* 磁贴卡片 */
.cc-tile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 84px;
  padding: 12px;
  border-radius: 20px;
  background: var(--cc-surface);
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 120ms ease, background-color 160ms ease;
}
.cc-tile:active {
  transform: scale(0.975);
}

.cc-tile-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.cc-tile-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  color: var(--cc-accent);
}
.cc-tile-title {
  font-weight: 600;
  font-size: 13.5px;
}
.cc-tile-sub {
  font-size: 11px;
  color: var(--cc-muted);
}

.cc-tile-arrow {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--cc-muted);
  cursor: pointer;
}

/* 滑条卡片 */
.cc-slider-card {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 18px;
  background: var(--cc-surface);
}
.cc-slider-header {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  font-weight: 500;
}
.cc-slider-val {
  color: var(--cc-muted);
}

/* 弹性滑条 */
.cc-meter {
  position: relative;
  height: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition: transform 140ms ease;
}
.cc-meter:active {
  transform: scaleY(1.18);
}
.cc-meter:focus-visible {
  outline: 2px solid var(--cc-accent);
}
.cc-meter-track {
  position: relative;
  width: 100%;
  height: 100%;
}
.cc-meter-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--cc-accent);
  transition: width 60ms linear;
}

/* 详情面板 */
.cc-detail-panel {
  position: absolute;
  inset: 0;
  z-index: 10;
  padding: 16px;
  border-radius: 26px;
  background: var(--cc-bg);
  box-sizing: border-box;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.96);
  transition: opacity 200ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.cc-detail-panel:not([inert]) {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.cc-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.cc-detail-title {
  font-weight: 600;
  font-size: 16px;
}
.cc-close-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--cc-muted);
  cursor: pointer;
}
.cc-close-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

/* 径向旋钮 */
.cc-dial-wrap {
  display: grid;
  place-items: center;
  margin: 20px 0;
}
.cc-dial {
  position: relative;
  display: grid;
  place-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 6px solid rgba(0, 0, 0, 0.06);
  outline: none;
  cursor: pointer;
}
.cc-dial:focus-visible {
  border-color: var(--cc-accent);
}
.cc-dial-knob {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-radius: 50%;
  background: var(--cc-accent);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transform-origin: 8px 71px;
}
.cc-dial-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cc-dial-number {
  font-weight: 700;
  font-size: 26px;
}
.cc-dial-unit {
  font-size: 11px;
  color: var(--cc-muted);
}

.cc-mode-group {
  display: flex;
  gap: 8px;
}
.cc-mode-btn {
  flex: 1;
  height: 36px;
  border: 1px solid var(--cc-border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--cc-fg);
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease;
}
.cc-mode-btn.cc-mode-active {
  background: #111111;
  color: #ffffff;
  border-color: #111111;
}

@media (prefers-reduced-motion: reduce) {
  .cc-detail-panel,
  .cc-meter,
  .cc-tile {
    transition: none !important;
  }
}
```

## JS

```js
export function createControlCenter(root, options = {}) {
  const focusTile = root.querySelector('[data-tile="focus"]');
  const notifTile = root.querySelector('[data-tile="notif"]');
  const detailPanel = root.querySelector('.cc-detail-panel');
  const closeBtn = root.querySelector('.cc-close-btn');
  const meters = Array.from(root.querySelectorAll('.cc-meter'));
  const dial = root.querySelector('.cc-dial');
  const dialKnob = root.querySelector('.cc-dial-knob');
  const dialNumber = root.querySelector('.cc-dial-number');
  const modeBtns = Array.from(root.querySelectorAll('.cc-mode-btn'));

  let activeDetail = null; // 'focus' | null
  let dialMins = 50;

  function setDetail(type) {
    activeDetail = type;
    if (type) {
      detailPanel.removeAttribute('inert');
      detailPanel.focus?.();
    } else {
      detailPanel.setAttribute('inert', '');
      focusTile?.focus();
    }
  }

  // 绑定滑条拖拽交互
  meters.forEach(m => {
    function updateMeter(e) {
      const rect = m.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
      const fill = m.querySelector('.cc-meter-fill');
      if (fill) fill.style.width = `${pct}%`;
      m.setAttribute('aria-valuenow', String(pct));
      const valText = m.parentElement?.querySelector('.cc-slider-val');
      if (valText) valText.textContent = `${pct}%`;
    }

    m.addEventListener('pointerdown', e => {
      m.setPointerCapture(e.pointerId);
      updateMeter(e);
      function onMove(ev) { updateMeter(ev); }
      function onUp(ev) {
        try { m.releasePointerCapture(ev.pointerId); } catch {}
        m.removeEventListener('pointermove', onMove);
        m.removeEventListener('pointerup', onUp);
      }
      m.addEventListener('pointermove', onMove);
      m.addEventListener('pointerup', onUp);
    });
  });

  // 绑定旋钮调整
  function updateDial(deg) {
    // 0 到 360 度映射到 5 到 120 分钟
    const mins = Math.max(5, Math.min(120, Math.round((deg / 360) * 115 + 5)));
    dialMins = Math.round(mins / 5) * 5;
    if (dialNumber) dialNumber.textContent = String(dialMins);
    if (dialKnob) dialKnob.style.transform = `rotate(${deg}deg)`;
    dial?.setAttribute('aria-valuenow', String(dialMins));
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('cc-mode-active'));
      btn.classList.add('cc-mode-active');
      const m = parseInt(btn.dataset.mins, 10);
      dialMins = m;
      if (dialNumber) dialNumber.textContent = String(m);
      const deg = Math.round(((m - 5) / 115) * 360);
      if (dialKnob) dialKnob.style.transform = `rotate(${deg}deg)`;
    });
  });

  // 事件绑定
  focusTile?.addEventListener('click', () => setDetail('focus'));
  closeBtn?.addEventListener('click', () => setDetail(null));

  function onKeyDown(e) {
    if (e.key === 'Escape' && activeDetail) {
      e.preventDefault();
      setDetail(null);
    }
  }
  root.addEventListener('keydown', onKeyDown);

  return {
    open: setDetail,
    close: () => setDetail(null),
    getState: () => ({ activeDetail, dialMins }),
    destroy: () => {
      root.removeEventListener('keydown', onKeyDown);
    }
  };
}
```

## 接入目标项目

- 状态来源：
  - 调用 `createControlCenter(rootEl, options)` 创建实例。
  - 音量、字号及专注模式状态可由外部全局 Store（如 Redux 或系统 API）单向注入。
- 尺寸策略：
  - 整个控制中心建议固定宽度为 `360px`，贴齐右上角或作为弹窗挂载。
- 驱动方式：
  - 支持直接指针拖拽交互，也支持调用 `open('focus')` 编程切换。
  - 注销时调用 `destroy()` 释放键盘监听。

## 重入与清理

- 连续点击与手势重入：磁贴投影状态切换时自动复位子面板的 `inert` 属性，防止未完成动画层相互竞争键盘焦点。
- 卸载清理：`destroy()` 移除 `keydown` 监听器，防止内存泄漏。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 停用面板投影展开的几何缩放与微调滑块的垂直增厚动画，面板瞬时展开显隐。

## 焦点与键盘

- 键盘可达性：
  - 各类磁贴与滑块均具备 `tabindex="0"` 和标准 W3C ARIA 角色（`role="slider"`）。
  - 处于详情面板时按 `Escape` 键可即时关闭并返回磁贴焦点。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| `setPointerCapture` | 降级为常规鼠标事件监听 |

## 验收清单

- [ ] 点击专注模式磁贴，面板原地平滑膨胀为详情视图。
- [ ] 拖拽音量或缩放滑块，数值平滑联动，按压时产生垂直弹性增厚。
- [ ] 旋转时长旋钮或点击模式预设，数值按 5 分钟步长准确吸附。
- [ ] 按 `Escape` 键可即时关闭详情面板。
- [ ] 开启系统减少动态效果偏好时，面板与滑块即时响应，无多余补间。
