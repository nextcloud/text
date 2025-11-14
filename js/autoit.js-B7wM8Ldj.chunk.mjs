const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAutoit } from "./autoit-MC4NR6v-.chunk.mjs";
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
var autoit_js$2;
var hasRequiredAutoit_js;
function requireAutoit_js() {
  if (hasRequiredAutoit_js) return autoit_js$2;
  hasRequiredAutoit_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/autoit" instead of "highlight.js/lib/languages/autoit.js"'
      );
    }
  }
  emitWarning();
  autoit_js$2 = /* @__PURE__ */ requireAutoit();
  return autoit_js$2;
}
var autoit_jsExports = /* @__PURE__ */ requireAutoit_js();
const autoit_js = /* @__PURE__ */ getDefaultExportFromCjs(autoit_jsExports);
const autoit_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: autoit_js
}, [autoit_jsExports]);
export {
  autoit_js$1 as a
};
//# sourceMappingURL=autoit.js-B7wM8Ldj.chunk.mjs.map
