(self.webpackChunk_nextcloud_text=self.webpackChunk_nextcloud_text||[]).push([["highlight/coffeescript-js-js","highlight/coffeescript"],{95437:e=>{const n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],t=["true","false","null","undefined","NaN","Infinity"],r=[].concat(["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]);e.exports=function(e){const a={keyword:n.concat(["then","unless","until","loop","by","when","and","or","is","isnt","not"]).filter((i=["var","const","let","function","static"],e=>!i.includes(e))),literal:t.concat(["yes","no","on","off"]),built_in:r.concat(["npm","print"])};var i;const s="[A-Za-z$_][0-9A-Za-z$_]*",o={className:"subst",begin:/#\{/,end:/\}/,keywords:a},c=[e.BINARY_NUMBER_MODE,e.inherit(e.C_NUMBER_MODE,{starts:{end:"(\\s*/)?",relevance:0}}),{className:"string",variants:[{begin:/'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE]},{begin:/'/,end:/'/,contains:[e.BACKSLASH_ESCAPE]},{begin:/"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,o]},{begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,o]}]},{className:"regexp",variants:[{begin:"///",end:"///",contains:[o,e.HASH_COMMENT_MODE]},{begin:"//[gim]{0,3}(?=\\W)",relevance:0},{begin:/\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/}]},{begin:"@"+s},{subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,variants:[{begin:"```",end:"```"},{begin:"`",end:"`"}]}];o.contains=c;const l=e.inherit(e.TITLE_MODE,{begin:s}),g="(\\(.*\\)\\s*)?\\B[-=]>",d={className:"params",begin:"\\([^\\(]",returnBegin:!0,contains:[{begin:/\(/,end:/\)/,keywords:a,contains:["self"].concat(c)}]},u={variants:[{match:[/class\s+/,s,/\s+extends\s+/,s]},{match:[/class\s+/,s]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:a};return{name:"CoffeeScript",aliases:["coffee","cson","iced"],keywords:a,illegal:/\/\*/,contains:[...c,e.COMMENT("###","###"),e.HASH_COMMENT_MODE,{className:"function",begin:"^\\s*"+s+"\\s*=\\s*"+g,end:"[-=]>",returnBegin:!0,contains:[l,d]},{begin:/[:\(,=]\s*/,relevance:0,contains:[{className:"function",begin:g,end:"[-=]>",returnBegin:!0,contains:[d]}]},u,{begin:s+":",end:":",returnBegin:!0,returnEnd:!0,relevance:0}]}}},1493:(e,n,t)=>{!function e(){e.warned||(e.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/coffeescript" instead of "highlight.js/lib/languages/coffeescript.js"'))}(),e.exports=t(95437)}}]);
//# sourceMappingURL=coffeescript-js-js.js.map?v=04fa5e21804e127bb9f8