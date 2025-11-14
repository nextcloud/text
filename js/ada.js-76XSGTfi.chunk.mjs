const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAda } from "./ada-BH4mvMHR.chunk.mjs";
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
var ada_js$2;
var hasRequiredAda_js;
function requireAda_js() {
  if (hasRequiredAda_js) return ada_js$2;
  hasRequiredAda_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ada" instead of "highlight.js/lib/languages/ada.js"'
      );
    }
  }
  emitWarning();
  ada_js$2 = /* @__PURE__ */ requireAda();
  return ada_js$2;
}
var ada_jsExports = /* @__PURE__ */ requireAda_js();
const ada_js = /* @__PURE__ */ getDefaultExportFromCjs(ada_jsExports);
const ada_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ada_js
}, [ada_jsExports]);
export {
  ada_js$1 as a
};
//# sourceMappingURL=ada.js-76XSGTfi.chunk.mjs.map
