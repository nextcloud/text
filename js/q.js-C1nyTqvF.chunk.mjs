const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireQ } from "./q-DAN1M5Ae.chunk.mjs";
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
var q_js$2;
var hasRequiredQ_js;
function requireQ_js() {
  if (hasRequiredQ_js) return q_js$2;
  hasRequiredQ_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/q" instead of "highlight.js/lib/languages/q.js"'
      );
    }
  }
  emitWarning();
  q_js$2 = /* @__PURE__ */ requireQ();
  return q_js$2;
}
var q_jsExports = /* @__PURE__ */ requireQ_js();
const q_js = /* @__PURE__ */ getDefaultExportFromCjs(q_jsExports);
const q_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: q_js
}, [q_jsExports]);
export {
  q_js$1 as q
};
//# sourceMappingURL=q.js-C1nyTqvF.chunk.mjs.map
