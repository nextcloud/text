const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVim } from "./vim-DyXJ5lbs.chunk.mjs";
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
var vim_js$2;
var hasRequiredVim_js;
function requireVim_js() {
  if (hasRequiredVim_js) return vim_js$2;
  hasRequiredVim_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/vim" instead of "highlight.js/lib/languages/vim.js"'
      );
    }
  }
  emitWarning();
  vim_js$2 = /* @__PURE__ */ requireVim();
  return vim_js$2;
}
var vim_jsExports = /* @__PURE__ */ requireVim_js();
const vim_js = /* @__PURE__ */ getDefaultExportFromCjs(vim_jsExports);
const vim_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: vim_js
}, [vim_jsExports]);
export {
  vim_js$1 as v
};
//# sourceMappingURL=vim.js-DMA_KM-R.chunk.mjs.map
