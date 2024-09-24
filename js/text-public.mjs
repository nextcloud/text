const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=[window.OC.filePath('text', '', 'js/Editor-BKBsUncl.chunk.mjs'),window.OC.filePath('text', '', 'js/modulepreload-polyfill-BYUVWjVf.chunk.mjs'),window.OC.filePath('text', '', 'js/emoji-picker-BhtCN8J5.chunk.mjs'),window.OC.filePath('text', '', 'js/vue.runtime.esm-DTeU3deE.chunk.mjs'),window.OC.filePath('text', '', 'js/index-BlY3bsRS.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs'),window.OC.filePath('text', '', 'js/NcNoteCard-CImn6F9p-D99bniab.chunk.mjs'),window.OC.filePath('text', '', 'css/NcNoteCard-CImn6F9p-CPW-xgye.chunk.css'),window.OC.filePath('text', '', 'js/RichText-eMJaMgng.chunk.mjs'),window.OC.filePath('text', '', 'js/_plugin-vue2_normalizer-CeLjLA81.chunk.mjs'),window.OC.filePath('text', '', 'js/index-C0K-IFBz.chunk.mjs'),window.OC.filePath('text', '', 'js/index-CN6XKkNN.chunk.mjs'),window.OC.filePath('text', '', 'css/_plugin-vue2_normalizer-LsrZrMRN.chunk.css'),window.OC.filePath('text', '', 'js/index-Das7djPE.chunk.mjs'),window.OC.filePath('text', '', 'js/MediaHandler.provider-aUSwHfqn.chunk.mjs'),window.OC.filePath('text', '', 'js/logger-CMlzFtAO.chunk.mjs'),window.OC.filePath('text', '', 'css/RichText-2YVkr5eZ.chunk.css'),window.OC.filePath('text', '', 'js/Wrapper-BVHgWm7L.chunk.mjs'),window.OC.filePath('text', '', 'css/Wrapper-DfQ27Dj0.chunk.css'),window.OC.filePath('text', '', 'css/Editor-K8n_iV2r.chunk.css')])))=>i.map(i=>d[i]);
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "text";
const appVersion = "5.0.0";
import { _ as __vitePreload, s as subscribe, e as emit } from "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import { l as loadState } from "./index-BlY3bsRS.chunk.mjs";
import { g as getSharingToken } from "./_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs";
import { registerFileActionFallback, registerFileCreate } from "./files-Dyrnz9k_.chunk.mjs";
import { l as logger } from "./logger-CMlzFtAO.chunk.mjs";
import { b as openMimetypes } from "./mime-D5AROL7j.chunk.mjs";
import { s as store } from "./index-Das7djPE.chunk.mjs";
import RichWorkspace from "./RichWorkspace-Zq6K0ooi.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./NcNoteCard-CImn6F9p-D99bniab.chunk.mjs";
import "./vue.runtime.esm-DTeU3deE.chunk.mjs";
import "./index-vvv79fCA.chunk.mjs";
import "./index-CN6XKkNN.chunk.mjs";
import "./index-C0K-IFBz.chunk.mjs";
import "./Editor.singleton-BZM-Fhap.chunk.mjs";
import "./RichTextReader-BeGEhpxR.chunk.mjs";
import "./BaseReader-CmPVmilE.chunk.mjs";
import "./RichText-eMJaMgng.chunk.mjs";
import "./_plugin-vue2_normalizer-CeLjLA81.chunk.mjs";
import "./MediaHandler.provider-aUSwHfqn.chunk.mjs";
const documentReady = function(callback) {
  const fn = () => setTimeout(callback, 0);
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};
const newRichWorkspaceFileMenuPlugin = {
  attach(menu) {
    const fileList = menu.fileList;
    const descriptionFile = t("text", "Readme") + "." + loadState("text", "default_file_extension");
    if (fileList.id !== "files" && fileList.id !== "files.public") {
      return;
    }
    menu.addMenuEntry({
      id: "rich-workspace-init",
      displayName: t("text", "Add folder description"),
      templateName: descriptionFile,
      iconClass: "icon-add-folder-description",
      fileType: "file",
      useInput: false,
      actionHandler() {
        return window.FileList.createFile(descriptionFile, { scrollTo: false, animate: false }).then(() => emit("Text::showRichWorkspace", { autofocus: true }));
      },
      shouldShow() {
        return !fileList.findFile(descriptionFile);
      }
    });
  }
};
const filesWorkspacePlugin = {
  el: null,
  attach(fileList) {
    if (fileList.id !== "files" && fileList.id !== "files.public") {
      return;
    }
    this.el = document.createElement("div");
    fileList.registerHeader({
      id: "workspace",
      el: this.el,
      render: this.render.bind(this),
      priority: 10
    });
  },
  render(fileList) {
    if (fileList.id !== "files" && fileList.id !== "files.public") {
      return;
    }
    OC.Plugins.register("OCA.Files.NewFileMenu", newRichWorkspaceFileMenuPlugin);
    __vitePreload(() => import("./vue.runtime.esm-DTeU3deE.chunk.mjs").then((n) => n.x), true ? [] : void 0, import.meta.url).then((module) => {
      const Vue = module.default;
      this.el.id = "files-workspace-wrapper";
      Vue.prototype.t = window.t;
      Vue.prototype.n = window.n;
      Vue.prototype.OCA = window.OCA;
      const View = Vue.extend(RichWorkspace);
      const vm = new View({
        propsData: {
          path: fileList.getCurrentDirectory(),
          hasRichWorkspace: true
        },
        store
      }).$mount(this.el);
      subscribe("files:navigation:changed", () => {
        vm.active = OCA.Files.App.getCurrentFileList() === fileList;
      });
      fileList.$el.on("urlChanged", (data) => {
        vm.path = data.dir.toString();
      });
      fileList.$el.on("changeDirectory", (data) => {
        vm.path = data.dir.toString();
      });
    });
  }
};
const loadEditor = ({ sharingToken, mimetype, fileId, $el }) => {
  const container = document.createElement("div");
  container.id = "texteditor";
  document.getElementById("app-content").appendChild(container);
  Promise.all([
    __vitePreload(() => import(
      /* webpackChunkName: "vendor" */
      "./vue.runtime.esm-DTeU3deE.chunk.mjs"
    ).then((n) => n.x), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import(
      /* webpackChunkName: "editor" */
      "./Editor-BKBsUncl.chunk.mjs"
    ).then((n) => n.b), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]) : void 0, import.meta.url)
  ]).then(([vue, editor]) => ({
    Vue: vue.default,
    Editor: editor.default
  })).then(({ Vue, Editor }) => {
    Vue.prototype.t = window.t;
    Vue.prototype.OCA = window.OCA;
    new Vue({
      render: (h) => h(Editor, {
        props: {
          active: true,
          shareToken: sharingToken,
          mime: mimetype,
          fileId
        }
      }),
      store
    }).$mount($el);
  }).catch((error) => logger.error("Failed to attach editor", { error }));
};
documentReady(() => {
  var _a;
  const sharingToken = getSharingToken();
  if (!sharingToken) {
    return;
  }
  const filesTable = document.querySelector("#preview table.files-filestable");
  if (filesTable) {
    OC.Plugins.register("OCA.Files.FileList", filesWorkspacePlugin);
    registerFileActionFallback();
    registerFileCreate();
    return;
  }
  const mimetype = (_a = document.getElementById("mimetype")) == null ? void 0 : _a.value;
  if (mimetype && openMimetypes.indexOf(mimetype) !== -1) {
    const $el = document.getElementById("preview");
    const fileId = loadState("text", "file_id");
    loadEditor({ mimetype, sharingToken, fileId, $el });
  }
});
OCA.Text = {
  RichWorkspaceEnabled: loadState("text", "workspace_available")
};
//# sourceMappingURL=text-public.mjs.map
