const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/DirectEditing-C3YrR8vo.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DTeU3deE.chunk.mjs'),window.OC.filePath('text', '', 'js/Editor-BKBsUncl.chunk.mjs'),window.OC.filePath('text', '', 'js/modulepreload-polyfill-BYUVWjVf.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-BhtCN8J5.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BlY3bsRS.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-CImn6F9p-D99bniab.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-CImn6F9p-CPW-xgye.chunk.css'),window.OC.filePath('text', '', 'js/RichText-eMJaMgng.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CeLjLA81.chunk.mjs'),window.OC.filePath('text', '', 'js/index-C0K-IFBz.chunk.mjs'),window.OC.filePath('text', '', 'js/index-CN6XKkNN.chunk.mjs'),window.OC.filePath('text', '', 'css/_plugin-vue2_normalizer-LsrZrMRN.chunk.css'),window.OC.filePath('text', '', 'js/index-Das7djPE.chunk.mjs'),window.OC.filePath('text', '', 'js/MediaHandler.provider-aUSwHfqn.chunk.mjs'),window.OC.filePath('text', '', 'js/logger-CMlzFtAO.chunk.mjs'),window.OC.filePath('text', '', 'css/RichText-2YVkr5eZ.chunk.css'),window.OC.filePath('text', '', 'js/Wrapper-BVHgWm7L.chunk.mjs'),window.OC.filePath('text', '', 'css/Wrapper-DfQ27Dj0.chunk.css'),window.OC.filePath('text', '', 'css/Editor-K8n_iV2r.chunk.css'),window.OC.filePath('text', '', 'css/DirectEditing-CPsltl-l.chunk.css')])))=>i.map(i=>d[i]);
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "text";
const appVersion = "5.0.0";
import { _ as __vitePreload } from "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import { s as store } from "./index-Das7djPE.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./vue.runtime.esm-DTeU3deE.chunk.mjs";
import "./index-C0K-IFBz.chunk.mjs";
if (document.getElementById("app-content")) {
  Promise.all([
    __vitePreload(() => import(
      /* webpackChunkName: "editor" */
      "./vue.runtime.esm-DTeU3deE.chunk.mjs"
    ).then((n) => n.x), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import(
      /* webpackChunkName: "editor" */
      "./DirectEditing-C3YrR8vo.chunk.mjs"
    ), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]) : void 0, import.meta.url)
  ]).then((imports) => {
    const Vue = imports[0].default;
    Vue.prototype.t = window.t;
    Vue.prototype.OCA = window.OCA;
    const DirectEditing = imports[1].default;
    const vm = new Vue({
      render: (h) => h(DirectEditing),
      store
    });
    vm.$mount(document.getElementById("app-content"));
  });
}
//# sourceMappingURL=text-text.mjs.map
