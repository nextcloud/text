const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePerl } from "./perl-DtigmF_X.chunk.mjs";
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
var perl_js$2;
var hasRequiredPerl_js;
function requirePerl_js() {
  if (hasRequiredPerl_js) return perl_js$2;
  hasRequiredPerl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/perl" instead of "highlight.js/lib/languages/perl.js"'
      );
    }
  }
  emitWarning();
  perl_js$2 = /* @__PURE__ */ requirePerl();
  return perl_js$2;
}
var perl_jsExports = /* @__PURE__ */ requirePerl_js();
const perl_js = /* @__PURE__ */ getDefaultExportFromCjs(perl_jsExports);
const perl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: perl_js
}, [perl_jsExports]);
export {
  perl_js$1 as p
};
//# sourceMappingURL=perl.js-Bspdlliq.chunk.mjs.map
