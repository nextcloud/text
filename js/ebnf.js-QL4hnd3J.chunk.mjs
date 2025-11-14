const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireEbnf } from "./ebnf-KUHVGnT9.chunk.mjs";
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
var ebnf_js$2;
var hasRequiredEbnf_js;
function requireEbnf_js() {
  if (hasRequiredEbnf_js) return ebnf_js$2;
  hasRequiredEbnf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ebnf" instead of "highlight.js/lib/languages/ebnf.js"'
      );
    }
  }
  emitWarning();
  ebnf_js$2 = /* @__PURE__ */ requireEbnf();
  return ebnf_js$2;
}
var ebnf_jsExports = /* @__PURE__ */ requireEbnf_js();
const ebnf_js = /* @__PURE__ */ getDefaultExportFromCjs(ebnf_jsExports);
const ebnf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ebnf_js
}, [ebnf_jsExports]);
export {
  ebnf_js$1 as e
};
//# sourceMappingURL=ebnf.js-QL4hnd3J.chunk.mjs.map
