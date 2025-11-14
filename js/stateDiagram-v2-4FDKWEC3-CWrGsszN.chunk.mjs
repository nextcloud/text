const appName = "text";
const appVersion = "7.0.0-dev.2";
import { s as styles_default, b as stateRenderer_v3_unified_default, a as stateDiagram_default, S as StateDB } from "./chunk-DI55MBZ5-BTtAyG0B.chunk.mjs";
import { _ as __name } from "./mermaid.core-DchgNR_P.chunk.mjs";
import "./chunk-55IACEB6-CJa_5Wuf.chunk.mjs";
import "./chunk-QN33PNHL-5pVNXSy4.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
var diagram = {
  parser: stateDiagram_default,
  get db() {
    return new StateDB(2);
  },
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
//# sourceMappingURL=stateDiagram-v2-4FDKWEC3-CWrGsszN.chunk.mjs.map
