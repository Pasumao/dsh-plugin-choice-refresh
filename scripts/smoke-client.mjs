/**
 * dsh-plugin-choice-refresh 客户端冒烟测试：
 * 用 Node 模拟浏览器模块加载器执行 lib/client.js，再用真实 react /
 * react-dom/server 渲染一次选择卡，验证：
 *   1. 模块加载、apply/inject 导出正常；
 *   2. 纯文字问题：卡片渲染出「重新生成选项 / 更多选项」按钮，标记不泄漏；
 *   3. 带图片标记的问题：渲染图片卡片（复用 image-tools 路由）；
 *   4. plan-review 批：selectChoice 放行（不认领）；
 *   5. Lightbox 放大查看单独渲染正常。
 *
 * 运行：node scripts/smoke-client.mjs
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { strict as assert } from 'node:assert'

const require = createRequire(import.meta.url)
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const profileRequire = createRequire(join('C:/Users/18303/.dsh/profiles/node_modules', 'noop.cjs'))
const reactRoot = dirname(profileRequire.resolve('react'))
const jsxRuntime = join(reactRoot, 'jsx-runtime.js')
const reactModule = profileRequire('react')
const reactDomServer = profileRequire('react-dom/server')

// 1) 模拟浏览器模块加载器
let spec = null
globalThis.window = {
  __ModuleLoader__: { load: (value) => { spec = value } },
}
const code = readFileSync(join(ROOT, 'lib', 'client.js'), 'utf8')
new Function(code)()
assert.ok(spec !== null, 'module loader not invoked')
assert.equal(spec.id, 'dsh-plugin-choice-refresh')

const shimRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(jsxRuntime)
  if (name === 'react') return reactModule
  throw new Error(`unexpected require: ${name}`)
}
const mod = spec.factory(shimRequire)
assert.equal(typeof mod.apply, 'function')
assert.deepEqual(mod.inject, ['slots', 'locale', 'sessions', 'remote'])
assert.equal(typeof mod.selectChoice, 'function')
assert.equal(typeof mod.ChoiceComposer, 'function')

const { renderToString } = reactDomServer
const fakeT = (key) => ({
  'nav.cancel': '放弃整组问题',
  'nav.prev': '上一题',
  'nav.next': '下一题',
  'action.skip': '跳过本题',
  'action.next': '下一题',
  'submit': '提交',
  'option.recommended': '推荐',
  'custom.placeholder': '输入你的答案',
  'refresh.button': '重新生成选项',
  'more.button': '更多选项',
  'busy.refresh': '重新生成中…',
  'busy.more': '补充更多选项中…',
  'image.failed': '图片加载失败',
  'image.zoom': '放大查看',
  'image.close': '关闭',
}[key] ?? key)
const fakeCtx = { sessions: {}, remote: {} }

function encodeBase64Url(json) {
  return Buffer.from(json, 'utf8').toString('base64url')
}

// 2) 纯文字问题：渲染卡片 + 两个增强按钮
const plainWait = {
  key: 'q:1',
  sessionId: 's1',
  payload: {
    type: 'question/requested',
    sessionId: 's1',
    questions: [
      { id: 'a', question: '选一个封面风格', header: '封面', detail: '请选择你喜欢的风格', multiSelect: false, options: [
        { label: '赛博 (Recommended)', description: '霓虹质感' },
        { label: '水墨' },
        { label: '极简' },
      ] },
    ],
  },
  respond: async (r) => ({ accepted: true }),
}
let html = renderToString(reactModule.createElement(mod.ChoiceComposer, { matched: plainWait, t: fakeT, ctx: fakeCtx }))
assert.ok(html.includes('dsr-card'), '卡片未渲染')
assert.ok(html.includes('选一个封面风格'), '问题文本缺失')
assert.ok(html.includes('重新生成选项'), '刷新按钮缺失')
assert.ok(html.includes('更多选项'), '更多选项按钮缺失')
assert.ok(html.includes('赛博'), '选项 label 缺失')
assert.ok(html.includes('推荐'), '推荐徽标缺失')
assert.ok(!html.includes('<!--dsh-pick:v1:'), '图片标记不应出现')

// 3) 带图片标记的问题：渲染图片卡片（image-tools 路由）
const marker = '<!--dsh-pick:v1:' + encodeBase64Url(JSON.stringify({ pickId: 'pick-7', images: [0, 2] })) + '-->'
const imageWait = {
  key: 'q:2',
  sessionId: 's2',
  payload: {
    type: 'question/requested',
    sessionId: 's2',
    questions: [
      { id: 'b', question: '选一张封面图', detail: marker, multiSelect: false, options: [
        { label: '深海' },
        { label: '极光' },
        { label: '沙漠' },
      ] },
    ],
  },
  respond: async (r) => ({ accepted: true }),
}
html = renderToString(reactModule.createElement(mod.ChoiceComposer, { matched: imageWait, t: fakeT, ctx: fakeCtx }))
assert.ok(html.includes('/dsh-plugin-image-tools/pick-7/0'), '第一张图片 URL 缺失')
assert.ok(html.includes('/dsh-plugin-image-tools/pick-7/2'), '第三张图片 URL 缺失')
assert.ok(html.includes('深海'), '图片卡片 label 缺失')
assert.ok(html.includes('放大查看'), '放大触发按钮缺失')
assert.ok(html.includes('重新生成选项'), '带图问题的刷新按钮缺失')
assert.ok(!html.includes('<!--dsh-pick:v1:'), '图片标记不应泄漏到界面')

// 4) plan-review 批放行
const planWait = {
  kind: 'question',
  key: 'q:3',
  sessionId: 's3',
  payload: {
    type: 'question/requested',
    sessionId: 's3',
    questions: [
      { id: 'c', question: '确认执行计划', detail: '# 计划\n1. 做 A', intent: { kind: 'plan-review', approve: '确认执行' }, options: [{ label: '确认执行' }, { label: '拒绝' }] },
    ],
  },
  respond: async (r) => ({ accepted: true }),
}
assert.equal(mod.selectChoice({ interactions: [planWait] }), null, 'plan-review 不应被本插件认领')

// 5) Lightbox 单独渲染
const lightboxHtml = renderToString(reactModule.createElement(mod.Lightbox, {
  zoom: { src: '/dsh-plugin-image-tools/pick-7/0', label: '深海', description: '第一张' },
  onClose: () => {},
  t: fakeT,
}))
assert.ok(lightboxHtml.includes('dsr-lightbox'), 'lightbox 遮罩未渲染')
assert.ok(lightboxHtml.includes('/dsh-plugin-image-tools/pick-7/0'), 'lightbox 大图 URL 缺失')
assert.ok(lightboxHtml.includes('深海'), 'lightbox 说明缺失')
assert.ok(lightboxHtml.includes('关闭'), 'lightbox 关闭按钮文案缺失')

console.log('[dsh-plugin-choice-refresh] client smoke passed')
