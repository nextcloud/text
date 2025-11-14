const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLua } from "./lua-CgqcIMl7.chunk.mjs";
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
var luaExports = /* @__PURE__ */ requireLua();
const lua = /* @__PURE__ */ getDefaultExportFromCjs(luaExports);
const lua$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: lua
}, [luaExports]);
export {
  lua$1 as l
};
//# sourceMappingURL=lua-BY8hx0bI.chunk.mjs.map
