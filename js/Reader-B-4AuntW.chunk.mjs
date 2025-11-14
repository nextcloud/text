const appName = "text";
const appVersion = "7.0.0-dev.2";
import { P as PlainTextReader } from "./PlainTextReader-SATdJsSz.chunk.mjs";
import { R as RichTextReader } from "./RichTextReader-BgGS9bk1.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import "./EditorOutline-lqEd_HRF.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./logger-DdFapB9C.chunk.mjs";
import "./index-2mjY3Y47.chunk.mjs";
import "./index-D5dRV40B.chunk.mjs";
import "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import "./BaseReader-BNqqvmCv.chunk.mjs";
const _sfc_main = {
  name: "Reader",
  components: { PlainTextReader, RichTextReader },
  props: {
    content: {
      type: String,
      required: true
    },
    isRichEditor: {
      type: Boolean,
      default: true
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _vm.isRichEditor ? _c("RichTextReader", { attrs: { "content": _vm.content } }) : _c("PlainTextReader", { attrs: { "content": _vm.content } });
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
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Reader.vue";
const Reader = __component__.exports;
export {
  Reader as default
};
//# sourceMappingURL=Reader-B-4AuntW.chunk.mjs.map
