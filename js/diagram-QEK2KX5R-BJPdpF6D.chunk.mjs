import{_ as l,s as S,g as I,t as F,q as z,a as E,b as P,K as R,z as D,F as v,G as w,H as G,l as B,a1 as V}from"./mermaid.core-DrJfu-9d.chunk.mjs";import{p as W}from"./chunk-4BX2VUAB-CXxCl32T.chunk.mjs";import{p as _}from"./treemap-KMMF4GRG-BHT9xVli.chunk.mjs";import"./index-CRQM6PVi.chunk.mjs";import"./emoji-picker-MDCGxHB0.chunk.mjs";import"./NcLoadingIcon-ZJnsd-es.chunk.mjs";import"./vue.runtime.esm-CLeelJur.chunk.mjs";import"./index-DxwFe63_.chunk.mjs";import"./_baseUniq-pf37y4On.chunk.mjs";import"./_basePickBy-Dy1ViJhr.chunk.mjs";import"./clone-DchRqQR-.chunk.mjs";var m={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:m},h=structuredClone(b),j=G.radar,H=l(()=>v({...j,...w().radar}),"getConfig"),C=l(()=>h.axes,"getAxes"),q=l(()=>h.curves,"getCurves"),K=l(()=>h.options,"getOptions"),Z=l(a=>{h.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=l(a=>{h.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:N(t.entries)}))},"setCurves"),N=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=C();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>s.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),Q=l(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});h.options={showLegend:t.showLegend?.value??m.showLegend,ticks:t.ticks?.value??m.ticks,max:t.max?.value??m.max,min:t.min?.value??m.min,graticule:t.graticule?.value??m.graticule}},"setOptions"),U=l(()=>{D(),h=structuredClone(b)},"clear"),f={getAxes:C,getCurves:q,getOptions:K,setAxes:Z,setCurves:J,setOptions:Q,getConfig:H,clear:U,setAccTitle:P,getAccTitle:E,setDiagramTitle:z,getDiagramTitle:F,getAccDescription:I,setAccDescription:S},X=l(a=>{W(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),Y={parse:l(async a=>{const t=await _("radar",a);B.debug(t),X(t)},"parse")},tt=l((a,t,e,r)=>{const s=r.db,n=s.getAxes(),o=s.getCurves(),i=s.getOptions(),c=s.getConfig(),d=s.getDiagramTitle(),g=R(t),p=et(g,c),x=i.max??Math.max(...o.map(y=>Math.max(...y.entries))),u=i.min,$=Math.min(c.width,c.height)/2;at(p,n,$,i.ticks,i.graticule),rt(p,n,$,c),M(p,n,o,u,x,i.graticule,c),A(p,o,i.showLegend,c),p.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),at=l((a,t,e,r,s)=>{if(s==="circle")for(let n=0;n<r;n++){const o=e*(n+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(s==="polygon"){const n=t.length;for(let o=0;o<r;o++){const i=e*(o+1)/r,c=t.map((d,g)=>{const p=2*g*Math.PI/n-Math.PI/2,x=i*Math.cos(p),u=i*Math.sin(p);return`${x},${u}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{const s=t.length;for(let n=0;n<s;n++){const o=t[n].label,i=2*n*Math.PI/s-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(i)).attr("y2",e*r.axisScaleFactor*Math.sin(i)).attr("class","radarAxisLine"),a.append("text").text(o).attr("x",e*r.axisLabelFactor*Math.cos(i)).attr("y",e*r.axisLabelFactor*Math.sin(i)).attr("class","radarAxisLabel")}},"drawAxes");function M(a,t,e,r,s,n,o){const i=t.length,c=Math.min(o.width,o.height)/2;e.forEach((d,g)=>{if(d.entries.length!==i)return;const p=d.entries.map((x,u)=>{const $=2*Math.PI*u/i-Math.PI/2,y=L(x,r,s,c),k=y*Math.cos($),O=y*Math.sin($);return{x:k,y:O}});n==="circle"?a.append("path").attr("d",T(p,o.curveTension)).attr("class",`radarCurve-${g}`):n==="polygon"&&a.append("polygon").attr("points",p.map(x=>`${x.x},${x.y}`).join(" ")).attr("class",`radarCurve-${g}`)})}l(M,"drawCurves");function L(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}l(L,"relativeRadius");function T(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const n=a[(s-1+e)%e],o=a[s],i=a[(s+1)%e],c=a[(s+2)%e],d={x:o.x+(i.x-n.x)*t,y:o.y+(i.y-n.y)*t},g={x:i.x-(c.x-o.x)*t,y:i.y-(c.y-o.y)*t};r+=` C${d.x},${d.y} ${g.x},${g.y} ${i.x},${i.y}`}return`${r} Z`}l(T,"closedRoundCurve");function A(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,n=-(r.height/2+r.marginTop)*3/4,o=20;t.forEach((i,c)=>{const d=a.append("g").attr("transform",`translate(${s}, ${n+c*o})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}l(A,"drawLegend");var st={draw:tt},it=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
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
		`}return e},"genIndexStyles"),nt=l(a=>{const t=V(),e=w(),r=v(t,e.themeVariables),s=v(r.radar,a);return{themeVariables:r,radarOptions:s}},"buildRadarStyleOptions"),ot=l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=nt(a);return`
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
		dominant-baseline: middle;
		text-anchor: middle;
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
	${it(t,e)}
	`},"styles"),yt={parser:Y,db:f,renderer:st,styles:ot};export{yt as diagram};
//# sourceMappingURL=diagram-QEK2KX5R-BJPdpF6D.chunk.mjs.map
