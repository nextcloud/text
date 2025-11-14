const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDos } from "./dos-CE3a0L6B.chunk.mjs";
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
var dos_js$2;
var hasRequiredDos_js;
function requireDos_js() {
  if (hasRequiredDos_js) return dos_js$2;
  hasRequiredDos_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dos" instead of "highlight.js/lib/languages/dos.js"'
      );
    }
  }
  emitWarning();
  dos_js$2 = /* @__PURE__ */ requireDos();
  return dos_js$2;
}
var dos_jsExports = /* @__PURE__ */ requireDos_js();
const dos_js = /* @__PURE__ */ getDefaultExportFromCjs(dos_jsExports);
const dos_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dos_js
}, [dos_jsExports]);
export {
  dos_js$1 as d
};
//# sourceMappingURL=dos.js-DRgDVMpZ.chunk.mjs.map
