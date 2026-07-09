import{p as $t}from"./chunk-JWPE2WC7-BZ8PcX6j.chunk.mjs";import{s as ut,g as gt,p as bt,o as wt,a as Ct,b as Dt,_ as i,l as q,F as kt,e as Bt,q as At,B as Q,z as U,D as Tt,W as rt}from"./mermaid.core-DR8mRhxs.chunk.mjs";import{p as St}from"./cynefin-VYW2F7L2-WO5pYpML.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-ZXs2IwY4.chunk.mjs";import"./index-CBEmrcgU.chunk.mjs";import"./index-DOCeebGm.chunk.mjs";var ot=i(()=>({domains:new Map,transitions:[]}),"createDefaultData"),G=ot(),zt=i(()=>G.domains,"getDomains"),vt=i(()=>G.transitions,"getTransitions"),Mt=i(t=>{if(t)for(const e of t){const n=e.domain,a=(e.items??[]).map(c=>({label:c.label}));G.domains.set(n,{name:n,items:a})}},"setDomains"),Lt=i(t=>{t&&(G.transitions=t.filter(e=>e.from===e.to?(q.warn(`Cynefin: self-loop transition on domain "${e.from}" is not meaningful and will be skipped.`),!1):!0).map(e=>({from:e.from,to:e.to,label:e.label||void 0})))},"setTransitions"),Ft=i(()=>Q({...Tt.cynefin,...U().cynefin}),"getConfig"),Pt=i(()=>{At(),G=ot()},"clear"),j={getDomains:zt,getTransitions:vt,setDomains:Mt,setTransitions:Lt,getConfig:Ft,clear:Pt,setAccTitle:Dt,getAccTitle:Ct,setDiagramTitle:wt,getDiagramTitle:bt,getAccDescription:gt,setAccDescription:ut},It=i(t=>{$t(t,j),j.setDomains(t.domains),j.setTransitions(t.transitions)},"populate"),Rt={parse:i(async t=>{const e=await St("cynefin",t);q.debug(e),It(e)},"parse")};function N(t){let e=t+1831565813|0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}i(N,"seededRandom");function it(t){let e=0;for(let n=0;n<t.length;n++){const a=t.charCodeAt(n);e=(e<<5)-e+a,e|=0}return e}i(it,"hashString");function st(t,e){return typeof t=="number"&&Number.isFinite(t)&&t!==0?t:it(e)}i(st,"resolveSeed");function ct(t,e,n,a){const c=t/2,p=a??t*.015,D=7,I=e/D,d=[];for(let r=0;r<=D;r++){const m=N(n+r*17)*p*2-p;d.push({x:c+m,y:r*I})}let k=`M${d[0].x},${d[0].y}`;for(let r=0;r<d.length-1;r++){const m=d[r],s=d[r+1],f=(m.y+s.y)/2,b=r%2===0?1:-1,h=p*1.5*b*N(n+r*31+7),R=m.x+h,W=f,H=s.x-h;k+=` C${R},${W} ${H},${f} ${s.x},${s.y}`}return k}i(ct,"generateFoldPath");function lt(t,e,n,a){const c=e/2,p=a??e*.015,D=7,I=t/D,d=[];for(let r=0;r<=D;r++){const m=N(n+r*23)*p*2-p;d.push({x:r*I,y:c+m})}let k=`M${d[0].x},${d[0].y}`;for(let r=0;r<d.length-1;r++){const m=d[r],s=d[r+1],f=(m.x+s.x)/2,b=r%2===0?1:-1,h=p*1.5*b*N(n+r*37+11),R=f,W=m.y+h,H=f,V=s.y-h;k+=` C${R},${W} ${H},${V} ${s.x},${s.y}`}return k}i(lt,"generateHorizontalBoundary");function dt(t,e){const n=t/2,a=e*.5,c=e,p=t*.03;return[`M${n},${a}`,`C${n+p},${a+(c-a)*.2}`,`${n-p*1.5},${a+(c-a)*.55}`,`${n+p*.5},${a+(c-a)*.75}`,`C${n-p},${a+(c-a)*.85}`,`${n+p*.3},${a+(c-a)*.95}`,`${n},${c}`].join(" ")}i(dt,"generateCliffPath");function ft(t,e,n,a){return[`M${t-n},${e}`,`A${n},${a} 0 1,1 ${t+n},${e}`,`A${n},${a} 0 1,1 ${t-n},${e}`,"Z"].join(" ")}i(ft,"generateConfusionPath");var at={complex:{model:"Probe → Sense → Respond",practice:"Emergent Practices"},complicated:{model:"Sense → Analyse → Respond",practice:"Good Practices"},clear:{model:"Sense → Categorise → Respond",practice:"Best Practices"},chaotic:{model:"Act → Sense → Respond",practice:"Novel Practices"},confusion:{model:"",practice:"Disorder"}},Wt=i((t,e)=>{const n=t/2,a=e/2;return{complex:{cx:n/2,cy:a/2,x:0,y:0,w:n,h:a},complicated:{cx:n+n/2,cy:a/2,x:n,y:0,w:n,h:a},chaotic:{cx:n/2,cy:a+a/2,x:0,y:a,w:n,h:a},clear:{cx:n+n/2,cy:a+a/2,x:n,y:a,w:n,h:a},confusion:{cx:n,cy:a,x:n*.7,y:a*.7,w:n*.6,h:a*.6}}},"getDomainLayouts"),Ht=i(()=>{const t=rt(),e=U();return Q(t,e.themeVariables).cynefin},"getCynefinDomainColors"),_=3,Vt=i((t,e,n,a)=>{const c=a.db,p=c.getDomains(),D=c.getTransitions(),I=c.getDiagramTitle(),d=c.getAccTitle(),k=c.getAccDescription(),r=c.getConfig(),m=Ht();q.debug("Rendering Cynefin diagram");const s=r.width,f=r.height,b=r.padding,h=r.showDomainDescriptions,R=r.boundaryAmplitude,W=s+b*2,H=f+b*2,V={complex:m.complexBg,complicated:m.complicatedBg,clear:m.clearBg,chaotic:m.chaoticBg,confusion:m.confusionBg},B=kt(e);Bt(B,H,W,r.useMaxWidth??!0),B.attr("viewBox",`0 0 ${W} ${H}`),d&&B.append("title").text(d),k&&B.append("desc").text(k);const A=B.append("g").attr("transform",`translate(${b}, ${b})`),E=Wt(s,f),Z=st(r.seed,e),pt=A.append("g").attr("class","cynefin-backgrounds"),X=["complex","complicated","chaotic","clear"];for(const l of X){const o=E[l];pt.append("rect").attr("class","cynefinDomain").attr("x",o.x).attr("y",o.y).attr("width",o.w).attr("height",o.h).attr("fill",V[l]).attr("fill-opacity",.4).attr("stroke","none")}const Y=A.append("g").attr("class","cynefin-boundaries");Y.append("path").attr("class","cynefinBoundary").attr("d",ct(s,f,Z,R)).attr("fill","none"),Y.append("path").attr("class","cynefinBoundary").attr("d",lt(s,f,Z+100,R)).attr("fill","none"),Y.append("path").attr("class","cynefinCliff").attr("d",dt(s,f)).attr("fill","none");const mt=s*.15,yt=f*.15;A.append("path").attr("class","cynefinConfusion").attr("d",ft(s/2,f/2,mt,yt)).attr("fill",V.confusion).attr("fill-opacity",.5);const J=A.append("g").attr("class","cynefin-labels");for(const l of X){const o=E[l];J.append("text").attr("class","cynefinDomainLabel").attr("x",o.cx).attr("y",h?o.cy-30:o.cy).attr("text-anchor","middle").attr("dominant-baseline","middle").text(l.charAt(0).toUpperCase()+l.slice(1))}if(J.append("text").attr("class","cynefinDomainLabel").attr("x",s/2).attr("y",h?f/2-10:f/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text("Confusion"),h){const l=A.append("g").attr("class","cynefin-subtitles");for(const o of X){const x=E[o],y=at[o];l.append("text").attr("class","cynefinSubtitle").attr("x",x.cx).attr("y",x.cy-10).attr("text-anchor","middle").attr("dominant-baseline","middle").text(y.model),l.append("text").attr("class","cynefinSubtitle").attr("x",x.cx).attr("y",x.cy+5).attr("text-anchor","middle").attr("dominant-baseline","middle").text(y.practice)}l.append("text").attr("class","cynefinSubtitle").attr("x",s/2).attr("y",f/2+8).attr("text-anchor","middle").attr("dominant-baseline","middle").text(at.confusion.practice)}const K=A.append("g").attr("class","cynefin-items"),T=26,tt=10,xt=["complex","complicated","chaotic","clear","confusion"];for(const l of xt){const o=p.get(l);if(!o||o.items.length===0)continue;const x=E[l],y=l==="confusion";let M=o.items,L=0;y&&o.items.length>_&&(L=o.items.length-_,M=o.items.slice(0,_));let S;if(y){const u=h?22:14;S=x.cy+u}else S=x.cy+(h?25:15);if([...M].forEach((u,z)=>{const w=S+z*(T+4),v=K.append("g"),F=v.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",T/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(u.label);let g=u.label.length*7;const $=F.node();if($&&typeof $.getBBox=="function"){const O=$.getBBox();O.width>0&&(g=O.width)}const C=g+tt*2,P=x.cx-C/2;v.attr("transform",`translate(${P}, ${w})`),v.insert("rect","text").attr("class","cynefinItem").attr("x",0).attr("y",0).attr("width",C).attr("height",T).attr("rx",4).attr("ry",4).attr("fill",V[l]).attr("fill-opacity",.95),F.attr("x",C/2).attr("y",T/2)}),L>0){const u=S+M.length*(T+4),z=`+${L} more`,w=K.append("g"),v=w.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",T/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(z);let F=z.length*7;const g=v.node();if(g&&typeof g.getBBox=="function"){const P=g.getBBox();P.width>0&&(F=P.width)}const $=F+tt*2,C=x.cx-$/2;w.attr("transform",`translate(${C}, ${u})`),w.insert("rect","text").attr("class","cynefinItemOverflow").attr("x",0).attr("y",0).attr("width",$).attr("height",T).attr("rx",4).attr("ry",4).attr("fill",V[l]).attr("fill-opacity",.6),v.attr("x",$/2).attr("y",T/2)}}if(D.length>0){const l=B.select("defs").empty()?B.append("defs"):B.select("defs"),o=`cynefin-arrow-${e}`;l.append("marker").attr("id",o).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","cynefinArrowHead");const x=A.append("g").attr("class","cynefin-arrows");D.forEach(y=>{const M=E[y.from],L=E[y.to];if(!M||!L)return;if(y.from===y.to){q.warn(`Cynefin renderer: skipping self-loop on domain "${y.from}"`);return}const S=M.cx,u=M.cy,z=L.cx,w=L.cy,v=(S+z)/2,F=(u+w)/2,g=z-S,$=w-u,C=Math.sqrt(g*g+$*$),P=C*.15,O=-$/C,ht=g/C,et=v+O*P,nt=F+ht*P;x.append("path").attr("class","cynefinArrowLine").attr("d",`M${S},${u} Q${et},${nt} ${z},${w}`).attr("fill","none").attr("marker-end",`url(#${o})`),y.label&&x.append("text").attr("class","cynefinArrowLabel").attr("x",et).attr("y",nt-6).attr("text-anchor","middle").attr("dominant-baseline","auto").text(y.label)})}I&&A.append("text").attr("class","cynefinTitle").attr("x",s/2).attr("y",-b/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text(I)},"draw"),Et={draw:Vt},Nt=i(()=>{const t=rt(),e=U();return Q(t,e.themeVariables).cynefin},"getCynefinTheme"),Gt=i(()=>{const t=Nt();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${t.domainFontSize}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${t.itemFontSize}px;
		fill: ${t.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${t.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${t.boundaryColor};
		stroke-width: ${t.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${t.cliffColor};
		stroke-width: ${t.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${t.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${t.arrowColor};
		stroke-width: ${t.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${t.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${t.itemFontSize-1}px;
		fill: ${t.textColor};
	}
	.cynefinTitle {
		font-size: ${t.domainFontSize+2}px;
		font-weight: bold;
		fill: ${t.labelColor};
	}
	`},"styles"),Ot=Gt,Zt={parser:Rt,db:j,renderer:Et,styles:Ot};export{Zt as diagram};
//# sourceMappingURL=cynefinDiagram-TSTJHNR4-CBBbddE8.chunk.mjs.map
