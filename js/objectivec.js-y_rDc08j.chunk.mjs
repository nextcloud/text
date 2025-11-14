const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireObjectivec } from "./objectivec-C_IP7xre.chunk.mjs";
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
var objectivec_js$2;
var hasRequiredObjectivec_js;
function requireObjectivec_js() {
  if (hasRequiredObjectivec_js) return objectivec_js$2;
  hasRequiredObjectivec_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/objectivec" instead of "highlight.js/lib/languages/objectivec.js"'
      );
    }
  }
  emitWarning();
  objectivec_js$2 = /* @__PURE__ */ requireObjectivec();
  return objectivec_js$2;
}
var objectivec_jsExports = /* @__PURE__ */ requireObjectivec_js();
const objectivec_js = /* @__PURE__ */ getDefaultExportFromCjs(objectivec_jsExports);
const objectivec_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: objectivec_js
}, [objectivec_jsExports]);
export {
  objectivec_js$1 as o
};
//# sourceMappingURL=objectivec.js-y_rDc08j.chunk.mjs.map
