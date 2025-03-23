import{g as xe,s as $e}from"./chunk-5HRBRIJM-BmJTHBLB.chunk.mjs";import{_ as i,e as U,d as D,g as De,s as Ce,b as ve,c as Le,q as Ie,r as Ae,l as b,A as we,v as Oe,x as Ne,a9 as Re}from"./mermaid.core-Dwh8_YBE.chunk.mjs";var At=function(){var t=i(function(v,n,a,y){for(a=a||{},y=v.length;y--;a[v[y]]=n);return a},"o"),e=[1,2],c=[1,3],o=[1,4],r=[2,4],u=[1,9],p=[1,11],f=[1,16],l=[1,17],S=[1,18],X=[1,19],w=[1,32],L=[1,20],d=[1,21],C=[1,22],I=[1,23],F=[1,24],P=[1,26],O=[1,27],N=[1,28],et=[1,29],st=[1,30],it=[1,31],rt=[1,34],nt=[1,35],at=[1,36],ot=[1,37],H=[1,33],g=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],lt=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],Gt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],Et={trace:i(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,classDef:38,CLASSDEF_ID:39,CLASSDEF_STYLEOPTS:40,DEFAULT:41,style:42,STYLE_IDS:43,STYLEDEF_STYLEOPTS:44,class:45,CLASSENTITY_IDS:46,STYLECLASS:47,direction_tb:48,direction_bt:49,direction_rl:50,direction_lr:51,eol:52,";":53,EDGE_STATE:54,STYLE_SEPARATOR:55,left_of:56,right_of:57,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"classDef",39:"CLASSDEF_ID",40:"CLASSDEF_STYLEOPTS",41:"DEFAULT",42:"style",43:"STYLE_IDS",44:"STYLEDEF_STYLEOPTS",45:"class",46:"CLASSENTITY_IDS",47:"STYLECLASS",48:"direction_tb",49:"direction_bt",50:"direction_rl",51:"direction_lr",53:";",54:"EDGE_STATE",55:"STYLE_SEPARATOR",56:"left_of",57:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[52,1],[52,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:i(function(v,n,a,y,m,s,k){var h=s.length-1;switch(m){case 3:return y.setRootDoc(s[h]),s[h];case 4:this.$=[];break;case 5:s[h]!="nl"&&(s[h-1].push(s[h]),this.$=s[h-1]);break;case 6:case 7:this.$=s[h];break;case 8:this.$="nl";break;case 12:this.$=s[h];break;case 13:const K=s[h-1];K.description=y.trimColon(s[h]),this.$=K;break;case 14:this.$={stmt:"relation",state1:s[h-2],state2:s[h]};break;case 15:const xt=y.trimColon(s[h]);this.$={stmt:"relation",state1:s[h-3],state2:s[h-1],description:xt};break;case 19:this.$={stmt:"state",id:s[h-3],type:"default",description:"",doc:s[h-1]};break;case 20:var Y=s[h],W=s[h-2].trim();if(s[h].match(":")){var ht=s[h].split(":");Y=ht[0],W=[W,ht[1]]}this.$={stmt:"state",id:Y,type:"default",description:W};break;case 21:this.$={stmt:"state",id:s[h-3],type:"default",description:s[h-5],doc:s[h-1]};break;case 22:this.$={stmt:"state",id:s[h],type:"fork"};break;case 23:this.$={stmt:"state",id:s[h],type:"join"};break;case 24:this.$={stmt:"state",id:s[h],type:"choice"};break;case 25:this.$={stmt:"state",id:y.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:s[h-1].trim(),note:{position:s[h-2].trim(),text:s[h].trim()}};break;case 29:this.$=s[h].trim(),y.setAccTitle(this.$);break;case 30:case 31:this.$=s[h].trim(),y.setAccDescription(this.$);break;case 32:case 33:this.$={stmt:"classDef",id:s[h-1].trim(),classes:s[h].trim()};break;case 34:this.$={stmt:"style",id:s[h-1].trim(),styleClass:s[h].trim()};break;case 35:this.$={stmt:"applyClass",id:s[h-1].trim(),styleClass:s[h].trim()};break;case 36:y.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 37:y.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 38:y.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 39:y.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 42:case 43:this.$={stmt:"state",id:s[h].trim(),type:"default",description:""};break;case 44:this.$={stmt:"state",id:s[h-2].trim(),classes:[s[h].trim()],type:"default",description:""};break;case 45:this.$={stmt:"state",id:s[h-2].trim(),classes:[s[h].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:c,6:o},{1:[3]},{3:5,4:e,5:c,6:o},{3:6,4:e,5:c,6:o},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:u,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:f,17:l,19:S,22:X,24:w,25:L,26:d,27:C,28:I,29:F,32:25,33:P,35:O,37:N,38:et,42:st,45:it,48:rt,49:nt,50:at,51:ot,54:H},t(g,[2,5]),{9:38,10:12,11:13,12:14,13:15,16:f,17:l,19:S,22:X,24:w,25:L,26:d,27:C,28:I,29:F,32:25,33:P,35:O,37:N,38:et,42:st,45:it,48:rt,49:nt,50:at,51:ot,54:H},t(g,[2,7]),t(g,[2,8]),t(g,[2,9]),t(g,[2,10]),t(g,[2,11]),t(g,[2,12],{14:[1,39],15:[1,40]}),t(g,[2,16]),{18:[1,41]},t(g,[2,18],{20:[1,42]}),{23:[1,43]},t(g,[2,22]),t(g,[2,23]),t(g,[2,24]),t(g,[2,25]),{30:44,31:[1,45],56:[1,46],57:[1,47]},t(g,[2,28]),{34:[1,48]},{36:[1,49]},t(g,[2,31]),{39:[1,50],41:[1,51]},{43:[1,52]},{46:[1,53]},t(lt,[2,42],{55:[1,54]}),t(lt,[2,43],{55:[1,55]}),t(g,[2,36]),t(g,[2,37]),t(g,[2,38]),t(g,[2,39]),t(g,[2,6]),t(g,[2,13]),{13:56,24:w,54:H},t(g,[2,17]),t(Gt,r,{7:57}),{24:[1,58]},{24:[1,59]},{23:[1,60]},{24:[2,46]},{24:[2,47]},t(g,[2,29]),t(g,[2,30]),{40:[1,61]},{40:[1,62]},{44:[1,63]},{47:[1,64]},{24:[1,65]},{24:[1,66]},t(g,[2,14],{14:[1,67]}),{4:u,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:f,17:l,19:S,21:[1,68],22:X,24:w,25:L,26:d,27:C,28:I,29:F,32:25,33:P,35:O,37:N,38:et,42:st,45:it,48:rt,49:nt,50:at,51:ot,54:H},t(g,[2,20],{20:[1,69]}),{31:[1,70]},{24:[1,71]},t(g,[2,32]),t(g,[2,33]),t(g,[2,34]),t(g,[2,35]),t(lt,[2,44]),t(lt,[2,45]),t(g,[2,15]),t(g,[2,19]),t(Gt,r,{7:72}),t(g,[2,26]),t(g,[2,27]),{4:u,5:p,8:8,9:10,10:12,11:13,12:14,13:15,16:f,17:l,19:S,21:[1,73],22:X,24:w,25:L,26:d,27:C,28:I,29:F,32:25,33:P,35:O,37:N,38:et,42:st,45:it,48:rt,49:nt,50:at,51:ot,54:H},t(g,[2,21])],defaultActions:{5:[2,1],6:[2,2],46:[2,46],47:[2,47]},parseError:i(function(v,n){if(n.recoverable)this.trace(v);else{var a=new Error(v);throw a.hash=n,a}},"parseError"),parse:i(function(v){var n=this,a=[0],y=[],m=[null],s=[],k=this.table,h="",Y=0,W=0,ht=2,K=1,xt=s.slice.call(arguments,1),_=Object.create(this.lexer),G={yy:{}};for(var $t in this.yy)Object.prototype.hasOwnProperty.call(this.yy,$t)&&(G.yy[$t]=this.yy[$t]);_.setInput(v,G.yy),G.yy.lexer=_,G.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Dt=_.yylloc;s.push(Dt);var Te=_.options&&_.options.ranges;typeof G.yy.parseError=="function"?this.parseError=G.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ee(x){a.length=a.length-2*x,m.length=m.length-x,s.length=s.length-x}i(Ee,"popStack");function jt(){var x;return x=y.pop()||_.lex()||K,typeof x!="number"&&(x instanceof Array&&(y=x,x=y.pop()),x=n.symbols_[x]||x),x}i(jt,"lex");for(var T,j,$,Ct,J={},ut,A,Ut,dt;;){if(j=a[a.length-1],this.defaultActions[j]?$=this.defaultActions[j]:((T===null||typeof T>"u")&&(T=jt()),$=k[j]&&k[j][T]),typeof $>"u"||!$.length||!$[0]){var vt="";dt=[];for(ut in k[j])this.terminals_[ut]&&ut>ht&&dt.push("'"+this.terminals_[ut]+"'");_.showPosition?vt="Parse error on line "+(Y+1)+`:
`+_.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[T]||T)+"'":vt="Parse error on line "+(Y+1)+": Unexpected "+(T==K?"end of input":"'"+(this.terminals_[T]||T)+"'"),this.parseError(vt,{text:_.match,token:this.terminals_[T]||T,line:_.yylineno,loc:Dt,expected:dt})}if($[0]instanceof Array&&$.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+T);switch($[0]){case 1:a.push(T),m.push(_.yytext),s.push(_.yylloc),a.push($[1]),T=null,W=_.yyleng,h=_.yytext,Y=_.yylineno,Dt=_.yylloc;break;case 2:if(A=this.productions_[$[1]][1],J.$=m[m.length-A],J._$={first_line:s[s.length-(A||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(A||1)].first_column,last_column:s[s.length-1].last_column},Te&&(J._$.range=[s[s.length-(A||1)].range[0],s[s.length-1].range[1]]),Ct=this.performAction.apply(J,[h,W,Y,G.yy,$[1],m,s].concat(xt)),typeof Ct<"u")return Ct;A&&(a=a.slice(0,-1*A*2),m=m.slice(0,-1*A),s=s.slice(0,-1*A)),a.push(this.productions_[$[1]][0]),m.push(J.$),s.push(J._$),Ut=k[a[a.length-2]][a[a.length-1]],a.push(Ut);break;case 3:return!0}}return!0},"parse")},ke=function(){var v={EOF:1,parseError:i(function(n,a){if(this.yy.parser)this.yy.parser.parseError(n,a);else throw new Error(n)},"parseError"),setInput:i(function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:i(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:i(function(n){var a=n.length,y=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var m=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===m.length?this.yylloc.first_column:0)+m[m.length-y.length].length-y[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:i(function(){return this._more=!0,this},"more"),reject:i(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:i(function(n){this.unput(this.match.slice(n))},"less"),pastInput:i(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:i(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:i(function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:i(function(n,a){var y,m,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),m=n[0].match(/(?:\r\n?|\n).*/g),m&&(this.yylineno+=m.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:m?m[m.length-1].length-m[m.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],y=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var k in s)this[k]=s[k];return!1}return!1},"test_match"),next:i(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,y,m;this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),k=0;k<s.length;k++)if(y=this._input.match(this.rules[s[k]]),y&&(!a||y[0].length>a[0].length)){if(a=y,m=k,this.options.backtrack_lexer){if(n=this.test_match(y,s[k]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,s[m]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:i(function(){var n=this.next();return n||this.lex()},"lex"),begin:i(function(n){this.conditionStack.push(n)},"begin"),popState:i(function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:i(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:i(function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},"topState"),pushState:i(function(n){this.begin(n)},"pushState"),stateStackSize:i(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:i(function(n,a,y,m){switch(y){case 0:return 41;case 1:return 48;case 2:return 49;case 3:return 50;case 4:return 51;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),17;case 13:return 18;case 14:this.popState();break;case 15:return this.begin("acc_title"),33;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),35;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),38;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),39;case 25:return this.popState(),40;case 26:return this.pushState("CLASS"),45;case 27:return this.popState(),this.pushState("CLASS_STYLE"),46;case 28:return this.popState(),47;case 29:return this.pushState("STYLE"),42;case 30:return this.popState(),this.pushState("STYLEDEF_STYLES"),43;case 31:return this.popState(),44;case 32:return this.pushState("SCALE"),17;case 33:return 18;case 34:this.popState();break;case 35:this.pushState("STATE");break;case 36:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 37:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 38:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 39:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 40:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 41:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 42:return 48;case 43:return 49;case 44:return 50;case 45:return 51;case 46:this.pushState("STATE_STRING");break;case 47:return this.pushState("STATE_ID"),"AS";case 48:return this.popState(),"ID";case 49:this.popState();break;case 50:return"STATE_DESCR";case 51:return 19;case 52:this.popState();break;case 53:return this.popState(),this.pushState("struct"),20;case 54:break;case 55:return this.popState(),21;case 56:break;case 57:return this.begin("NOTE"),29;case 58:return this.popState(),this.pushState("NOTE_ID"),56;case 59:return this.popState(),this.pushState("NOTE_ID"),57;case 60:this.popState(),this.pushState("FLOATING_NOTE");break;case 61:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 62:break;case 63:return"NOTE_TEXT";case 64:return this.popState(),"ID";case 65:return this.popState(),this.pushState("NOTE_TEXT"),24;case 66:return this.popState(),a.yytext=a.yytext.substr(2).trim(),31;case 67:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),31;case 68:return 6;case 69:return 6;case 70:return 16;case 71:return 54;case 72:return 24;case 73:return a.yytext=a.yytext.trim(),14;case 74:return 15;case 75:return 28;case 76:return 55;case 77:return 5;case 78:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,29,35,42,43,44,45,54,55,56,57,71,72,73,74,75],inclusive:!1},FLOATING_NOTE_ID:{rules:[64],inclusive:!1},FLOATING_NOTE:{rules:[61,62,63],inclusive:!1},NOTE_TEXT:{rules:[66,67],inclusive:!1},NOTE_ID:{rules:[65],inclusive:!1},NOTE:{rules:[58,59,60],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[31],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[30],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,33,34],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[48],inclusive:!1},STATE_STRING:{rules:[49,50],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,36,37,38,39,40,41,46,47,51,52,53],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,35,53,57,68,69,70,71,72,73,74,76,77,78],inclusive:!0}}};return v}();Et.lexer=ke;function ct(){this.yy={}}return i(ct,"Parser"),ct.prototype=Et,Et.Parser=ct,new ct}();At.parser=At;var Cs=At,Be="LR",Mt="TB",St="state",Ot="relation",Fe="classDef",Pe="style",Ye="applyClass",Z="default",qt="divider",Qt="fill:none",Zt="fill: #333",te="c",ee="text",se="normal",Lt="rect",It="rectWithTitle",Ge="stateStart",je="stateEnd",zt="divider",Xt="roundedWithTitle",Ue="note",ze="noteGroup",tt="statediagram",Xe="state",We=`${tt}-${Xe}`,ie="transition",Je="note",Ve="note-edge",He=`${ie} ${Ve}`,Ke=`${tt}-${Je}`,Me="cluster",qe=`${tt}-${Me}`,Qe="cluster-alt",Ze=`${tt}-${Qe}`,re="parent",ne="note",ts="state",Nt="----",es=`${Nt}${ne}`,Wt=`${Nt}${re}`,ae=i((t,e=Mt)=>{if(!t.doc)return e;let c=e;for(const o of t.doc)o.stmt==="dir"&&(c=o.value);return c},"getDir"),ss=i(function(t,e){return e.db.extract(e.db.getRootDocV2()),e.db.getClasses()},"getClasses"),is=i(async function(t,e,c,o){b.info("REF0:"),b.info("Drawing state diagram (v2)",e);const{securityLevel:r,state:u,layout:p}=D();o.db.extract(o.db.getRootDocV2());const f=o.db.getData(),l=xe(e,r);f.type=o.type,f.layoutAlgorithm=p,f.nodeSpacing=u?.nodeSpacing||50,f.rankSpacing=u?.rankSpacing||50,f.markers=["barb"],f.diagramId=e,await we(f,l),Oe.insertTitle(l,"statediagramTitleText",u?.titleTopMargin??25,o.db.getDiagramTitle()),$e(l,8,tt,u?.useMaxWidth??!0)},"draw"),vs={getClasses:ss,draw:is,getDir:ae},yt=new Map,R=0;function gt(t="",e=0,c="",o=Nt){const r=c!==null&&c.length>0?`${o}${c}`:"";return`${ts}-${t}${r}-${e}`}i(gt,"stateDomId");var rs=i((t,e,c,o,r,u,p,f)=>{b.trace("items",e),e.forEach(l=>{switch(l.stmt){case St:q(t,l,c,o,r,u,p,f);break;case Z:q(t,l,c,o,r,u,p,f);break;case Ot:{q(t,l.state1,c,o,r,u,p,f),q(t,l.state2,c,o,r,u,p,f);const S={id:"edge"+R,start:l.state1.id,end:l.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:Qt,labelStyle:"",label:U.sanitizeText(l.description,D()),arrowheadStyle:Zt,labelpos:te,labelType:ee,thickness:se,classes:ie,look:p};r.push(S),R++}break}})},"setupDoc"),Jt=i((t,e=Mt)=>{let c=e;if(t.doc)for(const o of t.doc)o.stmt==="dir"&&(c=o.value);return c},"getDir");function M(t,e,c){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(r=>{if(c.get(r)){const u=c.get(r);e.cssCompiledStyles=[...e.cssCompiledStyles,...u.styles]}}));const o=t.find(r=>r.id===e.id);o?Object.assign(o,e):t.push(e)}i(M,"insertOrUpdateNode");function oe(t){return t?.classes?.join(" ")??""}i(oe,"getClassesFromDbInfo");function le(t){return t?.styles??[]}i(le,"getStylesFromDbInfo");var q=i((t,e,c,o,r,u,p,f)=>{const l=e.id,S=c.get(l),X=oe(S),w=le(S);if(b.info("dataFetcher parsedItem",e,S,w),l!=="root"){let L=Lt;e.start===!0?L=Ge:e.start===!1&&(L=je),e.type!==Z&&(L=e.type),yt.get(l)||yt.set(l,{id:l,shape:L,description:U.sanitizeText(l,D()),cssClasses:`${X} ${We}`,cssStyles:w});const d=yt.get(l);e.description&&(Array.isArray(d.description)?(d.shape=It,d.description.push(e.description)):d.description?.length>0?(d.shape=It,d.description===l?d.description=[e.description]:d.description=[d.description,e.description]):(d.shape=Lt,d.description=e.description),d.description=U.sanitizeTextOrArray(d.description,D())),d.description?.length===1&&d.shape===It&&(d.type==="group"?d.shape=Xt:d.shape=Lt),!d.type&&e.doc&&(b.info("Setting cluster for XCX",l,Jt(e)),d.type="group",d.isGroup=!0,d.dir=Jt(e),d.shape=e.type===qt?zt:Xt,d.cssClasses=`${d.cssClasses} ${qe} ${u?Ze:""}`);const C={labelStyle:"",shape:d.shape,label:d.description,cssClasses:d.cssClasses,cssCompiledStyles:[],cssStyles:d.cssStyles,id:l,dir:d.dir,domId:gt(l,R),type:d.type,isGroup:d.type==="group",padding:8,rx:10,ry:10,look:p};if(C.shape===zt&&(C.label=""),t&&t.id!=="root"&&(b.trace("Setting node ",l," to be child of its parent ",t.id),C.parentId=t.id),C.centerLabel=!0,e.note){const I={labelStyle:"",shape:Ue,label:e.note.text,cssClasses:Ke,cssStyles:[],cssCompilesStyles:[],id:l+es+"-"+R,domId:gt(l,R,ne),type:d.type,isGroup:d.type==="group",padding:D().flowchart.padding,look:p,position:e.note.position},F=l+Wt,P={labelStyle:"",shape:ze,label:e.note.text,cssClasses:d.cssClasses,cssStyles:[],id:l+Wt,domId:gt(l,R,re),type:"group",isGroup:!0,padding:16,look:p,position:e.note.position};R++,P.id=F,I.parentId=F,M(o,P,f),M(o,I,f),M(o,C,f);let O=l,N=I.id;e.note.position==="left of"&&(O=I.id,N=l),r.push({id:O+"-"+N,start:O,end:N,arrowhead:"none",arrowTypeEnd:"",style:Qt,labelStyle:"",classes:He,arrowheadStyle:Zt,labelpos:te,labelType:ee,thickness:se,look:p})}else M(o,C,f)}e.doc&&(b.trace("Adding nodes children "),rs(e,e.doc,c,o,r,!u,p,f))},"dataFetcher"),ns=i(()=>{yt.clear(),R=0},"reset"),Rt="[*]",ce="start",he=Rt,ue="end",Vt="color",Ht="fill",as="bgFill",os=",";function Bt(){return new Map}i(Bt,"newClassesList");var mt=[],Ft=[],de=Be,_t=[],V=Bt(),pe=i(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),bt={root:pe()},E=bt.root,Q=0,Kt=0,ls={LINE:0,DOTTED_LINE:1},cs={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},pt=i(t=>JSON.parse(JSON.stringify(t)),"clone"),hs=i(t=>{b.info("Setting root doc",t),_t=t},"setRootDoc"),us=i(()=>_t,"getRootDoc"),ft=i((t,e,c)=>{if(e.stmt===Ot)ft(t,e.state1,!0),ft(t,e.state2,!1);else if(e.stmt===St&&(e.id==="[*]"?(e.id=c?t.id+"_start":t.id+"_end",e.start=c):e.id=e.id.trim()),e.doc){const o=[];let r=[],u;for(u=0;u<e.doc.length;u++)if(e.doc[u].type===qt){const p=pt(e.doc[u]);p.doc=pt(r),o.push(p),r=[]}else r.push(e.doc[u]);if(o.length>0&&r.length>0){const p={stmt:St,id:Re(),type:"divider",doc:pt(r)};o.push(pt(p)),e.doc=o}e.doc.forEach(p=>ft(e,p,!0))}},"docTranslator"),Pt=i(()=>(ft({id:"root"},{id:"root",doc:_t},!0),{id:"root",doc:_t}),"getRootDocV2"),ds=i(t=>{let e;t.doc?e=t.doc:e=t,b.info(e),ye(!0),b.info("Extract initial document:",e),e.forEach(r=>{switch(b.warn("Statement",r.stmt),r.stmt){case St:B(r.id.trim(),r.type,r.doc,r.description,r.note,r.classes,r.styles,r.textStyles);break;case Ot:_e(r.state1,r.state2,r.description);break;case Fe:be(r.id.trim(),r.classes);break;case Pe:{const u=r.id.trim().split(","),p=r.styleClass.split(",");u.forEach(f=>{let l=z(f);if(l===void 0){const S=f.trim();B(S),l=z(S)}l.styles=p.map(S=>S.replace(/;/g,"")?.trim())})}break;case Ye:Yt(r.id.trim(),r.styleClass);break}});const c=ge(),o=D().look;ns(),q(void 0,Pt(),c,mt,Ft,!0,o,V),mt.forEach(r=>{if(Array.isArray(r.label)){if(r.description=r.label.slice(1),r.isGroup&&r.description.length>0)throw new Error("Group nodes can only have label. Remove the additional description for node ["+r.id+"]");r.label=r.label[0]}})},"extract"),B=i(function(t,e=Z,c=null,o=null,r=null,u=null,p=null,f=null){const l=t?.trim();if(E.states.has(l)?(E.states.get(l).doc||(E.states.get(l).doc=c),E.states.get(l).type||(E.states.get(l).type=e)):(b.info("Adding state ",l,o),E.states.set(l,{id:l,descriptions:[],type:e,doc:c,note:r,classes:[],styles:[],textStyles:[]})),o&&(b.info("Setting state description",l,o),typeof o=="string"&&wt(l,o.trim()),typeof o=="object"&&o.forEach(S=>wt(l,S.trim()))),r){const S=E.states.get(l);S.note=r,S.note.text=U.sanitizeText(S.note.text,D())}u&&(b.info("Setting state classes",l,u),(typeof u=="string"?[u]:u).forEach(S=>Yt(l,S.trim()))),p&&(b.info("Setting state styles",l,p),(typeof p=="string"?[p]:p).forEach(S=>ms(l,S.trim()))),f&&(b.info("Setting state styles",l,p),(typeof f=="string"?[f]:f).forEach(S=>_s(l,S.trim())))},"addState"),ye=i(function(t){mt=[],Ft=[],bt={root:pe()},E=bt.root,Q=0,V=Bt(),t||Ne()},"clear"),z=i(function(t){return E.states.get(t)},"getState"),ge=i(function(){return E.states},"getStates"),ps=i(function(){b.info("Documents = ",bt)},"logDocuments"),ys=i(function(){return E.relations},"getRelations");function kt(t=""){let e=t;return t===Rt&&(Q++,e=`${ce}${Q}`),e}i(kt,"startIdIfNeeded");function Tt(t="",e=Z){return t===Rt?ce:e}i(Tt,"startTypeIfNeeded");function fe(t=""){let e=t;return t===he&&(Q++,e=`${ue}${Q}`),e}i(fe,"endIdIfNeeded");function Se(t="",e=Z){return t===he?ue:e}i(Se,"endTypeIfNeeded");function me(t,e,c){let o=kt(t.id.trim()),r=Tt(t.id.trim(),t.type),u=kt(e.id.trim()),p=Tt(e.id.trim(),e.type);B(o,r,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),B(u,p,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),E.relations.push({id1:o,id2:u,relationTitle:U.sanitizeText(c,D())})}i(me,"addRelationObjs");var _e=i(function(t,e,c){if(typeof t=="object")me(t,e,c);else{const o=kt(t.trim()),r=Tt(t),u=fe(e.trim()),p=Se(e);B(o,r),B(u,p),E.relations.push({id1:o,id2:u,title:U.sanitizeText(c,D())})}},"addRelation"),wt=i(function(t,e){const c=E.states.get(t),o=e.startsWith(":")?e.replace(":","").trim():e;c.descriptions.push(U.sanitizeText(o,D()))},"addDescription"),gs=i(function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},"cleanupLabel"),fs=i(()=>(Kt++,"divider-id-"+Kt),"getDividerId"),be=i(function(t,e=""){V.has(t)||V.set(t,{id:t,styles:[],textStyles:[]});const c=V.get(t);e?.split(os).forEach(o=>{const r=o.replace(/([^;]*);/,"$1").trim();if(RegExp(Vt).exec(o)){const u=r.replace(Ht,as).replace(Vt,Ht);c.textStyles.push(u)}c.styles.push(r)})},"addStyleClass"),Ss=i(function(){return V},"getClasses"),Yt=i(function(t,e){t.split(",").forEach(function(c){let o=z(c);if(o===void 0){const r=c.trim();B(r),o=z(r)}o.classes.push(e)})},"setCssClass"),ms=i(function(t,e){const c=z(t);c!==void 0&&c.styles.push(e)},"setStyle"),_s=i(function(t,e){const c=z(t);c!==void 0&&c.textStyles.push(e)},"setTextStyle"),bs=i(()=>de,"getDirection"),ks=i(t=>{de=t},"setDirection"),Ts=i(t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),"trimColon"),Es=i(()=>{const t=D();return{nodes:mt,edges:Ft,other:{},config:t,direction:ae(Pt())}},"getData"),Ls={getConfig:i(()=>D().state,"getConfig"),getData:Es,addState:B,clear:ye,getState:z,getStates:ge,getRelations:ys,getClasses:Ss,getDirection:bs,addRelation:_e,getDividerId:fs,setDirection:ks,cleanupLabel:gs,lineType:ls,relationType:cs,logDocuments:ps,getRootDoc:us,setRootDoc:hs,getRootDocV2:Pt,extract:ds,trimColon:Ts,getAccTitle:De,setAccTitle:Ce,getAccDescription:ve,setAccDescription:Le,addStyleClass:be,setCssClass:Yt,addDescription:wt,setDiagramTitle:Ie,getDiagramTitle:Ae},xs=i(t=>`
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
`,"getStyles"),Is=xs;export{Ls as a,Is as b,vs as c,Cs as s};
