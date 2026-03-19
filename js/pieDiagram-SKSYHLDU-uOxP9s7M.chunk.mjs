import{P as w,S as F,aJ as _,g as j,s as H,a as I,b as Q,t as U,q as X,_ as u,l as O,c as Y,F as Z,K as tt,a3 as et,e as at,z as it,G as rt}from"./mermaid.core-DhiqKW_q.chunk.mjs";import{p as nt}from"./chunk-4BX2VUAB-Bil5W4nb.chunk.mjs";import{p as lt}from"./treemap-KZPCXAKY-X5SYK6pE.chunk.mjs";import{d as L}from"./arc-BN3bMkRm.chunk.mjs";import{o as st}from"./ordinal-D6YK7yj2.chunk.mjs";import"./index-fJgS8Kyx.chunk.mjs";import"./emoji-picker-B23JpFV7.chunk.mjs";import"./NcLoadingIcon-DOhEMAAY.chunk.mjs";import"./vue.runtime.esm-BeQ812EV.chunk.mjs";import"./index-DxwFe63_.chunk.mjs";import"./_baseUniq-zUiop0Bj.chunk.mjs";import"./_basePickBy-DuvlzbX0.chunk.mjs";import"./clone-B3RW_RrR.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function pt(t){return t}function ct(){var t=pt,a=ot,f=null,s=w(0),o=w(F),y=w(0);function l(e){var r,p=(e=_(e)).length,d,S,h=0,c=new Array(p),n=new Array(p),x=+s.apply(this,arguments),v=Math.min(F,Math.max(-F,o.apply(this,arguments)-x)),m,A=Math.min(Math.abs(v)/p,y.apply(this,arguments)),T=A*(v<0?-1:1),g;for(r=0;r<p;++r)(g=n[c[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?c.sort(function($,b){return a(n[$],n[b])}):f!=null&&c.sort(function($,b){return f(e[$],e[b])}),r=0,S=h?(v-p*T)/h:0;r<p;++r,x=m)d=c[r],g=n[d],m=x+(g>0?g*S:0)+T,n[d]={data:e[d],index:r,value:g,startAngle:x,endAngle:m,padAngle:A};return n}return l.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),l):t},l.sortValues=function(e){return arguments.length?(a=e,f=null,l):a},l.sort=function(e){return arguments.length?(f=e,a=null,l):f},l.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:w(+e),l):s},l.endAngle=function(e){return arguments.length?(o=typeof e=="function"?e:w(+e),l):o},l.padAngle=function(e){return arguments.length?(y=typeof e=="function"?e:w(+e),l):y},l}var ut=rt.pie,R={sections:new Map,showData:!1},C=R.sections,W=R.showData,dt=structuredClone(ut),gt=u(()=>structuredClone(dt),"getConfig"),ft=u(()=>{C=new Map,W=R.showData,it()},"clear"),mt=u(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(t)||(C.set(t,a),O.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ht=u(()=>C,"getSections"),xt=u(t=>{W=t},"setShowData"),wt=u(()=>W,"getShowData"),V={getConfig:gt,clear:ft,setDiagramTitle:X,getDiagramTitle:U,setAccTitle:Q,getAccTitle:I,setAccDescription:H,getAccDescription:j,addSection:mt,getSections:ht,setShowData:xt,getShowData:wt},yt=u((t,a)=>{nt(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:u(async t=>{const a=await lt("pie",t);O.debug(a),yt(a,V)},"parse")},vt=u(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
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
`,"getStyles"),$t=vt,bt=u(t=>{const a=[...t.values()].reduce((s,o)=>s+o,0),f=[...t.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ct().value(s=>s.value)(f)},"createPieArcs"),At=u((t,a,f,s)=>{O.debug(`rendering pie chart
`+t);const o=s.db,y=Y(),l=Z(o.getConfig(),y.pie),e=40,r=18,p=4,d=450,S=d,h=tt(a),c=h.append("g");c.attr("transform","translate("+S/2+","+d/2+")");const{themeVariables:n}=y;let[x]=et(n.pieOuterStrokeWidth);x??=2;const v=l.textPosition,m=Math.min(S,d)/2-e,A=L().innerRadius(0).outerRadius(m),T=L().innerRadius(m*v).outerRadius(m*v);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const g=o.getSections(),$=bt(g),b=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let D=0;g.forEach(i=>{D+=i});const E=$.filter(i=>(i.data.value/D*100).toFixed(0)!=="0"),k=st(b);c.selectAll("mySlices").data(E).enter().append("path").attr("d",A).attr("fill",i=>k(i.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(E).enter().append("text").text(i=>(i.data.value/D*100).toFixed(0)+"%").attr("transform",i=>"translate("+T.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const N=[...g.entries()].map(([i,z])=>({label:i,value:z})),M=c.selectAll(".legend").data(N).enter().append("g").attr("class","legend").attr("transform",(i,z)=>{const B=r+p,G=B*N.length/2,J=12*r,K=z*B-G;return"translate("+J+","+K+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",i=>k(i.label)).style("stroke",i=>k(i.label)),M.append("text").attr("x",r+p).attr("y",r-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const q=Math.max(...M.selectAll("text").nodes().map(i=>i?.getBoundingClientRect().width??0)),P=S+e+r+p+q;h.attr("viewBox",`0 0 ${P} ${d}`),at(h,d,P,l.useMaxWidth)},"draw"),Tt={draw:At},Vt={parser:St,db:V,renderer:Tt,styles:$t};export{Vt as diagram};
//# sourceMappingURL=pieDiagram-SKSYHLDU-uOxP9s7M.chunk.mjs.map
