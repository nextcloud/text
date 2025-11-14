const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRoboconf } from "./roboconf-D5dVpgS6.chunk.mjs";
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
var roboconf_js$2;
var hasRequiredRoboconf_js;
function requireRoboconf_js() {
  if (hasRequiredRoboconf_js) return roboconf_js$2;
  hasRequiredRoboconf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/roboconf" instead of "highlight.js/lib/languages/roboconf.js"'
      );
    }
  }
  emitWarning();
  roboconf_js$2 = /* @__PURE__ */ requireRoboconf();
  return roboconf_js$2;
}
var roboconf_jsExports = /* @__PURE__ */ requireRoboconf_js();
const roboconf_js = /* @__PURE__ */ getDefaultExportFromCjs(roboconf_jsExports);
const roboconf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: roboconf_js
}, [roboconf_jsExports]);
export {
  roboconf_js$1 as r
};
//# sourceMappingURL=roboconf.js-BM0AeCzY.chunk.mjs.map
