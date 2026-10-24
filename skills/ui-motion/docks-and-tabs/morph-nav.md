---
slug: morph-nav
category: docks-and-tabs
---

# Morph Nav · 形变导航条

单壳体表面自适应测量多级大型内容面板（Mega Menu），结合弹簧连续插值宽高与圆角、方向性微模糊交接和共享高光药丸的顶栏导航系统。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 形变底壳 | 共享表面外壳（`.morph-nav-surface`） | 测量导航条与活动内容面板，连续弹簧插值宽度、高度与圆角（闭合半圆角 -> 展开 22px） | 核心形变外壳引擎 |
| 顶栏选项 | 导航按钮（`.morph-nav-trigger`） | 下拉箭头旋转 180°，共享滑动高光条（`.morph-nav-highlight`）物理跟随 | 导航触发器与高光条 |
| 多级内容面板 | 展开内容（`.morph-nav-panel`） | Product、Solutions、Resources 页面按切换方向在 X 轴平滑滑入并消除高斯模糊 | 方向性内容交接 |
| 搜索面板 | 快捷搜索（`.morph-nav-search`） | 导航条直接切换为搜索输入框，高度与结果数量连续形变跟随 | 搜索展开视图 |
| 演示外壳 | 顶部品牌横幅、外观切换按钮、路由目的地模拟 | 演示环境布局与指示 | 演示外壳，已删除 |

## 适用

- 官网、SaaS 控制台或企业级门户的主顶部导航，需承载富图文大型下拉面板（Mega Menu）。
- 多个不同尺寸的内容面板在横向切换时，外壳无闪烁、无抖动、如物理材质般连续平滑伸缩。
- 需要兼顾悬停预览（带 60ms 悬停防抖与 180ms 离开缓冲）与键盘无障碍访问。

## 不适用

- 简单紧凑的常规上下文菜单或下拉选项 → [dropdown-menu](../menus/dropdown-menu.md)
- 底部常驻应用工具栏与形状子托盘 → [dock](dock.md)
- 底部纯标签切换胶囊栏 → [liquid-tab-bar](liquid-tab-bar.md)
- 右下角单个 FAB 原地展开多功能表单 → [action-morph](action-morph.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| closed | 初始静止；或光标移出导航栏 | 单层胶囊导航条，高度 44px，圆角 22px，面板折叠隐藏 | open-panel / search |
| open-panel | 光标悬停超过 60ms 或点击某导航项 | 外壳弹簧垂直与水平展开为面板尺寸，圆角收拢为 22px，箭头旋转 180°，内容方向性滑入 | closed / open-panel / search |
| search | 点击搜索触发按钮 | 顶栏切换为搜索框，外壳自适应展开结果面板高度 | closed / open-panel |

```mermaid
stateDiagram-v2
    [*] --> closed
    closed --> open-panel: 悬停触发器 (>60ms) / 键盘回车
    open-panel --> closed: 移出导航区域 (>180ms) / Escape
    open-panel --> open-panel: 滑动至相邻导航项 (方向性交接)
    closed --> search: 点击搜索按钮
    open-panel --> search: 点击搜索按钮
    search --> closed: 点击关闭 / Escape
```

## 最小 DOM

```html
<nav class="morph-nav-root" aria-label="全局导航">
  <!-- 动态物理形变外壳容器 -->
  <div class="morph-nav-surface" style="width: 480px; height: 44px; border-radius: 22px;"></div>

  <!-- 顶栏导航条 -->
  <div class="morph-nav-bar">
    <!-- 共享滑动高光条 -->
    <span class="morph-nav-highlight" aria-hidden="true"></span>

    <div class="morph-nav-items">
      <button type="button" class="morph-nav-trigger" data-section="product" aria-expanded="false" aria-haspopup="true">
        <span>产品</span>
        <svg class="morph-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <button type="button" class="morph-nav-trigger" data-section="solutions" aria-expanded="false" aria-haspopup="true">
        <span>解决方案</span>
        <svg class="morph-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <button type="button" class="morph-nav-trigger" data-section="resources" aria-expanded="false" aria-haspopup="true">
        <span>资源</span>
        <svg class="morph-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
    </div>

    <!-- 搜索入口 -->
    <button type="button" class="morph-nav-search-btn" aria-label="搜索">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
  </div>

  <!-- 展开的面板挂载区 -->
  <div class="morph-nav-panel-wrap">
    <!-- 1. 产品面板 -->
    <div class="morph-nav-panel" data-panel="product" inert>
      <div class="morph-nav-grid">
        <a href="#payments" class="morph-nav-card">
          <div class="morph-nav-card-title">支付系统</div>
          <div class="morph-nav-card-desc">全球多币种在线收单与分账管理</div>
        </a>
        <a href="#billing" class="morph-nav-card">
          <div class="morph-nav-card-title">订阅计费</div>
          <div class="morph-nav-card-desc">灵活账单周期与自动化催收流程</div>
        </a>
      </div>
    </div>

    <!-- 2. 解决方案面板 -->
    <div class="morph-nav-panel" data-panel="solutions" inert>
      <div class="morph-nav-grid">
        <a href="#saas" class="morph-nav-card">
          <div class="morph-nav-card-title">SaaS 平台</div>
          <div class="morph-nav-card-desc">为软件订阅企业打造的收入基础设施</div>
        </a>
        <a href="#platforms" class="morph-nav-card">
          <div class="morph-nav-card-title">交易市场</div>
          <div class="morph-nav-card-desc">多方资金安全托管与实时清算结算</div>
        </a>
      </div>
    </div>

    <!-- 3. 资源面板 -->
    <div class="morph-nav-panel" data-panel="resources" inert>
      <div class="morph-nav-grid">
        <a href="#docs" class="morph-nav-card">
          <div class="morph-nav-card-title">开发者文档</div>
          <div class="morph-nav-card-desc">丰富的 API 参考与快速集成指南</div>
        </a>
        <a href="#guides" class="morph-nav-card">
          <div class="morph-nav-card-title">工程实践</div>
          <div class="morph-nav-card-desc">高可用分布式系统架构深度拆解</div>
        </a>
      </div>
    </div>
  </div>
</nav>
```

- `.morph-nav-root`：导航外层定位上下文，监听全局离开与按键。
- `.morph-nav-surface`：背板形变容器，位于导航条与面板之后，JS 实时将测量尺寸同步至此容器。
- `.morph-nav-highlight`：悬停高光胶囊，在导航触发器之间平滑吸附。
- `.morph-nav-panel-wrap`：所有大面板的绝对定位承载区，统一裁切并管理横向进退场。
- `.morph-nav-panel`：具体内容面板，设置 `inert` 防止不可见时的焦点混淆。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 外壳展开弹簧 | `visualDuration: 0.44s, bounce: 0.06` | `.morph-nav-surface` 尺寸扩展 | 原型 |
| 外壳收拢弹簧 | `visualDuration: 0.34s, bounce: 0` | `.morph-nav-surface` 尺寸收起 | 原型 |
| 高光滑动弹簧 | `visualDuration: 0.30s, bounce: 0.04` | 导航项高光滑动 | 原型 |
| 内容横向滑入 | `visualDuration: 0.40s, bounce: 0` | 面板在 X 轴平滑滑动 | 原型 |
| 悬停开启延迟 | `60ms` | 避免光标无意扫过瞬间触发展开 | 原型 |
| 移出关闭延迟 | `180ms` | 光标移向面板间隙时的保护缓冲 | 原型 |
| 点击防重触发 | `400ms` | 悬停刚刚开启时保护点击事件 | 原型 |
| 面板入场位移 | `X: 20px, Y: -4px` | 面板入场动画起始坐标 | 原型 |
| 面板退场位移 | `X: -10px, Y: -2px` | 面板退出动画终点坐标 | 原型 |
| 入场透明度/模糊 | `240ms / 260ms` | 面板消除高斯模糊与淡入 | 原型 |
| 外壳圆角 | 闭合 `22px`，展开 `22px` | 维持胶囊到圆角面板的平滑过渡 | 原型 |

## CSS

```css
.morph-nav-root {
  --nav-bg: #ffffff;
  --nav-fg: #111111;
  --nav-muted: #666666;
  --nav-highlight: rgba(0, 0, 0, 0.05);
  --nav-shadow: 0 16px 36px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04);
  --nav-border: rgba(0, 0, 0, 0.08);

  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--nav-fg);
  user-select: none;
}

/* 物理背板外壳 */
.morph-nav-surface {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  border: 1px solid var(--nav-border);
  pointer-events: none;
  transform-origin: center top;
  will-change: width, height, border-radius;
  transition: box-shadow 300ms ease;
}

/* 顶栏栏目 */
.morph-nav-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 44px;
  padding: 0 10px;
}

.morph-nav-items {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
}

.morph-nav-highlight {
  position: absolute;
  top: 6px;
  height: 32px;
  border-radius: 9999px;
  background: var(--nav-highlight);
  pointer-events: none;
  opacity: 0;
  will-change: transform, width, opacity;
}

.morph-nav-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 12px;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  color: var(--nav-fg);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}
.morph-nav-trigger:focus-visible {
  outline: 2px solid currentColor;
}

.morph-nav-chevron {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--nav-muted);
}
.morph-nav-trigger[aria-expanded="true"] .morph-nav-chevron {
  transform: rotate(180deg);
}

.morph-nav-search-btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  color: var(--nav-muted);
  cursor: pointer;
}
.morph-nav-search-btn:hover {
  background: var(--nav-highlight);
  color: var(--nav-fg);
}

/* 内容面板容器 */
.morph-nav-panel-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
}

.morph-nav-panel {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 440px;
  padding: 16px;
  box-sizing: border-box;
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity, filter;
}

.morph-nav-panel:not([inert]) {
  opacity: 1;
  pointer-events: auto;
}

.morph-nav-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.morph-nav-card {
  display: block;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: background-color 160ms ease;
}
.morph-nav-card:hover {
  background: rgba(0, 0, 0, 0.04);
}
.morph-nav-card-title {
  font-weight: 600;
  font-size: 13.5px;
  margin-bottom: 2px;
}
.morph-nav-card-desc {
  font-size: 12px;
  color: var(--nav-muted);
  line-height: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .morph-nav-surface,
  .morph-nav-highlight,
  .morph-nav-chevron,
  .morph-nav-panel {
    transition: none !important;
  }
}
```

## JS

```js
export function createMorphNav(root, options = {}) {
  const surface = root.querySelector('.morph-nav-surface');
  const bar = root.querySelector('.morph-nav-bar');
  const triggers = Array.from(root.querySelectorAll('.morph-nav-trigger'));
  const highlight = root.querySelector('.morph-nav-highlight');
  const panels = Array.from(root.querySelectorAll('.morph-nav-panel'));
  const searchBtn = root.querySelector('.morph-nav-search-btn');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let openedSection = null;
  let openTimer = null;
  let leaveTimer = null;
  let animId = null;

  const surfaceMotion = {
    w: { pos: 480, vel: 0 },
    h: { pos: 44, vel: 0 },
    r: { pos: 22, vel: 0 }
  };

  function springStep(state, target, stiffness, damping, dt) {
    const force = -stiffness * (state.pos - target);
    const dampingForce = -damping * state.vel;
    const accel = force + dampingForce;
    state.vel += accel * dt;
    state.pos += state.vel * dt;
  }

  function updateSurface(instant = false) {
    cancelAnimationFrame(animId);
    let targetW = 480;
    let targetH = 44;
    let targetR = 22;

    if (openedSection) {
      const activePanel = panels.find(p => p.dataset.panel === openedSection);
      if (activePanel) {
        targetW = Math.max(activePanel.offsetWidth, 440);
        targetH = 44 + activePanel.offsetHeight + 8;
        targetR = 22;
      }
    }

    if (instant || reducedMotion) {
      surfaceMotion.w.pos = targetW; surfaceMotion.w.vel = 0;
      surfaceMotion.h.pos = targetH; surfaceMotion.h.vel = 0;
      surfaceMotion.r.pos = targetR; surfaceMotion.r.vel = 0;
      surface.style.width = `${targetW}px`;
      surface.style.height = `${targetH}px`;
      surface.style.borderRadius = `${targetR}px`;
      return;
    }

    const stiffness = 240;
    const damping = 24;
    let last = performance.now();

    function step(now) {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      springStep(surfaceMotion.w, targetW, stiffness, damping, dt);
      springStep(surfaceMotion.h, targetH, stiffness, damping, dt);
      springStep(surfaceMotion.r, targetR, stiffness, damping, dt);

      surface.style.width = `${Math.round(surfaceMotion.w.pos)}px`;
      surface.style.height = `${Math.round(surfaceMotion.h.pos)}px`;
      surface.style.borderRadius = `${Math.round(surfaceMotion.r.pos)}px`;

      const doneW = Math.abs(surfaceMotion.w.pos - targetW) < 0.5 && Math.abs(surfaceMotion.w.vel) < 2;
      const doneH = Math.abs(surfaceMotion.h.pos - targetH) < 0.5 && Math.abs(surfaceMotion.h.vel) < 2;

      if (!doneW || !doneH) {
        animId = requestAnimationFrame(step);
      } else {
        surface.style.width = `${targetW}px`;
        surface.style.height = `${targetH}px`;
        surface.style.borderRadius = `${targetR}px`;
      }
    }
    animId = requestAnimationFrame(step);
  }

  function setHighlight(target) {
    if (!highlight) return;
    if (!target) {
      highlight.style.opacity = '0';
      return;
    }
    highlight.style.opacity = '1';
    highlight.style.transform = `translateX(${target.offsetLeft}px)`;
    highlight.style.width = `${target.offsetWidth}px`;
  }

  function openSection(section, instant = false) {
    clearTimeout(openTimer);
    clearTimeout(leaveTimer);
    openedSection = section;

    triggers.forEach(btn => {
      const isCurrent = btn.dataset.section === section;
      btn.setAttribute('aria-expanded', String(isCurrent));
      if (isCurrent) setHighlight(btn);
    });

    panels.forEach(p => {
      const isMatch = p.dataset.panel === section;
      if (isMatch) {
        p.removeAttribute('inert');
      } else {
        p.setAttribute('inert', '');
      }
    });

    updateSurface(instant);

    if (typeof options.onOpen === 'function') {
      options.onOpen(section);
    }
  }

  function closeNav() {
    clearTimeout(openTimer);
    clearTimeout(leaveTimer);
    openedSection = null;

    triggers.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    panels.forEach(p => p.setAttribute('inert', ''));
    setHighlight(null);
    updateSurface();
  }

  // 绑定悬停与离开事件
  triggers.forEach(btn => {
    btn.addEventListener('pointerenter', () => {
      clearTimeout(leaveTimer);
      openTimer = setTimeout(() => {
        openSection(btn.dataset.section);
      }, 60);
    });

    btn.addEventListener('click', () => {
      if (openedSection === btn.dataset.section) {
        closeNav();
      } else {
        openSection(btn.dataset.section, true);
      }
    });

    btn.addEventListener('focus', () => {
      openSection(btn.dataset.section, true);
    });
  });

  root.addEventListener('pointerleave', () => {
    clearTimeout(openTimer);
    leaveTimer = setTimeout(closeNav, 180);
  });

  function onKeyDown(e) {
    if (e.key === 'Escape' && openedSection) {
      e.preventDefault();
      closeNav();
    }
  }
  root.addEventListener('keydown', onKeyDown);

  // 初始化表面尺寸
  updateSurface(true);

  return {
    open: openSection,
    close: closeNav,
    getState: () => ({ openedSection }),
    destroy: () => {
      cancelAnimationFrame(animId);
      clearTimeout(openTimer);
      clearTimeout(leaveTimer);
      root.removeEventListener('keydown', onKeyDown);
    }
  };
}
```

## 接入目标项目

- 状态来源：
  - 通过 `createMorphNav(rootEl, { onOpen: (section) => { ... } })` 挂载实例。
  - 项目路由可通过监听面板内部卡片的点击事件直接触发。
- 尺寸策略：
  - 导航条居中挂载于顶栏，展开面板宽度固定为 `440px` 至 `min(100vw - 2rem, 620px)`，高度根据内容自然测量计算。
- 驱动方式：
  - 外部可调用 `open(section)` 与 `close()` 手动驱动导航状态。
  - 页面卸载时调用 `destroy()` 释放所有定时器与键盘监听。

## 重入与清理

- 快速滑过多项：悬停设置 `60ms` 延迟防抖，光标快速扫过不会触发无意义的展开动画；在已展开状态下移入新项时无额外延迟，直接驱动 X 轴滑入与表面尺寸重测。
- 移出缓冲：移出导航根节点设置 `180ms` 延迟，允许用户斜向将光标滑向下方内容面板而不会造成面板突然闪退。
- 卸载清理：`destroy()` 自动清空 `openTimer` 与 `leaveTimer`，解绑全部键盘监听。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 停用外壳宽高的连续物理弹簧过渡，直接赋予最终像素宽高。
  - 停用高光药丸与箭头的平滑旋转补间。
  - 面板内容直接呈现，无 X 轴位移与高斯模糊。

## 焦点与键盘

- 键盘可达性：
  - 触发器通过 `Tab` 键聚焦时自动展开对应面板并高亮指示。
  - 面板隐藏时设置 HTML5 `inert` 属性，键盘无法 Tab 穿透到隐藏链接中。
  - 任何时候按 `Escape` 键即时折叠当前面板，焦点保留在当前触发器上。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| `inert` 属性 | 降级为在隐藏面板上设置 `display: none`，激活时设为 `display: block` |

## 验收清单

- [ ] 光标悬停在导航按钮上超过 60ms，背板外壳平滑扩展为内容面板尺寸，箭头平滑翻转 180°。
- [ ] 在已展开状态下游走到相邻项，外壳平滑过渡到新尺寸，高光药丸连续跟随。
- [ ] 光标离开导航区 180ms 后，外壳平滑收拢回 44px 胶囊状态。
- [ ] 按 `Escape` 键可即时关闭展开的面板。
- [ ] 开启系统减少动态效果偏好时，无弹性插值与位移，尺寸即时切换。
