import { computed, h, provide, reactive, Ref, ref, VNode } from "vue";
import { IReq, IRes } from "../types";
import { IColumns } from "./types";

interface IUseTableParams<T = any> {
  requestApi?: (...args: any) => Promise<any>;
  dataSource?: T[];
  columns: Omit<IColumns, "actions">[];
  hidePaginator?: boolean;
  key: string;
}

interface IUserTableReturn<T = any> {
  UseTable: (...args: any) => VNode;
  search: (...args: any) => any;
  reload: (...args: any) => any;
  dataSource: T[];
}
interface IUseTableOption extends IReq, IRes {
  component: any;
}
let uid = 0;

// // 创建TableVnode
export function createUseTable(globalOptions: IUseTableOption) {
  if (!globalOptions.component) {
    throw new Error("请配置表格组件模板");
  }
  let _indexName = globalOptions.req?.reName?.index || "index";
  let _sizeName = globalOptions.req?.reName?.size || "size";
  let _listName = globalOptions.res?.reName?.list || "data";
  let _listTotal = globalOptions.res?.reName?.total || "total";
  return function useTable<T = any>(
    params: IUseTableParams<T>,
    /** 表格属性 */
    props?: any,
    options?: IUseTableOption
  ): IUserTableReturn<T> {
    _indexName = options?.req?.reName?.index || _indexName;
    _sizeName = options?.req?.reName?.size || _sizeName;
    _listName = options?.res?.reName?.list || _listName;
    _listTotal = options?.res?.reName?.list || _listTotal;
    const loading = ref(false);
    const tableData = ref<T[]>([]) as Ref<T[]>;
    const pageInfo = reactive({
      [_indexName]: 1,
      [_sizeName]: 10,
      total: 0
    });

    let searchInfo = reactive({});

    /** 获取表格数据 */
    async function getTalbeData() {
      if (!params?.requestApi) {
        tableData.value = params?.dataSource || [];
        pageInfo.total = params.dataSource?.length || 0;
        return;
      }
      try {
        const res = await params?.requestApi({ ...pageInfo, ...searchInfo });
        if (!res.success) return;
        pageInfo.total = eval(`res.data.${_listTotal}`);
        tableData.value = eval(`res.data.${_listName}`);
      } catch (error) {
        console.log(error);
      }
    }
    getTalbeData();

    /** 页数改变事件 */
    async function handlePageChange(currentPage: number) {
      pageInfo[_indexName] = currentPage;

      getTalbeData();
    }
    /** 每页条数改变事件 */
    async function handleSizeChange(size: number) {
      pageInfo[_sizeName] = size;
      getTalbeData();
    }
    // 搜索
    function search(data: any) {
      searchInfo = { ...data };
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
    function handleActionButtonClick(item: any) {
      item.onClick(getTalbeData);
    }

    /** 注入params */
    const provideKey = "table_uid_" + uid;
    const columns = computed<Omit<IColumns, "actions">[]>(() =>
      params.columns.filter((v: any) => !v.hideInTable && v.type !== "action")
    );
    const actions = params.columns.find((v: any) => v.type === "action")?.[
      "actions"
    ];
    provide(provideKey, {
      loading,
      columns,
      tableData,
      pageInfo,
      actions,
      attrs:props,
      handlePageChange,
      handleSizeChange,
      handleActionButtonClick
    });
    uid++;
    const UseTableVnode = h(options?.component || globalOptions.component, {
      provideKey
    });

    const UseTable = () => UseTableVnode;
    return {
      UseTable,
      search,
      reload,
      dataSource: tableData.value
    };
  };


}
