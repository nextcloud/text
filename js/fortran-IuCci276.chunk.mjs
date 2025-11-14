const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireFortran } from "./fortran-BuDP7Cu6.chunk.mjs";
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
var fortranExports = /* @__PURE__ */ requireFortran();
const fortran = /* @__PURE__ */ getDefaultExportFromCjs(fortranExports);
const fortran$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: fortran
}, [fortranExports]);
export {
  fortran$1 as f
};
//# sourceMappingURL=fortran-IuCci276.chunk.mjs.map
