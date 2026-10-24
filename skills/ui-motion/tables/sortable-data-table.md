---
slug: sortable-data-table
category: tables
source: inbox/20_Tables/sortable-data-table/
---

# Sortable Data Table 可排序与行选择交互数据表格

`sortable-data-table` 专为管理后台、项目面板、订单结算列表与用户数据中心设计的高级交互表格组件。原生 Vanilla 实现，支持多列头升降序切换、FLIP 物理弹簧行位移重排（400ms）、全选/部分选中（Indeterminate）状态切换、Shift 连击多选、悬浮选中状态胶囊与响应式卡片流降级。

## 原型清单

- `inbox/20_Tables/sortable-data-table/index.html`：表头列、排序手柄、行级多选框、底部已选计数栏原型。
- `inbox/20_Tables/sortable-data-table/styles.css`：固定列宽、斑马纹、排序指示箭头形变与移动端卡片式自适应样式。
- `inbox/20_Tables/sortable-data-table/motion.json`：行移动弹簧（400ms，0 过冲）、箭头旋转形变（260ms，0.12 弹性）与多选淡入淡出参数。

## 适用

- 需支持列头点击实时重排（文本、数字、状态、日期）的中小型业务数据集（百行至千行级）。
- 支持多选批量操作（如导出、归档、删除、标记已读）的数据清单。
- 移动端竖屏自动流式重排为清晰双行卡片的高可用响应式列表。

## 不适用

- 数十万行超大规模需虚拟滚动与双向固定列冻结的复杂网格，建议使用 [data-grid.md](../advanced-charts/data-grid.md)。
- 树状层级展开的文件夹目录，建议使用 [tree-view.md](tree-view.md)。
- 非结构化 JSON 嵌套树查看，建议使用 [json-viewer.md](json-viewer.md)。

## 状态机

```text
[初始加载数据集]
       │
       ▼
 [正常浏览态 (Unsorted)] ◄───────────────────────────────┐
       │                                                 │
       ├─ (点击排序列头) ──► [计算排序键 -> 记录首尾矩形 (FLIP) ──┤
       │                    -> 变换 translateY -> 箭头翻转]│
       │                                                 │
       ├─ (勾选单行 / Shift多选) ─► [更新 SelectedKeys ─────────┤
       │                          -> 更新全选框 (半选/全选)     │
       │                          -> 弹出底部选中操作胶囊]       │
       │                                                 │
       ├─ (点击清空已选) ─────────► [清空选中集合 -> 隐藏操作栏] ─┤
       └─ (视口宽度 < 620px) ─────► [响应式折叠为双行移动卡片]────┘
```

## 最小 DOM

```html
<div class="arc-table-root">
  <div class="arc-table-header-bar">
    <div class="arc-table-caption">项目列表</div>
    <div class="arc-table-selection-summary" hidden>
      <span class="arc-table-selected-count">已选 0 项</span>
      <button type="button" class="arc-table-clear-btn">清空已选</button>
    </div>
  </div>
  <div class="arc-table-wrapper">
    <table class="arc-table" role="grid">
      <thead>
        <tr>
          <th class="arc-table-th-select">
            <input type="checkbox" class="arc-table-select-all" aria-label="全选" />
          </th>
          <th class="arc-table-th-sortable" data-key="name">项目名称</th>
          <th class="arc-table-th-sortable" data-key="budget">预算金额</th>
          <th class="arc-table-th-sortable" data-key="status">当前状态</th>
          <th class="arc-table-th-sortable" data-key="updatedAt">更新日期</th>
        </tr>
      </thead>
      <tbody>
        <!-- 行级 TR 由 JS 动态装配 -->
      </tbody>
    </table>
  </div>
</div>
```

## 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `Array<Column>` | 预设演示表头 | 列配置定义，包含 key, title, sortable, width, align |
| `rows` | `Array<Row>` | 预设演示数据 | 行数据集，每行需包含唯一 `id` |
| `selectable` | `boolean` | `true` | 是否支持复选框行选中与 Shift 区间多选 |
| `defaultSortKey` | `string` | `'name'` | 初始默认排序字段键名 |
| `defaultSortOrder` | `string` | `'asc'` | 初始排序方向（`'asc'` 或 `'desc'`） |
| `onSelectionChange` | `Function` | `null` | 选中行变更回调 `(selectedIds) => {}` |
| `onSortChange` | `Function` | `null` | 排序规则变更回调 `(sortKey, sortOrder) => {}` |

## CSS

```css
.arc-table-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  position: relative;
}

.arc-table-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: #fdfdfd;
}

.arc-table-caption {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.arc-table-selection-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  animation: arcTableFadeIn 0.2s ease;
}

.arc-table-selected-count {
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
}

.arc-table-clear-btn {
  background: none;
  border: none;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.arc-table-clear-btn:hover {
  color: #ef4444;
  background: #fee2e2;
}

.arc-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.arc-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.arc-table thead th {
  background: #f9fafb;
  padding: 12px 16px;
  font-weight: 600;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  user-select: none;
  white-space: nowrap;
}

.arc-table-th-select {
  width: 44px;
  text-align: center;
}

.arc-table-th-sortable {
  cursor: pointer;
  transition: background 0.16s ease;
}

.arc-table-th-sortable:hover {
  background: #f3f4f6;
  color: #111827;
}

.arc-table-th-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.arc-table-sort-icon {
  width: 14px;
  height: 14px;
  color: #9ca3af;
  transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), color 0.16s ease;
}

.arc-table-th-sortable[data-sort="asc"] .arc-table-sort-icon {
  transform: rotate(180deg);
  color: #2563eb;
}

.arc-table-th-sortable[data-sort="desc"] .arc-table-sort-icon {
  transform: rotate(0deg);
  color: #2563eb;
}

.arc-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.14s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.arc-table tbody tr:hover {
  background: #f9fafb;
}

.arc-table tbody tr[data-selected="true"] {
  background: #eff6ff;
}

.arc-table tbody td {
  padding: 13px 16px;
  color: #374151;
  white-space: nowrap;
}

.arc-table-td-select {
  text-align: center;
}

.arc-table-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.arc-table-badge[data-status="active"] {
  background: #dcfce7;
  color: #15803d;
}

.arc-table-badge[data-status="pending"] {
  background: #fef9c3;
  color: #a16207;
}

.arc-table-badge[data-status="archived"] {
  background: #f3f4f6;
  color: #4b5563;
}

@keyframes arcTableFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 620px) {
  .arc-table-wrapper {
    overflow-x: hidden;
  }
  .arc-table thead {
    display: none;
  }
  .arc-table tbody tr {
    display: flex;
    flex-direction: column;
    padding: 12px;
    margin: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
  }
  .arc-table tbody td {
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
  }
  .arc-table-td-select {
    justify-content: flex-start !important;
  }
}
```

## JS

```js
export function createSortableDataTable(el, options = {}) {
  const defaultColumns = [
    { key: 'name', title: '项目名称', sortable: true },
    { key: 'budget', title: '预算 (万)', sortable: true },
    { key: 'status', title: '状态', sortable: true },
    { key: 'updatedAt', title: '更新时间', sortable: true },
  ];

  const defaultRows = [
    { id: 'p1', name: 'Alpha 引擎重构', budget: 120, status: 'active', updatedAt: '2026-10-18' },
    { id: 'p2', name: 'Gamma 移动客户端', budget: 45, status: 'pending', updatedAt: '2026-10-22' },
    { id: 'p3', name: 'Beta 虚拟网格组件', budget: 85, status: 'active', updatedAt: '2026-10-20' },
    { id: 'p4', name: 'Delta 架构安全审计', budget: 30, status: 'archived', updatedAt: '2026-10-12' },
    { id: 'p5', name: 'Zeta 大语言模型对接', budget: 210, status: 'active', updatedAt: '2026-10-24' }
  ];

  const columns = options.columns || defaultColumns;
  let rows = [...(options.rows || defaultRows)];
  let sortKey = options.defaultSortKey || 'name';
  let sortOrder = options.defaultSortOrder || 'asc';
  const selectedKeys = new Set();
  let lastSelectedIndex = -1;
  let disposed = false;

  el.innerHTML = `
    <div class="arc-table-root">
      <div class="arc-table-header-bar">
        <div class="arc-table-caption">项目排期看板</div>
        <div class="arc-table-selection-summary" hidden>
          <span class="arc-table-selected-count">已选 0 项</span>
          <button type="button" class="arc-table-clear-btn">清空已选</button>
        </div>
      </div>
      <div class="arc-table-wrapper">
        <table class="arc-table" role="grid">
          <thead>
            <tr>
              <th class="arc-table-th-select">
                <input type="checkbox" class="arc-table-select-all" aria-label="全选" />
              </th>
              ${columns.map(col => `
                <th class="${col.sortable ? 'arc-table-th-sortable' : ''}" data-key="${col.key}">
                  <div class="arc-table-th-inner">
                    <span>${col.title}</span>
                    ${col.sortable ? `
                      <svg class="arc-table-sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    ` : ''}
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody class="arc-table-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  const tbody = el.querySelector('.arc-table-tbody');
  const thead = el.querySelector('thead');
  const selectAllBox = el.querySelector('.arc-table-select-all');
  const summaryEl = el.querySelector('.arc-table-selection-summary');
  const selectedCountEl = el.querySelector('.arc-table-selected-count');
  const clearBtn = el.querySelector('.arc-table-clear-btn');

  function sortData() {
    rows.sort((a, b) => {
      let va = a[sortKey];
      let vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortOrder === 'asc' ? va - vb : vb - va;
      }
      va = String(va);
      vb = String(vb);
      return sortOrder === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  function renderRows(animateFlip = false) {
    if (disposed) return;
    const oldPositions = new Map();

    if (animateFlip) {
      tbody.querySelectorAll('tr[data-id]').forEach(tr => {
        const id = tr.getAttribute('data-id');
        oldPositions.set(id, tr.getBoundingClientRect().top);
      });
    }

    tbody.innerHTML = '';

    rows.forEach((row, idx) => {
      const isSelected = selectedKeys.has(row.id);
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', row.id);
      tr.setAttribute('data-selected', isSelected ? 'true' : 'false');
      tr.setAttribute('data-index', idx);

      let cellsHtml = `
        <td class="arc-table-td-select">
          <input type="checkbox" class="arc-table-row-checkbox" ${isSelected ? 'checked' : ''} aria-label="选择行 ${row.name || row.id}" />
        </td>
      `;

      columns.forEach(col => {
        const val = row[col.key];
        if (col.key === 'status') {
          cellsHtml += `<td><span class="arc-table-badge" data-status="${val}">${val}</span></td>`;
        } else {
          cellsHtml += `<td>${val}</td>`;
        }
      });

      tr.innerHTML = cellsHtml;
      tbody.appendChild(tr);
    });

    if (animateFlip && oldPositions.size > 0) {
      requestAnimationFrame(() => {
        tbody.querySelectorAll('tr[data-id]').forEach(tr => {
          const id = tr.getAttribute('data-id');
          const oldTop = oldPositions.get(id);
          if (oldTop !== undefined) {
            const newTop = tr.getBoundingClientRect().top;
            const deltaY = oldTop - newTop;
            if (deltaY !== 0) {
              tr.style.transform = `translateY(${deltaY}px)`;
              tr.style.transition = 'none';
              requestAnimationFrame(() => {
                tr.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                tr.style.transform = 'translateY(0)';
              });
            }
          }
        });
      });
    }

    updateSelectionUI();
    updateHeaderSortUI();
  }

  function updateHeaderSortUI() {
    thead.querySelectorAll('.arc-table-th-sortable').forEach(th => {
      const k = th.getAttribute('data-key');
      if (k === sortKey) {
        th.setAttribute('data-sort', sortOrder);
      } else {
        th.removeAttribute('data-sort');
      }
    });
  }

  function updateSelectionUI() {
    const total = rows.length;
    const count = selectedKeys.size;

    if (count === 0) {
      selectAllBox.checked = false;
      selectAllBox.indeterminate = false;
      summaryEl.hidden = true;
    } else if (count === total) {
      selectAllBox.checked = true;
      selectAllBox.indeterminate = false;
      summaryEl.hidden = false;
    } else {
      selectAllBox.checked = false;
      selectAllBox.indeterminate = true;
      summaryEl.hidden = false;
    }

    selectedCountEl.textContent = `已选 ${count} 项`;
  }

  function handleHeaderClick(e) {
    const th = e.target.closest('.arc-table-th-sortable');
    if (!th) return;
    const key = th.getAttribute('data-key');
    if (!key) return;

    if (sortKey === key) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortOrder = 'asc';
    }

    sortData();
    renderRows(true);

    if (typeof options.onSortChange === 'function') {
      options.onSortChange(sortKey, sortOrder);
    }
  }

  function handleRowSelection(e) {
    const checkbox = e.target.closest('.arc-table-row-checkbox');
    const tr = e.target.closest('tr[data-id]');
    if (!tr) return;

    const id = tr.getAttribute('data-id');
    const idx = parseInt(tr.getAttribute('data-index'), 10);

    if (e.shiftKey && lastSelectedIndex !== -1 && lastSelectedIndex !== idx) {
      const [start, end] = [Math.min(lastSelectedIndex, idx), Math.max(lastSelectedIndex, idx)];
      for (let i = start; i <= end; i++) {
        selectedKeys.add(rows[i].id);
      }
    } else {
      if (selectedKeys.has(id)) {
        selectedKeys.delete(id);
      } else {
        selectedKeys.add(id);
      }
    }

    lastSelectedIndex = idx;
    renderRows(false);

    if (typeof options.onSelectionChange === 'function') {
      options.onSelectionChange(Array.from(selectedKeys));
    }
  }

  function handleSelectAll() {
    if (selectedKeys.size === rows.length) {
      selectedKeys.clear();
    } else {
      rows.forEach(r => selectedKeys.add(r.id));
    }
    renderRows(false);
    if (typeof options.onSelectionChange === 'function') {
      options.onSelectionChange(Array.from(selectedKeys));
    }
  }

  function handleClearSelection() {
    selectedKeys.clear();
    renderRows(false);
    if (typeof options.onSelectionChange === 'function') {
      options.onSelectionChange([]);
    }
  }

  sortData();
  renderRows(false);

  thead.addEventListener('click', handleHeaderClick);
  tbody.addEventListener('click', handleRowSelection);
  selectAllBox.addEventListener('click', handleSelectAll);
  clearBtn.addEventListener('click', handleClearSelection);

  return {
    destroy() {
      disposed = true;
      thead.removeEventListener('click', handleHeaderClick);
      tbody.removeEventListener('click', handleRowSelection);
      selectAllBox.removeEventListener('click', handleSelectAll);
      clearBtn.removeEventListener('click', handleClearSelection);
      el.innerHTML = '';
    }
  };
}
```

## 接入目标项目

```js
import { createSortableDataTable } from './sortable-data-table.md';

const tableContainer = document.getElementById('my-data-table');
const tableInstance = createSortableDataTable(tableContainer, {
  columns: [
    { key: 'name', title: '服务器名称', sortable: true },
    { key: 'cpu', title: 'CPU 负载 (%)', sortable: true },
    { key: 'status', title: '运行状态', sortable: true }
  ],
  rows: [
    { id: 's1', name: 'Worker-Node-01', cpu: 78, status: 'active' },
    { id: 's2', name: 'Master-Gateway', cpu: 24, status: 'active' }
  ],
  onSelectionChange: (selectedIds) => {
    console.log('选中项 ID 集合:', selectedIds);
  }
});

// 卸载组件
// tableInstance.destroy();
```

## 重入与清理

- 排序采用 FLIP（First, Last, Invert, Play）模式，在更新前读取旧几何坐标，DOM 替换后再执行无冲突位移重置。
- `destroy()` 负责注销全部表头与表格行点击委托，并同步清空外部 DOM。

## 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .arc-table tbody tr {
    transition: none !important;
    transform: none !important;
  }
  .arc-table-sort-icon {
    transition: none !important;
  }
}
```

## 焦点与键盘

- 表头列具备 `:focus-visible` 轮廓高亮，支持 `Enter` 或 `Space` 触发排序。
- 多选复选框支持标准无障碍 `aria-label` 与 `indeterminate` 半选状态标注。
- 支持 `Shift` 连击进行连续跨行批量多选。

## 兼容回退

- 在不支持 FLIP `getBoundingClientRect` 位移的高频刷新场景下，自动退化为静默内容重排。
- 移动端低于 620px 宽度时自适应切换为垂直卡片流。

## 验收清单

- [x] 表头点击可在升序与降序之间无缝切换，并联动指示箭头平滑翻转。
- [x] 排序重排具备 FLIP 弹簧过渡位移动画，无重叠或抖动。
- [x] 单选、全选、Shift 连续多选逻辑均能准确触发并联动半选状态。
- [x] 顶部操作条准确展示已选数量，并提供一键清空按钮。
- [x] 销毁时无内存泄漏，DOM 干净还原。
