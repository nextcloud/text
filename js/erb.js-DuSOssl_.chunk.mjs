const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireErb } from "./erb-Cumj5Qco.chunk.mjs";
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
var erb_js$2;
var hasRequiredErb_js;
function requireErb_js() {
  if (hasRequiredErb_js) return erb_js$2;
  hasRequiredErb_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/erb" instead of "highlight.js/lib/languages/erb.js"'
      );
    }
  }
  emitWarning();
  erb_js$2 = /* @__PURE__ */ requireErb();
  return erb_js$2;
}
var erb_jsExports = /* @__PURE__ */ requireErb_js();
const erb_js = /* @__PURE__ */ getDefaultExportFromCjs(erb_jsExports);
const erb_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: erb_js
}, [erb_jsExports]);
export {
  erb_js$1 as e
};
//# sourceMappingURL=erb.js-DuSOssl_.chunk.mjs.map
