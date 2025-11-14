const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePython } from "./python-CPQT6ZON.chunk.mjs";
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
var python_js$2;
var hasRequiredPython_js;
function requirePython_js() {
  if (hasRequiredPython_js) return python_js$2;
  hasRequiredPython_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/python" instead of "highlight.js/lib/languages/python.js"'
      );
    }
  }
  emitWarning();
  python_js$2 = /* @__PURE__ */ requirePython();
  return python_js$2;
}
var python_jsExports = /* @__PURE__ */ requirePython_js();
const python_js = /* @__PURE__ */ getDefaultExportFromCjs(python_jsExports);
const python_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: python_js
}, [python_jsExports]);
export {
  python_js$1 as p
};
//# sourceMappingURL=python.js-CqBX4eWj.chunk.mjs.map
