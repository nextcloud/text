const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireShell } from "./shell-D7mfumoH.chunk.mjs";
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
var shell_js$2;
var hasRequiredShell_js;
function requireShell_js() {
  if (hasRequiredShell_js) return shell_js$2;
  hasRequiredShell_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/shell" instead of "highlight.js/lib/languages/shell.js"'
      );
    }
  }
  emitWarning();
  shell_js$2 = /* @__PURE__ */ requireShell();
  return shell_js$2;
}
var shell_jsExports = /* @__PURE__ */ requireShell_js();
const shell_js = /* @__PURE__ */ getDefaultExportFromCjs(shell_jsExports);
const shell_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: shell_js
}, [shell_jsExports]);
export {
  shell_js$1 as s
};
//# sourceMappingURL=shell.js-ClLJQSoa.chunk.mjs.map
