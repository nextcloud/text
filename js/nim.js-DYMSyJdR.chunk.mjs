const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNim } from "./nim-Cu4o4i40.chunk.mjs";
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
var nim_js$2;
var hasRequiredNim_js;
function requireNim_js() {
  if (hasRequiredNim_js) return nim_js$2;
  hasRequiredNim_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/nim" instead of "highlight.js/lib/languages/nim.js"'
      );
    }
  }
  emitWarning();
  nim_js$2 = /* @__PURE__ */ requireNim();
  return nim_js$2;
}
var nim_jsExports = /* @__PURE__ */ requireNim_js();
const nim_js = /* @__PURE__ */ getDefaultExportFromCjs(nim_jsExports);
const nim_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nim_js
}, [nim_jsExports]);
export {
  nim_js$1 as n
};
//# sourceMappingURL=nim.js-DYMSyJdR.chunk.mjs.map
