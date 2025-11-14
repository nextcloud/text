const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTaggerscript } from "./taggerscript-0kD5nZkp.chunk.mjs";
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
var taggerscript_js$2;
var hasRequiredTaggerscript_js;
function requireTaggerscript_js() {
  if (hasRequiredTaggerscript_js) return taggerscript_js$2;
  hasRequiredTaggerscript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/taggerscript" instead of "highlight.js/lib/languages/taggerscript.js"'
      );
    }
  }
  emitWarning();
  taggerscript_js$2 = /* @__PURE__ */ requireTaggerscript();
  return taggerscript_js$2;
}
var taggerscript_jsExports = /* @__PURE__ */ requireTaggerscript_js();
const taggerscript_js = /* @__PURE__ */ getDefaultExportFromCjs(taggerscript_jsExports);
const taggerscript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: taggerscript_js
}, [taggerscript_jsExports]);
export {
  taggerscript_js$1 as t
};
//# sourceMappingURL=taggerscript.js-Y25WkGL4.chunk.mjs.map
