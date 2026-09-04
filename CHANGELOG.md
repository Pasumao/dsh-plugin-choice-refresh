# Changelog

## [0.1.6] - 2026-09-04

- 文档：中英 README「兼容性」节补全 dsh 0.1.2-rc.1 适配细节（`pendingInteraction` /
  `PendingQuestion` 协议、应答走 `.answer({answers})` / `.cancel()`）；测试基建自带
  react/react-dom@19 devDependencies，`npm run smoke` 不再依赖宿主安装布局。
# Changelog

## [0.1.5] - 2026-09-04

- 适配 dsh 0.1.2-rc.1：conversation.composer 链条目 select 入参由 `{interactions}` 改为 `{pendingInteraction}`（原生 PendingQuestion 单对象），按 `kind`/questions 鸭子类型认领，plan-review 继续放行；
- 待答载体 PendingChoice 改为包装 PendingQuestion（`.answer({answers})` / `.cancel()` 直调，替代旧 `wait.respond` 协议）；
- steer 兜底路径改为 `ctx.remote.session.prompt`（0.1.2 起 remote 命名空间为单数且要求 requestId）；主路径 sessions.binding().session.prompt 不变。
# Changelog

## [0.1.4] - 2026-08-29

- 文档：兼容性补实测版本声明（DSH 0.1.1-rc.2）；
- 元数据：description 加「生态唯一」钩子，keywords 10 → 16；
- 新增英文版 README.en.md 与双语切换行；CHANGELOG.md 纳入 npm files。
## [0.1.3] - 2026-08-25

- 相关插件段新增 dsh-plugin-windows-guard（Windows 环境防坑守则 skill 插件，互相引流）。


## [0.1.2] - 2026-08-21

- README 新增「相关插件」互相引用段（列出同系列已发布插件，npm / GitHub 链接 + 一句话说明），互相引流。

## [0.1.1] - 2026-08-19

- 首发：选择增强（「重新生成选项」/「更多选项」按钮），纯前端实现，支持文字与图片选项卡。
- 发布 npm、GitHub topics、dsh-market 收录（issue #40）。
