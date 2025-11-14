const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as require_1c } from "./1c-BwXuEUMK.chunk.mjs";
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
var _1c_js$2;
var hasRequired_1c_js;
function require_1c_js() {
  if (hasRequired_1c_js) return _1c_js$2;
  hasRequired_1c_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/1c" instead of "highlight.js/lib/languages/1c.js"'
      );
    }
  }
  emitWarning();
  _1c_js$2 = /* @__PURE__ */ require_1c();
  return _1c_js$2;
}
var _1c_jsExports = /* @__PURE__ */ require_1c_js();
const _1c_js = /* @__PURE__ */ getDefaultExportFromCjs(_1c_jsExports);
const _1c_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: _1c_js
}, [_1c_jsExports]);
export {
  _1c_js$1 as _
};
//# sourceMappingURL=1c.js-B_dPjCT8.chunk.mjs.map
