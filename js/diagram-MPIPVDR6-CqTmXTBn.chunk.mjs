import{p as E}from"./chunk-JWPE2WC7-Cb7Fs6da.chunk.mjs";import{s as F,g as P,x as R,v as z,a as D,b as B,_ as c,S as G,B as W,P as w,N as b,Q as V,l as C,a8 as _,d as j}from"./mermaid.core-CKF11ncQ.chunk.mjs";import{p as H}from"./cynefin-OW5HDTMX-sUHC7b5J.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-BCw35BJ9.chunk.mjs";import"./translation-DoG5ZELJ-CqWioDiI.chunk.mjs";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},y=32,M={axes:[],curves:[],options:h},u=structuredClone(M),N=V.radar,Q=c(()=>w({...N,...b().radar}),"getConfig"),L=c(()=>u.axes,"getAxes"),U=c(()=>u.curves,"getCurves"),Z=c(()=>u.options,"getOptions"),q=c(a=>{u.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=c(a=>{u.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:K(t.entries)}))},"setCurves"),K=c(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=L();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>s.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),X=c(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});u.options={showLegend:t.showLegend?.value??h.showLegend,ticks:t.ticks?.value??h.ticks,max:t.max?.value??h.max,min:t.min?.value??h.min,graticule:t.graticule?.value??h.graticule},u.options.ticks>y&&(C.warn(`Radar diagram ticks (${u.options.ticks}) exceeds maximum allowed (${y}). Using ${y} instead.`),u.options.ticks=y)},"setOptions"),Y=c(()=>{W(),u=structuredClone(M)},"clear"),f={getAxes:L,getCurves:U,getOptions:Z,setAxes:q,setCurves:J,setOptions:X,getConfig:Q,clear:Y,setAccTitle:B,getAccTitle:D,setDiagramTitle:z,getDiagramTitle:R,getAccDescription:P,setAccDescription:F},tt=c(a=>{E(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),et={parse:c(async a=>{const t=await H("radar",a);C.debug(t),tt(t)},"parse")},at=c((a,t,e,r)=>{const s=r.db,o=s.getAxes(),l=s.getCurves(),i=s.getOptions(),n=s.getConfig(),d=s.getDiagramTitle(),g=G(t),p=rt(g,n),x=i.max??Math.max(...l.map(v=>Math.max(...v.entries))),m=i.min,$=Math.min(n.width,n.height)/2;st(p,o,$,i.ticks,i.graticule),it(p,o,$,n),k(p,o,l,m,x,i.graticule,n),O(p,l,i.showLegend,n),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-n.height/2-n.marginTop)},"draw"),rt=c((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return j(a,r,e,t.useMaxWidth??!0),a.attr("viewBox",`0 0 ${e} ${r}`).attr("overflow","visible"),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),st=c((a,t,e,r,s)=>{if(s==="circle")for(let o=0;o<r;o++){const l=e*(o+1)/r;a.append("circle").attr("r",l).attr("class","radarGraticule")}else if(s==="polygon"){const o=t.length;for(let l=0;l<r;l++){const i=e*(l+1)/r,n=t.map((d,g)=>{const p=2*g*Math.PI/o-Math.PI/2,x=i*Math.cos(p),m=i*Math.sin(p);return`${x},${m}`}).join(" ");a.append("polygon").attr("points",n).attr("class","radarGraticule")}}},"drawGraticule"),it=c((a,t,e,r)=>{const s=t.length;for(let o=0;o<s;o++){const l=t[o].label,i=2*o*Math.PI/s-Math.PI/2,n=Math.cos(i),d=Math.sin(i);a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*n).attr("y2",e*r.axisScaleFactor*d).attr("class","radarAxisLine");const g=n>.01?"start":n<-.01?"end":"middle",p=d>.01?"hanging":d<-.01?"auto":"central",x=4;a.append("text").text(l).attr("x",e*r.axisLabelFactor*n+x*n).attr("y",e*r.axisLabelFactor*d+x*d).attr("text-anchor",g).attr("dominant-baseline",p).attr("class","radarAxisLabel")}},"drawAxes");function k(a,t,e,r,s,o,l){const i=t.length,n=Math.min(l.width,l.height)/2;e.forEach((d,g)=>{if(d.entries.length!==i)return;const p=d.entries.map((x,m)=>{const $=2*Math.PI*m/i-Math.PI/2,v=T(x,r,s,n),S=v*Math.cos($),I=v*Math.sin($);return{x:S,y:I}});o==="circle"?a.append("path").attr("d",A(p,l.curveTension)).attr("class",`radarCurve-${g}`):o==="polygon"&&a.append("polygon").attr("points",p.map(x=>`${x.x},${x.y}`).join(" ")).attr("class",`radarCurve-${g}`)})}c(k,"drawCurves");function T(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}c(T,"relativeRadius");function A(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const o=a[(s-1+e)%e],l=a[s],i=a[(s+1)%e],n=a[(s+2)%e],d={x:l.x+(i.x-o.x)*t,y:l.y+(i.y-o.y)*t},g={x:i.x-(n.x-l.x)*t,y:i.y-(n.y-l.y)*t};r+=` C${d.x},${d.y} ${g.x},${g.y} ${i.x},${i.y}`}return`${r} Z`}c(A,"closedRoundCurve");function O(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,l=20;t.forEach((i,n)=>{const d=a.append("g").attr("transform",`translate(${s}, ${o+n*l})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${n}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}c(O,"drawLegend");var nt={draw:at},ot=c((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${s};
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
		}
		`}return e},"genIndexStyles"),lt=c(a=>{const t=_(),e=b(),r=w(t,e.themeVariables),s=w(r.radar,a);return{themeVariables:r,radarOptions:s}},"buildRadarStyleOptions"),ct=c(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=lt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${ot(t,e)}
	`},"styles"),mt={parser:et,db:f,renderer:nt,styles:ct};export{mt as diagram};
//# sourceMappingURL=diagram-MPIPVDR6-CqTmXTBn.chunk.mjs.map
