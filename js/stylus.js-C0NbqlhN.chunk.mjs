const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireStylus } from "./stylus-DgVbi-_a.chunk.mjs";
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
var stylus_js$2;
var hasRequiredStylus_js;
function requireStylus_js() {
  if (hasRequiredStylus_js) return stylus_js$2;
  hasRequiredStylus_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/stylus" instead of "highlight.js/lib/languages/stylus.js"'
      );
    }
  }
  emitWarning();
  stylus_js$2 = /* @__PURE__ */ requireStylus();
  return stylus_js$2;
}
var stylus_jsExports = /* @__PURE__ */ requireStylus_js();
const stylus_js = /* @__PURE__ */ getDefaultExportFromCjs(stylus_jsExports);
const stylus_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: stylus_js
}, [stylus_jsExports]);
export {
  stylus_js$1 as s
};
//# sourceMappingURL=stylus.js-C0NbqlhN.chunk.mjs.map
