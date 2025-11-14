const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRuleslanguage } from "./ruleslanguage-Vuuy4OON.chunk.mjs";
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
var ruleslanguageExports = /* @__PURE__ */ requireRuleslanguage();
const ruleslanguage = /* @__PURE__ */ getDefaultExportFromCjs(ruleslanguageExports);
const ruleslanguage$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ruleslanguage
}, [ruleslanguageExports]);
export {
  ruleslanguage$1 as r
};
//# sourceMappingURL=ruleslanguage-BKA-n-qL.chunk.mjs.map
