import{p as B}from"./chunk-44GW5IO5-DRVKoLMl.chunk.mjs";import{_ as n,s as v,g as z,t as P,q as F,a as S,b as W,F as w,K as E,e as T,z as D,G as A,H,l as x}from"./mermaid.core-BQaFFFx5.chunk.mjs";import{p as R}from"./radar-VG2SY3DT-qk95M5YS.chunk.mjs";import"./index-BB_H-FxO.chunk.mjs";import"./emoji-picker-DwlFXcXb.chunk.mjs";import"./index-ChYsnRIQ.chunk.mjs";import"./vue.runtime.esm-C67CNNZN.chunk.mjs";import"./_baseUniq-DXkPxLGx.chunk.mjs";import"./_basePickBy-a34ERbAb.chunk.mjs";import"./clone-BJ2KHpP8.chunk.mjs";var $={packet:[]},m=structuredClone($),Y=H.packet,L=n(()=>{const t=w({...Y,...A().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),q=n(()=>m.packet,"getPacket"),G=n(t=>{t.length>0&&m.packet.push(t)},"pushWord"),I=n(()=>{D(),m=structuredClone($)},"clear"),u={pushWord:G,getPacket:q,getConfig:L,clear:I,setAccTitle:W,getAccTitle:S,setDiagramTitle:F,getDiagramTitle:P,getAccDescription:z,setAccDescription:v},K=1e4,M=n(t=>{B(t,u);let e=-1,o=[],i=1;const{bitsPerRow:s}=u.getConfig();for(let{start:a,end:r,bits:d,label:k}of t.blocks){if(a!==void 0&&r!==void 0&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a??=e+1,a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);if(d===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(r??=a+(d??1)-1,d??=r-a+1,e=r,x.debug(`Packet block ${a} - ${e} with label ${k}`);o.length<=s+1&&u.getPacket().length<K;){const[c,p]=N({start:a,end:r,bits:d,label:k},i,s);if(o.push(c),c.end+1===i*s&&(u.pushWord(o),o=[],i++),!p)break;({start:a,end:r,bits:d,label:k}=p)}}u.pushWord(o)},"populate"),N=n((t,e,o)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*o)return[t,void 0];const i=e*o-1,s=e*o;return[{start:t.start,end:i,label:t.label,bits:i-t.start},{start:s,end:t.end,label:t.label,bits:t.end-s}]},"getNextFittingBlock"),X={parse:n(async t=>{const e=await R("packet",t);x.debug(e),M(e)},"parse")},_=n((t,e,o,i)=>{const s=i.db,a=s.getConfig(),{rowHeight:r,paddingY:d,bitWidth:k,bitsPerRow:c}=a,p=s.getPacket(),l=s.getDiagramTitle(),h=r+d,b=h*(p.length+1)-(l?0:r),g=k*c+2,f=E(e);f.attr("viewbox",`0 0 ${g} ${b}`),T(f,b,g,a.useMaxWidth);for(const[y,C]of p.entries())j(f,C,y,a);f.append("text").text(l).attr("x",g/2).attr("y",b-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),j=n((t,e,o,{rowHeight:i,paddingX:s,paddingY:a,bitWidth:r,bitsPerRow:d,showBits:k})=>{const c=t.append("g"),p=o*(i+a)+a;for(const l of e){const h=l.start%d*r+1,b=(l.end-l.start+1)*r-s;if(c.append("rect").attr("x",h).attr("y",p).attr("width",b).attr("height",i).attr("class","packetBlock"),c.append("text").attr("x",h+b/2).attr("y",p+i/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!k)continue;const g=l.end===l.start,f=p-2;c.append("text").attr("x",h+(g?b/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",g?"middle":"start").text(l.start),g||c.append("text").attr("x",h+b).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),J={draw:_},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=n(({packet:t}={})=>{const e=w(O,t);return`
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
	`},"styles"),lt={parser:X,db:u,renderer:J,styles:Q};export{lt as diagram};
//# sourceMappingURL=diagram-3XXCIKAB-CSMi90yR.chunk.mjs.map
