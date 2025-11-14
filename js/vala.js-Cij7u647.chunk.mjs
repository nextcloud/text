const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVala } from "./vala-5NbMmp1e.chunk.mjs";
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
var vala_js$2;
var hasRequiredVala_js;
function requireVala_js() {
  if (hasRequiredVala_js) return vala_js$2;
  hasRequiredVala_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/vala" instead of "highlight.js/lib/languages/vala.js"'
      );
    }
  }
  emitWarning();
  vala_js$2 = /* @__PURE__ */ requireVala();
  return vala_js$2;
}
var vala_jsExports = /* @__PURE__ */ requireVala_js();
const vala_js = /* @__PURE__ */ getDefaultExportFromCjs(vala_jsExports);
const vala_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vala_js
}, [vala_jsExports]);
export {
  vala_js$1 as v
};
//# sourceMappingURL=vala.js-Cij7u647.chunk.mjs.map
