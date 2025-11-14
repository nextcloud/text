const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHy } from "./hy-DFCRqzzV.chunk.mjs";
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
var hy_js$2;
var hasRequiredHy_js;
function requireHy_js() {
  if (hasRequiredHy_js) return hy_js$2;
  hasRequiredHy_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/hy" instead of "highlight.js/lib/languages/hy.js"'
      );
    }
  }
  emitWarning();
  hy_js$2 = /* @__PURE__ */ requireHy();
  return hy_js$2;
}
var hy_jsExports = /* @__PURE__ */ requireHy_js();
const hy_js = /* @__PURE__ */ getDefaultExportFromCjs(hy_jsExports);
const hy_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: hy_js
}, [hy_jsExports]);
export {
  hy_js$1 as h
};
//# sourceMappingURL=hy.js-Blj4pzNq.chunk.mjs.map
