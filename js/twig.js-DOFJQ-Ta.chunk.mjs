const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTwig } from "./twig-D17XSjTN.chunk.mjs";
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
var twig_js$2;
var hasRequiredTwig_js;
function requireTwig_js() {
  if (hasRequiredTwig_js) return twig_js$2;
  hasRequiredTwig_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/twig" instead of "highlight.js/lib/languages/twig.js"'
      );
    }
  }
  emitWarning();
  twig_js$2 = /* @__PURE__ */ requireTwig();
  return twig_js$2;
}
var twig_jsExports = /* @__PURE__ */ requireTwig_js();
const twig_js = /* @__PURE__ */ getDefaultExportFromCjs(twig_jsExports);
const twig_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: twig_js
}, [twig_jsExports]);
export {
  twig_js$1 as t
};
//# sourceMappingURL=twig.js-DOFJQ-Ta.chunk.mjs.map
