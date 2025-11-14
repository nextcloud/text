const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVbnet } from "./vbnet-CozEGhzV.chunk.mjs";
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
var vbnet_js$2;
var hasRequiredVbnet_js;
function requireVbnet_js() {
  if (hasRequiredVbnet_js) return vbnet_js$2;
  hasRequiredVbnet_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/vbnet" instead of "highlight.js/lib/languages/vbnet.js"'
      );
    }
  }
  emitWarning();
  vbnet_js$2 = /* @__PURE__ */ requireVbnet();
  return vbnet_js$2;
}
var vbnet_jsExports = /* @__PURE__ */ requireVbnet_js();
const vbnet_js = /* @__PURE__ */ getDefaultExportFromCjs(vbnet_jsExports);
const vbnet_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vbnet_js
}, [vbnet_jsExports]);
export {
  vbnet_js$1 as v
};
//# sourceMappingURL=vbnet.js-DT_GFd7X.chunk.mjs.map
