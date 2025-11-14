const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLisp } from "./lisp-ITA4Kodj.chunk.mjs";
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
var lisp_js$2;
var hasRequiredLisp_js;
function requireLisp_js() {
  if (hasRequiredLisp_js) return lisp_js$2;
  hasRequiredLisp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/lisp" instead of "highlight.js/lib/languages/lisp.js"'
      );
    }
  }
  emitWarning();
  lisp_js$2 = /* @__PURE__ */ requireLisp();
  return lisp_js$2;
}
var lisp_jsExports = /* @__PURE__ */ requireLisp_js();
const lisp_js = /* @__PURE__ */ getDefaultExportFromCjs(lisp_jsExports);
const lisp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: lisp_js
}, [lisp_jsExports]);
export {
  lisp_js$1 as l
};
//# sourceMappingURL=lisp.js-CgqbT_9M.chunk.mjs.map
