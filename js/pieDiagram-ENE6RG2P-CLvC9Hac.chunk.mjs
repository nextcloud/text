import{p as at}from"./chunk-JWPE2WC7-BQe18f8D.chunk.mjs";import{K as D,N as V,b5 as rt,g as nt,s as it,a as lt,b as st,p as ot,o as ct,_ as g,l as _,c as pt,B as ut,F as dt,a1 as gt,e as ht,q as ft,D as mt}from"./mermaid.core-b-iHnAEQ.chunk.mjs";import{p as xt}from"./cynefin-VYW2F7L2-WO5pYpML.chunk.mjs";import{d as Q}from"./arc-CXabKQT3.chunk.mjs";import{o as yt}from"./ordinal-JciKjLuy.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-ZXs2IwY4.chunk.mjs";import"./index-CBEmrcgU.chunk.mjs";import"./index-DOCeebGm.chunk.mjs";import"./init-CbUY40dC.chunk.mjs";function vt(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function wt(t){return t}function St(){var t=wt,n=vt,w=null,c=D(0),p=D(V),k=D(0);function i(e){var r,s=(e=rt(e)).length,h,S,A=0,f=new Array(s),l=new Array(s),C=+c.apply(this,arguments),O=Math.min(V,Math.max(-V,p.apply(this,arguments)-C)),T,F=Math.min(Math.abs(O)/s,k.apply(this,arguments)),u=F*(O<0?-1:1),$;for(r=0;r<s;++r)($=l[f[r]=r]=+t(e[r],r,e))>0&&(A+=$);for(n!=null?f.sort(function(R,m){return n(l[R],l[m])}):w!=null&&f.sort(function(R,m){return w(e[R],e[m])}),r=0,S=A?(O-s*u)/A:0;r<s;++r,C=T)h=f[r],$=l[h],T=C+($>0?$*S:0)+u,l[h]={data:e[h],index:r,value:$,startAngle:C,endAngle:T,padAngle:F};return l}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:D(+e),i):t},i.sortValues=function(e){return arguments.length?(n=e,w=null,i):n},i.sort=function(e){return arguments.length?(w=e,n=null,i):w},i.startAngle=function(e){return arguments.length?(c=typeof e=="function"?e:D(+e),i):c},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:D(+e),i):p},i.padAngle=function(e){return arguments.length?(k=typeof e=="function"?e:D(+e),i):k},i}var $t=mt.pie,q={sections:new Map,showData:!1},W=q.sections,K=q.showData,bt=structuredClone($t),At=g(()=>structuredClone(bt),"getConfig"),Ct=g(()=>{W=new Map,K=q.showData,ft()},"clear"),Dt=g(({label:t,value:n})=>{if(n<0)throw new Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);W.has(t)||(W.set(t,n),_.debug(`added new section: ${t}, with value: ${n}`))},"addSection"),kt=g(()=>W,"getSections"),Tt=g(t=>{K=t},"setShowData"),Mt=g(()=>K,"getShowData"),U={getConfig:At,clear:Ct,setDiagramTitle:ct,getDiagramTitle:ot,setAccTitle:st,getAccTitle:lt,setAccDescription:it,getAccDescription:nt,addSection:Dt,getSections:kt,setShowData:Tt,getShowData:Mt},Ot=g((t,n)=>{at(t,n),n.setShowData(t.showData),t.sections.map(n.addSection)},"populateDb"),Rt={parse:g(async t=>{const n=await xt("pie",t);_.debug(n),Ot(n,U)},"parse")},zt=g(t=>`
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
`,"getStyles"),Ft=zt,Ht=g(t=>{const n=[...t.values()].reduce((c,p)=>c+p,0),w=[...t.entries()].map(([c,p])=>({label:c,value:p})).filter(c=>c.value/n*100>=1);return St().value(c=>c.value).sort(null)(w)},"createPieArcs"),Nt=g((t,n,w,c)=>{_.debug(`rendering pie chart
`+t);const p=c.db,k=pt(),i=ut(p.getConfig(),k.pie),e=40,r=18,s=4,h=450,S=h,A=dt(n),f=A.append("g");f.attr("transform","translate("+S/2+","+h/2+")");const{themeVariables:l}=k;let[C]=gt(l.pieOuterStrokeWidth);C??=2;const O=i.legendPosition,T=i.textPosition,F=i.donutHole>0&&i.donutHole<=.9?i.donutHole:0,u=Math.min(S,h)/2-e,$=Q().innerRadius(F*u).outerRadius(u),R=Q().innerRadius(u*T).outerRadius(u*T),m=f.append("g");m.append("circle").attr("cx",0).attr("cy",0).attr("r",u+C/2).attr("class","pieOuterCircle");const H=p.getSections(),X=Ht(H),Y=[l.pie1,l.pie2,l.pie3,l.pie4,l.pie5,l.pie6,l.pie7,l.pie8,l.pie9,l.pie10,l.pie11,l.pie12];let B=0;H.forEach(a=>{B+=a});const j=X.filter(a=>(a.data.value/B*100).toFixed(0)!=="0"),E=yt(Y).domain([...H.keys()]);m.selectAll("mySlices").data(j).enter().append("path").attr("d",$).attr("fill",a=>E(a.data.label)).attr("class",a=>{let o="pieCircle";return i.highlightSlice==="hover"?o+=" highlightedOnHover":i.highlightSlice===a.data.label&&(o+=" highlighted"),o}),m.selectAll("mySlices").data(j).enter().append("text").text(a=>(a.data.value/B*100).toFixed(0)+"%").attr("transform",a=>"translate("+R.centroid(a)+")").style("text-anchor","middle").attr("class","slice");const Z=f.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),z=[...H.entries()].map(([a,o])=>({label:a,value:o})),b=f.selectAll(".legend").data(z).enter().append("g").attr("class","legend");b.append("rect").attr("width",r).attr("height",r).style("fill",a=>E(a.label)).style("stroke",a=>E(a.label)),b.append("text").attr("x",r+s).attr("y",r-s).text(a=>p.getShowData()?`${a.label} [${a.value}]`:a.label);const M=Math.max(...b.selectAll("text").nodes().map(a=>a?.getBoundingClientRect().width??0));let N=h,P=S+e;const d=r+s,L=z.length*d;switch(O){case"center":b.attr("transform",(a,o)=>{const x=d*z.length/2,y=-M/2-(r+s),v=o*d-x;return"translate("+y+","+v+")"});break;case"top":N+=L,b.attr("transform",(a,o)=>{const x=u,y=-M/2-(r+s),v=o*d-x;return`translate(${y}, ${v})`}),m.attr("transform",()=>`translate(0, ${L+d})`);break;case"bottom":N+=L,b.attr("transform",(a,o)=>{const x=-u-d,y=-M/2-(r+s),v=o*d-x;return"translate("+y+","+v+")"});break;case"left":P+=r+s+M,b.attr("transform",(a,o)=>{const x=d*z.length/2,y=-u-(r+s),v=o*d-x;return"translate("+y+","+v+")"}),m.attr("transform",()=>`translate(${M+r+s}, 0)`);break;default:P+=r+s+M,b.attr("transform",(a,o)=>{const x=d*z.length/2,y=12*r,v=o*d-x;return"translate("+y+","+v+")"});break}const G=Z.node()?.getBoundingClientRect().width??0,tt=S/2-G/2,et=S/2+G/2,I=Math.min(0,tt),J=Math.max(P,et)-I;A.attr("viewBox",`${I} 0 ${J} ${N}`),ht(A,N,J,i.useMaxWidth)},"draw"),Wt={draw:Nt},It={parser:Rt,db:U,renderer:Wt,styles:Ft};export{It as diagram};
//# sourceMappingURL=pieDiagram-ENE6RG2P-CLvC9Hac.chunk.mjs.map
