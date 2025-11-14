const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAspectj } from "./aspectj-D2hOkmZl.chunk.mjs";
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
var aspectj_js$2;
var hasRequiredAspectj_js;
function requireAspectj_js() {
  if (hasRequiredAspectj_js) return aspectj_js$2;
  hasRequiredAspectj_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/aspectj" instead of "highlight.js/lib/languages/aspectj.js"'
      );
    }
  }
  emitWarning();
  aspectj_js$2 = /* @__PURE__ */ requireAspectj();
  return aspectj_js$2;
}
var aspectj_jsExports = /* @__PURE__ */ requireAspectj_js();
const aspectj_js = /* @__PURE__ */ getDefaultExportFromCjs(aspectj_jsExports);
const aspectj_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: aspectj_js
}, [aspectj_jsExports]);
export {
  aspectj_js$1 as a
};
//# sourceMappingURL=aspectj.js-DJlhvCb_.chunk.mjs.map
