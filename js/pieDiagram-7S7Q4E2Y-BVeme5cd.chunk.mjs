import{p as at}from"./chunk-JWPE2WC7-pzd8iDBU.chunk.mjs";import{K as D,N as V,b5 as rt,g as nt,s as it,a as lt,b as ot,p as st,o as ct,_ as g,l as _,c as pt,B as ut,F as dt,a1 as gt,e as ht,q as ft,D as mt}from"./mermaid.core-DOZmHtHV.chunk.mjs";import{p as xt}from"./cynefin-VYW2F7L2-Cb5rAn7o.chunk.mjs";import{d as Q}from"./arc-Bbt5ZHQ0.chunk.mjs";import{o as yt}from"./ordinal-D6YK7yj2.chunk.mjs";import"./preload-helper-BorfeO-5.chunk.mjs";import"./emoji-picker-C0wQOMkK.chunk.mjs";import"./index-PcEIWssB.chunk.mjs";import"./vue.runtime.esm-CbNPNm8f.chunk.mjs";import"./index-BBRfwPzy.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function wt(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function St(t){return t}function vt(){var t=St,n=wt,S=null,c=D(0),p=D(V),k=D(0);function i(e){var r,o=(e=rt(e)).length,h,v,A=0,f=new Array(o),l=new Array(o),C=+c.apply(this,arguments),O=Math.min(V,Math.max(-V,p.apply(this,arguments)-C)),T,F=Math.min(Math.abs(O)/o,k.apply(this,arguments)),u=F*(O<0?-1:1),$;for(r=0;r<o;++r)($=l[f[r]=r]=+t(e[r],r,e))>0&&(A+=$);for(n!=null?f.sort(function(R,m){return n(l[R],l[m])}):S!=null&&f.sort(function(R,m){return S(e[R],e[m])}),r=0,v=A?(O-o*u)/A:0;r<o;++r,C=T)h=f[r],$=l[h],T=C+($>0?$*v:0)+u,l[h]={data:e[h],index:r,value:$,startAngle:C,endAngle:T,padAngle:F};return l}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:D(+e),i):t},i.sortValues=function(e){return arguments.length?(n=e,S=null,i):n},i.sort=function(e){return arguments.length?(S=e,n=null,i):S},i.startAngle=function(e){return arguments.length?(c=typeof e=="function"?e:D(+e),i):c},i.endAngle=function(e){return arguments.length?(p=typeof e=="function"?e:D(+e),i):p},i.padAngle=function(e){return arguments.length?(k=typeof e=="function"?e:D(+e),i):k},i}var $t=mt.pie,q={sections:new Map,showData:!1},W=q.sections,K=q.showData,bt=structuredClone($t),At=g(()=>structuredClone(bt),"getConfig"),Ct=g(()=>{W=new Map,K=q.showData,ft()},"clear"),Dt=g(({label:t,value:n})=>{if(n<0)throw new Error(`"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);W.has(t)||(W.set(t,n),_.debug(`added new section: ${t}, with value: ${n}`))},"addSection"),kt=g(()=>W,"getSections"),Tt=g(t=>{K=t},"setShowData"),Mt=g(()=>K,"getShowData"),U={getConfig:At,clear:Ct,setDiagramTitle:ct,getDiagramTitle:st,setAccTitle:ot,getAccTitle:lt,setAccDescription:it,getAccDescription:nt,addSection:Dt,getSections:kt,setShowData:Tt,getShowData:Mt},Ot=g((t,n)=>{at(t,n),n.setShowData(t.showData),t.sections.map(n.addSection)},"populateDb"),Rt={parse:g(async t=>{const n=await xt("pie",t);_.debug(n),Ot(n,U)},"parse")},zt=g(t=>`
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
`,"getStyles"),Ft=zt,Ht=g(t=>{const n=[...t.values()].reduce((c,p)=>c+p,0),S=[...t.entries()].map(([c,p])=>({label:c,value:p})).filter(c=>c.value/n*100>=1);return vt().value(c=>c.value).sort(null)(S)},"createPieArcs"),Nt=g((t,n,S,c)=>{_.debug(`rendering pie chart
`+t);const p=c.db,k=pt(),i=ut(p.getConfig(),k.pie),e=40,r=18,o=4,h=450,v=h,A=dt(n),f=A.append("g");f.attr("transform","translate("+v/2+","+h/2+")");const{themeVariables:l}=k;let[C]=gt(l.pieOuterStrokeWidth);C??=2;const O=i.legendPosition,T=i.textPosition,F=i.donutHole>0&&i.donutHole<=.9?i.donutHole:0,u=Math.min(v,h)/2-e,$=Q().innerRadius(F*u).outerRadius(u),R=Q().innerRadius(u*T).outerRadius(u*T),m=f.append("g");m.append("circle").attr("cx",0).attr("cy",0).attr("r",u+C/2).attr("class","pieOuterCircle");const H=p.getSections(),X=Ht(H),Y=[l.pie1,l.pie2,l.pie3,l.pie4,l.pie5,l.pie6,l.pie7,l.pie8,l.pie9,l.pie10,l.pie11,l.pie12];let B=0;H.forEach(a=>{B+=a});const j=X.filter(a=>(a.data.value/B*100).toFixed(0)!=="0"),E=yt(Y).domain([...H.keys()]);m.selectAll("mySlices").data(j).enter().append("path").attr("d",$).attr("fill",a=>E(a.data.label)).attr("class",a=>{let s="pieCircle";return i.highlightSlice==="hover"?s+=" highlightedOnHover":i.highlightSlice===a.data.label&&(s+=" highlighted"),s}),m.selectAll("mySlices").data(j).enter().append("text").text(a=>(a.data.value/B*100).toFixed(0)+"%").attr("transform",a=>"translate("+R.centroid(a)+")").style("text-anchor","middle").attr("class","slice");const Z=f.append("text").text(p.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),z=[...H.entries()].map(([a,s])=>({label:a,value:s})),b=f.selectAll(".legend").data(z).enter().append("g").attr("class","legend");b.append("rect").attr("width",r).attr("height",r).style("fill",a=>E(a.label)).style("stroke",a=>E(a.label)),b.append("text").attr("x",r+o).attr("y",r-o).text(a=>p.getShowData()?`${a.label} [${a.value}]`:a.label);const M=Math.max(...b.selectAll("text").nodes().map(a=>a?.getBoundingClientRect().width??0));let N=h,P=v+e;const d=r+o,L=z.length*d;switch(O){case"center":b.attr("transform",(a,s)=>{const x=d*z.length/2,y=-M/2-(r+o),w=s*d-x;return"translate("+y+","+w+")"});break;case"top":N+=L,b.attr("transform",(a,s)=>{const x=u,y=-M/2-(r+o),w=s*d-x;return`translate(${y}, ${w})`}),m.attr("transform",()=>`translate(0, ${L+d})`);break;case"bottom":N+=L,b.attr("transform",(a,s)=>{const x=-u-d,y=-M/2-(r+o),w=s*d-x;return"translate("+y+","+w+")"});break;case"left":P+=r+o+M,b.attr("transform",(a,s)=>{const x=d*z.length/2,y=-u-(r+o),w=s*d-x;return"translate("+y+","+w+")"}),m.attr("transform",()=>`translate(${M+r+o}, 0)`);break;default:P+=r+o+M,b.attr("transform",(a,s)=>{const x=d*z.length/2,y=12*r,w=s*d-x;return"translate("+y+","+w+")"});break}const G=Z.node()?.getBoundingClientRect().width??0,tt=v/2-G/2,et=v/2+G/2,I=Math.min(0,tt),J=Math.max(P,et)-I;A.attr("viewBox",`${I} 0 ${J} ${N}`),ht(A,N,J,i.useMaxWidth)},"draw"),Wt={draw:Nt},Jt={parser:Rt,db:U,renderer:Wt,styles:Ft};export{Jt as diagram};
//# sourceMappingURL=pieDiagram-7S7Q4E2Y-BVeme5cd.chunk.mjs.map
