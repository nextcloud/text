const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRib } from "./rib-gsUwHiEH.chunk.mjs";
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
var rib_js$2;
var hasRequiredRib_js;
function requireRib_js() {
  if (hasRequiredRib_js) return rib_js$2;
  hasRequiredRib_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/rib" instead of "highlight.js/lib/languages/rib.js"'
      );
    }
  }
  emitWarning();
  rib_js$2 = /* @__PURE__ */ requireRib();
  return rib_js$2;
}
var rib_jsExports = /* @__PURE__ */ requireRib_js();
const rib_js = /* @__PURE__ */ getDefaultExportFromCjs(rib_jsExports);
const rib_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: rib_js
}, [rib_jsExports]);
export {
  rib_js$1 as r
};
//# sourceMappingURL=rib.js-HfZl52C4.chunk.mjs.map
