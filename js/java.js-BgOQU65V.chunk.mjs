const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJava } from "./java-_vI9jIO2.chunk.mjs";
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
var java_js$2;
var hasRequiredJava_js;
function requireJava_js() {
  if (hasRequiredJava_js) return java_js$2;
  hasRequiredJava_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/java" instead of "highlight.js/lib/languages/java.js"'
      );
    }
  }
  emitWarning();
  java_js$2 = /* @__PURE__ */ requireJava();
  return java_js$2;
}
var java_jsExports = /* @__PURE__ */ requireJava_js();
const java_js = /* @__PURE__ */ getDefaultExportFromCjs(java_jsExports);
const java_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: java_js
}, [java_jsExports]);
export {
  java_js$1 as j
};
//# sourceMappingURL=java.js-BgOQU65V.chunk.mjs.map
