const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCoq } from "./coq-CPrDm5zN.chunk.mjs";
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
var coq_js$2;
var hasRequiredCoq_js;
function requireCoq_js() {
  if (hasRequiredCoq_js) return coq_js$2;
  hasRequiredCoq_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/coq" instead of "highlight.js/lib/languages/coq.js"'
      );
    }
  }
  emitWarning();
  coq_js$2 = /* @__PURE__ */ requireCoq();
  return coq_js$2;
}
var coq_jsExports = /* @__PURE__ */ requireCoq_js();
const coq_js = /* @__PURE__ */ getDefaultExportFromCjs(coq_jsExports);
const coq_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: coq_js
}, [coq_jsExports]);
export {
  coq_js$1 as c
};
//# sourceMappingURL=coq.js-Dyew-y1g.chunk.mjs.map
