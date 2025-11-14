const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireInform7 } from "./inform7-QbhDRoE1.chunk.mjs";
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
var inform7_js$2;
var hasRequiredInform7_js;
function requireInform7_js() {
  if (hasRequiredInform7_js) return inform7_js$2;
  hasRequiredInform7_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/inform7" instead of "highlight.js/lib/languages/inform7.js"'
      );
    }
  }
  emitWarning();
  inform7_js$2 = /* @__PURE__ */ requireInform7();
  return inform7_js$2;
}
var inform7_jsExports = /* @__PURE__ */ requireInform7_js();
const inform7_js = /* @__PURE__ */ getDefaultExportFromCjs(inform7_jsExports);
const inform7_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: inform7_js
}, [inform7_jsExports]);
export {
  inform7_js$1 as i
};
//# sourceMappingURL=inform7.js-Cb7DXZDK.chunk.mjs.map
