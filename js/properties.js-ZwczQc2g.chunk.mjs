const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProperties } from "./properties-CGDjTIkw.chunk.mjs";
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
var properties_js$2;
var hasRequiredProperties_js;
function requireProperties_js() {
  if (hasRequiredProperties_js) return properties_js$2;
  hasRequiredProperties_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/properties" instead of "highlight.js/lib/languages/properties.js"'
      );
    }
  }
  emitWarning();
  properties_js$2 = /* @__PURE__ */ requireProperties();
  return properties_js$2;
}
var properties_jsExports = /* @__PURE__ */ requireProperties_js();
const properties_js = /* @__PURE__ */ getDefaultExportFromCjs(properties_jsExports);
const properties_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: properties_js
}, [properties_jsExports]);
export {
  properties_js$1 as p
};
//# sourceMappingURL=properties.js-ZwczQc2g.chunk.mjs.map
