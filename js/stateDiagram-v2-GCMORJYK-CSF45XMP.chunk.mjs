import{g as ee}from"./chunk-XXDRQBXY-DZpkCUWV.chunk.mjs";import{s as se}from"./chunk-WEXAMYUT-BoFhiTnz.chunk.mjs";import{_ as u,l as b,c as N,r as ie,t as re,u as oe,a as ne,b as ae,g as le,s as ce,v as he,x as de,ag as ue,m as z,B as pe,k as _t,E as ye,F as ge,G as me,L as fe}from"./mermaid.core-9N3xj8ND.chunk.mjs";import{c as Se}from"./chunk-GWA4HPMP-BwUqle9W.chunk.mjs";import{p as ke}from"./translation-DoG5ZELJ-CqWioDiI.chunk.mjs";import"./modulepreload-polyfill-CBWYtosv.chunk.mjs";import"./emoji-picker-BCw35BJ9.chunk.mjs";var Dt=(function(){var t=u(function(O,o,r,g){for(r=r||{},g=O.length;g--;r[O[g]]=o);return r},"o"),e=[1,2],n=[1,3],s=[1,4],h=[2,4],l=[1,9],p=[1,11],m=[1,16],a=[1,17],f=[1,18],k=[1,19],E=[1,33],D=[1,20],Y=[1,21],A=[1,22],d=[1,23],v=[1,24],x=[1,26],B=[1,27],$=[1,28],R=[1,29],G=[1,30],st=[1,31],it=[1,32],rt=[1,35],ot=[1,36],nt=[1,37],at=[1,38],U=[1,34],y=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],lt=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],wt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],mt={trace:u(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:u(function(O,o,r,g,S,i,T){var c=i.length-1;switch(S){case 3:return g.setRootDoc(i[c]),i[c];case 4:this.$=[];break;case 5:i[c]!="nl"&&(i[c-1].push(i[c]),this.$=i[c-1]);break;case 6:case 7:this.$=i[c];break;case 8:this.$="nl";break;case 12:this.$=i[c];break;case 13:const X=i[c-1];X.description=g.trimColon(i[c]),this.$=X;break;case 14:this.$={stmt:"relation",state1:i[c-2],state2:i[c]};break;case 15:const ft=g.trimColon(i[c]);this.$={stmt:"relation",state1:i[c-3],state2:i[c-1],description:ft};break;case 19:this.$={stmt:"state",id:i[c-3],type:"default",description:"",doc:i[c-1]};break;case 20:var F=i[c],H=i[c-2].trim();if(i[c].match(":")){var ht=i[c].split(":");F=ht[0],H=[H,ht[1]]}this.$={stmt:"state",id:F,type:"default",description:H};break;case 21:this.$={stmt:"state",id:i[c-3],type:"default",description:i[c-5],doc:i[c-1]};break;case 22:this.$={stmt:"state",id:i[c],type:"fork"};break;case 23:this.$={stmt:"state",id:i[c],type:"join"};break;case 24:this.$={stmt:"state",id:i[c],type:"choice"};break;case 25:this.$={stmt:"state",id:g.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[c-1].trim(),note:{position:i[c-2].trim(),text:i[c].trim()}};break;case 29:this.$=i[c].trim(),g.setAccTitle(this.$);break;case 30:case 31:this.$=i[c].trim(),g.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[c-3],url:i[c-2],tooltip:i[c-1]};break;case 33:this.$={stmt:"click",id:i[c-3],url:i[c-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[c-1].trim(),classes:i[c].trim()};break;case 36:this.$={stmt:"style",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 37:this.$={stmt:"applyClass",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 38:g.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:g.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:g.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:g.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[c].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:n,6:s},{1:[3]},{3:5,4:e,5:n,6:s},{3:6,4:e,5:n,6:s},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],h,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:l,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,22:k,24:E,25:D,26:Y,27:A,28:d,29:v,32:25,33:x,35:B,37:$,38:R,41:G,45:st,48:it,51:rt,52:ot,53:nt,54:at,57:U},t(y,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:m,17:a,19:f,22:k,24:E,25:D,26:Y,27:A,28:d,29:v,32:25,33:x,35:B,37:$,38:R,41:G,45:st,48:it,51:rt,52:ot,53:nt,54:at,57:U},t(y,[2,7]),t(y,[2,8]),t(y,[2,9]),t(y,[2,10]),t(y,[2,11]),t(y,[2,12],{14:[1,40],15:[1,41]}),t(y,[2,16]),{18:[1,42]},t(y,[2,18],{20:[1,43]}),{23:[1,44]},t(y,[2,22]),t(y,[2,23]),t(y,[2,24]),t(y,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(y,[2,28]),{34:[1,49]},{36:[1,50]},t(y,[2,31]),{13:51,24:E,57:U},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(lt,[2,44],{58:[1,56]}),t(lt,[2,45],{58:[1,57]}),t(y,[2,38]),t(y,[2,39]),t(y,[2,40]),t(y,[2,41]),t(y,[2,6]),t(y,[2,13]),{13:58,24:E,57:U},t(y,[2,17]),t(wt,h,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(y,[2,29]),t(y,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(y,[2,14],{14:[1,71]}),{4:l,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,21:[1,72],22:k,24:E,25:D,26:Y,27:A,28:d,29:v,32:25,33:x,35:B,37:$,38:R,41:G,45:st,48:it,51:rt,52:ot,53:nt,54:at,57:U},t(y,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(y,[2,34]),t(y,[2,35]),t(y,[2,36]),t(y,[2,37]),t(lt,[2,46]),t(lt,[2,47]),t(y,[2,15]),t(y,[2,19]),t(wt,h,{7:78}),t(y,[2,26]),t(y,[2,27]),{5:[1,79]},{5:[1,80]},{4:l,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:m,17:a,19:f,21:[1,81],22:k,24:E,25:D,26:Y,27:A,28:d,29:v,32:25,33:x,35:B,37:$,38:R,41:G,45:st,48:it,51:rt,52:ot,53:nt,54:at,57:U},t(y,[2,32]),t(y,[2,33]),t(y,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:u(function(O,o){if(o.recoverable)this.trace(O);else{var r=new Error(O);throw r.hash=o,r}},"parseError"),parse:u(function(O){var o=this,r=[0],g=[],S=[null],i=[],T=this.table,c="",F=0,H=0,ht=2,X=1,ft=i.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(j.yy[St]=this.yy[St]);_.setInput(O,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var kt=_.yylloc;i.push(kt);var Zt=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function te(I){r.length=r.length-2*I,S.length=S.length-I,i.length=i.length-I}u(te,"popStack");function It(){var I;return I=g.pop()||_.lex()||X,typeof I!="number"&&(I instanceof Array&&(g=I,I=g.pop()),I=o.symbols_[I]||I),I}u(It,"lex");for(var w,M,L,bt,K={},dt,P,Lt,ut;;){if(M=r[r.length-1],this.defaultActions[M]?L=this.defaultActions[M]:((w===null||typeof w>"u")&&(w=It()),L=T[M]&&T[M][w]),typeof L>"u"||!L.length||!L[0]){var Tt="";ut=[];for(dt in T[M])this.terminals_[dt]&&dt>ht&&ut.push("'"+this.terminals_[dt]+"'");_.showPosition?Tt="Parse error on line "+(F+1)+`:
`+_.showPosition()+`
Expecting `+ut.join(", ")+", got '"+(this.terminals_[w]||w)+"'":Tt="Parse error on line "+(F+1)+": Unexpected "+(w==X?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(Tt,{text:_.match,token:this.terminals_[w]||w,line:_.yylineno,loc:kt,expected:ut})}if(L[0]instanceof Array&&L.length>1)throw new Error("Parse Error: multiple actions possible at state: "+M+", token: "+w);switch(L[0]){case 1:r.push(w),S.push(_.yytext),i.push(_.yylloc),r.push(L[1]),w=null,H=_.yyleng,c=_.yytext,F=_.yylineno,kt=_.yylloc;break;case 2:if(P=this.productions_[L[1]][1],K.$=S[S.length-P],K._$={first_line:i[i.length-(P||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(P||1)].first_column,last_column:i[i.length-1].last_column},Zt&&(K._$.range=[i[i.length-(P||1)].range[0],i[i.length-1].range[1]]),bt=this.performAction.apply(K,[c,H,F,j.yy,L[1],S,i].concat(ft)),typeof bt<"u")return bt;P&&(r=r.slice(0,-1*P*2),S=S.slice(0,-1*P),i=i.slice(0,-1*P)),r.push(this.productions_[L[1]][0]),S.push(K.$),i.push(K._$),Lt=T[r[r.length-2]][r[r.length-1]],r.push(Lt);break;case 3:return!0}}return!0},"parse")},Qt=(function(){var O={EOF:1,parseError:u(function(o,r){if(this.yy.parser)this.yy.parser.parseError(o,r);else throw new Error(o)},"parseError"),setInput:u(function(o,r){return this.yy=r||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:u(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var r=o.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:u(function(o){var r=o.length,g=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var S=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),g.length-1&&(this.yylineno-=g.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:g?(g.length===S.length?this.yylloc.first_column:0)+S[S.length-g.length].length-g[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},"unput"),more:u(function(){return this._more=!0,this},"more"),reject:u(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:u(function(o){this.unput(this.match.slice(o))},"less"),pastInput:u(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:u(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:u(function(){var o=this.pastInput(),r=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+r+"^"},"showPosition"),test_match:u(function(o,r){var g,S,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),S=o[0].match(/(?:\r\n?|\n).*/g),S&&(this.yylineno+=S.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:S?S[S.length-1].length-S[S.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],g=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),g)return g;if(this._backtrack){for(var T in i)this[T]=i[T];return!1}return!1},"test_match"),next:u(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,r,g,S;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),T=0;T<i.length;T++)if(g=this._input.match(this.rules[i[T]]),g&&(!r||g[0].length>r[0].length)){if(r=g,S=T,this.options.backtrack_lexer){if(o=this.test_match(g,i[T]),o!==!1)return o;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(o=this.test_match(r,i[S]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:u(function(){var o=this.next();return o||this.lex()},"lex"),begin:u(function(o){this.conditionStack.push(o)},"begin"),popState:u(function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:u(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:u(function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},"topState"),pushState:u(function(o){this.begin(o)},"pushState"),stateStackSize:u(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:u(function(o,r,g,S){function i(){const T=r.yytext.indexOf("%%");if(T===0)return!1;if(T>0){const c=r.yytext.slice(0,T),F=r.yytext.slice(T);F&&o.lexer.unput(F),r.yytext=c}return!0}switch(u(i,"processId"),g){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;case 17:return this.popState(),"acc_title_value";case 18:return this.begin("acc_descr"),35;case 19:return this.popState(),"acc_descr_value";case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 25:return this.popState(),this.pushState("CLASSDEFID"),42;case 26:return this.popState(),43;case 27:return this.pushState("CLASS"),48;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;case 29:return this.popState(),50;case 30:return this.pushState("STYLE"),45;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 32:return this.popState(),47;case 33:return this.pushState("SCALE"),17;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 39:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 40:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 41:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),26;case 42:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),27;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";case 49:return i()?(this.popState(),"ID"):void 0;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:throw new Error('Error: State name must be a single word. Found: "'+r.yytext.trim()+'"');case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;case 56:return this.popState(),21;case 57:break;case 58:return this.begin("NOTE"),29;case 59:return this.popState(),this.pushState("NOTE_ID"),59;case 60:return this.popState(),this.pushState("NOTE_ID"),60;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 63:break;case 64:return"NOTE_TEXT";case 65:return i()?(this.popState(),"ID"):void 0;case 66:return i()?(this.popState(),this.pushState("NOTE_TEXT"),24):void 0;case 67:return this.popState(),r.yytext=r.yytext.substr(2).trim(),31;case 68:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),31;case 69:return 6;case 70:return 6;case 71:return 16;case 72:return 57;case 73:return i()?24:void 0;case 74:return r.yytext=r.yytext.trim(),14;case 75:return 15;case 76:return 28;case 77:return 58;case 78:return 5;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}};return O})();mt.lexer=Qt;function ct(){this.yy={}}return u(ct,"Parser"),ct.prototype=mt,mt.Parser=ct,new ct})();Dt.parser=Dt;var be=Dt,Te="TB",Pt="TB",At="dir",V="state",J="root",xt="relation",_e="classDef",Ee="style",$e="applyClass",tt="default",Yt="divider",Gt="fill:none",Wt="fill: #333",jt="c",Mt="markdown",zt="normal",Et="rect",$t="rectWithTitle",De="stateStart",xe="stateEnd",Ct="divider",Nt="roundedWithTitle",Ce="note",ve="noteGroup",et="statediagram",we="state",Ie=`${et}-${we}`,Ut="transition",Le="note",Ae="note-edge",Ne=`${Ut} ${Ae}`,Re=`${et}-${Le}`,Oe="cluster",Fe=`${et}-${Oe}`,Be="cluster-alt",Pe=`${et}-${Be}`,Ht="parent",Kt="note",Ye="state",vt="----",Ge=`${vt}${Kt}`,Rt=`${vt}${Ht}`,yt=new Map,W=0,Jt=0,q=new Map,We=u((t,e,n,s)=>{if(t===Ct&&n?.id!==void 0&&q.has(n.id)){const p=q.get(n.id);return q.set(e,p),p}const h=Jt++,l=s?void 0:h;return q.set(e,l),l},"colorSlotFor");function gt(t="",e=0,n="",s=vt){const h=n!==null&&n.length>0?`${s}${n}`:"";return`${Ye}-${t}${h}-${e}`}u(gt,"stateDomId");var je=u((t,e,n,s,h,l,p,m)=>{b.trace("items",e),e.forEach(a=>{switch(a.stmt){case V:Z(t,a,n,s,h,l,p,m);break;case tt:Z(t,a,n,s,h,l,p,m);break;case xt:{Z(t,a.state1,n,s,h,l,p,m),Z(t,a.state2,n,s,h,l,p,m);const f=p==="neo",k={id:"edge"+W,start:a.state1.id,end:a.state2.id,arrowhead:"normal",arrowTypeEnd:f?"arrow_barb_neo":"arrow_barb",style:Gt,labelStyle:"",label:z.sanitizeText(a.description??"",N()),arrowheadStyle:Wt,labelpos:jt,labelType:Mt,thickness:zt,classes:Ut,look:p};h.push(k),W++}break}})},"setupDoc"),Ot=u((t,e=Pt)=>{let n=e;if(t.doc)for(const s of t.doc)s.stmt==="dir"&&(n=s.value);return n},"getDir");function Q(t,e,n){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(h=>{const l=n.get(h);l&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...l.styles])}));const s=t.find(h=>h.id===e.id);s?Object.assign(s,e):t.push(e)}u(Q,"insertOrUpdateNode");function Vt(t){return t?.classes?.join(" ")??""}u(Vt,"getClassesFromDbInfo");function Xt(t){return t?.styles??[]}u(Xt,"getStylesFromDbInfo");var Z=u((t,e,n,s,h,l,p,m)=>{const a=e.id,f=n.get(a),k=Vt(f),E=Xt(f),D=N(),Y=k.trim()!==""||E.length>0;if(b.info("dataFetcher parsedItem",e,f,E),a!=="root"){let A=Et;e.start===!0?A=De:e.start===!1&&(A=xe),e.type!==tt&&(A=e.type),yt.get(a)||yt.set(a,{id:a,shape:A,description:z.sanitizeText(a,D),cssClasses:`${k} ${Ie}`,cssStyles:E});const d=yt.get(a);e.description&&(Array.isArray(d.description)?(d.shape=$t,d.description.push(e.description)):d.description?.length&&d.description.length>0?(d.shape=$t,d.description===a?d.description=[e.description]:d.description=[d.description,e.description]):(d.shape=Et,d.description=e.description),d.description=z.sanitizeTextOrArray(d.description,D)),d.description?.length===1&&d.shape===$t&&(d.type==="group"?d.shape=Nt:d.shape=Et),!d.type&&e.doc&&(b.info("Setting cluster for XCX",a,Ot(e)),d.type="group",d.isGroup=!0,d.dir=Ot(e),d.shape=e.type===Yt?Ct:Nt,d.colorIndex=We(d.shape,a,t,Y),d.cssClasses=`${d.cssClasses} ${Fe} ${l?Pe:""}`);const v={labelStyle:"",shape:d.shape,label:d.description,cssClasses:d.cssClasses,cssCompiledStyles:[],cssStyles:d.cssStyles,id:a,dir:d.dir,domId:gt(a,W),type:d.type,isGroup:d.type==="group",colorIndex:d.colorIndex,padding:8,rx:10,ry:10,look:p,labelType:"markdown"};if(v.shape===Ct&&(v.label=""),t&&t.id!=="root"&&(b.trace("Setting node ",a," to be child of its parent ",t.id),v.parentId=t.id),v.centerLabel=!0,e.note){const x={labelStyle:"",shape:Ce,label:e.note.text,labelType:"markdown",cssClasses:Re,cssStyles:[],cssCompiledStyles:[],id:a+Ge+"-"+W,domId:gt(a,W,Kt),type:"node",isGroup:!1,padding:D.flowchart?.padding,look:p,position:e.note.position},B=a+Rt,$={labelStyle:"",shape:ve,label:e.note.text,cssClasses:d.cssClasses,cssStyles:[],id:a+Rt,domId:gt(a,W,Ht),type:"group",isGroup:!0,padding:16,look:p,position:e.note.position};W++,$.id=B,x.parentId=B,Q(s,$,m),Q(s,x,m),Q(s,v,m);let R=a,G=x.id;e.note.position==="left of"&&(R=x.id,G=a),h.push({id:R+"-"+G,start:R,end:G,arrowhead:"none",arrowTypeEnd:"",style:Gt,labelStyle:"",classes:Ne,pattern:"dashed",arrowheadStyle:Wt,labelpos:jt,labelType:Mt,thickness:zt,look:p})}else Q(s,v,m)}e.doc&&(b.trace("Adding nodes children "),je(e,e.doc,n,s,h,!l,p,m))},"dataFetcher"),Me=u(()=>{yt.clear(),W=0,Jt=0,q.clear()},"reset"),qt=u((t,e=Pt)=>{if(!t.doc)return e;let n=e;for(const s of t.doc)s.stmt==="dir"&&(n=s.value);return n},"getDir"),ze=u(function(t,e){return e.db.getClasses()},"getClasses"),Ue=u(async function(t,e,n,s){b.info("REF0:"),b.info("Drawing state diagram (v2)",e);const{securityLevel:h,state:l,layout:p}=N();s.db.extract(s.db.getRootDocV2());const m=s.db.getData(),a=ee(e,h);m.type=s.type,m.layoutAlgorithm=ie(p),m.nodeSpacing=l?.nodeSpacing||50,m.rankSpacing=l?.rankSpacing||50,N().look==="neo"?m.markers=["barbNeo"]:m.markers=["barb"],m.diagramId=e,await re(m,a);const f=8;try{(typeof s.db.getLinks=="function"?s.db.getLinks():new Map).forEach((k,E)=>{const D=typeof E=="string"?E:typeof E?.id=="string"?E.id:"",Y=m.nodes.find($=>$.id===D);if(!D){b.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(E));return}const A=a.node()?.querySelectorAll("g.node, g.rough-node");let d;if(A?.forEach($=>{const R=$.textContent?.trim();($.id===Y?.domId||R===D)&&(d=$)}),!d){b.warn("⚠️ Could not find node matching text:",D);return}const v=d.parentNode;if(!v){b.warn("⚠️ Node has no parent, cannot wrap:",D);return}const x=document.createElementNS("http://www.w3.org/2000/svg","a"),B=k.url.replace(/^"+|"+$/g,"");if(x.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",B),x.setAttribute("target","_blank"),k.tooltip){const $=k.tooltip.replace(/^"+|"+$/g,"");x.setAttribute("title",$),d.setAttribute("title",$)}v.replaceChild(x,d),x.appendChild(d),b.info("🔗 Wrapped node in <a> tag for:",D,k.url)})}catch(k){b.error("❌ Error injecting clickable links:",k)}oe.insertTitle(a,"statediagramTitleText",l?.titleTopMargin??25,s.db.getDiagramTitle()),se(a,f,et,l?.useMaxWidth??!0)},"draw"),He={getClasses:ze,draw:Ue,getDir:qt},C={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Ft=u(()=>new Map,"newClassesList"),Bt=u(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),pt=u(t=>JSON.parse(JSON.stringify(t)),"clone"),Ke=class{constructor(t){this.version=t,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Ft(),this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=ne,this.setAccTitle=ae,this.getAccDescription=le,this.setAccDescription=ce,this.setDiagramTitle=he,this.getDiagramTitle=de,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}static{u(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(t){this.clear(!0);for(const s of Array.isArray(t)?t:t.doc)switch(s.stmt){case V:this.addState(s.id.trim(),s.type,s.doc,s.description,s.note);break;case xt:this.addRelation(s.state1,s.state2,s.description);break;case _e:this.addStyleClass(s.id.trim(),s.classes);break;case Ee:this.handleStyleDef(s);break;case $e:this.setCssClass(s.id.trim(),s.styleClass);break;case"click":this.addLink(s.id,s.url,s.tooltip);break}const e=this.getStates(),n=N();Me(),Z(void 0,this.getRootDocV2(),e,this.nodes,this.edges,!0,n.look,this.classes);for(const s of this.nodes)if(Array.isArray(s.label)){if(s.description=s.label.slice(1),s.isGroup&&s.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${s.id}]`);s.label=s.label[0]}}handleStyleDef(t){const e=t.id.trim().split(","),n=t.styleClass.split(",");for(const s of e){let h=this.getState(s);if(!h){const l=s.trim();this.addState(l),h=this.getState(l)}h&&(h.styles=n.map(l=>l.replace(/;/g,"")?.trim()))}}setRootDoc(t){b.info("Setting root doc",t),this.rootDoc=t,this.version===1?this.extract(t):this.extract(this.getRootDocV2())}docTranslator(t,e,n){if(e.stmt===xt){this.docTranslator(t,e.state1,!0),this.docTranslator(t,e.state2,!1);return}if(e.stmt===V&&(e.id===C.START_NODE?(e.id=t.id+(n?"_start":"_end"),e.start=n):e.id=e.id.trim()),e.stmt!==J&&e.stmt!==V||!e.doc)return;const s=[];let h=[];for(const l of e.doc)if(l.type===Yt){const p=pt(l);p.doc=pt(h),s.push(p),h=[]}else h.push(l);if(s.length>0&&h.length>0){const l={stmt:V,id:ue(),type:"divider",doc:pt(h)};s.push(pt(l)),e.doc=s}e.doc.forEach(l=>this.docTranslator(e,l,!0))}getRootDocV2(){return this.docTranslator({id:J,stmt:J},{id:J,stmt:J,doc:this.rootDoc},!0),{id:J,doc:this.rootDoc}}addState(t,e=tt,n=void 0,s=void 0,h=void 0,l=void 0,p=void 0,m=void 0){const a=t?.trim();if(!this.currentDocument.states.has(a))b.info("Adding state ",a,s),this.currentDocument.states.set(a,{stmt:V,id:a,descriptions:[],type:e,doc:n,note:h,classes:[],styles:[],textStyles:[]});else{const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.doc||(f.doc=n),f.type||(f.type=e)}if(s&&(b.info("Setting state description",a,s),(Array.isArray(s)?s:[s]).forEach(f=>this.addDescription(a,f.trim()))),h){const f=this.currentDocument.states.get(a);if(!f)throw new Error(`State not found: ${a}`);f.note=h,f.note.text=z.sanitizeText(f.note.text,N())}l&&(b.info("Setting state classes",a,l),(Array.isArray(l)?l:[l]).forEach(f=>this.setCssClass(a,f.trim()))),p&&(b.info("Setting state styles",a,p),(Array.isArray(p)?p:[p]).forEach(f=>this.setStyle(a,f.trim()))),m&&(b.info("Setting state styles",a,p),(Array.isArray(m)?m:[m]).forEach(f=>this.setTextStyle(a,f.trim())))}clear(t){this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Ft(),t||(this.links=new Map,pe())}getState(t){return this.currentDocument.states.get(t)}getStates(){return this.currentDocument.states}logDocuments(){b.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(t,e,n){this.links.set(t,{url:e,tooltip:n}),b.warn("Adding link",t,e,n)}getLinks(){return this.links}startIdIfNeeded(t=""){return t===C.START_NODE?(this.startEndCount++,`${C.START_TYPE}${this.startEndCount}`):t}startTypeIfNeeded(t="",e=tt){return t===C.START_NODE?C.START_TYPE:e}endIdIfNeeded(t=""){return t===C.END_NODE?(this.startEndCount++,`${C.END_TYPE}${this.startEndCount}`):t}endTypeIfNeeded(t="",e=tt){return t===C.END_NODE?C.END_TYPE:e}addRelationObjs(t,e,n=""){const s=this.startIdIfNeeded(t.id.trim()),h=this.startTypeIfNeeded(t.id.trim(),t.type),l=this.startIdIfNeeded(e.id.trim()),p=this.startTypeIfNeeded(e.id.trim(),e.type);this.addState(s,h,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),this.addState(l,p,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.currentDocument.relations.push({id1:s,id2:l,relationTitle:z.sanitizeText(n,N())})}addRelation(t,e,n){if(typeof t=="object"&&typeof e=="object")this.addRelationObjs(t,e,n);else if(typeof t=="string"&&typeof e=="string"){const s=this.startIdIfNeeded(t.trim()),h=this.startTypeIfNeeded(t),l=this.endIdIfNeeded(e.trim()),p=this.endTypeIfNeeded(e);this.addState(s,h),this.addState(l,p),this.currentDocument.relations.push({id1:s,id2:l,relationTitle:n?z.sanitizeText(n,N()):void 0})}}addDescription(t,e){const n=this.currentDocument.states.get(t),s=e.startsWith(":")?e.replace(":","").trim():e;n?.descriptions?.push(z.sanitizeText(s,N()))}cleanupLabel(t){return t.startsWith(":")?t.slice(2).trim():t.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(t,e=""){this.classes.has(t)||this.classes.set(t,{id:t,styles:[],textStyles:[]});const n=this.classes.get(t);e&&n&&e.split(C.STYLECLASS_SEP).forEach(s=>{const h=s.replace(/([^;]*);/,"$1").trim();if(RegExp(C.COLOR_KEYWORD).exec(s)){const l=h.replace(C.FILL_KEYWORD,C.BG_FILL).replace(C.COLOR_KEYWORD,C.FILL_KEYWORD);n.textStyles.push(l)}n.styles.push(h)})}getClasses(){return this.classes}setupToolTips(t){const e=Se();_t(t).select("svg").selectAll("g.node, g.rough-node").on("mouseover",n=>{const s=_t(n.currentTarget),h=s.attr("title");if(h===null)return;const l=n.currentTarget?.getBoundingClientRect();e.transition().duration(200).style("opacity",".9"),e.style("left",window.scrollX+l.left+(l.right-l.left)/2+"px").style("top",window.scrollY+l.bottom+"px"),e.html(ke.sanitize(h)),s.classed("hover",!0)}).on("mouseout",n=>{e.transition().duration(500).style("opacity",0),_t(n.currentTarget).classed("hover",!1)})}setCssClass(t,e){t.split(",").forEach(n=>{let s=this.getState(n);if(!s){const h=n.trim();this.addState(h),s=this.getState(h)}s?.classes?.push(e)})}setStyle(t,e){this.getState(t)?.styles?.push(e)}setTextStyle(t,e){this.getState(t)?.textStyles?.push(e)}bindFunctions(t){this.funs.forEach(e=>{e(t)})}getDirectionStatement(){return this.rootDoc.find(t=>t.stmt===At)}getDirection(){return this.getDirectionStatement()?.value??Te}setDirection(t){const e=this.getDirectionStatement();e?e.value=t:this.rootDoc.unshift({stmt:At,value:t})}trimColon(t){return t.startsWith(":")?t.slice(1).trim():t.trim()}getData(){const t=N();for(const e of this.nodes)e.wrappingWidth??=t.state?.wrappingWidth,e.isGroup||(e.minWidth??=t.state?.minNodeWidth);return{nodes:this.nodes,edges:this.edges,other:{},config:t,direction:qt(this.getRootDocV2())}}getConfig(){return N().state}},Je=u(t=>{const{theme:e,bkgColorArray:n,borderColorArray:s}=t;if(!ye(e,s))return"";const h=ge(t.look),l=me(n);let p="";for(let m=0;m<fe(s);m++){const a=s[m],f=l?`fill: ${n[m%n.length]};`:"",k=`[data-look="${h}"][data-color-id="color-${m}"]`;p+=`

    /* The title strip: \`rect.outer\` spans the whole composite and \`rect.inner\` covers
       the body, so what stays visible of \`outer\` is the band behind the label. */
    ${k}.statediagram-cluster rect.outer {
      stroke: ${a};
      ${f}
    }

    ${k}.statediagram-cluster rect.inner {
      stroke: ${a};
    }

    /* Concurrency regions. Siblings of one composite share a slot, so a divided composite
       reads as one thing split into parts rather than as several composites. */
    ${k}.statediagram-cluster rect.divider {
      stroke: ${a};
      ${f}
    }

    /* handDrawn draws the same container as roughjs shapes rather than plain rects, so it
       needs its own rules. \`roundedWithTitle\` and \`divider\` name those groups \`outer\`,
       \`inner\` and \`divider\` to match the classic branch, which is what lets these
       discriminate -- a bare \`.statediagram-cluster path\` rule reached the body as well and
       tinted the whole composite, losing \`compositeBackground\` and diverging from what
       classic and neo do.

       roughjs emits two paths per shape and marks them: the filled shape carries
       \`stroke="none"\` and the sketched outline carries \`fill="none"\`. Splitting on that is
       what keeps \`fill\` off the outline -- a rough outline is open squiggles, not a closed
       region, so filling it produces smears -- and keeps \`stroke\` off the fill shape, which
       would otherwise gain an edge it was drawn without. */
    ${k}.statediagram-cluster .outer path[stroke='none'] {
      ${f}
    }

    ${k}.statediagram-cluster .outer path[fill='none'] {
      stroke: ${a};
    }

    /* No \`.inner\` rule on purpose. The body shape is left entirely alone under handDrawn,
       where a rect's \`inner\` counterpart cannot be recoloured safely: roughjs draws a
       hachure fill as *stroked* lines, so its fill paths carry \`fill="none"\` exactly like
       the outline and no selector separates them. An \`.inner\` stroke rule therefore
       repainted the hatching of every alt composite in the palette colour instead of
       leaving it on \`altBackground\`. The container still reads as palette-coloured: the
       \`outer\` shape spans the whole composite, so its outline already frames the body. */

    /* Regions split the same way, which is why \`divider\` fills solid rather than taking
       roughjs's default hachure -- see the note on that call. Hatched, both of its paths
       carried \`fill="none"\` and these two rules degenerated: the tint matched nothing and
       the border rule repainted the hatching. */
    ${k}.statediagram-cluster .divider path[stroke='none'] {
      ${f}
    }

    ${k}.statediagram-cluster .divider path[fill='none'] {
      stroke: ${a};
    }
    `}return p},"genColor"),Ve=u(t=>`
${Je(t)}
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
`,"getStyles"),Xe=Ve,rs={parser:be,get db(){return new Ke(2)},renderer:He,styles:Xe,init:u(t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute},"init")};export{rs as diagram};
//# sourceMappingURL=stateDiagram-v2-GCMORJYK-CSF45XMP.chunk.mjs.map
