const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePhp } from "./php-CqKTlr5X.chunk.mjs";
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
var php_js$2;
var hasRequiredPhp_js;
function requirePhp_js() {
  if (hasRequiredPhp_js) return php_js$2;
  hasRequiredPhp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/php" instead of "highlight.js/lib/languages/php.js"'
      );
    }
  }
  emitWarning();
  php_js$2 = /* @__PURE__ */ requirePhp();
  return php_js$2;
}
var php_jsExports = /* @__PURE__ */ requirePhp_js();
const php_js = /* @__PURE__ */ getDefaultExportFromCjs(php_jsExports);
const php_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: php_js
}, [php_jsExports]);
export {
  php_js$1 as p
};
//# sourceMappingURL=php.js-B53fj5s7.chunk.mjs.map
