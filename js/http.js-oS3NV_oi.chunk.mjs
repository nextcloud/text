const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHttp } from "./http-YBT-MO5s.chunk.mjs";
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
var http_js$2;
var hasRequiredHttp_js;
function requireHttp_js() {
  if (hasRequiredHttp_js) return http_js$2;
  hasRequiredHttp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/http" instead of "highlight.js/lib/languages/http.js"'
      );
    }
  }
  emitWarning();
  http_js$2 = /* @__PURE__ */ requireHttp();
  return http_js$2;
}
var http_jsExports = /* @__PURE__ */ requireHttp_js();
const http_js = /* @__PURE__ */ getDefaultExportFromCjs(http_jsExports);
const http_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: http_js
}, [http_jsExports]);
export {
  http_js$1 as h
};
//# sourceMappingURL=http.js-oS3NV_oi.chunk.mjs.map
