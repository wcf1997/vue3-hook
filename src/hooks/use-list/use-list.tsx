import {
  Component,
  defineComponent,
  isRef,
  provide,
  reactive,
  Ref,
  ref,
  h
} from "vue";
import { IReq, IRes } from "../types";
import { _token } from "../utils";

interface IUseList<T = any> {
  requestApi?: (...args: any) => Promise<any>;
  dataSource?: T[] | Ref<T[]>;
  params?: any;
}
interface IUseListOption extends IReq, IRes {
  component?: any;
}
interface IUseListReturn<T = any> {
  /** 静态数据源 */
  dataSource: Ref<T[]>;
  /** 生成的list组件 */
  UseListComponent: Component;
  /** 重置 */
  reset: (...args: any) => void;
  /** 搜索 */
  search: (...args: any) => void;
  /** 重新设置静态数据 */
  setDataSource: (data: T[]) => void;
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
    const dataSource = ref<T[]>([]) as Ref<T[]>;
    const pageInfo = {
      [_indexName]: 0,
      [_sizeName]: 10,
      total: 0
    };
    const searchInfo = ref({});

    async function getDataSource(): Promise<any> {
      if (!params.requestApi) {
       
        if (params.dataSource) {
          if (isRef(params.dataSource)) {
            dataSource.value = params.dataSource.value;
          } else {
            dataSource.value = [...params.dataSource];
          }
        }
         finished.value = true;
         loading.value = false;
        return;
      }
      // 异步更新数据
      try {
        // loading.value = true;
        pageInfo[_indexName]++;

        let res = await params.requestApi(
          { ...params.params, ...searchInfo.value },
          pageInfo[_indexName],
          pageInfo[_sizeName]
        );
        if (!res.success) {
          finished.value = true;
          loading.value = false;
          return;
        }

        dataSource.value = [
          ...dataSource.value,
          ...(res.data instanceof Array
            ? res.data
            : eval(`res.data.${_listName}`))
        ];
        pageInfo.total = eval(`res.data.${_listTotal}`) || 0;

        // total.value =
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (dataSource.value.length >= pageInfo.total) {
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
      getDataSource();
    }
    function search(data: any) {
      searchInfo.value = { ...searchInfo, ...data };
      pageInfo[_indexName] = 1;
      getDataSource();
    }
    /** 重新设置静态数据 */
    function setDataSource(data: T[]) {
      dataSource.value = data;
    }

    const UseListComponent = defineComponent({
      //@ts-ignore
      setup(props, { slots }) {
        
        provide(_token, {
          getDataSource,
          loading,
          finished,
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
        return () =>
          h(globalOptions.component, null, {
            default: (data: { index: number; text: string; data: T }) =>
              //@ts-ignore
              slots.default(data.data)
          });
      }
    });

    return {
      dataSource,
      UseListComponent,
      reset,
      search,
      setDataSource
    };
  };
}
