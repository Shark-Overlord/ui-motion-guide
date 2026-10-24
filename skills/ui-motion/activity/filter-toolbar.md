---
slug: filter-toolbar
category: activity
source: inbox/21_Activity/filter-toolbar/
---

# Filter Toolbar · 筛选工具栏

高交互密度的动态数据过滤工具栏。核心动效包含“添加筛选”按钮向下拉菜单的卡片形态形变（Morphing Popover）、过滤标签（Pill）动态插入与删除时的宽度弹性拉伸与收缩、标签数值变更时的微模糊置换、以及全部条件清空时的平滑高度过渡。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 过滤标签栏 | 过滤标签（`.filter-pill`） | 新增时自宽度 0 弹性展开淡入；删除时高度与宽度收敛为 0 并在 200ms 内淡出；数值切换微模糊过渡 | 过滤标签动态增删与宽度流转 |
| 触发器形变 | “添加筛选”按钮（`.btn-add-filter`） | 点击原地弹性拉伸形变为浮层卡片，内部层级步骤错峰展开 | 添加按钮形态形变与菜单弹层 |
| 两级菜单 | 字段与选项列表（`.menu-step`） | 一级字段选择向左推移淡出，二级取值列表向右滑动淡入；支持返回箭头平滑穿入 | 两级下钻滑动与面包屑返回 |
| 清空操作 | “清空全部”按钮（`.btn-clear-all`） | 仅在有过滤条件时渐显；点击后触发标签群体依序退场，工具栏平滑收拢高度 | 全部清空动效与容器尺寸自适应 |
| 演示外壳 | 顶部主题切换、用户头像、模拟数据展示表格 | 演示用途 | 演示外壳，已删除 |

## 适用

- 复杂列表或看板系统上方需要快速增删多字段组合筛选条件的交互场景。
- 允许用户灵活添加、修改具体过滤条件并即时预览当前生效规则。
- 期望触发按钮与弹出菜单无缝连接，消除生硬的弹窗破损感。

## 不适用

- 纯静态多选项单选/多选胶囊组 → [chip-group](../selects/chip-group.md)
- 常规下拉导航菜单与用户面板 → [dropdown-menu](../menus/dropdown-menu.md)
- 纯文本搜索过滤框 → [search-field](../text-fields/search-field.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| idle | 初始静止态 | 展示现有标签列表、“添加筛选”按钮与（可选）“清空全部”按钮 | menu-open / pill-editing |
| menu-open | 点击“添加筛选”按钮 | 按钮向右下展开为菜单卡片，首级字段列表以 30ms 错峰淡入 | idle / menu-drilldown |
| menu-drilldown | 在菜单中选中特定字段（如“状态”） | 字段列表向左平移退出，选项值列表自右侧滑入 | menu-open / idle |
| pill-removing | 点击标签右侧关闭图标（×） | 标签缩放并收窄宽度至 0，相邻标签平滑补位 | idle |

```mermaid
stateDiagram-v2
    [*] --> idle
    idle --> menu-open: 点击添加筛选
    menu-open --> menu-drilldown: 选中字段项
    menu-drilldown --> menu-open: 点击返回上级
    menu-drilldown --> idle: 选中最终数值（生成新标签）
    menu-open --> idle: 点击外部或 Escape
    idle --> pill-removing: 移除单个标签
    pill-removing --> idle: 动画收敛 (200ms)
```

## 最小 DOM

```html
<div class="arc-filter-toolbar" role="toolbar" aria-label="Filter toolbar">
  <div class="filter-pills-container">
    <!-- 过滤标签插槽 -->
    <div class="filter-pill" data-id="status">
      <span class="pill-label">Status:</span>
      <span class="pill-value">Active</span>
      <button class="pill-remove-btn" type="button" aria-label="Remove filter">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>

  <div class="toolbar-actions">
    <!-- 添加按钮与变形菜单宿主 -->
    <div class="filter-menu-anchor">
      <button class="btn-add-filter" type="button" aria-haspopup="true" aria-expanded="false">
        <svg class="icon-plus" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span class="add-text">Filter</span>
      </button>

      <!-- 弹出菜单面板 -->
      <div class="filter-menu-popover" role="menu" aria-hidden="true">
        <div class="menu-stage">
          <div class="menu-list step-fields">
            <button class="menu-item" type="button" data-field="assignee">Assignee</button>
            <button class="menu-item" type="button" data-field="priority">Priority</button>
            <button class="menu-item" type="button" data-field="stage">Stage</button>
          </div>
        </div>
      </div>
    </div>

    <button class="btn-clear-all" type="button">Clear all</button>
  </div>
</div>
```

- `.arc-filter-toolbar`：工具栏主宿主，管理标签排版与高度。
- `.filter-pills-container`：标签弹性自适应容器，负责新旧标签的重排与滑动补位。
- `.filter-pill`：单个筛选标签，包含字段键名、值与移除动作。
- `.filter-menu-anchor`：相对定位锚点，支持按钮直接形变为浮层卡片。
- `.filter-menu-popover`：下拉菜单浮层，承载错峰淡入与多级滑动。
- `.btn-clear-all`：清空全部筛选的快速动作。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 标签插入展开时长 | `240ms` / `cubic-bezier(0.16, 1, 0.3, 1)` | 标签从宽度 0 弹性展开 | 原型 |
| 标签移除收缩时长 | `200ms` / `cubic-bezier(0.22, 1, 0.36, 1)` | 标签收窄至 0 与淡出 | 原型 |
| 菜单展开形变时长 | `280ms` / `cubic-bezier(0.16, 1, 0.3, 1)` | 按钮变形为菜单浮层 | 原型 |
| 菜单项错峰步长 | `25ms` | 菜单子项逐条滑入 | 原型 |
| 菜单两级滑动位移 | `180ms` / `translateX(±12px)` | 字段与取值两级菜单切换 | 原型 |
| 按钮触感微缩 | `scale(0.96)` | `:active` 按压反馈 | 原型 |

## CSS

```css
.arc-filter-toolbar {
  --ease-spring: cubic-bezier(0.18, 0.89, 0.32, 1.15);
  --ease-calm: cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  color: #24292f;
  min-height: 36px;
}

.filter-pills-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 8px 0 10px;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 14px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  transform-origin: left center;
  transition: opacity 180ms ease,
              transform 220ms var(--ease-calm),
              max-width 240ms var(--ease-calm),
              padding 200ms ease;
  max-width: 240px;
}

.filter-pill.pill-enter {
  opacity: 0;
  max-width: 0;
  padding: 0;
  transform: scale(0.85);
}

.filter-pill.pill-exit {
  opacity: 0;
  max-width: 0;
  padding: 0;
  transform: scale(0.8);
}

.pill-label {
  color: #57606a;
}

.pill-value {
  font-weight: 500;
  color: #24292f;
}

.pill-remove-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #57606a;
  cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease;
}

.pill-remove-btn:hover {
  background-color: rgba(27, 31, 36, 0.08);
  color: #24292f;
}

.toolbar-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.filter-menu-anchor {
  position: relative;
}

.btn-add-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border: 1px dashed #d0d7de;
  border-radius: 14px;
  background: transparent;
  color: #57606a;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  transition: transform 140ms var(--ease-spring),
              border-color 160ms ease,
              background-color 160ms ease,
              color 160ms ease;
}

.btn-add-filter:hover {
  border-color: #0969da;
  color: #0969da;
  background-color: rgba(9, 105, 218, 0.04);
}

.btn-add-filter:active {
  transform: scale(0.96);
}

/* 菜单弹出卡片 */
.filter-menu-popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 160px;
  padding: 4px;
  background: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px) scale(0.96);
  transform-origin: top left;
  transition: opacity 180ms ease, transform 240ms var(--ease-calm);
}

.filter-menu-popover[aria-hidden="false"] {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 10px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  color: #24292f;
  text-align: left;
  cursor: pointer;
  transition: background-color 120ms ease;
}

.menu-item:hover,
.menu-item:focus-visible {
  background-color: #f6f8fa;
  color: #0969da;
  outline: none;
}

.btn-clear-all {
  height: 28px;
  padding: 0 8px;
  border: none;
  background: transparent;
  color: #57606a;
  font-size: 12px;
  cursor: pointer;
  transition: color 140ms ease;
}

.btn-clear-all:hover {
  color: #cf222e;
}

@media (prefers-reduced-motion: reduce) {
  .filter-pill,
  .btn-add-filter,
  .filter-menu-popover {
    transition: opacity 120ms ease !important;
    transform: none !important;
    max-width: none !important;
  }
}
```

## JS

```js
export function createFilterToolbar(el, options = {}) {
  const root = el;
  const pillsContainer = root.querySelector('.filter-pills-container');
  const addBtn = root.querySelector('.btn-add-filter');
  const menuPopover = root.querySelector('.filter-menu-popover');
  const clearBtn = root.querySelector('.btn-clear-all');

  let isMenuOpen = false;

  function toggleMenu(open) {
    isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;
    if (menuPopover) {
      menuPopover.setAttribute('aria-hidden', String(!isMenuOpen));
    }
    if (addBtn) {
      addBtn.setAttribute('aria-expanded', String(isMenuOpen));
    }
  }

  function addPill(field, value) {
    if (!pillsContainer) return;
    const pill = document.createElement('div');
    pill.className = 'filter-pill pill-enter';
    pill.dataset.id = field;

    pill.innerHTML = `
      <span class="pill-label">${field}:</span>
      <span class="pill-value">${value}</span>
      <button class="pill-remove-btn" type="button" aria-label="Remove filter">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    pillsContainer.appendChild(pill);

    // 触发平滑展开
    void pill.offsetWidth;
    pill.classList.remove('pill-enter');

    if (options.onAdd) options.onAdd({ field, value });
  }

  function removePill(pill) {
    if (!pill) return;
    pill.classList.add('pill-exit');
    setTimeout(() => {
      pill.remove();
      if (options.onRemove) options.onRemove(pill.dataset.id);
    }, 200);
  }

  function clearAll() {
    if (!pillsContainer) return;
    const pills = Array.from(pillsContainer.querySelectorAll('.filter-pill'));
    pills.forEach((p, idx) => {
      setTimeout(() => removePill(p), idx * 40);
    });
    if (options.onClearAll) options.onClearAll();
  }

  const handleAddBtnClick = (e) => {
    e.stopPropagation();
    toggleMenu();
  };

  const handleMenuItemClick = (e) => {
    const item = e.target.closest('.menu-item');
    if (item) {
      const field = item.dataset.field || item.textContent.trim();
      addPill(field, 'Selected');
      toggleMenu(false);
    }
  };

  const handlePillsClick = (e) => {
    const removeBtn = e.target.closest('.pill-remove-btn');
    if (removeBtn) {
      const pill = removeBtn.closest('.filter-pill');
      removePill(pill);
    }
  };

  const handleOutsideClick = (e) => {
    if (isMenuOpen && !root.contains(e.target)) {
      toggleMenu(false);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(false);
      addBtn?.focus();
    }
  };

  addBtn?.addEventListener('click', handleAddBtnClick);
  menuPopover?.addEventListener('click', handleMenuItemClick);
  pillsContainer?.addEventListener('click', handlePillsClick);
  clearBtn?.addEventListener('click', clearAll);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleKeydown);

  return {
    destroy: () => {
      addBtn?.removeEventListener('click', handleAddBtnClick);
      menuPopover?.removeEventListener('click', handleMenuItemClick);
      pillsContainer?.removeEventListener('click', handlePillsClick);
      clearBtn?.removeEventListener('click', clearAll);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeydown);
    },
    addFilter: addPill,
    clearAll: clearAll
  };
}
```

## 接入目标项目

- 状态来源：
  - 由父层列表或数据表格的数据筛选状态驱动。增删动作通过 `onAdd`、`onRemove` 和 `onClearAll` 抛出并更新全局筛选器。
- 尺寸策略：
  - 工具栏采用 Flexbox 流式布局与自动折行，当标签过多时自然展开多行，卡片高度由内容弹性适应。
- 驱动方式：
  - 页面载入时调用 `const toolbar = createFilterToolbar(root, { onAdd, onRemove, onClearAll })`。
  - 卸载时调用 `toolbar.destroy()` 清除全局点击与按键监听。

## 重入与清理

- 连续快速增删标签：每个标签拥有独立的展开与退场 CSS 类名及退出计时器，不会因多标签并发操作造成动画冻结。
- 卸载清理：`destroy()` 清理绑定在 `document` 上的全局点击与 Escape 按键监听器，避免内存泄露。

## 减少动态效果

- 激活 `prefers-reduced-motion: reduce` 时：
  - 禁用标签的 `max-width` 宽度拉伸与缩放动画，标签插入与移除仅以 120ms 透明度渐变完成。
  - 禁用菜单弹出时的微位移与缩放，直接显示。

## 焦点与键盘

- 工具栏具备 `role="toolbar"`，标签移除按钮具备明确 `aria-label="Remove filter"`。
- “添加筛选”按钮包含 `aria-haspopup="true"` 与 `aria-expanded` 属性同步弹出状态。
- 按 Escape 键可快速关闭打开的筛选菜单并将焦点归还至添加按钮。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| CSS `transform-origin` | 标签从居中缩放展开而非从左侧展开，不影响可用性。 |
| Flexbox `gap` | 回退为子元素外边距（`margin-right: 8px; margin-bottom: 8px;`）。 |

## 验收清单

- [ ] 点击添加筛选按钮，菜单卡片平滑淡入展开；按 Escape 或点击外部平滑合起。
- [ ] 选择筛选字段后，新标签自宽度 0 弹性展开，视觉无卡顿。
- [ ] 点击标签的移除按钮（×），该标签宽度收敛并淡出，后续标签平滑左移归位。
- [ ] 点击清空全部，所有标签依序快速退场。
- [ ] 开启系统减少动态偏好时，所有展开与形变动画停用，改为纯透明度即时呈现。
