const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireN1ql } from "./n1ql-BbsUNpdx.chunk.mjs";
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
var n1qlExports = /* @__PURE__ */ requireN1ql();
const n1ql = /* @__PURE__ */ getDefaultExportFromCjs(n1qlExports);
const n1ql$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: n1ql
}, [n1qlExports]);
export {
  n1ql$1 as n
};
//# sourceMappingURL=n1ql-DsPbA3OL.chunk.mjs.map
