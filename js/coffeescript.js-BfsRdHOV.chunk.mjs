const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCoffeescript } from "./coffeescript-DZ_uqzfL.chunk.mjs";
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
var coffeescript_js$2;
var hasRequiredCoffeescript_js;
function requireCoffeescript_js() {
  if (hasRequiredCoffeescript_js) return coffeescript_js$2;
  hasRequiredCoffeescript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/coffeescript" instead of "highlight.js/lib/languages/coffeescript.js"'
      );
    }
  }
  emitWarning();
  coffeescript_js$2 = /* @__PURE__ */ requireCoffeescript();
  return coffeescript_js$2;
}
var coffeescript_jsExports = /* @__PURE__ */ requireCoffeescript_js();
const coffeescript_js = /* @__PURE__ */ getDefaultExportFromCjs(coffeescript_jsExports);
const coffeescript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: coffeescript_js
}, [coffeescript_jsExports]);
export {
  coffeescript_js$1 as c
};
//# sourceMappingURL=coffeescript.js-BfsRdHOV.chunk.mjs.map
