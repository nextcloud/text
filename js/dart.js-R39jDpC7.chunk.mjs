const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDart } from "./dart-MD4lFEuN.chunk.mjs";
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
var dart_js$2;
var hasRequiredDart_js;
function requireDart_js() {
  if (hasRequiredDart_js) return dart_js$2;
  hasRequiredDart_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dart" instead of "highlight.js/lib/languages/dart.js"'
      );
    }
  }
  emitWarning();
  dart_js$2 = /* @__PURE__ */ requireDart();
  return dart_js$2;
}
var dart_jsExports = /* @__PURE__ */ requireDart_js();
const dart_js = /* @__PURE__ */ getDefaultExportFromCjs(dart_jsExports);
const dart_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dart_js
}, [dart_jsExports]);
export {
  dart_js$1 as d
};
//# sourceMappingURL=dart.js-R39jDpC7.chunk.mjs.map
