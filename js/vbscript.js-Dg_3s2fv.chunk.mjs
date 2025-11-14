const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVbscript } from "./vbscript-DfQFvRTe.chunk.mjs";
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
var vbscript_js$2;
var hasRequiredVbscript_js;
function requireVbscript_js() {
  if (hasRequiredVbscript_js) return vbscript_js$2;
  hasRequiredVbscript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/vbscript" instead of "highlight.js/lib/languages/vbscript.js"'
      );
    }
  }
  emitWarning();
  vbscript_js$2 = /* @__PURE__ */ requireVbscript();
  return vbscript_js$2;
}
var vbscript_jsExports = /* @__PURE__ */ requireVbscript_js();
const vbscript_js = /* @__PURE__ */ getDefaultExportFromCjs(vbscript_jsExports);
const vbscript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vbscript_js
}, [vbscript_jsExports]);
export {
  vbscript_js$1 as v
};
//# sourceMappingURL=vbscript.js-Dg_3s2fv.chunk.mjs.map
