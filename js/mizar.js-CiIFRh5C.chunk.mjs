const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMizar } from "./mizar-BR6pmBtu.chunk.mjs";
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
var mizar_js$2;
var hasRequiredMizar_js;
function requireMizar_js() {
  if (hasRequiredMizar_js) return mizar_js$2;
  hasRequiredMizar_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mizar" instead of "highlight.js/lib/languages/mizar.js"'
      );
    }
  }
  emitWarning();
  mizar_js$2 = /* @__PURE__ */ requireMizar();
  return mizar_js$2;
}
var mizar_jsExports = /* @__PURE__ */ requireMizar_js();
const mizar_js = /* @__PURE__ */ getDefaultExportFromCjs(mizar_jsExports);
const mizar_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mizar_js
}, [mizar_jsExports]);
export {
  mizar_js$1 as m
};
//# sourceMappingURL=mizar.js-CiIFRh5C.chunk.mjs.map
