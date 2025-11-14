const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireStan } from "./stan-Dlvt6R3q.chunk.mjs";
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
var stan_js$2;
var hasRequiredStan_js;
function requireStan_js() {
  if (hasRequiredStan_js) return stan_js$2;
  hasRequiredStan_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/stan" instead of "highlight.js/lib/languages/stan.js"'
      );
    }
  }
  emitWarning();
  stan_js$2 = /* @__PURE__ */ requireStan();
  return stan_js$2;
}
var stan_jsExports = /* @__PURE__ */ requireStan_js();
const stan_js = /* @__PURE__ */ getDefaultExportFromCjs(stan_jsExports);
const stan_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: stan_js
}, [stan_jsExports]);
export {
  stan_js$1 as s
};
//# sourceMappingURL=stan.js-ClqekAUc.chunk.mjs.map
