const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNodeRepl } from "./node-repl-DRbjtyMG.chunk.mjs";
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
var nodeRepl_js$2;
var hasRequiredNodeRepl_js;
function requireNodeRepl_js() {
  if (hasRequiredNodeRepl_js) return nodeRepl_js$2;
  hasRequiredNodeRepl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/node-repl" instead of "highlight.js/lib/languages/node-repl.js"'
      );
    }
  }
  emitWarning();
  nodeRepl_js$2 = /* @__PURE__ */ requireNodeRepl();
  return nodeRepl_js$2;
}
var nodeRepl_jsExports = /* @__PURE__ */ requireNodeRepl_js();
const nodeRepl_js = /* @__PURE__ */ getDefaultExportFromCjs(nodeRepl_jsExports);
const nodeRepl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nodeRepl_js
}, [nodeRepl_jsExports]);
export {
  nodeRepl_js$1 as n
};
//# sourceMappingURL=node-repl.js-DYMIs0Zb.chunk.mjs.map
