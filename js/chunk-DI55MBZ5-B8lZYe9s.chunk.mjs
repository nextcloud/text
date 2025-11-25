import{g as Qt}from"./chunk-55IACEB6-DsirH141.chunk.mjs";import{s as Zt}from"./chunk-QN33PNHL-DuzxTV6C.chunk.mjs";import{_ as u,l as T,c as R,r as te,u as ee,a as se,b as ie,g as re,s as ne,q as ae,t as oe,ab as ce,k as U,z as le}from"./mermaid.core-DrJfu-9d.chunk.mjs";var Et=function(){var t=u(function(O,r,n,y){for(n=n||{},y=O.length;y--;n[O[y]]=r);return n},"o"),e=[1,2],o=[1,3],s=[1,4],d=[2,4],h=[1,9],g=[1,11],S=[1,16],a=[1,17],f=[1,18],L=[1,19],b=[1,33],D=[1,20],w=[1,21],l=[1,22],C=[1,23],k=[1,24],N=[1,26],I=[1,27],Y=[1,28],F=[1,29],tt=[1,30],et=[1,31],st=[1,32],it=[1,35],rt=[1,36],nt=[1,37],at=[1,38],K=[1,34],p=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ot=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],$t=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],gt={trace:u(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:u(function(O,r,n,y,m,i,$){var c=i.length-1;switch(m){case 3:return y.setRootDoc(i[c]),i[c];case 4:this.$=[];break;case 5:i[c]!="nl"&&(i[c-1].push(i[c]),this.$=i[c-1]);break;case 6:case 7:this.$=i[c];break;case 8:this.$="nl";break;case 12:this.$=i[c];break;case 13:const H=i[c-1];H.description=y.trimColon(i[c]),this.$=H;break;case 14:this.$={stmt:"relation",state1:i[c-2],state2:i[c]};break;case 15:const ft=y.trimColon(i[c]);this.$={stmt:"relation",state1:i[c-3],state2:i[c-1],description:ft};break;case 19:this.$={stmt:"state",id:i[c-3],type:"default",description:"",doc:i[c-1]};break;case 20:var G=i[c],z=i[c-2].trim();if(i[c].match(":")){var lt=i[c].split(":");G=lt[0],z=[z,lt[1]]}this.$={stmt:"state",id:G,type:"default",description:z};break;case 21:this.$={stmt:"state",id:i[c-3],type:"default",description:i[c-5],doc:i[c-1]};break;case 22:this.$={stmt:"state",id:i[c],type:"fork"};break;case 23:this.$={stmt:"state",id:i[c],type:"join"};break;case 24:this.$={stmt:"state",id:i[c],type:"choice"};break;case 25:this.$={stmt:"state",id:y.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[c-1].trim(),note:{position:i[c-2].trim(),text:i[c].trim()}};break;case 29:this.$=i[c].trim(),y.setAccTitle(this.$);break;case 30:case 31:this.$=i[c].trim(),y.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[c-3],url:i[c-2],tooltip:i[c-1]};break;case 33:this.$={stmt:"click",id:i[c-3],url:i[c-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[c-1].trim(),classes:i[c].trim()};break;case 36:this.$={stmt:"style",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 37:this.$={stmt:"applyClass",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 38:y.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:y.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:y.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:y.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[c].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:o,6:s},{1:[3]},{3:5,4:e,5:o,6:s},{3:6,4:e,5:o,6:s},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],d,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:a,19:f,22:L,24:b,25:D,26:w,27:l,28:C,29:k,32:25,33:N,35:I,37:Y,38:F,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:at,57:K},t(p,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:S,17:a,19:f,22:L,24:b,25:D,26:w,27:l,28:C,29:k,32:25,33:N,35:I,37:Y,38:F,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:at,57:K},t(p,[2,7]),t(p,[2,8]),t(p,[2,9]),t(p,[2,10]),t(p,[2,11]),t(p,[2,12],{14:[1,40],15:[1,41]}),t(p,[2,16]),{18:[1,42]},t(p,[2,18],{20:[1,43]}),{23:[1,44]},t(p,[2,22]),t(p,[2,23]),t(p,[2,24]),t(p,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(p,[2,28]),{34:[1,49]},{36:[1,50]},t(p,[2,31]),{13:51,24:b,57:K},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(ot,[2,44],{58:[1,56]}),t(ot,[2,45],{58:[1,57]}),t(p,[2,38]),t(p,[2,39]),t(p,[2,40]),t(p,[2,41]),t(p,[2,6]),t(p,[2,13]),{13:58,24:b,57:K},t(p,[2,17]),t($t,d,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(p,[2,29]),t(p,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(p,[2,14],{14:[1,71]}),{4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:a,19:f,21:[1,72],22:L,24:b,25:D,26:w,27:l,28:C,29:k,32:25,33:N,35:I,37:Y,38:F,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:at,57:K},t(p,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(p,[2,34]),t(p,[2,35]),t(p,[2,36]),t(p,[2,37]),t(ot,[2,46]),t(ot,[2,47]),t(p,[2,15]),t(p,[2,19]),t($t,d,{7:78}),t(p,[2,26]),t(p,[2,27]),{5:[1,79]},{5:[1,80]},{4:h,5:g,8:8,9:10,10:12,11:13,12:14,13:15,16:S,17:a,19:f,21:[1,81],22:L,24:b,25:D,26:w,27:l,28:C,29:k,32:25,33:N,35:I,37:Y,38:F,41:tt,45:et,48:st,51:it,52:rt,53:nt,54:at,57:K},t(p,[2,32]),t(p,[2,33]),t(p,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:u(function(O,r){if(r.recoverable)this.trace(O);else{var n=new Error(O);throw n.hash=r,n}},"parseError"),parse:u(function(O){var r=this,n=[0],y=[],m=[null],i=[],$=this.table,c="",G=0,z=0,lt=2,H=1,ft=i.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(j.yy[St]=this.yy[St]);_.setInput(O,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var mt=_.yylloc;i.push(mt);var Jt=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function qt(A){n.length=n.length-2*A,m.length=m.length-A,i.length=i.length-A}u(qt,"popStack");function xt(){var A;return A=y.pop()||_.lex()||H,typeof A!="number"&&(A instanceof Array&&(y=A,A=y.pop()),A=r.symbols_[A]||A),A}u(xt,"lex");for(var x,W,v,Tt,X={},ht,B,Lt,dt;;){if(W=n[n.length-1],this.defaultActions[W]?v=this.defaultActions[W]:((x===null||typeof x>"u")&&(x=xt()),v=$[W]&&$[W][x]),typeof v>"u"||!v.length||!v[0]){var _t="";dt=[];for(ht in $[W])this.terminals_[ht]&&ht>lt&&dt.push("'"+this.terminals_[ht]+"'");_.showPosition?_t="Parse error on line "+(G+1)+`:
`+_.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[x]||x)+"'":_t="Parse error on line "+(G+1)+": Unexpected "+(x==H?"end of input":"'"+(this.terminals_[x]||x)+"'"),this.parseError(_t,{text:_.match,token:this.terminals_[x]||x,line:_.yylineno,loc:mt,expected:dt})}if(v[0]instanceof Array&&v.length>1)throw new Error("Parse Error: multiple actions possible at state: "+W+", token: "+x);switch(v[0]){case 1:n.push(x),m.push(_.yytext),i.push(_.yylloc),n.push(v[1]),x=null,z=_.yyleng,c=_.yytext,G=_.yylineno,mt=_.yylloc;break;case 2:if(B=this.productions_[v[1]][1],X.$=m[m.length-B],X._$={first_line:i[i.length-(B||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(B||1)].first_column,last_column:i[i.length-1].last_column},Jt&&(X._$.range=[i[i.length-(B||1)].range[0],i[i.length-1].range[1]]),Tt=this.performAction.apply(X,[c,z,G,j.yy,v[1],m,i].concat(ft)),typeof Tt<"u")return Tt;B&&(n=n.slice(0,-1*B*2),m=m.slice(0,-1*B),i=i.slice(0,-1*B)),n.push(this.productions_[v[1]][0]),m.push(X.$),i.push(X._$),Lt=$[n[n.length-2]][n[n.length-1]],n.push(Lt);break;case 3:return!0}}return!0},"parse")},Ht=function(){var O={EOF:1,parseError:u(function(r,n){if(this.yy.parser)this.yy.parser.parseError(r,n);else throw new Error(r)},"parseError"),setInput:u(function(r,n){return this.yy=n||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:u(function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var n=r.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},"input"),unput:u(function(r){var n=r.length,y=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===m.length?this.yylloc.first_column:0)+m[m.length-y.length].length-y[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},"unput"),more:u(function(){return this._more=!0,this},"more"),reject:u(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:u(function(r){this.unput(this.match.slice(r))},"less"),pastInput:u(function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:u(function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:u(function(){var r=this.pastInput(),n=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+n+"^"},"showPosition"),test_match:u(function(r,n){var y,m,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),m=r[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],y=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var $ in i)this[$]=i[$];return!1}return!1},"test_match"),next:u(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,n,y,m;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),$=0;$<i.length;$++)if(y=this._input.match(this.rules[i[$]]),y&&(!n||y[0].length>n[0].length)){if(n=y,m=$,this.options.backtrack_lexer){if(r=this.test_match(y,i[$]),r!==!1)return r;if(this._backtrack){n=!1;continue}else return!1}else if(!this.options.flex)break}return n?(r=this.test_match(n,i[m]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:u(function(){var r=this.next();return r||this.lex()},"lex"),begin:u(function(r){this.conditionStack.push(r)},"begin"),popState:u(function(){var r=this.conditionStack.length-1;return r>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:u(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:u(function(r){return r=this.conditionStack.length-1-Math.abs(r||0),r>=0?this.conditionStack[r]:"INITIAL"},"topState"),pushState:u(function(r){this.begin(r)},"pushState"),stateStackSize:u(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:u(function(r,n,y,m){switch(y){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:break;case 9:break;case 10:return 5;case 11:break;case 12:break;case 13:break;case 14:break;case 15:return this.pushState("SCALE"),17;case 16:return 18;case 17:this.popState();break;case 18:return this.begin("acc_title"),33;case 19:return this.popState(),"acc_title_value";case 20:return this.begin("acc_descr"),35;case 21:return this.popState(),"acc_descr_value";case 22:this.begin("acc_descr_multiline");break;case 23:this.popState();break;case 24:return"acc_descr_multiline_value";case 25:return this.pushState("CLASSDEF"),41;case 26:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 27:return this.popState(),this.pushState("CLASSDEFID"),42;case 28:return this.popState(),43;case 29:return this.pushState("CLASS"),48;case 30:return this.popState(),this.pushState("CLASS_STYLE"),49;case 31:return this.popState(),50;case 32:return this.pushState("STYLE"),45;case 33:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 34:return this.popState(),47;case 35:return this.pushState("SCALE"),17;case 36:return 18;case 37:this.popState();break;case 38:this.pushState("STATE");break;case 39:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 40:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;case 41:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;case 42:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),25;case 43:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),26;case 44:return this.popState(),n.yytext=n.yytext.slice(0,-10).trim(),27;case 45:return 51;case 46:return 52;case 47:return 53;case 48:return 54;case 49:this.pushState("STATE_STRING");break;case 50:return this.pushState("STATE_ID"),"AS";case 51:return this.popState(),"ID";case 52:this.popState();break;case 53:return"STATE_DESCR";case 54:return 19;case 55:this.popState();break;case 56:return this.popState(),this.pushState("struct"),20;case 57:break;case 58:return this.popState(),21;case 59:break;case 60:return this.begin("NOTE"),29;case 61:return this.popState(),this.pushState("NOTE_ID"),59;case 62:return this.popState(),this.pushState("NOTE_ID"),60;case 63:this.popState(),this.pushState("FLOATING_NOTE");break;case 64:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 65:break;case 66:return"NOTE_TEXT";case 67:return this.popState(),"ID";case 68:return this.popState(),this.pushState("NOTE_TEXT"),24;case 69:return this.popState(),n.yytext=n.yytext.substr(2).trim(),31;case 70:return this.popState(),n.yytext=n.yytext.slice(0,-8).trim(),31;case 71:return 6;case 72:return 6;case 73:return 16;case 74:return 57;case 75:return 24;case 76:return n.yytext=n.yytext.trim(),14;case 77:return 15;case 78:return 28;case 79:return 58;case 80:return 5;case 81:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[12,13],inclusive:!1},struct:{rules:[12,13,25,29,32,38,45,46,47,48,57,58,59,60,74,75,76,77,78],inclusive:!1},FLOATING_NOTE_ID:{rules:[67],inclusive:!1},FLOATING_NOTE:{rules:[64,65,66],inclusive:!1},NOTE_TEXT:{rules:[69,70],inclusive:!1},NOTE_ID:{rules:[68],inclusive:!1},NOTE:{rules:[61,62,63],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[34],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[33],inclusive:!1},CLASS_STYLE:{rules:[31],inclusive:!1},CLASS:{rules:[30],inclusive:!1},CLASSDEFID:{rules:[28],inclusive:!1},CLASSDEF:{rules:[26,27],inclusive:!1},acc_descr_multiline:{rules:[23,24],inclusive:!1},acc_descr:{rules:[21],inclusive:!1},acc_title:{rules:[19],inclusive:!1},SCALE:{rules:[16,17,36,37],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[51],inclusive:!1},STATE_STRING:{rules:[52,53],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[12,13,39,40,41,42,43,44,49,50,54,55,56],inclusive:!1},ID:{rules:[12,13],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,18,20,22,25,29,32,35,38,56,60,71,72,73,74,75,76,77,79,80,81],inclusive:!0}}};return O}();gt.lexer=Ht;function ct(){this.yy={}}return u(ct,"Parser"),ct.prototype=gt,gt.Parser=ct,new ct}();Et.parser=Et;var Fe=Et,he="TB",Bt="TB",At="dir",V="state",M="root",Dt="relation",de="classDef",ue="style",pe="applyClass",Q="default",Yt="divider",Ft="fill:none",Pt="fill: #333",Gt="c",jt="text",Wt="normal",bt="rect",kt="rectWithTitle",ye="stateStart",ge="stateEnd",It="divider",vt="roundedWithTitle",fe="note",Se="noteGroup",Z="statediagram",me="state",Te=`${Z}-${me}`,Ut="transition",_e="note",be="note-edge",ke=`${Ut} ${be}`,Ee=`${Z}-${_e}`,De="cluster",Ce=`${Z}-${De}`,$e="cluster-alt",xe=`${Z}-${$e}`,Kt="parent",zt="note",Le="state",Ct="----",Ae=`${Ct}${zt}`,wt=`${Ct}${Kt}`,Xt=u((t,e=Bt)=>{if(!t.doc)return e;let o=e;for(const s of t.doc)s.stmt==="dir"&&(o=s.value);return o},"getDir"),Ie=u(function(t,e){return e.db.getClasses()},"getClasses"),ve=u(async function(t,e,o,s){T.info("REF0:"),T.info("Drawing state diagram (v2)",e);const{securityLevel:d,state:h,layout:g}=R();s.db.extract(s.db.getRootDocV2());const S=s.db.getData(),a=Qt(e,d);S.type=s.type,S.layoutAlgorithm=g,S.nodeSpacing=h?.nodeSpacing||50,S.rankSpacing=h?.rankSpacing||50,S.markers=["barb"],S.diagramId=e,await te(S,a);const f=8;try{(typeof s.db.getLinks=="function"?s.db.getLinks():new Map).forEach((L,b)=>{const D=typeof b=="string"?b:typeof b?.id=="string"?b.id:"";if(!D){T.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(b));return}const w=a.node()?.querySelectorAll("g");let l;if(w?.forEach(I=>{I.textContent?.trim()===D&&(l=I)}),!l){T.warn("⚠️ Could not find node matching text:",D);return}const C=l.parentNode;if(!C){T.warn("⚠️ Node has no parent, cannot wrap:",D);return}const k=document.createElementNS("http://www.w3.org/2000/svg","a"),N=L.url.replace(/^"+|"+$/g,"");if(k.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",N),k.setAttribute("target","_blank"),L.tooltip){const I=L.tooltip.replace(/^"+|"+$/g,"");k.setAttribute("title",I)}C.replaceChild(k,l),k.appendChild(l),T.info("🔗 Wrapped node in <a> tag for:",D,L.url)})}catch(L){T.error("❌ Error injecting clickable links:",L)}ee.insertTitle(a,"statediagramTitleText",h?.titleTopMargin??25,s.db.getDiagramTitle()),Zt(a,f,Z,h?.useMaxWidth??!0)},"draw"),Pe={getClasses:Ie,draw:ve,getDir:Xt},pt=new Map,P=0;function yt(t="",e=0,o="",s=Ct){const d=o!==null&&o.length>0?`${s}${o}`:"";return`${Le}-${t}${d}-${e}`}u(yt,"stateDomId");var we=u((t,e,o,s,d,h,g,S)=>{T.trace("items",e),e.forEach(a=>{switch(a.stmt){case V:q(t,a,o,s,d,h,g,S);break;case Q:q(t,a,o,s,d,h,g,S);break;case Dt:{q(t,a.state1,o,s,d,h,g,S),q(t,a.state2,o,s,d,h,g,S);const f={id:"edge"+P,start:a.state1.id,end:a.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:Ft,labelStyle:"",label:U.sanitizeText(a.description??"",R()),arrowheadStyle:Pt,labelpos:Gt,labelType:jt,thickness:Wt,classes:Ut,look:g};d.push(f),P++}break}})},"setupDoc"),Ot=u((t,e=Bt)=>{let o=e;if(t.doc)for(const s of t.doc)s.stmt==="dir"&&(o=s.value);return o},"getDir");function J(t,e,o){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(d=>{const h=o.get(d);h&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...h.styles])}));const s=t.find(d=>d.id===e.id);s?Object.assign(s,e):t.push(e)}u(J,"insertOrUpdateNode");function Mt(t){return t?.classes?.join(" ")??""}u(Mt,"getClassesFromDbInfo");function Vt(t){return t?.styles??[]}u(Vt,"getStylesFromDbInfo");var q=u((t,e,o,s,d,h,g,S)=>{const a=e.id,f=o.get(a),L=Mt(f),b=Vt(f),D=R();if(T.info("dataFetcher parsedItem",e,f,b),a!=="root"){let w=bt;e.start===!0?w=ye:e.start===!1&&(w=ge),e.type!==Q&&(w=e.type),pt.get(a)||pt.set(a,{id:a,shape:w,description:U.sanitizeText(a,D),cssClasses:`${L} ${Te}`,cssStyles:b});const l=pt.get(a);e.description&&(Array.isArray(l.description)?(l.shape=kt,l.description.push(e.description)):l.description?.length&&l.description.length>0?(l.shape=kt,l.description===a?l.description=[e.description]:l.description=[l.description,e.description]):(l.shape=bt,l.description=e.description),l.description=U.sanitizeTextOrArray(l.description,D)),l.description?.length===1&&l.shape===kt&&(l.type==="group"?l.shape=vt:l.shape=bt),!l.type&&e.doc&&(T.info("Setting cluster for XCX",a,Ot(e)),l.type="group",l.isGroup=!0,l.dir=Ot(e),l.shape=e.type===Yt?It:vt,l.cssClasses=`${l.cssClasses} ${Ce} ${h?xe:""}`);const C={labelStyle:"",shape:l.shape,label:l.description,cssClasses:l.cssClasses,cssCompiledStyles:[],cssStyles:l.cssStyles,id:a,dir:l.dir,domId:yt(a,P),type:l.type,isGroup:l.type==="group",padding:8,rx:10,ry:10,look:g};if(C.shape===It&&(C.label=""),t&&t.id!=="root"&&(T.trace("Setting node ",a," to be child of its parent ",t.id),C.parentId=t.id),C.centerLabel=!0,e.note){const k={labelStyle:"",shape:fe,label:e.note.text,cssClasses:Ee,cssStyles:[],cssCompiledStyles:[],id:a+Ae+"-"+P,domId:yt(a,P,zt),type:l.type,isGroup:l.type==="group",padding:D.flowchart?.padding,look:g,position:e.note.position},N=a+wt,I={labelStyle:"",shape:Se,label:e.note.text,cssClasses:l.cssClasses,cssStyles:[],id:a+wt,domId:yt(a,P,Kt),type:"group",isGroup:!0,padding:16,look:g,position:e.note.position};P++,I.id=N,k.parentId=N,J(s,I,S),J(s,k,S),J(s,C,S);let Y=a,F=k.id;e.note.position==="left of"&&(Y=k.id,F=a),d.push({id:Y+"-"+F,start:Y,end:F,arrowhead:"none",arrowTypeEnd:"",style:Ft,labelStyle:"",classes:ke,arrowheadStyle:Pt,labelpos:Gt,labelType:jt,thickness:Wt,look:g})}else J(s,C,S)}e.doc&&(T.trace("Adding nodes children "),we(e,e.doc,o,s,d,!h,g,S))},"dataFetcher"),Oe=u(()=>{pt.clear(),P=0},"reset"),E={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Rt=u(()=>new Map,"newClassesList"),Nt=u(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),ut=u(t=>JSON.parse(JSON.stringify(t)),"clone"),Ge=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Rt(),this.documents={root:Nt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=se,this.setAccTitle=ie,this.getAccDescription=re,this.setAccDescription=ne,this.setDiagramTitle=ae,this.getDiagramTitle=oe,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}static{u(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){this.clear(!0);for(const s of Array.isArray(t)?t:t.doc)switch(s.stmt){case V:this.addState(s.id.trim(),s.type,s.doc,s.description,s.note);break;case Dt:this.addRelation(s.state1,s.state2,s.description);break;case de:this.addStyleClass(s.id.trim(),s.classes);break;case ue:this.handleStyleDef(s);break;case pe:this.setCssClass(s.id.trim(),s.styleClass);break;case"click":this.addLink(s.id,s.url,s.tooltip);break}const e=this.getStates(),o=R();Oe(),q(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,o.look,this.classes);for(const s of this.nodes)if(Array.isArray(s.label)){if(s.description=s.label.slice(1),s.isGroup&&s.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${s.id}]`);s.label=s.label[0]}}handleStyleDef(t){const e=t.id.trim().split(","),o=t.styleClass.split(",");for(const s of e){let d=this.getState(s);if(!d){const h=s.trim();this.addState(h),d=this.getState(h)}d&&(d.styles=o.map(h=>h.replace(/;/g,"")?.trim()))}}setRootDoc(t){T.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,o){if(e.stmt===Dt){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===V&&(e.id===E.START_NODE?(e.id=t.id+(o?"_start":"_end"),e.start=o):e.id=e.id.trim()),e.stmt!==M&&e.stmt!==V||!e.doc)return;const s=[];let d=[];for(const h of e.doc)if(h.type===Yt){const g=ut(h);g.doc=ut(d),s.push(g),d=[]}else d.push(h);if(s.length>0&&d.length>0){const h={stmt:V,id:ce(),type:"divider",doc:ut(d)};s.push(ut(h)),e.doc=s}e.doc.forEach(h=>this.docTranslator(e,h,!0))}getRootDocV2(){return this.docTranslator({id:M,stmt:M},{id:M,stmt:M,doc:this.rootDoc},!0),{id:M,doc:this.rootDoc}}addState(t,e=Q,o=void 0,s=void 0,d=void 0,h=void 0,g=void 0,S=void 0){const a=t?.trim();if(!this.currentDocument.states.has(a))T.info("Adding state ",a,s),this.currentDocument.states.set(a,{stmt:V,id:a,descriptions:[],type:e,doc:o,note:d,classes:[],styles:[],textStyles:[]});else{const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.doc||(f.doc=o),f.type||(f.type=e)}if(s&&(T.info("Setting state description",a,s),(Array.isArray(s)?s:[s]).forEach(f=>this.addDescription(a,f.trim()))),d){const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.note=d,f.note.text=U.sanitizeText(f.note.text,R())}h&&(T.info("Setting state classes",a,h),(Array.isArray(h)?h:[h]).forEach(f=>this.setCssClass(a,f.trim()))),g&&(T.info("Setting state styles",a,g),(Array.isArray(g)?g:[g]).forEach(f=>this.setStyle(a,f.trim()))),S&&(T.info("Setting state styles",a,g),(Array.isArray(S)?S:[S]).forEach(f=>this.setTextStyle(a,f.trim())))}clear(t){this.nodes=[],this.edges=[],this.documents={root:Nt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Rt(),t||(this.links=new Map,le())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){T.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,o){this.links.set(t,{url:e,tooltip:o}),T.warn("Adding link",t,e,o)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===E.START_NODE?(this.startEndCount++,`${E.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=Q){return t===E.START_NODE?E.START_TYPE:e}endIdIfNeeded(t=""){return t===E.END_NODE?(this.startEndCount++,`${E.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",e=Q){return t===E.END_NODE?E.END_TYPE:e}addRelationObjs(t,e,o=""){const s=this.startIdIfNeeded(t.id.trim()),d=this.startTypeIfNeeded(t.id.trim(),t.type),h=this.startIdIfNeeded(e.id.trim()),g=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(s,d,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(h,g,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:U.sanitizeText(o,R())})}addRelation(t,e,o){if(typeof t=="object"&&typeof e=="object")this.addRelationObjs(t,e,o);else if(typeof t=="string"&&typeof e=="string"){const s=this.startIdIfNeeded(t.trim()),d=this.startTypeIfNeeded(t),h=this.endIdIfNeeded(e.trim()),g=this.endTypeIfNeeded(e);this.addState(s,d),this.addState(h,g),this.currentDocument.relations.push({id1:s,id2:h,relationTitle:o?U.sanitizeText(o,R()):void 0})}}addDescription(t,e){const o=this.currentDocument.states.get(t),s=e.startsWith(":")?e.replace(":","").trim():e;o?.descriptions?.push(U.sanitizeText(s,R()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});const o=this.classes.get(t);e&&o&&e.split(E.STYLECLASS_SEP).forEach(s=>{const d=s.replace(/([^;]*);/,"$1").trim();if(RegExp(E.COLOR_KEYWORD).exec(s)){const h=d.replace(E.FILL_KEYWORD,E.BG_FILL).replace(E.COLOR_KEYWORD,E.FILL_KEYWORD);o.textStyles.push(h)}o.styles.push(d)})}getClasses(){return this.classes}setCssClass(t,e){t.split(",").forEach(o=>{let s=this.getState(o);if(!s){const d=o.trim();this.addState(d),s=this.getState(d)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===At)}getDirection(){return this.getDirectionStatement()?.value??he}setDirection(t){const e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:At,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){const t=R();return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:Xt(this.getRootDocV2())}}getConfig(){return R().state}},Re=u(t=>`
defs #statediagram-barbEnd {
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
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
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
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
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

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles"),je=Re;export{Ge as S,Fe as a,Pe as b,je as s};
//# sourceMappingURL=chunk-DI55MBZ5-B8lZYe9s.chunk.mjs.map
