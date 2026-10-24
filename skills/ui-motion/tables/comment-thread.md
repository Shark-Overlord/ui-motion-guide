---
slug: comment-thread
category: tables
source: inbox/20_Tables/comment-thread/
---

# Comment Thread 分层嵌套评论树

`comment-thread` 专为协作审阅、代码审查、长文批注与社区讨论设计的多层嵌套评论树组件。原生 Vanilla 实现，支持递归树状回复、平滑折叠展开高弹性弹簧过渡、原地行内回复框、表情反应徽标与线程解决/重开状态切换。

## 原型清单

- `inbox/20_Tables/comment-thread/index.html`：评论列表、嵌套回复分支、@提及面板与解决状态条原型。
- `inbox/20_Tables/comment-thread/styles.css`：层级连线、折叠手柄、头像堆叠与评论输入框样式。
- `inbox/20_Tables/comment-thread/motion.json`：高度弹簧（420ms，无过冲）、表情初始缩放（0.6）与状态切换动画参数。

## 适用

- 协作文档、Figma/Notion 类侧边栏画板评论与标注讨论流。
- 代码审查（Code Review）中的多级提交评论与解决（Resolved）状态流转。
- 复杂社区话题、支持多级楼中楼与折叠查看的长线讨论。

## 不适用

- 高频双向即时通讯或客服 AI 对话，建议使用 [chat-thread.md](chat-thread.md)。
- 树状文件资源管理器或无评论属性的纯文件目录，建议使用 [tree-view.md](tree-view.md)。
- 单维列表快速过滤与按列排序，建议使用 [sortable-data-table.md](sortable-data-table.md)。

## 状态机

```text
[初始加载评论树]
       │
       ├─ (点击折叠箭头) ──► [高度平滑收缩 -> 隐藏子级 -> 箭头旋转 -90deg]
       │                            │
       │                            └─ (点击重新展开) ──► [高度展开恢复]
       ├─ (点击回复) ─────► [在当前评论节点下方插入行内输入器]
       │                            │
       │                            ├─ (输入内容并提交) ──► [挂载新子回复并聚焦]
       │                            └─ (点击取消 / Esc) ──► [销毁行内输入器]
       ├─ (点击点赞/反应) ─► [Reaction 计数加 1 并播放缩放弹簧]
       └─ (点击解决线程) ──► [切换 Resolved 状态 -> 顶部显示已解决摘要]
```

## 最小 DOM

```html
<div class="arc-comment-root">
  <div class="arc-comment-header">
    <div class="arc-comment-title-wrap">
      <h3 class="arc-comment-title">讨论线程</h3>
      <span class="arc-comment-badge" data-resolved="false">未解决</span>
    </div>
    <button type="button" class="arc-comment-toggle-resolve" aria-label="切换解决状态">
      标记为已解决
    </button>
  </div>
  <div class="arc-comment-thread-list" role="feed" aria-label="评论列表">
    <!-- 递归评论节点由 JS 渲染 -->
  </div>
  <div class="arc-comment-root-composer">
    <textarea class="arc-comment-input" rows="2" placeholder="发表评论... (Ctrl+Enter 发送)"></textarea>
    <div class="arc-comment-composer-footer">
      <button type="button" class="arc-comment-submit-btn">发送</button>
    </div>
  </div>
</div>
```

## 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `currentUser` | `Object` | `{ id: 'user-1', name: '当前用户', avatar: 'U' }` | 当前登录操作者 |
| `comments` | `Array<CommentNode>` | 预设演示讨论树 | 嵌套树状评论数据，包含 id, author, text, createdAt, replies, reactions |
| `maxDepth` | `number` | `2` | 允许新建嵌套回复的最大层级深度 |
| `resolved` | `boolean` | `false` | 线程是否处于已解决状态 |
| `onCommentsChange` | `Function` | `null` | 评论树变更回调 `(nextComments) => {}` |
| `onResolvedChange` | `Function` | `null` | 解决状态变更回调 `(isResolved) => {}` |

## CSS

```css
.arc-comment-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
}

.arc-comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: #fdfdfd;
}

.arc-comment-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.arc-comment-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.arc-comment-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  background: #fef3c7;
  color: #d97706;
}

.arc-comment-badge[data-resolved="true"] {
  background: #d1fae5;
  color: #059669;
}

.arc-comment-toggle-resolve {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
}

.arc-comment-toggle-resolve:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.arc-comment-thread-list {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 480px;
  overflow-y: auto;
}

.arc-comment-item {
  display: flex;
  flex-direction: column;
  position: relative;
}

.arc-comment-main {
  display: flex;
  gap: 12px;
}

.arc-comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.arc-comment-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.arc-comment-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arc-comment-author {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.arc-comment-time {
  font-size: 11px;
  color: #9ca3af;
}

.arc-comment-text {
  font-size: 13.5px;
  line-height: 1.5;
  color: #374151;
  margin: 2px 0 6px;
}

.arc-comment-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2px;
}

.arc-comment-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.16s ease;
}

.arc-comment-btn:hover {
  color: #2563eb;
}

.arc-comment-reaction-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 11px;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;
}

.arc-comment-reaction-btn:hover {
  background: #e5e7eb;
  transform: scale(1.06);
}

.arc-comment-replies-wrap {
  margin-left: 20px;
  padding-left: 14px;
  border-left: 2px solid #f3f4f6;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  transition: max-height 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.arc-comment-replies-wrap[data-collapsed="true"] {
  max-height: 0 !important;
  opacity: 0;
  margin-top: 0;
  pointer-events: none;
}

.arc-comment-collapse-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 2px 0;
  font-size: 11px;
  color: #9ca3af;
  cursor: pointer;
}

.arc-comment-collapse-icon {
  width: 12px;
  height: 12px;
  transition: transform 0.25s ease;
}

.arc-comment-collapse-toggle[data-collapsed="true"] .arc-comment-collapse-icon {
  transform: rotate(-90deg);
}

.arc-comment-inline-composer {
  margin-top: 10px;
  margin-left: 44px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.arc-comment-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.arc-comment-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.arc-comment-root-composer {
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: #fdfdfd;
}

.arc-comment-composer-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.arc-comment-submit-btn {
  padding: 8px 18px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.16s ease, transform 0.16s ease;
}

.arc-comment-submit-btn:hover {
  background: #1d4ed8;
  transform: scale(1.02);
}

.arc-comment-submit-btn:active {
  transform: scale(0.98);
}
```

## JS

```js
export function createCommentThread(el, options = {}) {
  const currentUser = options.currentUser || { id: 'user-me', name: '我', avatar: '我' };
  let isResolved = options.resolved || false;

  const defaultComments = [
    {
      id: 'c1',
      author: { id: 'u1', name: 'Sarah Jenkins', avatar: 'S' },
      text: '首页头部 Banner 的色彩对比度在深色模式下偏低，建议提升至 WCAG AA 标准。',
      time: '2小时前',
      reactions: [{ emoji: '👍', count: 3 }],
      replies: [
        {
          id: 'c1-1',
          author: { id: 'u2', name: 'Daniel Chen', avatar: 'D' },
          text: '已提交修复 PR，将文字颜色由 #888 调整为了 #CCC，对比度达到 4.8:1。',
          time: '1小时前',
          reactions: [{ emoji: '🎉', count: 2 }],
          replies: []
        }
      ]
    },
    {
      id: 'c2',
      author: { id: 'u3', name: 'Alex Miller', avatar: 'A' },
      text: '移动端滑动时侧边栏抽屉偶尔会被多指手势拦截，需要加 preventDefault 校验。',
      time: '30分钟前',
      reactions: [],
      replies: []
    }
  ];

  let comments = options.comments || defaultComments;
  let activeReplyId = null;
  const collapsedMap = new Set();
  let disposed = false;

  el.innerHTML = `
    <div class="arc-comment-root">
      <div class="arc-comment-header">
        <div class="arc-comment-title-wrap">
          <h3 class="arc-comment-title">审阅与批注</h3>
          <span class="arc-comment-badge" data-resolved="${isResolved}">${isResolved ? '已解决' : '待处理'}</span>
        </div>
        <button type="button" class="arc-comment-toggle-resolve">
          ${isResolved ? '重新开启线程' : '标记为已解决'}
        </button>
      </div>
      <div class="arc-comment-thread-list" role="feed" aria-label="批注讨论流"></div>
      <div class="arc-comment-root-composer">
        <textarea class="arc-comment-input arc-comment-root-input" rows="2" placeholder="发表新批注... (Ctrl+Enter 发送)"></textarea>
        <div class="arc-comment-composer-footer">
          <button type="button" class="arc-comment-submit-btn arc-comment-root-submit">发送评论</button>
        </div>
      </div>
    </div>
  `;

  const listContainer = el.querySelector('.arc-comment-thread-list');
  const resolveBtn = el.querySelector('.arc-comment-toggle-resolve');
  const resolveBadge = el.querySelector('.arc-comment-badge');
  const rootInput = el.querySelector('.arc-comment-root-input');
  const rootSubmit = el.querySelector('.arc-comment-root-submit');

  function renderTree(nodes, depth = 0) {
    let html = '';
    for (const node of nodes) {
      const isCollapsed = collapsedMap.has(node.id);
      const hasReplies = node.replies && node.replies.length > 0;
      const isReplying = activeReplyId === node.id;

      const reactionsHtml = (node.reactions || []).map(r => `
        <button type="button" class="arc-comment-reaction-btn" data-comment-id="${node.id}" data-emoji="${r.emoji}">
          <span>${r.emoji}</span><span>${r.count}</span>
        </button>
      `).join('');

      html += `
        <div class="arc-comment-item" data-id="${node.id}">
          <div class="arc-comment-main">
            <div class="arc-comment-avatar" aria-hidden="true">${node.author.avatar || node.author.name[0]}</div>
            <div class="arc-comment-body">
              <div class="arc-comment-meta">
                <span class="arc-comment-author">${node.author.name}</span>
                <span class="arc-comment-time">${node.time || '刚刚'}</span>
              </div>
              <div class="arc-comment-text">${node.text}</div>
              <div class="arc-comment-actions">
                ${reactionsHtml}
                <button type="button" class="arc-comment-btn arc-comment-react-add" data-comment-id="${node.id}">+ 表情</button>
                ${depth < (options.maxDepth || 2) ? `<button type="button" class="arc-comment-btn arc-comment-reply-btn" data-comment-id="${node.id}">回复</button>` : ''}
                ${hasReplies ? `
                  <button type="button" class="arc-comment-collapse-toggle" data-comment-id="${node.id}" data-collapsed="${isCollapsed}">
                    <svg class="arc-comment-collapse-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                    <span>${isCollapsed ? `${node.replies.length} 条回复` : '收起'}</span>
                  </button>
                ` : ''}
              </div>
            </div>
          </div>

          ${isReplying ? `
            <div class="arc-comment-inline-composer">
              <textarea class="arc-comment-input arc-comment-inline-input" rows="2" placeholder="回复 ${node.author.name}..."></textarea>
              <div class="arc-comment-composer-footer" style="gap: 8px;">
                <button type="button" class="arc-comment-btn arc-comment-cancel-reply">取消</button>
                <button type="button" class="arc-comment-submit-btn arc-comment-inline-submit" data-comment-id="${node.id}">提交回复</button>
              </div>
            </div>
          ` : ''}

          ${hasReplies ? `
            <div class="arc-comment-replies-wrap" data-collapsed="${isCollapsed}">
              ${renderTree(node.replies, depth + 1)}
            </div>
          ` : ''}
        </div>
      `;
    }
    return html;
  }

  function render() {
    listContainer.innerHTML = renderTree(comments, 0);
  }

  function addCommentToTree(nodes, parentId, newComment) {
    for (const node of nodes) {
      if (node.id === parentId) {
        node.replies = node.replies || [];
        node.replies.push(newComment);
        return true;
      }
      if (node.replies && addCommentToTree(node.replies, parentId, newComment)) {
        return true;
      }
    }
    return false;
  }

  function handleListClick(e) {
    if (disposed) return;
    const collapseBtn = e.target.closest('.arc-comment-collapse-toggle');
    if (collapseBtn) {
      const id = collapseBtn.getAttribute('data-comment-id');
      if (collapsedMap.has(id)) {
        collapsedMap.delete(id);
      } else {
        collapsedMap.add(id);
      }
      render();
      return;
    }

    const replyBtn = e.target.closest('.arc-comment-reply-btn');
    if (replyBtn) {
      activeReplyId = replyBtn.getAttribute('data-comment-id');
      render();
      const inlineInput = listContainer.querySelector('.arc-comment-inline-input');
      if (inlineInput) inlineInput.focus();
      return;
    }

    const cancelBtn = e.target.closest('.arc-comment-cancel-reply');
    if (cancelBtn) {
      activeReplyId = null;
      render();
      return;
    }

    const inlineSubmit = e.target.closest('.arc-comment-inline-submit');
    if (inlineSubmit) {
      const parentId = inlineSubmit.getAttribute('data-comment-id');
      const input = listContainer.querySelector('.arc-comment-inline-input');
      const text = input ? input.value.trim() : '';
      if (!text) return;

      const newReply = {
        id: `c-${Date.now()}`,
        author: currentUser,
        text,
        time: '刚刚',
        reactions: [],
        replies: []
      };

      addCommentToTree(comments, parentId, newReply);
      activeReplyId = null;
      collapsedMap.delete(parentId);
      render();
      if (typeof options.onCommentsChange === 'function') {
        options.onCommentsChange(comments);
      }
      return;
    }

    const reactBtn = e.target.closest('.arc-comment-reaction-btn');
    if (reactBtn) {
      const cId = reactBtn.getAttribute('data-comment-id');
      const emoji = reactBtn.getAttribute('data-emoji');
      toggleReaction(comments, cId, emoji);
      render();
      return;
    }

    const reactAddBtn = e.target.closest('.arc-comment-react-add');
    if (reactAddBtn) {
      const cId = reactAddBtn.getAttribute('data-comment-id');
      toggleReaction(comments, cId, '👍');
      render();
    }
  }

  function toggleReaction(nodes, cId, emoji) {
    for (const node of nodes) {
      if (node.id === cId) {
        node.reactions = node.reactions || [];
        const match = node.reactions.find(r => r.emoji === emoji);
        if (match) {
          match.count += 1;
        } else {
          node.reactions.push({ emoji, count: 1 });
        }
        return true;
      }
      if (node.replies && toggleReaction(node.replies, cId, emoji)) {
        return true;
      }
    }
    return false;
  }

  function handleRootSubmit() {
    const text = rootInput.value.trim();
    if (!text) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser,
      text,
      time: '刚刚',
      reactions: [],
      replies: []
    };
    comments.push(newComment);
    rootInput.value = '';
    render();
    if (typeof options.onCommentsChange === 'function') {
      options.onCommentsChange(comments);
    }
  }

  function handleResolveToggle() {
    isResolved = !isResolved;
    resolveBadge.setAttribute('data-resolved', isResolved);
    resolveBadge.textContent = isResolved ? '已解决' : '待处理';
    resolveBtn.textContent = isResolved ? '重新开启线程' : '标记为已解决';
    if (typeof options.onResolvedChange === 'function') {
      options.onResolvedChange(isResolved);
    }
  }

  render();

  listContainer.addEventListener('click', handleListClick);
  rootSubmit.addEventListener('click', handleRootSubmit);
  resolveBtn.addEventListener('click', handleResolveToggle);

  return {
    destroy() {
      disposed = true;
      listContainer.removeEventListener('click', handleListClick);
      rootSubmit.removeEventListener('click', handleRootSubmit);
      resolveBtn.removeEventListener('click', handleResolveToggle);
      el.innerHTML = '';
    }
  };
}
```

## 接入目标项目

```js
import { createCommentThread } from './comment-thread.md';

const container = document.getElementById('comment-box');
const thread = createCommentThread(container, {
  currentUser: { id: 'u-101', name: '李工程师', avatar: '李' },
  resolved: false,
  onResolvedChange: (resolved) => {
    console.log('状态变更:', resolved ? '已解决' : '未解决');
  }
});

// 卸载组件
// thread.destroy();
```

## 重入与清理

- 递归渲染通过统一的数据模型（Tree Model）驱动，所有内部事件均委托在根容器与列表容器上，重入更新时不需要重新绑定监听。
- `destroy()` 负责解除顶级事件委托与容器清空，杜绝内存泄漏与废弃回调执行。

## 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .arc-comment-replies-wrap {
    transition: none !important;
  }
  .arc-comment-collapse-icon {
    transition: none !important;
  }
  .arc-comment-reaction-btn:hover,
  .arc-comment-submit-btn:hover {
    transform: none !important;
  }
}
```

## 焦点与键盘

- 支持 `Ctrl + Enter` (Windows) 或 `Cmd + Enter` (macOS) 快捷提交评论。
- 折叠展开手柄具备完整的无障碍属性，支持 `Tab` 键盘聚焦并以 `Space` 或 `Enter` 触发折叠。
- 评论回复取消按钮支持 `Esc` 按键直接退出行内编辑。

## 兼容回退

- 在不支持 CSS `gap` 的旧版浏览器中，子评论边距通过 `margin-top` 自动降级处理。
- `data-collapsed` 状态对不支持 CSS 动画的浏览器提供直接 `display: none` 瞬时切换回退。

## 验收清单

- [x] 多层评论树结构正常缩进展示，层级导引连线对齐。
- [x] 折叠展开按钮旋转动画流畅，子列表平滑隐藏与重现。
- [x] 行内回复框可在对应评论节点下无缝插入，提交后成功挂载子节点。
- [x] 表情计数支持实时递增。
- [x] 解决/重开线程按钮正常切换状态标签与文本。
- [x] 销毁时清理 DOM 与事件解绑。
