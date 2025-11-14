const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRust } from "./rust-C2UIWzku.chunk.mjs";
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
var rust_js$2;
var hasRequiredRust_js;
function requireRust_js() {
  if (hasRequiredRust_js) return rust_js$2;
  hasRequiredRust_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/rust" instead of "highlight.js/lib/languages/rust.js"'
      );
    }
  }
  emitWarning();
  rust_js$2 = /* @__PURE__ */ requireRust();
  return rust_js$2;
}
var rust_jsExports = /* @__PURE__ */ requireRust_js();
const rust_js = /* @__PURE__ */ getDefaultExportFromCjs(rust_jsExports);
const rust_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: rust_js
}, [rust_jsExports]);
export {
  rust_js$1 as r
};
//# sourceMappingURL=rust.js-CTVhFYT0.chunk.mjs.map
