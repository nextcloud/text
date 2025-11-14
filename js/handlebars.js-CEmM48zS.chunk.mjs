const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHandlebars } from "./handlebars-z3N4VKDh.chunk.mjs";
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
var handlebars_js$2;
var hasRequiredHandlebars_js;
function requireHandlebars_js() {
  if (hasRequiredHandlebars_js) return handlebars_js$2;
  hasRequiredHandlebars_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/handlebars" instead of "highlight.js/lib/languages/handlebars.js"'
      );
    }
  }
  emitWarning();
  handlebars_js$2 = /* @__PURE__ */ requireHandlebars();
  return handlebars_js$2;
}
var handlebars_jsExports = /* @__PURE__ */ requireHandlebars_js();
const handlebars_js = /* @__PURE__ */ getDefaultExportFromCjs(handlebars_jsExports);
const handlebars_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: handlebars_js
}, [handlebars_jsExports]);
export {
  handlebars_js$1 as h
};
//# sourceMappingURL=handlebars.js-CEmM48zS.chunk.mjs.map
