import{p as S}from"./chunk-JWPE2WC7-_mOodnu1.chunk.mjs";import{_ as g,P as y,S as z,d as F,l as $,b as W,a as E,v as T,x as D,g as A,s as R,N as Y,Q as H,B as L}from"./mermaid.core-BHcFj3oQ.chunk.mjs";import{p as M}from"./cynefin-EF2NZ3EQ-pZumEufG.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-D9-E_xdv.chunk.mjs";import"./translation-DoG5ZELJ-BtT0lD4n.chunk.mjs";import"./index-Do59_4L5.chunk.mjs";var N=H.packet,B=class{constructor(){this.packet=[],this.setAccTitle=W,this.getAccTitle=E,this.setDiagramTitle=T,this.getDiagramTitle=D,this.getAccDescription=A,this.setAccDescription=R}static{g(this,"PacketDB")}getConfig(){const t=y({...N,...Y().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){L(),this.packet=[]}},j=1e4,I=g((t,e)=>{S(t,e);let r=-1,s=[],o=1;const{bitsPerRow:l}=e.getConfig();for(let{start:a,end:i,bits:d,label:b}of t.blocks){if(a!==void 0&&i!==void 0&&i<a)throw new Error(`Packet block ${a} - ${i} is invalid. End must be greater than start.`);if(a??=r+1,a!==r+1)throw new Error(`Packet block ${a} - ${i??a} is not contiguous. It should start from ${r+1}.`);if(d===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(i??=a+(d??1)-1,d??=i-a+1,r=i,$.debug(`Packet block ${a} - ${r} with label ${b}`);s.length<=l+1&&e.getPacket().length<j;){const[c,p]=O({start:a,end:i,bits:d,label:b},o,l);if(s.push(c),c.end+1===o*l&&(e.pushWord(s),s=[],o++),!p)break;({start:a,end:i,bits:d,label:b}=p)}}e.pushWord(s)},"populate"),O=g((t,e,r)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*r)return[t,void 0];const s=e*r-1,o=e*r;return[{start:t.start,end:s,label:t.label,bits:s-t.start},{start:o,end:t.end,label:t.label,bits:t.end-o}]},"getNextFittingBlock"),C={parser:{yy:void 0},parse:g(async t=>{const e=await M("packet",t),r=C.parser?.yy;if(!(r instanceof B))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");$.debug(e),I(e,r)},"parse")},Q=g((t,e,r,s)=>{const o=s.db,l=o.getConfig(),{rowHeight:a,paddingY:i,bitWidth:d,bitsPerRow:b}=l,c=o.getPacket(),p=o.getDiagramTitle(),m=a+i,n=m*(c.length+1)-(p?0:a),h=d*b+2,k=z(e);k.attr("viewBox",`0 0 ${h} ${n}`),F(k,n,h,l.useMaxWidth);for(const[f,u]of c.entries())X(k,u,f,l);k.append("text").text(p).attr("x",h/2).attr("y",n-m/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),X=g((t,e,r,{rowHeight:s,paddingX:o,paddingY:l,bitWidth:a,bitsPerRow:i,showBits:d,bitOrder:b})=>{const c=t.append("g"),p=r*(s+l)+l,m=b==="descending";for(const n of e){const h=n.end-n.start+1,k=n.start%i,f=(m?i-k-h:k)*a+1,u=h*a-o;if(c.append("rect").attr("x",f).attr("y",p).attr("width",u).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",f+u/2).attr("y",p+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(n.label),!d)continue;const[v,P]=m?[n.end,n.start]:[n.start,n.end],w=h===1,x=p-2;c.append("text").attr("x",f+(w?u/2:0)).attr("y",x).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",w?"middle":"start").text(v),w||c.append("text").attr("x",f+u).attr("y",x).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(P)}},"drawWord"),_={draw:Q},q={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},G=g(({packet:t}={})=>{const e=y(q,t);return`
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
	`},"styles"),at={parser:C,get db(){return new B},renderer:_,styles:G};export{at as diagram};
//# sourceMappingURL=diagram-UMYRVEAY-rozSqIl8.chunk.mjs.map
