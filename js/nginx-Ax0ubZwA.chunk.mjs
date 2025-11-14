const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNginx } from "./nginx-3v3WiXfl.chunk.mjs";
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
var nginxExports = /* @__PURE__ */ requireNginx();
const nginx = /* @__PURE__ */ getDefaultExportFromCjs(nginxExports);
const nginx$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nginx
}, [nginxExports]);
export {
  nginx$1 as n
};
//# sourceMappingURL=nginx-Ax0ubZwA.chunk.mjs.map
