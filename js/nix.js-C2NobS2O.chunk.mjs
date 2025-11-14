const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNix } from "./nix-0aycnDVb.chunk.mjs";
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
var nix_js$2;
var hasRequiredNix_js;
function requireNix_js() {
  if (hasRequiredNix_js) return nix_js$2;
  hasRequiredNix_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/nix" instead of "highlight.js/lib/languages/nix.js"'
      );
    }
  }
  emitWarning();
  nix_js$2 = /* @__PURE__ */ requireNix();
  return nix_js$2;
}
var nix_jsExports = /* @__PURE__ */ requireNix_js();
const nix_js = /* @__PURE__ */ getDefaultExportFromCjs(nix_jsExports);
const nix_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nix_js
}, [nix_jsExports]);
export {
  nix_js$1 as n
};
//# sourceMappingURL=nix.js-C2NobS2O.chunk.mjs.map
