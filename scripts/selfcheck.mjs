/**
 * dsh-plugin-choice-refresh 自检：对 lib/client.js 导出的纯函数做离线断言。
 * 运行：node scripts/selfcheck.mjs
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
const reactModule = profileRequire('react')

// 1) 模拟浏览器模块加载器并物化 factory
let spec = null
globalThis.window = {
  __ModuleLoader__: { load: (value) => { spec = value } },
}
const code = readFileSync(join(ROOT, 'lib', 'client.js'), 'utf8')
new Function(code)()
assert.ok(spec !== null, 'module loader not invoked')
assert.equal(spec.id, 'dsh-plugin-choice-refresh')

const shimRequire = (name) => {
  if (name === 'react/jsx-runtime') return require(join(reactRoot, 'jsx-runtime.js'))
  if (name === 'react') return reactModule
  throw new Error(`unexpected require: ${name}`)
}
const mod = spec.factory(shimRequire)
assert.equal(typeof mod.apply, 'function')
assert.deepEqual(mod.inject, ['slots', 'locale', 'sessions', 'remote'])
assert.equal(typeof mod.parseMarker, 'function')
assert.equal(typeof mod.isPlanReviewBatch, 'function')
assert.equal(typeof mod.buildSteerText, 'function')
assert.equal(typeof mod.selectChoice, 'function')
assert.equal(typeof mod.ChoiceComposer, 'function')

let passed = 0
function ok(name, fn) {
  fn()
  passed += 1
  console.log(`  ok  ${name}`)
}

console.log('[dsh-plugin-choice-refresh] selfcheck')

// --- parseMarker（与 image-tools 标记格式互通） ---
function encodeBase64Url(json) {
  return Buffer.from(json, 'utf8').toString('base64url')
}
ok('parseMarker round-trip', () => {
  const marker = '<!--dsh-pick:v1:' + encodeBase64Url(JSON.stringify({ pickId: 'pick-9', images: [0, 2] })) + '-->'
  assert.deepEqual(mod.parseMarker(marker + '\n\n补充说明'), { pickId: 'pick-9', images: [0, 2], human: '\n\n补充说明' })
})
ok('parseMarker absent -> null', () => {
  assert.equal(mod.parseMarker(undefined), null)
  assert.equal(mod.parseMarker('普通 detail'), null)
  assert.equal(mod.parseMarker('<!--dsh-pick:v1:broken-->'), null)
})

// --- isPlanReviewBatch ---
ok('isPlanReviewBatch detects single plan-review question', () => {
  assert.equal(mod.isPlanReviewBatch([{ id: 'a', question: 'q', detail: 'plan', intent: { kind: 'plan-review', approve: '执行' }, options: [{ label: '执行' }] }]), true)
})
ok('isPlanReviewBatch passes normal questions', () => {
  assert.equal(mod.isPlanReviewBatch([{ id: 'a', question: 'q', options: [{ label: 'A' }] }]), false)
  assert.equal(mod.isPlanReviewBatch([{ id: 'a', question: 'q' }, { id: 'b', question: 'q2' }]), false)
  assert.equal(mod.isPlanReviewBatch([]), false)
  assert.equal(mod.isPlanReviewBatch(undefined), false)
  // 多题批里即便有 plan-review 意图也不按 plan-review 处理（原生同样放行给通用流）
  assert.equal(mod.isPlanReviewBatch([{ id: 'a', question: 'q', detail: 'd', intent: { kind: 'plan-review', approve: 'x' }, options: [{ label: 'x' }] }, { id: 'b', question: 'q2' }]), false)
})

// --- buildSteerText ---
ok('buildSteerText zh refresh mentions intent and batch', () => {
  const text = mod.buildSteerText('refresh', [{ id: 'a', question: '选封面' }, { id: 'b', question: '选风格' }], 0, true)
  assert.ok(text.includes('选项刷新'), '应标记为选项刷新')
  assert.ok(text.includes('ask_user_question'), '应点名工具')
  assert.ok(text.includes('ask_user_choice'), '应点名工具')
  assert.ok(text.includes('5~8'), '应给出数量区间')
  assert.ok(text.includes('共 2 道'), '应说明批内题目数')
})
ok('buildSteerText zh more keeps original options', () => {
  const text = mod.buildSteerText('more', [{ id: 'a', question: '选模型' }], 0, true)
  assert.ok(text.includes('更多选项'), '应标记为更多选项')
  assert.ok(text.includes('保留原选项'), '应要求保留原选项')
  assert.ok(text.includes('6~10'), '应给出目标数量')
})
ok('buildSteerText en refresh', () => {
  const text = mod.buildSteerText('refresh', [{ id: 'a', question: 'pick a cover' }], 0, false)
  assert.ok(text.includes('Regenerate options'))
  assert.ok(text.includes('ask_user_choice'))
})
ok('buildSteerText tolerates empty questions', () => {
  const text = mod.buildSteerText('refresh', undefined, 0, true)
  assert.equal(typeof text, 'string')
  assert.ok(text.length > 0)
})

// --- parseRecommendedLabel ---
ok('parseRecommendedLabel strips suffix', () => {
  assert.deepEqual(mod.parseRecommendedLabel('A (Recommended)'), { label: 'A', recommended: true })
  assert.deepEqual(mod.parseRecommendedLabel('A（推荐）'), { label: 'A', recommended: true })
  assert.deepEqual(mod.parseRecommendedLabel('A'), { label: 'A', recommended: false })
})

// --- selectChoice ---
ok('selectChoice claims normal question', () => {
  const q = { kind: 'question', key: 'q:1', sessionId: 's1', payload: { questions: [{ id: 'a', question: 'q', options: [{ label: 'A' }] }] } }
  assert.equal(mod.selectChoice({ interactions: [q] }), q)
})
ok('selectChoice skips plan-review and approval', () => {
  const plan = { kind: 'question', key: 'q:1', sessionId: 's1', payload: { questions: [{ id: 'a', question: 'q', detail: 'plan', intent: { kind: 'plan-review', approve: '执行' }, options: [{ label: '执行' }] }] } }
  const approval = { kind: 'approval', key: 'a:1', sessionId: 's1', payload: {} }
  assert.equal(mod.selectChoice({ interactions: [approval, plan] }), null, 'plan-review 应放行给原生 PlanReviewPanel')
})
ok('selectChoice prefers question over approval and falls through to later', () => {
  const q = { kind: 'question', key: 'q:2', sessionId: 's2', payload: { questions: [{ id: 'b', question: 'q2' }] } }
  const approval = { kind: 'approval', key: 'a:1', sessionId: 's1', payload: {} }
  assert.equal(mod.selectChoice({ interactions: [approval, q] }), q)
  assert.equal(mod.selectChoice({ interactions: [approval] }), null)
})
ok('selectChoice claims image-marked question too', () => {
  const marker = '<!--dsh-pick:v1:' + encodeBase64Url(JSON.stringify({ pickId: 'p1', images: [0] })) + '-->'
  const q = { kind: 'question', key: 'q:3', sessionId: 's3', payload: { questions: [{ id: 'c', question: '选图', detail: marker, options: [{ label: 'A' }] }] } }
  assert.equal(mod.selectChoice({ interactions: [q] }), q, '带图问题应由本插件渲染（含刷新/更多按钮）')
})

console.log(`\n[dsh-plugin-choice-refresh] ${passed} checks passed`)
