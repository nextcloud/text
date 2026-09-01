import{p as at}from"./chunk-JWPE2WC7-gKnTisy0.chunk.mjs";import{S as D,K as V,b3 as rt,g as nt,s as it,a as lt,b as st,q as ot,p as ct,_ as g,l as _,c as pt,D as ut,G as dt,a2 as gt,d as ht,r as ft,E as mt}from"./mermaid.core-Bn8hxWmN.chunk.mjs";import{p as xt}from"./cynefin-OW5HDTMX-C840eQ00.chunk.mjs";import{d as Q}from"./arc-YXcC12I_.chunk.mjs";import{o as yt}from"./ordinal-JciKjLuy.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-B7j8eIhZ.chunk.mjs";import"./index-C-Ro1b_V.chunk.mjs";import"./index-Brme_nAS.chunk.mjs";import"./init-CbUY40dC.chunk.mjs";function St(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function vt(t){return t}function wt(){var t=vt,n=St,v=null,c=D(0),p=D(V),k=D(0);function i(e){var r,s=(e=rt(e)).length,h,w,A=0,f=new Array(s),l=new Array(s),C=+c.apply(this,arguments),O=Math.min(V,Math.max(-V,p.apply(this,arguments)-C)),T,F=Math.min(Math.abs(O)/s,k.apply(this,arguments)),u=F*(O<0?-1:1),$;for(r=0;r<s;++r)($=l[f[r]=r]=+t(e[r],r,e))>0&&(A+=$);for(n!=null?f.sort(function(z,m){return n(l[z],l[m])}):v!=null&&f.sort(function(z,m){return v(e[z],e[m])}),r=0,w=A?(O-s*u)/A:0;r<s;++r,C=T)h=f[r],$=l[h],T=C+($>0?$*w:0)+u,l[h]={data:e[h],index:r,value:$,startAngle:C,endAngle:T,padAngle:F};return l}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:D(+e),i):t},i.sortValues=function(e){return arguments.length?(n=e,v=null,i):n},i.sort=function(e){return arguments.length?(v=e,n=null,i):v},i.startAngle=function(e){return arguments.length?(c=typeof e=="function"?e:D(+e),i):c},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:D(+e),i):p},i.padAngle=function(e){return arguments.length?(k=typeof e=="function"?e:D(+e),i):k},i}var $t=mt.pie,q={sections:new Map,showData:!1},E=q.sections,G=q.showData,bt=structuredClone($t),At=g(()=>structuredClone(bt),"getConfig"),Ct=g(()=>{E=new Map,G=q.showData,ft()},"clear"),Dt=g(({label:t,value:n})=>{if(n<0)throw new Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);E.has(t)||(E.set(t,n),_.debug(`added new section: ${t}, with value: ${n}`))},"addSection"),kt=g(()=>E,"getSections"),Tt=g(t=>{G=t},"setShowData"),Mt=g(()=>G,"getShowData"),U={getConfig:At,clear:Ct,setDiagramTitle:ct,getDiagramTitle:ot,setAccTitle:st,getAccTitle:lt,setAccDescription:it,getAccDescription:nt,addSection:Dt,getSections:kt,setShowData:Tt,getShowData:Mt},Ot=g((t,n)=>{at(t,n),n.setShowData(t.showData),t.sections.map(n.addSection)},"populateDb"),zt={parse:g(async t=>{const n=await xt("pie",t);_.debug(n),Ot(n,U)},"parse")},Rt=g(t=>`
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
`,"getStyles"),Ft=Rt,Ht=g(t=>{const n=[...t.values()].reduce((c,p)=>c+p,0),v=[...t.entries()].map(([c,p])=>({label:c,value:p})).filter(c=>c.value/n*100>=1);return wt().value(c=>c.value).sort(null)(v)},"createPieArcs"),Wt=g((t,n,v,c)=>{_.debug(`rendering pie chart
`+t);const p=c.db,k=pt(),i=ut(p.getConfig(),k.pie),e=40,r=18,s=4,h=450,w=h,A=dt(n),f=A.append("g");f.attr("transform","translate("+w/2+","+h/2+")");const{themeVariables:l}=k;let[C]=gt(l.pieOuterStrokeWidth);C??=2;const O=i.legendPosition,T=i.textPosition,F=i.donutHole>0&&i.donutHole<=.9?i.donutHole:0,u=Math.min(w,h)/2-e,$=Q().innerRadius(F*u).outerRadius(u),z=Q().innerRadius(u*T).outerRadius(u*T),m=f.append("g");m.append("circle").attr("cx",0).attr("cy",0).attr("r",u+C/2).attr("class","pieOuterCircle");const H=p.getSections(),X=Ht(H),Y=[l.pie1,l.pie2,l.pie3,l.pie4,l.pie5,l.pie6,l.pie7,l.pie8,l.pie9,l.pie10,l.pie11,l.pie12];let L=0;H.forEach(a=>{L+=a});const K=X.filter(a=>(a.data.value/L*100).toFixed(0)!=="0"),N=yt(Y).domain([...H.keys()]);m.selectAll("mySlices").data(K).enter().append("path").attr("d",$).attr("fill",a=>N(a.data.label)).attr("class",a=>{let o="pieCircle";return i.highlightSlice==="hover"?o+=" highlightedOnHover":i.highlightSlice===a.data.label&&(o+=" highlighted"),o}),m.selectAll("mySlices").data(K).enter().append("text").text(a=>(a.data.value/L*100).toFixed(0)+"%").attr("transform",a=>"translate("+z.centroid(a)+")").style("text-anchor","middle").attr("class","slice");const Z=f.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),R=[...H.entries()].map(([a,o])=>({label:a,value:o})),b=f.selectAll(".legend").data(R).enter().append("g").attr("class","legend");b.append("rect").attr("width",r).attr("height",r).style("fill",a=>N(a.label)).style("stroke",a=>N(a.label)),b.append("text").attr("x",r+s).attr("y",r-s).text(a=>p.getShowData()?`${a.label} [${a.value}]`:a.label);const M=Math.max(...b.selectAll("text").nodes().map(a=>a?.getBoundingClientRect().width??0));let W=h,B=w+e;const d=r+s,P=R.length*d;switch(O){case"center":b.attr("transform",(a,o)=>{const x=d*R.length/2,y=-M/2-(r+s),S=o*d-x;return"translate("+y+","+S+")"});break;case"top":W+=P,b.attr("transform",(a,o)=>{const x=u,y=-M/2-(r+s),S=o*d-x;return`translate(${y}, ${S})`}),m.attr("transform",()=>`translate(0, ${P+d})`);break;case"bottom":W+=P,b.attr("transform",(a,o)=>{const x=-u-d,y=-M/2-(r+s),S=o*d-x;return"translate("+y+","+S+")"});break;case"left":B+=r+s+M,b.attr("transform",(a,o)=>{const x=d*R.length/2,y=-u-(r+s),S=o*d-x;return"translate("+y+","+S+")"}),m.attr("transform",()=>`translate(${M+r+s}, 0)`);break;default:B+=r+s+M,b.attr("transform",(a,o)=>{const x=d*R.length/2,y=12*r,S=o*d-x;return"translate("+y+","+S+")"});break}const j=Z.node()?.getBoundingClientRect().width??0,tt=w/2-j/2,et=w/2+j/2,I=Math.min(0,tt),J=Math.max(B,et)-I;A.attr("viewBox",`${I} 0 ${J} ${W}`),ht(A,W,J,i.useMaxWidth)},"draw"),Et={draw:Wt},It={parser:zt,db:U,renderer:Et,styles:Ft};export{It as diagram};
//# sourceMappingURL=pieDiagram-E7YTZNPT-BdAvZEdi.chunk.mjs.map
