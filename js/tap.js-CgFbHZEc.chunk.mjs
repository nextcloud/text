const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTap } from "./tap-zOLGUHb6.chunk.mjs";
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
var tap_js$2;
var hasRequiredTap_js;
function requireTap_js() {
  if (hasRequiredTap_js) return tap_js$2;
  hasRequiredTap_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/tap" instead of "highlight.js/lib/languages/tap.js"'
      );
    }
  }
  emitWarning();
  tap_js$2 = /* @__PURE__ */ requireTap();
  return tap_js$2;
}
var tap_jsExports = /* @__PURE__ */ requireTap_js();
const tap_js = /* @__PURE__ */ getDefaultExportFromCjs(tap_jsExports);
const tap_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: tap_js
}, [tap_jsExports]);
export {
  tap_js$1 as t
};
//# sourceMappingURL=tap.js-CgFbHZEc.chunk.mjs.map
