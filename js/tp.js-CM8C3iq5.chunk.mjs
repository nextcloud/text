const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTp } from "./tp-C9SDNMBW.chunk.mjs";
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
var tp_js$2;
var hasRequiredTp_js;
function requireTp_js() {
  if (hasRequiredTp_js) return tp_js$2;
  hasRequiredTp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/tp" instead of "highlight.js/lib/languages/tp.js"'
      );
    }
  }
  emitWarning();
  tp_js$2 = /* @__PURE__ */ requireTp();
  return tp_js$2;
}
var tp_jsExports = /* @__PURE__ */ requireTp_js();
const tp_js = /* @__PURE__ */ getDefaultExportFromCjs(tp_jsExports);
const tp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: tp_js
}, [tp_jsExports]);
export {
  tp_js$1 as t
};
//# sourceMappingURL=tp.js-CM8C3iq5.chunk.mjs.map
