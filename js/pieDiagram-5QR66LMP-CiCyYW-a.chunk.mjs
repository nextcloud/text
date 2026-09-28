import{p as at}from"./chunk-JWPE2WC7-D2oKtA02.chunk.mjs";import{Y as k,a0 as V,ba as rt,g as nt,s as it,a as lt,b as st,x as ot,v as ct,_ as g,l as _,c as pt,P as ut,S as dt,ab as gt,d as ht,B as ft,Q as mt}from"./mermaid.core-DBYU2PQw.chunk.mjs";import{p as xt}from"./cynefin-OW5HDTMX-EY9C_xRv.chunk.mjs";import{d as J}from"./arc-DkTTgf5k.chunk.mjs";import{o as yt}from"./ordinal-JciKjLuy.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-BikBK45S.chunk.mjs";import"./translation-DoG5ZELJ-4xoO832j.chunk.mjs";import"./index-f9-cnZbc.chunk.mjs";import"./init-CbUY40dC.chunk.mjs";function vt(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function St(t){return t}function wt(){var t=St,n=vt,S=null,c=k(0),p=k(V),D=k(0);function i(e){var r,s=(e=rt(e)).length,h,w,A=0,f=new Array(s),l=new Array(s),C=+c.apply(this,arguments),O=Math.min(V,Math.max(-V,p.apply(this,arguments)-C)),T,H=Math.min(Math.abs(O)/s,D.apply(this,arguments)),u=H*(O<0?-1:1),$;for(r=0;r<s;++r)($=l[f[r]=r]=+t(e[r],r,e))>0&&(A+=$);for(n!=null?f.sort(function(z,m){return n(l[z],l[m])}):S!=null&&f.sort(function(z,m){return S(e[z],e[m])}),r=0,w=A?(O-s*u)/A:0;r<s;++r,C=T)h=f[r],$=l[h],T=C+($>0?$*w:0)+u,l[h]={data:e[h],index:r,value:$,startAngle:C,endAngle:T,padAngle:H};return l}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:k(+e),i):t},i.sortValues=function(e){return arguments.length?(n=e,S=null,i):n},i.sort=function(e){return arguments.length?(S=e,n=null,i):S},i.startAngle=function(e){return arguments.length?(c=typeof e=="function"?e:k(+e),i):c},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:k(+e),i):p},i.padAngle=function(e){return arguments.length?(D=typeof e=="function"?e:k(+e),i):D},i}var $t=mt.pie,Q={sections:new Map,showData:!1},W=Q.sections,Y=Q.showData,bt=structuredClone($t),At=g(()=>structuredClone(bt),"getConfig"),Ct=g(()=>{W=new Map,Y=Q.showData,ft()},"clear"),kt=g(({label:t,value:n})=>{if(n<0)throw new Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);W.has(t)||(W.set(t,n),_.debug(`added new section: ${t}, with value: ${n}`))},"addSection"),Dt=g(()=>W,"getSections"),Tt=g(t=>{Y=t},"setShowData"),Mt=g(()=>Y,"getShowData"),K={getConfig:At,clear:Ct,setDiagramTitle:ct,getDiagramTitle:ot,setAccTitle:st,getAccTitle:lt,setAccDescription:it,getAccDescription:nt,addSection:kt,getSections:Dt,setShowData:Tt,getShowData:Mt},Ot=g((t,n)=>{at(t,n),n.setShowData(t.showData),t.sections.map(n.addSection)},"populateDb"),zt={parse:g(async t=>{const n=await xt("pie",t);_.debug(n),Ot(n,K)},"parse")},Rt=g(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),Ht=Rt,Ft=g(t=>{const n=[...t.values()].reduce((c,p)=>c+p,0),S=[...t.entries()].map(([c,p])=>({label:c,value:p})).filter(c=>c.value/n*100>=1);return wt().value(c=>c.value).sort(null)(S)},"createPieArcs"),Pt=g((t,n,S,c)=>{_.debug(`rendering pie chart
`+t);const p=c.db,D=pt(),i=ut(p.getConfig(),D.pie),e=40,r=18,s=4,h=450,w=h,A=dt(n),f=A.append("g");f.attr("transform","translate("+w/2+","+h/2+")");const{themeVariables:l}=D;let[C]=gt(l.pieOuterStrokeWidth);C??=2;const O=i.legendPosition,T=i.textPosition,H=i.donutHole>0&&i.donutHole<=.9?i.donutHole:0,u=Math.min(w,h)/2-e,$=J().innerRadius(H*u).outerRadius(u),z=J().innerRadius(u*T).outerRadius(u*T),m=f.append("g");m.append("circle").attr("cx",0).attr("cy",0).attr("r",u+C/2).attr("class","pieOuterCircle");const F=p.getSections(),U=Ft(F),X=[l.pie1,l.pie2,l.pie3,l.pie4,l.pie5,l.pie6,l.pie7,l.pie8,l.pie9,l.pie10,l.pie11,l.pie12];let B=0;F.forEach(a=>{B+=a});const j=U.filter(a=>(a.data.value/B*100).toFixed(0)!=="0"),E=yt(X).domain([...F.keys()]);m.selectAll("mySlices").data(j).enter().append("path").attr("d",$).attr("fill",a=>E(a.data.label)).attr("class",a=>{let o="pieCircle";return i.highlightSlice==="hover"?o+=" highlightedOnHover":i.highlightSlice===a.data.label&&(o+=" highlighted"),o}),m.selectAll("mySlices").data(j).enter().append("text").text(a=>(a.data.value/B*100).toFixed(0)+"%").attr("transform",a=>"translate("+z.centroid(a)+")").style("text-anchor","middle").attr("class","slice");const Z=f.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),R=[...F.entries()].map(([a,o])=>({label:a,value:o})),b=f.selectAll(".legend").data(R).enter().append("g").attr("class","legend");b.append("rect").attr("width",r).attr("height",r).style("fill",a=>E(a.label)).style("stroke",a=>E(a.label)),b.append("text").attr("x",r+s).attr("y",r-s).text(a=>p.getShowData()?`${a.label} [${a.value}]`:a.label);const M=Math.max(...b.selectAll("text").nodes().map(a=>a?.getBoundingClientRect().width??0));let P=h,L=w+e;const d=r+s,N=R.length*d;switch(O){case"center":b.attr("transform",(a,o)=>{const x=d*R.length/2,y=-M/2-(r+s),v=o*d-x;return"translate("+y+","+v+")"});break;case"top":P+=N,b.attr("transform",(a,o)=>{const x=u,y=-M/2-(r+s),v=o*d-x;return`translate(${y}, ${v})`}),m.attr("transform",()=>`translate(0, ${N+d})`);break;case"bottom":P+=N,b.attr("transform",(a,o)=>{const x=-u-d,y=-M/2-(r+s),v=o*d-x;return"translate("+y+","+v+")"});break;case"left":L+=r+s+M,b.attr("transform",(a,o)=>{const x=d*R.length/2,y=-u-(r+s),v=o*d-x;return"translate("+y+","+v+")"}),m.attr("transform",()=>`translate(${M+r+s}, 0)`);break;default:L+=r+s+M,b.attr("transform",(a,o)=>{const x=d*R.length/2,y=12*r,v=o*d-x;return"translate("+y+","+v+")"});break}const q=Z.node()?.getBoundingClientRect().width??0,tt=w/2-q/2,et=w/2+q/2,G=Math.min(0,tt),I=Math.max(L,et)-G;A.attr("viewBox",`${G} 0 ${I} ${P}`),ht(A,P,I,i.useMaxWidth)},"draw"),Wt={draw:Pt},Gt={parser:zt,db:K,renderer:Wt,styles:Ht};export{Gt as diagram};
//# sourceMappingURL=pieDiagram-5QR66LMP-CiCyYW-a.chunk.mjs.map
