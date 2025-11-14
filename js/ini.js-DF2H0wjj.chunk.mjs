const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireIni } from "./ini-yXwFLHQM.chunk.mjs";
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
var ini_js$2;
var hasRequiredIni_js;
function requireIni_js() {
  if (hasRequiredIni_js) return ini_js$2;
  hasRequiredIni_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ini" instead of "highlight.js/lib/languages/ini.js"'
      );
    }
  }
  emitWarning();
  ini_js$2 = /* @__PURE__ */ requireIni();
  return ini_js$2;
}
var ini_jsExports = /* @__PURE__ */ requireIni_js();
const ini_js = /* @__PURE__ */ getDefaultExportFromCjs(ini_jsExports);
const ini_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ini_js
}, [ini_jsExports]);
export {
  ini_js$1 as i
};
//# sourceMappingURL=ini.js-DF2H0wjj.chunk.mjs.map
