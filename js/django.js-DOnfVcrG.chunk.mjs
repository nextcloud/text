const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDjango } from "./django-BAcp9hdT.chunk.mjs";
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
var django_js$2;
var hasRequiredDjango_js;
function requireDjango_js() {
  if (hasRequiredDjango_js) return django_js$2;
  hasRequiredDjango_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/django" instead of "highlight.js/lib/languages/django.js"'
      );
    }
  }
  emitWarning();
  django_js$2 = /* @__PURE__ */ requireDjango();
  return django_js$2;
}
var django_jsExports = /* @__PURE__ */ requireDjango_js();
const django_js = /* @__PURE__ */ getDefaultExportFromCjs(django_jsExports);
const django_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: django_js
}, [django_jsExports]);
export {
  django_js$1 as d
};
//# sourceMappingURL=django.js-DOnfVcrG.chunk.mjs.map
