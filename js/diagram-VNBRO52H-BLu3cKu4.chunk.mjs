import{p as B}from"./chunk-4BMEZGHF-Cp5pUYkb.chunk.mjs";import{_ as i,s as z,g as F,t as P,q as S,a as W,b as T,F as u,K as v,e as D,z as A,G as E,H,l as $}from"./mermaid.core-Ds_Pkuv8.chunk.mjs";import{p as R}from"./radar-MK3ICKWK-D_uTGmB8.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-_ZUJ6YnW.chunk.mjs";import"./index-C8-oVlpL.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-BtdjJon7.chunk.mjs";import"./index-D5xShdRy.chunk.mjs";import"./_baseUniq-BLsDnxPh.chunk.mjs";import"./_basePickBy-CGT0vw6q.chunk.mjs";import"./clone-C_bcHAAf.chunk.mjs";var w={packet:[]},x=structuredClone(w),Y=H.packet,L=i(()=>{const t=u({...Y,...E().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),q=i(()=>x.packet,"getPacket"),G=i(t=>{t.length>0&&x.packet.push(t)},"pushWord"),I=i(()=>{A(),x=structuredClone(w)},"clear"),m={pushWord:G,getPacket:q,getConfig:L,clear:I,setAccTitle:T,getAccTitle:W,setDiagramTitle:S,getDiagramTitle:P,getAccDescription:F,setAccDescription:z},K=1e4,M=i(t=>{B(t,m);let e=-1,o=[],s=1;const{bitsPerRow:n}=m.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,$.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=n+1&&m.getPacket().length<K;){const[h,c]=N({start:a,end:r,label:p},s,n);if(o.push(h),h.end+1===s*n&&(m.pushWord(o),o=[],s++),!c)break;({start:a,end:r,label:p}=c)}}m.pushWord(o)},"populate"),N=i((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),X={parse:i(async t=>{const e=await R("packet",t);$.debug(e),M(e)},"parse")},_=i((t,e,o,s)=>{const n=s.db,a=n.getConfig(),{rowHeight:r,paddingY:p,bitWidth:h,bitsPerRow:c}=a,f=n.getPacket(),l=n.getDiagramTitle(),k=r+p,d=k*(f.length+1)-(l?0:r),b=h*c+2,g=v(e);g.attr("viewbox",`0 0 ${b} ${d}`),D(g,d,b,a.useMaxWidth);for(const[y,C]of f.entries())j(g,C,y,a);g.append("text").text(l).attr("x",b/2).attr("y",d-k/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),j=i((t,e,o,{rowHeight:s,paddingX:n,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:h})=>{const c=t.append("g"),f=o*(s+a)+a;for(const l of e){const k=l.start%p*r+1,d=(l.end-l.start+1)*r-n;if(c.append("rect").attr("x",k).attr("y",f).attr("width",d).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",k+d/2).attr("y",f+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!h)continue;const b=l.end===l.start,g=f-2;c.append("text").attr("x",k+(b?d/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",b?"middle":"start").text(l.start),b||c.append("text").attr("x",k+d).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),J={draw:_},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=i(({packet:t}={})=>{const e=u(O,t);return`
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
	`},"styles"),ct={parser:X,db:m,renderer:J,styles:Q};export{ct as diagram};
//# sourceMappingURL=diagram-VNBRO52H-BLu3cKu4.chunk.mjs.map
