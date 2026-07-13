import{p as B}from"./chunk-JWPE2WC7-Bdog9OXg.chunk.mjs";import{_ as f,B as u,F as C,e as v,l as w,b as P,a as z,o as F,p as S,g as W,s as D,z as E,D as T,q as A}from"./mermaid.core-Duhl5nZZ.chunk.mjs";import{p as R}from"./cynefin-VYW2F7L2-WO5pYpML.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-ZXs2IwY4.chunk.mjs";import"./index-CBEmrcgU.chunk.mjs";import"./index-DOCeebGm.chunk.mjs";var Y=T.packet,m=class{constructor(){this.packet=[],this.setAccTitle=P,this.getAccTitle=z,this.setDiagramTitle=F,this.getDiagramTitle=S,this.getAccDescription=W,this.setAccDescription=D}static{f(this,"PacketDB")}getConfig(){const t=u({...Y,...E().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){A(),this.packet=[]}},H=1e4,L=f((t,e)=>{B(t,e);let r=-1,s=[],l=1;const{bitsPerRow:n}=e.getConfig();for(let{start:a,end:i,bits:d,label:c}of t.blocks){if(a!==void 0&&i!==void 0&&i<a)throw new Error(`Packet block ${a} - ${i} is invalid. End must be greater than start.`);if(a??=r+1,a!==r+1)throw new Error(`Packet block ${a} - ${i??a} is not contiguous. It should start from ${r+1}.`);if(d===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(i??=a+(d??1)-1,d??=i-a+1,r=i,w.debug(`Packet block ${a} - ${r} with label ${c}`);s.length<=n+1&&e.getPacket().length<H;){const[p,o]=M({start:a,end:i,bits:d,label:c},l,n);if(s.push(p),p.end+1===l*n&&(e.pushWord(s),s=[],l++),!o)break;({start:a,end:i,bits:d,label:c}=o)}}e.pushWord(s)},"populate"),M=f((t,e,r)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*r)return[t,void 0];const s=e*r-1,l=e*r;return[{start:t.start,end:s,label:t.label,bits:s-t.start},{start:l,end:t.end,label:t.label,bits:t.end-l}]},"getNextFittingBlock"),x={parser:{yy:void 0},parse:f(async t=>{const e=await R("packet",t),r=x.parser?.yy;if(!(r instanceof m))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");w.debug(e),L(e,r)},"parse")},j=f((t,e,r,s)=>{const l=s.db,n=l.getConfig(),{rowHeight:a,paddingY:i,bitWidth:d,bitsPerRow:c}=n,p=l.getPacket(),o=l.getDiagramTitle(),b=a+i,h=b*(p.length+1)-(o?0:a),k=d*c+2,g=C(e);g.attr("viewBox",`0 0 ${k} ${h}`),v(g,h,k,n.useMaxWidth);for(const[y,$]of p.entries())q(g,$,y,n);g.append("text").text(o).attr("x",k/2).attr("y",h-b/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),q=f((t,e,r,{rowHeight:s,paddingX:l,paddingY:n,bitWidth:a,bitsPerRow:i,showBits:d})=>{const c=t.append("g"),p=r*(s+n)+n;for(const o of e){const b=o.start%i*a+1,h=(o.end-o.start+1)*a-l;if(c.append("rect").attr("x",b).attr("y",p).attr("width",h).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",b+h/2).attr("y",p+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(o.label),!d)continue;const k=o.end===o.start,g=p-2;c.append("text").attr("x",b+(k?h/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(o.start),k||c.append("text").attr("x",b+h).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(o.end)}},"drawWord"),I={draw:j},N={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},_=f(({packet:t}={})=>{const e=u(N,t);return`
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
	`},"styles"),V={parser:x,get db(){return new m},renderer:I,styles:_};export{V as diagram};
//# sourceMappingURL=diagram-NH7WQ7WH-BWfnWDGY.chunk.mjs.map
