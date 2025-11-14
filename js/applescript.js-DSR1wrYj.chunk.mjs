const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireApplescript } from "./applescript-CRALSYp3.chunk.mjs";
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
var applescript_js$2;
var hasRequiredApplescript_js;
function requireApplescript_js() {
  if (hasRequiredApplescript_js) return applescript_js$2;
  hasRequiredApplescript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/applescript" instead of "highlight.js/lib/languages/applescript.js"'
      );
    }
  }
  emitWarning();
  applescript_js$2 = /* @__PURE__ */ requireApplescript();
  return applescript_js$2;
}
var applescript_jsExports = /* @__PURE__ */ requireApplescript_js();
const applescript_js = /* @__PURE__ */ getDefaultExportFromCjs(applescript_jsExports);
const applescript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: applescript_js
}, [applescript_jsExports]);
export {
  applescript_js$1 as a
};
//# sourceMappingURL=applescript.js-DSR1wrYj.chunk.mjs.map
