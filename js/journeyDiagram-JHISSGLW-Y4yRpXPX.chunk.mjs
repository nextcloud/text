import{g as ft}from"./chunk-FMBD7UC4-BfXmujyR.chunk.mjs";import{a as gt,g as at,h as mt,d as xt}from"./chunk-ND2GUHAM-DiJTJw3f.chunk.mjs";import{g as kt,s as _t,a as bt,b as vt,t as wt,q as $t,_ as r,c as B,d as q,e as St,z as Mt}from"./mermaid.core-BabtxvYg.chunk.mjs";import{d as et}from"./arc-WlXq-05j.chunk.mjs";import"./index-D3QPwoaU.chunk.mjs";import"./emoji-picker-B23JpFV7.chunk.mjs";import"./NcLoadingIcon-cTopO8-o.chunk.mjs";import"./vue.runtime.esm-BeQ812EV.chunk.mjs";import"./index-DxwFe63_.chunk.mjs";var H=(function(){var e=r(function(p,i,n,y){for(n=n||{},y=p.length;y--;n[p[y]]=i);return n},"o"),t=[6,8,10,11,12,14,16,17,18],o=[1,9],u=[1,10],s=[1,11],c=[1,12],d=[1,13],l=[1,14],f={trace:r(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:r(function(p,i,n,y,h,a,k){var x=a.length-1;switch(h){case 1:return a[x-1];case 2:this.$=[];break;case 3:a[x-1].push(a[x]),this.$=a[x-1];break;case 4:case 5:this.$=a[x];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(a[x].substr(6)),this.$=a[x].substr(6);break;case 9:this.$=a[x].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=a[x].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(a[x].substr(8)),this.$=a[x].substr(8);break;case 13:y.addTask(a[x-1],a[x]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},e(t,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:o,12:u,14:s,16:c,17:d,18:l},e(t,[2,7],{1:[2,1]}),e(t,[2,3]),{9:15,11:o,12:u,14:s,16:c,17:d,18:l},e(t,[2,5]),e(t,[2,6]),e(t,[2,8]),{13:[1,16]},{15:[1,17]},e(t,[2,11]),e(t,[2,12]),{19:[1,18]},e(t,[2,4]),e(t,[2,9]),e(t,[2,10]),e(t,[2,13])],defaultActions:{},parseError:r(function(p,i){if(i.recoverable)this.trace(p);else{var n=new Error(p);throw n.hash=i,n}},"parseError"),parse:r(function(p){var i=this,n=[0],y=[],h=[null],a=[],k=this.table,x="",E=0,A=0,ut=2,K=1,pt=a.slice.call(arguments,1),_=Object.create(this.lexer),I={yy:{}};for(var z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,z)&&(I.yy[z]=this.yy[z]);_.setInput(p,I.yy),I.yy.lexer=_,I.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Y=_.yylloc;a.push(Y);var yt=_.options&&_.options.ranges;typeof I.yy.parseError=="function"?this.parseError=I.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function dt(v){n.length=n.length-2*v,h.length=h.length-v,a.length=a.length-v}r(dt,"popStack");function Q(){var v;return v=y.pop()||_.lex()||K,typeof v!="number"&&(v instanceof Array&&(y=v,v=y.pop()),v=i.symbols_[v]||v),v}r(Q,"lex");for(var b,P,w,W,j={},D,M,tt,O;;){if(P=n[n.length-1],this.defaultActions[P]?w=this.defaultActions[P]:((b===null||typeof b>"u")&&(b=Q()),w=k[P]&&k[P][b]),typeof w>"u"||!w.length||!w[0]){var G="";O=[];for(D in k[P])this.terminals_[D]&&D>ut&&O.push("'"+this.terminals_[D]+"'");_.showPosition?G="Parse error on line "+(E+1)+`:
`+_.showPosition()+`
Expecting `+O.join(", ")+", got '"+(this.terminals_[b]||b)+"'":G="Parse error on line "+(E+1)+": Unexpected "+(b==K?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(G,{text:_.match,token:this.terminals_[b]||b,line:_.yylineno,loc:Y,expected:O})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+P+", token: "+b);switch(w[0]){case 1:n.push(b),h.push(_.yytext),a.push(_.yylloc),n.push(w[1]),b=null,A=_.yyleng,x=_.yytext,E=_.yylineno,Y=_.yylloc;break;case 2:if(M=this.productions_[w[1]][1],j.$=h[h.length-M],j._$={first_line:a[a.length-(M||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(M||1)].first_column,last_column:a[a.length-1].last_column},yt&&(j._$.range=[a[a.length-(M||1)].range[0],a[a.length-1].range[1]]),W=this.performAction.apply(j,[x,A,E,I.yy,w[1],h,a].concat(pt)),typeof W<"u")return W;M&&(n=n.slice(0,-1*M*2),h=h.slice(0,-1*M),a=a.slice(0,-1*M)),n.push(this.productions_[w[1]][0]),h.push(j.$),a.push(j._$),tt=k[n[n.length-2]][n[n.length-1]],n.push(tt);break;case 3:return!0}}return!0},"parse")},m=(function(){var p={EOF:1,parseError:r(function(i,n){if(this.yy.parser)this.yy.parser.parseError(i,n);else throw new Error(i)},"parseError"),setInput:r(function(i,n){return this.yy=n||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:r(function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var n=i.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},"input"),unput:r(function(i){var n=i.length,y=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var a=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===h.length?this.yylloc.first_column:0)+h[h.length-y.length].length-y[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[a[0],a[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},"unput"),more:r(function(){return this._more=!0,this},"more"),reject:r(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:r(function(i){this.unput(this.match.slice(i))},"less"),pastInput:r(function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:r(function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:r(function(){var i=this.pastInput(),n=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+n+"^"},"showPosition"),test_match:r(function(i,n){var y,h,a;if(this.options.backtrack_lexer&&(a={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(a.yylloc.range=this.yylloc.range.slice(0))),h=i[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],y=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var k in a)this[k]=a[k];return!1}return!1},"test_match"),next:r(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,n,y,h;this._more||(this.yytext="",this.match="");for(var a=this._currentRules(),k=0;k<a.length;k++)if(y=this._input.match(this.rules[a[k]]),y&&(!n||y[0].length>n[0].length)){if(n=y,h=k,this.options.backtrack_lexer){if(i=this.test_match(y,a[k]),i!==!1)return i;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(i=this.test_match(n,a[h]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:r(function(){var i=this.next();return i||this.lex()},"lex"),begin:r(function(i){this.conditionStack.push(i)},"begin"),popState:r(function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:r(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:r(function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},"topState"),pushState:r(function(i){this.begin(i)},"pushState"),stateStackSize:r(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:r(function(i,n,y,h){switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return p})();f.lexer=m;function g(){this.yy={}}return r(g,"Parser"),g.prototype=f,f.Parser=g,new g})();H.parser=H;var Ct=H,V="",Z=[],L=[],R=[],Tt=r(function(){Z.length=0,L.length=0,V="",R.length=0,Mt()},"clear"),Et=r(function(e){V=e,Z.push(e)},"addSection"),It=r(function(){return Z},"getSections"),Pt=r(function(){let e=it();const t=100;let o=0;for(;!e&&o<t;)e=it(),o++;return L.push(...R),L},"getTasks"),At=r(function(){const e=[];return L.forEach(t=>{t.people&&e.push(...t.people)}),[...new Set(e)].sort()},"updateActors"),jt=r(function(e,t){const o=t.substr(1).split(":");let u=0,s=[];o.length===1?(u=Number(o[0]),s=[]):(u=Number(o[0]),s=o[1].split(","));const c=s.map(l=>l.trim()),d={section:V,type:V,people:c,task:e,score:u};R.push(d)},"addTask"),Vt=r(function(e){const t={section:V,type:V,description:e,task:e,classes:[]};L.push(t)},"addTaskOrg"),it=r(function(){const e=r(function(o){return R[o].processed},"compileTask");let t=!0;for(const[o,u]of R.entries())e(o),t=t&&u.processed;return t},"compileTasks"),Bt=r(function(){return At()},"getActors"),nt={getConfig:r(()=>B().journey,"getConfig"),clear:Tt,setDiagramTitle:$t,getDiagramTitle:wt,setAccTitle:vt,getAccTitle:bt,setAccDescription:_t,getAccDescription:kt,addSection:Et,getSections:It,getTasks:Pt,addTask:jt,addTaskOrg:Vt,getActors:Bt},Lt=r(e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${e.textColor}
  }

  .legend {
    fill: ${e.textColor};
    font-family: ${e.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${e.textColor}
  }

  .face {
    ${e.faceColor?`fill: ${e.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${e.fillType0?`fill: ${e.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${e.fillType0?`fill: ${e.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${e.fillType0?`fill: ${e.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${e.fillType0?`fill: ${e.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${e.fillType0?`fill: ${e.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${e.fillType0?`fill: ${e.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${e.fillType0?`fill: ${e.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${e.fillType0?`fill: ${e.fillType7}`:""};
  }

  .actor-0 {
    ${e.actor0?`fill: ${e.actor0}`:""};
  }
  .actor-1 {
    ${e.actor1?`fill: ${e.actor1}`:""};
  }
  .actor-2 {
    ${e.actor2?`fill: ${e.actor2}`:""};
  }
  .actor-3 {
    ${e.actor3?`fill: ${e.actor3}`:""};
  }
  .actor-4 {
    ${e.actor4?`fill: ${e.actor4}`:""};
  }
  .actor-5 {
    ${e.actor5?`fill: ${e.actor5}`:""};
  }
  ${ft()}
`,"getStyles"),Rt=Lt,J=r(function(e,t){return xt(e,t)},"drawRect"),Ft=r(function(e,t){const o=e.append("circle").attr("cx",t.cx).attr("cy",t.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),u=e.append("g");u.append("circle").attr("cx",t.cx-15/3).attr("cy",t.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),u.append("circle").attr("cx",t.cx+15/3).attr("cy",t.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function s(l){const f=et().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);l.append("path").attr("class","mouth").attr("d",f).attr("transform","translate("+t.cx+","+(t.cy+2)+")")}r(s,"smile");function c(l){const f=et().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);l.append("path").attr("class","mouth").attr("d",f).attr("transform","translate("+t.cx+","+(t.cy+7)+")")}r(c,"sad");function d(l){l.append("line").attr("class","mouth").attr("stroke",2).attr("x1",t.cx-5).attr("y1",t.cy+7).attr("x2",t.cx+5).attr("y2",t.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return r(d,"ambivalent"),t.score>3?s(u):t.score<3?c(u):d(u),o},"drawFace"),ot=r(function(e,t){const o=e.append("circle");return o.attr("cx",t.cx),o.attr("cy",t.cy),o.attr("class","actor-"+t.pos),o.attr("fill",t.fill),o.attr("stroke",t.stroke),o.attr("r",t.r),o.class!==void 0&&o.attr("class",o.class),t.title!==void 0&&o.append("title").text(t.title),o},"drawCircle"),lt=r(function(e,t){return mt(e,t)},"drawText"),Dt=r(function(e,t){function o(s,c,d,l,f){return s+","+c+" "+(s+d)+","+c+" "+(s+d)+","+(c+l-f)+" "+(s+d-f*1.2)+","+(c+l)+" "+s+","+(c+l)}r(o,"genPoints");const u=e.append("polygon");u.attr("points",o(t.x,t.y,50,20,7)),u.attr("class","labelBox"),t.y=t.y+t.labelMargin,t.x=t.x+.5*t.labelMargin,lt(e,t)},"drawLabel"),Ot=r(function(e,t,o){const u=e.append("g"),s=at();s.x=t.x,s.y=t.y,s.fill=t.fill,s.width=o.width*t.taskCount+o.diagramMarginX*(t.taskCount-1),s.height=o.height,s.class="journey-section section-type-"+t.num,s.rx=3,s.ry=3,J(u,s),ct(o)(t.text,u,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+t.num},o,t.colour)},"drawSection"),X=-1,Nt=r(function(e,t,o,u){const s=t.x+o.width/2,c=e.append("g");X++,c.append("line").attr("id",u+"-task"+X).attr("x1",s).attr("y1",t.y).attr("x2",s).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Ft(c,{cx:s,cy:300+(5-t.score)*30,score:t.score});const l=at();l.x=t.x,l.y=t.y,l.fill=t.fill,l.width=o.width,l.height=o.height,l.class="task task-type-"+t.num,l.rx=3,l.ry=3,J(c,l);let f=t.x+14;t.people.forEach(m=>{const g=t.actors[m].color,p={cx:f,cy:t.y,r:7,fill:g,stroke:"#000",title:m,pos:t.actors[m].position};ot(c,p),f+=10}),ct(o)(t.task,c,l.x,l.y,l.width,l.height,{class:"task"},o,t.colour)},"drawTask"),zt=r(function(e,t){gt(e,t)},"drawBackgroundRect"),ct=(function(){function e(s,c,d,l,f,m,g,p){const i=c.append("text").attr("x",d+f/2).attr("y",l+m/2+5).style("font-color",p).style("text-anchor","middle").text(s);u(i,g)}r(e,"byText");function t(s,c,d,l,f,m,g,p,i){const{taskFontSize:n,taskFontFamily:y}=p,h=s.split(/<br\s*\/?>/gi);for(let a=0;a<h.length;a++){const k=a*n-n*(h.length-1)/2,x=c.append("text").attr("x",d+f/2).attr("y",l).attr("fill",i).style("text-anchor","middle").style("font-size",n).style("font-family",y);x.append("tspan").attr("x",d+f/2).attr("dy",k).text(h[a]),x.attr("y",l+m/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),u(x,g)}}r(t,"byTspan");function o(s,c,d,l,f,m,g,p){const i=c.append("switch"),n=i.append("foreignObject").attr("x",d).attr("y",l).attr("width",f).attr("height",m).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");n.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),t(s,i,d,l,f,m,g,p),u(n,g)}r(o,"byFo");function u(s,c){for(const d in c)d in c&&s.attr(d,c[d])}return r(u,"_setTextAttrs"),function(s){return s.textPlacement==="fo"?o:s.textPlacement==="old"?e:t}})(),Yt=r(function(e,t){X=-1,e.append("defs").append("marker").attr("id",t+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),F={drawRect:J,drawCircle:ot,drawSection:Ot,drawText:lt,drawLabel:Dt,drawTask:Nt,drawBackgroundRect:zt,initGraphics:Yt},Wt=r(function(e){Object.keys(e).forEach(function(t){S[t]=e[t]})},"setConf"),C={},N=0;function ht(e){const t=B().journey,o=t.maxLabelWidth;N=0;let u=60;Object.keys(C).forEach(s=>{const c=C[s].color,d={cx:20,cy:u,r:7,fill:c,stroke:"#000",pos:C[s].position};F.drawCircle(e,d);let l=e.append("text").attr("visibility","hidden").text(s);const f=l.node().getBoundingClientRect().width;l.remove();let m=[];if(f<=o)m=[s];else{const g=s.split(" ");let p="";l=e.append("text").attr("visibility","hidden"),g.forEach(i=>{const n=p?`${p} ${i}`:i;if(l.text(n),l.node().getBoundingClientRect().width>o){if(p&&m.push(p),p=i,l.text(i),l.node().getBoundingClientRect().width>o){let y="";for(const h of i)y+=h,l.text(y+"-"),l.node().getBoundingClientRect().width>o&&(m.push(y.slice(0,-1)+"-"),y=h);p=y}}else p=n}),p&&m.push(p),l.remove()}m.forEach((g,p)=>{const i={x:40,y:u+7+p*20,fill:"#666",text:g,textMargin:t.boxTextMargin??5},n=F.drawText(e,i).node().getBoundingClientRect().width;n>N&&n>t.leftMargin-n&&(N=n)}),u+=Math.max(20,m.length*20)})}r(ht,"drawActorLegend");var S=B().journey,T=0,Gt=r(function(e,t,o,u){const s=B(),c=s.journey.titleColor,d=s.journey.titleFontSize,l=s.journey.titleFontFamily,f=s.securityLevel;let m;f==="sandbox"&&(m=q("#i"+t));const g=f==="sandbox"?q(m.nodes()[0].contentDocument.body):q("body");$.init();const p=g.select("#"+t);F.initGraphics(p,t);const i=u.db.getTasks(),n=u.db.getDiagramTitle(),y=u.db.getActors();for(const A in C)delete C[A];let h=0;y.forEach(A=>{C[A]={color:S.actorColours[h%S.actorColours.length],position:h},h++}),ht(p),T=S.leftMargin+N,$.insert(0,0,T,Object.keys(C).length*50),qt(p,i,0,t);const a=$.getBounds();n&&p.append("text").text(n).attr("x",T).attr("font-size",d).attr("font-weight","bold").attr("y",25).attr("fill",c).attr("font-family",l);const k=a.stopy-a.starty+2*S.diagramMarginY,x=T+a.stopx+2*S.diagramMarginX;St(p,k,x,S.useMaxWidth),p.append("line").attr("x1",T).attr("y1",S.height*4).attr("x2",x-T-4).attr("y2",S.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+t+"-arrowhead)");const E=n?70:0;p.attr("viewBox",`${a.startx} -25 ${x} ${k+E}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",k+E+25)},"draw"),$={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:r(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:r(function(e,t,o,u){e[t]===void 0?e[t]=o:e[t]=u(o,e[t])},"updateVal"),updateBounds:r(function(e,t,o,u){const s=B().journey,c=this;let d=0;function l(f){return r(function(m){d++;const g=c.sequenceItems.length-d+1;c.updateVal(m,"starty",t-g*s.boxMargin,Math.min),c.updateVal(m,"stopy",u+g*s.boxMargin,Math.max),c.updateVal($.data,"startx",e-g*s.boxMargin,Math.min),c.updateVal($.data,"stopx",o+g*s.boxMargin,Math.max),f!=="activation"&&(c.updateVal(m,"startx",e-g*s.boxMargin,Math.min),c.updateVal(m,"stopx",o+g*s.boxMargin,Math.max),c.updateVal($.data,"starty",t-g*s.boxMargin,Math.min),c.updateVal($.data,"stopy",u+g*s.boxMargin,Math.max))},"updateItemBounds")}r(l,"updateFn"),this.sequenceItems.forEach(l())},"updateBounds"),insert:r(function(e,t,o,u){const s=Math.min(e,o),c=Math.max(e,o),d=Math.min(t,u),l=Math.max(t,u);this.updateVal($.data,"startx",s,Math.min),this.updateVal($.data,"starty",d,Math.min),this.updateVal($.data,"stopx",c,Math.max),this.updateVal($.data,"stopy",l,Math.max),this.updateBounds(s,d,c,l)},"insert"),bumpVerticalPos:r(function(e){this.verticalPos=this.verticalPos+e,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:r(function(){return this.verticalPos},"getVerticalPos"),getBounds:r(function(){return this.data},"getBounds")},U=S.sectionFills,st=S.sectionColours,qt=r(function(e,t,o,u){const s=B().journey;let c="";const d=s.height*2+s.diagramMarginY,l=o+d;let f=0,m="#CCC",g="black",p=0;for(const[i,n]of t.entries()){if(c!==n.section){m=U[f%U.length],p=f%U.length,g=st[f%st.length];let h=0;const a=n.section;for(let x=i;x<t.length&&t[x].section==a;x++)h=h+1;const k={x:i*s.taskMargin+i*s.width+T,y:50,text:n.section,fill:m,num:p,colour:g,taskCount:h};F.drawSection(e,k,s),c=n.section,f++}const y=n.people.reduce((h,a)=>(C[a]&&(h[a]=C[a]),h),{});n.x=i*s.taskMargin+i*s.width+T,n.y=l,n.width=s.diagramMarginX,n.height=s.diagramMarginY,n.colour=g,n.fill=m,n.num=p,n.actors=y,F.drawTask(e,n,s,u),$.insert(n.x,n.y,n.x+n.width+s.taskMargin,450)}},"drawTasks"),rt={setConf:Wt,draw:Gt},ie={parser:Ct,db:nt,renderer:rt,styles:Rt,init:r(e=>{rt.setConf(e.journey),nt.clear()},"init")};export{ie as diagram};
//# sourceMappingURL=journeyDiagram-JHISSGLW-Y4yRpXPX.chunk.mjs.map
