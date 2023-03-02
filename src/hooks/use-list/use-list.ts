import { h, provide, reactive, Ref, ref,  } from "vue";
import { IReq, IRes } from "../types";

interface IUseList<T = any> {
  requestApi: (...args: any) => Promise<any>;
  dataSource: T[];
  params: any;
}
let uid = 0;
interface IUseListOption extends IReq, IRes {
  component: any;
}
export function createUseList(globalOptions: IUseListOption) {
  let _indexName = globalOptions.req?.reName?.index || "index";
  let _sizeName = globalOptions.req?.reName?.size || "size";
  let _listName = globalOptions.res?.reName?.list || "data";
  let _listTotal = globalOptions.res?.reName?.total || "total";
  return function useList<T = any>(
    params: IUseList<T>,
    props?: any,
    options?: IUseListOption
  ) {
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

    async function getListData():Promise<any> {
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

    const provideKey = "list_uid_" + uid;
    provide(provideKey, {
      getListData,
      loading,
      finished
    });
    uid++;
    const UseListVnode = h(options?.component || globalOptions.component, {
      ...props,
      provideKey
    });

    const useList = () => UseListVnode;
    return {
      dataSource: listData,
      useList
    };
  };
}
