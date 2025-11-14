const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMoonscript } from "./moonscript-DB6LiCLe.chunk.mjs";
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
var moonscript_js$2;
var hasRequiredMoonscript_js;
function requireMoonscript_js() {
  if (hasRequiredMoonscript_js) return moonscript_js$2;
  hasRequiredMoonscript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/moonscript" instead of "highlight.js/lib/languages/moonscript.js"'
      );
    }
  }
  emitWarning();
  moonscript_js$2 = /* @__PURE__ */ requireMoonscript();
  return moonscript_js$2;
}
var moonscript_jsExports = /* @__PURE__ */ requireMoonscript_js();
const moonscript_js = /* @__PURE__ */ getDefaultExportFromCjs(moonscript_jsExports);
const moonscript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: moonscript_js
}, [moonscript_jsExports]);
export {
  moonscript_js$1 as m
};
//# sourceMappingURL=moonscript.js-Bd3dY8Tr.chunk.mjs.map
