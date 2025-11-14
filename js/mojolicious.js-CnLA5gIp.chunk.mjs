const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMojolicious } from "./mojolicious-OQxmuP0F.chunk.mjs";
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
var mojolicious_js$2;
var hasRequiredMojolicious_js;
function requireMojolicious_js() {
  if (hasRequiredMojolicious_js) return mojolicious_js$2;
  hasRequiredMojolicious_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mojolicious" instead of "highlight.js/lib/languages/mojolicious.js"'
      );
    }
  }
  emitWarning();
  mojolicious_js$2 = /* @__PURE__ */ requireMojolicious();
  return mojolicious_js$2;
}
var mojolicious_jsExports = /* @__PURE__ */ requireMojolicious_js();
const mojolicious_js = /* @__PURE__ */ getDefaultExportFromCjs(mojolicious_jsExports);
const mojolicious_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mojolicious_js
}, [mojolicious_jsExports]);
export {
  mojolicious_js$1 as m
};
//# sourceMappingURL=mojolicious.js-CnLA5gIp.chunk.mjs.map
