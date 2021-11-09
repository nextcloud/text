/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"viewer": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"vendors~editor~files-modal":"vendors~editor~files-modal","vendors~editor":"vendors~editor","editor":"editor","highlight/1c":"highlight/1c","highlight/abnf":"highlight/abnf","highlight/accesslog":"highlight/accesslog","highlight/actionscript":"highlight/actionscript","highlight/ada":"highlight/ada","highlight/angelscript":"highlight/angelscript","highlight/apache":"highlight/apache","highlight/applescript":"highlight/applescript","highlight/arcade":"highlight/arcade","highlight/arduino":"highlight/arduino","highlight/armasm":"highlight/armasm","highlight/asciidoc":"highlight/asciidoc","highlight/aspectj":"highlight/aspectj","highlight/autohotkey":"highlight/autohotkey","highlight/autoit":"highlight/autoit","highlight/avrasm":"highlight/avrasm","highlight/awk":"highlight/awk","highlight/axapta":"highlight/axapta","highlight/bash":"highlight/bash","highlight/basic":"highlight/basic","highlight/bnf":"highlight/bnf","highlight/brainfuck":"highlight/brainfuck","highlight/c":"highlight/c","highlight/c-like":"highlight/c-like","highlight/cal":"highlight/cal","highlight/capnproto":"highlight/capnproto","highlight/ceylon":"highlight/ceylon","highlight/clean":"highlight/clean","highlight/clojure":"highlight/clojure","highlight/clojure-repl":"highlight/clojure-repl","highlight/cmake":"highlight/cmake","highlight/coffeescript":"highlight/coffeescript","highlight/coq":"highlight/coq","highlight/cos":"highlight/cos","highlight/cpp":"highlight/cpp","highlight/crmsh":"highlight/crmsh","highlight/crystal":"highlight/crystal","highlight/csharp":"highlight/csharp","highlight/csp":"highlight/csp","highlight/css":"highlight/css","highlight/d":"highlight/d","highlight/dart":"highlight/dart","highlight/delphi":"highlight/delphi","highlight/diff":"highlight/diff","highlight/django":"highlight/django","highlight/dns":"highlight/dns","highlight/dockerfile":"highlight/dockerfile","highlight/dos":"highlight/dos","highlight/dsconfig":"highlight/dsconfig","highlight/dts":"highlight/dts","highlight/dust":"highlight/dust","highlight/ebnf":"highlight/ebnf","highlight/elixir":"highlight/elixir","highlight/elm":"highlight/elm","highlight/erb":"highlight/erb","highlight/erlang":"highlight/erlang","highlight/erlang-repl":"highlight/erlang-repl","highlight/excel":"highlight/excel","highlight/fix":"highlight/fix","highlight/flix":"highlight/flix","highlight/fortran":"highlight/fortran","highlight/fsharp":"highlight/fsharp","highlight/gams":"highlight/gams","highlight/gauss":"highlight/gauss","highlight/gcode":"highlight/gcode","highlight/gherkin":"highlight/gherkin","highlight/glsl":"highlight/glsl","highlight/gml":"highlight/gml","highlight/go":"highlight/go","highlight/golo":"highlight/golo","highlight/gradle":"highlight/gradle","highlight/groovy":"highlight/groovy","highlight/haml":"highlight/haml","highlight/handlebars":"highlight/handlebars","highlight/haskell":"highlight/haskell","highlight/haxe":"highlight/haxe","highlight/hsp":"highlight/hsp","highlight/htmlbars":"highlight/htmlbars","highlight/http":"highlight/http","highlight/hy":"highlight/hy","highlight/inform7":"highlight/inform7","highlight/ini":"highlight/ini","highlight/irpf90":"highlight/irpf90","highlight/isbl":"highlight/isbl","highlight/java":"highlight/java","highlight/javascript":"highlight/javascript","highlight/jboss-cli":"highlight/jboss-cli","highlight/json":"highlight/json","highlight/julia":"highlight/julia","highlight/julia-repl":"highlight/julia-repl","highlight/kotlin":"highlight/kotlin","highlight/lasso":"highlight/lasso","highlight/latex":"highlight/latex","highlight/ldif":"highlight/ldif","highlight/leaf":"highlight/leaf","highlight/less":"highlight/less","highlight/lisp":"highlight/lisp","highlight/livecodeserver":"highlight/livecodeserver","highlight/livescript":"highlight/livescript","highlight/llvm":"highlight/llvm","highlight/lsl":"highlight/lsl","highlight/lua":"highlight/lua","highlight/makefile":"highlight/makefile","highlight/markdown":"highlight/markdown","highlight/mathematica":"highlight/mathematica","highlight/matlab":"highlight/matlab","highlight/maxima":"highlight/maxima","highlight/mel":"highlight/mel","highlight/mercury":"highlight/mercury","highlight/mipsasm":"highlight/mipsasm","highlight/mizar":"highlight/mizar","highlight/mojolicious":"highlight/mojolicious","highlight/monkey":"highlight/monkey","highlight/moonscript":"highlight/moonscript","highlight/n1ql":"highlight/n1ql","highlight/nginx":"highlight/nginx","highlight/nim":"highlight/nim","highlight/nix":"highlight/nix","highlight/node-repl":"highlight/node-repl","highlight/nsis":"highlight/nsis","highlight/objectivec":"highlight/objectivec","highlight/ocaml":"highlight/ocaml","highlight/openscad":"highlight/openscad","highlight/oxygene":"highlight/oxygene","highlight/parser3":"highlight/parser3","highlight/perl":"highlight/perl","highlight/pf":"highlight/pf","highlight/pgsql":"highlight/pgsql","highlight/php":"highlight/php","highlight/php-template":"highlight/php-template","highlight/plaintext":"highlight/plaintext","highlight/pony":"highlight/pony","highlight/powershell":"highlight/powershell","highlight/processing":"highlight/processing","highlight/profile":"highlight/profile","highlight/prolog":"highlight/prolog","highlight/properties":"highlight/properties","highlight/protobuf":"highlight/protobuf","highlight/puppet":"highlight/puppet","highlight/purebasic":"highlight/purebasic","highlight/python":"highlight/python","highlight/python-repl":"highlight/python-repl","highlight/q":"highlight/q","highlight/qml":"highlight/qml","highlight/r":"highlight/r","highlight/reasonml":"highlight/reasonml","highlight/rib":"highlight/rib","highlight/roboconf":"highlight/roboconf","highlight/routeros":"highlight/routeros","highlight/rsl":"highlight/rsl","highlight/ruby":"highlight/ruby","highlight/ruleslanguage":"highlight/ruleslanguage","highlight/rust":"highlight/rust","highlight/sas":"highlight/sas","highlight/scala":"highlight/scala","highlight/scheme":"highlight/scheme","highlight/scilab":"highlight/scilab","highlight/scss":"highlight/scss","highlight/shell":"highlight/shell","highlight/smali":"highlight/smali","highlight/smalltalk":"highlight/smalltalk","highlight/sml":"highlight/sml","highlight/sqf":"highlight/sqf","highlight/sql":"highlight/sql","highlight/sql_more":"highlight/sql_more","highlight/stan":"highlight/stan","highlight/stata":"highlight/stata","highlight/step21":"highlight/step21","highlight/stylus":"highlight/stylus","highlight/subunit":"highlight/subunit","highlight/swift":"highlight/swift","highlight/taggerscript":"highlight/taggerscript","highlight/tap":"highlight/tap","highlight/tcl":"highlight/tcl","highlight/thrift":"highlight/thrift","highlight/tp":"highlight/tp","highlight/twig":"highlight/twig","highlight/typescript":"highlight/typescript","highlight/vala":"highlight/vala","highlight/vbnet":"highlight/vbnet","highlight/vbscript":"highlight/vbscript","highlight/vbscript-html":"highlight/vbscript-html","highlight/verilog":"highlight/verilog","highlight/vhdl":"highlight/vhdl","highlight/vim":"highlight/vim","highlight/x86asm":"highlight/x86asm","highlight/xl":"highlight/xl","highlight/xml":"highlight/xml","highlight/xquery":"highlight/xquery","highlight/yaml":"highlight/yaml","highlight/zephir":"highlight/zephir","vendors~editor-collab~editor-guest~editor-rich~files-modal":"vendors~editor-collab~editor-guest~editor-rich~files-modal","vendors~editor-collab~editor-guest":"vendors~editor-collab~editor-guest","editor-guest":"editor-guest","vendors~editor-collab":"vendors~editor-collab","editor-collab":"editor-collab","vendors~editor-rich":"vendors~editor-rich","editor-rich":"editor-rich","vendors~files-modal":"vendors~files-modal","files-modal":"files-modal"}[chunkId]||chunkId) + ".js?v=" + {"vendors~editor~files-modal":"44fc65c6931a1c1a7a9d","vendors~editor":"ab7d6c79ed614bdc4d7b","editor":"c19e9e57a2cf3f08248c","highlight/1c":"97a68e6fb16ca694df7d","highlight/abnf":"69805b2100eb1b33a416","highlight/accesslog":"bea56a975f4ee870e771","highlight/actionscript":"2b7a835a98032931dce8","highlight/ada":"07205b08a233cfff1d3b","highlight/angelscript":"76da61e6d7fada43da61","highlight/apache":"2024b78d98a90fc77187","highlight/applescript":"df41ff5ae164d104a31c","highlight/arcade":"0a3b34536a64873e179e","highlight/arduino":"6af645751fbcda226398","highlight/armasm":"a6ac475d1f50c3d7ae39","highlight/asciidoc":"9e8b03722fcdb1d0c6c0","highlight/aspectj":"029f74984944cdbe24b5","highlight/autohotkey":"9133024176949194d0eb","highlight/autoit":"69cc09293635db634cc1","highlight/avrasm":"5894f80bdc8febd4bbe9","highlight/awk":"6c3b258edcd85284fc92","highlight/axapta":"7fb7c4dc9a34476374f8","highlight/bash":"b8536d613301090285c0","highlight/basic":"88ca617d069c4f7db7b6","highlight/bnf":"9ae00ec5f7f2f5ac392c","highlight/brainfuck":"a36ebae8da84c62c9b12","highlight/c":"3095bb0277bfb89eb74f","highlight/c-like":"88a1c1b13dd83db9916b","highlight/cal":"592093a49377d29bbd53","highlight/capnproto":"a6459dc089b4e7683682","highlight/ceylon":"7f2be5a8f895d94a7572","highlight/clean":"430fdab19ea261921568","highlight/clojure":"d7428567d861642c01c9","highlight/clojure-repl":"88fa664a94c790db025a","highlight/cmake":"d124d1f1d086233fe1fc","highlight/coffeescript":"3d0cc6a2c9e2edfbee1d","highlight/coq":"a7d1f7ffb06fbf07de70","highlight/cos":"f795bf0a449a82f09555","highlight/cpp":"4438ee526fb988f6f4df","highlight/crmsh":"8ae6befab92379391b1b","highlight/crystal":"8ca1db6082ad06a5b71f","highlight/csharp":"148a750e56470d2912f3","highlight/csp":"3b282a34fc3ff043cf3a","highlight/css":"9f9d7851456db3b25774","highlight/d":"979ff7e8b4f0a9b21070","highlight/dart":"865826c09fc7553151a4","highlight/delphi":"3a006e0c4b9791cffb88","highlight/diff":"bbb9296722eace98aabd","highlight/django":"6b0c4e446ae072bc58b1","highlight/dns":"5cec0851818f5143d387","highlight/dockerfile":"5dd5de0be078d3ce50ad","highlight/dos":"a2d2fd4c9c144fa05420","highlight/dsconfig":"ab194556e942a950e85d","highlight/dts":"c5af0eab574cf6cf6500","highlight/dust":"78d5f0f83ba1d52751f7","highlight/ebnf":"9d166f2b70620c2c820a","highlight/elixir":"1eee89b620fa9122f2f2","highlight/elm":"2c02a8ee37abc11f6dd5","highlight/erb":"dd2f9b7577dc246f0edd","highlight/erlang":"45b5754807acc2041416","highlight/erlang-repl":"67a8eb40a2425c6647d8","highlight/excel":"f3fb8966642703eaac3e","highlight/fix":"a8e19e2adbe62fce23a6","highlight/flix":"a1e4b02ae80e85fa8c22","highlight/fortran":"839ef06a50f3b98b8e93","highlight/fsharp":"2b1582bc1318d2db2ce6","highlight/gams":"eaf0d791fd506df599ff","highlight/gauss":"a00d8b6917ae9a4c5c76","highlight/gcode":"788d54a21fcb4716ea80","highlight/gherkin":"bfeeabcb800a1373c0b4","highlight/glsl":"088b189622eacafd7a36","highlight/gml":"a6dec6fdfc7221ac899d","highlight/go":"d4fd395c06f71a0f4e24","highlight/golo":"630b108487f660c555c6","highlight/gradle":"d3da03b50d230dc73da6","highlight/groovy":"d35ea2c93374a225afe8","highlight/haml":"217ea9da90627b33f035","highlight/handlebars":"b2355a6abf1f0d9830f2","highlight/haskell":"96e2860c086cdf50ace7","highlight/haxe":"f4f0e657b328d1659e46","highlight/hsp":"64f3fff6e351afaeaef0","highlight/htmlbars":"8a98e4921311bfe31a44","highlight/http":"e4b52fd62e90fc6bb3cc","highlight/hy":"ade4b85616d966f9a325","highlight/inform7":"9b7838c03ceb55e32bda","highlight/ini":"88d439f5f6419f1d994e","highlight/irpf90":"8df2189cb478d1803808","highlight/isbl":"39e7e4f0ba8c2c9cede5","highlight/java":"90ce90e455dd27a8b718","highlight/javascript":"f4eddb5614e4ead538e8","highlight/jboss-cli":"f5e73fc753d1c629bb60","highlight/json":"d27bc39a34bda6d19231","highlight/julia":"86129343f8cd76df062c","highlight/julia-repl":"288a8bc23a52d94e1147","highlight/kotlin":"902e63681ff010d8a91a","highlight/lasso":"d7854bddd4adffc3e4d3","highlight/latex":"c284394e1aa586d3d613","highlight/ldif":"ad4f32986701ab02f17e","highlight/leaf":"e1adb90af145dfafd4cc","highlight/less":"1f1f1b315302658f05d5","highlight/lisp":"994895303e63f1efff03","highlight/livecodeserver":"2c45e5be9e88c2a88e15","highlight/livescript":"b59cf5506030c7a0c66e","highlight/llvm":"47dacce958f8125fda21","highlight/lsl":"3ce9cea06fbfee31d86f","highlight/lua":"2b1a58d5487f44dd8035","highlight/makefile":"e7926c15117f90713750","highlight/markdown":"aff9d64cf31285f1a37a","highlight/mathematica":"89bb6d01622b1c1c3fd3","highlight/matlab":"a7d4dfdb318189835801","highlight/maxima":"65882aaa322cb544f3b7","highlight/mel":"1a49ad4aceeb68c5e942","highlight/mercury":"a2e6449aa89e99dd34f2","highlight/mipsasm":"4e25ba3230bf3adde68b","highlight/mizar":"2e9f313c06472e0f5ccf","highlight/mojolicious":"1af58fd695fff8ec480e","highlight/monkey":"17fd005efd2b0a98f376","highlight/moonscript":"5b6b60ca03dfb9bf0c50","highlight/n1ql":"d90e862179bff8ee95e9","highlight/nginx":"3e0fa9256f968207dd69","highlight/nim":"1d7e55fbc1aa557da76e","highlight/nix":"d69d7d16a99c9361291e","highlight/node-repl":"e505561b7b70ede6a429","highlight/nsis":"874655284974eac7717f","highlight/objectivec":"6fd60c23cf49cf077e1b","highlight/ocaml":"3b3cd0e9396322302171","highlight/openscad":"f4e1c5a632b5ee8f603c","highlight/oxygene":"1eb6220e871b57ec3f74","highlight/parser3":"16183edc7953e06a3f5d","highlight/perl":"2db6b55ccfc1f496a060","highlight/pf":"5a57e61c04391c296ee9","highlight/pgsql":"46bb4adb4a1f829df818","highlight/php":"18475eef9c64856531d8","highlight/php-template":"9e9bd24f58af6181f527","highlight/plaintext":"0ee7fbe76345cba37b94","highlight/pony":"63c1f3baf4d9bb3b7b16","highlight/powershell":"284ebc58a4b23bde8e76","highlight/processing":"b9d69fcbac36852207da","highlight/profile":"1cac9d671161756f849e","highlight/prolog":"e2e22b502708b04719eb","highlight/properties":"d4850d0df86bed4b2fa8","highlight/protobuf":"8045b3bdde2e5d048ac5","highlight/puppet":"b24baea7f2bd3966a7ec","highlight/purebasic":"ec25373ca0fb7ba710b6","highlight/python":"46f56a5733f2d5b20031","highlight/python-repl":"8df2899632669ddd41b1","highlight/q":"b1226ac13ca86d204a53","highlight/qml":"ff6dc5351651eb6b8074","highlight/r":"fa0a99657facdda0e1f8","highlight/reasonml":"91c3cce49ff9c72c47aa","highlight/rib":"64d83e5ce9d89e57c1e2","highlight/roboconf":"c60991983ae63815169d","highlight/routeros":"46edb6a6908900869bb9","highlight/rsl":"09add9f46b4f0ee1a48d","highlight/ruby":"cbd7e00e4beb5ef53b2c","highlight/ruleslanguage":"211487ced021c9d1a15a","highlight/rust":"f0b33dc5f51088d564ee","highlight/sas":"f7ffc43c00cb842ac437","highlight/scala":"ab02376870dd23737c64","highlight/scheme":"5eb9c9732baebf49be67","highlight/scilab":"e39095d27df230081f85","highlight/scss":"237cf0acf9f66bd2ce20","highlight/shell":"3b89aab7c23298453b98","highlight/smali":"9e5c3d26daa10b8d9a13","highlight/smalltalk":"c0e556fa61176001d2ea","highlight/sml":"c9f12fca76f3f3396a72","highlight/sqf":"19cc3aca262e321da956","highlight/sql":"f1fe6f4c234161f7487c","highlight/sql_more":"f19555ea6e87a687d9ed","highlight/stan":"361c56fbb87ea6c7dfc3","highlight/stata":"50eba271716f287ea606","highlight/step21":"2f799595be85db3da28d","highlight/stylus":"eb533ce588e5e144468a","highlight/subunit":"3cbd5427ab29243f2711","highlight/swift":"2595bf294e100f66e239","highlight/taggerscript":"2ee19f7a29e680ca9f2f","highlight/tap":"4bb20249512bc448b684","highlight/tcl":"45813b9b8bf1eb19e395","highlight/thrift":"a8718408fa3a650391ca","highlight/tp":"007bfa5a3c3574131447","highlight/twig":"f7d67a9c22a017de13c3","highlight/typescript":"32660ce4ef4898972f72","highlight/vala":"0fe8ac2cc4f71588d27b","highlight/vbnet":"0cccaec8c7fb4fa98764","highlight/vbscript":"8ade9a1edc5a311a7dad","highlight/vbscript-html":"e028d9dfbbadf1db35e3","highlight/verilog":"1f867b702f1036d59102","highlight/vhdl":"78d7fd01da7e7c2dfdd1","highlight/vim":"c000be6a6c2cbcbdbc19","highlight/x86asm":"db6521bcd01bac60391a","highlight/xl":"122679752f8ae8b62e3d","highlight/xml":"d0f98aed182dcab28928","highlight/xquery":"1d1198a8af8a3adec46e","highlight/yaml":"05029146c0c896079e49","highlight/zephir":"b402010d71179b054544","vendors~editor-collab~editor-guest~editor-rich~files-modal":"b72919af2b21652ed3cf","vendors~editor-collab~editor-guest":"454ecd7bc8416fb0247e","editor-guest":"664f74324d2a3c34a015","vendors~editor-collab":"b7e8c773924478eddfdf","editor-collab":"14adbfbd5bd796dbab09","vendors~editor-rich":"a5a437b0ebd760958b05","editor-rich":"e57626c4dac87889956e","vendors~files-modal":"636aaf37728fa5ff13f5","files-modal":"2f0e44650c6138e81582"}[chunkId] + ""
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["textWebpackJsonp"] = window["textWebpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/viewer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ViewerComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'ViewerComponent',
  components: {
    EditorWrapper: function EditorWrapper() {
      return Promise.all(/*! import() | editor */[__webpack_require__.e("vendors~editor~files-modal"), __webpack_require__.e("vendors~editor"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(null, /*! ./EditorWrapper */ "./src/components/EditorWrapper.vue"));
    }
  },
  props: {
    filename: {
      type: String,
      default: null
    },
    fileid: {
      type: Number,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    shareToken: {
      type: String,
      default: null
    },
    mime: {
      type: String,
      default: null
    }
  },
  beforeMount: function beforeMount() {
    // FIXME Dirty fix to avoid recreating the component on stable16
    if (typeof this.$parent.$parent !== 'undefined' && this.$parent.$parent.onResize) {
      window.removeEventListener('resize', this.$parent.$parent.onResize);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n#editor-container {\n\theight: calc(100% - 50px);\n\ttop: 50px;\n}\n", "",{"version":3,"sources":["webpack://./src/components/ViewerComponent.vue"],"names":[],"mappings":";AAwEA;CACA,yBAAA;CACA,SAAA;AACA","sourcesContent":["<!--\n  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>\n  -\n  - @author Julius Härtl <jus@bitgrid.net>\n  -\n  - @license GNU AGPL version 3 or any later version\n  -\n  - This program is free software: you can redistribute it and/or modify\n  - it under the terms of the GNU Affero General Public License as\n  - published by the Free Software Foundation, either version 3 of the\n  - License, or (at your option) any later version.\n  -\n  - This program is distributed in the hope that it will be useful,\n  - but WITHOUT ANY WARRANTY; without even the implied warranty of\n  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n  - GNU Affero General Public License for more details.\n  -\n  - You should have received a copy of the GNU Affero General Public License\n  - along with this program. If not, see <http://www.gnu.org/licenses/>.\n  -\n  -->\n\n<template>\n\t<EditorWrapper :file-id=\"fileid\"\n\t\t:relative-path=\"filename\"\n\t\t:active=\"active\"\n\t\t:autofocus=\"autofocus\"\n\t\t:share-token=\"shareToken\"\n\t\t:mime=\"mime\" />\n</template>\n\n<script>\nexport default {\n\tname: 'ViewerComponent',\n\tcomponents: {\n\t\tEditorWrapper: () => import(/* webpackChunkName: \"editor\" */'./EditorWrapper'),\n\t},\n\tprops: {\n\t\tfilename: {\n\t\t\ttype: String,\n\t\t\tdefault: null,\n\t\t},\n\t\tfileid: {\n\t\t\ttype: Number,\n\t\t\tdefault: null,\n\t\t},\n\t\tactive: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false,\n\t\t},\n\t\tautofocus: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true,\n\t\t},\n\t\tshareToken: {\n\t\t\ttype: String,\n\t\t\tdefault: null,\n\t\t},\n\t\tmime: {\n\t\t\ttype: String,\n\t\t\tdefault: null,\n\t\t},\n\t},\n\tbeforeMount() {\n\t\t// FIXME Dirty fix to avoid recreating the component on stable16\n\t\tif (typeof this.$parent.$parent !== 'undefined' && this.$parent.$parent.onResize) {\n\t\t\twindow.removeEventListener('resize', this.$parent.$parent.onResize)\n\t\t}\n\t},\n}\n</script>\n<style>\n#editor-container {\n\theight: calc(100% - 50px);\n\ttop: 50px;\n}\n</style>\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib??vue-loader-options!./ViewerComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("EditorWrapper", {
    attrs: {
      "file-id": _vm.fileid,
      "relative-path": _vm.filename,
      active: _vm.active,
      autofocus: _vm.autofocus,
      "share-token": _vm.shareToken,
      mime: _vm.mime
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./src/components/ViewerComponent.vue":
/*!********************************************!*\
  !*** ./src/components/ViewerComponent.vue ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerComponent.vue?vue&type=template&id=a2d1e8ea& */ "./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea&");
/* harmony import */ var _ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewerComponent.vue?vue&type=script&lang=js& */ "./src/components/ViewerComponent.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ViewerComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewerComponent.vue?vue&type=style&index=0&lang=css& */ "./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/ViewerComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/ViewerComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/components/ViewerComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./ViewerComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************!*\
  !*** ./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib??vue-loader-options!./ViewerComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=style&index=0&lang=css&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea&":
/*!***************************************************************************!*\
  !*** ./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./ViewerComponent.vue?vue&type=template&id=a2d1e8ea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/ViewerComponent.vue?vue&type=template&id=a2d1e8ea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewerComponent_vue_vue_type_template_id_a2d1e8ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/helpers/mime.js":
/*!*****************************!*\
  !*** ./src/helpers/mime.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openMimetypesPlainText = exports.openMimetypesMarkdown = exports.openMimetypes = void 0;

/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var openMimetypesMarkdown = ['text/markdown'];
exports.openMimetypesMarkdown = openMimetypesMarkdown;
var openMimetypesPlainText = ['text/plain', 'application/cmd', 'application/x-empty', 'application/x-msdos-program', 'application/javascript', 'application/json', 'application/x-perl', 'application/x-php', 'application/x-tex', 'application/xml', 'application/yaml', 'text/css', 'text/csv', 'text/html', 'text/org', 'text/x-c', 'text/x-c++src', 'text/x-h', 'text/x-java-source', 'text/x-ldif', 'text/x-python', 'text/x-shellscript'];
exports.openMimetypesPlainText = openMimetypesPlainText;
var openMimetypes = [].concat(openMimetypesMarkdown, openMimetypesPlainText);
exports.openMimetypes = openMimetypes;

/***/ }),

/***/ "./src/viewer.js":
/*!***********************!*\
  !*** ./src/viewer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ViewerComponent = _interopRequireDefault(__webpack_require__(/*! ./components/ViewerComponent */ "./src/components/ViewerComponent.vue"));

var _mime = __webpack_require__(/*! ./helpers/mime */ "./src/helpers/mime.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

__webpack_require__.nc = btoa(OC.requestToken); // eslint-disable-line

__webpack_require__.p = OC.linkTo('text', 'js/'); // eslint-disable-line

document.addEventListener('DOMContentLoaded', function () {
  if (typeof OCA.Viewer === 'undefined') {
    console.error('Viewer app is not installed');
    return;
  }

  OCA.Viewer.registerHandler({
    id: 'text',
    mimes: [].concat(_toConsumableArray(_mime.openMimetypesMarkdown), _toConsumableArray(_mime.openMimetypesPlainText)),
    component: _ViewerComponent.default,
    group: null
  });
});

/***/ })

/******/ });
//# sourceMappingURL=viewer.js.map