/*! third party licenses: js/vendor.LICENSE.txt */
import{g as c}from"./emoji-picker-SoWZqoso.chunk.mjs";function o(a,r){for(var n=0;n<r.length;n++){const t=r[n];if(typeof t!="string"&&!Array.isArray(t)){for(const e in t)if(e!=="default"&&!(e in a)){const s=Object.getOwnPropertyDescriptor(t,e);s&&Object.defineProperty(a,e,s.get?s:{enumerable:!0,get:()=>t[e]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}function u(a){const r={match:[/^\s*(?=\S)/,/[^:]+/,/:\s*/,/$/],className:{2:"attribute",3:"punctuation"}},n={match:[/^\s*(?=\S)/,/[^:]*[^: ]/,/[ ]*:/,/[ ]/,/.*$/],className:{2:"attribute",3:"punctuation",5:"string"}},t={match:[/^\s*/,/>/,/[ ]/,/.*$/],className:{2:"punctuation",4:"string"}},e={variants:[{match:[/^\s*/,/-/,/[ ]/,/.*$/]},{match:[/^\s*/,/-$/]}],className:{2:"bullet",4:"string"}};return{name:"Nested Text",aliases:["nt"],contains:[a.inherit(a.HASH_COMMENT_MODE,{begin:/^\s*(?=#)/,excludeBegin:!0}),e,t,r,n]}}var i=u;const l=c(i),f=o({__proto__:null,default:l},[i]);export{i as a,f as n};