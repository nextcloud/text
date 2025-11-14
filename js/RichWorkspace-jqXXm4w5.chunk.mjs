const appName = "text";
const appVersion = "7.0.0-dev.2";
import { t as translate, c as cancelableClient } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import { u as unsubscribe, s as subscribe } from "./index-Djlbe-Du.chunk.mjs";
import { l as loadState } from "./index-D5dRV40B.chunk.mjs";
import { a as generateOcsUrl } from "./index--FnIx9_y.chunk.mjs";
import { g as getSharingToken, i as isPublicShare } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { g as getEditorInstance } from "./Editor.singleton-BLZrO-VM.chunk.mjs";
import { R as RichTextReader } from "./RichTextReader-BgGS9bk1.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./logger-DdFapB9C.chunk.mjs";
import "./index-2mjY3Y47.chunk.mjs";
import "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import "./BaseReader-BNqqvmCv.chunk.mjs";
const IS_PUBLIC = isPublicShare();
const WORKSPACE_URL = generateOcsUrl(
  "apps/text" + (IS_PUBLIC ? "/public" : "") + "/workspace",
  2
);
const descriptionFile = translate("text", "Readme") + "." + loadState("text", "default_file_extension");
const SUPPORTED_STATIC_FILENAMES = [
  descriptionFile,
  "Readme.md",
  "README.md",
  "readme.md"
];
const _sfc_main = {
  name: "RichWorkspace",
  components: {
    RichTextReader,
    Editor: getEditorInstance
  },
  props: {
    content: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    hasRichWorkspace: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Keep track of a local copy of the hasRichWorkspace state as it might change after initial rendering (e.g. when adding/removing the readme)
      localHasRichWorkspace: false,
      focus: false,
      folder: null,
      file: null,
      loaded: false,
      ready: false,
      autofocus: false,
      shouldAutofocus: false,
      hideMenu: true,
      darkTheme: window?.OCA?.Accessibility?.theme === "dark",
      enabled: window?.OCA?.Text?.RichWorkspaceEnabled
    };
  },
  computed: {
    shareToken() {
      return getSharingToken();
    },
    shouldRender() {
      return this.enabled && this.localHasRichWorkspace;
    }
  },
  watch: {
    path() {
      this.reset();
    },
    ready() {
      this.shouldAutofocus = false;
    },
    focus(newValue) {
      if (!newValue) {
        document.querySelector("#rich-workspace .text-editor__main").scrollTo(0, 0);
      }
    },
    shouldRender(value) {
      if (value) {
        this.getFileInfo();
      }
    },
    hasRichWorkspace(value) {
      this.localHasRichWorkspace = value;
    }
  },
  mounted() {
    this.localHasRichWorkspace = this.hasRichWorkspace;
    subscribe("Text::showRichWorkspace", this.showRichWorkspace);
    subscribe("Text::hideRichWorkspace", this.hideRichWorkspace);
    subscribe("files:node:created", this.onFileCreated);
    subscribe("files:node:deleted", this.onFileDeleted);
    subscribe("files:node:renamed", this.onFileRenamed);
    this.listenKeydownEvents();
  },
  beforeDestroy() {
    unsubscribe("Text::showRichWorkspace", this.showRichWorkspace);
    unsubscribe("Text::hideRichWorkspace", this.hideRichWorkspace);
    unsubscribe("files:node:created", this.onFileCreated);
    unsubscribe("files:node:deleted", this.onFileDeleted);
    unsubscribe("files:node:renamed", this.onFileRenamed);
    this.unlistenKeydownEvents();
  },
  methods: {
    onFocus() {
      this.focus = true;
      this.hideMenu = false;
      this.unlistenKeydownEvents();
    },
    reset() {
      this.file = null;
      this.focus = false;
      this.shouldAutofocus = false;
      this.$nextTick(() => {
        if (this.shouldRender) {
          this.getFileInfo();
        }
      });
    },
    getFileInfo() {
      this.file = null;
      this.ready = false;
      this.loaded = true;
      const params = { path: this.path };
      if (IS_PUBLIC) {
        params.shareToken = this.shareToken;
      }
      return cancelableClient.get(WORKSPACE_URL, { params }).then((response) => {
        const data = response.data.ocs.data;
        this.folder = data.folder || null;
        this.file = data.file;
        this.editing = true;
        this.loaded = true;
        this.autofocus = this.shouldAutofocus;
        return true;
      }).catch((error) => {
        if (error.response.data.ocs && error.response.data.ocs.data.folder) {
          this.folder = error.response.data.ocs.data.folder;
        } else {
          this.folder = null;
        }
        this.file = null;
        this.loaded = true;
        this.ready = true;
        return false;
      });
    },
    showRichWorkspace(event) {
      this.enabled = true;
    },
    hideRichWorkspace() {
      this.enabled = false;
    },
    listenKeydownEvents() {
      window.addEventListener("keydown", this.onKeydown);
    },
    unlistenKeydownEvents() {
      window.removeEventListener("keydown", this.onKeydown);
    },
    onKeydown(e) {
      if (e.key === "Tab") {
        this.hideMenu = false;
      }
    },
    onFileCreated(node) {
      if (SUPPORTED_STATIC_FILENAMES.includes(node.basename)) {
        this.shouldAutofocus = this.enabled;
        this.localHasRichWorkspace = true;
      }
    },
    onFileDeleted(node) {
      if (node.path === this.file?.path) {
        this.localHasRichWorkspace = false;
      }
    },
    onFileRenamed(node) {
      if (SUPPORTED_STATIC_FILENAMES.includes(node.basename)) {
        this.localHasRichWorkspace = true;
      } else if (node.fileid === this.file?.id && node.path !== this.file?.path) {
        this.localHasRichWorkspace = false;
      }
    },
    t: translate
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _vm.shouldRender ? _c("div", { class: { focus: _vm.focus, dark: _vm.darkTheme }, attrs: { "id": "rich-workspace" } }, [!_vm.loaded || !_vm.ready ? _c("RichTextReader", { staticClass: "rich-workspace--preview", attrs: { "content": _vm.content } }) : _vm._e(), _vm.file ? _c("Editor", { directives: [{ name: "show", rawName: "v-show", value: _vm.ready, expression: "ready" }], key: _vm.file.path, attrs: { "file-id": _vm.file.id, "relative-path": _vm.file.path, "share-token": _vm.shareToken, "mime": _vm.file.mimetype, "autofocus": _vm.autofocus, "hide-menu": _vm.hideMenu, "active": "", "rich-workspace": "" }, on: { "ready": function($event) {
    _vm.ready = true;
  }, "focus": _vm.onFocus } }) : _vm._e()], 1) : _vm._e();
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "71632b16"
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/views/RichWorkspace.vue";
const RichWorkspace = __component__.exports;
export {
  RichWorkspace as default
};
//# sourceMappingURL=RichWorkspace-jqXXm4w5.chunk.mjs.map
