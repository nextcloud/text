const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireFix } from "./fix-tVUvR-2O.chunk.mjs";
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
var fix_js$2;
var hasRequiredFix_js;
function requireFix_js() {
  if (hasRequiredFix_js) return fix_js$2;
  hasRequiredFix_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/fix" instead of "highlight.js/lib/languages/fix.js"'
      );
    }
  }
  emitWarning();
  fix_js$2 = /* @__PURE__ */ requireFix();
  return fix_js$2;
}
var fix_jsExports = /* @__PURE__ */ requireFix_js();
const fix_js = /* @__PURE__ */ getDefaultExportFromCjs(fix_jsExports);
const fix_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: fix_js
}, [fix_jsExports]);
export {
  fix_js$1 as f
};
//# sourceMappingURL=fix.js-Tyf7K4dV.chunk.mjs.map
