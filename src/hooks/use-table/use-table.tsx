import {
  computed,
  defineComponent,
  provide,
  reactive,
  Ref,
  ref,
  h,
  readonly,
  InjectionKey,
  ComputedRef
} from "vue";

import { useTryCatch } from "../utils";
import {
  IUseTableOption,
  IUserTableReturn,
  IUseTableParams,
  IColumns,
  IParamsInject,
  ICommonColumnProp
} from "./types";
import { TABLE_INJECT_KEY } from "../symbols";

/** 收集插槽 */
function collectSlots<T = any>(
  columns: Omit<IColumns, "actions">[],
  slot: any
) {
  const slots: any = {};
  if (!columns || !columns.length) return;
  for (const item of columns) {
    if (item["slot"]) {
      //@ts-ignore
      slots[item.slot] = (data: { index: number; text: string; data: T }) =>
        slot[item["slot"]]((data && data.data) || {});
    }
  }

  return slots;
}

export function createUseTable<ColumnProps = any, TableProps = any>(
  globalOptions: IUseTableOption
) {
  if (!globalOptions.component) {
    throw new Error("请配置表格组件模板");
  }
  let indexName = globalOptions.req?.reName?.index || "index";
  let sizeName = globalOptions.req?.reName?.size || "size";
  let listName = globalOptions.res?.reName?.list || "data";
  let listTotal = globalOptions.res?.reName?.total || "total";
  return function useTable<T = any>(
    params: IUseTableParams<T, ICommonColumnProp & Partial<ColumnProps>>,
    /** 表格属性 */
    tableAttrs?: Partial<TableProps> & {
      /** 是否使用列表模式 */
      listMode?: boolean;
      /** 分页器 */
      pagination?: boolean;
    }
  ): IUserTableReturn<T> {
    let _indexName = params?.req?.reName?.index || indexName;
    let _sizeName = params?.req?.reName?.size || sizeName;
    let _listName = params?.res?.reName?.list || listName;
    let _listTotal = params?.res?.reName?.list || listTotal;
    const loading = ref(false);
    const tableData = ref<T[]>([]) as Ref<T[]>;
    const pageInfo = reactive({
      [_indexName]: 1,
      [_sizeName]: 10,
      total: 0
    });
    const columns = computed(() => {
      return params.columns.filter(v => {
        if (v.hideInTable instanceof Function) {
          return !v.hideInTable();
        }
        return !v.hideInTable;
      });
    });
    let searchInfo = {};
    let pageChangeEvnet: () => any;

    /** 获取表格数据 */
    async function getTalbeData() {
      if (!params?.requestApi) {
        tableData.value = params?.dataSource || [];
        pageInfo.total = params.dataSource?.length || 0;
        return;
      }
      loading.value = true;
      const [res, err] = await useTryCatch(params?.requestApi, {
        ...pageInfo,
        ...(params?.req?.params || {}),
        ...searchInfo
      });
      loading.value = false;
      if (err || !res.success) return;
      if (params.onLoad) {
        params.onLoad(res.data);
      }
      /** 列表模式 */
      if (tableAttrs && tableAttrs?.listMode) {
        pageInfo.total = res.data.length;
        tableData.value = res.data;
        tableAttrs.pagination = false;
      } else {
        /** 表格模式 */
        pageInfo.total = eval(`res.data.${_listTotal}`);
        tableData.value = eval(`res.data.${_listName}`);
      }
    }
    if (!params.req || !params.req.lazyLoad) {
      getTalbeData();
    }

    /** 页数改变事件 */
    async function handlePageChange(currentPage: number) {
      pageInfo[_indexName] = currentPage;
      if (pageChangeEvnet) {
        pageChangeEvnet();
      }
      getTalbeData();
    }
    /** 每页条数改变事件 */
    async function handleSizeChange(size: number) {
      pageInfo[_sizeName] = size;
      if (pageChangeEvnet) {
        pageChangeEvnet();
      }
      getTalbeData();
    }
    /** 抛出页数变化事件 */
    function onPageChange(fn: () => any) {
      pageChangeEvnet = fn;
    }
    /** 搜索 */
    function search(data: any) {
      searchInfo = { ...searchInfo, ...data };
      pageInfo[_indexName] = 1;
      pageInfo.total = 0;
      getTalbeData();
    }
    /** 重置 */
    function reload(data: any = {}) {
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
    function setDataSource(data: any[]) {
      tableData.value = data;
    }

    /** 操作按钮时间 */
    function handleActionButtonClick(item: any) {
      item.onClick(getTalbeData);
    }
    function getDataSource() {
      return readonly(tableData.value) as any[];
    }

    const UseTableComponent = defineComponent({
      setup(
        //@ts-ignore
        props,
        { slots, attrs }
      ) {
        /** 注入params */
        provide(
          TABLE_INJECT_KEY as InjectionKey<
            IParamsInject<
              T,
              ComputedRef<(Partial<ColumnProps> & ICommonColumnProp)[]>
            >
          >,
          {
            loading,
            columns,
            tableData,
            pageInfo,
            handlePageChange,
            handleSizeChange,
            handleActionButtonClick,
            attrs: { ...(attrs || {}), ...(tableAttrs || {}) }
          }
        );
        const _collectSlots = collectSlots(params.columns, slots);
        // jsx实现
        // return () => <globalOptions.component>{_collectSlots}</globalOptions.component>
        // h实现
        return () => h(globalOptions.component, null, _collectSlots);
      }
    });

    return {
      STComponent: UseTableComponent,
      search,
      reload,
      refresh,
      getDataSource,
      setDataSource,
      onPageChange
    };
  };
}
