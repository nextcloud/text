/*! third party licenses: js/vendor.LICENSE.txt */
import{g as s}from"./emoji-picker.chunk.mjs";function c(e,a){for(var r=0;r<a.length;r++){const t=a[r];if(typeof t!="string"&&!Array.isArray(t)){for(const n in t)if(n!=="default"&&!(n in e)){const o=Object.getOwnPropertyDescriptor(t,n);o&&Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:()=>t[n]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}function i(e){const a={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},r={match:/[{}[\],:]/,className:"punctuation",relevance:0},t=["true","false","null"],n={scope:"literal",beginKeywords:t.join(" ")};return{name:"JSON",keywords:{literal:t},contains:[a,r,e.QUOTE_STRING_MODE,n,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}var l=i;const f=s(l),_=c({__proto__:null,default:f},[l]);export{l as a,_ as j};