/*! third party licenses: js/vendor.LICENSE.txt */
import{g as l}from"./modulepreload-polyfill-sPpBbGTg.mjs";function g(r,n){for(var a=0;a<n.length;a++){const e=n[a];if(typeof e!="string"&&!Array.isArray(e)){for(const t in e)if(t!=="default"&&!(t in r)){const s=Object.getOwnPropertyDescriptor(e,t);s&&Object.defineProperty(r,t,s.get?s:{enumerable:!0,get:()=>e[t]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}function f(r){const n="[ \\t\\f]*",a="[ \\t\\f]+",e=n+"[:=]"+n,t=a,s="("+e+"|"+t+")",i="([^\\\\:= \\t\\f\\n]|\\\\.)+",c={end:s,relevance:0,starts:{className:"string",end:/$/,relevance:0,contains:[{begin:"\\\\\\\\"},{begin:"\\\\\\n"}]}};return{name:".properties",disableAutodetect:!0,case_insensitive:!0,illegal:/\S/,contains:[r.COMMENT("^\\s*[!#]","$"),{returnBegin:!0,variants:[{begin:i+e},{begin:i+t}],contains:[{className:"attr",begin:i,endsParent:!0}],starts:c},{className:"attr",begin:i+n+"$"}]}}var o=f;const b=l(o),p=g({__proto__:null,default:b},[o]);export{o as a,p};