// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/executor/executor-new.worker.ts":[function(require,module,exports) {
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var ctx = self;
/*
Algorithm
current: current node in the process
- If current node is sink or it has no outputs, end the process.
- If not, then
    - Get data from all inputs for current node
        - If the input node has data != null, then get that data, or else subscribe to their data
    - Execute the processor for the current node with input values in scope.
      The processor would always return a promise which upon completion will return the data.
    - Set the resulting data to the node data (build something like computed data, where output pin can take only part of data too.)
    - Go to next node connected to the output.
        - For multiple nodes as output, proceed parallely.
        - Start recursive executions for each branch.
    - In each case, set current to the next node, call executeRecursive() with the new current
*/

var globalElements = {};

var ExecutorNode =
/** @class */
function () {
  function ExecutorNode(node) {
    this.node = node;
    this.subscribers = [];
    this.isWaiting = false;
    this.data = null;
  }

  ExecutorNode.prototype.getNode = function () {
    return this.node;
  };

  ExecutorNode.prototype.getData = function (outPinName) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.data !== null) {
        return resolve(_this.data[outPinName]);
      } else if (_this.isWaiting) {
        var timedOut_1 = false;
        var timeout_1 = setTimeout(function () {
          timedOut_1 = true;
          reject({
            code: 500,
            message: "Input node execution timed out."
          });
        }, 20000);

        _this.subscribers.push(function () {
          if (!timedOut_1) {
            clearTimeout(timeout_1);
            resolve(_this.data[outPinName]);
          }
        });
      } else {
        _this.isWaiting = true;
        reject({
          code: 400,
          message: "Input node needs to be executed."
        });
      }
    });
  };

  ExecutorNode.prototype.execute = function (scopeData) {
    var _this = this;

    var processor = globalElements[this.node.type].processor;
    return new Promise(function (res, rej) {
      return __awaiter(_this, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, 3, 4]);

              ctx.postMessage({
                type: "update_node",
                node: this.node.id,
                update: {
                  status: 1
                }
              });
              return [4
              /*yield*/
              , eval("(" + processor + ")({ ...scopeData, ctx, node: this.node })")];

            case 1:
              data = _a.sent();
              this.data = data;
              this.subscribers.forEach(function (s) {
                return s();
              });
              ctx.postMessage({
                type: "update_node",
                node: this.node.id,
                update: {
                  status: 2
                }
              });
              res(data);
              return [3
              /*break*/
              , 4];

            case 2:
              e_1 = _a.sent();

              if (e_1 instanceof Error) {
                rej("Error executing node - " + globalElements[this.node.type].type + " (" + this.node.id + "). Message: " + e_1.message);
                ctx.postMessage({
                  type: "update_node",
                  node: this.node.id,
                  update: {
                    status: 3
                  }
                });
              }

              return [3
              /*break*/
              , 4];

            case 3:
              this.isWaiting = false;
              return [7
              /*endfinally*/
              ];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    });
  };

  return ExecutorNode;
}();

var execute = function (nodes, inputPins, outputPins, elements) {
  globalElements = elements;
  var nodeMap = {};
  nodes.forEach(function (node) {
    ctx.postMessage({
      type: "update_node",
      node: node.id,
      update: {
        status: 0
      }
    });
    nodeMap[node.id] = new ExecutorNode(node);
  });

  var executeRecursive = function (current) {
    return __awaiter(void 0, void 0, void 0, function () {
      var currentNode, inputs, inputPromises;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            currentNode = nodeMap[current];
            inputs = currentNode.getNode().inputs;
            inputPromises = [];
            (_a = inputs) === null || _a === void 0 ? void 0 : _a.forEach(function (input) {
              var inputPin = inputPins[input];

              if (inputPin.ref) {
                var inputRefPin_1 = outputPins[inputPin.ref];
                var inputNode_1 = nodeMap[inputRefPin_1.node];
                inputPromises.push(new Promise(function (res, rej) {
                  inputNode_1.getData(inputRefPin_1.name).then(function (data) {
                    res({
                      data: data,
                      name: inputPin.name
                    });
                  }).catch(function (_a) {
                    var code = _a.code,
                        message = _a.message;
                    return __awaiter(void 0, void 0, void 0, function () {
                      return __generator(this, function (_b) {
                        if (code === 400) {
                          executeRecursive(inputNode_1.node.id);
                        } else {
                          rej(message);
                        }

                        return [2
                        /*return*/
                        ];
                      });
                    });
                  });
                }));
              }
            }); // separate input forEach from logic of moving to next node

            return [4
            /*yield*/
            , Promise.all(inputPromises).then(function (results) {
              var scopeData = {};
              results.forEach(function (res) {
                scopeData[res.name] = res.data;
              });
              currentNode.execute(scopeData).then(function (data) {
                var _a, _b;

                var moveToNextNode = function (out) {
                  var _a;

                  var outPinRefs = outputPins[out].refs;
                  var nextNodes = {};
                  (_a = outPinRefs) === null || _a === void 0 ? void 0 : _a.forEach(function (oRef) {
                    var nextNode = inputPins[oRef].node;

                    if (!nextNodes[nextNode]) {
                      executeRecursive(nextNode);
                      nextNodes[nextNode] = 1;
                    }
                  });
                };

                if (((_a = currentNode.getNode().outputs) === null || _a === void 0 ? void 0 : _a.length) && !["sink", "conditional"].includes(globalElements[currentNode.getNode().type].type) && ((_b = currentNode.getNode().outputs) === null || _b === void 0 ? void 0 : _b.length)) {
                  currentNode.getNode().outputs.forEach(moveToNextNode);
                } else if (globalElements[currentNode.getNode().type].type == "conditional") {
                  var next = "";

                  if (data.true) {
                    next = currentNode.getNode().outputs[0];
                  } else {
                    next = currentNode.getNode().outputs[1];
                  }

                  moveToNextNode(next);
                }
              }).catch(function (e) {
                throw new Error(e);
              });
            }).catch(function (e) {
              console.log(e);
            })];

          case 1:
            // separate input forEach from logic of moving to next node
            _b.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var headNode = findHeadNode(nodes, inputPins, outputPins);
  executeRecursive(headNode);
};

var findHeadNode = function (nodes, inputPins, outputPins) {
  /* Algorithm: Find all nodes which do not have an input pin,
      for all such pins, filter those whose outputs have only self as inputs
  */
  var nodeMap = {};
  nodes.forEach(function (node) {
    nodeMap[node.id] = node;
  });
  var nodesWithoutInputs = nodes.filter(function (node) {
    var _a;

    return !((_a = node.inputs) === null || _a === void 0 ? void 0 : _a.length);
  });
  var headNodes = nodesWithoutInputs.filter(function (node) {
    var pass = true;
    node.outputs.forEach(function (out) {
      var _a;

      if (pass) {
        var outPin = outputPins[out];
        (_a = outPin.refs) === null || _a === void 0 ? void 0 : _a.forEach(function (ref) {
          if (pass) {
            var refInputPin = inputPins[ref];
            var refNode = nodeMap[refInputPin.node];
            var refNodeInputPins = refNode.inputs.map(function (i) {
              return inputPins[i];
            });
            refNodeInputPins.forEach(function (refNodeInputPin) {
              if (pass && refNodeInputPin.ref && refNodeInputPin.ref !== out) {
                pass = false;
              }
            });
          }
        });
      }
    });
    return pass;
  }); // Simply return the first node without any inputs.

  return nodesWithoutInputs[0] ? nodesWithoutInputs[0].id : nodes[0].id;
};

ctx.addEventListener("message", function (e) {
  var data = e.data;
  var action = data.action;

  switch (action) {
    case "execute":
      execute(data.data.nodes, data.data.inputPins, data.data.outputPins, data.data.elements);
      return;

    default:
      return;
  }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50257" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/executor/executor-new.worker.ts"], null)
//# sourceMappingURL=/executor-new.worker.8210bf14.js.map