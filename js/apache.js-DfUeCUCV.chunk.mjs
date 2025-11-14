const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireApache } from "./apache-Dzk_MOZM.chunk.mjs";
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
var apache_js$2;
var hasRequiredApache_js;
function requireApache_js() {
  if (hasRequiredApache_js) return apache_js$2;
  hasRequiredApache_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/apache" instead of "highlight.js/lib/languages/apache.js"'
      );
    }
  }
  emitWarning();
  apache_js$2 = /* @__PURE__ */ requireApache();
  return apache_js$2;
}
var apache_jsExports = /* @__PURE__ */ requireApache_js();
const apache_js = /* @__PURE__ */ getDefaultExportFromCjs(apache_jsExports);
const apache_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: apache_js
}, [apache_jsExports]);
export {
  apache_js$1 as a
};
//# sourceMappingURL=apache.js-DfUeCUCV.chunk.mjs.map
