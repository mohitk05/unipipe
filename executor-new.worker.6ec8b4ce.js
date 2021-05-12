parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"gQLa":[function(require,module,exports) {
var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,a){function i(e){try{s(o.next(e))}catch(t){a(t)}}function u(e){try{s(o.throw(e))}catch(t){a(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,u)}s((o=o.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){i.label=a[1];break}if(6===a[0]&&i.label<r[1]){i.label=r[1],r=a;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(a);break}r[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(u){a=[6,u],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},ctx=self,globalElements={},ExecutorNode=function(){function ExecutorNode(e){this.node=e,this.subscribers=[],this.isWaiting=!1,this.data=null}return ExecutorNode.prototype.getNode=function(){return this.node},ExecutorNode.prototype.getData=function(e){var t=this;return new Promise(function(n,o){if(null!==t.data)return n(t.data[e]);if(t.isWaiting){var r=!1,a=setTimeout(function(){r=!0,o({code:500,message:"Input node execution timed out."})},2e4);t.subscribers.push(function(){r||(clearTimeout(a),n(t.data[e]))})}else t.isWaiting=!0,o({code:400,message:"Input node needs to be executed."})})},ExecutorNode.prototype.execute=function(scopeData){var _this=this,processor=globalElements[this.node.type].processor;return new Promise(function(res,rej){return __awaiter(_this,void 0,void 0,function(){var data,e_1;return __generator(this,function(_a){switch(_a.label){case 0:return _a.trys.push([0,2,3,4]),ctx.postMessage({type:"update_node",node:this.node.id,update:{status:1}}),[4,eval("("+processor+")({ ...scopeData, ctx, node: this.node })")];case 1:return data=_a.sent(),this.data=data,this.subscribers.forEach(function(e){return e()}),ctx.postMessage({type:"update_node",node:this.node.id,update:{status:2}}),res(data),[3,4];case 2:return e_1=_a.sent(),rej("Error executing node - "+globalElements[this.node.type].type+" ("+this.node.id+"). Message: "+e_1.message),ctx.postMessage({type:"update_node",node:this.node.id,update:{status:3}}),[3,4];case 3:return this.isWaiting=!1,[7];case 4:return[2]}})})})},ExecutorNode}(),execute=function(e,t,n,o){globalElements=o;var r={};e.forEach(function(e){ctx.postMessage({type:"update_node",node:e.id,update:{status:0}}),r[e.id]=new ExecutorNode(e)});!function e(o){return __awaiter(void 0,void 0,void 0,function(){var a,i,u;return __generator(this,function(s){switch(s.label){case 0:return a=r[o],i=a.getNode().inputs,u=[],i.forEach(function(o){var a=t[o];if(a.ref){var i=n[a.ref],s=r[i.node];u.push(new Promise(function(t,n){s.getData(i.name).then(function(e){t({data:e,name:a.name})}).catch(function(t){var o=t.code,r=t.message;return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(t){return 400===o?e(s.node.id):n(r),[2]})})})}))}}),[4,Promise.all(u).then(function(o){var r={};o.forEach(function(e){r[e.name]=e.data}),a.execute(r).then(function(o){var r=function(o){var r=n[o].refs,a={};r.forEach(function(n){var o=t[n].node;a[o]||(e(o),a[o]=1)})};a.getNode().outputs.length&&!["sink","conditional"].includes(globalElements[a.getNode().type].type)&&a.getNode().outputs.length?a.getNode().outputs.forEach(r):"conditional"==globalElements[a.getNode().type].type&&r(o.true?a.getNode().outputs[0]:a.getNode().outputs[1])}).catch(function(e){throw new Error(e)})}).catch(function(e){console.log(e)})];case 1:return s.sent(),[2]}})})}(findHeadNode(e,t,n))},findHeadNode=function(e,t,n){var o={};e.forEach(function(e){o[e.id]=e});var r=e.filter(function(e){return!e.inputs.length});r.filter(function(e){var r=!0;return e.outputs.forEach(function(e){r&&n[e].refs.forEach(function(n){if(r){var a=t[n];o[a.node].inputs.map(function(e){return t[e]}).forEach(function(t){r&&t.ref&&t.ref!==e&&(r=!1)})}})}),r});return r[0]?r[0].id:e[0].id};ctx.addEventListener("message",function(e){var t=e.data;switch(t.action){case"execute":return void execute(t.data.nodes,t.data.inputPins,t.data.outputPins,t.data.elements);default:return}});
},{}]},{},["gQLa"], null)
//# sourceMappingURL=/executor-new.worker.6ec8b4ce.js.map