const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDsconfig } from "./dsconfig-hjjGCKCN.chunk.mjs";
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
var dsconfigExports = /* @__PURE__ */ requireDsconfig();
const dsconfig = /* @__PURE__ */ getDefaultExportFromCjs(dsconfigExports);
const dsconfig$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dsconfig
}, [dsconfigExports]);
export {
  dsconfig$1 as d
};
//# sourceMappingURL=dsconfig-Cxr2AGRV.chunk.mjs.map
