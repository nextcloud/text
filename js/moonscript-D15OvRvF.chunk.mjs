const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMoonscript } from "./moonscript-DB6LiCLe.chunk.mjs";
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
var moonscriptExports = /* @__PURE__ */ requireMoonscript();
const moonscript = /* @__PURE__ */ getDefaultExportFromCjs(moonscriptExports);
const moonscript$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: moonscript
}, [moonscriptExports]);
export {
  moonscript$1 as m
};
//# sourceMappingURL=moonscript-D15OvRvF.chunk.mjs.map
