const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePlaintext } from "./plaintext-qlQOliQC.chunk.mjs";
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
var plaintext_js$2;
var hasRequiredPlaintext_js;
function requirePlaintext_js() {
  if (hasRequiredPlaintext_js) return plaintext_js$2;
  hasRequiredPlaintext_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/plaintext" instead of "highlight.js/lib/languages/plaintext.js"'
      );
    }
  }
  emitWarning();
  plaintext_js$2 = /* @__PURE__ */ requirePlaintext();
  return plaintext_js$2;
}
var plaintext_jsExports = /* @__PURE__ */ requirePlaintext_js();
const plaintext_js = /* @__PURE__ */ getDefaultExportFromCjs(plaintext_jsExports);
const plaintext_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: plaintext_js
}, [plaintext_jsExports]);
export {
  plaintext_js$1 as p
};
//# sourceMappingURL=plaintext.js-BEYcSG4J.chunk.mjs.map
