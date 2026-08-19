/**
 * dsh-plugin-choice-refresh — 选择增强插件（服务端半边）
 *
 * 功能：在 ask_user_question / ask_user_choice 的选择卡上提供两个增强按钮：
 *   1. 重新生成选项（refresh）：用户对当前选项都不满意时，一键让模型换一批选项；
 *   2. 更多选项（more）：选项太少时，一键让模型在保留原选项的基础上补充更多。
 *
 * 实现完全在客户端：按钮点击后
 *   1) 通过 pending.cancel() 以「用户关闭」解除当前待答问题（与原生 UI 的
 *      「放弃整组问题」同一答案协议）；
 *   2) 通过 session.prompt(content, 'steer') 向 agent 注入一条结构化的
 *      用户消息（【系统 · 选项刷新/更多选项】），模型随即重新调用
 *      ask_user_question / ask_user_choice 提问。
 * 不注册任何工具、不新增路由、不改核心包；对原生 ask_user_question 与
 * dsh-plugin-image-tools 的 ask_user_choice（含图片标记）都生效。
 *
 * 服务端半边因此为空实现：插件以「自带 bundle patch」方式挂载进 profile，
 * 客户端半边由 dsh.client 声明经 /plugins/<id>/client.js 送达浏览器。
 *
 * @module dsh-plugin-choice-refresh
 */

export const name = 'dsh-plugin-choice-refresh'

/** 服务端不依赖任何宿主服务（所有逻辑在客户端半边）。 */
export const inject = []

/** 插件入口：空实现。详见文件头注释。 */
export function apply() {
  // 无服务端注册项：刷新协议是纯客户端交互（cancel + steer prompt）。
}
