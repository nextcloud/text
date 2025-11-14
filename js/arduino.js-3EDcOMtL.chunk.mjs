const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireArduino } from "./arduino-Bi4R__04.chunk.mjs";
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
var arduino_js$2;
var hasRequiredArduino_js;
function requireArduino_js() {
  if (hasRequiredArduino_js) return arduino_js$2;
  hasRequiredArduino_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/arduino" instead of "highlight.js/lib/languages/arduino.js"'
      );
    }
  }
  emitWarning();
  arduino_js$2 = /* @__PURE__ */ requireArduino();
  return arduino_js$2;
}
var arduino_jsExports = /* @__PURE__ */ requireArduino_js();
const arduino_js = /* @__PURE__ */ getDefaultExportFromCjs(arduino_jsExports);
const arduino_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: arduino_js
}, [arduino_jsExports]);
export {
  arduino_js$1 as a
};
//# sourceMappingURL=arduino.js-3EDcOMtL.chunk.mjs.map
