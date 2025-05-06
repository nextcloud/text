import{p as j}from"./chunk-4BMEZGHF-7J-mbmIa.chunk.mjs";import{Y as w,P as F,aF as q,E as G,o as H,p as I,s as J,g as Q,c as U,b as X,_ as u,l as O,v as Z,d as tt,F as et,K as at,a5 as rt,k as nt}from"./mermaid.core-BWjjuL6s.chunk.mjs";import{p as it}from"./radar-MK3ICKWK-DCHcoL3r.chunk.mjs";import{d as B}from"./arc-B2fr41QQ.chunk.mjs";import{o as ot}from"./ordinal-D6YK7yj2.chunk.mjs";import"./modulepreload-polyfill-DE-oIJqv.chunk.mjs";import"./emoji-picker-KVqjnXYv.chunk.mjs";import"./NcNoteCard-C6xb7vi0-D2CO5T2n.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-Dc6Ai3V6.chunk.mjs";import"./_baseUniq-D4p_eavj.chunk.mjs";import"./_basePickBy-CFvfyaXp.chunk.mjs";import"./clone-CIw9-JXK.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function st(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function pt(){var t=lt,a=st,o=null,f=w(0),g=w(F),S=w(0);function i(e){var r,l=(e=q(e)).length,p,$,h=0,c=new Array(l),n=new Array(l),x=+f.apply(this,arguments),A=Math.min(F,Math.max(-F,g.apply(this,arguments)-x)),m,D=Math.min(Math.abs(A)/l,S.apply(this,arguments)),C=D*(A<0?-1:1),d;for(r=0;r<l;++r)(d=n[c[r]=r]=+t(e[r],r,e))>0&&(h+=d);for(a!=null?c.sort(function(y,T){return a(n[y],n[T])}):o!=null&&c.sort(function(y,T){return o(e[y],e[T])}),r=0,$=h?(A-l*C)/h:0;r<l;++r,x=m)p=c[r],d=n[p],m=x+(d>0?d*$:0)+C,n[p]={data:e[p],index:r,value:d,startAngle:x,endAngle:m,padAngle:D};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,o=null,i):a},i.sort=function(e){return arguments.length?(o=e,a=null,i):o},i.startAngle=function(e){return arguments.length?(f=typeof e=="function"?e:w(+e),i):f},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:w(+e),i):g},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var L=G.pie,R={sections:new Map,showData:!1,config:L},M=R.sections,W=R.showData,ct=structuredClone(L),ut=u(()=>structuredClone(ct),"getConfig"),dt=u(()=>{M=new Map,W=R.showData,Z()},"clear"),gt=u(({label:t,value:a})=>{M.has(t)||(M.set(t,a),O.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),mt=u(()=>M,"getSections"),ft=u(t=>{W=t},"setShowData"),ht=u(()=>W,"getShowData"),N={getConfig:ut,clear:dt,setDiagramTitle:H,getDiagramTitle:I,setAccTitle:J,getAccTitle:Q,setAccDescription:U,getAccDescription:X,addSection:gt,getSections:mt,setShowData:ft,getShowData:ht},xt=u((t,a)=>{j(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:u(async t=>{const a=await it("pie",t);O.debug(a),xt(a,N)},"parse")},wt=u(t=>`
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
`,"getStyles"),St=wt,$t=u(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,f)=>f.value-o.value);return pt().value(o=>o.value)(a)},"createPieArcs"),At=u((t,a,o,f)=>{O.debug(`rendering pie chart
`+t);const g=f.db,S=tt(),i=et(g.getConfig(),S.pie),e=40,r=18,l=4,p=450,$=p,h=at(a),c=h.append("g");c.attr("transform","translate("+$/2+","+p/2+")");const{themeVariables:n}=S;let[x]=rt(n.pieOuterStrokeWidth);x??=2;const A=i.textPosition,m=Math.min($,p)/2-e,D=B().innerRadius(0).outerRadius(m),C=B().innerRadius(m*A).outerRadius(m*A);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),T=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],v=ot(T);c.selectAll("mySlices").data(y).enter().append("path").attr("d",D).attr("fill",s=>v(s.data.label)).attr("class","pieCircle");let E=0;d.forEach(s=>{E+=s}),c.selectAll("mySlices").data(y).enter().append("text").text(s=>(s.data.value/E*100).toFixed(0)+"%").attr("transform",s=>"translate("+C.centroid(s)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-(p-50)/2).attr("class","pieTitleText");const z=c.selectAll(".legend").data(v.domain()).enter().append("g").attr("class","legend").attr("transform",(s,b)=>{const k=r+l,K=k*v.domain().length/2,Y=12*r,_=b*k-K;return"translate("+Y+","+_+")"});z.append("rect").attr("width",r).attr("height",r).style("fill",v).style("stroke",v),z.data(y).append("text").attr("x",r+l).attr("y",r-l).text(s=>{const{label:b,value:k}=s.data;return g.getShowData()?`${b} [${k}]`:b});const V=Math.max(...z.selectAll("text").nodes().map(s=>s?.getBoundingClientRect().width??0)),P=$+e+r+l+V;h.attr("viewBox",`0 0 ${P} ${p}`),nt(h,p,P,i.useMaxWidth)},"draw"),Tt={draw:At},Lt={parser:yt,db:N,renderer:Tt,styles:St};export{Lt as diagram};
//# sourceMappingURL=pieDiagram-IB7DONF6-CNc6WNaD.chunk.mjs.map
