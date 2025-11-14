const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireParser3 } from "./parser3-1kHdW3KP.chunk.mjs";
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
var parser3_js$2;
var hasRequiredParser3_js;
function requireParser3_js() {
  if (hasRequiredParser3_js) return parser3_js$2;
  hasRequiredParser3_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/parser3" instead of "highlight.js/lib/languages/parser3.js"'
      );
    }
  }
  emitWarning();
  parser3_js$2 = /* @__PURE__ */ requireParser3();
  return parser3_js$2;
}
var parser3_jsExports = /* @__PURE__ */ requireParser3_js();
const parser3_js = /* @__PURE__ */ getDefaultExportFromCjs(parser3_jsExports);
const parser3_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: parser3_js
}, [parser3_jsExports]);
export {
  parser3_js$1 as p
};
//# sourceMappingURL=parser3.js-XVAIUTUG.chunk.mjs.map
