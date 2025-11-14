const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRsl } from "./rsl-_WcDtLsN.chunk.mjs";
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
var rsl_js$2;
var hasRequiredRsl_js;
function requireRsl_js() {
  if (hasRequiredRsl_js) return rsl_js$2;
  hasRequiredRsl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/rsl" instead of "highlight.js/lib/languages/rsl.js"'
      );
    }
  }
  emitWarning();
  rsl_js$2 = /* @__PURE__ */ requireRsl();
  return rsl_js$2;
}
var rsl_jsExports = /* @__PURE__ */ requireRsl_js();
const rsl_js = /* @__PURE__ */ getDefaultExportFromCjs(rsl_jsExports);
const rsl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: rsl_js
}, [rsl_jsExports]);
export {
  rsl_js$1 as r
};
//# sourceMappingURL=rsl.js-VDE4E9aH.chunk.mjs.map
