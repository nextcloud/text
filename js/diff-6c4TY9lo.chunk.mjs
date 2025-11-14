const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDiff } from "./diff-EmBe7u1w.chunk.mjs";
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
var diffExports = /* @__PURE__ */ requireDiff();
const diff = /* @__PURE__ */ getDefaultExportFromCjs(diffExports);
const diff$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: diff
}, [diffExports]);
export {
  diff$1 as d
};
//# sourceMappingURL=diff-6c4TY9lo.chunk.mjs.map
