import{d as dt,f as ft,g as rt,b as gt}from"./chunk-ASOPGD6M-DsGhW6Vz.chunk.mjs";import{_ as n,d as I,q as mt,r as xt,s as kt,g as _t,c as bt,b as $t,x as vt,j as W,k as wt}from"./mermaid.core-B4Xua6QH.chunk.mjs";import{d as Q}from"./arc-D0enf96B.chunk.mjs";import"./modulepreload-polyfill-DE-oIJqv.chunk.mjs";import"./emoji-picker-KVqjnXYv.chunk.mjs";import"./NcNoteCard-C6xb7vi0-J914_L45.chunk.mjs";import"./index-DfiDB3im.chunk.mjs";import"./vue.runtime.esm-Dc6Ai3V6.chunk.mjs";var q=function(){var t=n(function(g,i,a,u){for(a=a||{},u=g.length;u--;a[g[u]]=i);return a},"o"),e=[6,8,10,11,12,14,16,17,18],r=[1,9],l=[1,10],s=[1,11],h=[1,12],c=[1,13],y=[1,14],d={trace:n(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:n(function(g,i,a,u,p,o,m){var k=o.length-1;switch(p){case 1:return o[k-1];case 2:this.$=[];break;case 3:o[k-1].push(o[k]),this.$=o[k-1];break;case 4:case 5:this.$=o[k];break;case 6:case 7:this.$=[];break;case 8:u.setDiagramTitle(o[k].substr(6)),this.$=o[k].substr(6);break;case 9:this.$=o[k].trim(),u.setAccTitle(this.$);break;case 10:case 11:this.$=o[k].trim(),u.setAccDescription(this.$);break;case 12:u.addSection(o[k].substr(8)),this.$=o[k].substr(8);break;case 13:u.addTask(o[k-1],o[k]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:r,12:l,14:s,16:h,17:c,18:y},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:r,12:l,14:s,16:h,17:c,18:y},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:n(function(g,i){if(i.recoverable)this.trace(g);else{var a=new Error(g);throw a.hash=i,a}},"parseError"),parse:n(function(g){var i=this,a=[0],u=[],p=[null],o=[],m=this.table,k="",F=0,G=0,ht=2,Z=1,ut=o.slice.call(arguments,1),_=Object.create(this.lexer),M={yy:{}};for(var D in this.yy)Object.prototype.hasOwnProperty.call(this.yy,D)&&(M.yy[D]=this.yy[D]);_.setInput(g,M.yy),M.yy.lexer=_,M.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var N=_.yylloc;o.push(N);var pt=_.options&&_.options.ranges;typeof M.yy.parseError=="function"?this.parseError=M.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function yt($){a.length=a.length-2*$,p.length=p.length-$,o.length=o.length-$}n(yt,"popStack");function J(){var $;return $=u.pop()||_.lex()||Z,typeof $!="number"&&($ instanceof Array&&(u=$,$=u.pop()),$=i.symbols_[$]||$),$}n(J,"lex");for(var b,E,v,z,P={},B,T,K,O;;){if(E=a[a.length-1],this.defaultActions[E]?v=this.defaultActions[E]:((b===null||typeof b>"u")&&(b=J()),v=m[E]&&m[E][b]),typeof v>"u"||!v.length||!v[0]){var Y="";O=[];for(B in m[E])this.terminals_[B]&&B>ht&&O.push("'"+this.terminals_[B]+"'");_.showPosition?Y="Parse error on line "+(F+1)+`:
`+_.showPosition()+`
Expecting `+O.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Y="Parse error on line "+(F+1)+": Unexpected "+(b==Z?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Y,{text:_.match,token:this.terminals_[b]||b,line:_.yylineno,loc:N,expected:O})}if(v[0]instanceof Array&&v.length>1)throw new Error("Parse Error: multiple actions possible at state: "+E+", token: "+b);switch(v[0]){case 1:a.push(b),p.push(_.yytext),o.push(_.yylloc),a.push(v[1]),b=null,G=_.yyleng,k=_.yytext,F=_.yylineno,N=_.yylloc;break;case 2:if(T=this.productions_[v[1]][1],P.$=p[p.length-T],P._$={first_line:o[o.length-(T||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(T||1)].first_column,last_column:o[o.length-1].last_column},pt&&(P._$.range=[o[o.length-(T||1)].range[0],o[o.length-1].range[1]]),z=this.performAction.apply(P,[k,G,F,M.yy,v[1],p,o].concat(ut)),typeof z<"u")return z;T&&(a=a.slice(0,-1*T*2),p=p.slice(0,-1*T),o=o.slice(0,-1*T)),a.push(this.productions_[v[1]][0]),p.push(P.$),o.push(P._$),K=m[a[a.length-2]][a[a.length-1]],a.push(K);break;case 3:return!0}}return!0},"parse")},x=function(){var g={EOF:1,parseError:n(function(i,a){if(this.yy.parser)this.yy.parser.parseError(i,a);else throw new Error(i)},"parseError"),setInput:n(function(i,a){return this.yy=a||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:n(function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var a=i.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},"input"),unput:n(function(i){var a=i.length,u=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var p=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),u.length-1&&(this.yylineno-=u.length-1);var o=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:u?(u.length===p.length?this.yylloc.first_column:0)+p[p.length-u.length].length-u[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[o[0],o[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:n(function(){return this._more=!0,this},"more"),reject:n(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:n(function(i){this.unput(this.match.slice(i))},"less"),pastInput:n(function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:n(function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:n(function(){var i=this.pastInput(),a=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:n(function(i,a){var u,p,o;if(this.options.backtrack_lexer&&(o={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(o.yylloc.range=this.yylloc.range.slice(0))),p=i[0].match(/(?:\r\n?|\n).*/g),p&&(this.yylineno+=p.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:p?p[p.length-1].length-p[p.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],u=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),u)return u;if(this._backtrack){for(var m in o)this[m]=o[m];return!1}return!1},"test_match"),next:n(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,a,u,p;this._more||(this.yytext="",this.match="");for(var o=this._currentRules(),m=0;m<o.length;m++)if(u=this._input.match(this.rules[o[m]]),u&&(!a||u[0].length>a[0].length)){if(a=u,p=m,this.options.backtrack_lexer){if(i=this.test_match(u,o[m]),i!==!1)return i;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(i=this.test_match(a,o[p]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:n(function(){var i=this.next();return i||this.lex()},"lex"),begin:n(function(i){this.conditionStack.push(i)},"begin"),popState:n(function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:n(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:n(function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},"topState"),pushState:n(function(i){this.begin(i)},"pushState"),stateStackSize:n(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:n(function(i,a,u,p){switch(u){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();d.lexer=x;function f(){this.yy={}}return n(f,"Parser"),f.prototype=d,d.Parser=f,new f}();q.parser=q;var Tt=q,C="",U=[],j=[],V=[],St=n(function(){U.length=0,j.length=0,C="",V.length=0,vt()},"clear"),Mt=n(function(t){C=t,U.push(t)},"addSection"),Et=n(function(){return U},"getSections"),At=n(function(){let t=tt();const e=100;let r=0;for(;!t&&r<e;)t=tt(),r++;return j.push(...V),j},"getTasks"),It=n(function(){const t=[];return j.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},"updateActors"),Pt=n(function(t,e){const r=e.substr(1).split(":");let l=0,s=[];r.length===1?(l=Number(r[0]),s=[]):(l=Number(r[0]),s=r[1].split(","));const h=s.map(y=>y.trim()),c={section:C,type:C,people:h,task:t,score:l};V.push(c)},"addTask"),Ct=n(function(t){const e={section:C,type:C,description:t,task:t,classes:[]};j.push(e)},"addTaskOrg"),tt=n(function(){const t=n(function(r){return V[r].processed},"compileTask");let e=!0;for(const[r,l]of V.entries())t(r),e=e&&l.processed;return e},"compileTasks"),jt=n(function(){return It()},"getActors"),et={getConfig:n(()=>I().journey,"getConfig"),clear:St,setDiagramTitle:mt,getDiagramTitle:xt,setAccTitle:kt,getAccTitle:_t,setAccDescription:bt,getAccDescription:$t,addSection:Mt,getSections:Et,getTasks:At,addTask:Pt,addTaskOrg:Ct,getActors:jt},Vt=n(t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),Lt=Vt,H=n(function(t,e){return dt(t,e)},"drawRect"),Ft=n(function(t,e){const r=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),l=t.append("g");l.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),l.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function s(y){const d=Q().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",d).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}n(s,"smile");function h(y){const d=Q().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",d).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}n(h,"sad");function c(y){y.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return n(c,"ambivalent"),e.score>3?s(l):e.score<3?h(l):c(l),r},"drawFace"),at=n(function(t,e){const r=t.append("circle");return r.attr("cx",e.cx),r.attr("cy",e.cy),r.attr("class","actor-"+e.pos),r.attr("fill",e.fill),r.attr("stroke",e.stroke),r.attr("r",e.r),r.class!==void 0&&r.attr("class",r.class),e.title!==void 0&&r.append("title").text(e.title),r},"drawCircle"),ot=n(function(t,e){return ft(t,e)},"drawText"),Bt=n(function(t,e){function r(s,h,c,y,d){return s+","+h+" "+(s+c)+","+h+" "+(s+c)+","+(h+y-d)+" "+(s+c-d*1.2)+","+(h+y)+" "+s+","+(h+y)}n(r,"genPoints");const l=t.append("polygon");l.attr("points",r(e.x,e.y,50,20,7)),l.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ot(t,e)},"drawLabel"),Ot=n(function(t,e,r){const l=t.append("g"),s=rt();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=r.width*e.taskCount+r.diagramMarginX*(e.taskCount-1),s.height=r.height,s.class="journey-section section-type-"+e.num,s.rx=3,s.ry=3,H(l,s),lt(r)(e.text,l,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+e.num},r,e.colour)},"drawSection"),it=-1,Rt=n(function(t,e,r){const l=e.x+r.width/2,s=t.append("g");it++;const h=300+5*30;s.append("line").attr("id","task"+it).attr("x1",l).attr("y1",e.y).attr("x2",l).attr("y2",h).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Ft(s,{cx:l,cy:300+(5-e.score)*30,score:e.score});const c=rt();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=r.width,c.height=r.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,H(s,c);let y=e.x+14;e.people.forEach(d=>{const x=e.actors[d].color,f={cx:y,cy:e.y,r:7,fill:x,stroke:"#000",title:d,pos:e.actors[d].position};at(s,f),y+=10}),lt(r)(e.task,s,c.x,c.y,c.width,c.height,{class:"task"},r,e.colour)},"drawTask"),Dt=n(function(t,e){gt(t,e)},"drawBackgroundRect"),lt=function(){function t(s,h,c,y,d,x,f,g){const i=h.append("text").attr("x",c+d/2).attr("y",y+x/2+5).style("font-color",g).style("text-anchor","middle").text(s);l(i,f)}n(t,"byText");function e(s,h,c,y,d,x,f,g,i){const{taskFontSize:a,taskFontFamily:u}=g,p=s.split(/<br\s*\/?>/gi);for(let o=0;o<p.length;o++){const m=o*a-a*(p.length-1)/2,k=h.append("text").attr("x",c+d/2).attr("y",y).attr("fill",i).style("text-anchor","middle").style("font-size",a).style("font-family",u);k.append("tspan").attr("x",c+d/2).attr("dy",m).text(p[o]),k.attr("y",y+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),l(k,f)}}n(e,"byTspan");function r(s,h,c,y,d,x,f,g){const i=h.append("switch"),a=i.append("foreignObject").attr("x",c).attr("y",y).attr("width",d).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),e(s,i,c,y,d,x,f,g),l(a,f)}n(r,"byFo");function l(s,h){for(const c in h)c in h&&s.attr(c,h[c])}return n(l,"_setTextAttrs"),function(s){return s.textPlacement==="fo"?r:s.textPlacement==="old"?t:e}}(),Nt=n(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),L={drawRect:H,drawCircle:at,drawSection:Ot,drawText:ot,drawLabel:Bt,drawTask:Rt,drawBackgroundRect:Dt,initGraphics:Nt},zt=n(function(t){Object.keys(t).forEach(function(e){R[e]=t[e]})},"setConf"),S={};function ct(t){const e=I().journey;let r=60;Object.keys(S).forEach(l=>{const s=S[l].color,h={cx:20,cy:r,r:7,fill:s,stroke:"#000",pos:S[l].position};L.drawCircle(t,h);const c={x:40,y:r+7,fill:"#666",text:l,textMargin:e.boxTextMargin|5};L.drawText(t,c),r+=20})}n(ct,"drawActorLegend");var R=I().journey,A=R.leftMargin,Yt=n(function(t,e,r,l){const s=I().journey,h=I().securityLevel;let c;h==="sandbox"&&(c=W("#i"+e));const y=h==="sandbox"?W(c.nodes()[0].contentDocument.body):W("body");w.init();const d=y.select("#"+e);L.initGraphics(d);const x=l.db.getTasks(),f=l.db.getDiagramTitle(),g=l.db.getActors();for(const m in S)delete S[m];let i=0;g.forEach(m=>{S[m]={color:s.actorColours[i%s.actorColours.length],position:i},i++}),ct(d),w.insert(0,0,A,Object.keys(S).length*50),Wt(d,x,0);const a=w.getBounds();f&&d.append("text").text(f).attr("x",A).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const u=a.stopy-a.starty+2*s.diagramMarginY,p=A+a.stopx+2*s.diagramMarginX;wt(d,u,p,s.useMaxWidth),d.append("line").attr("x1",A).attr("y1",s.height*4).attr("x2",p-A-4).attr("y2",s.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const o=f?70:0;d.attr("viewBox",`${a.startx} -25 ${p} ${u+o}`),d.attr("preserveAspectRatio","xMinYMin meet"),d.attr("height",u+o+25)},"draw"),w={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:n(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:n(function(t,e,r,l){t[e]===void 0?t[e]=r:t[e]=l(r,t[e])},"updateVal"),updateBounds:n(function(t,e,r,l){const s=I().journey,h=this;let c=0;function y(d){return n(function(x){c++;const f=h.sequenceItems.length-c+1;h.updateVal(x,"starty",e-f*s.boxMargin,Math.min),h.updateVal(x,"stopy",l+f*s.boxMargin,Math.max),h.updateVal(w.data,"startx",t-f*s.boxMargin,Math.min),h.updateVal(w.data,"stopx",r+f*s.boxMargin,Math.max),d!=="activation"&&(h.updateVal(x,"startx",t-f*s.boxMargin,Math.min),h.updateVal(x,"stopx",r+f*s.boxMargin,Math.max),h.updateVal(w.data,"starty",e-f*s.boxMargin,Math.min),h.updateVal(w.data,"stopy",l+f*s.boxMargin,Math.max))},"updateItemBounds")}n(y,"updateFn"),this.sequenceItems.forEach(y())},"updateBounds"),insert:n(function(t,e,r,l){const s=Math.min(t,r),h=Math.max(t,r),c=Math.min(e,l),y=Math.max(e,l);this.updateVal(w.data,"startx",s,Math.min),this.updateVal(w.data,"starty",c,Math.min),this.updateVal(w.data,"stopx",h,Math.max),this.updateVal(w.data,"stopy",y,Math.max),this.updateBounds(s,c,h,y)},"insert"),bumpVerticalPos:n(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:n(function(){return this.verticalPos},"getVerticalPos"),getBounds:n(function(){return this.data},"getBounds")},X=R.sectionFills,st=R.sectionColours,Wt=n(function(t,e,r){const l=I().journey;let s="";const h=l.height*2+l.diagramMarginY,c=r+h;let y=0,d="#CCC",x="black",f=0;for(const[g,i]of e.entries()){if(s!==i.section){d=X[y%X.length],f=y%X.length,x=st[y%st.length];let u=0;const p=i.section;for(let m=g;m<e.length&&e[m].section==p;m++)u=u+1;const o={x:g*l.taskMargin+g*l.width+A,y:50,text:i.section,fill:d,num:f,colour:x,taskCount:u};L.drawSection(t,o,l),s=i.section,y++}const a=i.people.reduce((u,p)=>(S[p]&&(u[p]=S[p]),u),{});i.x=g*l.taskMargin+g*l.width+A,i.y=c,i.width=l.diagramMarginX,i.height=l.diagramMarginY,i.colour=x,i.fill=d,i.num=f,i.actors=a,L.drawTask(t,i,l),w.insert(i.x,i.y,i.x+i.width+l.taskMargin,300+5*30)}},"drawTasks"),nt={setConf:zt,draw:Yt},Qt={parser:Tt,db:et,renderer:nt,styles:Lt,init:n(t=>{nt.setConf(t.journey),et.clear()},"init")};export{Qt as diagram};
//# sourceMappingURL=journeyDiagram-G5WM74LC-tuzbgul9.chunk.mjs.map
