import{p as S}from"./chunk-JWPE2WC7-DnrdIErs.chunk.mjs";import{s as I,g as F,p as z,o as E,a as D,b as P,_ as c,F as R,q as B,B as y,z as w,D as G,l as W,W as V,e as _}from"./mermaid.core-CkKG5H_Q.chunk.mjs";import{p as j}from"./cynefin-VYW2F7L2-WO5pYpML.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-ZXs2IwY4.chunk.mjs";import"./index-KVwJkFXP.chunk.mjs";import"./index-DOCeebGm.chunk.mjs";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:h},x=structuredClone(b),q=G.radar,H=c(()=>y({...q,...w().radar}),"getConfig"),C=c(()=>x.axes,"getAxes"),Z=c(()=>x.curves,"getCurves"),J=c(()=>x.options,"getOptions"),K=c(a=>{x.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),N=c(a=>{x.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:Q(t.entries)}))},"setCurves"),Q=c(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=C();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>s.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),U=c(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});x.options={showLegend:t.showLegend?.value??h.showLegend,ticks:t.ticks?.value??h.ticks,max:t.max?.value??h.max,min:t.min?.value??h.min,graticule:t.graticule?.value??h.graticule}},"setOptions"),X=c(()=>{B(),x=structuredClone(b)},"clear"),f={getAxes:C,getCurves:Z,getOptions:J,setAxes:K,setCurves:N,setOptions:U,getConfig:H,clear:X,setAccTitle:P,getAccTitle:D,setDiagramTitle:E,getDiagramTitle:z,getAccDescription:F,setAccDescription:I},Y=c(a=>{S(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),tt={parse:c(async a=>{const t=await j("radar",a);W.debug(t),Y(t)},"parse")},et=c((a,t,e,r)=>{const s=r.db,o=s.getAxes(),l=s.getCurves(),i=s.getOptions(),n=s.getConfig(),d=s.getDiagramTitle(),g=R(t),p=at(g,n),u=i.max??Math.max(...l.map(v=>Math.max(...v.entries))),m=i.min,$=Math.min(n.width,n.height)/2;rt(p,o,$,i.ticks,i.graticule),st(p,o,$,n),M(p,o,l,m,u,i.graticule,n),A(p,l,i.showLegend,n),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-n.height/2-n.marginTop)},"draw"),at=c((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return _(a,r,e,t.useMaxWidth??!0),a.attr("viewBox",`0 0 ${e} ${r}`).attr("overflow","visible"),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),rt=c((a,t,e,r,s)=>{if(s==="circle")for(let o=0;o<r;o++){const l=e*(o+1)/r;a.append("circle").attr("r",l).attr("class","radarGraticule")}else if(s==="polygon"){const o=t.length;for(let l=0;l<r;l++){const i=e*(l+1)/r,n=t.map((d,g)=>{const p=2*g*Math.PI/o-Math.PI/2,u=i*Math.cos(p),m=i*Math.sin(p);return`${u},${m}`}).join(" ");a.append("polygon").attr("points",n).attr("class","radarGraticule")}}},"drawGraticule"),st=c((a,t,e,r)=>{const s=t.length;for(let o=0;o<s;o++){const l=t[o].label,i=2*o*Math.PI/s-Math.PI/2,n=Math.cos(i),d=Math.sin(i);a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*n).attr("y2",e*r.axisScaleFactor*d).attr("class","radarAxisLine");const g=n>.01?"start":n<-.01?"end":"middle",p=d>.01?"hanging":d<-.01?"auto":"central",u=4;a.append("text").text(l).attr("x",e*r.axisLabelFactor*n+u*n).attr("y",e*r.axisLabelFactor*d+u*d).attr("text-anchor",g).attr("dominant-baseline",p).attr("class","radarAxisLabel")}},"drawAxes");function M(a,t,e,r,s,o,l){const i=t.length,n=Math.min(l.width,l.height)/2;e.forEach((d,g)=>{if(d.entries.length!==i)return;const p=d.entries.map((u,m)=>{const $=2*Math.PI*m/i-Math.PI/2,v=L(u,r,s,n),k=v*Math.cos($),O=v*Math.sin($);return{x:k,y:O}});o==="circle"?a.append("path").attr("d",T(p,l.curveTension)).attr("class",`radarCurve-${g}`):o==="polygon"&&a.append("polygon").attr("points",p.map(u=>`${u.x},${u.y}`).join(" ")).attr("class",`radarCurve-${g}`)})}c(M,"drawCurves");function L(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}c(L,"relativeRadius");function T(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const o=a[(s-1+e)%e],l=a[s],i=a[(s+1)%e],n=a[(s+2)%e],d={x:l.x+(i.x-o.x)*t,y:l.y+(i.y-o.y)*t},g={x:i.x-(n.x-l.x)*t,y:i.y-(n.y-l.y)*t};r+=` C${d.x},${d.y} ${g.x},${g.y} ${i.x},${i.y}`}return`${r} Z`}c(T,"closedRoundCurve");function A(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,l=20;t.forEach((i,n)=>{const d=a.append("g").attr("transform",`translate(${s}, ${o+n*l})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${n}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}c(A,"drawLegend");var it={draw:et},nt=c((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
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
		`}return e},"genIndexStyles"),ot=c(a=>{const t=V(),e=w(),r=y(t,e.themeVariables),s=y(r.radar,a);return{themeVariables:r,radarOptions:s}},"buildRadarStyleOptions"),lt=c(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=ot(a);return`
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
	${nt(t,e)}
	`},"styles"),mt={parser:tt,db:f,renderer:it,styles:lt};export{mt as diagram};
//# sourceMappingURL=diagram-WEI45ONY-CCJ0pDP4.chunk.mjs.map
