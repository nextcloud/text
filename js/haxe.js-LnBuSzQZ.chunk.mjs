const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHaxe } from "./haxe-BvCI_y_n.chunk.mjs";
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
var haxe_js$2;
var hasRequiredHaxe_js;
function requireHaxe_js() {
  if (hasRequiredHaxe_js) return haxe_js$2;
  hasRequiredHaxe_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/haxe" instead of "highlight.js/lib/languages/haxe.js"'
      );
    }
  }
  emitWarning();
  haxe_js$2 = /* @__PURE__ */ requireHaxe();
  return haxe_js$2;
}
var haxe_jsExports = /* @__PURE__ */ requireHaxe_js();
const haxe_js = /* @__PURE__ */ getDefaultExportFromCjs(haxe_jsExports);
const haxe_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: haxe_js
}, [haxe_jsExports]);
export {
  haxe_js$1 as h
};
//# sourceMappingURL=haxe.js-LnBuSzQZ.chunk.mjs.map
