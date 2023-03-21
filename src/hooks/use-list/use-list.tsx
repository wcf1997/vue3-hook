import {
  Component,
  defineComponent,
  h,
  provide,
  reactive,
  Ref,
  ref,
  Slot,
  unref,
  VNode
} from "vue";
import { IReq, IRes } from "../types";
import { IColumns } from "../use-table/types";
import { _token } from "../utils";

interface IUseList<T = any> {
  requestApi?: (...args: any) => Promise<any>;
  dataSource?: T[];
  params?: any;
}
interface IUseListOption extends IReq, IRes {
  component?: any;
}
interface IUseListReturn<T = any> {
  dataSource: T[];
  UseListComponent:Component;
  reset: (...args: any) => void;
  search: (...args: any) => void;
}

export function createUseList(globalOptions: IUseListOption) {
  let _indexName = globalOptions.req?.reName?.index || "index";
  let _sizeName = globalOptions.req?.reName?.size || "size";
  let _listName = globalOptions.res?.reName?.list || "data";
  let _listTotal = globalOptions.res?.reName?.total || "total";
  return function useList<T = any>(
    params: IUseList<T>,
    options?: IUseListOption
  ): IUseListReturn<T> {
    _indexName = options?.req?.reName?.index || _indexName;
    _sizeName = options?.req?.reName?.size || _sizeName;
    _listName = options?.res?.reName?.list || _listName;
    _listTotal = options?.res?.reName?.list || _listTotal;
    const finished = ref(false);
    const loading = ref(false);
    const listData = ref<T[]>([]) as Ref<T[]>;
    const pageInfo = reactive({
      [_indexName]: 0,
      [_sizeName]: 10,
      total: 0
    });
    const searchInfo = ref({});

    async function getListData(): Promise<any> {
      if (!params.requestApi) return (finished.value = true);
      // 异步更新数据
      try {
        // loading.value = true;
        pageInfo[_indexName]++;

        let res = await params.requestApi(
          { ...params.params, ...searchInfo },
          pageInfo[_indexName],
          pageInfo[_sizeName]
        );
        if (!res.success) {
          finished.value = true;
          loading.value = false;
          return;
        }

        listData.value = [...listData.value, ...eval(`res.data.${_listName}`)];
        pageInfo.total = eval(`res.data.${_listTotal}`) || 0;

        // total.value =
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (listData.value.length >= pageInfo.total) {
          finished.value = true;
        }
      } catch (error) {
        finished.value = true;
      } finally {
        loading.value = false;
      }
    }

    function reset() {
      pageInfo[_indexName] = 1;
      pageInfo[_listTotal] = 0;
      searchInfo.value = {};
      getListData();
    }
    function search(data: any) {
      searchInfo.value = { ...searchInfo, ...data };
      pageInfo[_indexName] = 1;
      getListData();
    }

    const UseListComponent = defineComponent({
      setup() {
        if (params.dataSource && params.dataSource.length) {
          listData.value = params.dataSource;
          finished.value = true;
          loading.value = false;
          return;
        }
        provide(_token, {
          getListData,
          loading,
          finished,
          dataSource: listData
        });

        return () => (
          <globalOptions.component>
            {({ data }: { data: T }) => (
              //@ts-ignore
                 slots.default(data)
            )}
          </globalOptions.component>
        );
      }
    });


    return {
      dataSource: unref(listData),
      UseListComponent,
      reset,
      search
    };
  };
}
