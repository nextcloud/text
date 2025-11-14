const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireZephir } from "./zephir-g_tZcN7N.chunk.mjs";
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
var zephir_js$2;
var hasRequiredZephir_js;
function requireZephir_js() {
  if (hasRequiredZephir_js) return zephir_js$2;
  hasRequiredZephir_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/zephir" instead of "highlight.js/lib/languages/zephir.js"'
      );
    }
  }
  emitWarning();
  zephir_js$2 = /* @__PURE__ */ requireZephir();
  return zephir_js$2;
}
var zephir_jsExports = /* @__PURE__ */ requireZephir_js();
const zephir_js = /* @__PURE__ */ getDefaultExportFromCjs(zephir_jsExports);
const zephir_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: zephir_js
}, [zephir_jsExports]);
export {
  zephir_js$1 as z
};
//# sourceMappingURL=zephir.js-CSrANf0x.chunk.mjs.map
