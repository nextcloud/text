import{p as _}from"./chunk-44GW5IO5-H7ofJWox.chunk.mjs";import{Y as w,P as O,aG as j,E as q,o as H,p as I,s as J,g as Q,c as U,b as X,_ as u,l as F,v as Z,d as tt,F as et,K as at,a6 as nt,k as rt}from"./mermaid.core-DbXixP4-.chunk.mjs";import{p as it}from"./radar-VG2SY3DT-5H18Pvli.chunk.mjs";import{d as B}from"./arc-B7SkWO2v.chunk.mjs";import{o as ot}from"./ordinal-D6YK7yj2.chunk.mjs";import"./modulepreload-polyfill-BbX-W30F.chunk.mjs";import"./emoji-picker-DlAAdvrL.chunk.mjs";import"./NcLoadingIcon-BcbRVau3.chunk.mjs";import"./vue.runtime.esm-Ccc28AWB.chunk.mjs";import"./_baseUniq-D0mPe9wG.chunk.mjs";import"./_basePickBy-BbISpdT7.chunk.mjs";import"./clone-CxOK007V.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function st(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function pt(){var t=lt,a=st,o=null,f=w(0),g=w(O),S=w(0);function i(e){var n,l=(e=j(e)).length,p,$,h=0,c=new Array(l),r=new Array(l),x=+f.apply(this,arguments),A=Math.min(O,Math.max(-O,g.apply(this,arguments)-x)),m,D=Math.min(Math.abs(A)/l,S.apply(this,arguments)),C=D*(A<0?-1:1),d;for(n=0;n<l;++n)(d=r[c[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?c.sort(function(y,T){return a(r[y],r[T])}):o!=null&&c.sort(function(y,T){return o(e[y],e[T])}),n=0,$=h?(A-l*C)/h:0;n<l;++n,x=m)p=c[n],d=r[p],m=x+(d>0?d*$:0)+C,r[p]={data:e[p],index:n,value:d,startAngle:x,endAngle:m,padAngle:D};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,o=null,i):a},i.sort=function(e){return arguments.length?(o=e,a=null,i):o},i.startAngle=function(e){return arguments.length?(f=typeof e=="function"?e:w(+e),i):f},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:w(+e),i):g},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var L=q.pie,R={sections:new Map,showData:!1,config:L},M=R.sections,W=R.showData,ct=structuredClone(L),ut=u(()=>structuredClone(ct),"getConfig"),dt=u(()=>{M=new Map,W=R.showData,Z()},"clear"),gt=u(({label:t,value:a})=>{M.has(t)||(M.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),mt=u(()=>M,"getSections"),ft=u(t=>{W=t},"setShowData"),ht=u(()=>W,"getShowData"),N={getConfig:ut,clear:dt,setDiagramTitle:H,getDiagramTitle:I,setAccTitle:J,getAccTitle:Q,setAccDescription:U,getAccDescription:X,addSection:gt,getSections:mt,setShowData:ft,getShowData:ht},xt=u((t,a)=>{_(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:u(async t=>{const a=await it("pie",t);F.debug(a),xt(a,N)},"parse")},wt=u(t=>`
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
`,"getStyles"),St=wt,$t=u(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,f)=>f.value-o.value);return pt().value(o=>o.value)(a)},"createPieArcs"),At=u((t,a,o,f)=>{F.debug(`rendering pie chart
`+t);const g=f.db,S=tt(),i=et(g.getConfig(),S.pie),e=40,n=18,l=4,p=450,$=p,h=at(a),c=h.append("g");c.attr("transform","translate("+$/2+","+p/2+")");const{themeVariables:r}=S;let[x]=nt(r.pieOuterStrokeWidth);x??=2;const A=i.textPosition,m=Math.min($,p)/2-e,D=B().innerRadius(0).outerRadius(m),C=B().innerRadius(m*A).outerRadius(m*A);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),T=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],v=ot(T);c.selectAll("mySlices").data(y).enter().append("path").attr("d",D).attr("fill",s=>v(s.data.label)).attr("class","pieCircle");let E=0;d.forEach(s=>{E+=s}),c.selectAll("mySlices").data(y).enter().append("text").text(s=>(s.data.value/E*100).toFixed(0)+"%").attr("transform",s=>"translate("+C.centroid(s)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-(p-50)/2).attr("class","pieTitleText");const z=c.selectAll(".legend").data(v.domain()).enter().append("g").attr("class","legend").attr("transform",(s,b)=>{const k=n+l,G=k*v.domain().length/2,K=12*n,Y=b*k-G;return"translate("+K+","+Y+")"});z.append("rect").attr("width",n).attr("height",n).style("fill",v).style("stroke",v),z.data(y).append("text").attr("x",n+l).attr("y",n-l).text(s=>{const{label:b,value:k}=s.data;return g.getShowData()?`${b} [${k}]`:b});const V=Math.max(...z.selectAll("text").nodes().map(s=>s?.getBoundingClientRect().width??0)),P=$+e+n+l+V;h.attr("viewBox",`0 0 ${P} ${p}`),rt(h,p,P,i.useMaxWidth)},"draw"),Tt={draw:At},Bt={parser:yt,db:N,renderer:Tt,styles:St};export{Bt as diagram};
//# sourceMappingURL=pieDiagram-JVH3GP2A-1zk5yHnv.chunk.mjs.map
