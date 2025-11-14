const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireActionscript } from "./actionscript-CIRVFEAq.chunk.mjs";
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
var actionscript_js$2;
var hasRequiredActionscript_js;
function requireActionscript_js() {
  if (hasRequiredActionscript_js) return actionscript_js$2;
  hasRequiredActionscript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/actionscript" instead of "highlight.js/lib/languages/actionscript.js"'
      );
    }
  }
  emitWarning();
  actionscript_js$2 = /* @__PURE__ */ requireActionscript();
  return actionscript_js$2;
}
var actionscript_jsExports = /* @__PURE__ */ requireActionscript_js();
const actionscript_js = /* @__PURE__ */ getDefaultExportFromCjs(actionscript_jsExports);
const actionscript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: actionscript_js
}, [actionscript_jsExports]);
export {
  actionscript_js$1 as a
};
//# sourceMappingURL=actionscript.js-DkFGOkcJ.chunk.mjs.map
