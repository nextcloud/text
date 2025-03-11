import{p as B}from"./chunk-TMUBEWPD-Dgyg69Gv.chunk.mjs";import{_ as i,s as F,g as P,o as S,p as W,a as z,b as T,E as u,I as v,e as D,x as E,F as A,G as R,l as $}from"./mermaid.core-C0BMk4jf.chunk.mjs";import{p as Y}from"./gitGraph-YCYPL57B-pXu8gxMr.chunk.mjs";import"./modulepreload-polyfill-Cp76Uzro.chunk.mjs";import"./emoji-picker-_ZUJ6YnW.chunk.mjs";import"./index-CRuymtgo.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-8l0cPn1o.chunk.mjs";import"./index-BS7Lr8Ce.chunk.mjs";import"./_baseUniq-C4s1Hlif.chunk.mjs";import"./_basePickBy-BDG3nbNS.chunk.mjs";import"./clone-CDNEuqD_.chunk.mjs";var w={packet:[]},x=structuredClone(w),H=R.packet,I=i(()=>{const t=u({...H,...A().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),L=i(()=>x.packet,"getPacket"),G=i(t=>{t.length>0&&x.packet.push(t)},"pushWord"),M=i(()=>{E(),x=structuredClone(w)},"clear"),m={pushWord:G,getPacket:L,getConfig:I,clear:M,setAccTitle:T,getAccTitle:z,setDiagramTitle:W,getDiagramTitle:S,getAccDescription:P,setAccDescription:F},N=1e4,X=i(t=>{B(t,m);let e=-1,o=[],s=1;const{bitsPerRow:n}=m.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,$.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=n+1&&m.getPacket().length<N;){const[h,c]=_({start:a,end:r,label:p},s,n);if(o.push(h),h.end+1===s*n&&(m.pushWord(o),o=[],s++),!c)break;({start:a,end:r,label:p}=c)}}m.pushWord(o)},"populate"),_=i((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),j={parse:i(async t=>{const e=await Y("packet",t);$.debug(e),X(e)},"parse")},q=i((t,e,o,s)=>{const n=s.db,a=n.getConfig(),{rowHeight:r,paddingY:p,bitWidth:h,bitsPerRow:c}=a,f=n.getPacket(),l=n.getDiagramTitle(),k=r+p,d=k*(f.length+1)-(l?0:r),b=h*c+2,g=v(e);g.attr("viewbox",`0 0 ${b} ${d}`),D(g,d,b,a.useMaxWidth);for(const[y,C]of f.entries())J(g,C,y,a);g.append("text").text(l).attr("x",b/2).attr("y",d-k/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),J=i((t,e,o,{rowHeight:s,paddingX:n,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:h})=>{const c=t.append("g"),f=o*(s+a)+a;for(const l of e){const k=l.start%p*r+1,d=(l.end-l.start+1)*r-n;if(c.append("rect").attr("x",k).attr("y",f).attr("width",d).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",k+d/2).attr("y",f+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!h)continue;const b=l.end===l.start,g=f-2;c.append("text").attr("x",k+(b?d/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",b?"middle":"start").text(l.start),b||c.append("text").attr("x",k+d).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),K={draw:q},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=i(({packet:t}={})=>{const e=u(O,t);return`
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
	`},"styles"),ct={parser:j,db:m,renderer:K,styles:Q};export{ct as diagram};
