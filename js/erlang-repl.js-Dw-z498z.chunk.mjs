const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireErlangRepl } from "./erlang-repl-u3i5SdQt.chunk.mjs";
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
var erlangRepl_js$2;
var hasRequiredErlangRepl_js;
function requireErlangRepl_js() {
  if (hasRequiredErlangRepl_js) return erlangRepl_js$2;
  hasRequiredErlangRepl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/erlang-repl" instead of "highlight.js/lib/languages/erlang-repl.js"'
      );
    }
  }
  emitWarning();
  erlangRepl_js$2 = /* @__PURE__ */ requireErlangRepl();
  return erlangRepl_js$2;
}
var erlangRepl_jsExports = /* @__PURE__ */ requireErlangRepl_js();
const erlangRepl_js = /* @__PURE__ */ getDefaultExportFromCjs(erlangRepl_jsExports);
const erlangRepl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: erlangRepl_js
}, [erlangRepl_jsExports]);
export {
  erlangRepl_js$1 as e
};
//# sourceMappingURL=erlang-repl.js-Dw-z498z.chunk.mjs.map
