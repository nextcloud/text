const appName = "text";
const appVersion = "7.0.0-dev.2";
import { t as translate, c as cancelableClient } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import { g as getClient, a as getRootPath } from "./dav-CQDyL7M_-LXi2qAGJ.chunk.mjs";
import { g as getSharingToken, h as PencilOutlineIcon } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { N as NcButton } from "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import { V as Vue } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import MarkdownContentEditor from "./MarkdownContentEditor-Ci071gw0.chunk.mjs";
import { P as PlainTextReader } from "./PlainTextReader-SATdJsSz.chunk.mjs";
import { g as getEditorInstance } from "./Editor.singleton-BLZrO-VM.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./index-2mjY3Y47.chunk.mjs";
import "./logger-DdFapB9C.chunk.mjs";
import "./index-D5dRV40B.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import "./MenuBar-CduxWYdD.chunk.mjs";
import "./BaseReader-BNqqvmCv.chunk.mjs";
const _sfc_main = {
  name: "ViewerComponent",
  components: {
    NcButton: Vue.extend(NcButton),
    PencilOutlineIcon: Vue.extend(PencilOutlineIcon),
    PlainTextReader: Vue.extend(PlainTextReader),
    MarkdownContentEditor: Vue.extend(MarkdownContentEditor),
    Editor: getEditorInstance
  },
  provide() {
    return {
      isEmbedded: this.isEmbedded
    };
  },
  props: {
    filename: {
      type: String,
      default: null
    },
    fileid: {
      type: Number,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    shareToken: {
      type: String,
      default: () => getSharingToken()
    },
    mime: {
      type: String,
      default: null
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    },
    permissions: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      default: void 0
    },
    isEmbedded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: "",
      hasToggledInteractiveEmbedding: false
    };
  },
  computed: {
    /** @return {boolean} */
    useSourceView() {
      return this.source && (this.fileVersion || !this.fileid || this.isEmbedded || this.isEncrypted) && !this.hasToggledInteractiveEmbedding;
    },
    isEncrypted() {
      return this.$attrs.e2EeIsEncrypted || false;
    },
    isMarkdown() {
      return this.mime === "text/markdown" || this.mime === "text/x-web-markdown";
    },
    /** @return {boolean} */
    readerComponent() {
      return this.isMarkdown ? MarkdownContentEditor : PlainTextReader;
    }
  },
  watch: {
    source() {
      this.loadFileContent();
    }
  },
  mounted() {
    this.loadFileContent();
  },
  methods: {
    async loadFileContent() {
      if (this.useSourceView) {
        if (this.isEncrypted) {
          this.content = await this.fetchDecryptedContent();
          this.contentLoaded = true;
        } else {
          const response = await cancelableClient.get(this.source);
          this.content = response.data;
          this.contentLoaded = true;
        }
      }
      this.$emit("update:loaded", true);
    },
    toggleEdit() {
      this.hasToggledInteractiveEmbedding = true;
    },
    async fetchDecryptedContent() {
      const client = getClient();
      const response = await client.getFileContents(
        `${getRootPath()}${this.filename}`,
        { details: true }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"]
      });
      const reader = new FileReader();
      reader.readAsText(blob);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    },
    t: translate
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return !_vm.useSourceView ? _c("Editor", { class: { "text-editor--embedding": _vm.isEmbedded }, attrs: { "file-id": _vm.fileid, "relative-path": _vm.filename, "active": _vm.active || _vm.isEmbedded, "autofocus": _vm.autofocus, "share-token": _vm.shareToken, "mime": _vm.mime, "show-outline-outside": _vm.showOutlineOutside } }) : _c("div", { staticClass: "text-editor source-viewer", attrs: { "id": "editor-container", "data-text-el": "editor-container" } }, [_c(_vm.readerComponent, { tag: "Component", attrs: { "content": _vm.content, "file-id": _vm.fileid, "read-only": true, "show-menu-bar": false } }), _vm.isEmbedded ? _c("NcButton", { staticClass: "toggle-interactive", on: { "click": _vm.toggleEdit }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("PencilOutlineIcon")];
  }, proxy: true }], null, false, 139796693) }, [_vm._v(" " + _vm._s(_vm.t("text", "Edit")) + " ")]) : _vm._e()], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "22b2881e"
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/ViewerComponent.vue";
const ViewerComponent = __component__.exports;
export {
  ViewerComponent as default
};
//# sourceMappingURL=ViewerComponent-DDIrhwsn.chunk.mjs.map
