const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireIrpf90 } from "./irpf90-C2JXi1jb.chunk.mjs";
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
var irpf90_js$2;
var hasRequiredIrpf90_js;
function requireIrpf90_js() {
  if (hasRequiredIrpf90_js) return irpf90_js$2;
  hasRequiredIrpf90_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/irpf90" instead of "highlight.js/lib/languages/irpf90.js"'
      );
    }
  }
  emitWarning();
  irpf90_js$2 = /* @__PURE__ */ requireIrpf90();
  return irpf90_js$2;
}
var irpf90_jsExports = /* @__PURE__ */ requireIrpf90_js();
const irpf90_js = /* @__PURE__ */ getDefaultExportFromCjs(irpf90_jsExports);
const irpf90_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: irpf90_js
}, [irpf90_jsExports]);
export {
  irpf90_js$1 as i
};
//# sourceMappingURL=irpf90.js-6-DOKTjG.chunk.mjs.map
