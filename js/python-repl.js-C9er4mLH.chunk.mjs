const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePythonRepl } from "./python-repl-CMGijgqV.chunk.mjs";
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
var pythonRepl_js$2;
var hasRequiredPythonRepl_js;
function requirePythonRepl_js() {
  if (hasRequiredPythonRepl_js) return pythonRepl_js$2;
  hasRequiredPythonRepl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/python-repl" instead of "highlight.js/lib/languages/python-repl.js"'
      );
    }
  }
  emitWarning();
  pythonRepl_js$2 = /* @__PURE__ */ requirePythonRepl();
  return pythonRepl_js$2;
}
var pythonRepl_jsExports = /* @__PURE__ */ requirePythonRepl_js();
const pythonRepl_js = /* @__PURE__ */ getDefaultExportFromCjs(pythonRepl_jsExports);
const pythonRepl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: pythonRepl_js
}, [pythonRepl_jsExports]);
export {
  pythonRepl_js$1 as p
};
//# sourceMappingURL=python-repl.js-C9er4mLH.chunk.mjs.map
