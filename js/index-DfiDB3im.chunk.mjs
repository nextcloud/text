function e(t,r,n){const o=document.querySelector(`#initial-state-${t}-${r}`);if(o===null){if(n!==void 0)return n;throw new Error(`Could not find initial state ${r} of ${t}`)}try{return JSON.parse(atob(o.value))}catch{throw new Error(`Could not parse initial state ${r} of ${t}`)}}export{e as l};
//# sourceMappingURL=index-DfiDB3im.chunk.mjs.map
