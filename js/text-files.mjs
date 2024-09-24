const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/files-Dyrnz9k_.chunk.mjs'),window.OC.filePath('text', '', 'js/modulepreload-polyfill-BYUVWjVf.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-BhtCN8J5.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BlY3bsRS.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-CImn6F9p-D99bniab.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DTeU3deE.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-CImn6F9p-CPW-xgye.chunk.css'),window.OC.filePath('text', '', 'js/index-vvv79fCA.chunk.mjs'),window.OC.filePath('text', '', 'js/index-CN6XKkNN.chunk.mjs'),window.OC.filePath('text', '', 'js/index-C0K-IFBz.chunk.mjs'),window.OC.filePath('text', '', 'js/mime-D5AROL7j.chunk.mjs'),window.OC.filePath('text', '', 'js/index-Das7djPE.chunk.mjs'),window.OC.filePath('text', '', 'js/FilesSettings-Nczta-93.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CeLjLA81.chunk.mjs'),window.OC.filePath('text', '', 'css/_plugin-vue2_normalizer-LsrZrMRN.chunk.css'),window.OC.filePath('text', '', 'js/NcCheckboxRadioSwitch-CvMEEI9x-BDdJPtSw.chunk.mjs')])))=>i.map(i=>d[i]);
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "text";
const appVersion = "5.0.0";
import { _ as __vitePreload } from "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import { l as loadState } from "./index-BlY3bsRS.chunk.mjs";
import { l as logger } from "./logger-CMlzFtAO.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./index-CN6XKkNN.chunk.mjs";
const workspaceAvailable = loadState("text", "workspace_available");
const workspaceEnabled = loadState("text", "workspace_enabled");
document.addEventListener("DOMContentLoaded", async () => {
  var _a;
  if (typeof OCA.Viewer === "undefined") {
    const { registerFileActionFallback } = await __vitePreload(async () => {
      const { registerFileActionFallback: registerFileActionFallback2 } = await import("./files-Dyrnz9k_.chunk.mjs");
      return { registerFileActionFallback: registerFileActionFallback2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url);
    logger.error("Viewer app is not installed");
    registerFileActionFallback();
  }
  if (workspaceAvailable && OCA && ((_a = OCA == null ? void 0 : OCA.Files) == null ? void 0 : _a.Settings)) {
    const { default: Vue } = await __vitePreload(async () => {
      const { default: Vue2 } = await import("./vue.runtime.esm-DTeU3deE.chunk.mjs").then((n) => n.x);
      return { default: Vue2 };
    }, true ? [] : void 0, import.meta.url);
    const { default: FilesSettings } = await __vitePreload(async () => {
      const { default: FilesSettings2 } = await import("./FilesSettings-Nczta-93.chunk.mjs");
      return { default: FilesSettings2 };
    }, true ? __vite__mapDeps([13,1,2,10,6,14,5,7,4,9,15,16]) : void 0, import.meta.url);
    const { default: store } = await __vitePreload(async () => {
      const { default: store2 } = await import("./index-Das7djPE.chunk.mjs").then((n) => n.i);
      return { default: store2 };
    }, true ? __vite__mapDeps([12,6,10,1,2]) : void 0, import.meta.url);
    Vue.prototype.t = window.t;
    Vue.prototype.n = window.n;
    Vue.prototype.OCA = window.OCA;
    const vm = new Vue({
      render: (h) => h(FilesSettings, {}),
      store
    });
    const el = vm.$mount().$el;
    OCA.Files.Settings.register(new OCA.Files.Settings.Setting("text", {
      el: () => {
        return el;
      }
    }));
  }
});
OCA.Text = {
  RichWorkspaceEnabled: workspaceEnabled
};
//# sourceMappingURL=text-files.mjs.map
