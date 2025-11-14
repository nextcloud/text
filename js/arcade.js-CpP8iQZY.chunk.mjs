const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireArcade } from "./arcade-uWZKMn1F.chunk.mjs";
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
var arcade_js$2;
var hasRequiredArcade_js;
function requireArcade_js() {
  if (hasRequiredArcade_js) return arcade_js$2;
  hasRequiredArcade_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/arcade" instead of "highlight.js/lib/languages/arcade.js"'
      );
    }
  }
  emitWarning();
  arcade_js$2 = /* @__PURE__ */ requireArcade();
  return arcade_js$2;
}
var arcade_jsExports = /* @__PURE__ */ requireArcade_js();
const arcade_js = /* @__PURE__ */ getDefaultExportFromCjs(arcade_jsExports);
const arcade_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: arcade_js
}, [arcade_jsExports]);
export {
  arcade_js$1 as a
};
//# sourceMappingURL=arcade.js-CpP8iQZY.chunk.mjs.map
