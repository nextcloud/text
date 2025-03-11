import{p as _}from"./chunk-TMUBEWPD-HyGDEovJ.chunk.mjs";import{P as w,S as O,aF as j,_ as c,g as q,s as H,a as J,b as K,o as Q,p as U,l as F,c as X,E as Y,I as Z,a4 as tt,e as et,x as at,G as rt}from"./mermaid.core-G0D9Wup2.chunk.mjs";import{p as nt}from"./gitGraph-YCYPL57B-DS8Y8PVK.chunk.mjs";import{d as E}from"./arc-BwufU16r.chunk.mjs";import{o as it}from"./ordinal-JciKjLuy.chunk.mjs";import"./modulepreload-polyfill-Cp76Uzro.chunk.mjs";import"./emoji-picker-_ZUJ6YnW.chunk.mjs";import"./index-ff0yrSz9.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-8l0cPn1o.chunk.mjs";import"./index-BS7Lr8Ce.chunk.mjs";import"./_baseUniq-DkgbkcyF.chunk.mjs";import"./_basePickBy-Bd0f7DC-.chunk.mjs";import"./clone-Dt7l6NSj.chunk.mjs";import"./init-CbUY40dC.chunk.mjs";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function st(t){return t}function lt(){var t=st,a=ot,o=null,f=w(0),g=w(O),S=w(0);function i(e){var r,l=(e=j(e)).length,u,$,h=0,p=new Array(l),n=new Array(l),x=+f.apply(this,arguments),A=Math.min(O,Math.max(-O,g.apply(this,arguments)-x)),m,D=Math.min(Math.abs(A)/l,S.apply(this,arguments)),C=D*(A<0?-1:1),d;for(r=0;r<l;++r)(d=n[p[r]=r]=+t(e[r],r,e))>0&&(h+=d);for(a!=null?p.sort(function(y,T){return a(n[y],n[T])}):o!=null&&p.sort(function(y,T){return o(e[y],e[T])}),r=0,$=h?(A-l*C)/h:0;r<l;++r,x=m)u=p[r],d=n[u],m=x+(d>0?d*$:0)+C,n[u]={data:e[u],index:r,value:d,startAngle:x,endAngle:m,padAngle:D};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,o=null,i):a},i.sort=function(e){return arguments.length?(o=e,a=null,i):o},i.startAngle=function(e){return arguments.length?(f=typeof e=="function"?e:w(+e),i):f},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:w(+e),i):g},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var pt=rt.pie,R={sections:new Map,showData:!1},M=R.sections,W=R.showData,ct=structuredClone(pt),ut=c(()=>structuredClone(ct),"getConfig"),dt=c(()=>{M=new Map,W=R.showData,at()},"clear"),gt=c(({label:t,value:a})=>{M.has(t)||(M.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),mt=c(()=>M,"getSections"),ft=c(t=>{W=t},"setShowData"),ht=c(()=>W,"getShowData"),L={getConfig:ut,clear:dt,setDiagramTitle:U,getDiagramTitle:Q,setAccTitle:K,getAccTitle:J,setAccDescription:H,getAccDescription:q,addSection:gt,getSections:mt,setShowData:ft,getShowData:ht},xt=c((t,a)=>{_(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:c(async t=>{const a=await nt("pie",t);F.debug(a),xt(a,L)},"parse")},wt=c(t=>`
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
`,"getStyles"),St=wt,$t=c(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,f)=>f.value-o.value);return lt().value(o=>o.value)(a)},"createPieArcs"),At=c((t,a,o,f)=>{F.debug(`rendering pie chart
`+t);const g=f.db,S=X(),i=Y(g.getConfig(),S.pie),e=40,r=18,l=4,u=450,$=u,h=Z(a),p=h.append("g");p.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:n}=S;let[x]=tt(n.pieOuterStrokeWidth);x??=2;const A=i.textPosition,m=Math.min($,u)/2-e,D=E().innerRadius(0).outerRadius(m),C=E().innerRadius(m*A).outerRadius(m*A);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),T=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],v=it(T);p.selectAll("mySlices").data(y).enter().append("path").attr("d",D).attr("fill",s=>v(s.data.label)).attr("class","pieCircle");let P=0;d.forEach(s=>{P+=s}),p.selectAll("mySlices").data(y).enter().append("text").text(s=>(s.data.value/P*100).toFixed(0)+"%").attr("transform",s=>"translate("+C.centroid(s)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const z=p.selectAll(".legend").data(v.domain()).enter().append("g").attr("class","legend").attr("transform",(s,b)=>{const k=r+l,V=k*v.domain().length/2,G=12*r,I=b*k-V;return"translate("+G+","+I+")"});z.append("rect").attr("width",r).attr("height",r).style("fill",v).style("stroke",v),z.data(y).append("text").attr("x",r+l).attr("y",r-l).text(s=>{const{label:b,value:k}=s.data;return g.getShowData()?`${b} [${k}]`:b});const N=Math.max(...z.selectAll("text").nodes().map(s=>s?.getBoundingClientRect().width??0)),B=$+e+r+l+N;h.attr("viewBox",`0 0 ${B} ${u}`),et(h,u,B,i.useMaxWidth)},"draw"),Tt={draw:At},Nt={parser:yt,db:L,renderer:Tt,styles:St};export{Nt as diagram};
