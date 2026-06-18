import{P as y,S as R,b2 as X,g as Y,s as Z,a as tt,b as et,t as at,q as it,_ as d,l as F,c as nt,G as rt,K as lt,a3 as st,e as ot,z as pt,H as ct}from"./mermaid.core-BCNL4ZWL.chunk.mjs";import{p as ut}from"./chunk-4BX2VUAB-C1MBCHbb.chunk.mjs";import{p as dt}from"./wardley-L42UT6IY-D0fW4j2X.chunk.mjs";import{d as V}from"./arc-8fm5R8Fc.chunk.mjs";import{o as gt}from"./ordinal-D6YK7yj2.chunk.mjs";import"./preload-helper-BorfeO-5.chunk.mjs";import"./emoji-picker-C0wQOMkK.chunk.mjs";import"./NcLoadingIcon-CVPmhDs9.chunk.mjs";import"./vue.runtime.esm-BF-IvmLA.chunk.mjs";import"./index-BBRfwPzy.chunk.mjs";import"./init-CLzSasj9.chunk.mjs";function ft(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function mt(t){return t}function ht(){var t=mt,a=ft,f=null,s=y(0),o=y(R),S=y(0);function l(e){var n,p=(e=X(e)).length,g,m,x=0,c=new Array(p),r=new Array(p),w=+s.apply(this,arguments),$=Math.min(R,Math.max(-R,o.apply(this,arguments)-w)),h,A=Math.min(Math.abs($)/p,S.apply(this,arguments)),D=A*($<0?-1:1),u;for(n=0;n<p;++n)(u=r[c[n]=n]=+t(e[n],n,e))>0&&(x+=u);for(a!=null?c.sort(function(v,b){return a(r[v],r[b])}):f!=null&&c.sort(function(v,b){return f(e[v],e[b])}),n=0,m=x?($-p*D)/x:0;n<p;++n,w=h)g=c[n],u=r[g],h=w+(u>0?u*m:0)+D,r[g]={data:e[g],index:n,value:u,startAngle:w,endAngle:h,padAngle:A};return r}return l.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),l):t},l.sortValues=function(e){return arguments.length?(a=e,f=null,l):a},l.sort=function(e){return arguments.length?(f=e,a=null,l):f},l.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:y(+e),l):s},l.endAngle=function(e){return arguments.length?(o=typeof e=="function"?e:y(+e),l):o},l.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:y(+e),l):S},l}var xt=ct.pie,O={sections:new Map,showData:!1},T=O.sections,W=O.showData,wt=structuredClone(xt),yt=d(()=>structuredClone(wt),"getConfig"),St=d(()=>{T=new Map,W=O.showData,pt()},"clear"),$t=d(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),vt=d(()=>T,"getSections"),bt=d(t=>{W=t},"setShowData"),At=d(()=>W,"getShowData"),q={getConfig:yt,clear:St,setDiagramTitle:it,getDiagramTitle:at,setAccTitle:et,getAccTitle:tt,setAccDescription:Z,getAccDescription:Y,addSection:$t,getSections:vt,setShowData:bt,getShowData:At},Dt=d((t,a)=>{ut(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),Tt={parse:d(async t=>{const a=await dt("pie",t);F.debug(a),Dt(a,q)},"parse")},Ct=d(t=>`
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
`,"getStyles"),kt=Ct,Mt=d(t=>{const a=[...t.values()].reduce((s,o)=>s+o,0),f=[...t.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1);return ht().value(s=>s.value).sort(null)(f)},"createPieArcs"),zt=d((t,a,f,s)=>{F.debug(`rendering pie chart
`+t);const o=s.db,S=nt(),l=rt(o.getConfig(),S.pie),e=40,n=18,p=4,g=450,m=g,x=lt(a),c=x.append("g");c.attr("transform","translate("+m/2+","+g/2+")");const{themeVariables:r}=S;let[w]=st(r.pieOuterStrokeWidth);w??=2;const $=l.textPosition,h=Math.min(m,g)/2-e,A=V().innerRadius(0).outerRadius(h),D=V().innerRadius(h*$).outerRadius(h*$);c.append("circle").attr("cx",0).attr("cy",0).attr("r",h+w/2).attr("class","pieOuterCircle");const u=o.getSections(),v=Mt(u),b=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12];let C=0;u.forEach(i=>{C+=i});const B=v.filter(i=>(i.data.value/C*100).toFixed(0)!=="0"),k=gt(b).domain([...u.keys()]);c.selectAll("mySlices").data(B).enter().append("path").attr("d",A).attr("fill",i=>k(i.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(B).enter().append("text").text(i=>(i.data.value/C*100).toFixed(0)+"%").attr("transform",i=>"translate("+D.centroid(i)+")").style("text-anchor","middle").attr("class","slice");const H=c.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),E=[...u.entries()].map(([i,z])=>({label:i,value:z})),M=c.selectAll(".legend").data(E).enter().append("g").attr("class","legend").attr("transform",(i,z)=>{const L=n+p,J=L*E.length/2,Q=12*n,U=z*L-J;return"translate("+Q+","+U+")"});M.append("rect").attr("width",n).attr("height",n).style("fill",i=>k(i.label)).style("stroke",i=>k(i.label)),M.append("text").attr("x",n+p).attr("y",n-p).text(i=>o.getShowData()?`${i.label} [${i.value}]`:i.label);const K=Math.max(...M.selectAll("text").nodes().map(i=>i?.getBoundingClientRect().width??0)),_=m+e+n+p+K,N=H.node()?.getBoundingClientRect().width??0,j=m/2-N/2,I=m/2+N/2,P=Math.min(0,j),G=Math.max(_,I)-P;x.attr("viewBox",`${P} 0 ${G} ${g}`),ot(x,g,G,l.useMaxWidth)},"draw"),Rt={draw:zt},Ht={parser:Tt,db:q,renderer:Rt,styles:kt};export{Ht as diagram};
//# sourceMappingURL=pieDiagram-4H26LBE5-BJxSaL7q.chunk.mjs.map
