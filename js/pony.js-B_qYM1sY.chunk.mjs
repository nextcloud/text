const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePony } from "./pony-Df4q4C3G.chunk.mjs";
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
var pony_js$2;
var hasRequiredPony_js;
function requirePony_js() {
  if (hasRequiredPony_js) return pony_js$2;
  hasRequiredPony_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/pony" instead of "highlight.js/lib/languages/pony.js"'
      );
    }
  }
  emitWarning();
  pony_js$2 = /* @__PURE__ */ requirePony();
  return pony_js$2;
}
var pony_jsExports = /* @__PURE__ */ requirePony_js();
const pony_js = /* @__PURE__ */ getDefaultExportFromCjs(pony_jsExports);
const pony_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: pony_js
}, [pony_jsExports]);
export {
  pony_js$1 as p
};
//# sourceMappingURL=pony.js-B_qYM1sY.chunk.mjs.map
