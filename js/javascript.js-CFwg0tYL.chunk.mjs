const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJavascript } from "./javascript-Dk3tMfIz.chunk.mjs";
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
var javascript_js$2;
var hasRequiredJavascript_js;
function requireJavascript_js() {
  if (hasRequiredJavascript_js) return javascript_js$2;
  hasRequiredJavascript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/javascript" instead of "highlight.js/lib/languages/javascript.js"'
      );
    }
  }
  emitWarning();
  javascript_js$2 = /* @__PURE__ */ requireJavascript();
  return javascript_js$2;
}
var javascript_jsExports = /* @__PURE__ */ requireJavascript_js();
const javascript_js = /* @__PURE__ */ getDefaultExportFromCjs(javascript_jsExports);
const javascript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: javascript_js
}, [javascript_jsExports]);
export {
  javascript_js$1 as j
};
//# sourceMappingURL=javascript.js-CFwg0tYL.chunk.mjs.map
