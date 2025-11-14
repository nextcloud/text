const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireBnf } from "./bnf-BsFHztS1.chunk.mjs";
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
var bnf_js$2;
var hasRequiredBnf_js;
function requireBnf_js() {
  if (hasRequiredBnf_js) return bnf_js$2;
  hasRequiredBnf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/bnf" instead of "highlight.js/lib/languages/bnf.js"'
      );
    }
  }
  emitWarning();
  bnf_js$2 = /* @__PURE__ */ requireBnf();
  return bnf_js$2;
}
var bnf_jsExports = /* @__PURE__ */ requireBnf_js();
const bnf_js = /* @__PURE__ */ getDefaultExportFromCjs(bnf_jsExports);
const bnf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: bnf_js
}, [bnf_jsExports]);
export {
  bnf_js$1 as b
};
//# sourceMappingURL=bnf.js-iAcOWr3U.chunk.mjs.map
