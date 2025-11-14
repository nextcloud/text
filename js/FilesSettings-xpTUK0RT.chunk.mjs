const appName = "text";
const appVersion = "7.0.0-dev.2";
import { t as translate, c as cancelableClient } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import { e as emit } from "./index-Djlbe-Du.chunk.mjs";
import { g as generateUrl } from "./index--FnIx9_y.chunk.mjs";
import { n as normalizeComponent, N as NcCheckboxRadioSwitch } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
const _sfc_main = {
  name: "FilesSettings",
  components: {
    NcCheckboxRadioSwitch
  },
  data() {
    return {
      showWorkspace: OCA.Text.RichWorkspaceEnabled
    };
  },
  methods: {
    toggle() {
      if (this.showWorkspace) {
        emit("Text::showRichWorkspace");
        cancelableClient.post(generateUrl("/apps/text/settings"), {
          key: "workspace_enabled",
          value: "1"
        });
      } else {
        emit("Text::hideRichWorkspace");
        cancelableClient.post(generateUrl("/apps/text/settings"), {
          key: "workspace_enabled",
          value: "0"
        });
      }
    },
    t: translate
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { attrs: { "id": "files-setting-richworkspace" } }, [_c("NcCheckboxRadioSwitch", { attrs: { "checked": _vm.showWorkspace }, on: { "update:checked": [function($event) {
    _vm.showWorkspace = $event;
  }, _vm.toggle] } }, [_vm._v(" " + _vm._s(_vm.t("text", "Show folder description")) + " ")])], 1);
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
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/views/FilesSettings.vue";
const FilesSettings = __component__.exports;
export {
  FilesSettings as default
};
//# sourceMappingURL=FilesSettings-xpTUK0RT.chunk.mjs.map
