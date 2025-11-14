const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireScheme } from "./scheme-DzMveIJV.chunk.mjs";
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
var scheme_js$2;
var hasRequiredScheme_js;
function requireScheme_js() {
  if (hasRequiredScheme_js) return scheme_js$2;
  hasRequiredScheme_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/scheme" instead of "highlight.js/lib/languages/scheme.js"'
      );
    }
  }
  emitWarning();
  scheme_js$2 = /* @__PURE__ */ requireScheme();
  return scheme_js$2;
}
var scheme_jsExports = /* @__PURE__ */ requireScheme_js();
const scheme_js = /* @__PURE__ */ getDefaultExportFromCjs(scheme_jsExports);
const scheme_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: scheme_js
}, [scheme_jsExports]);
export {
  scheme_js$1 as s
};
//# sourceMappingURL=scheme.js-C6PUctY0.chunk.mjs.map
