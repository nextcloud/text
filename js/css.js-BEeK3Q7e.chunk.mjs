const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCss } from "./css-CPE0G4v7.chunk.mjs";
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
var css_js$2;
var hasRequiredCss_js;
function requireCss_js() {
  if (hasRequiredCss_js) return css_js$2;
  hasRequiredCss_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/css" instead of "highlight.js/lib/languages/css.js"'
      );
    }
  }
  emitWarning();
  css_js$2 = /* @__PURE__ */ requireCss();
  return css_js$2;
}
var css_jsExports = /* @__PURE__ */ requireCss_js();
const css_js = /* @__PURE__ */ getDefaultExportFromCjs(css_jsExports);
const css_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: css_js
}, [css_jsExports]);
export {
  css_js$1 as c
};
//# sourceMappingURL=css.js-BEeK3Q7e.chunk.mjs.map
