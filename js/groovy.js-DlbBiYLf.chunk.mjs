const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGroovy } from "./groovy-DqCmFehv.chunk.mjs";
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
var groovy_js$2;
var hasRequiredGroovy_js;
function requireGroovy_js() {
  if (hasRequiredGroovy_js) return groovy_js$2;
  hasRequiredGroovy_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/groovy" instead of "highlight.js/lib/languages/groovy.js"'
      );
    }
  }
  emitWarning();
  groovy_js$2 = /* @__PURE__ */ requireGroovy();
  return groovy_js$2;
}
var groovy_jsExports = /* @__PURE__ */ requireGroovy_js();
const groovy_js = /* @__PURE__ */ getDefaultExportFromCjs(groovy_jsExports);
const groovy_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: groovy_js
}, [groovy_jsExports]);
export {
  groovy_js$1 as g
};
//# sourceMappingURL=groovy.js-DlbBiYLf.chunk.mjs.map
