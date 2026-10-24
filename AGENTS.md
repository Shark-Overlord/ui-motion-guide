# UI Motion Guide

组件动效 Skill 仓库。

## 使用

为项目组件添加动效时，读取 [skills/ui-motion/SKILL.md](skills/ui-motion/SKILL.md) 并按其中的工作流执行。仓库其余目录不是使用时的读取对象。

## 维护

仅在用户要求维护本仓库时执行以下内容。

### 目录

```
inbox/<NN_Category>/<slug>/          原型原料（index.html、styles.css、script.js 等），不参与路由
templates/component.md               组件 md 模板
skills/ui-motion/SKILL.md            第 1 层：工作流 + 类别表
skills/ui-motion/<category>/INDEX.md 第 2 层：交互意图 → 组件
skills/ui-motion/<category>/<slug>.md 第 3 层：组件文档
```

类别目录名为 inbox 类别名去掉编号后的小写形式，如 `01_Buttons` → `buttons`，`02_Gestures` → `gestures`；组件文件名沿用 inbox 的 slug。

### 整理 inbox 原型

1. 读取 `inbox/<NN_Category>/<slug>/` 下的全部源码。
2. 复制 [templates/component.md](templates/component.md) 到 `skills/ui-motion/<category>/<slug>.md`，按模板注释逐节填写。
3. 在该类别的 `INDEX.md` 中登记意图与分流；类别首次出现时新建 `INDEX.md`，并在 `SKILL.md` 类别表中登记、从“未收录类别”中移除。
4. 与其他类别存在易混淆组件时，在双方 `INDEX.md` 中互相指向。

普通组件改造任务不读取 `inbox/`、`templates/`，也不修改本仓库。
