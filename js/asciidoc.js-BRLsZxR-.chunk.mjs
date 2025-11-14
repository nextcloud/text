const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAsciidoc } from "./asciidoc-qu8k_PSZ.chunk.mjs";
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
var asciidoc_js$2;
var hasRequiredAsciidoc_js;
function requireAsciidoc_js() {
  if (hasRequiredAsciidoc_js) return asciidoc_js$2;
  hasRequiredAsciidoc_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/asciidoc" instead of "highlight.js/lib/languages/asciidoc.js"'
      );
    }
  }
  emitWarning();
  asciidoc_js$2 = /* @__PURE__ */ requireAsciidoc();
  return asciidoc_js$2;
}
var asciidoc_jsExports = /* @__PURE__ */ requireAsciidoc_js();
const asciidoc_js = /* @__PURE__ */ getDefaultExportFromCjs(asciidoc_jsExports);
const asciidoc_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: asciidoc_js
}, [asciidoc_jsExports]);
export {
  asciidoc_js$1 as a
};
//# sourceMappingURL=asciidoc.js-BRLsZxR-.chunk.mjs.map
