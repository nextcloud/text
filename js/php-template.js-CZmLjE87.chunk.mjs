const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePhpTemplate } from "./php-template-DVL4FeMY.chunk.mjs";
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
var phpTemplate_js$2;
var hasRequiredPhpTemplate_js;
function requirePhpTemplate_js() {
  if (hasRequiredPhpTemplate_js) return phpTemplate_js$2;
  hasRequiredPhpTemplate_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/php-template" instead of "highlight.js/lib/languages/php-template.js"'
      );
    }
  }
  emitWarning();
  phpTemplate_js$2 = /* @__PURE__ */ requirePhpTemplate();
  return phpTemplate_js$2;
}
var phpTemplate_jsExports = /* @__PURE__ */ requirePhpTemplate_js();
const phpTemplate_js = /* @__PURE__ */ getDefaultExportFromCjs(phpTemplate_jsExports);
const phpTemplate_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: phpTemplate_js
}, [phpTemplate_jsExports]);
export {
  phpTemplate_js$1 as p
};
//# sourceMappingURL=php-template.js-CZmLjE87.chunk.mjs.map
