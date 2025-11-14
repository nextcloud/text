const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGo } from "./go-CYs2PpAe.chunk.mjs";
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
var go_js$2;
var hasRequiredGo_js;
function requireGo_js() {
  if (hasRequiredGo_js) return go_js$2;
  hasRequiredGo_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/go" instead of "highlight.js/lib/languages/go.js"'
      );
    }
  }
  emitWarning();
  go_js$2 = /* @__PURE__ */ requireGo();
  return go_js$2;
}
var go_jsExports = /* @__PURE__ */ requireGo_js();
const go_js = /* @__PURE__ */ getDefaultExportFromCjs(go_jsExports);
const go_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: go_js
}, [go_jsExports]);
export {
  go_js$1 as g
};
//# sourceMappingURL=go.js-Cujkpex9.chunk.mjs.map
