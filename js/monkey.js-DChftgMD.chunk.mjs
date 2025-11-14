const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMonkey } from "./monkey-CuVDLUXJ.chunk.mjs";
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
var monkey_js$2;
var hasRequiredMonkey_js;
function requireMonkey_js() {
  if (hasRequiredMonkey_js) return monkey_js$2;
  hasRequiredMonkey_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/monkey" instead of "highlight.js/lib/languages/monkey.js"'
      );
    }
  }
  emitWarning();
  monkey_js$2 = /* @__PURE__ */ requireMonkey();
  return monkey_js$2;
}
var monkey_jsExports = /* @__PURE__ */ requireMonkey_js();
const monkey_js = /* @__PURE__ */ getDefaultExportFromCjs(monkey_jsExports);
const monkey_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: monkey_js
}, [monkey_jsExports]);
export {
  monkey_js$1 as m
};
//# sourceMappingURL=monkey.js-DChftgMD.chunk.mjs.map
