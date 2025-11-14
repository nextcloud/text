const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMel } from "./mel-DM5LalKl.chunk.mjs";
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
var mel_js$2;
var hasRequiredMel_js;
function requireMel_js() {
  if (hasRequiredMel_js) return mel_js$2;
  hasRequiredMel_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mel" instead of "highlight.js/lib/languages/mel.js"'
      );
    }
  }
  emitWarning();
  mel_js$2 = /* @__PURE__ */ requireMel();
  return mel_js$2;
}
var mel_jsExports = /* @__PURE__ */ requireMel_js();
const mel_js = /* @__PURE__ */ getDefaultExportFromCjs(mel_jsExports);
const mel_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mel_js
}, [mel_jsExports]);
export {
  mel_js$1 as m
};
//# sourceMappingURL=mel.js-BkMueHm0.chunk.mjs.map
