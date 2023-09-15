import { inject, ref, reactive, computed, defineComponent, provide, h, readonly, isRef, markRaw, createVNode, Fragment, Teleport, isVNode } from 'vue';

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

var TABLE_INJECT_KEY = Symbol("Table");
var Modal_INJECT_KEY = Symbol("Modal");
var USE_MODAL_INJECT_KEY = Symbol("useModal and useDrawer");
var _provideKey = Symbol("Privacy data");

/** 模态框、抽屉内部注入的参数 */
function useInject() {
  return inject(Modal_INJECT_KEY);
}
function useTableInject() {
  return inject(TABLE_INJECT_KEY);
}
/** 模态框、抽屉外层依赖注入 */
function usePopup() {
  var api = inject(USE_MODAL_INJECT_KEY);
  return api;
}
/** 模态框单独使用 */
function useModal() {
  var api = inject(USE_MODAL_INJECT_KEY);
  return api.useModal;
}
/** 抽屉单独使用 */
function useDrawer() {
  var api = inject(USE_MODAL_INJECT_KEY);
  return api.useDrawer;
}
function useTryCatch(requestApi) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return __awaiter(this, void 0, void 0, function () {
    var res, isError, isFinally;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          isError = false, isFinally = false;
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, 4, 5]);
          return [4 /*yield*/, requestApi.apply(requestApi, args)];
        case 2:
          res = _a.sent();
          return [3 /*break*/, 5];
        case 3:
          _a.sent();
          isError = true;
          return [3 /*break*/, 5];
        case 4:
          isFinally = true;
          return [7 /*endfinally*/];
        case 5:
          return [2 /*return*/, [res, isError, isFinally]];
      }
    });
  });
}

/** 收集插槽 */
function collectSlots(columns, slot) {
  var slots = {};
  if (!columns || !columns.length) return;
  var _loop_1 = function _loop_1(item) {
    if (item["slot"]) {
      //@ts-ignore
      slots[item.slot] = function (data) {
        return slot[item["slot"]](data && data.data || {});
      };
    }
  };
  for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
    var item = columns_1[_i];
    _loop_1(item);
  }
  return slots;
}
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
  tableAttrs) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    _indexName = ((_c = (_b = params === null || params === void 0 ? void 0 : params.req) === null || _b === void 0 ? void 0 : _b.reName) === null || _c === void 0 ? void 0 : _c.index) || _indexName;
    _sizeName = ((_e = (_d = params === null || params === void 0 ? void 0 : params.req) === null || _d === void 0 ? void 0 : _d.reName) === null || _e === void 0 ? void 0 : _e.size) || _sizeName;
    _listName = ((_g = (_f = params === null || params === void 0 ? void 0 : params.res) === null || _f === void 0 ? void 0 : _f.reName) === null || _g === void 0 ? void 0 : _g.list) || _listName;
    _listTotal = ((_j = (_h = params === null || params === void 0 ? void 0 : params.res) === null || _h === void 0 ? void 0 : _h.reName) === null || _j === void 0 ? void 0 : _j.list) || _listTotal;
    var loading = ref(false);
    var tableData = ref([]);
    var pageInfo = reactive((_a = {}, _a[_indexName] = 1, _a[_sizeName] = 10, _a.total = 0, _a));
    var columns = computed(function () {
      return params.columns.filter(function (v) {
        if (v.hideInTable instanceof Function) {
          return !v.hideInTable();
        }
        return !v.hideInTable;
      });
    });
    var searchInfo = {};
    var pageChangeEvnet;
    /** 获取表格数据 */
    function getTalbeData() {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function () {
        var _c, res, err;
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              if (!(params === null || params === void 0 ? void 0 : params.requestApi)) {
                tableData.value = (params === null || params === void 0 ? void 0 : params.dataSource) || [];
                pageInfo.total = ((_a = params.dataSource) === null || _a === void 0 ? void 0 : _a.length) || 0;
                return [2 /*return*/];
              }

              loading.value = true;
              return [4 /*yield*/, useTryCatch(params === null || params === void 0 ? void 0 : params.requestApi, __assign(__assign(__assign({}, pageInfo), ((_b = params === null || params === void 0 ? void 0 : params.req) === null || _b === void 0 ? void 0 : _b.params) || {}), searchInfo))];
            case 1:
              _c = _d.sent(), res = _c[0], err = _c[1];
              loading.value = false;
              if (err || !res.success) return [2 /*return*/];
              if (params.onLoad) {
                params.onLoad(res.data);
              }
              /** 列表模式 */
              if (tableAttrs && (tableAttrs === null || tableAttrs === void 0 ? void 0 : tableAttrs.listMode)) {
                pageInfo.total = res.data.length;
                tableData.value = res.data;
                tableAttrs.pagination = false;
              } else {
                /** 表格模式 */
                pageInfo.total = eval("res.data.".concat(_listTotal));
                tableData.value = eval("res.data.".concat(_listName));
              }
              return [2 /*return*/];
          }
        });
      });
    }

    if (!params.req || !params.req.lazyLoad) {
      getTalbeData();
    }
    /** 页数改变事件 */
    function handlePageChange(currentPage) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          pageInfo[_indexName] = currentPage;
          if (pageChangeEvnet) {
            pageChangeEvnet();
          }
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
          if (pageChangeEvnet) {
            pageChangeEvnet();
          }
          getTalbeData();
          return [2 /*return*/];
        });
      });
    }
    /** 抛出页数变化事件 */
    function onPageChange(fn) {
      pageChangeEvnet = fn;
    }
    /** 搜索 */
    function search(data) {
      searchInfo = __assign(__assign({}, searchInfo), data);
      pageInfo[_indexName] = 1;
      pageInfo.total = 0;
      getTalbeData();
    }
    /** 重置 */
    function reload(data) {
      if (data === void 0) {
        data = {};
      }
      pageInfo[_indexName] = 1;
      pageInfo.total = 0;
      searchInfo = data;
      getTalbeData();
    }
    /** 刷新 */
    function refresh() {
      getTalbeData();
    }
    // 设置异步dataSource
    function setDataSource(data) {
      tableData.value = data;
    }
    /** 操作按钮时间 */
    function handleActionButtonClick(item) {
      item.onClick(getTalbeData);
    }
    function getDataSource() {
      return readonly(tableData.value);
    }
    var UseTableComponent = defineComponent({
      setup: function setup(
      //@ts-ignore
      props, _a) {
        var slots = _a.slots,
          attrs = _a.attrs;
        /** 注入params */
        provide(TABLE_INJECT_KEY, {
          loading: loading,
          columns: columns,
          tableData: tableData,
          pageInfo: pageInfo,
          handlePageChange: handlePageChange,
          handleSizeChange: handleSizeChange,
          handleActionButtonClick: handleActionButtonClick,
          attrs: __assign(__assign({}, attrs || {}), tableAttrs || {})
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
      STComponent: UseTableComponent,
      search: search,
      reload: reload,
      refresh: refresh,
      getDataSource: getDataSource,
      setDataSource: setDataSource,
      onPageChange: onPageChange
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
    var pageInfo = (_a = {}, _a[_indexName] = 0, _a[_sizeName] = 10, _a.total = 0, _a);
    var searchInfo = ref({});
    function getDataSource() {
      return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!params.requestApi) {
                if (params.dataSource) {
                  if (isRef(params.dataSource)) {
                    dataSource.value = params.dataSource.value;
                  } else {
                    dataSource.value = __spreadArray([], params.dataSource, true);
                  }
                }
                finished.value = true;
                loading.value = false;
                return [2 /*return*/];
              }

              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              // loading.value = true;
              pageInfo[_indexName]++;
              return [4 /*yield*/, params.requestApi(__assign(__assign({}, params.params), searchInfo.value), pageInfo[_indexName], pageInfo[_sizeName])];
            case 2:
              res = _a.sent();
              if (!res.success) {
                finished.value = true;
                loading.value = false;
                return [2 /*return*/];
              }

              dataSource.value = __spreadArray(__spreadArray([], dataSource.value, true), res.data instanceof Array ? res.data : eval("res.data.".concat(_listName)), true);
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
        provide(TABLE_INJECT_KEY, {
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

// import { _provideKey, _token } from "../utils";
var useProvideModalComponent = markRaw(defineComponent({
  props: ["args", "content", "uniqueId", "template", "close"],
  setup: function setup(props) {
    var visible = ref(false);
    // 用定时器防止没有加载动画
    var visibleTimer = setTimeout(function () {
      visible.value = true;
      clearTimeout(visibleTimer);
    }, 50);
    var arguements = props.args || {};
    var popupComponentList = inject(_provideKey).popupComponentList;
    var loading = ref(false);
    /** 本地报错onOK中的事件并且下发的onOK事件， responseFn不存在时不能触发，存在时会触发函数 */
    var responseFn;
    function onOk(fn) {
      if (fn === void 0) {
        fn = undefined;
      }
      if (!responseFn) {
        if (fn && fn instanceof Function) {
          responseFn = fn;
          return;
        }
      } else {
        responseFn();
      }
    }
    function setLoading(isLoading) {
      loading.value = isLoading;
    }
    function close(data) {
      if (data === void 0) {
        data = false;
      }
      visible.value = false;
      props.close(data);
      var timer = setTimeout(function () {
        var index = popupComponentList.value.findIndex(function (v) {
          return v.id === props.uniqueId;
        });
        if (index > -1) {
          popupComponentList.value.splice(index, 1);
        }
        clearTimeout(timer);
      }, 300);
    }
    provide(Modal_INJECT_KEY, {
      visible: visible,
      close: close,
      content: props.content,
      args: arguements,
      loading: readonly(loading),
      onOk: onOk,
      setLoading: setLoading
    });
    return function () {
      return h(props.template);
    };
  }
}));

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s);
}
function createId() {
  return "".concat(new Date().getTime());
}
var customPopupProvide = defineComponent({
  name: "CustomPopupProvide",
  // props: notificationProviderProps,
  props: {
    modalTemplate: null,
    drawerTemplate: null
  },
  setup: function setup(props) {
    // const { mergedClsPrefixRef } = useConfig(props);
    var popupList = ref([]);
    function useModal(content, args) {
      if (args === void 0) {
        args = "asdafasfasfalkdaskld";
      }
      return new Promise(function (resolve) {
        var id = createId();
        var ModalComponent = markRaw(useProvideModalComponent);
        popupList.value.push({
          id: id,
          vnode: ModalComponent,
          content: markRaw(content),
          args: args,
          close: resolve,
          template: markRaw(props.modalTemplate)
        });
      });
    }
    function useDrawer(content, args) {
      return new Promise(function (resolve) {
        var id = createId();
        var ModalComponent = markRaw(useProvideModalComponent);
        popupList.value.push({
          id: id,
          vnode: ModalComponent,
          content: markRaw(content),
          args: args,
          close: resolve,
          template: markRaw(props.drawerTemplate)
        });
      });
    }
    var api = {
      useModal: useModal,
      useDrawer: useDrawer
    };
    provide(USE_MODAL_INJECT_KEY, api);
    provide(_provideKey, {
      popupComponentList: popupList
    });
    // provide(USE_MODAL_INJECT_KEY, {
    //   props,
    //   wipTransitionCountRef
    // });
    // deprecated
    // function open(options: NotificationOptions): NotificationReactive {
    //   return create(options);
    // }
    // function destroyAll(): void {
    //   Object.values(notificationListRef.value).forEach(notification => {
    //     notification.hide();
    //   });
    // }
    return Object.assign({
      popupList: popupList
      // handleAfterLeave
    }, api);
  },
  render: function render() {
    var _slot;
    var _a, _b;
    return createVNode(Fragment, null, [(_b = (_a = this.$slots)["default"]) === null || _b === void 0 ? void 0 : _b.call(_a), this.popupList.length ? createVNode(Teleport, {
      "to": "body"
    }, _isSlot(_slot = this.popupList.map(function (vn) {
      return createVNode(vn.vnode, {
        "content": vn.content,
        "uniqueId": vn.id,
        "args": vn.args,
        "close": vn.close,
        "template": vn.template
      }, null);
    })) ? _slot : {
      "default": function _default() {
        return [_slot];
      }
    }) : null]);
  }
});

export { customPopupProvide as CustomPopupProvide, createUseList, createUseTable, useDrawer, useInject, useModal, usePopup, useTableInject, useTryCatch };
