const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGherkin } from "./gherkin-DOCPFiK2.chunk.mjs";
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
var gherkin_js$2;
var hasRequiredGherkin_js;
function requireGherkin_js() {
  if (hasRequiredGherkin_js) return gherkin_js$2;
  hasRequiredGherkin_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/gherkin" instead of "highlight.js/lib/languages/gherkin.js"'
      );
    }
  }
  emitWarning();
  gherkin_js$2 = /* @__PURE__ */ requireGherkin();
  return gherkin_js$2;
}
var gherkin_jsExports = /* @__PURE__ */ requireGherkin_js();
const gherkin_js = /* @__PURE__ */ getDefaultExportFromCjs(gherkin_jsExports);
const gherkin_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: gherkin_js
}, [gherkin_jsExports]);
export {
  gherkin_js$1 as g
};
//# sourceMappingURL=gherkin.js-Dg5CLkUu.chunk.mjs.map
