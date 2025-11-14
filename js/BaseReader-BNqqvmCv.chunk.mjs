const appName = "text";
const appVersion = "7.0.0-dev.2";
import { u as useOutlineStateMixin, a as useOutlineActions, E as EditorOutline, b as EditorContent, c as Editor, d as useEditorMethods, p as provideEditor } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { i as inject, w as watch } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
const _sfc_main = {
  name: "BaseReader",
  components: {
    EditorContent,
    EditorOutline
  },
  mixins: [useOutlineStateMixin, useOutlineActions],
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const extensions = inject("extensions");
    const editor = new Editor({ extensions: extensions() });
    provideEditor(editor);
    const { setContent, setEditable } = useEditorMethods(editor);
    watch(
      () => props.content,
      (content) => {
        console.warn({ content });
        setContent(content);
      }
    );
    setEditable(false);
    setContent(props.content, { addToHistory: false });
    return { editor };
  },
  computed: {
    showOutline() {
      return this.$outlineState.visible;
    }
  },
  beforeDestroy() {
    this.editor?.destroy();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "content-wrapper text-editor__content-wrapper", class: {
    "--show-outline": _vm.showOutline
  }, attrs: { "data-text-el": "editor-content-wrapper" } }, [_vm.showOutline ? _c("div", { staticClass: "text-editor__content-wrapper__left" }, [_c("EditorOutline")], 1) : _vm._e(), _c("EditorContent", { staticClass: "editor__content text-editor__content", attrs: { "id": "read-only-editor", "editor": _vm.editor } }), _c("div", { staticClass: "text-editor__content-wrapper__right" })], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "beddd503"
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/BaseReader.vue";
const BaseReader = __component__.exports;
export {
  BaseReader as B
};
//# sourceMappingURL=BaseReader-BNqqvmCv.chunk.mjs.map
