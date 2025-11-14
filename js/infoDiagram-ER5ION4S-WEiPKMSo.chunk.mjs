const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name, l as log, K as selectSvgElement, e as configureSvgSize, L as package_default } from "./mermaid.core-DchgNR_P.chunk.mjs";
import { p as parse } from "./treemap-KMMF4GRG-CT1igcLy.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./_baseUniq-BAgO0fq_.chunk.mjs";
import "./_basePickBy-Ch8wm704.chunk.mjs";
import "./clone-BtjdRD6Z.chunk.mjs";
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: package_default.version + ""
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-ER5ION4S-WEiPKMSo.chunk.mjs.map
