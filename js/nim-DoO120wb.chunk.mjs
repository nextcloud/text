const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNim } from "./nim-Cu4o4i40.chunk.mjs";
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
var nimExports = /* @__PURE__ */ requireNim();
const nim = /* @__PURE__ */ getDefaultExportFromCjs(nimExports);
const nim$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nim
}, [nimExports]);
export {
  nim$1 as n
};
//# sourceMappingURL=nim-DoO120wb.chunk.mjs.map
