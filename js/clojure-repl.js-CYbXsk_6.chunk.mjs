const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireClojureRepl } from "./clojure-repl-CT9aHlPU.chunk.mjs";
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
var clojureRepl_js$2;
var hasRequiredClojureRepl_js;
function requireClojureRepl_js() {
  if (hasRequiredClojureRepl_js) return clojureRepl_js$2;
  hasRequiredClojureRepl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/clojure-repl" instead of "highlight.js/lib/languages/clojure-repl.js"'
      );
    }
  }
  emitWarning();
  clojureRepl_js$2 = /* @__PURE__ */ requireClojureRepl();
  return clojureRepl_js$2;
}
var clojureRepl_jsExports = /* @__PURE__ */ requireClojureRepl_js();
const clojureRepl_js = /* @__PURE__ */ getDefaultExportFromCjs(clojureRepl_jsExports);
const clojureRepl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: clojureRepl_js
}, [clojureRepl_jsExports]);
export {
  clojureRepl_js$1 as c
};
//# sourceMappingURL=clojure-repl.js-CYbXsk_6.chunk.mjs.map
