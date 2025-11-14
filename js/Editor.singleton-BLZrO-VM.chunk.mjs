const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/Editor-LhrCfzzb.chunk.mjs'),window.OC.filePath('text', '', 'js/preload-helper-wZpS7d4i.chunk.mjs'),window.OC.filePath('text', '', 'js/index-Djlbe-Du.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-Bacg5hGL.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BWUOE9Nk.chunk.mjs'),window.OC.filePath('text', '', 'js/NcLoadingIcon-D2qSC7Ri.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DtAgfqM0.chunk.mjs'),window.OC.filePath('text', '', 'js/index--FnIx9_y.chunk.mjs'),window.OC.filePath('text', '', 'css/NcLoadingIcon-C7S2_wmi.chunk.css'),window.OC.filePath('text', '', 'js/dav-CQDyL7M_-LXi2qAGJ.chunk.mjs'),window.OC.filePath('text', '', 'js/index-2mjY3Y47.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-Dz5-u2BY-BmcDQAa3.chunk.css'),window.OC.filePath('text', '', 'js/MenuBar-CduxWYdD.chunk.mjs'),window.OC.filePath('text', '', 'js/EditorOutline-lqEd_HRF.chunk.mjs'),window.OC.filePath('text', '', 'js/logger-DdFapB9C.chunk.mjs'),window.OC.filePath('text', '', 'js/index-D5dRV40B.chunk.mjs'),window.OC.filePath('text', '', 'js/NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs'),window.OC.filePath('text', '', 'css/NcCheckboxRadioSwitch-DAPHFb0L-BcHKt-lf.chunk.css'),window.OC.filePath('text', '', 'js/MediaHandler.provider-DkXa_6IX.chunk.mjs'),window.OC.filePath('text', '', 'css/EditorOutline-BNLBBJ1H.chunk.css'),window.OC.filePath('text', '', 'css/MenuBar-DtIHp0An.chunk.css'),window.OC.filePath('text', '', 'css/Editor-IkRVv2yy.chunk.css')])))=>i.map(i=>d[i]);
const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __vitePreload } from "./preload-helper-wZpS7d4i.chunk.mjs";
async function getEditorInstance() {
  if (!window._nc_text_editor_instance) {
    if (window._nc_text_editor_importing) {
      return await new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (!window._nc_text_editor_instance) {
            return;
          }
          resolve(window._nc_text_editor_instance);
          clearInterval(intervalId);
        }, 200);
      });
    } else {
      window._nc_text_editor_importing = true;
    }
    const Editor = await __vitePreload(() => import("./Editor-LhrCfzzb.chunk.mjs").then((n) => n.a), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]) : void 0, import.meta.url);
    const { default: Vue } = await __vitePreload(async () => {
      const { default: Vue2 } = await import("./vue.runtime.esm-DtAgfqM0.chunk.mjs").then((n) => n.z);
      return { default: Vue2 };
    }, true ? [] : void 0, import.meta.url);
    const EditorConstructor = Vue.extend(Editor.default);
    window._nc_text_editor_instance = EditorConstructor;
  }
  return window._nc_text_editor_instance;
}
export {
  getEditorInstance as g
};
//# sourceMappingURL=Editor.singleton-BLZrO-VM.chunk.mjs.map
