const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireApache } from "./apache-Dzk_MOZM.chunk.mjs";
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
var apacheExports = /* @__PURE__ */ requireApache();
const apache = /* @__PURE__ */ getDefaultExportFromCjs(apacheExports);
const apache$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: apache
}, [apacheExports]);
export {
  apache$1 as a
};
//# sourceMappingURL=apache-CKsLy-G_.chunk.mjs.map
