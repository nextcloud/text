import{g as Zt}from"./chunk-XXDRQBXY-DIX1hkrO.chunk.mjs";import{s as te}from"./chunk-VR4S4FIN-D2uGwv9F.chunk.mjs";import{_ as d,l as T,c as N,x as ee,y as se,a as ie,b as re,g as ne,s as oe,o as ae,p as le,a8 as ce,k as W,q as he,d as kt}from"./mermaid.core-DOyWF5sM.chunk.mjs";import{f as de}from"./chunk-32BRIVSS-B2VXccf9.chunk.mjs";import{p as ue}from"./index-CBEmrcgU.chunk.mjs";var Dt=(function(){var t=d(function(F,n,r,y){for(r=r||{},y=F.length;y--;r[F[y]]=n);return r},"o"),e=[1,2],o=[1,3],s=[1,4],h=[2,4],c=[1,9],g=[1,11],m=[1,16],a=[1,17],f=[1,18],D=[1,19],x=[1,33],C=[1,20],O=[1,21],u=[1,22],k=[1,23],v=[1,24],I=[1,26],Y=[1,27],E=[1,28],R=[1,29],tt=[1,30],et=[1,31],st=[1,32],it=[1,35],rt=[1,36],nt=[1,37],ot=[1,38],M=[1,34],p=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],at=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],$t=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],gt={trace:d(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:d(function(F,n,r,y,S,i,b){var l=i.length-1;switch(S){case 3:return y.setRootDoc(i[l]),i[l];case 4:this.$=[];break;case 5:i[l]!="nl"&&(i[l-1].push(i[l]),this.$=i[l-1]);break;case 6:case 7:this.$=i[l];break;case 8:this.$="nl";break;case 12:this.$=i[l];break;case 13:const J=i[l-1];J.description=y.trimColon(i[l]),this.$=J;break;case 14:this.$={stmt:"relation",state1:i[l-2],state2:i[l]};break;case 15:const ft=y.trimColon(i[l]);this.$={stmt:"relation",state1:i[l-3],state2:i[l-1],description:ft};break;case 19:this.$={stmt:"state",id:i[l-3],type:"default",description:"",doc:i[l-1]};break;case 20:var B=i[l],U=i[l-2].trim();if(i[l].match(":")){var ct=i[l].split(":");B=ct[0],U=[U,ct[1]]}this.$={stmt:"state",id:B,type:"default",description:U};break;case 21:this.$={stmt:"state",id:i[l-3],type:"default",description:i[l-5],doc:i[l-1]};break;case 22:this.$={stmt:"state",id:i[l],type:"fork"};break;case 23:this.$={stmt:"state",id:i[l],type:"join"};break;case 24:this.$={stmt:"state",id:i[l],type:"choice"};break;case 25:this.$={stmt:"state",id:y.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[l-1].trim(),note:{position:i[l-2].trim(),text:i[l].trim()}};break;case 29:this.$=i[l].trim(),y.setAccTitle(this.$);break;case 30:case 31:this.$=i[l].trim(),y.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[l-3],url:i[l-2],tooltip:i[l-1]};break;case 33:this.$={stmt:"click",id:i[l-3],url:i[l-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[l-1].trim(),classes:i[l].trim()};break;case 36:this.$={stmt:"style",id:i[l-1].trim(),styleClass:i[l].trim()};break;case 37:this.$={stmt:"applyClass",id:i[l-1].trim(),styleClass:i[l].trim()};break;case 38:y.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:y.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:y.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:y.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[l].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[l-2].trim(),classes:[i[l].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[l-2].trim(),classes:[i[l].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:o,6:s},{1:[3]},{3:5,4:e,5:o,6:s},{3:6,4:e,5:o,6:s},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],h,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:c,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,22:D,24:x,25:C,26:O,27:u,28:k,29:v,32:25,33:I,35:Y,37:E,38:R,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:M},t(p,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:m,17:a,19:f,22:D,24:x,25:C,26:O,27:u,28:k,29:v,32:25,33:I,35:Y,37:E,38:R,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:M},t(p,[2,7]),t(p,[2,8]),t(p,[2,9]),t(p,[2,10]),t(p,[2,11]),t(p,[2,12],{14:[1,40],15:[1,41]}),t(p,[2,16]),{18:[1,42]},t(p,[2,18],{20:[1,43]}),{23:[1,44]},t(p,[2,22]),t(p,[2,23]),t(p,[2,24]),t(p,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(p,[2,28]),{34:[1,49]},{36:[1,50]},t(p,[2,31]),{13:51,24:x,57:M},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(at,[2,44],{58:[1,56]}),t(at,[2,45],{58:[1,57]}),t(p,[2,38]),t(p,[2,39]),t(p,[2,40]),t(p,[2,41]),t(p,[2,6]),t(p,[2,13]),{13:58,24:x,57:M},t(p,[2,17]),t($t,h,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(p,[2,29]),t(p,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(p,[2,14],{14:[1,71]}),{4:c,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,21:[1,72],22:D,24:x,25:C,26:O,27:u,28:k,29:v,32:25,33:I,35:Y,37:E,38:R,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:M},t(p,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(p,[2,34]),t(p,[2,35]),t(p,[2,36]),t(p,[2,37]),t(at,[2,46]),t(at,[2,47]),t(p,[2,15]),t(p,[2,19]),t($t,h,{7:78}),t(p,[2,26]),t(p,[2,27]),{5:[1,79]},{5:[1,80]},{4:c,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,21:[1,81],22:D,24:x,25:C,26:O,27:u,28:k,29:v,32:25,33:I,35:Y,37:E,38:R,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:ot,57:M},t(p,[2,32]),t(p,[2,33]),t(p,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:d(function(F,n){if(n.recoverable)this.trace(F);else{var r=new Error(F);throw r.hash=n,r}},"parseError"),parse:d(function(F){var n=this,r=[0],y=[],S=[null],i=[],b=this.table,l="",B=0,U=0,ct=2,J=1,ft=i.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var mt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,mt)&&(j.yy[mt]=this.yy[mt]);_.setInput(F,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var St=_.yylloc;i.push(St);var qt=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Qt(A){r.length=r.length-2*A,S.length=S.length-A,i.length=i.length-A}d(Qt,"popStack");function vt(){var A;return A=y.pop()||_.lex()||J,typeof A!="number"&&(A instanceof Array&&(y=A,A=y.pop()),A=n.symbols_[A]||A),A}d(vt,"lex");for(var L,z,w,Tt,H={},ht,P,Lt,dt;;){if(z=r[r.length-1],this.defaultActions[z]?w=this.defaultActions[z]:((L===null||typeof L>"u")&&(L=vt()),w=b[z]&&b[z][L]),typeof w>"u"||!w.length||!w[0]){var bt="";dt=[];for(ht in b[z])this.terminals_[ht]&&ht>ct&&dt.push("'"+this.terminals_[ht]+"'");_.showPosition?bt="Parse error on line "+(B+1)+`:
`+_.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[L]||L)+"'":bt="Parse error on line "+(B+1)+": Unexpected "+(L==J?"end of input":"'"+(this.terminals_[L]||L)+"'"),this.parseError(bt,{text:_.match,token:this.terminals_[L]||L,line:_.yylineno,loc:St,expected:dt})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+z+", token: "+L);switch(w[0]){case 1:r.push(L),S.push(_.yytext),i.push(_.yylloc),r.push(w[1]),L=null,U=_.yyleng,l=_.yytext,B=_.yylineno,St=_.yylloc;break;case 2:if(P=this.productions_[w[1]][1],H.$=S[S.length-P],H._$={first_line:i[i.length-(P||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(P||1)].first_column,last_column:i[i.length-1].last_column},qt&&(H._$.range=[i[i.length-(P||1)].range[0],i[i.length-1].range[1]]),Tt=this.performAction.apply(H,[l,U,B,j.yy,w[1],S,i].concat(ft)),typeof Tt<"u")return Tt;P&&(r=r.slice(0,-1*P*2),S=S.slice(0,-1*P),i=i.slice(0,-1*P)),r.push(this.productions_[w[1]][0]),S.push(H.$),i.push(H._$),Lt=b[r[r.length-2]][r[r.length-1]],r.push(Lt);break;case 3:return!0}}return!0},"parse")},Xt=(function(){var F={EOF:1,parseError:d(function(n,r){if(this.yy.parser)this.yy.parser.parseError(n,r);else throw new Error(n)},"parseError"),setInput:d(function(n,r){return this.yy=r||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:d(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var r=n.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:d(function(n){var r=n.length,y=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var S=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===S.length?this.yylloc.first_column:0)+S[S.length-y.length].length-y[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},"unput"),more:d(function(){return this._more=!0,this},"more"),reject:d(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:d(function(n){this.unput(this.match.slice(n))},"less"),pastInput:d(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:d(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:d(function(){var n=this.pastInput(),r=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+r+"^"},"showPosition"),test_match:d(function(n,r){var y,S,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),S=n[0].match(/(?:\r\n?|\n).*/g),S&&(this.yylineno+=S.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:S?S[S.length-1].length-S[S.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],y=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var b in i)this[b]=i[b];return!1}return!1},"test_match"),next:d(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,r,y,S;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),b=0;b<i.length;b++)if(y=this._input.match(this.rules[i[b]]),y&&(!r||y[0].length>r[0].length)){if(r=y,S=b,this.options.backtrack_lexer){if(n=this.test_match(y,i[b]),n!==!1)return n;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(n=this.test_match(r,i[S]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:d(function(){var n=this.next();return n||this.lex()},"lex"),begin:d(function(n){this.conditionStack.push(n)},"begin"),popState:d(function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:d(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:d(function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},"topState"),pushState:d(function(n){this.begin(n)},"pushState"),stateStackSize:d(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:d(function(n,r,y,S){function i(){const b=r.yytext.indexOf("%%");if(b===0)return!1;if(b>0){const l=r.yytext.slice(0,b),B=r.yytext.slice(b);B&&n.lexer.unput(B),r.yytext=l}return!0}switch(d(i,"processId"),y){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;case 17:return this.popState(),"acc_title_value";case 18:return this.begin("acc_descr"),35;case 19:return this.popState(),"acc_descr_value";case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 25:return this.popState(),this.pushState("CLASSDEFID"),42;case 26:return this.popState(),43;case 27:return this.pushState("CLASS"),48;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;case 29:return this.popState(),50;case 30:return this.pushState("STYLE"),45;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 32:return this.popState(),47;case 33:return this.pushState("SCALE"),17;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 39:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 40:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 41:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 42:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";case 49:return i()?(this.popState(),"ID"):void 0;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:throw new Error('Error: State name must be a single word. Found: "'+r.yytext.trim()+'"');case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;case 56:return this.popState(),21;case 57:break;case 58:return this.begin("NOTE"),29;case 59:return this.popState(),this.pushState("NOTE_ID"),59;case 60:return this.popState(),this.pushState("NOTE_ID"),60;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 63:break;case 64:return"NOTE_TEXT";case 65:return i()?(this.popState(),"ID"):void 0;case 66:return i()?(this.popState(),this.pushState("NOTE_TEXT"),24):void 0;case 67:return this.popState(),r.yytext=r.yytext.substr(2).trim(),31;case 68:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),31;case 69:return 6;case 70:return 6;case 71:return 16;case 72:return 57;case 73:return i()?24:void 0;case 74:return r.yytext=r.yytext.trim(),14;case 75:return 15;case 76:return 28;case 77:return 58;case 78:return 5;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}};return F})();gt.lexer=Xt;function lt(){this.yy={}}return d(lt,"Parser"),lt.prototype=gt,gt.Parser=lt,new lt})();Dt.parser=Dt;var We=Dt,pe="TB",Bt="TB",It="dir",V="state",K="root",xt="relation",ye="classDef",ge="style",fe="applyClass",Q="default",Yt="divider",Pt="fill:none",Gt="fill: #333",jt="c",zt="markdown",Wt="normal",_t="rect",Et="rectWithTitle",me="stateStart",Se="stateEnd",At="divider",wt="roundedWithTitle",Te="note",be="noteGroup",Z="statediagram",ke="state",_e=`${Z}-${ke}`,Mt="transition",Ee="note",De="note-edge",xe=`${Mt} ${De}`,Ce=`${Z}-${Ee}`,$e="cluster",ve=`${Z}-${$e}`,Le="cluster-alt",Ie=`${Z}-${Le}`,Ut="parent",Ht="note",Ae="state",Ct="----",we=`${Ct}${Ht}`,Ot=`${Ct}${Ut}`,Kt=d((t,e=Bt)=>{if(!t.doc)return e;let o=e;for(const s of t.doc)s.stmt==="dir"&&(o=s.value);return o},"getDir"),Oe=d(function(t,e){return e.db.getClasses()},"getClasses"),Ne=d(async function(t,e,o,s){T.info("REF0:"),T.info("Drawing state diagram (v2)",e);const{securityLevel:h,state:c,layout:g}=N();s.db.extract(s.db.getRootDocV2());const m=s.db.getData(),a=Zt(e,h);m.type=s.type,m.layoutAlgorithm=g,m.nodeSpacing=c?.nodeSpacing||50,m.rankSpacing=c?.rankSpacing||50,N().look==="neo"?m.markers=["barbNeo"]:m.markers=["barb"],m.diagramId=e,await ee(m,a);const f=8;try{(typeof s.db.getLinks=="function"?s.db.getLinks():new Map).forEach((D,x)=>{const C=typeof x=="string"?x:typeof x?.id=="string"?x.id:"",O=m.nodes.find(E=>E.id===C);if(!C){T.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(x));return}const u=a.node()?.querySelectorAll("g.node, g.rough-node");let k;if(u?.forEach(E=>{const R=E.textContent?.trim();(E.id===O?.domId||R===C)&&(k=E)}),!k){T.warn("⚠️ Could not find node matching text:",C);return}const v=k.parentNode;if(!v){T.warn("⚠️ Node has no parent, cannot wrap:",C);return}const I=document.createElementNS("http://www.w3.org/2000/svg","a"),Y=D.url.replace(/^"+|"+$/g,"");if(I.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",Y),I.setAttribute("target","_blank"),D.tooltip){const E=D.tooltip.replace(/^"+|"+$/g,"");I.setAttribute("title",E),k.setAttribute("title",E)}v.replaceChild(I,k),I.appendChild(k),T.info("🔗 Wrapped node in <a> tag for:",C,D.url)})}catch(D){T.error("❌ Error injecting clickable links:",D)}se.insertTitle(a,"statediagramTitleText",c?.titleTopMargin??25,s.db.getDiagramTitle()),te(a,f,Z,c?.useMaxWidth??!0)},"draw"),Me={getClasses:Oe,draw:Ne,getDir:Kt},pt=new Map,G=0;function yt(t="",e=0,o="",s=Ct){const h=o!==null&&o.length>0?`${s}${o}`:"";return`${Ae}-${t}${h}-${e}`}d(yt,"stateDomId");var Re=d((t,e,o,s,h,c,g,m)=>{T.trace("items",e),e.forEach(a=>{switch(a.stmt){case V:q(t,a,o,s,h,c,g,m);break;case Q:q(t,a,o,s,h,c,g,m);break;case xt:{q(t,a.state1,o,s,h,c,g,m),q(t,a.state2,o,s,h,c,g,m);const f=g==="neo",D={id:"edge"+G,start:a.state1.id,end:a.state2.id,arrowhead:"normal",arrowTypeEnd:f?"arrow_barb_neo":"arrow_barb",style:Pt,labelStyle:"",label:W.sanitizeText(a.description??"",N()),arrowheadStyle:Gt,labelpos:jt,labelType:zt,thickness:Wt,classes:Mt,look:g};h.push(D),G++}break}})},"setupDoc"),Nt=d((t,e=Bt)=>{let o=e;if(t.doc)for(const s of t.doc)s.stmt==="dir"&&(o=s.value);return o},"getDir");function X(t,e,o){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(h=>{const c=o.get(h);c&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...c.styles])}));const s=t.find(h=>h.id===e.id);s?Object.assign(s,e):t.push(e)}d(X,"insertOrUpdateNode");function Vt(t){return t?.classes?.join(" ")??""}d(Vt,"getClassesFromDbInfo");function Jt(t){return t?.styles??[]}d(Jt,"getStylesFromDbInfo");var q=d((t,e,o,s,h,c,g,m)=>{const a=e.id,f=o.get(a),D=Vt(f),x=Jt(f),C=N();if(T.info("dataFetcher parsedItem",e,f,x),a!=="root"){let O=_t;e.start===!0?O=me:e.start===!1&&(O=Se),e.type!==Q&&(O=e.type),pt.get(a)||pt.set(a,{id:a,shape:O,description:W.sanitizeText(a,C),cssClasses:`${D} ${_e}`,cssStyles:x});const u=pt.get(a);e.description&&(Array.isArray(u.description)?(u.shape=Et,u.description.push(e.description)):u.description?.length&&u.description.length>0?(u.shape=Et,u.description===a?u.description=[e.description]:u.description=[u.description,e.description]):(u.shape=_t,u.description=e.description),u.description=W.sanitizeTextOrArray(u.description,C)),u.description?.length===1&&u.shape===Et&&(u.type==="group"?u.shape=wt:u.shape=_t),!u.type&&e.doc&&(T.info("Setting cluster for XCX",a,Nt(e)),u.type="group",u.isGroup=!0,u.dir=Nt(e),u.explicitDir=e.doc.some(v=>v.stmt==="dir"),u.shape=e.type===Yt?At:wt,u.cssClasses=`${u.cssClasses} ${ve} ${c?Ie:""}`);const k={labelStyle:"",shape:u.shape,label:u.description,cssClasses:u.cssClasses,cssCompiledStyles:[],cssStyles:u.cssStyles,id:a,dir:u.dir,domId:yt(a,G),type:u.type,isGroup:u.type==="group",padding:8,rx:10,ry:10,look:g,labelType:"markdown"};if(k.shape===At&&(k.label=""),t&&t.id!=="root"&&(T.trace("Setting node ",a," to be child of its parent ",t.id),k.parentId=t.id),k.centerLabel=!0,e.note){const v={labelStyle:"",shape:Te,label:e.note.text,labelType:"markdown",cssClasses:Ce,cssStyles:[],cssCompiledStyles:[],id:a+we+"-"+G,domId:yt(a,G,Ht),type:u.type,isGroup:u.type==="group",padding:C.flowchart?.padding,look:g,position:e.note.position},I=a+Ot,Y={labelStyle:"",shape:be,label:e.note.text,cssClasses:u.cssClasses,cssStyles:[],id:a+Ot,domId:yt(a,G,Ut),type:"group",isGroup:!0,padding:16,look:g,position:e.note.position};G++,Y.id=I,v.parentId=I,X(s,Y,m),X(s,v,m),X(s,k,m);let E=a,R=v.id;e.note.position==="left of"&&(E=v.id,R=a),h.push({id:E+"-"+R,start:E,end:R,arrowhead:"none",arrowTypeEnd:"",style:Pt,labelStyle:"",classes:xe,arrowheadStyle:Gt,labelpos:jt,labelType:zt,thickness:Wt,look:g})}else X(s,k,m)}e.doc&&(T.trace("Adding nodes children "),Re(e,e.doc,o,s,h,!c,g,m))},"dataFetcher"),Fe=d(()=>{pt.clear(),G=0},"reset"),$={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Rt=d(()=>new Map,"newClassesList"),Ft=d(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),ut=d(t=>JSON.parse(JSON.stringify(t)),"clone"),Ue=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Rt(),this.documents={root:Ft()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=ie,this.setAccTitle=re,this.getAccDescription=ne,this.setAccDescription=oe,this.setDiagramTitle=ae,this.getDiagramTitle=le,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}static{d(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){this.clear(!0);for(const s of Array.isArray(t)?t:t.doc)switch(s.stmt){case V:this.addState(s.id.trim(),s.type,s.doc,s.description,s.note);break;case xt:this.addRelation(s.state1,s.state2,s.description);break;case ye:this.addStyleClass(s.id.trim(),s.classes);break;case ge:this.handleStyleDef(s);break;case fe:this.setCssClass(s.id.trim(),s.styleClass);break;case"click":this.addLink(s.id,s.url,s.tooltip);break}const e=this.getStates(),o=N();Fe(),q(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,o.look,this.classes);for(const s of this.nodes)if(Array.isArray(s.label)){if(s.description=s.label.slice(1),s.isGroup&&s.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${s.id}]`);s.label=s.label[0]}}handleStyleDef(t){const e=t.id.trim().split(","),o=t.styleClass.split(",");for(const s of e){let h=this.getState(s);if(!h){const c=s.trim();this.addState(c),h=this.getState(c)}h&&(h.styles=o.map(c=>c.replace(/;/g,"")?.trim()))}}setRootDoc(t){T.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,o){if(e.stmt===xt){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===V&&(e.id===$.START_NODE?(e.id=t.id+(o?"_start":"_end"),e.start=o):e.id=e.id.trim()),e.stmt!==K&&e.stmt!==V||!e.doc)return;const s=[];let h=[];for(const c of e.doc)if(c.type===Yt){const g=ut(c);g.doc=ut(h),s.push(g),h=[]}else h.push(c);if(s.length>0&&h.length>0){const c={stmt:V,id:ce(),type:"divider",doc:ut(h)};s.push(ut(c)),e.doc=s}e.doc.forEach(c=>this.docTranslator(e,c,!0))}getRootDocV2(){return this.docTranslator({id:K,stmt:K},{id:K,stmt:K,doc:this.rootDoc},!0),{id:K,doc:this.rootDoc}}addState(t,e=Q,o=void 0,s=void 0,h=void 0,c=void 0,g=void 0,m=void 0){const a=t?.trim();if(!this.currentDocument.states.has(a))T.info("Adding state ",a,s),this.currentDocument.states.set(a,{stmt:V,id:a,descriptions:[],type:e,doc:o,note:h,classes:[],styles:[],textStyles:[]});else{const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.doc||(f.doc=o),f.type||(f.type=e)}if(s&&(T.info("Setting state description",a,s),(Array.isArray(s)?s:[s]).forEach(f=>this.addDescription(a,f.trim()))),h){const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.note=h,f.note.text=W.sanitizeText(f.note.text,N())}c&&(T.info("Setting state classes",a,c),(Array.isArray(c)?c:[c]).forEach(f=>this.setCssClass(a,f.trim()))),g&&(T.info("Setting state styles",a,g),(Array.isArray(g)?g:[g]).forEach(f=>this.setStyle(a,f.trim()))),m&&(T.info("Setting state styles",a,g),(Array.isArray(m)?m:[m]).forEach(f=>this.setTextStyle(a,f.trim())))}clear(t){this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:Ft()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Rt(),t||(this.links=new Map,he())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){T.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,o){this.links.set(t,{url:e,tooltip:o}),T.warn("Adding link",t,e,o)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===$.START_NODE?(this.startEndCount++,`${$.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=Q){return t===$.START_NODE?$.START_TYPE:e}endIdIfNeeded(t=""){return t===$.END_NODE?(this.startEndCount++,`${$.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",e=Q){return t===$.END_NODE?$.END_TYPE:e}addRelationObjs(t,e,o=""){const s=this.startIdIfNeeded(t.id.trim()),h=this.startTypeIfNeeded(t.id.trim(),t.type),c=this.startIdIfNeeded(e.id.trim()),g=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(s,h,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(c,g,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:s,id2:c,relationTitle:W.sanitizeText(o,N())})}addRelation(t,e,o){if(typeof t=="object"&&typeof e=="object")this.addRelationObjs(t,e,o);else if(typeof t=="string"&&typeof e=="string"){const s=this.startIdIfNeeded(t.trim()),h=this.startTypeIfNeeded(t),c=this.endIdIfNeeded(e.trim()),g=this.endTypeIfNeeded(e);this.addState(s,h),this.addState(c,g),this.currentDocument.relations.push({id1:s,id2:c,relationTitle:o?W.sanitizeText(o,N()):void 0})}}addDescription(t,e){const o=this.currentDocument.states.get(t),s=e.startsWith(":")?e.replace(":","").trim():e;o?.descriptions?.push(W.sanitizeText(s,N()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});const o=this.classes.get(t);e&&o&&e.split($.STYLECLASS_SEP).forEach(s=>{const h=s.replace(/([^;]*);/,"$1").trim();if(RegExp($.COLOR_KEYWORD).exec(s)){const c=h.replace($.FILL_KEYWORD,$.BG_FILL).replace($.COLOR_KEYWORD,$.FILL_KEYWORD);o.textStyles.push(c)}o.styles.push(h)})}getClasses(){return this.classes}setupToolTips(t){const e=de();kt(t).select("svg").selectAll("g.node, g.rough-node").on("mouseover",o=>{const s=kt(o.currentTarget),h=s.attr("title");if(h===null)return;const c=o.currentTarget?.getBoundingClientRect();e.transition().duration(200).style("opacity",".9"),e.style("left",window.scrollX+c.left+(c.right-c.left)/2+"px").style("top",window.scrollY+c.bottom+"px"),e.html(ue.sanitize(h)),s.classed("hover",!0)}).on("mouseout",o=>{e.transition().duration(500).style("opacity",0),kt(o.currentTarget).classed("hover",!1)})}setCssClass(t,e){t.split(",").forEach(o=>{let s=this.getState(o);if(!s){const h=o.trim();this.addState(h),s=this.getState(h)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}bindFunctions(t){this.funs.forEach(e=>{e(t)})}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===It)}getDirection(){return this.getDirectionStatement()?.value??pe}setDirection(t){const e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:It,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){const t=N();return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:Kt(this.getRootDocV2())}}getConfig(){return N().state}},Be=d(t=>`
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
`,"getStyles"),He=Be;export{Ue as S,We as a,Me as b,He as s};
//# sourceMappingURL=chunk-EX3LRPZG-w9HRvpk5.chunk.mjs.map
