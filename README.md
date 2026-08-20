# dsh-plugin-choice-refresh

![npm version](https://img.shields.io/npm/v/dsh-plugin-choice-refresh)
![License](https://img.shields.io/github/license/Pasumao/dsh-plugin-choice-refresh)
![AI Assisted](https://img.shields.io/badge/AI-Assisted-8A2BE2)

**dsh 插件市场里唯一的选择增强插件**：给 `ask_user_question` / `ask_user_choice` 的选择卡加上两个按钮——
选项都不满意？一键让模型换一批完全不同的。选项太少？一键让模型补充。

| 按钮 | 场景 | 效果 |
| --- | --- | --- |
| 🔄 **重新生成选项** | 给出的选项都不满意 | 一键让模型换一批完全不同的选项（换角度/风格/维度，5~8 个）重新提问 |
| ➕ **更多选项** | 选项太少不够选 | 一键让模型在保留原选项的基础上补充新选项（总数 6~10 个）重新提问 |

纯前端交互实现，**不注册新工具、不改核心包**；对原生文字选项和
[dsh-plugin-image-tools](https://github.com/Pasumao/dsh-plugin-image-tools) 的
图片选项卡都生效（图片卡由本插件直接渲染，复用其图片路由）。

## 功能

- 🔄 **重新生成选项**：`ask_user_question` / `ask_user_choice` 给出的选项都不满意时，
  一键解除当前问题，让模型换一批完全不同的选项（换角度/风格/维度，5~8 个）重新提问；
- ➕ **更多选项**：选项太少不够选时，一键让模型在保留原选项的基础上补充新选项（总数 6~10 个）；
- 纯前端交互实现，**不注册新工具、不改核心包**；
- 对原生文字选项卡与 `dsh-plugin-image-tools` 图片选项卡同时生效；
- 与 `plan-review` 计划审阅卡兼容，不影响原生流程。

## 配置

无需任何配置，安装即用：

- 不读取环境变量，不需要 API Key / token，不写配置文件；
- 按钮文案走 `ctx.locale`（zh / en 双语），无需额外设置；
- 行为由按钮注入的 `【系统 · 选项刷新】` / `【系统 · 更多选项】` 消息驱动，模型按指令重新提问。

## 安装

```powershell
# npm（推荐）
dsh plugin --profile web add dsh-plugin-choice-refresh
# 或 GitHub
dsh plugin --profile web add github:Pasumao/dsh-plugin-choice-refresh
```

源码安装（本地开发 / 调试）：

```bash
git clone https://github.com/Pasumao/dsh-plugin-choice-refresh.git
cd dsh-plugin-choice-refresh
npm install        # 或 pnpm install
# 以 link: 方式挂载进 profile，详见 设计说明.md
```

装完刷新浏览器即生效（profile 已有 dsh-client-hmr 时会自动热更新，无需重启）。
本地开发可改用 `link:` 方式挂载，详见 `设计说明.md`。

## 使用

模型（或按 novel-* 技能等）照常调用 `ask_user_question` / `ask_user_choice`
提问时，选择卡底部会多出「重新生成选项」和「更多选项」两个按钮：

- 点**重新生成选项**：当前问题被解除，同时向模型注入一条
  `【系统 · 选项刷新】` 用户消息，模型立即换一组选项重新提问；
- 点**更多选项**：同上，注入 `【系统 · 更多选项】` 消息，模型保留原选项并补充。

> 注入消息保持简短（一两行），作为用户消息留在会话里供模型理解指令；
> 界面会原样显示这条消息。

> 说明：刷新/补充由模型理解指令后重新调用提问工具完成，属于「软」增强——
> 模型偶尔可能调整问题本身。若对结果仍不满意，可再点一次或直接打字说明。

## 自检

```powershell
# 在插件目录下（本地开发 clone / link 时）
npm run smoke   # selfcheck + smoke-client
```

## 兼容性

- 需要 DSH web GUI（`conversation.composer` 链条目，priority -300）。
- 与 `dsh-plugin-image-tools` 共存的图片卡直接兼容；未安装时纯文字选项照常。
- `plan-review` 意图（计划审阅卡）放行给原生 `PlanReviewPanel`，不受影响。
- 依赖客户端服务：`slots` / `locale` / `sessions` / `remote`。

## AI 生成声明

代码与文档由 AI 辅助生成（DeepSeek Harness），均经人工审查与实机验证
（`npm run smoke`：selfcheck + 假客户端冒烟）。

## 许可证

[MIT](./LICENSE)
