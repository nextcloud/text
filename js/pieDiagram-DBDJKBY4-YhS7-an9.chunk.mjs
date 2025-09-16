import{p as Q}from"./chunk-ANTBXLJU-CpBgT_1X.chunk.mjs";import{Q as w,T as F,aG as _,_ as u,g as j,s as I,a as J,b as U,t as X,q as Y,l as O,c as Z,F as ee,K as te,a4 as ae,e as ie,z as re,H as ne}from"./mermaid.core-DG2R2EW0.chunk.mjs";import{p as le}from"./treemap-75Q7IDZK-B06icjxN.chunk.mjs";import{d as P}from"./arc-C4X-jdR9.chunk.mjs";import{o as se}from"./ordinal-JciKjLuy.chunk.mjs";import"./index-6AQ8QgJK.chunk.mjs";import"./emoji-picker-DwlFXcXb.chunk.mjs";import"./NcLoadingIcon-DmVcM0-B.chunk.mjs";import"./vue.runtime.esm-C9BcAUzb.chunk.mjs";import"./index-CCUE3e_p.chunk.mjs";import"./_baseUniq-dvQrrmVu.chunk.mjs";import"./_basePickBy-BVUO3bTs.chunk.mjs";import"./clone-EM4nqunf.chunk.mjs";import"./init-CbUY40dC.chunk.mjs";function oe(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function pe(e){return e}function ce(){var e=pe,a=oe,f=null,s=w(0),o=w(F),y=w(0);function l(t){var r,p=(t=_(t)).length,d,v,h=0,c=new Array(p),n=new Array(p),x=+s.apply(this,arguments),S=Math.min(F,Math.max(-F,o.apply(this,arguments)-x)),m,A=Math.min(Math.abs(S)/p,y.apply(this,arguments)),T=A*(S<0?-1:1),g;for(r=0;r<p;++r)(g=n[c[r]=r]=+e(t[r],r,t))>0&&(h+=g);for(a!=null?c.sort(function($,b){return a(n[$],n[b])}):f!=null&&c.sort(function($,b){return f(t[$],t[b])}),r=0,v=h?(S-p*T)/h:0;r<p;++r,x=m)d=c[r],g=n[d],m=x+(g>0?g*v:0)+T,n[d]={data:t[d],index:r,value:g,startAngle:x,endAngle:m,padAngle:A};return n}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:w(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,f=null,l):a},l.sort=function(t){return arguments.length?(f=t,a=null,l):f},l.startAngle=function(t){return arguments.length?(s=typeof t=="function"?t:w(+t),l):s},l.endAngle=function(t){return arguments.length?(o=typeof t=="function"?t:w(+t),l):o},l.padAngle=function(t){return arguments.length?(y=typeof t=="function"?t:w(+t),l):y},l}var ue=ne.pie,R={sections:new Map,showData:!1},C=R.sections,W=R.showData,de=structuredClone(ue),ge=u(()=>structuredClone(de),"getConfig"),fe=u(()=>{C=new Map,W=R.showData,re()},"clear"),me=u(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);C.has(e)||(C.set(e,a),O.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=u(()=>C,"getSections"),xe=u(e=>{W=e},"setShowData"),we=u(()=>W,"getShowData"),V={getConfig:ge,clear:fe,setDiagramTitle:Y,getDiagramTitle:X,setAccTitle:U,getAccTitle:J,setAccDescription:I,getAccDescription:j,addSection:me,getSections:he,setShowData:xe,getShowData:we},ye=u((e,a)=>{Q(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ve={parse:u(async e=>{const a=await le("pie",e);O.debug(a),ye(a,V)},"parse")},Se=u(e=>`
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
`,"getStyles"),$e=Se,be=u(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),f=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return ce().value(s=>s.value)(f)},"createPieArcs"),Ae=u((e,a,f,s)=>{O.debug(`rendering pie chart
`+e);const o=s.db,y=Z(),l=ee(o.getConfig(),y.pie),t=40,r=18,p=4,d=450,v=d,h=te(a),c=h.append("g");c.attr("transform","translate("+v/2+","+d/2+")");const{themeVariables:n}=y;let[x]=ae(n.pieOuterStrokeWidth);x??=2;const S=l.textPosition,m=Math.min(v,d)/2-t,A=P().innerRadius(0).outerRadius(m),T=P().innerRadius(m*S).outerRadius(m*S);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const g=o.getSections(),$=be(g),b=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let D=0;g.forEach(i=>{D+=i});const E=$.filter(i=>(i.data.value/D*100).toFixed(0)!=="0"),k=se(b);c.selectAll("mySlices").data(E).enter().append("path").attr("d",A).attr("fill",i=>k(i.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(E).enter().append("text").text(i=>(i.data.value/D*100).toFixed(0)+"%").attr("transform",i=>"translate("+T.centroid(i)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const N=[...g.entries()].map(([i,z])=>({label:i,value:z})),M=c.selectAll(".legend").data(N).enter().append("g").attr("class","legend").attr("transform",(i,z)=>{const L=r+p,G=L*N.length/2,H=12*r,K=z*L-G;return"translate("+H+","+K+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",i=>k(i.label)).style("stroke",i=>k(i.label)),M.append("text").attr("x",r+p).attr("y",r-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const q=Math.max(...M.selectAll("text").nodes().map(i=>i?.getBoundingClientRect().width??0)),B=v+t+r+p+q;h.attr("viewBox",`0 0 ${B} ${d}`),ie(h,d,B,l.useMaxWidth)},"draw"),Te={draw:Ae},Ve={parser:ve,db:V,renderer:Te,styles:$e};export{Ve as diagram};
//# sourceMappingURL=pieDiagram-DBDJKBY4-YhS7-an9.chunk.mjs.map
