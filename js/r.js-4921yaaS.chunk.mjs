const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireR } from "./r-D6Od0deE.chunk.mjs";
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
var r_js$2;
var hasRequiredR_js;
function requireR_js() {
  if (hasRequiredR_js) return r_js$2;
  hasRequiredR_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/r" instead of "highlight.js/lib/languages/r.js"'
      );
    }
  }
  emitWarning();
  r_js$2 = /* @__PURE__ */ requireR();
  return r_js$2;
}
var r_jsExports = /* @__PURE__ */ requireR_js();
const r_js = /* @__PURE__ */ getDefaultExportFromCjs(r_jsExports);
const r_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: r_js
}, [r_jsExports]);
export {
  r_js$1 as r
};
//# sourceMappingURL=r.js-4921yaaS.chunk.mjs.map
