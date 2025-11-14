const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRuby } from "./ruby-DqAmMY_d.chunk.mjs";
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
var ruby_js$2;
var hasRequiredRuby_js;
function requireRuby_js() {
  if (hasRequiredRuby_js) return ruby_js$2;
  hasRequiredRuby_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ruby" instead of "highlight.js/lib/languages/ruby.js"'
      );
    }
  }
  emitWarning();
  ruby_js$2 = /* @__PURE__ */ requireRuby();
  return ruby_js$2;
}
var ruby_jsExports = /* @__PURE__ */ requireRuby_js();
const ruby_js = /* @__PURE__ */ getDefaultExportFromCjs(ruby_jsExports);
const ruby_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ruby_js
}, [ruby_jsExports]);
export {
  ruby_js$1 as r
};
//# sourceMappingURL=ruby.js-DUDxbr2A.chunk.mjs.map
