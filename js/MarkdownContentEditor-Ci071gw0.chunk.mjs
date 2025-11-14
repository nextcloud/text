const appName = "text";
const appVersion = "7.0.0-dev.2";
import { e as createMarkdownSerializer, R as RichText, F as FocusTrap, U as UndoRedo, c as Editor, d as useEditorMethods, p as provideEditor, f as editorFlagsKey } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { W as Wrapper, M as MainContainer, a as MenuBar, R as ReadonlyBar, C as ContentContainer, A as AttachmentResolver } from "./MenuBar-CduxWYdD.chunk.mjs";
import { g as getCurrentUser } from "./index-Djlbe-Du.chunk.mjs";
import { w as watch, p as provide } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { A as ATTACHMENT_RESOLVER } from "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./logger-DdFapB9C.chunk.mjs";
import "./index-2mjY3Y47.chunk.mjs";
import "./index-D5dRV40B.chunk.mjs";
import "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
const _sfc_main = {
  name: "MarkdownContentEditor",
  components: { ContentContainer, ReadonlyBar, MenuBar, MainContainer, Wrapper },
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [ATTACHMENT_RESOLVER]: {
        get: () => this.$attachmentResolver ?? null
      }
    });
    return val;
  },
  props: {
    fileId: {
      type: Number,
      default: null
    },
    content: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    relativePath: {
      type: String,
      default: ""
    },
    shareToken: {
      type: String,
      default: null
    },
    showMenuBar: {
      type: Boolean,
      default: true
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:content"],
  setup(props) {
    const extensions = [
      RichText.configure({
        extensions: [UndoRedo]
      }),
      FocusTrap
    ];
    const editor = new Editor({ extensions });
    const { setEditable, setContent } = useEditorMethods(editor);
    watch(
      () => props.content,
      (content) => {
        setContent(content);
      }
    );
    setEditable(!props.readOnly);
    watch(
      () => props.readOnly,
      (readOnly) => {
        setEditable(!readOnly);
      }
    );
    provideEditor(editor);
    provide(editorFlagsKey, {
      isPublic: false,
      isRichEditor: true,
      isRichWorkspace: false
    });
    return { editor, setContent };
  },
  created() {
    this.setContent(this.content, { addToHistory: false });
    this.editor.on("create", () => {
      this.$emit("ready");
      this.$parent.$emit("ready");
    });
    this.editor.on("update", ({ editor }) => {
      const markdown = createMarkdownSerializer(editor.schema).serialize(
        editor.state.doc
      );
      this.emit("update:content", {
        json: editor.state.doc,
        markdown
      });
    });
    if (this.fileId) {
      this.$attachmentResolver = new AttachmentResolver({
        currentDirectory: this.relativePath?.match(/.*\//),
        user: getCurrentUser(),
        shareToken: this.shareToken,
        fileId: this.fileId
      });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    outlineToggled(visible) {
      this.emit("outline-toggled", visible);
    },
    /**
     * Wrapper to emit events on our own and the parent component
     *
     * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
     *
     * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
     * that there is no proper way to pass any received event along in vue, the only option I've found
     * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
     *
     * @param {string} event The event name
     * @param {any} data The data to pass along
     */
    emit(event, data) {
      this.$emit(event, data);
      this.$parent?.$emit(event, data);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("Wrapper", { attrs: { "content-loaded": true, "show-outline-outside": _vm.showOutlineOutside }, on: { "outline-toggled": _vm.outlineToggled } }, [_c("MainContainer", [_vm.showMenuBar ? [!_vm.readOnly ? _c("MenuBar", { attrs: { "autohide": false } }) : _vm._t("readonlyBar", function() {
    return [_c("ReadonlyBar")];
  })] : _vm._e(), _c("ContentContainer", { attrs: { "read-only": _vm.readOnly } })], 2)], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/MarkdownContentEditor.vue";
const MarkdownContentEditor = __component__.exports;
export {
  MarkdownContentEditor as default
};
//# sourceMappingURL=MarkdownContentEditor-Ci071gw0.chunk.mjs.map
