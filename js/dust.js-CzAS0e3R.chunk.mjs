const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDust } from "./dust-U8F_UhNm.chunk.mjs";
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
var dust_js$2;
var hasRequiredDust_js;
function requireDust_js() {
  if (hasRequiredDust_js) return dust_js$2;
  hasRequiredDust_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dust" instead of "highlight.js/lib/languages/dust.js"'
      );
    }
  }
  emitWarning();
  dust_js$2 = /* @__PURE__ */ requireDust();
  return dust_js$2;
}
var dust_jsExports = /* @__PURE__ */ requireDust_js();
const dust_js = /* @__PURE__ */ getDefaultExportFromCjs(dust_jsExports);
const dust_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dust_js
}, [dust_jsExports]);
export {
  dust_js$1 as d
};
//# sourceMappingURL=dust.js-CzAS0e3R.chunk.mjs.map
