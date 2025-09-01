import{p as q}from"./chunk-ANTBXLJU-Bv2UPlGM.chunk.mjs";import{Y as w,P as F,aG as H,E as I,o as J,p as Q,s as U,g as X,c as Z,b as ee,_ as d,l as O,v as te,d as ae,F as ie,K as re,a6 as ne,k as le}from"./mermaid.core-Bw7cE4CL.chunk.mjs";import{p as se}from"./treemap-75Q7IDZK-BlsNdDTT.chunk.mjs";import{d as L}from"./arc-DayWEsmZ.chunk.mjs";import{o as oe}from"./ordinal-D6YK7yj2.chunk.mjs";import"./modulepreload-polyfill-wXdbfrnd.chunk.mjs";import"./emoji-picker-DlAAdvrL.chunk.mjs";import"./NcLoadingIcon-CHw5fok5.chunk.mjs";import"./vue.runtime.esm-C7aVrvtW.chunk.mjs";import"./_baseUniq-DLAOpsNv.chunk.mjs";import"./_basePickBy-FaCzfhvn.chunk.mjs";import"./clone-DY3nhMaR.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function pe(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function ue(){var e=ce,a=pe,f=null,s=w(0),o=w(F),y=w(0);function l(t){var r,p=(t=H(t)).length,c,v,h=0,u=new Array(p),n=new Array(p),x=+s.apply(this,arguments),S=Math.min(F,Math.max(-F,o.apply(this,arguments)-x)),m,A=Math.min(Math.abs(S)/p,y.apply(this,arguments)),T=A*(S<0?-1:1),g;for(r=0;r<p;++r)(g=n[u[r]=r]=+e(t[r],r,t))>0&&(h+=g);for(a!=null?u.sort(function($,b){return a(n[$],n[b])}):f!=null&&u.sort(function($,b){return f(t[$],t[b])}),r=0,v=h?(S-p*T)/h:0;r<p;++r,x=m)c=u[r],g=n[c],m=x+(g>0?g*v:0)+T,n[c]={data:t[c],index:r,value:g,startAngle:x,endAngle:m,padAngle:A};return n}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,f=null,l):a},l.sort=function(t){return arguments.length?(f=t,a=null,l):f},l.startAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var V=I.pie,R={sections:new Map,showData:!1,config:V},C=R.sections,E=R.showData,de=structuredClone(V),ge=d(()=>structuredClone(de),"getConfig"),fe=d(()=>{C=new Map,E=R.showData,te()},"clear"),me=d(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(e)||(C.set(e,a),O.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=d(()=>C,"getSections"),xe=d(e=>{E=e},"setShowData"),we=d(()=>E,"getShowData"),G={getConfig:ge,clear:fe,setDiagramTitle:J,getDiagramTitle:Q,setAccTitle:U,getAccTitle:X,setAccDescription:Z,getAccDescription:ee,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=d((e,a)=>{q(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ve={parse:d(async e=>{const a=await se("pie",e);O.debug(a),ye(a,G)},"parse")},Se=d(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),$e=Se,be=d(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),f=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ue().value(s=>s.value)(f)},"createPieArcs"),Ae=d((e,a,f,s)=>{O.debug(`rendering pie chart
`+e);const o=s.db,y=ae(),l=ie(o.getConfig(),y.pie),t=40,r=18,p=4,c=450,v=c,h=re(a),u=h.append("g");u.attr("transform","translate("+v/2+","+c/2+")");const{themeVariables:n}=y;let[x]=ne(n.pieOuterStrokeWidth);x??=2;const S=l.textPosition,m=Math.min(v,c)/2-t,A=L().innerRadius(0).outerRadius(m),T=L().innerRadius(m*S).outerRadius(m*S);u.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const g=o.getSections(),$=be(g),b=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let D=0;g.forEach(i=>{D+=i});const W=$.filter(i=>(i.data.value/D*100).toFixed(0)!=="0"),k=oe(b);u.selectAll("mySlices").data(W).enter().append("path").attr("d",A).attr("fill",i=>k(i.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(W).enter().append("text").text(i=>(i.data.value/D*100).toFixed(0)+"%").attr("transform",i=>"translate("+T.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const N=[...g.entries()].map(([i,z])=>({label:i,value:z})),M=u.selectAll(".legend").data(N).enter().append("g").attr("class","legend").attr("transform",(i,z)=>{const B=r+p,Y=B*N.length/2,_=12*r,j=z*B-Y;return"translate("+_+","+j+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",i=>k(i.label)).style("stroke",i=>k(i.label)),M.append("text").attr("x",r+p).attr("y",r-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const K=Math.max(...M.selectAll("text").nodes().map(i=>i?.getBoundingClientRect().width??0)),P=v+t+r+p+K;h.attr("viewBox",`0 0 ${P} ${c}`),le(h,c,P,l.useMaxWidth)},"draw"),Te={draw:Ae},Le={parser:ve,db:G,renderer:Te,styles:$e};export{Le as diagram};
//# sourceMappingURL=pieDiagram-DBDJKBY4-OfGKzsTd.chunk.mjs.map
