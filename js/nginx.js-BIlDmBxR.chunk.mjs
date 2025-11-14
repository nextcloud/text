const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNginx } from "./nginx-3v3WiXfl.chunk.mjs";
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
var nginx_js$2;
var hasRequiredNginx_js;
function requireNginx_js() {
  if (hasRequiredNginx_js) return nginx_js$2;
  hasRequiredNginx_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/nginx" instead of "highlight.js/lib/languages/nginx.js"'
      );
    }
  }
  emitWarning();
  nginx_js$2 = /* @__PURE__ */ requireNginx();
  return nginx_js$2;
}
var nginx_jsExports = /* @__PURE__ */ requireNginx_js();
const nginx_js = /* @__PURE__ */ getDefaultExportFromCjs(nginx_jsExports);
const nginx_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nginx_js
}, [nginx_jsExports]);
export {
  nginx_js$1 as n
};
//# sourceMappingURL=nginx.js-BIlDmBxR.chunk.mjs.map
