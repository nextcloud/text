const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDos } from "./dos-CE3a0L6B.chunk.mjs";
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
var dosExports = /* @__PURE__ */ requireDos();
const dos = /* @__PURE__ */ getDefaultExportFromCjs(dosExports);
const dos$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dos
}, [dosExports]);
export {
  dos$1 as d
};
//# sourceMappingURL=dos-CV7NDTL2.chunk.mjs.map
