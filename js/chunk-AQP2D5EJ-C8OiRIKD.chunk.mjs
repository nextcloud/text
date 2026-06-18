import{g as Qt}from"./chunk-55IACEB6-Bjcg478j.chunk.mjs";import{s as Zt}from"./chunk-2J33WTMH-DCmiUFUU.chunk.mjs";import{_ as u,l as k,c as O,r as te,u as ee,a as se,b as ie,g as re,s as ne,q as oe,t as ae,aa as ce,k as M,z as le}from"./mermaid.core-BCNL4ZWL.chunk.mjs";var Et=(function(){var t=u(function(N,n,r,y){for(r=r||{},y=N.length;y--;r[N[y]]=n);return r},"o"),e=[1,2],c=[1,3],s=[1,4],d=[2,4],h=[1,9],g=[1,11],S=[1,16],o=[1,17],f=[1,18],b=[1,19],E=[1,33],x=[1,20],w=[1,21],l=[1,22],C=[1,23],D=[1,24],F=[1,26],v=[1,27],Y=[1,28],P=[1,29],tt=[1,30],et=[1,31],st=[1,32],it=[1,35],rt=[1,36],nt=[1,37],ot=[1,38],K=[1,34],p=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],at=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],xt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],gt={trace:u(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:u(function(N,n,r,y,m,i,_){var a=i.length-1;switch(m){case 3:return y.setRootDoc(i[a]),i[a];case 4:this.$=[];break;case 5:i[a]!="nl"&&(i[a-1].push(i[a]),this.$=i[a-1]);break;case 6:case 7:this.$=i[a];break;case 8:this.$="nl";break;case 12:this.$=i[a];break;case 13:const U=i[a-1];U.description=y.trimColon(i[a]),this.$=U;break;case 14:this.$={stmt:"relation",state1:i[a-2],state2:i[a]};break;case 15:const ft=y.trimColon(i[a]);this.$={stmt:"relation",state1:i[a-3],state2:i[a-1],description:ft};break;case 19:this.$={stmt:"state",id:i[a-3],type:"default",description:"",doc:i[a-1]};break;case 20:var R=i[a],z=i[a-2].trim();if(i[a].match(":")){var lt=i[a].split(":");R=lt[0],z=[z,lt[1]]}this.$={stmt:"state",id:R,type:"default",description:z};break;case 21:this.$={stmt:"state",id:i[a-3],type:"default",description:i[a-5],doc:i[a-1]};break;case 22:this.$={stmt:"state",id:i[a],type:"fork"};break;case 23:this.$={stmt:"state",id:i[a],type:"join"};break;case 24:this.$={stmt:"state",id:i[a],type:"choice"};break;case 25:this.$={stmt:"state",id:y.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[a-1].trim(),note:{position:i[a-2].trim(),text:i[a].trim()}};break;case 29:this.$=i[a].trim(),y.setAccTitle(this.$);break;case 30:case 31:this.$=i[a].trim(),y.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[a-3],url:i[a-2],tooltip:i[a-1]};break;case 33:this.$={stmt:"click",id:i[a-3],url:i[a-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[a-1].trim(),classes:i[a].trim()};break;case 36:this.$={stmt:"style",id:i[a-1].trim(),styleClass:i[a].trim()};break;case 37:this.$={stmt:"applyClass",id:i[a-1].trim(),styleClass:i[a].trim()};break;case 38:y.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:y.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:y.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:y.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[a].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[a-2].trim(),classes:[i[a].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[a-2].trim(),classes:[i[a].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:c,6:s},{1:[3]},{3:5,4:e,5:c,6:s},{3:6,4:e,5:c,6:s},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],d,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:o,19:f,22:b,24:E,25:x,26:w,27:l,28:C,29:D,32:25,33:F,35:v,37:Y,38:P,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:K},t(p,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:S,17:o,19:f,22:b,24:E,25:x,26:w,27:l,28:C,29:D,32:25,33:F,35:v,37:Y,38:P,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:K},t(p,[2,7]),t(p,[2,8]),t(p,[2,9]),t(p,[2,10]),t(p,[2,11]),t(p,[2,12],{14:[1,40],15:[1,41]}),t(p,[2,16]),{18:[1,42]},t(p,[2,18],{20:[1,43]}),{23:[1,44]},t(p,[2,22]),t(p,[2,23]),t(p,[2,24]),t(p,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(p,[2,28]),{34:[1,49]},{36:[1,50]},t(p,[2,31]),{13:51,24:E,57:K},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(at,[2,44],{58:[1,56]}),t(at,[2,45],{58:[1,57]}),t(p,[2,38]),t(p,[2,39]),t(p,[2,40]),t(p,[2,41]),t(p,[2,6]),t(p,[2,13]),{13:58,24:E,57:K},t(p,[2,17]),t(xt,d,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(p,[2,29]),t(p,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(p,[2,14],{14:[1,71]}),{4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:o,19:f,21:[1,72],22:b,24:E,25:x,26:w,27:l,28:C,29:D,32:25,33:F,35:v,37:Y,38:P,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:K},t(p,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(p,[2,34]),t(p,[2,35]),t(p,[2,36]),t(p,[2,37]),t(at,[2,46]),t(at,[2,47]),t(p,[2,15]),t(p,[2,19]),t(xt,d,{7:78}),t(p,[2,26]),t(p,[2,27]),{5:[1,79]},{5:[1,80]},{4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:o,19:f,21:[1,81],22:b,24:E,25:x,26:w,27:l,28:C,29:D,32:25,33:F,35:v,37:Y,38:P,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:K},t(p,[2,32]),t(p,[2,33]),t(p,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:u(function(N,n){if(n.recoverable)this.trace(N);else{var r=new Error(N);throw r.hash=n,r}},"parseError"),parse:u(function(N){var n=this,r=[0],y=[],m=[null],i=[],_=this.table,a="",R=0,z=0,lt=2,U=1,ft=i.slice.call(arguments,1),T=Object.create(this.lexer),W={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(W.yy[St]=this.yy[St]);T.setInput(N,W.yy),W.yy.lexer=T,W.yy.parser=this,typeof T.yylloc>"u"&&(T.yylloc={});var mt=T.yylloc;i.push(mt);var Jt=T.options&&T.options.ranges;typeof W.yy.parseError=="function"?this.parseError=W.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function qt(L){r.length=r.length-2*L,m.length=m.length-L,i.length=i.length-L}u(qt,"popStack");function Ct(){var L;return L=y.pop()||T.lex()||U,typeof L!="number"&&(L instanceof Array&&(y=L,L=y.pop()),L=n.symbols_[L]||L),L}u(Ct,"lex");for(var I,j,A,kt,X={},ht,B,It,dt;;){if(j=r[r.length-1],this.defaultActions[j]?A=this.defaultActions[j]:((I===null||typeof I>"u")&&(I=Ct()),A=_[j]&&_[j][I]),typeof A>"u"||!A.length||!A[0]){var _t="";dt=[];for(ht in _[j])this.terminals_[ht]&&ht>lt&&dt.push("'"+this.terminals_[ht]+"'");T.showPosition?_t="Parse error on line "+(R+1)+`:
`+T.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[I]||I)+"'":_t="Parse error on line "+(R+1)+": Unexpected "+(I==U?"end of input":"'"+(this.terminals_[I]||I)+"'"),this.parseError(_t,{text:T.match,token:this.terminals_[I]||I,line:T.yylineno,loc:mt,expected:dt})}if(A[0]instanceof Array&&A.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+I);switch(A[0]){case 1:r.push(I),m.push(T.yytext),i.push(T.yylloc),r.push(A[1]),I=null,z=T.yyleng,a=T.yytext,R=T.yylineno,mt=T.yylloc;break;case 2:if(B=this.productions_[A[1]][1],X.$=m[m.length-B],X._$={first_line:i[i.length-(B||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(B||1)].first_column,last_column:i[i.length-1].last_column},Jt&&(X._$.range=[i[i.length-(B||1)].range[0],i[i.length-1].range[1]]),kt=this.performAction.apply(X,[a,z,R,W.yy,A[1],m,i].concat(ft)),typeof kt<"u")return kt;B&&(r=r.slice(0,-1*B*2),m=m.slice(0,-1*B),i=i.slice(0,-1*B)),r.push(this.productions_[A[1]][0]),m.push(X.$),i.push(X._$),It=_[r[r.length-2]][r[r.length-1]],r.push(It);break;case 3:return!0}}return!0},"parse")},Ut=(function(){var N={EOF:1,parseError:u(function(n,r){if(this.yy.parser)this.yy.parser.parseError(n,r);else throw new Error(n)},"parseError"),setInput:u(function(n,r){return this.yy=r||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:u(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var r=n.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:u(function(n){var r=n.length,y=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===m.length?this.yylloc.first_column:0)+m[m.length-y.length].length-y[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},"unput"),more:u(function(){return this._more=!0,this},"more"),reject:u(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:u(function(n){this.unput(this.match.slice(n))},"less"),pastInput:u(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:u(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:u(function(){var n=this.pastInput(),r=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+r+"^"},"showPosition"),test_match:u(function(n,r){var y,m,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),m=n[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],y=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var _ in i)this[_]=i[_];return!1}return!1},"test_match"),next:u(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,r,y,m;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),_=0;_<i.length;_++)if(y=this._input.match(this.rules[i[_]]),y&&(!r||y[0].length>r[0].length)){if(r=y,m=_,this.options.backtrack_lexer){if(n=this.test_match(y,i[_]),n!==!1)return n;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(n=this.test_match(r,i[m]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:u(function(){var n=this.next();return n||this.lex()},"lex"),begin:u(function(n){this.conditionStack.push(n)},"begin"),popState:u(function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:u(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:u(function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},"topState"),pushState:u(function(n){this.begin(n)},"pushState"),stateStackSize:u(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:u(function(n,r,y,m){function i(){const _=r.yytext.indexOf("%%");if(_===0)return!1;if(_>0){const a=r.yytext.slice(0,_),R=r.yytext.slice(_);R&&n.lexer.unput(R),r.yytext=a}return!0}switch(u(i,"processId"),y){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;case 17:return this.popState(),"acc_title_value";case 18:return this.begin("acc_descr"),35;case 19:return this.popState(),"acc_descr_value";case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 25:return this.popState(),this.pushState("CLASSDEFID"),42;case 26:return this.popState(),43;case 27:return this.pushState("CLASS"),48;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;case 29:return this.popState(),50;case 30:return this.pushState("STYLE"),45;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 32:return this.popState(),47;case 33:return this.pushState("SCALE"),17;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 39:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 40:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 41:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 42:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";case 49:return i()?(this.popState(),"ID"):void 0;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:return 19;case 53:this.popState();break;case 54:return this.popState(),this.pushState("struct"),20;case 55:return this.popState(),21;case 56:break;case 57:return this.begin("NOTE"),29;case 58:return this.popState(),this.pushState("NOTE_ID"),59;case 59:return this.popState(),this.pushState("NOTE_ID"),60;case 60:this.popState(),this.pushState("FLOATING_NOTE");break;case 61:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 62:break;case 63:return"NOTE_TEXT";case 64:return i()?(this.popState(),"ID"):void 0;case 65:return i()?(this.popState(),this.pushState("NOTE_TEXT"),24):void 0;case 66:return this.popState(),r.yytext=r.yytext.substr(2).trim(),31;case 67:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),31;case 68:return 6;case 69:return 6;case 70:return 16;case 71:return 57;case 72:return i()?24:void 0;case 73:return r.yytext=r.yytext.trim(),14;case 74:return 15;case 75:return 28;case 76:return 58;case 77:return 5;case 78:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,55,56,57,71,72,73,74,75,76],inclusive:!1},FLOATING_NOTE_ID:{rules:[64],inclusive:!1},FLOATING_NOTE:{rules:[61,62,63],inclusive:!1},NOTE_TEXT:{rules:[66,67],inclusive:!1},NOTE_ID:{rules:[65],inclusive:!1},NOTE:{rules:[58,59,60],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,54,57,68,69,70,71,72,73,74,76,77,78],inclusive:!0}}};return N})();gt.lexer=Ut;function ct(){this.yy={}}return u(ct,"Parser"),ct.prototype=gt,gt.Parser=ct,new ct})();Et.parser=Et;var Ye=Et,he="TB",Ft="TB",Lt="dir",H="state",V="root",Dt="relation",de="classDef",ue="style",pe="applyClass",Q="default",Bt="divider",Yt="fill:none",Pt="fill: #333",Gt="c",Wt="markdown",jt="normal",Tt="rect",bt="rectWithTitle",ye="stateStart",ge="stateEnd",vt="divider",At="roundedWithTitle",fe="note",Se="noteGroup",Z="statediagram",me="state",ke=`${Z}-${me}`,Mt="transition",_e="note",Te="note-edge",be=`${Mt} ${Te}`,Ee=`${Z}-${_e}`,De="cluster",$e=`${Z}-${De}`,xe="cluster-alt",Ce=`${Z}-${xe}`,Kt="parent",zt="note",Ie="state",$t="----",Le=`${$t}${zt}`,wt=`${$t}${Kt}`,Xt=u((t,e=Ft)=>{if(!t.doc)return e;let c=e;for(const s of t.doc)s.stmt==="dir"&&(c=s.value);return c},"getDir"),ve=u(function(t,e){return e.db.getClasses()},"getClasses"),Ae=u(async function(t,e,c,s){k.info("REF0:"),k.info("Drawing state diagram (v2)",e);const{securityLevel:d,state:h,layout:g}=O();s.db.extract(s.db.getRootDocV2());const S=s.db.getData(),o=Qt(e,d);S.type=s.type,S.layoutAlgorithm=g,S.nodeSpacing=h?.nodeSpacing||50,S.rankSpacing=h?.rankSpacing||50,O().look==="neo"?S.markers=["barbNeo"]:S.markers=["barb"],S.diagramId=e,await te(S,o);const f=8;try{(typeof s.db.getLinks=="function"?s.db.getLinks():new Map).forEach((b,E)=>{const x=typeof E=="string"?E:typeof E?.id=="string"?E.id:"";if(!x){k.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(E));return}const w=o.node()?.querySelectorAll("g");let l;if(w?.forEach(v=>{v.textContent?.trim()===x&&(l=v)}),!l){k.warn("⚠️ Could not find node matching text:",x);return}const C=l.parentNode;if(!C){k.warn("⚠️ Node has no parent, cannot wrap:",x);return}const D=document.createElementNS("http://www.w3.org/2000/svg","a"),F=b.url.replace(/^"+|"+$/g,"");if(D.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",F),D.setAttribute("target","_blank"),b.tooltip){const v=b.tooltip.replace(/^"+|"+$/g,"");D.setAttribute("title",v)}C.replaceChild(D,l),D.appendChild(l),k.info("🔗 Wrapped node in <a> tag for:",x,b.url)})}catch(b){k.error("❌ Error injecting clickable links:",b)}ee.insertTitle(o,"statediagramTitleText",h?.titleTopMargin??25,s.db.getDiagramTitle()),Zt(o,f,Z,h?.useMaxWidth??!0)},"draw"),Pe={getClasses:ve,draw:Ae,getDir:Xt},pt=new Map,G=0;function yt(t="",e=0,c="",s=$t){const d=c!==null&&c.length>0?`${s}${c}`:"";return`${Ie}-${t}${d}-${e}`}u(yt,"stateDomId");var we=u((t,e,c,s,d,h,g,S)=>{k.trace("items",e),e.forEach(o=>{switch(o.stmt){case H:q(t,o,c,s,d,h,g,S);break;case Q:q(t,o,c,s,d,h,g,S);break;case Dt:{q(t,o.state1,c,s,d,h,g,S),q(t,o.state2,c,s,d,h,g,S);const f=g==="neo",b={id:"edge"+G,start:o.state1.id,end:o.state2.id,arrowhead:"normal",arrowTypeEnd:f?"arrow_barb_neo":"arrow_barb",style:Yt,labelStyle:"",label:M.sanitizeText(o.description??"",O()),arrowheadStyle:Pt,labelpos:Gt,labelType:Wt,thickness:jt,classes:Mt,look:g};d.push(b),G++}break}})},"setupDoc"),Ot=u((t,e=Ft)=>{let c=e;if(t.doc)for(const s of t.doc)s.stmt==="dir"&&(c=s.value);return c},"getDir");function J(t,e,c){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(d=>{const h=c.get(d);h&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...h.styles])}));const s=t.find(d=>d.id===e.id);s?Object.assign(s,e):t.push(e)}u(J,"insertOrUpdateNode");function Vt(t){return t?.classes?.join(" ")??""}u(Vt,"getClassesFromDbInfo");function Ht(t){return t?.styles??[]}u(Ht,"getStylesFromDbInfo");var q=u((t,e,c,s,d,h,g,S)=>{const o=e.id,f=c.get(o),b=Vt(f),E=Ht(f),x=O();if(k.info("dataFetcher parsedItem",e,f,E),o!=="root"){let w=Tt;e.start===!0?w=ye:e.start===!1&&(w=ge),e.type!==Q&&(w=e.type),pt.get(o)||pt.set(o,{id:o,shape:w,description:M.sanitizeText(o,x),cssClasses:`${b} ${ke}`,cssStyles:E});const l=pt.get(o);e.description&&(Array.isArray(l.description)?(l.shape=bt,l.description.push(e.description)):l.description?.length&&l.description.length>0?(l.shape=bt,l.description===o?l.description=[e.description]:l.description=[l.description,e.description]):(l.shape=Tt,l.description=e.description),l.description=M.sanitizeTextOrArray(l.description,x)),l.description?.length===1&&l.shape===bt&&(l.type==="group"?l.shape=At:l.shape=Tt),!l.type&&e.doc&&(k.info("Setting cluster for XCX",o,Ot(e)),l.type="group",l.isGroup=!0,l.dir=Ot(e),l.shape=e.type===Bt?vt:At,l.cssClasses=`${l.cssClasses} ${$e} ${h?Ce:""}`);const C={labelStyle:"",shape:l.shape,label:l.description,cssClasses:l.cssClasses,cssCompiledStyles:[],cssStyles:l.cssStyles,id:o,dir:l.dir,domId:yt(o,G),type:l.type,isGroup:l.type==="group",padding:8,rx:10,ry:10,look:g,labelType:"markdown"};if(C.shape===vt&&(C.label=""),t&&t.id!=="root"&&(k.trace("Setting node ",o," to be child of its parent ",t.id),C.parentId=t.id),C.centerLabel=!0,e.note){const D={labelStyle:"",shape:fe,label:e.note.text,labelType:"markdown",cssClasses:Ee,cssStyles:[],cssCompiledStyles:[],id:o+Le+"-"+G,domId:yt(o,G,zt),type:l.type,isGroup:l.type==="group",padding:x.flowchart?.padding,look:g,position:e.note.position},F=o+wt,v={labelStyle:"",shape:Se,label:e.note.text,cssClasses:l.cssClasses,cssStyles:[],id:o+wt,domId:yt(o,G,Kt),type:"group",isGroup:!0,padding:16,look:g,position:e.note.position};G++,v.id=F,D.parentId=F,J(s,v,S),J(s,D,S),J(s,C,S);let Y=o,P=D.id;e.note.position==="left of"&&(Y=D.id,P=o),d.push({id:Y+"-"+P,start:Y,end:P,arrowhead:"none",arrowTypeEnd:"",style:Yt,labelStyle:"",classes:be,arrowheadStyle:Pt,labelpos:Gt,labelType:Wt,thickness:jt,look:g})}else J(s,C,S)}e.doc&&(k.trace("Adding nodes children "),we(e,e.doc,c,s,d,!h,g,S))},"dataFetcher"),Oe=u(()=>{pt.clear(),G=0},"reset"),$={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Nt=u(()=>new Map,"newClassesList"),Rt=u(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),ut=u(t=>JSON.parse(JSON.stringify(t)),"clone"),Ge=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Nt(),this.documents={root:Rt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=se,this.setAccTitle=ie,this.getAccDescription=re,this.setAccDescription=ne,this.setDiagramTitle=oe,this.getDiagramTitle=ae,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}static{u(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){this.clear(!0);for(const s of Array.isArray(t)?t:t.doc)switch(s.stmt){case H:this.addState(s.id.trim(),s.type,s.doc,s.description,s.note);break;case Dt:this.addRelation(s.state1,s.state2,s.description);break;case de:this.addStyleClass(s.id.trim(),s.classes);break;case ue:this.handleStyleDef(s);break;case pe:this.setCssClass(s.id.trim(),s.styleClass);break;case"click":this.addLink(s.id,s.url,s.tooltip);break}const e=this.getStates(),c=O();Oe(),q(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,c.look,this.classes);for(const s of this.nodes)if(Array.isArray(s.label)){if(s.description=s.label.slice(1),s.isGroup&&s.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${s.id}]`);s.label=s.label[0]}}handleStyleDef(t){const e=t.id.trim().split(","),c=t.styleClass.split(",");for(const s of e){let d=this.getState(s);if(!d){const h=s.trim();this.addState(h),d=this.getState(h)}d&&(d.styles=c.map(h=>h.replace(/;/g,"")?.trim()))}}setRootDoc(t){k.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,c){if(e.stmt===Dt){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===H&&(e.id===$.START_NODE?(e.id=t.id+(c?"_start":"_end"),e.start=c):e.id=e.id.trim()),e.stmt!==V&&e.stmt!==H||!e.doc)return;const s=[];let d=[];for(const h of e.doc)if(h.type===Bt){const g=ut(h);g.doc=ut(d),s.push(g),d=[]}else d.push(h);if(s.length>0&&d.length>0){const h={stmt:H,id:ce(),type:"divider",doc:ut(d)};s.push(ut(h)),e.doc=s}e.doc.forEach(h=>this.docTranslator(e,h,!0))}getRootDocV2(){return this.docTranslator({id:V,stmt:V},{id:V,stmt:V,doc:this.rootDoc},!0),{id:V,doc:this.rootDoc}}addState(t,e=Q,c=void 0,s=void 0,d=void 0,h=void 0,g=void 0,S=void 0){const o=t?.trim();if(!this.currentDocument.states.has(o))k.info("Adding state ",o,s),this.currentDocument.states.set(o,{stmt:H,id:o,descriptions:[],type:e,doc:c,note:d,classes:[],styles:[],textStyles:[]});else{const f=this.currentDocument.states.get(o);if(!f)throw new Error(`State not found: ${o}`);f.doc||(f.doc=c),f.type||(f.type=e)}if(s&&(k.info("Setting state description",o,s),(Array.isArray(s)?s:[s]).forEach(f=>this.addDescription(o,f.trim()))),d){const f=this.currentDocument.states.get(o);if(!f)throw new Error(`State not found: ${o}`);f.note=d,f.note.text=M.sanitizeText(f.note.text,O())}h&&(k.info("Setting state classes",o,h),(Array.isArray(h)?h:[h]).forEach(f=>this.setCssClass(o,f.trim()))),g&&(k.info("Setting state styles",o,g),(Array.isArray(g)?g:[g]).forEach(f=>this.setStyle(o,f.trim()))),S&&(k.info("Setting state styles",o,g),(Array.isArray(S)?S:[S]).forEach(f=>this.setTextStyle(o,f.trim())))}clear(t){this.nodes=[],this.edges=[],this.documents={root:Rt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Nt(),t||(this.links=new Map,le())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){k.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,c){this.links.set(t,{url:e,tooltip:c}),k.warn("Adding link",t,e,c)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===$.START_NODE?(this.startEndCount++,`${$.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=Q){return t===$.START_NODE?$.START_TYPE:e}endIdIfNeeded(t=""){return t===$.END_NODE?(this.startEndCount++,`${$.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",e=Q){return t===$.END_NODE?$.END_TYPE:e}addRelationObjs(t,e,c=""){const s=this.startIdIfNeeded(t.id.trim()),d=this.startTypeIfNeeded(t.id.trim(),t.type),h=this.startIdIfNeeded(e.id.trim()),g=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(s,d,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(h,g,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:M.sanitizeText(c,O())})}addRelation(t,e,c){if(typeof t=="object"&&typeof e=="object")this.addRelationObjs(t,e,c);else if(typeof t=="string"&&typeof e=="string"){const s=this.startIdIfNeeded(t.trim()),d=this.startTypeIfNeeded(t),h=this.endIdIfNeeded(e.trim()),g=this.endTypeIfNeeded(e);this.addState(s,d),this.addState(h,g),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:c?M.sanitizeText(c,O()):void 0})}}addDescription(t,e){const c=this.currentDocument.states.get(t),s=e.startsWith(":")?e.replace(":","").trim():e;c?.descriptions?.push(M.sanitizeText(s,O()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});const c=this.classes.get(t);e&&c&&e.split($.STYLECLASS_SEP).forEach(s=>{const d=s.replace(/([^;]*);/,"$1").trim();if(RegExp($.COLOR_KEYWORD).exec(s)){const h=d.replace($.FILL_KEYWORD,$.BG_FILL).replace($.COLOR_KEYWORD,$.FILL_KEYWORD);c.textStyles.push(h)}c.styles.push(d)})}getClasses(){return this.classes}setCssClass(t,e){t.split(",").forEach(c=>{let s=this.getState(c);if(!s){const d=c.trim();this.addState(d),s=this.getState(d)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===Lt)}getDirection(){return this.getDirectionStatement()?.value??he}setDirection(t){const e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:Lt,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){const t=O();return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:Xt(this.getRootDocV2())}}getConfig(){return O().state}},Ne=u(t=>`
defs [id$="-barbEnd"] {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: ${t.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: ${t.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: ${t.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${t.mainBkg};
  stroke: ${t.useGradient?"url("+t.svgId+"-gradient)":t.stateBorder||t.nodeBorder};
  stroke-width: ${t.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${t.radius}px;
  ry: ${t.radius}px;
  filter: ${t.dropShadow?t.dropShadow.replace("url(#drop-shadow)",`url(${t.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),We=Ne;export{Ge as S,Ye as a,Pe as b,We as s};
//# sourceMappingURL=chunk-AQP2D5EJ-C8OiRIKD.chunk.mjs.map
