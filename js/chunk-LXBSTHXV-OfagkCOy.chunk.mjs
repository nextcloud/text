import{g as Zt}from"./chunk-WVR4S24B-C6ZhtDd8.chunk.mjs";import{s as te}from"./chunk-NRVI72HA-BRQsg2nM.chunk.mjs";import{_ as u,l as _,c as R,r as ee,u as se,a as ie,b as re,g as ne,s as ae,q as oe,t as ce,ab as le,k as U,z as he}from"./mermaid.core-zH3foFnG.chunk.mjs";var Dt=function(){var t=u(function(O,n,a,f){for(a=a||{},f=O.length;f--;a[O[f]]=n);return a},"o"),e=[1,2],s=[1,3],o=[1,4],r=[2,4],h=[1,9],d=[1,11],y=[1,16],p=[1,17],m=[1,18],S=[1,19],k=[1,33],C=[1,20],w=[1,21],l=[1,22],$=[1,23],E=[1,24],N=[1,26],I=[1,27],Y=[1,28],F=[1,29],et=[1,30],st=[1,31],it=[1,32],rt=[1,35],nt=[1,36],at=[1,37],ot=[1,38],z=[1,34],g=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ct=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],xt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],ft={trace:u(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:u(function(O,n,a,f,T,i,x){var c=i.length-1;switch(T){case 3:return f.setRootDoc(i[c]),i[c];case 4:this.$=[];break;case 5:i[c]!="nl"&&(i[c-1].push(i[c]),this.$=i[c-1]);break;case 6:case 7:this.$=i[c];break;case 8:this.$="nl";break;case 12:this.$=i[c];break;case 13:const J=i[c-1];J.description=f.trimColon(i[c]),this.$=J;break;case 14:this.$={stmt:"relation",state1:i[c-2],state2:i[c]};break;case 15:const St=f.trimColon(i[c]);this.$={stmt:"relation",state1:i[c-3],state2:i[c-1],description:St};break;case 19:this.$={stmt:"state",id:i[c-3],type:"default",description:"",doc:i[c-1]};break;case 20:var G=i[c],X=i[c-2].trim();if(i[c].match(":")){var ht=i[c].split(":");G=ht[0],X=[X,ht[1]]}this.$={stmt:"state",id:G,type:"default",description:X};break;case 21:this.$={stmt:"state",id:i[c-3],type:"default",description:i[c-5],doc:i[c-1]};break;case 22:this.$={stmt:"state",id:i[c],type:"fork"};break;case 23:this.$={stmt:"state",id:i[c],type:"join"};break;case 24:this.$={stmt:"state",id:i[c],type:"choice"};break;case 25:this.$={stmt:"state",id:f.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[c-1].trim(),note:{position:i[c-2].trim(),text:i[c].trim()}};break;case 29:this.$=i[c].trim(),f.setAccTitle(this.$);break;case 30:case 31:this.$=i[c].trim(),f.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[c-3],url:i[c-2],tooltip:i[c-1]};break;case 33:this.$={stmt:"click",id:i[c-3],url:i[c-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[c-1].trim(),classes:i[c].trim()};break;case 36:this.$={stmt:"style",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 37:this.$={stmt:"applyClass",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 38:f.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:f.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:f.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:f.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[c].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:s,6:o},{1:[3]},{3:5,4:e,5:s,6:o},{3:6,4:e,5:s,6:o},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:h,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:p,19:m,22:S,24:k,25:C,26:w,27:l,28:$,29:E,32:25,33:N,35:I,37:Y,38:F,41:et,45:st,48:it,51:rt,52:nt,53:at,54:ot,57:z},t(g,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:y,17:p,19:m,22:S,24:k,25:C,26:w,27:l,28:$,29:E,32:25,33:N,35:I,37:Y,38:F,41:et,45:st,48:it,51:rt,52:nt,53:at,54:ot,57:z},t(g,[2,7]),t(g,[2,8]),t(g,[2,9]),t(g,[2,10]),t(g,[2,11]),t(g,[2,12],{14:[1,40],15:[1,41]}),t(g,[2,16]),{18:[1,42]},t(g,[2,18],{20:[1,43]}),{23:[1,44]},t(g,[2,22]),t(g,[2,23]),t(g,[2,24]),t(g,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(g,[2,28]),{34:[1,49]},{36:[1,50]},t(g,[2,31]),{13:51,24:k,57:z},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(ct,[2,44],{58:[1,56]}),t(ct,[2,45],{58:[1,57]}),t(g,[2,38]),t(g,[2,39]),t(g,[2,40]),t(g,[2,41]),t(g,[2,6]),t(g,[2,13]),{13:58,24:k,57:z},t(g,[2,17]),t(xt,r,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(g,[2,29]),t(g,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(g,[2,14],{14:[1,71]}),{4:h,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:p,19:m,21:[1,72],22:S,24:k,25:C,26:w,27:l,28:$,29:E,32:25,33:N,35:I,37:Y,38:F,41:et,45:st,48:it,51:rt,52:nt,53:at,54:ot,57:z},t(g,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(g,[2,34]),t(g,[2,35]),t(g,[2,36]),t(g,[2,37]),t(ct,[2,46]),t(ct,[2,47]),t(g,[2,15]),t(g,[2,19]),t(xt,r,{7:78}),t(g,[2,26]),t(g,[2,27]),{5:[1,79]},{5:[1,80]},{4:h,5:d,8:8,9:10,10:12,11:13,12:14,13:15,16:y,17:p,19:m,21:[1,81],22:S,24:k,25:C,26:w,27:l,28:$,29:E,32:25,33:N,35:I,37:Y,38:F,41:et,45:st,48:it,51:rt,52:nt,53:at,54:ot,57:z},t(g,[2,32]),t(g,[2,33]),t(g,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:u(function(O,n){if(n.recoverable)this.trace(O);else{var a=new Error(O);throw a.hash=n,a}},"parseError"),parse:u(function(O){var n=this,a=[0],f=[],T=[null],i=[],x=this.table,c="",G=0,X=0,ht=2,J=1,St=i.slice.call(arguments,1),b=Object.create(this.lexer),j={yy:{}};for(var mt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,mt)&&(j.yy[mt]=this.yy[mt]);b.setInput(O,j.yy),j.yy.lexer=b,j.yy.parser=this,typeof b.yylloc>"u"&&(b.yylloc={});var Tt=b.yylloc;i.push(Tt);var qt=b.options&&b.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Qt(A){a.length=a.length-2*A,T.length=T.length-A,i.length=i.length-A}u(Qt,"popStack");function Lt(){var A;return A=f.pop()||b.lex()||J,typeof A!="number"&&(A instanceof Array&&(f=A,A=f.pop()),A=n.symbols_[A]||A),A}u(Lt,"lex");for(var L,W,v,_t,M={},dt,B,At,ut;;){if(W=a[a.length-1],this.defaultActions[W]?v=this.defaultActions[W]:((L===null||typeof L>"u")&&(L=Lt()),v=x[W]&&x[W][L]),typeof v>"u"||!v.length||!v[0]){var bt="";ut=[];for(dt in x[W])this.terminals_[dt]&&dt>ht&&ut.push("'"+this.terminals_[dt]+"'");b.showPosition?bt="Parse error on line "+(G+1)+`:
`+b.showPosition()+`
Expecting `+ut.join(", ")+", got '"+(this.terminals_[L]||L)+"'":bt="Parse error on line "+(G+1)+": Unexpected "+(L==J?"end of input":"'"+(this.terminals_[L]||L)+"'"),this.parseError(bt,{text:b.match,token:this.terminals_[L]||L,line:b.yylineno,loc:Tt,expected:ut})}if(v[0]instanceof Array&&v.length>1)throw new Error("Parse Error: multiple actions possible at state: "+W+", token: "+L);switch(v[0]){case 1:a.push(L),T.push(b.yytext),i.push(b.yylloc),a.push(v[1]),L=null,X=b.yyleng,c=b.yytext,G=b.yylineno,Tt=b.yylloc;break;case 2:if(B=this.productions_[v[1]][1],M.$=T[T.length-B],M._$={first_line:i[i.length-(B||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(B||1)].first_column,last_column:i[i.length-1].last_column},qt&&(M._$.range=[i[i.length-(B||1)].range[0],i[i.length-1].range[1]]),_t=this.performAction.apply(M,[c,X,G,j.yy,v[1],T,i].concat(St)),typeof _t<"u")return _t;B&&(a=a.slice(0,-1*B*2),T=T.slice(0,-1*B),i=i.slice(0,-1*B)),a.push(this.productions_[v[1]][0]),T.push(M.$),i.push(M._$),At=x[a[a.length-2]][a[a.length-1]],a.push(At);break;case 3:return!0}}return!0},"parse")},Jt=function(){var O={EOF:1,parseError:u(function(n,a){if(this.yy.parser)this.yy.parser.parseError(n,a);else throw new Error(n)},"parseError"),setInput:u(function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:u(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:u(function(n){var a=n.length,f=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var T=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===T.length?this.yylloc.first_column:0)+T[T.length-f.length].length-f[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:u(function(){return this._more=!0,this},"more"),reject:u(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:u(function(n){this.unput(this.match.slice(n))},"less"),pastInput:u(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:u(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:u(function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:u(function(n,a){var f,T,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),T=n[0].match(/(?:\r\n?|\n).*/g),T&&(this.yylineno+=T.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:T?T[T.length-1].length-T[T.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],f=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var x in i)this[x]=i[x];return!1}return!1},"test_match"),next:u(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,f,T;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),x=0;x<i.length;x++)if(f=this._input.match(this.rules[i[x]]),f&&(!a||f[0].length>a[0].length)){if(a=f,T=x,this.options.backtrack_lexer){if(n=this.test_match(f,i[x]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,i[T]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:u(function(){var n=this.next();return n||this.lex()},"lex"),begin:u(function(n){this.conditionStack.push(n)},"begin"),popState:u(function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:u(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:u(function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},"topState"),pushState:u(function(n){this.begin(n)},"pushState"),stateStackSize:u(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:u(function(n,a,f,T){switch(f){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:break;case 9:break;case 10:return 5;case 11:break;case 12:break;case 13:break;case 14:break;case 15:return this.pushState("SCALE"),17;case 16:return 18;case 17:this.popState();break;case 18:return this.begin("acc_title"),33;case 19:return this.popState(),"acc_title_value";case 20:return this.begin("acc_descr"),35;case 21:return this.popState(),"acc_descr_value";case 22:this.begin("acc_descr_multiline");break;case 23:this.popState();break;case 24:return"acc_descr_multiline_value";case 25:return this.pushState("CLASSDEF"),41;case 26:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 27:return this.popState(),this.pushState("CLASSDEFID"),42;case 28:return this.popState(),43;case 29:return this.pushState("CLASS"),48;case 30:return this.popState(),this.pushState("CLASS_STYLE"),49;case 31:return this.popState(),50;case 32:return this.pushState("STYLE"),45;case 33:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 34:return this.popState(),47;case 35:return this.pushState("SCALE"),17;case 36:return 18;case 37:this.popState();break;case 38:this.pushState("STATE");break;case 39:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 40:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 41:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 42:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 43:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 44:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 45:return 51;case 46:return 52;case 47:return 53;case 48:return 54;case 49:this.pushState("STATE_STRING");break;case 50:return this.pushState("STATE_ID"),"AS";case 51:return this.popState(),"ID";case 52:this.popState();break;case 53:return"STATE_DESCR";case 54:return 19;case 55:this.popState();break;case 56:return this.popState(),this.pushState("struct"),20;case 57:break;case 58:return this.popState(),21;case 59:break;case 60:return this.begin("NOTE"),29;case 61:return this.popState(),this.pushState("NOTE_ID"),59;case 62:return this.popState(),this.pushState("NOTE_ID"),60;case 63:this.popState(),this.pushState("FLOATING_NOTE");break;case 64:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 65:break;case 66:return"NOTE_TEXT";case 67:return this.popState(),"ID";case 68:return this.popState(),this.pushState("NOTE_TEXT"),24;case 69:return this.popState(),a.yytext=a.yytext.substr(2).trim(),31;case 70:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),31;case 71:return 6;case 72:return 6;case 73:return 16;case 74:return 57;case 75:return 24;case 76:return a.yytext=a.yytext.trim(),14;case 77:return 15;case 78:return 28;case 79:return 58;case 80:return 5;case 81:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[12,13],inclusive:!1},struct:{rules:[12,13,25,29,32,38,45,46,47,48,57,58,59,60,74,75,76,77,78],inclusive:!1},FLOATING_NOTE_ID:{rules:[67],inclusive:!1},FLOATING_NOTE:{rules:[64,65,66],inclusive:!1},NOTE_TEXT:{rules:[69,70],inclusive:!1},NOTE_ID:{rules:[68],inclusive:!1},NOTE:{rules:[61,62,63],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[34],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[33],inclusive:!1},CLASS_STYLE:{rules:[31],inclusive:!1},CLASS:{rules:[30],inclusive:!1},CLASSDEFID:{rules:[28],inclusive:!1},CLASSDEF:{rules:[26,27],inclusive:!1},acc_descr_multiline:{rules:[23,24],inclusive:!1},acc_descr:{rules:[21],inclusive:!1},acc_title:{rules:[19],inclusive:!1},SCALE:{rules:[16,17,36,37],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[51],inclusive:!1},STATE_STRING:{rules:[52,53],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[12,13,39,40,41,42,43,44,49,50,54,55,56],inclusive:!1},ID:{rules:[12,13],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,18,20,22,25,29,32,35,38,56,60,71,72,73,74,75,76,77,79,80,81],inclusive:!0}}};return O}();ft.lexer=Jt;function lt(){this.yy={}}return u(lt,"Parser"),lt.prototype=ft,ft.Parser=lt,new lt}();Dt.parser=Dt;var Pe=Dt,de="TB",Yt="TB",It="dir",H="state",V="root",Ct="relation",ue="classDef",pe="style",ye="applyClass",Z="default",Ft="divider",Pt="fill:none",Gt="fill: #333",jt="c",Wt="text",Ut="normal",kt="rect",Et="rectWithTitle",ge="stateStart",fe="stateEnd",vt="divider",wt="roundedWithTitle",Se="note",me="noteGroup",tt="statediagram",Te="state",_e=`${tt}-${Te}`,Kt="transition",be="note",ke="note-edge",Ee=`${Kt} ${ke}`,De=`${tt}-${be}`,Ce="cluster",$e=`${tt}-${Ce}`,xe="cluster-alt",Le=`${tt}-${xe}`,zt="parent",Xt="note",Ae="state",$t="----",Ie=`${$t}${Xt}`,Ot=`${$t}${zt}`,Mt=u((t,e=Yt)=>{if(!t.doc)return e;let s=e;for(const o of t.doc)o.stmt==="dir"&&(s=o.value);return s},"getDir"),ve=u(function(t,e){return e.db.getClasses()},"getClasses"),we=u(async function(t,e,s,o){_.info("REF0:"),_.info("Drawing state diagram (v2)",e);const{securityLevel:r,state:h,layout:d}=R();o.db.extract(o.db.getRootDocV2());const y=o.db.getData(),p=Zt(e,r);y.type=o.type,y.layoutAlgorithm=d,y.nodeSpacing=h?.nodeSpacing||50,y.rankSpacing=h?.rankSpacing||50,y.markers=["barb"],y.diagramId=e,await ee(y,p);const m=8;try{(typeof o.db.getLinks=="function"?o.db.getLinks():new Map).forEach((S,k)=>{const C=typeof k=="string"?k:typeof k?.id=="string"?k.id:"";if(!C){_.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(k));return}const w=p.node()?.querySelectorAll("g");let l;if(w?.forEach(I=>{I.textContent?.trim()===C&&(l=I)}),!l){_.warn("⚠️ Could not find node matching text:",C);return}const $=l.parentNode;if(!$){_.warn("⚠️ Node has no parent, cannot wrap:",C);return}const E=document.createElementNS("http://www.w3.org/2000/svg","a"),N=S.url.replace(/^"+|"+$/g,"");if(E.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",N),E.setAttribute("target","_blank"),S.tooltip){const I=S.tooltip.replace(/^"+|"+$/g,"");E.setAttribute("title",I)}$.replaceChild(E,l),E.appendChild(l),_.info("🔗 Wrapped node in <a> tag for:",C,S.url)})}catch(S){_.error("❌ Error injecting clickable links:",S)}se.insertTitle(p,"statediagramTitleText",h?.titleTopMargin??25,o.db.getDiagramTitle()),te(p,m,tt,h?.useMaxWidth??!0)},"draw"),Ge={getClasses:ve,draw:we,getDir:Mt},yt=new Map,P=0;function gt(t="",e=0,s="",o=$t){const r=s!==null&&s.length>0?`${o}${s}`:"";return`${Ae}-${t}${r}-${e}`}u(gt,"stateDomId");var Oe=u((t,e,s,o,r,h,d,y)=>{_.trace("items",e),e.forEach(p=>{switch(p.stmt){case H:Q(t,p,s,o,r,h,d,y);break;case Z:Q(t,p,s,o,r,h,d,y);break;case Ct:{Q(t,p.state1,s,o,r,h,d,y),Q(t,p.state2,s,o,r,h,d,y);const m={id:"edge"+P,start:p.state1.id,end:p.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:Pt,labelStyle:"",label:U.sanitizeText(p.description??"",R()),arrowheadStyle:Gt,labelpos:jt,labelType:Wt,thickness:Ut,classes:Kt,look:d};r.push(m),P++}break}})},"setupDoc"),Rt=u((t,e=Yt)=>{let s=e;if(t.doc)for(const o of t.doc)o.stmt==="dir"&&(s=o.value);return s},"getDir");function q(t,e,s){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(r=>{const h=s.get(r);h&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...h.styles])}));const o=t.find(r=>r.id===e.id);o?Object.assign(o,e):t.push(e)}u(q,"insertOrUpdateNode");function Vt(t){return t?.classes?.join(" ")??""}u(Vt,"getClassesFromDbInfo");function Ht(t){return t?.styles??[]}u(Ht,"getStylesFromDbInfo");var Q=u((t,e,s,o,r,h,d,y)=>{const p=e.id,m=s.get(p),S=Vt(m),k=Ht(m),C=R();if(_.info("dataFetcher parsedItem",e,m,k),p!=="root"){let w=kt;e.start===!0?w=ge:e.start===!1&&(w=fe),e.type!==Z&&(w=e.type),yt.get(p)||yt.set(p,{id:p,shape:w,description:U.sanitizeText(p,C),cssClasses:`${S} ${_e}`,cssStyles:k});const l=yt.get(p);e.description&&(Array.isArray(l.description)?(l.shape=Et,l.description.push(e.description)):l.description?.length&&l.description.length>0?(l.shape=Et,l.description===p?l.description=[e.description]:l.description=[l.description,e.description]):(l.shape=kt,l.description=e.description),l.description=U.sanitizeTextOrArray(l.description,C)),l.description?.length===1&&l.shape===Et&&(l.type==="group"?l.shape=wt:l.shape=kt),!l.type&&e.doc&&(_.info("Setting cluster for XCX",p,Rt(e)),l.type="group",l.isGroup=!0,l.dir=Rt(e),l.shape=e.type===Ft?vt:wt,l.cssClasses=`${l.cssClasses} ${$e} ${h?Le:""}`);const $={labelStyle:"",shape:l.shape,label:l.description,cssClasses:l.cssClasses,cssCompiledStyles:[],cssStyles:l.cssStyles,id:p,dir:l.dir,domId:gt(p,P),type:l.type,isGroup:l.type==="group",padding:8,rx:10,ry:10,look:d};if($.shape===vt&&($.label=""),t&&t.id!=="root"&&(_.trace("Setting node ",p," to be child of its parent ",t.id),$.parentId=t.id),$.centerLabel=!0,e.note){const E={labelStyle:"",shape:Se,label:e.note.text,cssClasses:De,cssStyles:[],cssCompiledStyles:[],id:p+Ie+"-"+P,domId:gt(p,P,Xt),type:l.type,isGroup:l.type==="group",padding:C.flowchart?.padding,look:d,position:e.note.position},N=p+Ot,I={labelStyle:"",shape:me,label:e.note.text,cssClasses:l.cssClasses,cssStyles:[],id:p+Ot,domId:gt(p,P,zt),type:"group",isGroup:!0,padding:16,look:d,position:e.note.position};P++,I.id=N,E.parentId=N,q(o,I,y),q(o,E,y),q(o,$,y);let Y=p,F=E.id;e.note.position==="left of"&&(Y=E.id,F=p),r.push({id:Y+"-"+F,start:Y,end:F,arrowhead:"none",arrowTypeEnd:"",style:Pt,labelStyle:"",classes:Ee,arrowheadStyle:Gt,labelpos:jt,labelType:Wt,thickness:Ut,look:d})}else q(o,$,y)}e.doc&&(_.trace("Adding nodes children "),Oe(e,e.doc,s,o,r,!h,d,y))},"dataFetcher"),Re=u(()=>{yt.clear(),P=0},"reset"),D={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},Nt=u(()=>new Map,"newClassesList"),Bt=u(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),pt=u(t=>JSON.parse(JSON.stringify(t)),"clone"),K,je=(K=class{constructor(e){this.version=e,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Nt(),this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=ie,this.setAccTitle=re,this.getAccDescription=ne,this.setAccDescription=ae,this.setDiagramTitle=oe,this.getDiagramTitle=ce,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}extract(e){this.clear(!0);for(const r of Array.isArray(e)?e:e.doc)switch(r.stmt){case H:this.addState(r.id.trim(),r.type,r.doc,r.description,r.note);break;case Ct:this.addRelation(r.state1,r.state2,r.description);break;case ue:this.addStyleClass(r.id.trim(),r.classes);break;case pe:this.handleStyleDef(r);break;case ye:this.setCssClass(r.id.trim(),r.styleClass);break;case"click":this.addLink(r.id,r.url,r.tooltip);break}const s=this.getStates(),o=R();Re(),Q(void 0,this.getRootDocV2(),s,this.nodes,this.edges,!0,o.look,this.classes);for(const r of this.nodes)if(Array.isArray(r.label)){if(r.description=r.label.slice(1),r.isGroup&&r.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${r.id}]`);r.label=r.label[0]}}handleStyleDef(e){const s=e.id.trim().split(","),o=e.styleClass.split(",");for(const r of s){let h=this.getState(r);if(!h){const d=r.trim();this.addState(d),h=this.getState(d)}h&&(h.styles=o.map(d=>d.replace(/;/g,"")?.trim()))}}setRootDoc(e){_.info("Setting root doc",e),this.rootDoc=e,this.version===1?this.extract(e):this.extract(this.getRootDocV2())}docTranslator(e,s,o){if(s.stmt===Ct){this.docTranslator(e,s.state1,!0),this.docTranslator(e,s.state2,!1);return}if(s.stmt===H&&(s.id===D.START_NODE?(s.id=e.id+(o?"_start":"_end"),s.start=o):s.id=s.id.trim()),s.stmt!==V&&s.stmt!==H||!s.doc)return;const r=[];let h=[];for(const d of s.doc)if(d.type===Ft){const y=pt(d);y.doc=pt(h),r.push(y),h=[]}else h.push(d);if(r.length>0&&h.length>0){const d={stmt:H,id:le(),type:"divider",doc:pt(h)};r.push(pt(d)),s.doc=r}s.doc.forEach(d=>this.docTranslator(s,d,!0))}getRootDocV2(){return this.docTranslator({id:V,stmt:V},{id:V,stmt:V,doc:this.rootDoc},!0),{id:V,doc:this.rootDoc}}addState(e,s=Z,o=void 0,r=void 0,h=void 0,d=void 0,y=void 0,p=void 0){const m=e?.trim();if(!this.currentDocument.states.has(m))_.info("Adding state ",m,r),this.currentDocument.states.set(m,{stmt:H,id:m,descriptions:[],type:s,doc:o,note:h,classes:[],styles:[],textStyles:[]});else{const S=this.currentDocument.states.get(m);if(!S)throw new Error(`State not found: ${m}`);S.doc||(S.doc=o),S.type||(S.type=s)}if(r&&(_.info("Setting state description",m,r),(Array.isArray(r)?r:[r]).forEach(S=>this.addDescription(m,S.trim()))),h){const S=this.currentDocument.states.get(m);if(!S)throw new Error(`State not found: ${m}`);S.note=h,S.note.text=U.sanitizeText(S.note.text,R())}d&&(_.info("Setting state classes",m,d),(Array.isArray(d)?d:[d]).forEach(S=>this.setCssClass(m,S.trim()))),y&&(_.info("Setting state styles",m,y),(Array.isArray(y)?y:[y]).forEach(S=>this.setStyle(m,S.trim()))),p&&(_.info("Setting state styles",m,y),(Array.isArray(p)?p:[p]).forEach(S=>this.setTextStyle(m,S.trim())))}clear(e){this.nodes=[],this.edges=[],this.documents={root:Bt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Nt(),e||(this.links=new Map,he())}getState(e){return this.currentDocument.states.get(e)}getStates(){return this.currentDocument.states}logDocuments(){_.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(e,s,o){this.links.set(e,{url:s,tooltip:o}),_.warn("Adding link",e,s,o)}getLinks(){return this.links}startIdIfNeeded(e=""){return e===D.START_NODE?(this.startEndCount++,`${D.START_TYPE}${this.startEndCount}`):e}startTypeIfNeeded(e="",s=Z){return e===D.START_NODE?D.START_TYPE:s}endIdIfNeeded(e=""){return e===D.END_NODE?(this.startEndCount++,`${D.END_TYPE}${this.startEndCount}`):e}endTypeIfNeeded(e="",s=Z){return e===D.END_NODE?D.END_TYPE:s}addRelationObjs(e,s,o=""){const r=this.startIdIfNeeded(e.id.trim()),h=this.startTypeIfNeeded(e.id.trim(),e.type),d=this.startIdIfNeeded(s.id.trim()),y=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(r,h,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.addState(d,y,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:r,id2:d,relationTitle:U.sanitizeText(o,R())})}addRelation(e,s,o){if(typeof e=="object"&&typeof s=="object")this.addRelationObjs(e,s,o);else if(typeof e=="string"&&typeof s=="string"){const r=this.startIdIfNeeded(e.trim()),h=this.startTypeIfNeeded(e),d=this.endIdIfNeeded(s.trim()),y=this.endTypeIfNeeded(s);this.addState(r,h),this.addState(d,y),this.currentDocument.relations.push({id1:r,id2:d,relationTitle:o?U.sanitizeText(o,R()):void 0})}}addDescription(e,s){const o=this.currentDocument.states.get(e),r=s.startsWith(":")?s.replace(":","").trim():s;o?.descriptions?.push(U.sanitizeText(r,R()))}cleanupLabel(e){return e.startsWith(":")?e.slice(2).trim():e.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(e,s=""){this.classes.has(e)||this.classes.set(e,{id:e,styles:[],textStyles:[]});const o=this.classes.get(e);s&&o&&s.split(D.STYLECLASS_SEP).forEach(r=>{const h=r.replace(/([^;]*);/,"$1").trim();if(RegExp(D.COLOR_KEYWORD).exec(r)){const d=h.replace(D.FILL_KEYWORD,D.BG_FILL).replace(D.COLOR_KEYWORD,D.FILL_KEYWORD);o.textStyles.push(d)}o.styles.push(h)})}getClasses(){return this.classes}setCssClass(e,s){e.split(",").forEach(o=>{let r=this.getState(o);if(!r){const h=o.trim();this.addState(h),r=this.getState(h)}r?.classes?.push(s)})}setStyle(e,s){this.getState(e)?.styles?.push(s)}setTextStyle(e,s){this.getState(e)?.textStyles?.push(s)}getDirectionStatement(){return this.rootDoc.find(e=>e.stmt===It)}getDirection(){return this.getDirectionStatement()?.value??de}setDirection(e){const s=this.getDirectionStatement();s?s.value=e:this.rootDoc.unshift({stmt:It,value:e})}trimColon(e){return e.startsWith(":")?e.slice(1).trim():e.trim()}getData(){const e=R();return{nodes:this.nodes,edges:this.edges,other:{},config:e,direction:Mt(this.getRootDocV2())}}getConfig(){return R().state}},u(K,"StateDB"),K.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},K),Ne=u(t=>`
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
`,"getStyles"),We=Ne;export{je as S,Pe as a,Ge as b,We as s};
//# sourceMappingURL=chunk-LXBSTHXV-OfagkCOy.chunk.mjs.map
