const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAccesslog } from "./accesslog-BluOVl7G.chunk.mjs";
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
var accesslog_js$2;
var hasRequiredAccesslog_js;
function requireAccesslog_js() {
  if (hasRequiredAccesslog_js) return accesslog_js$2;
  hasRequiredAccesslog_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/accesslog" instead of "highlight.js/lib/languages/accesslog.js"'
      );
    }
  }
  emitWarning();
  accesslog_js$2 = /* @__PURE__ */ requireAccesslog();
  return accesslog_js$2;
}
var accesslog_jsExports = /* @__PURE__ */ requireAccesslog_js();
const accesslog_js = /* @__PURE__ */ getDefaultExportFromCjs(accesslog_jsExports);
const accesslog_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: accesslog_js
}, [accesslog_jsExports]);
export {
  accesslog_js$1 as a
};
//# sourceMappingURL=accesslog.js-CafHt3oE.chunk.mjs.map
