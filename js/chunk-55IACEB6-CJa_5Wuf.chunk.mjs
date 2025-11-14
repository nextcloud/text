const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name, d as select } from "./mermaid.core-DchgNR_P.chunk.mjs";
var getDiagramElement = /* @__PURE__ */ __name((id, securityLevel) => {
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select(sandboxElement.nodes()[0].contentDocument.body) : select("body");
  const svg = root.select(`[id="${id}"]`);
  return svg;
}, "getDiagramElement");
export {
  getDiagramElement as g
};
//# sourceMappingURL=chunk-55IACEB6-CJa_5Wuf.chunk.mjs.map
