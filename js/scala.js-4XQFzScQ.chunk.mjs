const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireScala } from "./scala-Iu3LhW82.chunk.mjs";
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
var scala_js$2;
var hasRequiredScala_js;
function requireScala_js() {
  if (hasRequiredScala_js) return scala_js$2;
  hasRequiredScala_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/scala" instead of "highlight.js/lib/languages/scala.js"'
      );
    }
  }
  emitWarning();
  scala_js$2 = /* @__PURE__ */ requireScala();
  return scala_js$2;
}
var scala_jsExports = /* @__PURE__ */ requireScala_js();
const scala_js = /* @__PURE__ */ getDefaultExportFromCjs(scala_jsExports);
const scala_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: scala_js
}, [scala_jsExports]);
export {
  scala_js$1 as s
};
//# sourceMappingURL=scala.js-4XQFzScQ.chunk.mjs.map
