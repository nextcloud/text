const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRuleslanguage } from "./ruleslanguage-Vuuy4OON.chunk.mjs";
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
var ruleslanguage_js$2;
var hasRequiredRuleslanguage_js;
function requireRuleslanguage_js() {
  if (hasRequiredRuleslanguage_js) return ruleslanguage_js$2;
  hasRequiredRuleslanguage_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ruleslanguage" instead of "highlight.js/lib/languages/ruleslanguage.js"'
      );
    }
  }
  emitWarning();
  ruleslanguage_js$2 = /* @__PURE__ */ requireRuleslanguage();
  return ruleslanguage_js$2;
}
var ruleslanguage_jsExports = /* @__PURE__ */ requireRuleslanguage_js();
const ruleslanguage_js = /* @__PURE__ */ getDefaultExportFromCjs(ruleslanguage_jsExports);
const ruleslanguage_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ruleslanguage_js
}, [ruleslanguage_jsExports]);
export {
  ruleslanguage_js$1 as r
};
//# sourceMappingURL=ruleslanguage.js-djbWJcy_.chunk.mjs.map
