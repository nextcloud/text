import{p as B}from"./chunk-4BMEZGHF-BRW7jBLk.chunk.mjs";import{E as F,s as P,g as S,o as W,p as z,b as T,c as v,_ as i,l as u,F as $,G as D,v as E,K as A,k as R}from"./mermaid.core-LfoD7IgF.chunk.mjs";import{p as Y}from"./radar-MK3ICKWK-D_IKvQEO.chunk.mjs";import"./modulepreload-polyfill-DE-oIJqv.chunk.mjs";import"./emoji-picker-KVqjnXYv.chunk.mjs";import"./NcNoteCard-C6xb7vi0-J914_L45.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-Dc6Ai3V6.chunk.mjs";import"./_baseUniq-BtezaIHC.chunk.mjs";import"./_basePickBy-CQ5CVwm9.chunk.mjs";import"./clone-ni5tm4Vh.chunk.mjs";var w={packet:[]},x=structuredClone(w),H=F.packet,L=i(()=>{const t=$({...H,...D().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),G=i(()=>x.packet,"getPacket"),I=i(t=>{t.length>0&&x.packet.push(t)},"pushWord"),K=i(()=>{E(),x=structuredClone(w)},"clear"),m={pushWord:I,getPacket:G,getConfig:L,clear:K,setAccTitle:P,getAccTitle:S,setDiagramTitle:W,getDiagramTitle:z,getAccDescription:T,setAccDescription:v},M=1e4,N=i(t=>{B(t,m);let e=-1,o=[],s=1;const{bitsPerRow:n}=m.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,u.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=n+1&&m.getPacket().length<M;){const[h,c]=X({start:a,end:r,label:p},s,n);if(o.push(h),h.end+1===s*n&&(m.pushWord(o),o=[],s++),!c)break;({start:a,end:r,label:p}=c)}}m.pushWord(o)},"populate"),X=i((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),_={parse:i(async t=>{const e=await Y("packet",t);u.debug(e),N(e)},"parse")},j=i((t,e,o,s)=>{const n=s.db,a=n.getConfig(),{rowHeight:r,paddingY:p,bitWidth:h,bitsPerRow:c}=a,f=n.getPacket(),l=n.getDiagramTitle(),k=r+p,d=k*(f.length+1)-(l?0:r),b=h*c+2,g=A(e);g.attr("viewbox",`0 0 ${b} ${d}`),R(g,d,b,a.useMaxWidth);for(const[y,C]of f.entries())q(g,C,y,a);g.append("text").text(l).attr("x",b/2).attr("y",d-k/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),q=i((t,e,o,{rowHeight:s,paddingX:n,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:h})=>{const c=t.append("g"),f=o*(s+a)+a;for(const l of e){const k=l.start%p*r+1,d=(l.end-l.start+1)*r-n;if(c.append("rect").attr("x",k).attr("y",f).attr("width",d).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",k+d/2).attr("y",f+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!h)continue;const b=l.end===l.start,g=f-2;c.append("text").attr("x",k+(b?d/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",b?"middle":"start").text(l.start),b||c.append("text").attr("x",k+d).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),J={draw:j},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=i(({packet:t}={})=>{const e=$(O,t);return`
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
	`},"styles"),nt={parser:_,db:m,renderer:J,styles:Q};export{nt as diagram};
//# sourceMappingURL=diagram-VNBRO52H-Bn7NYpco.chunk.mjs.map
