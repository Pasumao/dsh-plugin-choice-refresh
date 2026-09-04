window.__ModuleLoader__.load({
  id: 'dsh-plugin-choice-refresh',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    var react_jsx_runtime = require('react/jsx-runtime');
    var react = require('react');
    var jsx = react_jsx_runtime.jsx;
    var jsxs = react_jsx_runtime.jsxs;
    var Fragment = react_jsx_runtime.Fragment;

    // ------------------------------------------------------------------
    // 样式：一次注入 <style>，类名 dsr-*，全部走主题 CSS 变量。
    // ------------------------------------------------------------------
    var CSS = [
      '.dsr-frame{padding:14px calc(var(--dsh-composer-side-clearance, 16px) + 16px) 12px;justify-content:center;display:flex}',
      '.dsr-card{width:100%;max-width:var(--dsh-chat-content-width, 748px);border:1px solid var(--dsw-alias-border-l2-darkmode-thin);background:var(--dsw-specific-input-major);max-height:min(70vh,620px);box-shadow:var(--dsw-shadow-lv2);color:var(--dsw-alias-label-primary);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-radius:20px;flex-direction:column;padding:0 0 10px;display:flex;overflow:hidden}',
      '.dsr-card,.dsr-card *{box-sizing:border-box}',
      '.dsr-header{flex-shrink:0;justify-content:space-between;align-items:flex-start;gap:16px;padding:20px 16px 0 24px;display:flex}',
      '.dsr-headingBlock{min-width:0}',
      '.dsr-eyebrow{color:var(--dsw-alias-label-tertiary);margin-bottom:5px;font-size:11px;line-height:16px}',
      '.dsr-title{margin:0;font-size:16px;font-weight:500;line-height:22px}',
      '.dsr-detail{margin:0 2px 8px 24px;white-space:pre-wrap;word-break:break-word;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}',
      '.dsr-iconButton{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;place-items:center;padding:0;display:grid}',
      '.dsr-iconButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsr-iconButton:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}',
      '.dsr-body{overscroll-behavior:contain;flex-direction:column;flex:auto;min-height:0;display:flex;overflow-y:auto}',
      '.dsr-grid{flex-direction:column;gap:1px;margin:8px 0 0;padding:4px 24px;display:flex}',
      '.dsr-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:10px;padding:10px 24px 4px}',
      '.dsr-cardBtn{position:relative;min-width:0;color:inherit;text-align:left;cursor:pointer;background:var(--dsw-specific-input-major);border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:14px;padding:0;overflow:hidden;display:flex;flex-direction:column;transition:border-color .12s ease,background .12s ease}',
      '.dsr-cardBtn:hover:not(:disabled){border-color:var(--dsw-alias-interactive-bg-active);background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsr-cardBtn:disabled{cursor:default;opacity:.6}',
      '.dsr-cardBtn.dsr-selected{border-color:var(--dsw-alias-interactive-bg-active);background:var(--dsw-alias-interactive-bg-hover);outline:2px solid var(--dsw-alias-interactive-bg-active);outline-offset:0}',
      '.dsr-thumb{position:relative;width:100%;aspect-ratio:1/1;background:var(--dsw-alias-interactive-bg-hover);border:none;padding:0;overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:zoom-in}',
      '.dsr-thumb img{width:100%;height:100%;object-fit:cover;display:block}',
      '.dsr-thumb .dsr-thumbFallback{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px;padding:8px;text-align:center;overflow:hidden}',
      '.dsr-zoomHint{position:absolute;top:6px;left:6px;width:22px;height:22px;border-radius:999px;background:rgba(8,10,18,.55);color:#fff;place-items:center;display:grid;pointer-events:none;opacity:0;transition:opacity .12s ease;z-index:1}',
      '.dsr-thumb:hover .dsr-zoomHint,.dsr-thumb:focus-visible .dsr-zoomHint{opacity:1}',
      '.dsr-cardBtn:focus-visible{outline:2px solid var(--dsw-alias-interactive-bg-active);outline-offset:2px}',
      '.dsr-check{position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:999px;background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary-inverted);place-items:center;display:none;font-size:12px;line-height:1;z-index:1}',
      '.dsr-cardBtn.dsr-selected .dsr-check{display:grid}',
      '.dsr-cardCopy{padding:8px 10px 10px;min-width:0}',
      '.dsr-optionLabel{font-size:13px;font-weight:500;line-height:18px;overflow-wrap:anywhere}',
      '.dsr-badge{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-state-warn-tertiary);color:var(--dsw-alias-state-warn-primary);font-size:10px;line-height:14px;vertical-align:1px}',
      '.dsr-description{margin-top:2px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:15px;overflow-wrap:anywhere}',
      '.dsr-option{width:100%;min-height:40px;color:inherit;text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;align-items:center;gap:10px;padding:8px 12px;display:flex}',
      '.dsr-option:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsr-option:disabled{cursor:default}',
      '.dsr-option.dsr-optionSelected{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsr-number{width:24px;height:24px;flex-shrink:0;color:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:999px;place-items:center;display:grid;font-size:12px;line-height:1}',
      '.dsr-checkbox{width:18px;height:18px;flex-shrink:0;border:1px solid var(--dsw-alias-border-l2);border-radius:5px;place-items:center;display:grid}',
      '.dsr-checkboxChecked{background:var(--dsw-alias-interactive-bg-active);border-color:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary-inverted)}',
      '.dsr-optionCopy{flex:auto;min-width:0}',
      '.dsr-optionLine{flex-direction:column;display:flex}',
      '.dsr-customRow{width:100%;min-height:40px;align-items:center;gap:10px;padding:8px 12px;display:flex}',
      '.dsr-customInput{flex:auto;min-width:0;color:inherit;background:0 0;border:none;outline:none;font-size:14px;line-height:22px}',
      '.dsr-customInput::placeholder{color:var(--dsw-alias-label-tertiary)}',
      '.dsr-customTextarea{width:100%;margin:8px 0 0;resize:none;color:inherit;background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:10px;outline:none;padding:8px 10px;font-size:14px;line-height:22px;font-family:inherit}',
      '.dsr-customTextarea:focus{border-color:var(--dsw-alias-interactive-bg-active)}',
      '.dsr-footer{flex-shrink:0;flex-direction:column;gap:8px;padding:8px 16px 0;display:flex}',
      '.dsr-footerRow{justify-content:space-between;align-items:center;gap:12px;display:flex}',
      '.dsr-pager{flex-shrink:0;align-items:center;gap:6px;display:flex}',
      '.dsr-progress{color:var(--dsw-alias-label-secondary);white-space:nowrap;word-spacing:-2px;padding:0 4px;font-size:14px;font-weight:500;line-height:24px}',
      '.dsr-feedback{min-height:16px;color:var(--dsw-alias-state-error-primary);font-size:11px;line-height:16px;flex:auto;padding:0 8px}',
      '.dsr-actions{flex-shrink:0;align-items:center;gap:8px;display:flex;flex-wrap:wrap}',
      '.dsr-btn{appearance:none;cursor:pointer;border-radius:999px;border:1px solid transparent;font-size:13px;line-height:20px;padding:5px 14px;font-family:inherit;white-space:nowrap}',
      '.dsr-btn:disabled{cursor:default;opacity:.55}',
      '.dsr-btn-outline{background:0 0;border-color:var(--dsw-alias-border-l2-darkmode-thin);color:var(--dsw-alias-label-primary)}',
      '.dsr-btn-outline:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsr-btn-ghost{background:0 0;border-color:transparent;color:var(--dsw-alias-label-secondary)}',
      '.dsr-btn-ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsr-btn-primary{background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary-inverted)}',
      '.dsr-btn-primary:hover:not(:disabled){filter:brightness(1.08)}',
      '.dsr-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(8,10,18,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:52px 24px 28px;cursor:zoom-out}',
      '.dsr-lightboxClose{position:absolute;top:16px;right:18px;width:34px;height:34px;border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:999px;background:rgba(255,255,255,.08);color:#fff;cursor:pointer;place-items:center;display:grid;font-size:16px;line-height:1;padding:0}',
      '.dsr-lightboxClose:hover{background:rgba(255,255,255,.18)}',
      '.dsr-lightboxFigure{margin:0;max-width:min(92vw,1100px);display:flex;flex-direction:column;align-items:center;gap:10px}',
      '.dsr-lightboxFigure img{max-width:100%;max-height:82vh;object-fit:contain;border-radius:8px;background:#fff;box-shadow:0 8px 40px rgba(0,0,0,.5)}',
      '.dsr-lightboxCap{color:var(--dsw-alias-label-primary);font-size:13px;line-height:18px;text-align:center;overflow-wrap:anywhere}',
      '.dsr-lightboxCap small{display:block;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:15px;margin-top:2px}',
      '@media (width<=720px){.dsr-card{border-radius:16px}.dsr-cards{grid-template-columns:repeat(auto-fill,minmax(104px,1fr))}.dsr-lightbox{padding:44px 12px 20px}}'
    ].join('');
    var tagId = 'dsh-plugin-choice-refresh/choice.module.css';
    if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') === null) {
      var tag = document.createElement('style');
      tag.dataset.plugin = 'dsh-plugin-choice-refresh';
      tag.dataset.pluginCss = tagId;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }

    // ------------------------------------------------------------------
    // 常量与纯函数（导出供 selfcheck / smoke 测试）
    // ------------------------------------------------------------------

    /** image-tools 的图片标记前缀/后缀（与其服务端 buildPickMarker 互通）。 */
    var MARKER_PREFIX = '<!--dsh-pick:v1:';
    var MARKER_SUFFIX = '-->';
    /** image-tools 的图片字节路由前缀（选择卡图片 <img src>）。 */
    var IMAGE_ROUTE_PREFIX = '/dsh-plugin-image-tools/';

    function decodeBase64Url(value) {
      var b64 = value.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4 !== 0) b64 += '=';
      var binary = atob(b64);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    }

    /** 解析 image-tools 写入 detail 的图片标记；无标记返回 null。 */
    function parseMarker(detail) {
      if (typeof detail !== 'string' || !detail.startsWith(MARKER_PREFIX)) return null;
      var end = detail.indexOf(MARKER_SUFFIX, MARKER_PREFIX.length);
      if (end < 0) return null;
      try {
        var data = JSON.parse(decodeBase64Url(detail.slice(MARKER_PREFIX.length, end)));
        if (data === null || typeof data !== 'object' || typeof data.pickId !== 'string') return null;
        var images = Array.isArray(data.images) ? data.images.filter(function (n) { return Number.isInteger(n) && n >= 0; }) : [];
        return { pickId: data.pickId, images: images, human: detail.slice(end + MARKER_SUFFIX.length) };
      } catch (e) {
        return null;
      }
    }

    /** 该批问题是否为 plan-review 意图（原生 PlanReviewPanel 的领地，本插件不认领）。 */
    function isPlanReviewBatch(questions) {
      if (!Array.isArray(questions) || questions.length !== 1) return false;
      var question = questions[0];
      return question !== null && typeof question === 'object' && question.intent !== void 0 && question.intent !== null && question.intent.kind === 'plan-review';
    }

    /** 去掉 label 末尾的推荐标注（展示用；答案值保持原 label）。 */
    function parseRecommendedLabel(label) {
      var suffix = /\s*(?:\((?:recommended|推荐)\)|（(?:recommended|推荐)）)\s*$/i;
      return suffix.test(label)
        ? { label: label.replace(suffix, ''), recommended: true }
        : { label: label, recommended: false };
    }

    /** 输入法组合中不触发回车提交。 */
    function isComposing(event) {
      return event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229;
    }

    /** 页面语言是否中文（决定注入给模型的提示语语言）。 */
    function uiIsChinese() {
      return typeof document !== 'undefined' && (document.documentElement.lang || '').toLowerCase().indexOf('zh') === 0;
    }

    /**
     * 构造注入给模型的「重新生成 / 更多选项」提示语。
     * @param {string} kind - 'refresh' | 'more'。
     * @param {object[]} questions - 当前整批问题（含当前题）。
     * @param {number} currentIndex - 当前题下标。
     * @param {boolean} [chinese] - 中文还是英文提示（缺省按页面语言）。
     * @returns {string} 注入消息文本。
     */
    function buildSteerText(kind, questions, currentIndex, chinese) {
      var useZh = chinese === void 0 ? uiIsChinese() : Boolean(chinese);
      var list = Array.isArray(questions) ? questions : [];
      var batchNote = list.length > 1
        ? (useZh
            ? '（该批共 ' + list.length + ' 道题，其余题目也请一并重新询问。）'
            : ' (The batch had ' + list.length + ' questions; please re-ask the rest as well.)')
        : '';
      if (useZh) {
        if (kind === 'more') {
          return '【系统 · 更多选项】用户觉得选项太少，请保留原选项补充到 6~10 个后，立即重新调用 ask_user_question（纯文字）或 ask_user_choice（可含图片）提问（推荐项放第一位并标注 "(推荐)"）。' + batchNote;
        }
        return '【系统 · 选项刷新】用户对刚才的选项不满意，请换一批全新选项（5~8 个，换角度/风格/维度避免雷同）后，立即重新调用 ask_user_question（纯文字）或 ask_user_choice（可含图片）提问（推荐项放第一位并标注 "(推荐)"）。' + batchNote;
      }
      if (kind === 'more') {
        return '[System · More options] The user wants more options: keep the originals, add more to reach 6~10, then immediately re-ask via ask_user_question (text-only) or ask_user_choice (may include images), keeping the recommended option first with "(Recommended)".' + batchNote;
      }
      return '[System · Regenerate options] The user is unhappy with the previous options: provide a fresh set (5~8, a different angle/style/dimension), then immediately re-ask via ask_user_question (text-only) or ask_user_choice (may include images), keeping the recommended option first with "(Recommended)".' + batchNote;
    }

    // ------------------------------------------------------------------
    // 待答载体（dsh 0.1.2 起 composer 链的 matched 即原生 PendingQuestion：
    // .answer({answers}) / .cancel() / .key / .sessionId / .questions，
    // 这里包一层维持组件既有协议）
    // ------------------------------------------------------------------
    var PendingChoice = class {
      constructor(matched) { this.matched = matched; }
      get key() { return this.matched.key; }
      get sessionId() { return this.matched.sessionId; }
      get questions() { return this.matched.questions; }
      async answer(answer) {
        await this.matched.answer(answer);
      }
      async cancel() {
        await this.matched.cancel();
      }
    };

    // ------------------------------------------------------------------
    // 子组件：图片卡片 / 文字选项 / 放大查看
    // ------------------------------------------------------------------
    var ZOOM_ICON_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';

    function recommendedBadge(display, t) {
      return display.recommended ? jsx('span', { className: 'dsr-badge', children: t('option.recommended') }) : null;
    }

    function ImageCardBtn(props) {
      var pickId = props.pickId;
      var option = props.option;
      var optionIndex = props.optionIndex;
      var selected = props.selected;
      var multi = props.multi;
      var disabled = props.disabled;
      var t = props.t;
      var display = parseRecommendedLabel(option.label);
      var failedState = react.useState(false);
      var failed = failedState[0];
      var setFailed = failedState[1];
      var src = IMAGE_ROUTE_PREFIX + pickId + '/' + optionIndex;
      var onSelect = function () {
        if (disabled) return;
        props.onSelect();
      };
      return jsxs('div', {
        className: 'dsr-cardBtn' + (selected ? ' dsr-selected' : ''),
        role: multi ? 'checkbox' : 'radio',
        'aria-checked': selected,
        'aria-label': display.label,
        'aria-disabled': disabled,
        tabIndex: 0,
        onClick: onSelect,
        onKeyDown: function (event) {
          if (disabled || event.target !== event.currentTarget) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            props.onSelect();
          }
        },
        children: [
          jsxs('button', {
            type: 'button',
            className: 'dsr-thumb',
            'aria-label': failed ? t('image.failed') : t('image.zoom') + '：' + display.label,
            title: t('image.zoom'),
            disabled: disabled,
            onClick: function (event) {
              event.stopPropagation();
              if (!failed) props.onZoom();
            },
            children: [
              failed
                ? jsx('div', { className: 'dsr-thumbFallback', children: t('image.failed') })
                : jsx('img', {
                    src: src,
                    alt: display.label,
                    loading: 'lazy',
                    onError: function () { setFailed(true); }
                  }),
              jsx('span', { className: 'dsr-zoomHint', 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: ZOOM_ICON_SVG } }),
              selected && jsx('span', { className: 'dsr-check', 'aria-hidden': 'true', children: '\u2713' })
            ]
          }),
          jsxs('div', {
            className: 'dsr-cardCopy',
            children: [
              jsxs('div', { className: 'dsr-optionLabel', children: [display.label, recommendedBadge(display, t)] }),
              option.description !== void 0 && jsx('div', { className: 'dsr-description', children: option.description })
            ]
          })
        ]
      }, optionIndex);
    }

    function TextOptionRow(props) {
      var option = props.option;
      var optionIndex = props.optionIndex;
      var selected = props.selected;
      var multi = props.multi;
      var disabled = props.disabled;
      var t = props.t;
      var display = parseRecommendedLabel(option.label);
      return jsxs('button', {
        type: 'button',
        className: 'dsr-option' + (selected && !multi ? ' dsr-optionSelected' : ''),
        role: multi ? 'checkbox' : 'radio',
        'aria-checked': selected,
        'aria-label': display.label,
        disabled: disabled,
        onClick: function () { props.onClick(); },
        onKeyDown: props.onKeyDown,
        children: [
          multi
            ? jsx('span', {
                className: 'dsr-checkbox' + (selected ? ' dsr-checkboxChecked' : ''),
                'aria-hidden': 'true',
                children: selected ? '\u2713' : null
              })
            : jsx('span', { className: 'dsr-number', children: optionIndex + 1 }),
          jsxs('span', {
            className: 'dsr-optionCopy',
            children: [
              jsxs('span', {
                className: 'dsr-optionLine',
                children: [
                  jsxs('span', { className: 'dsr-optionLabel', children: [display.label, recommendedBadge(display, t)] }),
                  option.description !== void 0 && jsx('span', { className: 'dsr-description', children: option.description })
                ]
              })
            ]
          })
        ]
      }, optionIndex);
    }

    function Lightbox(props) {
      var zoom = props.zoom;
      var onClose = props.onClose;
      var t = props.t;
      var closeRef = react.useRef(null);
      react.useEffect(function () {
        if (zoom === null) return;
        var previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        var focusTarget = closeRef.current;
        if (focusTarget !== null && typeof focusTarget.focus === 'function') focusTarget.focus();
        function onKeyDown(event) {
          if (event.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKeyDown);
        return function () {
          document.body.style.overflow = previous;
          document.removeEventListener('keydown', onKeyDown);
        };
      }, [zoom, onClose]);
      if (zoom === null) return null;
      return jsxs('div', {
        className: 'dsr-lightbox',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': zoom.label,
        onClick: onClose,
        children: [
          jsx('button', {
            type: 'button',
            ref: closeRef,
            className: 'dsr-lightboxClose',
            'aria-label': t('image.close'),
            title: t('image.close'),
            onClick: function (event) { event.stopPropagation(); onClose(); },
            children: '\u2715'
          }),
          jsxs('figure', {
            className: 'dsr-lightboxFigure',
            onClick: function (event) { event.stopPropagation(); },
            children: [
              jsx('img', { src: zoom.src, alt: zoom.label }),
              jsxs('figcaption', {
                className: 'dsr-lightboxCap',
                children: [
                  zoom.label,
                  zoom.description !== void 0 && jsx('small', { children: zoom.description })
                ]
              })
            ]
          })
        ]
      });
    }

    // ------------------------------------------------------------------
    // 主流程：分页多题、图文混排、多选、自定义、跳过、刷新、更多选项
    // ------------------------------------------------------------------
    function ChoiceFlow(props) {
      var pending = props.pending;
      var ctx = props.ctx;
      var t = props.t;
      var questions = pending.questions;
      var markers = questions.map(function (q) { return parseMarker(q.detail); });
      var indexState = react.useState(0);
      var index = indexState[0];
      var setIndex = indexState[1];
      var draftsState = react.useState(function () {
        return questions.map(function () { return { selected: [], custom: '', skipped: false }; });
      });
      var drafts = draftsState[0];
      var setDrafts = draftsState[1];
      var busyState = react.useState(null);
      var busy = busyState[0];
      var setBusy = busyState[1];
      var errorState = react.useState(null);
      var error = errorState[0];
      var setError = errorState[1];
      var zoomState = react.useState(null);
      var zoom = zoomState[0];
      var setZoom = zoomState[1];
      var closeZoom = react.useCallback(function () { setZoom(null); }, []);

      var question = questions[index];
      var marker = markers[index];
      var draft = drafts[index];
      var hasOptions = question.options !== void 0 && question.options !== null && question.options.length > 0;
      var hasImages = marker !== null && marker.images.length > 0;

      var cancelFlow = function () {
        setBusy('cancel');
        setError(null);
        pending.cancel().catch(function (cause) {
          setBusy(null);
          setError({ text: cause instanceof Error ? cause.message : String(cause) });
        });
      };

      /** 把一条用户指令注入当前会话（steer：打断当前回合，模型随即重新提问）。 */
      var steerSession = function (text) {
        var sessionId = pending.sessionId;
        var binding = ctx.sessions !== void 0 && typeof ctx.sessions.binding === 'function' ? ctx.sessions.binding(sessionId) : void 0;
        if (binding !== void 0 && binding.session !== void 0 && typeof binding.session.prompt === 'function') {
          return binding.session.prompt([{ type: 'text', text: text }], 'steer');
        }
        if (ctx.remote !== void 0 && ctx.remote.session !== void 0 && typeof ctx.remote.session.prompt === 'function') {
          // dsh 0.1.2 起 remote 命名空间为 session（单数）且要求 requestId。
          var requestId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : 'dsr-' + Date.now() + '-' + Math.random().toString(36).slice(2);
          return ctx.remote.session.prompt({ requestId: requestId, sessionId: sessionId, mode: 'steer', content: [{ type: 'text', text: text }] });
        }
        throw new Error('choice-refresh: no session prompt transport available');
      };

      /** 刷新 / 更多选项：先解除当前问题，再 steer 提示模型重新提问。 */
      var requestRegenerate = function (kind) {
        setBusy(kind);
        setError(null);
        pending.cancel()
          .then(function () {
            return steerSession(buildSteerText(kind, questions, index));
          })
          .catch(function (cause) {
            setBusy(null);
            setError({ text: cause instanceof Error ? cause.message : String(cause) });
          });
      };

      var updateDraft = function (update) {
        setDrafts(function (current) {
          return current.map(function (item, itemIndex) { return itemIndex === index ? update(item) : item; });
        });
        setError(null);
      };
      var choose = function (label) {
        updateDraft(function (current) {
          if (question.multiSelect === true) {
            var selected = current.selected.indexOf(label) >= 0
              ? current.selected.filter(function (item) { return item !== label; })
              : current.selected.concat([label]);
            return { selected: selected, custom: '', skipped: false };
          }
          return { selected: [label], custom: '', skipped: false };
        });
        if (question.multiSelect !== true && index < questions.length - 1) setIndex(index + 1);
      };
      var answered = function (item) { return item.selected.length > 0 || item.custom.trim() !== ''; };
      var completed = function (item) { return answered(item) || item.skipped; };
      var submitDrafts = function (values) {
        var missing = values.findIndex(function (item) { return !completed(item); });
        if (missing >= 0) {
          setIndex(missing);
          setError({ key: 'error.incomplete' });
          return;
        }
        var answer = {
          answers: questions.map(function (item, itemIndex) {
            var value = values[itemIndex];
            if (value.skipped) return { id: item.id, selected: [] };
            var custom = value.custom.trim();
            return {
              id: item.id,
              selected: custom === '' || item.multiSelect === true ? value.selected : [],
              ...(custom === '' ? {} : { custom: custom })
            };
          })
        };
        setBusy('answer');
        setError(null);
        pending.answer(answer).catch(function (cause) {
          setBusy(null);
          setError({ text: cause instanceof Error ? cause.message : String(cause) });
        });
      };
      var continueFlow = function () {
        if (!answered(draft)) {
          setError({ key: 'error.unanswered' });
          return;
        }
        if (index < questions.length - 1) {
          setIndex(index + 1);
          setError(null);
          return;
        }
        submitDrafts(drafts);
      };
      var draftCustom = function (event) {
        var value = event.target.value;
        updateDraft(function (current) {
          return {
            selected: question.multiSelect === true ? current.selected : [],
            custom: value,
            skipped: false
          };
        });
      };
      var continueFromCustom = function (event) {
        if (event.key !== 'Enter' || event.shiftKey || isComposing(event)) return;
        event.preventDefault();
        continueFlow();
      };
      var skipQuestion = function () {
        var nextDrafts = drafts.map(function (item, itemIndex) {
          return itemIndex === index ? { selected: [], custom: '', skipped: true } : item;
        });
        setDrafts(nextDrafts);
        setError(null);
        if (index < questions.length - 1) {
          setIndex(index + 1);
          return;
        }
        submitDrafts(nextDrafts);
      };
      var onKeyDownOption = function (event) {
        if (event.key !== 'Enter' || !drafts.every(completed)) return;
        event.preventDefault();
        submitDrafts(drafts);
      };

      var detailText = marker !== null ? marker.human : (typeof question.detail === 'string' ? question.detail : '');
      var options = question.options !== void 0 && question.options !== null ? question.options : [];
      var imageIndexSet = marker !== null ? marker.images : [];
      var isImageOption = function (optionIndex) { return imageIndexSet.indexOf(optionIndex) >= 0; };

      return jsx('div', {
        className: 'dsr-frame',
        'data-question-key': pending.key,
        children: [
          jsxs('section', {
            className: 'dsr-card',
            'aria-labelledby': 'dsr-q-' + pending.key + '-' + index,
            children: [
              jsxs('header', {
                className: 'dsr-header',
                children: [
                  jsxs('div', {
                    className: 'dsr-headingBlock',
                    children: [
                      question.header !== void 0 && jsx('div', { className: 'dsr-eyebrow', children: question.header }),
                      jsx('h2', { className: 'dsr-title', id: 'dsr-q-' + pending.key + '-' + index, children: question.question })
                    ]
                  }),
                  jsx('button', {
                    type: 'button',
                    className: 'dsr-iconButton',
                    'aria-label': t('nav.cancel'),
                    title: t('nav.cancel'),
                    disabled: busy !== null,
                    onClick: cancelFlow,
                    children: '\u2715'
                  })
                ]
              }),
              jsxs('div', {
                className: 'dsr-body',
                children: [
                  detailText !== '' && jsx('p', { className: 'dsr-detail', children: detailText }),
                  hasImages
                    ? jsxs('div', {
                        className: 'dsr-cards',
                        role: question.multiSelect === true ? 'group' : 'radiogroup',
                        children: options.map(function (option, optionIndex) {
                          if (!isImageOption(optionIndex)) return null;
                          var selected = draft.selected.indexOf(option.label) >= 0;
                          return jsx(ImageCardBtn, {
                            pickId: marker.pickId,
                            option: option,
                            optionIndex: optionIndex,
                            selected: selected,
                            multi: question.multiSelect === true,
                            disabled: busy !== null,
                            t: t,
                            onSelect: function () { choose(option.label); },
                            onZoom: function () {
                              setZoom({
                                src: IMAGE_ROUTE_PREFIX + marker.pickId + '/' + optionIndex,
                                label: option.label,
                                description: option.description
                              });
                            }
                          }, optionIndex);
                        })
                      })
                    : null,
                  jsxs('div', {
                    className: 'dsr-grid',
                    role: question.multiSelect === true ? 'group' : 'radiogroup',
                    children: [
                      options.map(function (option, optionIndex) {
                        if (hasImages && isImageOption(optionIndex)) return null;
                        var selected = draft.selected.indexOf(option.label) >= 0;
                        return jsx(TextOptionRow, {
                          option: option,
                          optionIndex: optionIndex,
                          selected: selected,
                          multi: question.multiSelect === true,
                          disabled: busy !== null,
                          t: t,
                          onClick: function () { choose(option.label); },
                          onKeyDown: onKeyDownOption
                        }, optionIndex);
                      }),
                      hasOptions
                        ? jsxs('div', {
                            className: 'dsr-customRow',
                            children: [
                              multiInput(draft, question, t, busy, draftCustom, continueFromCustom)
                            ]
                          })
                        : jsx('textarea', {
                            autoFocus: true,
                            className: 'dsr-customTextarea',
                            value: draft.custom,
                            disabled: busy !== null,
                            rows: 2,
                            placeholder: t('custom.placeholder'),
                            onChange: draftCustom,
                            onKeyDown: continueFromCustom
                          })
                    ]
                  })
                ]
              }),
              jsxs('footer', {
                className: 'dsr-footer',
                children: [
                  jsxs('div', {
                    className: 'dsr-footerRow',
                    children: [
                      jsxs('div', {
                        className: 'dsr-pager',
                        children: [
                          jsx('button', {
                            type: 'button',
                            className: 'dsr-iconButton',
                            'aria-label': t('nav.prev'),
                            disabled: index === 0 || busy !== null,
                            onClick: function () { setIndex(index - 1); setError(null); },
                            children: '\u2039'
                          }),
                          jsxs('span', { className: 'dsr-progress', children: [index + 1, ' / ', questions.length] }),
                          jsx('button', {
                            type: 'button',
                            className: 'dsr-iconButton',
                            'aria-label': t('nav.next'),
                            disabled: index === questions.length - 1 || busy !== null,
                            onClick: function () { setIndex(index + 1); setError(null); },
                            children: '\u203a'
                          })
                        ]
                      }),
                      jsx('div', {
                        className: 'dsr-feedback',
                        role: 'status',
                        children: error === null ? null : ('key' in error ? t(error.key) : error.text)
                      })
                    ]
                  }),
                  jsxs('div', {
                    className: 'dsr-footerRow',
                    children: [
                      jsxs('div', {
                        className: 'dsr-actions',
                        children: [
                          hasOptions && jsx('button', {
                            type: 'button',
                            className: 'dsr-btn dsr-btn-ghost',
                            disabled: busy !== null,
                            onClick: function () { requestRegenerate('refresh'); },
                            children: busy === 'refresh' ? t('busy.refresh') : t('refresh.button')
                          }),
                          hasOptions && jsx('button', {
                            type: 'button',
                            className: 'dsr-btn dsr-btn-ghost',
                            disabled: busy !== null,
                            onClick: function () { requestRegenerate('more'); },
                            children: busy === 'more' ? t('busy.more') : t('more.button')
                          })
                        ]
                      }),
                      jsxs('div', {
                        className: 'dsr-actions',
                        children: [
                          jsx('button', {
                            type: 'button',
                            className: 'dsr-btn dsr-btn-outline',
                            disabled: busy !== null,
                            onClick: skipQuestion,
                            children: t('action.skip')
                          }),
                          jsx('button', {
                            type: 'button',
                            className: 'dsr-btn dsr-btn-primary',
                            disabled: busy !== null || !answered(draft),
                            onClick: continueFlow,
                            children: busy === 'answer' ? t('submitting') : (index === questions.length - 1 ? t('submit') : t('action.next'))
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }, 'dsr-card'),
          zoom !== null && jsx(Lightbox, { zoom: zoom, onClose: closeZoom, t: t })
        ]
      });
    }

    /** 多选/单选自定义答案行的前置控件。 */
    function multiInput(draft, question, t, busy, draftCustom, continueFromCustom) {
      return jsxs(Fragment, {
        children: [
          question.multiSelect === true
            ? jsx('span', {
                className: 'dsr-checkbox' + (draft.custom !== '' ? ' dsr-checkboxChecked' : ''),
                'aria-hidden': 'true',
                children: draft.custom !== '' ? '\u2713' : null
              })
            : jsx('span', { className: 'dsr-number', 'aria-hidden': 'true', children: '\u270E' }),
          jsx('input', {
            type: 'text',
            className: 'dsr-customInput',
            value: draft.custom,
            disabled: busy !== null,
            placeholder: t('custom.placeholder'),
            onChange: draftCustom,
            onKeyDown: continueFromCustom
          })
        ]
      });
    }

    // ------------------------------------------------------------------
    // 组件入口 + 链条目选择器
    // ------------------------------------------------------------------
    function ChoiceComposer(props) {
      var pending = react.useMemo(function () { return new PendingChoice(props.matched); }, [props.matched]);
      return jsx(ChoiceFlow, { pending: pending, ctx: props.ctx, t: props.t }, pending.key);
    }

    /**
     * 认领所有「非 plan-review」的 question 交互（priority -300，先于
     * image-tools 的 -100 与原生 UI 的 0）。plan-review 意图放行给原生
     * PlanReviewPanel；纯文字 / 带图片标记的问题都归本插件渲染。
     * dsh 0.1.2 起 select 入参为 { pendingInteraction }（单对象，即原生
     * PendingQuestion 实例；无交互时为 null），不再是 { interactions } 数组。
     */
    function isPendingQuestion(value) {
      return value !== null && typeof value === 'object'
        && Array.isArray(value.questions)
        && typeof value.answer === 'function'
        && typeof value.cancel === 'function';
    }
    function selectChoice(_ref) {
      var pendingInteraction = _ref.pendingInteraction;
      if (!isPendingQuestion(pendingInteraction)) return null;
      if (pendingInteraction.kind === 'plan-review') return null;
      // 兜底再判一次 plan-review 意图（老版本宿主无 kind 字段时仍能放行）。
      if (isPlanReviewBatch(pendingInteraction.questions)) return null;
      return pendingInteraction;
    }

    // ------------------------------------------------------------------
    // 文案
    // ------------------------------------------------------------------
    var NS = 'choice-refresh';
    var zh = {
      'error.incomplete': '请先完成这道问题。',
      'error.unanswered': '请选择一个选项或填写自定义答案。',
      'nav.prev': '上一题',
      'nav.next': '下一题',
      'nav.cancel': '放弃整组问题',
      'option.recommended': '推荐',
      'custom.placeholder': '输入你的答案',
      'action.skip': '跳过本题',
      'action.next': '下一题',
      'submit': '提交',
      'submitting': '提交中…',
      'refresh.button': '重新生成选项',
      'more.button': '更多选项',
      'busy.refresh': '重新生成中…',
      'busy.more': '补充更多选项中…',
      'image.failed': '图片加载失败',
      'image.zoom': '放大查看',
      'image.close': '关闭'
    };
    var en = {
      'error.incomplete': 'Please complete this question first.',
      'error.unanswered': 'Please select an option or enter a custom answer.',
      'nav.prev': 'Previous question',
      'nav.next': 'Next question',
      'nav.cancel': 'Dismiss all questions',
      'option.recommended': 'Recommended',
      'custom.placeholder': 'Type your answer',
      'action.skip': 'Skip this question',
      'action.next': 'Next',
      'submit': 'Submit',
      'submitting': 'Submitting…',
      'refresh.button': 'Regenerate options',
      'more.button': 'More options',
      'busy.refresh': 'Regenerating…',
      'busy.more': 'Adding more…',
      'image.failed': 'Image failed to load',
      'image.zoom': 'Zoom in',
      'image.close': 'Close'
    };

    function apply(ctx) {
      ctx.effect(function () {
        return ctx.locale.register(NS, { zh: zh, en: en });
      }, 'dsh-plugin-choice-refresh: dictionaries');
      ctx.slots.inject('conversation.composer', function () {
        return ctx.slots.register({
          name: 'conversation.composer',
          select: selectChoice,
          locale: NS,
          priority: -300,
          // 把插件自己的 ctx（sessions/remote）注入组件，供 steer 提示使用。
          inject: function () { return { ctx: ctx }; }
        }, ChoiceComposer);
      });
    }

    exports.apply = apply;
    exports.inject = ['slots', 'locale', 'sessions', 'remote'];
    // 供冒烟测试/复用：纯函数、选择器、载体与组件。
    exports.parseMarker = parseMarker;
    exports.isPlanReviewBatch = isPlanReviewBatch;
    exports.buildSteerText = buildSteerText;
    exports.parseRecommendedLabel = parseRecommendedLabel;
    exports.selectChoice = selectChoice;
    exports.PendingChoice = PendingChoice;
    exports.ChoiceComposer = ChoiceComposer;
    exports.ChoiceFlow = ChoiceFlow;
    exports.Lightbox = Lightbox;
    exports.MARKER_PREFIX = MARKER_PREFIX;
    exports.IMAGE_ROUTE_PREFIX = IMAGE_ROUTE_PREFIX;
    return module.exports;
  }
});
