const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProcessing } from "./processing-B59J24jo.chunk.mjs";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var processingExports = /* @__PURE__ */ requireProcessing();
const processing = /* @__PURE__ */ getDefaultExportFromCjs(processingExports);
const processing$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: processing
}, [processingExports]);
export {
  processing$1 as p
};
//# sourceMappingURL=processing-DWsPVH4S.chunk.mjs.map
