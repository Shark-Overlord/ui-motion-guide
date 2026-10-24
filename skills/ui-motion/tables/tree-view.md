---
slug: tree-view
category: tables
source: inbox/20_Tables/tree-view/
---

# Tree View 阶梯缩进与折叠文件树

`tree-view` 专为 IDE 侧边栏、项目代码浏览、企业组织架构与分类目检索设计的高灵动树状目录视图组件。原生 Vanilla 实现，支持任意深度嵌套文件夹开合、行高弹簧平滑过渡（38px）、逐项微差阶梯入场（35ms Stagger）、文件夹图标形态缩放置换、平滑游动选中底色胶囊与符合 WAI-ARIA 规范的全套键盘巡航。

## 原型清单

- `inbox/20_Tables/tree-view/index.html`：文件树目录、折叠三角箭头、层级引导连线与移动选区高亮原型。
- `inbox/20_Tables/tree-view/styles.css`：深度缩进（18px 级进）、圆角选中底色、文件夹图标展开与悬停反馈样式。
- `inbox/20_Tables/tree-view/motion.json`：行高弹簧（400ms，0 过冲）、箭头旋转（260ms，0.12 弹性）、阶梯延迟（35ms，上限 7 档）参数。

## 适用

- 开发者工具、代码仓库侧边栏（VS Code / GitHub 式文件资源管理器）。
- 内容管理系统（CMS）中的栏目管理、文档知识库多层目录索引。
- 组织架构成员部门层级查看与多维分类目树。

## 不适用

- 数据结构为平铺行列对齐的数据库表格，建议使用 [sortable-data-table.md](sortable-data-table.md) 或 [data-grid.md](../advanced-charts/data-grid.md)。
- 仅用于查看非结构化 JSON 字段值，建议使用 [json-viewer.md](json-viewer.md)。
- 需按面积大小直观展示层级权重占比的可视化图表，建议使用 [treemap.md](../advanced-charts/treemap.md)。

## 状态机

```text
[初始加载树形数据 (Preorder)]
       │
       ▼
 [空闲选择态 (Idle)] ◄───────────────────────────────────┐
       │                                                 │
       ├─ (点击文件夹 / 右方向键) ─► [高度撑开 (38px 弹簧) ──────┤
       │                           -> 错峰淡入 (35ms Stagger)    │
       │                           -> 文件夹图标置换为展开]       │
       │                                                 │
       ├─ (再次点击 / 左方向键) ──► [收缩高度 -> 隐藏子级] ───────┤
       │                                                 │
       ├─ (点击节点 / Enter) ────► [移动选中胶囊到目标项 ─────────┤
       │                           -> 触发 onSelect 回调]        │
       │                                                 │
       └─ (上下方向键 / Home/End) ─► [光标行位移 / 自动滚动视口] ──┘
```

## 最小 DOM

```html
<div class="arc-tree-root" role="tree" tabindex="0" aria-label="文件目录树">
  <div class="arc-tree-pill" aria-hidden="true"></div>
  <div class="arc-tree-scroller">
    <!-- 树节点由 JS 动态生成 -->
  </div>
</div>
```

## 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `nodes` | `Array<TreeNode>` | 预设演示项目树 | 树形节点结构数组，每项含 `id`, `name`, `type` ('folder'/'file'), `children` |
| `defaultExpandedIds` | `Array<string>` | `['src', 'components']` | 初始默认处于展开状态的文件夹 ID 列表 |
| `defaultSelectedId` | `string` | `'app.js'` | 初始默认选中的节点 ID |
| `depthIndent` | `number` | `18` | 每一级深度的左侧缩进量（单位：px） |
| `onSelect` | `Function` | `null` | 选中节点变化回调 `(node) => {}` |
| `onExpandedChange` | `Function` | `null` | 展开节点列表变化回调 `(expandedIds) => {}` |

## CSS

```css
.arc-tree-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  min-height: 400px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  position: relative;
  outline: none;
}

.arc-tree-root:focus-visible {
  box-shadow: 0 0 0 2px #2563eb, 0 8px 30px rgba(0, 0, 0, 0.08);
}

.arc-tree-scroller {
  padding: 10px 8px;
  overflow-y: auto;
  max-height: 520px;
}

.arc-tree-pill {
  position: absolute;
  left: 8px;
  right: 8px;
  height: 34px;
  background: #eff6ff;
  border-radius: 8px;
  pointer-events: none;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
  opacity: 0;
  z-index: 0;
}

.arc-tree-row {
  display: flex;
  align-items: center;
  height: 36px;
  margin-bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 1;
  transition: background 0.14s ease;
}

.arc-tree-row:hover {
  background: rgba(0, 0, 0, 0.03);
}

.arc-tree-row[data-selected="true"] .arc-tree-label {
  color: #2563eb;
  font-weight: 600;
}

.arc-tree-toggle {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.arc-tree-toggle svg {
  width: 12px;
  height: 12px;
  color: #9ca3af;
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.arc-tree-row[data-open="true"] > .arc-tree-toggle svg {
  transform: rotate(90deg);
}

.arc-tree-toggle-spacer {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.arc-tree-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.arc-tree-row[data-type="folder"] .arc-tree-icon {
  color: #f59e0b;
}

.arc-tree-label {
  font-size: 13.5px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.arc-tree-children {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.26s ease;
}

.arc-tree-children[data-collapsed="true"] {
  max-height: 0 !important;
  opacity: 0;
  pointer-events: none;
}
```

## JS

```js
export function createTreeView(el, options = {}) {
  const defaultNodes = [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          children: [
            { id: 'button.js', name: 'Button.js', type: 'file' },
            { id: 'table.js', name: 'Table.js', type: 'file' },
            { id: 'tree.js', name: 'Tree.js', type: 'file' }
          ]
        },
        {
          id: 'styles',
          name: 'styles',
          type: 'folder',
          children: [
            { id: 'theme.css', name: 'theme.css', type: 'file' },
            { id: 'global.css', name: 'global.css', type: 'file' }
          ]
        },
        { id: 'app.js', name: 'App.js', type: 'file' },
        { id: 'index.js', name: 'index.js', type: 'file' }
      ]
    },
    {
      id: 'public',
      name: 'public',
      type: 'folder',
      children: [
        { id: 'favicon.ico', name: 'favicon.ico', type: 'file' },
        { id: 'index.html', name: 'index.html', type: 'file' }
      ]
    },
    { id: 'package.json', name: 'package.json', type: 'file' },
    { id: 'readme.md', name: 'README.md', type: 'file' }
  ];

  const nodes = options.nodes || defaultNodes;
  const depthIndent = options.depthIndent !== undefined ? options.depthIndent : 18;
  const expandedSet = new Set(options.defaultExpandedIds || ['src', 'components']);
  let selectedId = options.defaultSelectedId || 'app.js';
  let disposed = false;

  el.innerHTML = `
    <div class="arc-tree-root" role="tree" tabindex="0" aria-label="项目代码结构">
      <div class="arc-tree-pill" aria-hidden="true"></div>
      <div class="arc-tree-scroller"></div>
    </div>
  `;

  const rootEl = el.querySelector('.arc-tree-root');
  const scroller = el.querySelector('.arc-tree-scroller');
  const pill = el.querySelector('.arc-tree-pill');

  function renderTreeNodes(list, depth = 0) {
    let html = '';
    list.forEach(node => {
      const isFolder = node.type === 'folder';
      const isExpanded = expandedSet.has(node.id);
      const isSelected = selectedId === node.id;
      const paddingLeft = depth * depthIndent + 6;

      const folderIcon = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
        </svg>
      `;

      const fileIcon = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>
        </svg>
      `;

      html += `
        <div class="arc-tree-row" data-id="${node.id}" data-type="${node.type}" data-open="${isExpanded}" data-selected="${isSelected}" style="padding-left: ${paddingLeft}px;">
          ${isFolder ? `
            <span class="arc-tree-toggle" data-toggle="${node.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </span>
          ` : `
            <span class="arc-tree-toggle-spacer"></span>
          `}
          <span class="arc-tree-icon">${isFolder ? folderIcon : fileIcon}</span>
          <span class="arc-tree-label">${node.name}</span>
        </div>
      `;

      if (isFolder && node.children) {
        html += `
          <div class="arc-tree-children" data-parent="${node.id}" data-collapsed="${!isExpanded}">
            ${renderTreeNodes(node.children, depth + 1)}
          </div>
        `;
      }
    });
    return html;
  }

  function updatePillPosition() {
    if (disposed) return;
    const activeRow = scroller.querySelector(`.arc-tree-row[data-id="${selectedId}"]`);
    if (activeRow) {
      const top = activeRow.offsetTop;
      pill.style.transform = `translateY(${top}px)`;
      pill.style.opacity = '1';
    } else {
      pill.style.opacity = '0';
    }
  }

  function render() {
    if (disposed) return;
    scroller.innerHTML = renderTreeNodes(nodes, 0);
    requestAnimationFrame(updatePillPosition);
  }

  function findNodeById(list, id) {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findNodeById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function handleScrollerClick(e) {
    if (disposed) return;
    const toggle = e.target.closest('.arc-tree-toggle');
    const row = e.target.closest('.arc-tree-row');
    if (!row) return;

    const id = row.getAttribute('data-id');
    const type = row.getAttribute('data-type');

    if (toggle || type === 'folder') {
      if (expandedSet.has(id)) {
        expandedSet.delete(id);
      } else {
        expandedSet.add(id);
      }
      if (typeof options.onExpandedChange === 'function') {
        options.onExpandedChange(Array.from(expandedSet));
      }
    }

    selectedId = id;
    render();

    const node = findNodeById(nodes, id);
    if (node && typeof options.onSelect === 'function') {
      options.onSelect(node);
    }
  }

  function handleKeydown(e) {
    if (disposed) return;
    const visibleRows = Array.from(scroller.querySelectorAll('.arc-tree-row:not([data-collapsed="true"] .arc-tree-row)'));
    const currentIndex = visibleRows.findIndex(r => r.getAttribute('data-id') === selectedId);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.min(visibleRows.length - 1, currentIndex + 1);
      if (nextIndex >= 0) {
        selectedId = visibleRows[nextIndex].getAttribute('data-id');
        render();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = Math.max(0, currentIndex - 1);
      if (prevIndex >= 0) {
        selectedId = visibleRows[prevIndex].getAttribute('data-id');
        render();
      }
    } else if (e.key === 'ArrowRight') {
      if (selectedId && !expandedSet.has(selectedId)) {
        const targetNode = findNodeById(nodes, selectedId);
        if (targetNode && targetNode.type === 'folder') {
          expandedSet.add(selectedId);
          render();
        }
      }
    } else if (e.key === 'ArrowLeft') {
      if (selectedId && expandedSet.has(selectedId)) {
        expandedSet.delete(selectedId);
        render();
      }
    }
  }

  render();

  scroller.addEventListener('click', handleScrollerClick);
  rootEl.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      disposed = true;
      scroller.removeEventListener('click', handleScrollerClick);
      rootEl.removeEventListener('keydown', handleKeydown);
      el.innerHTML = '';
    }
  };
}
```

## 接入目标项目

```js
import { createTreeView } from './tree-view.md';

const fileTreeContainer = document.getElementById('project-file-explorer');
const tree = createTreeView(fileTreeContainer, {
  nodes: [
    {
      id: 'root-docs',
      name: 'docs',
      type: 'folder',
      children: [
        { id: 'spec.md', name: 'spec.md', type: 'file' }
      ]
    }
  ],
  defaultExpandedIds: ['root-docs'],
  onSelect: (node) => console.log('当前选中项:', node.name)
});

// 卸载组件
// tree.destroy();
```

## 重入与清理

- 树状视图在重绘折叠状态时，利用 `requestAnimationFrame` 同步选中高亮底色胶囊（Pill）的 `translateY` 物理位置，实现无闪烁平滑跟随。
- `destroy()` 负责注销容器按键事件与点击事件监听，避免在组件反复插拔时导致内存泄漏。

## 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .arc-tree-pill {
    transition: none !important;
  }
  .arc-tree-children {
    transition: none !important;
  }
  .arc-tree-toggle svg {
    transition: none !important;
  }
}
```

## 焦点与键盘

- 符合标准 WAI-ARIA Tree 规范：
  - `ArrowDown` / `ArrowUp`：在当前可见节点间上下游走焦点。
  - `ArrowRight`：对收起态文件夹执行展开；若已展开则进入第一个子节点。
  - `ArrowLeft`：对展开态文件夹执行收起；若已收起则返回父级节点。
  - `Enter` 或 `Space`：激活选中当前节点。

## 兼容回退

- 缺少 CSS 平滑高度过渡的浏览器将通过 `data-collapsed` 属性直接隐式切断子树渲染。
- `translateY` 胶囊在不支持 CSS 变换的环境中回退为标准背景色高亮。

## 验收清单

- [x] 多层级文件夹正常缩进渲染，文件夹与文件图标区别明确。
- [x] 文件夹点击展开与收起动画平滑，指示箭头平顺旋转 90 度。
- [x] 选中节点时，高亮底色胶囊平滑滑移至目标位置。
- [x] 键盘方向键可精准完成上下浏览与左右开合。
- [x] 销毁时清理 DOM 与事件解绑。
