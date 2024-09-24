/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "text";
const appVersion = "5.0.0";
import { r as registerDavProperty, a as registerFileListHeaders } from "./index-vvv79fCA.chunk.mjs";
import { l as loadState } from "./index-BlY3bsRS.chunk.mjs";
import { addMenuRichWorkspace, FilesWorkspaceHeader } from "./files-Dyrnz9k_.chunk.mjs";
import "./modulepreload-polyfill-BYUVWjVf.chunk.mjs";
import "./index-CN6XKkNN.chunk.mjs";
import "./_plugin-vue2_normalizer-CQ6iBklL-Cs_Ws5tX.chunk.mjs";
import "./emoji-picker-BhtCN8J5.chunk.mjs";
import "./NcNoteCard-CImn6F9p-D99bniab.chunk.mjs";
import "./vue.runtime.esm-DTeU3deE.chunk.mjs";
import "./index-C0K-IFBz.chunk.mjs";
import "./mime-D5AROL7j.chunk.mjs";
import "./index-Das7djPE.chunk.mjs";
const workspaceAvailable = loadState("text", "workspace_available");
registerDavProperty("nc:rich-workspace", { nc: "http://nextcloud.org/ns" });
registerDavProperty("nc:rich-workspace-file", { nc: "http://nextcloud.org/ns" });
if (workspaceAvailable) {
  addMenuRichWorkspace();
  registerFileListHeaders(FilesWorkspaceHeader);
}
//# sourceMappingURL=text-init.mjs.map
