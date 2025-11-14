const appName = "text";
const appVersion = "7.0.0-dev.2";
import { R as RichText } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { B as BaseReader } from "./BaseReader-BNqqvmCv.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
const _sfc_main = {
  name: "RichTextReader",
  components: { BaseReader },
  provide: {
    extensions() {
      return [
        RichText.configure({
          editing: false
        })
      ];
    }
  },
  props: {
    content: {
      type: String,
      required: true
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("BaseReader", { attrs: { "content": _vm.content }, on: { "click-link": (e, a) => _vm.$emit("click-link", e, a) } });
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
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/RichTextReader.vue";
const RichTextReader = __component__.exports;
export {
  RichTextReader as R
};
//# sourceMappingURL=RichTextReader-BgGS9bk1.chunk.mjs.map
