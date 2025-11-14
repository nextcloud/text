const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireOpenscad } from "./openscad-Bzx2BB_H.chunk.mjs";
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
var openscad_js$2;
var hasRequiredOpenscad_js;
function requireOpenscad_js() {
  if (hasRequiredOpenscad_js) return openscad_js$2;
  hasRequiredOpenscad_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/openscad" instead of "highlight.js/lib/languages/openscad.js"'
      );
    }
  }
  emitWarning();
  openscad_js$2 = /* @__PURE__ */ requireOpenscad();
  return openscad_js$2;
}
var openscad_jsExports = /* @__PURE__ */ requireOpenscad_js();
const openscad_js = /* @__PURE__ */ getDefaultExportFromCjs(openscad_jsExports);
const openscad_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: openscad_js
}, [openscad_jsExports]);
export {
  openscad_js$1 as o
};
//# sourceMappingURL=openscad.js--QoqJltS.chunk.mjs.map
