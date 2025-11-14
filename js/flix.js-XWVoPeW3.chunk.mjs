const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireFlix } from "./flix-BSBK0QpJ.chunk.mjs";
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
var flix_js$2;
var hasRequiredFlix_js;
function requireFlix_js() {
  if (hasRequiredFlix_js) return flix_js$2;
  hasRequiredFlix_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/flix" instead of "highlight.js/lib/languages/flix.js"'
      );
    }
  }
  emitWarning();
  flix_js$2 = /* @__PURE__ */ requireFlix();
  return flix_js$2;
}
var flix_jsExports = /* @__PURE__ */ requireFlix_js();
const flix_js = /* @__PURE__ */ getDefaultExportFromCjs(flix_jsExports);
const flix_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: flix_js
}, [flix_jsExports]);
export {
  flix_js$1 as f
};
//# sourceMappingURL=flix.js-XWVoPeW3.chunk.mjs.map
