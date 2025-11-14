const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHandlebars } from "./handlebars-z3N4VKDh.chunk.mjs";
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
var handlebarsExports = /* @__PURE__ */ requireHandlebars();
const handlebars = /* @__PURE__ */ getDefaultExportFromCjs(handlebarsExports);
const handlebars$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: handlebars
}, [handlebarsExports]);
export {
  handlebars$1 as h
};
//# sourceMappingURL=handlebars-Z9S1ItOD.chunk.mjs.map
