const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireBash } from "./bash-D2JB66IO.chunk.mjs";
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
var bash_js$2;
var hasRequiredBash_js;
function requireBash_js() {
  if (hasRequiredBash_js) return bash_js$2;
  hasRequiredBash_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/bash" instead of "highlight.js/lib/languages/bash.js"'
      );
    }
  }
  emitWarning();
  bash_js$2 = /* @__PURE__ */ requireBash();
  return bash_js$2;
}
var bash_jsExports = /* @__PURE__ */ requireBash_js();
const bash_js = /* @__PURE__ */ getDefaultExportFromCjs(bash_jsExports);
const bash_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: bash_js
}, [bash_jsExports]);
export {
  bash_js$1 as b
};
//# sourceMappingURL=bash.js-JNVWU2ns.chunk.mjs.map
