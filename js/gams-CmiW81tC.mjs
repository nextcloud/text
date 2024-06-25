/*! third party licenses: js/vendor.LICENSE.txt */
import{g as m}from"./emoji-picker-I9E7i3AY.mjs";function g(e,t){for(var i=0;i<t.length;i++){const a=t[i];if(typeof a!="string"&&!Array.isArray(a)){for(const n in a)if(n!=="default"&&!(n in e)){const o=Object.getOwnPropertyDescriptor(a,n);o&&Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:()=>a[n]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}function _(e){const t=e.regex,i={keyword:"abort acronym acronyms alias all and assign binary card diag display else eq file files for free ge gt if integer le loop lt maximizing minimizing model models ne negative no not option options or ord positive prod put putpage puttl repeat sameas semicont semiint smax smin solve sos1 sos2 sum system table then until using while xor yes",literal:"eps inf na",built_in:"abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max min mod ncpCM ncpF ncpVUpow ncpVUsin normal pi poly power randBinomial randLinear randTriangle round rPower sigmoid sign signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion handleCollect handleDelete handleStatus handleSubmit heapFree heapLimit heapSize jobHandle jobKill jobStatus jobTerminate licenseLevel licenseStatus maxExecError sleep timeClose timeComp timeElapsed timeExec timeStart"},a={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0},n={className:"symbol",variants:[{begin:/=[lgenxc]=/},{begin:/\$/}]},o={className:"comment",variants:[{begin:"'",end:"'"},{begin:'"',end:'"'}],illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},r={begin:"/",end:"/",keywords:i,contains:[o,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_NUMBER_MODE]},s=/[a-z0-9&#*=?@\\><:,()$[\]_.{}!+%^-]+/,l={begin:/[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \t]+/,excludeBegin:!0,end:"$",endsWithParent:!0,contains:[o,r,{className:"comment",begin:t.concat(s,t.anyNumberOfTimes(t.concat(/[ ]+/,s))),relevance:0}]};return{name:"GAMS",aliases:["gms"],case_insensitive:!0,keywords:i,contains:[e.COMMENT(/^\$ontext/,/^\$offtext/),{className:"meta",begin:"^\\$[a-z0-9]+",end:"$",returnBegin:!0,contains:[{className:"keyword",begin:"^\\$[a-z0-9]+"}]},e.COMMENT("^\\*","$"),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{beginKeywords:"set sets parameter parameters variable variables scalar scalars equation equations",end:";",contains:[e.COMMENT("^\\*","$"),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,r,l]},{beginKeywords:"table",end:";",returnBegin:!0,contains:[{beginKeywords:"table",end:"$",contains:[l]},e.COMMENT("^\\*","$"),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_NUMBER_MODE]},{className:"function",begin:/^[a-z][a-z0-9_,\-+' ()$]+\.{2}/,returnBegin:!0,contains:[{className:"title",begin:/^[a-z0-9_]+/},a,n]},e.C_NUMBER_MODE,n]}}var c=_;const d=m(c),M=g({__proto__:null,default:d},[c]);export{c as a,M as g};