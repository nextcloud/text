const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLivecodeserver } from "./livecodeserver-B510Qu-4.chunk.mjs";
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
var livecodeserver_js$2;
var hasRequiredLivecodeserver_js;
function requireLivecodeserver_js() {
  if (hasRequiredLivecodeserver_js) return livecodeserver_js$2;
  hasRequiredLivecodeserver_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/livecodeserver" instead of "highlight.js/lib/languages/livecodeserver.js"'
      );
    }
  }
  emitWarning();
  livecodeserver_js$2 = /* @__PURE__ */ requireLivecodeserver();
  return livecodeserver_js$2;
}
var livecodeserver_jsExports = /* @__PURE__ */ requireLivecodeserver_js();
const livecodeserver_js = /* @__PURE__ */ getDefaultExportFromCjs(livecodeserver_jsExports);
const livecodeserver_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: livecodeserver_js
}, [livecodeserver_jsExports]);
export {
  livecodeserver_js$1 as l
};
//# sourceMappingURL=livecodeserver.js-B44grXlH.chunk.mjs.map
