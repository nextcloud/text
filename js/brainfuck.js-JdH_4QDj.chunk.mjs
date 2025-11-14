const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireBrainfuck } from "./brainfuck-BgB3Q9vS.chunk.mjs";
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
var brainfuck_js$2;
var hasRequiredBrainfuck_js;
function requireBrainfuck_js() {
  if (hasRequiredBrainfuck_js) return brainfuck_js$2;
  hasRequiredBrainfuck_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/brainfuck" instead of "highlight.js/lib/languages/brainfuck.js"'
      );
    }
  }
  emitWarning();
  brainfuck_js$2 = /* @__PURE__ */ requireBrainfuck();
  return brainfuck_js$2;
}
var brainfuck_jsExports = /* @__PURE__ */ requireBrainfuck_js();
const brainfuck_js = /* @__PURE__ */ getDefaultExportFromCjs(brainfuck_jsExports);
const brainfuck_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: brainfuck_js
}, [brainfuck_jsExports]);
export {
  brainfuck_js$1 as b
};
//# sourceMappingURL=brainfuck.js-JdH_4QDj.chunk.mjs.map
