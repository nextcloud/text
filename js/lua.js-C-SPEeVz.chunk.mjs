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
var lua_js$2;
var hasRequiredLua_js;
function requireLua_js() {
  if (hasRequiredLua_js) return lua_js$2;
  hasRequiredLua_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/lua" instead of "highlight.js/lib/languages/lua.js"'
      );
    }
  }
  emitWarning();
  lua_js$2 = /* @__PURE__ */ requireLua();
  return lua_js$2;
}
var lua_jsExports = /* @__PURE__ */ requireLua_js();
const lua_js = /* @__PURE__ */ getDefaultExportFromCjs(lua_jsExports);
const lua_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: lua_js
}, [lua_jsExports]);
export {
  lua_js$1 as l
};
//# sourceMappingURL=lua.js-C-SPEeVz.chunk.mjs.map
