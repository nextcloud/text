import{p as F}from"./chunk-JWPE2WC7-DnRqvOOC.chunk.mjs";import{s as z,g as E,p as R,o as D,a as P,b as B,_ as c,F as W,q as G,B as w,z as b,D as V,l as C,W as _,e as j}from"./mermaid.core-CVvw1bng.chunk.mjs";import{p as q}from"./cynefin-VYW2F7L2-xyJInCTV.chunk.mjs";import"./preload-helper-BorfeO-5.chunk.mjs";import"./emoji-picker-C0wQOMkK.chunk.mjs";import"./NcLoadingIcon-CSU614Qs.chunk.mjs";import"./vue.runtime.esm-BF-IvmLA.chunk.mjs";import"./index-BBRfwPzy.chunk.mjs";var m={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},v=32,M={axes:[],curves:[],options:m},x=structuredClone(M),H=V.radar,U=c(()=>w({...H,...b().radar}),"getConfig"),L=c(()=>x.axes,"getAxes"),Z=c(()=>x.curves,"getCurves"),J=c(()=>x.options,"getOptions"),K=c(a=>{x.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),N=c(a=>{x.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:Q(t.entries)}))},"setCurves"),Q=c(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=L();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>s.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),X=c(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});x.options={showLegend:t.showLegend?.value??m.showLegend,ticks:t.ticks?.value??m.ticks,max:t.max?.value??m.max,min:t.min?.value??m.min,graticule:t.graticule?.value??m.graticule},x.options.ticks>v&&(C.warn(`Radar diagram ticks (${x.options.ticks}) exceeds maximum allowed (${v}). Using ${v} instead.`),x.options.ticks=v)},"setOptions"),Y=c(()=>{G(),x=structuredClone(M)},"clear"),f={getAxes:L,getCurves:Z,getOptions:J,setAxes:K,setCurves:N,setOptions:X,getConfig:U,clear:Y,setAccTitle:B,getAccTitle:P,setDiagramTitle:D,getDiagramTitle:R,getAccDescription:E,setAccDescription:z},tt=c(a=>{F(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),et={parse:c(async a=>{const t=await q("radar",a);C.debug(t),tt(t)},"parse")},at=c((a,t,e,r)=>{const s=r.db,o=s.getAxes(),l=s.getCurves(),i=s.getOptions(),n=s.getConfig(),d=s.getDiagramTitle(),g=W(t),p=rt(g,n),u=i.max??Math.max(...l.map(y=>Math.max(...y.entries))),h=i.min,$=Math.min(n.width,n.height)/2;st(p,o,$,i.ticks,i.graticule),it(p,o,$,n),k(p,o,l,h,u,i.graticule,n),O(p,l,i.showLegend,n),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-n.height/2-n.marginTop)},"draw"),rt=c((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return j(a,r,e,t.useMaxWidth??!0),a.attr("viewBox",`0 0 ${e} ${r}`).attr("overflow","visible"),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),st=c((a,t,e,r,s)=>{if(s==="circle")for(let o=0;o<r;o++){const l=e*(o+1)/r;a.append("circle").attr("r",l).attr("class","radarGraticule")}else if(s==="polygon"){const o=t.length;for(let l=0;l<r;l++){const i=e*(l+1)/r,n=t.map((d,g)=>{const p=2*g*Math.PI/o-Math.PI/2,u=i*Math.cos(p),h=i*Math.sin(p);return`${u},${h}`}).join(" ");a.append("polygon").attr("points",n).attr("class","radarGraticule")}}},"drawGraticule"),it=c((a,t,e,r)=>{const s=t.length;for(let o=0;o<s;o++){const l=t[o].label,i=2*o*Math.PI/s-Math.PI/2,n=Math.cos(i),d=Math.sin(i);a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*n).attr("y2",e*r.axisScaleFactor*d).attr("class","radarAxisLine");const g=n>.01?"start":n<-.01?"end":"middle",p=d>.01?"hanging":d<-.01?"auto":"central",u=4;a.append("text").text(l).attr("x",e*r.axisLabelFactor*n+u*n).attr("y",e*r.axisLabelFactor*d+u*d).attr("text-anchor",g).attr("dominant-baseline",p).attr("class","radarAxisLabel")}},"drawAxes");function k(a,t,e,r,s,o,l){const i=t.length,n=Math.min(l.width,l.height)/2;e.forEach((d,g)=>{if(d.entries.length!==i)return;const p=d.entries.map((u,h)=>{const $=2*Math.PI*h/i-Math.PI/2,y=T(u,r,s,n),S=y*Math.cos($),I=y*Math.sin($);return{x:S,y:I}});o==="circle"?a.append("path").attr("d",A(p,l.curveTension)).attr("class",`radarCurve-${g}`):o==="polygon"&&a.append("polygon").attr("points",p.map(u=>`${u.x},${u.y}`).join(" ")).attr("class",`radarCurve-${g}`)})}c(k,"drawCurves");function T(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}c(T,"relativeRadius");function A(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const o=a[(s-1+e)%e],l=a[s],i=a[(s+1)%e],n=a[(s+2)%e],d={x:l.x+(i.x-o.x)*t,y:l.y+(i.y-o.y)*t},g={x:i.x-(n.x-l.x)*t,y:i.y-(n.y-l.y)*t};r+=` C${d.x},${d.y} ${g.x},${g.y} ${i.x},${i.y}`}return`${r} Z`}c(A,"closedRoundCurve");function O(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,l=20;t.forEach((i,n)=>{const d=a.append("g").attr("transform",`translate(${s}, ${o+n*l})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${n}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}c(O,"drawLegend");var nt={draw:at},ot=c((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
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
	`},"styles"),ft={parser:et,db:f,renderer:nt,styles:ct};export{ft as diagram};
//# sourceMappingURL=diagram-UB23O5K3-B7s2JU3j.chunk.mjs.map
