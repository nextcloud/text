const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVbscriptHtml } from "./vbscript-html-CqWqGxSD.chunk.mjs";
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
var vbscriptHtml_js$2;
var hasRequiredVbscriptHtml_js;
function requireVbscriptHtml_js() {
  if (hasRequiredVbscriptHtml_js) return vbscriptHtml_js$2;
  hasRequiredVbscriptHtml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/vbscript-html" instead of "highlight.js/lib/languages/vbscript-html.js"'
      );
    }
  }
  emitWarning();
  vbscriptHtml_js$2 = /* @__PURE__ */ requireVbscriptHtml();
  return vbscriptHtml_js$2;
}
var vbscriptHtml_jsExports = /* @__PURE__ */ requireVbscriptHtml_js();
const vbscriptHtml_js = /* @__PURE__ */ getDefaultExportFromCjs(vbscriptHtml_jsExports);
const vbscriptHtml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vbscriptHtml_js
}, [vbscriptHtml_jsExports]);
export {
  vbscriptHtml_js$1 as v
};
//# sourceMappingURL=vbscript-html.js-B9DPTRzA.chunk.mjs.map
