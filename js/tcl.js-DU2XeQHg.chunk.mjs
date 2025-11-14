const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTcl } from "./tcl-nELKe7D9.chunk.mjs";
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
var tcl_js$2;
var hasRequiredTcl_js;
function requireTcl_js() {
  if (hasRequiredTcl_js) return tcl_js$2;
  hasRequiredTcl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/tcl" instead of "highlight.js/lib/languages/tcl.js"'
      );
    }
  }
  emitWarning();
  tcl_js$2 = /* @__PURE__ */ requireTcl();
  return tcl_js$2;
}
var tcl_jsExports = /* @__PURE__ */ requireTcl_js();
const tcl_js = /* @__PURE__ */ getDefaultExportFromCjs(tcl_jsExports);
const tcl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: tcl_js
}, [tcl_jsExports]);
export {
  tcl_js$1 as t
};
//# sourceMappingURL=tcl.js-DU2XeQHg.chunk.mjs.map
