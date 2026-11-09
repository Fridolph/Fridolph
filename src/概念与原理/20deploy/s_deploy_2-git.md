# Git 工作区与团队协作

## 提交保存什么？

Git 提交记录一份快照和父提交关系。工作区是当前文件，暂存区是“下次准备提交什么”，HEAD 通常指向当前分支。`git add` 更新暂存区，`git commit` 保存暂存内容；`git commit -a` 不会自动纳入未跟踪文件。

```bash
git status --short --branch
git diff
git add path/to/article.md
git diff --cached
git commit -m "docs: 完善学习笔记"
```

先检查差异再暂存，尤其不要无差别纳入本地缓存、个人配置或账户信息。

## 分支、远端与同步

本项目以 `dev` 开发、`main` 发布。远端跟踪分支 `origin/dev` 是上次获取到的状态，不一定就是服务器此刻的状态。

```bash
git fetch origin
git log --oneline --graph --decorate --all -20
git rev-list --left-right --count dev...origin/dev
git switch dev
git merge --ff-only origin/dev
```

`fetch` 获取对象和远端引用，不改当前工作区；`pull` 还会根据配置执行 merge 或 rebase。`--ff-only` 在需要产生分叉集成时失败，让你先检查差异。切分支前处理工作区，不能用强制切换丢弃尚未保存的内容。

## merge、rebase 与 squash 的取舍

| 方法 | 得到的历史 | 适用边界 |
| --- | --- | --- |
| merge | 保留双方提交与汇合关系 | 共享开发分支，追踪真实集成 |
| rebase | 在新基点重新生成提交 | 整理尚未共享的提交；不要随意改写共享历史 |
| squash | 多个变更内容合成一个新提交 | 发布时压缩开发过程，但不保留原分支的父子关系 |

**内容一致不等于祖先关系一致。** 将 dev squash 到 main 后，即使文件相同，下一次 dev → main 仍可能重复呈现旧提交。应把新的 main 集成回 dev（检查并解决冲突后 merge），让后续开发以已发布历史为基础；不要仅凭 ahead / behind 数字就 reset 或强推。

冲突表示 Git 无法自动决定最终文本。需要理解两侧意图，编辑后运行验证、暂存，再继续 merge / rebase。`--ours` / `--theirs` 不等于业务意义上的“正确版本”。

## 撤销与恢复

- `git restore path` 放弃未暂存修改，执行前先看 diff；`git restore --staged path` 只取消暂存。
- `git revert <commit>` 产生反向提交，适合撤销已经共享的修改。
- `reset` 移动引用，`--hard` 还会覆盖跟踪文件，不是日常回滚共享发布的首选。
- `reflog` 记录本地引用移动，可辅助恢复误操作，但不代替远端备份。

提交回滚只处理 Git 内容，数据库迁移、外部数据和已发布资源需要独立恢复方案。共享分支避免强推；确有历史整理需求时也要先协调，`--force-with-lease` 只是防覆盖机制，不能替代协作。

**自测：** `status` 显示领先是否一定要推送？为什么 squash 后两个分支文件一致却仍有历史差异？已发布的错误提交优先 revert 还是 reset？

> 来源：[个人 Git 学习笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/工程构建相关/git学习)；[Pro Git 中文版](https://git-scm.com/book/zh/v2)。
