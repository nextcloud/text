const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireStata } from "./stata-Cl2gmp4P.chunk.mjs";
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
var stata_js$2;
var hasRequiredStata_js;
function requireStata_js() {
  if (hasRequiredStata_js) return stata_js$2;
  hasRequiredStata_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/stata" instead of "highlight.js/lib/languages/stata.js"'
      );
    }
  }
  emitWarning();
  stata_js$2 = /* @__PURE__ */ requireStata();
  return stata_js$2;
}
var stata_jsExports = /* @__PURE__ */ requireStata_js();
const stata_js = /* @__PURE__ */ getDefaultExportFromCjs(stata_jsExports);
const stata_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: stata_js
}, [stata_jsExports]);
export {
  stata_js$1 as s
};
//# sourceMappingURL=stata.js-HBI8boKS.chunk.mjs.map
