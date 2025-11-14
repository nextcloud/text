const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireParser3 } from "./parser3-1kHdW3KP.chunk.mjs";
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
var parser3Exports = /* @__PURE__ */ requireParser3();
const parser3 = /* @__PURE__ */ getDefaultExportFromCjs(parser3Exports);
const parser3$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: parser3
}, [parser3Exports]);
export {
  parser3$1 as p
};
//# sourceMappingURL=parser3-BvkFwuus.chunk.mjs.map
