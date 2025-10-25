import{_ as f,F as u,K as C,e as v,l as w,b as P,a as z,q as F,t as S,g as W,s as E,G as T,H as D,z as A}from"./mermaid.core-DhscGfSa.chunk.mjs";import{p as H}from"./chunk-4BX2VUAB-CaMYUQfF.chunk.mjs";import{p as R}from"./treemap-75Q7IDZK-CsqRgQht.chunk.mjs";import"./index-Oi0BzHKQ.chunk.mjs";import"./emoji-picker-BuOFovvE.chunk.mjs";import"./NcLoadingIcon-Dd_z42P1.chunk.mjs";import"./vue.runtime.esm-CU0zJ5AL.chunk.mjs";import"./index-CCUE3e_p.chunk.mjs";import"./_baseUniq-Cb7jXyCj.chunk.mjs";import"./_basePickBy-5U73oeUL.chunk.mjs";import"./clone-MtEFA7hh.chunk.mjs";var Y=D.packet,m,x=(m=class{constructor(){this.packet=[],this.setAccTitle=P,this.getAccTitle=z,this.setDiagramTitle=F,this.getDiagramTitle=S,this.getAccDescription=W,this.setAccDescription=E}getConfig(){const t=u({...Y,...T().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){A(),this.packet=[]}},f(m,"PacketDB"),m),L=1e4,M=f((e,t)=>{H(e,t);let r=-1,s=[],l=1;const{bitsPerRow:n}=t.getConfig();for(let{start:a,end:i,bits:d,label:c}of e.blocks){if(a!==void 0&&i!==void 0&&i<a)throw new Error(`Packet block ${a} - ${i} is invalid. End must be greater than start.`);if(a??=r+1,a!==r+1)throw new Error(`Packet block ${a} - ${i??a} is not contiguous. It should start from ${r+1}.`);if(d===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(i??=a+(d??1)-1,d??=i-a+1,r=i,w.debug(`Packet block ${a} - ${r} with label ${c}`);s.length<=n+1&&t.getPacket().length<L;){const[p,o]=j({start:a,end:i,bits:d,label:c},l,n);if(s.push(p),p.end+1===l*n&&(t.pushWord(s),s=[],l++),!o)break;({start:a,end:i,bits:d,label:c}=o)}}t.pushWord(s)},"populate"),j=f((e,t,r)=>{if(e.start===void 0)throw new Error("start should have been set during first phase");if(e.end===void 0)throw new Error("end should have been set during first phase");if(e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*r)return[e,void 0];const s=t*r-1,l=t*r;return[{start:e.start,end:s,label:e.label,bits:s-e.start},{start:l,end:e.end,label:e.label,bits:e.end-l}]},"getNextFittingBlock"),y={parser:{yy:void 0},parse:f(async e=>{const t=await R("packet",e),r=y.parser?.yy;if(!(r instanceof x))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");w.debug(t),M(t,r)},"parse")},q=f((e,t,r,s)=>{const l=s.db,n=l.getConfig(),{rowHeight:a,paddingY:i,bitWidth:d,bitsPerRow:c}=n,p=l.getPacket(),o=l.getDiagramTitle(),h=a+i,b=h*(p.length+1)-(o?0:a),k=d*c+2,g=C(t);g.attr("viewbox",`0 0 ${k} ${b}`),v(g,b,k,n.useMaxWidth);for(const[$,B]of p.entries())G(g,B,$,n);g.append("text").text(o).attr("x",k/2).attr("y",b-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),G=f((e,t,r,{rowHeight:s,paddingX:l,paddingY:n,bitWidth:a,bitsPerRow:i,showBits:d})=>{const c=e.append("g"),p=r*(s+n)+n;for(const o of t){const h=o.start%i*a+1,b=(o.end-o.start+1)*a-l;if(c.append("rect").attr("x",h).attr("y",p).attr("width",b).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",h+b/2).attr("y",p+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(o.label),!d)continue;const k=o.end===o.start,g=p-2;c.append("text").attr("x",h+(k?b/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(o.start),k||c.append("text").attr("x",h+b).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(o.end)}},"drawWord"),I={draw:q},K={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},N=f(({packet:e}={})=>{const t=u(K,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},"styles"),rt={parser:y,get db(){return new x},renderer:I,styles:N};export{rt as diagram};
//# sourceMappingURL=diagram-S2PKOQOG-qavF_LRO.chunk.mjs.map
