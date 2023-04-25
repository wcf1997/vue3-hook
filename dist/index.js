import { inject, ref, reactive, computed, defineComponent, provide, h, unref, render, Teleport, isRef } from 'vue';

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
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var _token = Symbol('provide token');
function useInject() {
  return inject(_token);
}

/** 收集插槽 */
function collectSlots(columns, slot) {
  var slots = {};
  if (!columns || !columns.length) return;
  var _loop_1 = function _loop_1(item) {
    if (item["slot"]) {
      //@ts-ignore
      slots[item.slot] = function (data) {
        return slot[item.slot](data.data);
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
    var loading = ref(false);
    var tableData = ref([]);
    var pageInfo = reactive((_a = {}, _a[_indexName] = 1, _a[_sizeName] = 10, _a.total = 0, _a));
    var searchInfo = reactive({});
    /** 获取表格数据 */
    function getTalbeData() {
      var _a;
      return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_b) {
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
              return [4 /*yield*/, params === null || params === void 0 ? void 0 : params.requestApi(__assign(__assign({}, pageInfo), searchInfo))];
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
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          pageInfo[_indexName] = currentPage;
          getTalbeData();
          return [2 /*return*/];
        });
      });
    }
    /** 每页条数改变事件 */
    function handleSizeChange(size) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          pageInfo[_sizeName] = size;
          getTalbeData();
          return [2 /*return*/];
        });
      });
    }
    // 搜索
    function search(data) {
      searchInfo = __assign({}, data);
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
    var columns = computed(function () {
      return params.columns.filter(function (v) {
        return !v.hideInTable && v.type !== "action";
      });
    });
    var actions = (_k = params.columns.find(function (v) {
      return v.type === "action";
    })) === null || _k === void 0 ? void 0 : _k["actions"];
    var UseTableComponent = defineComponent({
      setup: function setup(props, _a) {
        var slots = _a.slots;
        /** 注入params */
        provide(_token, {
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
        // jsx实现
        // return () => <globalOptions.component>{_collectSlots}</globalOptions.component>
        // h实现
        return function () {
          return h(globalOptions.component, null, _collectSlots);
        };
      }
    });
    return {
      UseTableComponent: UseTableComponent,
      search: search,
      reload: reload,
      dataSource: unref(tableData)
    };
  };
}

function createUseModal(template) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useModal(content, args) {
    return new Promise(function (resolve) {
      var visible = ref(false);
      var ModalVnode = defineComponent({
        setup: function setup() {
          provide(_token, {
            visible: visible,
            close: close,
            content: content,
            args: args
          });
          return function () {
            return h(template);
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
        render(h(ModalVnode), divWrap);
        visible.value = true;
        clearTimeout(timer);
      });
    });
  };
}
function createModalComponent(template) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useDialog(content, args) {
    var visible = ref(false);
    var closeResolve = null;
    function close(data) {
      visible.value = false;
      closeResolve(data);
    }
    var DialogVnode = defineComponent({
      setup: function setup() {
        provide(_token, {
          visible: visible,
          close: close,
          content: content,
          args: args
        });
        return function () {
          return h(template);
        };
      }
    });
    var UseDialogComponent = function UseDialogComponent() {
      return h(Teleport, {
        to: "body"
      }, h(DialogVnode));
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
    var finished = ref(false);
    var loading = ref(false);
    var dataSource = ref([]);
    var pageInfo = reactive((_a = {}, _a[_indexName] = 0, _a[_sizeName] = 10, _a.total = 0, _a));
    var searchInfo = ref({});
    function getDataSource() {
      return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!params.requestApi) return [2 /*return*/, finished.value = true];
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              // loading.value = true;
              pageInfo[_indexName]++;
              return [4 /*yield*/, params.requestApi(__assign(__assign({}, params.params), searchInfo), pageInfo[_indexName], pageInfo[_sizeName])];
            case 2:
              res = _a.sent();
              if (!res.success) {
                finished.value = true;
                loading.value = false;
                return [2 /*return*/];
              }

              dataSource.value = __spreadArray(__spreadArray([], dataSource.value, true), eval("res.data.".concat(_listName)), true);
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
      searchInfo.value = __assign(__assign({}, searchInfo), data);
      pageInfo[_indexName] = 1;
      getDataSource();
    }
    /** 重新设置静态数据 */
    function setDataSource(data) {
      dataSource.value = data;
    }
    var UseListComponent = defineComponent({
      //@ts-ignore
      setup: function setup(props, _a) {
        var slots = _a.slots;
        if (params.dataSource) {
          if (isRef(params.dataSource)) {
            dataSource.value = params.dataSource.value;
          } else {
            dataSource.value = __spreadArray([], params.dataSource, true);
          }
          finished.value = true;
          loading.value = false;
        }
        provide(_token, {
          getDataSource: getDataSource,
          loading: loading,
          finished: finished,
          dataSource: dataSource
        });
        // jsx实现方式
        // return () => (
        //   <globalOptions.component>
        //     {({ data }: { data: T }) =>
        //       //@ts-ignore
        //       slots.default(data)
        //     }
        //   </globalOptions.component>
        // );
        // h函数实现
        return function () {
          return h(globalOptions.component, null, {
            "default": function _default(data) {
              //@ts-ignore
              return slots["default"](data.data);
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

export { createModalComponent, createUseList, createUseModal, createUseTable, useInject };
