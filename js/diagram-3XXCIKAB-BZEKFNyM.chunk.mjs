import{p as B}from"./chunk-44GW5IO5-H7ofJWox.chunk.mjs";import{E as v,s as P,g as z,o as F,p as S,b as W,c as E,_ as n,l as w,F as x,G as T,v as D,K as A,k as R}from"./mermaid.core-DbXixP4-.chunk.mjs";import{p as Y}from"./radar-VG2SY3DT-5H18Pvli.chunk.mjs";import"./modulepreload-polyfill-BbX-W30F.chunk.mjs";import"./emoji-picker-DlAAdvrL.chunk.mjs";import"./NcLoadingIcon-BcbRVau3.chunk.mjs";import"./vue.runtime.esm-Ccc28AWB.chunk.mjs";import"./_baseUniq-D0mPe9wG.chunk.mjs";import"./_basePickBy-BbISpdT7.chunk.mjs";import"./clone-CxOK007V.chunk.mjs";var $={packet:[]},m=structuredClone($),H=v.packet,L=n(()=>{const t=x({...H,...T().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),G=n(()=>m.packet,"getPacket"),I=n(t=>{t.length>0&&m.packet.push(t)},"pushWord"),K=n(()=>{D(),m=structuredClone($)},"clear"),u={pushWord:I,getPacket:G,getConfig:L,clear:K,setAccTitle:P,getAccTitle:z,setDiagramTitle:F,getDiagramTitle:S,getAccDescription:W,setAccDescription:E},M=1e4,N=n(t=>{B(t,u);let e=-1,o=[],i=1;const{bitsPerRow:s}=u.getConfig();for(let{start:a,end:r,bits:c,label:k}of t.blocks){if(a!==void 0&&r!==void 0&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a??=e+1,a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);if(c===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(r??=a+(c??1)-1,c??=r-a+1,e=r,w.debug(`Packet block ${a} - ${e} with label ${k}`);o.length<=s+1&&u.getPacket().length<M;){const[d,p]=X({start:a,end:r,bits:c,label:k},i,s);if(o.push(d),d.end+1===i*s&&(u.pushWord(o),o=[],i++),!p)break;({start:a,end:r,bits:c,label:k}=p)}}u.pushWord(o)},"populate"),X=n((t,e,o)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*o)return[t,void 0];const i=e*o-1,s=e*o;return[{start:t.start,end:i,label:t.label,bits:i-t.start},{start:s,end:t.end,label:t.label,bits:t.end-s}]},"getNextFittingBlock"),_={parse:n(async t=>{const e=await Y("packet",t);w.debug(e),N(e)},"parse")},j=n((t,e,o,i)=>{const s=i.db,a=s.getConfig(),{rowHeight:r,paddingY:c,bitWidth:k,bitsPerRow:d}=a,p=s.getPacket(),l=s.getDiagramTitle(),h=r+c,b=h*(p.length+1)-(l?0:r),g=k*d+2,f=A(e);f.attr("viewbox",`0 0 ${g} ${b}`),R(f,b,g,a.useMaxWidth);for(const[y,C]of p.entries())q(f,C,y,a);f.append("text").text(l).attr("x",g/2).attr("y",b-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),q=n((t,e,o,{rowHeight:i,paddingX:s,paddingY:a,bitWidth:r,bitsPerRow:c,showBits:k})=>{const d=t.append("g"),p=o*(i+a)+a;for(const l of e){const h=l.start%c*r+1,b=(l.end-l.start+1)*r-s;if(d.append("rect").attr("x",h).attr("y",p).attr("width",b).attr("height",i).attr("class","packetBlock"),d.append("text").attr("x",h+b/2).attr("y",p+i/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!k)continue;const g=l.end===l.start,f=p-2;d.append("text").attr("x",h+(g?b/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",g?"middle":"start").text(l.start),g||d.append("text").attr("x",h+b).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),J={draw:j},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=n(({packet:t}={})=>{const e=x(O,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),lt={parser:_,db:u,renderer:J,styles:Q};export{lt as diagram};
//# sourceMappingURL=diagram-3XXCIKAB-BZEKFNyM.chunk.mjs.map
