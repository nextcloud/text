/*! third party licenses: js/vendor.LICENSE.txt */
import{g}from"./modulepreload-polyfill-DZeoc1eZ.mjs";import{a as c}from"./moonscript-DGQ3Rotu.mjs";function l(n,a){for(var r=0;r<a.length;r++){const e=a[r];if(typeof e!="string"&&!Array.isArray(e)){for(const t in e)if(t!=="default"&&!(t in n)){const i=Object.getOwnPropertyDescriptor(e,t);i&&Object.defineProperty(n,t,i.get?i:{enumerable:!0,get:()=>e[t]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}function o(){o.warned||(o.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/moonscript" instead of "highlight.js/lib/languages/moonscript.js"'))}o();var s=c;const f=g(s),d=l({__proto__:null,default:f},[s]);export{d as m};