const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProlog } from "./prolog-CS9eyra4.chunk.mjs";
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
var prolog_js$2;
var hasRequiredProlog_js;
function requireProlog_js() {
  if (hasRequiredProlog_js) return prolog_js$2;
  hasRequiredProlog_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/prolog" instead of "highlight.js/lib/languages/prolog.js"'
      );
    }
  }
  emitWarning();
  prolog_js$2 = /* @__PURE__ */ requireProlog();
  return prolog_js$2;
}
var prolog_jsExports = /* @__PURE__ */ requireProlog_js();
const prolog_js = /* @__PURE__ */ getDefaultExportFromCjs(prolog_jsExports);
const prolog_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: prolog_js
}, [prolog_jsExports]);
export {
  prolog_js$1 as p
};
//# sourceMappingURL=prolog.js-DjhNg1f7.chunk.mjs.map
