const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCrystal } from "./crystal-Z1uEleZE.chunk.mjs";
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
var crystal_js$2;
var hasRequiredCrystal_js;
function requireCrystal_js() {
  if (hasRequiredCrystal_js) return crystal_js$2;
  hasRequiredCrystal_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/crystal" instead of "highlight.js/lib/languages/crystal.js"'
      );
    }
  }
  emitWarning();
  crystal_js$2 = /* @__PURE__ */ requireCrystal();
  return crystal_js$2;
}
var crystal_jsExports = /* @__PURE__ */ requireCrystal_js();
const crystal_js = /* @__PURE__ */ getDefaultExportFromCjs(crystal_jsExports);
const crystal_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: crystal_js
}, [crystal_jsExports]);
export {
  crystal_js$1 as c
};
//# sourceMappingURL=crystal.js-D2tsDty6.chunk.mjs.map
