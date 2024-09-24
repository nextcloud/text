const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/ViewerComponent-z6Hi3aIW.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DTeU3deE.chunk.mjs'),window.OC.filePath('text', '', 'js/index-C0K-IFBz.chunk.mjs'),window.OC.filePath('text', '', 'js/modulepreload-polyfill-BYUVWjVf.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-BhtCN8J5.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BlY3bsRS.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-CImn6F9p-D99bniab.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-CImn6F9p-CPW-xgye.chunk.css'),window.OC.filePath('text', '', 'js/RichText-eMJaMgng.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CeLjLA81.chunk.mjs'),window.OC.filePath('text', '', 'js/index-CN6XKkNN.chunk.mjs'),window.OC.filePath('text', '', 'css/_plugin-vue2_normalizer-LsrZrMRN.chunk.css'),window.OC.filePath('text', '', 'js/index-Das7djPE.chunk.mjs'),window.OC.filePath('text', '', 'js/MediaHandler.provider-aUSwHfqn.chunk.mjs'),window.OC.filePath('text', '', 'js/logger-CMlzFtAO.chunk.mjs'),window.OC.filePath('text', '', 'css/RichText-2YVkr5eZ.chunk.css'),window.OC.filePath('text', '', 'js/PlainTextReader-DFZRumEY.chunk.mjs'),window.OC.filePath('text', '', 'js/BaseReader-CmPVmilE.chunk.mjs'),window.OC.filePath('text', '', 'css/BaseReader-DniRUup6.chunk.css'),window.OC.filePath('text', '', 'js/MarkdownContentEditor-3_O4ispO.chunk.mjs'),window.OC.filePath('text', '', 'js/Wrapper-BVHgWm7L.chunk.mjs'),window.OC.filePath('text', '', 'css/Wrapper-DfQ27Dj0.chunk.css'),window.OC.filePath('text', '', 'css/MarkdownContentEditor-CAn1_u0z.chunk.css'),window.OC.filePath('text', '', 'js/Editor.singleton-BZM-Fhap.chunk.mjs'),window.OC.filePath('text', '', 'css/ViewerComponent-DPp0Vfnl.chunk.css')])))=>i.map(i=>d[i]);
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "text";
const appVersion = "5.0.0";
import { _ as __vitePreload } from "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import { l as logger } from "./logger-CMlzFtAO.chunk.mjs";
import { o as openMimetypesMarkdown, a as openMimetypesPlainText } from "./mime-D5AROL7j.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./index-CN6XKkNN.chunk.mjs";
function AsyncTextViewerComponent() {
  return __vitePreload(() => import("./ViewerComponent-z6Hi3aIW.chunk.mjs"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]) : void 0, import.meta.url);
}
if (typeof OCA.Viewer === "undefined") {
  logger.error("Viewer app is not installed");
} else {
  OCA.Viewer.registerHandler({
    id: "text",
    mimes: [...openMimetypesMarkdown, ...openMimetypesPlainText],
    component: AsyncTextViewerComponent,
    group: null,
    theme: "default",
    canCompare: true
  });
}
//# sourceMappingURL=text-viewer.mjs.map
