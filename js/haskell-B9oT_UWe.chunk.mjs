const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHaskell } from "./haskell-4ewLDIqa.chunk.mjs";
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
var haskellExports = /* @__PURE__ */ requireHaskell();
const haskell = /* @__PURE__ */ getDefaultExportFromCjs(haskellExports);
const haskell$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: haskell
}, [haskellExports]);
export {
  haskell$1 as h
};
//# sourceMappingURL=haskell-B9oT_UWe.chunk.mjs.map
