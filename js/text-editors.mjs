const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/MarkdownContentEditor-3_O4ispO.chunk.mjs'),window.OC.filePath('text', '', 'js/Wrapper-BVHgWm7L.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DTeU3deE.chunk.mjs'),window.OC.filePath('text', '', 'js/RichText-eMJaMgng.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CeLjLA81.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-CImn6F9p-D99bniab.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-BhtCN8J5.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-CImn6F9p-CPW-xgye.chunk.css'),window.OC.filePath('text', '', 'js/index-C0K-IFBz.chunk.mjs'),window.OC.filePath('text', '', 'js/modulepreload-polyfill-BYUVWjVf.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BlY3bsRS.chunk.mjs'),window.OC.filePath('text', '', 'js/index-CN6XKkNN.chunk.mjs'),window.OC.filePath('text', '', 'css/_plugin-vue2_normalizer-LsrZrMRN.chunk.css'),window.OC.filePath('text', '', 'js/index-Das7djPE.chunk.mjs'),window.OC.filePath('text', '', 'js/MediaHandler.provider-aUSwHfqn.chunk.mjs'),window.OC.filePath('text', '', 'js/logger-CMlzFtAO.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs'),window.OC.filePath('text', '', 'css/RichText-2YVkr5eZ.chunk.css'),window.OC.filePath('text', '', 'css/Wrapper-DfQ27Dj0.chunk.css'),window.OC.filePath('text', '', 'css/MarkdownContentEditor-CAn1_u0z.chunk.css'),window.OC.filePath('text', '', 'js/Editor-BKBsUncl.chunk.mjs'),window.OC.filePath('text', '', 'css/Editor-K8n_iV2r.chunk.css')])))=>i.map(i=>d[i]);
/*! third party licenses: js/vendor.LICENSE.txt */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _vm, _data, _TextEditorEmbed_instances, getEditorComponent_fn, registerDebug_fn;
const appName = "text";
const appVersion = "5.0.0";
import { _ as __vitePreload, s as subscribe } from "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import { V as Vue } from "./vue.runtime.esm-DTeU3deE.chunk.mjs";
import { s as store } from "./index-Das7djPE.chunk.mjs";
import { A as ACTION_ATTACHMENT_PROMPT, E as EDITOR_UPLOAD, H as HOOK_MENTION_SEARCH, a as HOOK_MENTION_INSERT, b as ATTACHMENT_RESOLVER } from "./MediaHandler.provider-aUSwHfqn.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./index-C0K-IFBz.chunk.mjs";
import "./logger-CMlzFtAO.chunk.mjs";
import "./index-CN6XKkNN.chunk.mjs";
const apiVersion = "1.1";
Vue.prototype.t = window.t;
Vue.prototype.n = window.n;
Vue.prototype.OCA = window.OCA;
window.OCA.Text = {
  ...window.OCA.Text
};
class TextEditorEmbed {
  constructor(vm, data) {
    __privateAdd(this, _TextEditorEmbed_instances);
    __privateAdd(this, _vm);
    __privateAdd(this, _data);
    __privateSet(this, _vm, vm);
    __privateSet(this, _data, data);
    __privateMethod(this, _TextEditorEmbed_instances, registerDebug_fn).call(this);
    return this;
  }
  onCreate(onCreateCallback = () => {
  }) {
    __privateGet(this, _vm).$on("create:content", (content) => {
      onCreateCallback(content);
    });
    return this;
  }
  onLoaded(onLoadedCallback = () => {
  }) {
    __privateGet(this, _vm).$on("ready", () => {
      onLoadedCallback();
    });
    return this;
  }
  onUpdate(onUpdateCallback = () => {
  }) {
    __privateGet(this, _vm).$on("update:content", (content) => {
      onUpdateCallback(content);
    });
    return this;
  }
  onOutlineToggle(onOutlineToggleCallback = () => {
  }) {
    __privateGet(this, _vm).$on("outline-toggled", (visible) => {
      onOutlineToggleCallback(visible);
    });
    return this;
  }
  onSearch(onSearchCallback = () => {
  }) {
    subscribe("text:editor:search-results", onSearchCallback);
    return this;
  }
  render(el) {
    el.innerHTML = "";
    const element = document.createElement("div");
    el.appendChild(element);
    __privateGet(this, _vm).$mount(element);
    return this;
  }
  destroy() {
    __privateGet(this, _vm).$destroy();
    __privateGet(this, _vm).$el.innerHTML = "";
  }
  setContent(content) {
    var _a, _b;
    __privateGet(this, _vm).$set(__privateGet(this, _data), "content", content);
    (_b = (_a = __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this)) == null ? void 0 : _a.setContent) == null ? void 0 : _b.call(_a, content);
    return this;
  }
  setSearchQuery(query, matchAll) {
    var _a;
    const editor = (_a = __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this)) == null ? void 0 : _a.$editor;
    editor.commands.setSearchQuery(query, matchAll);
  }
  searchNext() {
    var _a;
    const editor = (_a = __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this)) == null ? void 0 : _a.$editor;
    editor.commands.nextMatch();
  }
  searchPrevious() {
    var _a;
    const editor = (_a = __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this)) == null ? void 0 : _a.$editor;
    editor.commands.previousMatch();
  }
  async save() {
    var _a, _b;
    return (_b = (_a = __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this)).save) == null ? void 0 : _b.call(_a);
  }
  setShowOutline(value) {
    __privateGet(this, _vm).$set(__privateGet(this, _data), "showOutlineOutside", value);
    return this;
  }
  setReadOnly(value) {
    __privateGet(this, _vm).$set(__privateGet(this, _data), "readOnly", value);
    return this;
  }
  insertAtCursor(content) {
    __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this).$editor.chain().insertContent(content).focus().run();
  }
  focus() {
    __privateMethod(this, _TextEditorEmbed_instances, getEditorComponent_fn).call(this).$editor.commands.focus();
  }
}
_vm = new WeakMap();
_data = new WeakMap();
_TextEditorEmbed_instances = new WeakSet();
getEditorComponent_fn = function() {
  return __privateGet(this, _vm).$children[0];
};
registerDebug_fn = function() {
  var _a;
  if (window == null ? void 0 : window._oc_debug) {
    this.vm = __privateGet(this, _vm);
    window.OCA.Text._debug = [
      ...(_a = window.OCA.Text._debug) != null ? _a : [],
      this
    ];
  }
};
window.OCA.Text.apiVersion = apiVersion;
window.OCA.Text.createEditor = async function({
  // Element to render the editor to
  el,
  // Session editor with file mode is enabled by setting the fileId and useSession.
  // Otherwise, content needs to be provided.
  fileId = void 0,
  useSession = true,
  filePath = void 0,
  shareToken = null,
  content = "",
  readOnly = false,
  autofocus = true,
  readonlyBar = {
    component: null,
    props: null
  },
  onCreate = ({ markdown }) => {
  },
  onLoaded = () => {
  },
  onUpdate = ({ markdown }) => {
  },
  onOutlineToggle = (visible) => {
  },
  onFileInsert = void 0,
  onMentionSearch = void 0,
  onMentionInsert = void 0,
  onSearch = void 0
}) {
  const { default: MarkdownContentEditor } = await __vitePreload(async () => {
    const { default: MarkdownContentEditor2 } = await import(
      /* webpackChunkName: "editor" */
      "./MarkdownContentEditor-3_O4ispO.chunk.mjs"
    );
    return { default: MarkdownContentEditor2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]) : void 0, import.meta.url);
  const { default: Editor } = await __vitePreload(async () => {
    const { default: Editor2 } = await import(
      /* webpackChunkName: "editor" */
      "./Editor-BKBsUncl.chunk.mjs"
    ).then((n) => n.b);
    return { default: Editor2 };
  }, true ? __vite__mapDeps([20,9,6,2,10,16,5,7,3,4,8,11,12,13,14,15,17,1,18,21]) : void 0, import.meta.url);
  const data = Vue.observable({
    showOutlineOutside: false,
    readOnly,
    content
  });
  const sessionEditor = fileId && useSession;
  const vm = new Vue({
    provide() {
      return {
        [ACTION_ATTACHMENT_PROMPT]: onFileInsert,
        [EDITOR_UPLOAD]: !!sessionEditor,
        [HOOK_MENTION_SEARCH]: sessionEditor ? true : onMentionSearch,
        [HOOK_MENTION_INSERT]: sessionEditor ? true : onMentionInsert,
        [ATTACHMENT_RESOLVER]: {
          resolve(src, preferRaw) {
            return [{
              type: "image",
              url: src
            }];
          }
        }
      };
    },
    data() {
      return data;
    },
    render: (h) => {
      const scopedSlots = (readonlyBar == null ? void 0 : readonlyBar.component) ? {
        readonlyBar: () => {
          return h(readonlyBar.component, {
            props: readonlyBar.props
          });
        }
      } : {};
      return sessionEditor ? h(Editor, {
        props: {
          fileId,
          relativePath: filePath,
          shareToken,
          mime: "text/markdown",
          active: true,
          autofocus,
          showOutlineOutside: data.showOutlineOutside
        },
        scopedSlots
      }) : h(MarkdownContentEditor, {
        props: {
          fileId,
          content: data.content,
          relativePath: filePath,
          shareToken,
          readOnly: data.readOnly,
          showOutlineOutside: data.showOutlineOutside
        },
        scopedSlots
      });
    },
    store
  });
  return new TextEditorEmbed(vm, data).onCreate(onCreate).onLoaded(onLoaded).onUpdate(onUpdate).onOutlineToggle(onOutlineToggle).onSearch(onSearch).render(el);
};
//# sourceMappingURL=text-editors.mjs.map
