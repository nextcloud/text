const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDelphi } from "./delphi-DVHr1Xmw.chunk.mjs";
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
var delphi_js$2;
var hasRequiredDelphi_js;
function requireDelphi_js() {
  if (hasRequiredDelphi_js) return delphi_js$2;
  hasRequiredDelphi_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/delphi" instead of "highlight.js/lib/languages/delphi.js"'
      );
    }
  }
  emitWarning();
  delphi_js$2 = /* @__PURE__ */ requireDelphi();
  return delphi_js$2;
}
var delphi_jsExports = /* @__PURE__ */ requireDelphi_js();
const delphi_js = /* @__PURE__ */ getDefaultExportFromCjs(delphi_jsExports);
const delphi_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: delphi_js
}, [delphi_jsExports]);
export {
  delphi_js$1 as d
};
//# sourceMappingURL=delphi.js-DjuooQkC.chunk.mjs.map
