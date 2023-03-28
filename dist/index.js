import require$$0$1, { createVNode, isVNode } from 'vue';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var src = {};

var useTable = {};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind,
    key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? {
      get: descriptor.get,
      set: descriptor.set
    } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.push(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.push(_);else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", {
    configurable: true,
    value: prefix ? "".concat(prefix, " ", name) : name
  });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
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
}
function __generator(thisArg, body) {
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}
var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: false
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get __assign () { return __assign; },
	__asyncDelegator: __asyncDelegator,
	__asyncGenerator: __asyncGenerator,
	__asyncValues: __asyncValues,
	__await: __await,
	__awaiter: __awaiter,
	__classPrivateFieldGet: __classPrivateFieldGet,
	__classPrivateFieldIn: __classPrivateFieldIn,
	__classPrivateFieldSet: __classPrivateFieldSet,
	__createBinding: __createBinding,
	__decorate: __decorate,
	__esDecorate: __esDecorate,
	__exportStar: __exportStar,
	__extends: __extends,
	__generator: __generator,
	__importDefault: __importDefault,
	__importStar: __importStar,
	__makeTemplateObject: __makeTemplateObject,
	__metadata: __metadata,
	__param: __param,
	__propKey: __propKey,
	__read: __read,
	__rest: __rest,
	__runInitializers: __runInitializers,
	__setFunctionName: __setFunctionName,
	__spread: __spread,
	__spreadArray: __spreadArray,
	__spreadArrays: __spreadArrays,
	__values: __values
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

var utils = {};

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useInject = exports._token = void 0;
  var vue_1 = require$$0$1;
  exports._token = Symbol('provide token');
  function useInject() {
    return (0, vue_1.inject)(exports._token);
  }
  exports.useInject = useInject;
})(utils);

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}
Object.defineProperty(useTable, "__esModule", {
  value: true
});
useTable.createUseTable = void 0;
var tslib_1$1 = require$$0;
var vue_1$2 = require$$0$1;
var utils_1$2 = utils;
/** 收集插槽 */
function collectSlots(columns, slot) {
  var slots = {};
  if (!columns || !columns.length) return;
  var _loop_1 = function _loop_1(item) {
    if (item["slot"]) {
      //@ts-ignore
      slots[item.slot] = function (data) {
        return slot[item.slot](data);
      };
    }
  };
  for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
    var item = columns_1[_i];
    _loop_1(item);
  }
  return slots;
}
// // 创建TableVnode
function createUseTable(globalOptions) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (!globalOptions.component) {
    throw new Error("请配置表格组件模板");
  }
  var _indexName = ((_b = (_a = globalOptions.req) === null || _a === void 0 ? void 0 : _a.reName) === null || _b === void 0 ? void 0 : _b.index) || "index";
  var _sizeName = ((_d = (_c = globalOptions.req) === null || _c === void 0 ? void 0 : _c.reName) === null || _d === void 0 ? void 0 : _d.size) || "size";
  var _listName = ((_f = (_e = globalOptions.res) === null || _e === void 0 ? void 0 : _e.reName) === null || _f === void 0 ? void 0 : _f.list) || "data";
  var _listTotal = ((_h = (_g = globalOptions.res) === null || _g === void 0 ? void 0 : _g.reName) === null || _h === void 0 ? void 0 : _h.total) || "total";
  return function useTable(params, /** 表格属性 */
  // props?: any,
  options) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    _indexName = ((_c = (_b = options === null || options === void 0 ? void 0 : options.req) === null || _b === void 0 ? void 0 : _b.reName) === null || _c === void 0 ? void 0 : _c.index) || _indexName;
    _sizeName = ((_e = (_d = options === null || options === void 0 ? void 0 : options.req) === null || _d === void 0 ? void 0 : _d.reName) === null || _e === void 0 ? void 0 : _e.size) || _sizeName;
    _listName = ((_g = (_f = options === null || options === void 0 ? void 0 : options.res) === null || _f === void 0 ? void 0 : _f.reName) === null || _g === void 0 ? void 0 : _g.list) || _listName;
    _listTotal = ((_j = (_h = options === null || options === void 0 ? void 0 : options.res) === null || _h === void 0 ? void 0 : _h.reName) === null || _j === void 0 ? void 0 : _j.list) || _listTotal;
    var loading = (0, vue_1$2.ref)(false);
    var tableData = (0, vue_1$2.ref)([]);
    var pageInfo = (0, vue_1$2.reactive)((_a = {}, _a[_indexName] = 1, _a[_sizeName] = 10, _a.total = 0, _a));
    var searchInfo = (0, vue_1$2.reactive)({});
    /** 获取表格数据 */
    function getTalbeData() {
      var _a;
      return tslib_1$1.__awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return tslib_1$1.__generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (!(params === null || params === void 0 ? void 0 : params.requestApi)) {
                tableData.value = (params === null || params === void 0 ? void 0 : params.dataSource) || [];
                pageInfo.total = ((_a = params.dataSource) === null || _a === void 0 ? void 0 : _a.length) || 0;
                return [2 /*return*/];
              }

              _b.label = 1;
            case 1:
              _b.trys.push([1, 3,, 4]);
              return [4 /*yield*/, params === null || params === void 0 ? void 0 : params.requestApi(tslib_1$1.__assign(tslib_1$1.__assign({}, pageInfo), searchInfo))];
            case 2:
              res = _b.sent();
              if (!res.success) return [2 /*return*/];
              pageInfo.total = eval("res.data.".concat(_listTotal));
              tableData.value = eval("res.data.".concat(_listName));
              return [3 /*break*/, 4];
            case 3:
              error_1 = _b.sent();
              console.log(error_1);
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    }

    getTalbeData();
    /** 页数改变事件 */
    function handlePageChange(currentPage) {
      return tslib_1$1.__awaiter(this, void 0, void 0, function () {
        return tslib_1$1.__generator(this, function (_a) {
          pageInfo[_indexName] = currentPage;
          getTalbeData();
          return [2 /*return*/];
        });
      });
    }
    /** 每页条数改变事件 */
    function handleSizeChange(size) {
      return tslib_1$1.__awaiter(this, void 0, void 0, function () {
        return tslib_1$1.__generator(this, function (_a) {
          pageInfo[_sizeName] = size;
          getTalbeData();
          return [2 /*return*/];
        });
      });
    }
    // 搜索
    function search(data) {
      searchInfo = tslib_1$1.__assign({}, data);
      pageInfo[_indexName] = 1;
      getTalbeData();
    }
    // 重制
    function reload() {
      pageInfo[_indexName] = 1;
      searchInfo = {};
      getTalbeData();
    }
    /** 操作按钮时间 */
    function handleActionButtonClick(item) {
      item.onClick(getTalbeData);
    }
    var columns = (0, vue_1$2.computed)(function () {
      return params.columns.filter(function (v) {
        return !v.hideInTable && v.type !== "action";
      });
    });
    var actions = (_k = params.columns.find(function (v) {
      return v.type === "action";
    })) === null || _k === void 0 ? void 0 : _k["actions"];
    var UseTableComponent = (0, vue_1$2.defineComponent)({
      setup: function setup(props, _a) {
        var slots = _a.slots;
        /** 注入params */
        (0, vue_1$2.provide)(utils_1$2._token, {
          loading: loading,
          columns: columns,
          actions: actions,
          tableData: tableData,
          pageInfo: pageInfo,
          handlePageChange: handlePageChange,
          handleSizeChange: handleSizeChange,
          handleActionButtonClick: handleActionButtonClick,
          arrts: props
        });
        var _collectSlots = collectSlots(params.columns, slots);
        return function () {
          return createVNode(globalOptions.component, null, _isSlot(_collectSlots) ? _collectSlots : {
            "default": function _default() {
              return [_collectSlots];
            }
          });
        };
      }
    });
    return {
      UseTableComponent: UseTableComponent,
      search: search,
      reload: reload,
      dataSource: (0, vue_1$2.unref)(tableData)
    };
  };
}
useTable.createUseTable = createUseTable;

var useModal = {};

Object.defineProperty(useModal, "__esModule", {
  value: true
});
useModal.createModalComponent = useModal.createUseModal = void 0;
var vue_1$1 = require$$0$1;
var utils_1$1 = utils;
function createUseModal(template) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useModal(content, args) {
    return new Promise(function (resolve) {
      var visible = (0, vue_1$1.ref)(false);
      var ModalVnode = (0, vue_1$1.defineComponent)({
        setup: function setup() {
          (0, vue_1$1.provide)(utils_1$1._token, {
            visible: visible,
            close: close,
            content: content,
            args: args
          });
          return function () {
            return (0, vue_1$1.h)(template);
          };
        }
      });
      var divWrap = document.createElement("div");
      document.body.appendChild(divWrap);
      function close(data) {
        visible.value = false;
        resolve(data);
        var timer = setTimeout(function () {
          divWrap.remove();
          clearTimeout(timer);
        });
      }
      var timer = setTimeout(function () {
        (0, vue_1$1.render)((0, vue_1$1.h)(ModalVnode), divWrap);
        visible.value = true;
        clearTimeout(timer);
      });
    });
  };
}
useModal.createUseModal = createUseModal;
function createModalComponent(template) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useDialog(content, data) {
    var visible = (0, vue_1$1.ref)(false);
    var closeResolve = null;
    function close(data) {
      visible.value = false;
      closeResolve(data);
    }
    var DialogVnode = (0, vue_1$1.defineComponent)({
      setup: function setup() {
        (0, vue_1$1.provide)(utils_1$1._token, {
          visible: visible,
          close: close,
          content: content,
          data: data
        });
        return function () {
          return (0, vue_1$1.h)(template);
        };
      }
    });
    var UseDialogComponent = function UseDialogComponent() {
      return (0, vue_1$1.h)(vue_1$1.Teleport, {
        to: "body"
      }, (0, vue_1$1.h)(DialogVnode));
    };
    function open() {
      return new Promise(function (resolve) {
        closeResolve = resolve;
        visible.value = true;
      });
    }
    return {
      open: open,
      UseDialogComponent: UseDialogComponent
    };
  };
}
useModal.createModalComponent = createModalComponent;

var useList = {};

Object.defineProperty(useList, "__esModule", {
  value: true
});
useList.createUseList = void 0;
var tslib_1 = require$$0;
var vue_1 = require$$0$1;
var utils_1 = utils;
function createUseList(globalOptions) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  var _indexName = ((_b = (_a = globalOptions.req) === null || _a === void 0 ? void 0 : _a.reName) === null || _b === void 0 ? void 0 : _b.index) || "index";
  var _sizeName = ((_d = (_c = globalOptions.req) === null || _c === void 0 ? void 0 : _c.reName) === null || _d === void 0 ? void 0 : _d.size) || "size";
  var _listName = ((_f = (_e = globalOptions.res) === null || _e === void 0 ? void 0 : _e.reName) === null || _f === void 0 ? void 0 : _f.list) || "data";
  var _listTotal = ((_h = (_g = globalOptions.res) === null || _g === void 0 ? void 0 : _g.reName) === null || _h === void 0 ? void 0 : _h.total) || "total";
  return function useList(params, options) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    _indexName = ((_c = (_b = options === null || options === void 0 ? void 0 : options.req) === null || _b === void 0 ? void 0 : _b.reName) === null || _c === void 0 ? void 0 : _c.index) || _indexName;
    _sizeName = ((_e = (_d = options === null || options === void 0 ? void 0 : options.req) === null || _d === void 0 ? void 0 : _d.reName) === null || _e === void 0 ? void 0 : _e.size) || _sizeName;
    _listName = ((_g = (_f = options === null || options === void 0 ? void 0 : options.res) === null || _f === void 0 ? void 0 : _f.reName) === null || _g === void 0 ? void 0 : _g.list) || _listName;
    _listTotal = ((_j = (_h = options === null || options === void 0 ? void 0 : options.res) === null || _h === void 0 ? void 0 : _h.reName) === null || _j === void 0 ? void 0 : _j.list) || _listTotal;
    var finished = (0, vue_1.ref)(false);
    var loading = (0, vue_1.ref)(false);
    var dataSource = (0, vue_1.ref)([]);
    var pageInfo = (0, vue_1.reactive)((_a = {}, _a[_indexName] = 0, _a[_sizeName] = 10, _a.total = 0, _a));
    var searchInfo = (0, vue_1.ref)({});
    function getDataSource() {
      return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res;
        return tslib_1.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!params.requestApi) return [2 /*return*/, finished.value = true];
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              // loading.value = true;
              pageInfo[_indexName]++;
              return [4 /*yield*/, params.requestApi(tslib_1.__assign(tslib_1.__assign({}, params.params), searchInfo), pageInfo[_indexName], pageInfo[_sizeName])];
            case 2:
              res = _a.sent();
              if (!res.success) {
                finished.value = true;
                loading.value = false;
                return [2 /*return*/];
              }

              dataSource.value = tslib_1.__spreadArray(tslib_1.__spreadArray([], dataSource.value, true), eval("res.data.".concat(_listName)), true);
              pageInfo.total = eval("res.data.".concat(_listTotal)) || 0;
              // total.value =
              // 加载状态结束
              loading.value = false;
              // 数据全部加载完成
              if (dataSource.value.length >= pageInfo.total) {
                finished.value = true;
              }
              return [3 /*break*/, 5];
            case 3:
              _a.sent();
              finished.value = true;
              return [3 /*break*/, 5];
            case 4:
              loading.value = false;
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    }

    function reset() {
      pageInfo[_indexName] = 1;
      pageInfo[_listTotal] = 0;
      searchInfo.value = {};
      getDataSource();
    }
    function search(data) {
      searchInfo.value = tslib_1.__assign(tslib_1.__assign({}, searchInfo), data);
      pageInfo[_indexName] = 1;
      getDataSource();
    }
    /** 重新设置静态数据 */
    function setDataSource(data) {
      dataSource.value = data;
    }
    var UseListComponent = (0, vue_1.defineComponent)({
      setup: function setup() {
        if (params.dataSource) {
          if ((0, vue_1.isRef)(params.dataSource)) {
            dataSource.value = params.dataSource.value;
          } else {
            dataSource.value = tslib_1.__spreadArray([], params.dataSource, true);
          }
          finished.value = true;
          loading.value = false;
        }
        (0, vue_1.provide)(utils_1._token, {
          getDataSource: getDataSource,
          loading: loading,
          finished: finished,
          dataSource: dataSource
        });
        return function () {
          return createVNode(globalOptions.component, null, {
            "default": function _default(_a) {
              var data = _a.data;
              //@ts-ignore
              return slots["default"](data);
            }
          });
        };
      }
    });
    return {
      dataSource: dataSource,
      UseListComponent: UseListComponent,
      reset: reset,
      search: search,
      setDataSource: setDataSource
    };
  };
}
useList.createUseList = createUseList;

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createModalComponent = exports.createUseList = exports.createUseModal = exports.useInject = exports.createUseTable = void 0;
  var use_table_1 = useTable;
  Object.defineProperty(exports, "createUseTable", {
    enumerable: true,
    get: function get() {
      return use_table_1.createUseTable;
    }
  });
  var utils_1 = utils;
  Object.defineProperty(exports, "useInject", {
    enumerable: true,
    get: function get() {
      return utils_1.useInject;
    }
  });
  var use_modal_1 = useModal;
  Object.defineProperty(exports, "createModalComponent", {
    enumerable: true,
    get: function get() {
      return use_modal_1.createModalComponent;
    }
  });
  Object.defineProperty(exports, "createUseModal", {
    enumerable: true,
    get: function get() {
      return use_modal_1.createUseModal;
    }
  });
  var use_list_1 = useList;
  Object.defineProperty(exports, "createUseList", {
    enumerable: true,
    get: function get() {
      return use_list_1.createUseList;
    }
  });
})(src);
var index = /*@__PURE__*/getDefaultExportFromCjs(src);

export { index as default };
