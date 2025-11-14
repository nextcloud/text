const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGlsl } from "./glsl-DGE4V0hN.chunk.mjs";
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
var glsl_js$2;
var hasRequiredGlsl_js;
function requireGlsl_js() {
  if (hasRequiredGlsl_js) return glsl_js$2;
  hasRequiredGlsl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/glsl" instead of "highlight.js/lib/languages/glsl.js"'
      );
    }
  }
  emitWarning();
  glsl_js$2 = /* @__PURE__ */ requireGlsl();
  return glsl_js$2;
}
var glsl_jsExports = /* @__PURE__ */ requireGlsl_js();
const glsl_js = /* @__PURE__ */ getDefaultExportFromCjs(glsl_jsExports);
const glsl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: glsl_js
}, [glsl_jsExports]);
export {
  glsl_js$1 as g
};
//# sourceMappingURL=glsl.js-CSBbDPlw.chunk.mjs.map
