const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGolo } from "./golo-1T1o-IEZ.chunk.mjs";
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
var golo_js$2;
var hasRequiredGolo_js;
function requireGolo_js() {
  if (hasRequiredGolo_js) return golo_js$2;
  hasRequiredGolo_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/golo" instead of "highlight.js/lib/languages/golo.js"'
      );
    }
  }
  emitWarning();
  golo_js$2 = /* @__PURE__ */ requireGolo();
  return golo_js$2;
}
var golo_jsExports = /* @__PURE__ */ requireGolo_js();
const golo_js = /* @__PURE__ */ getDefaultExportFromCjs(golo_jsExports);
const golo_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: golo_js
}, [golo_jsExports]);
export {
  golo_js$1 as g
};
//# sourceMappingURL=golo.js-B0tiB2EY.chunk.mjs.map
