/*! third party licenses: js/vendor.LICENSE.txt */
import{g}from"./modulepreload-polyfill-CtIajbZu.mjs";import{a as l}from"./wren-FIP0kJ6-.mjs";function f(t,a){for(var n=0;n<a.length;n++){const e=a[n];if(typeof e!="string"&&!Array.isArray(e)){for(const r in e)if(r!=="default"&&!(r in t)){const i=Object.getOwnPropertyDescriptor(e,r);i&&Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:()=>e[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}function o(){o.warned||(o.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/wren" instead of "highlight.js/lib/languages/wren.js"'))}o();var s=l;const c=g(s),d=f({__proto__:null,default:c},[s]);export{d as w};