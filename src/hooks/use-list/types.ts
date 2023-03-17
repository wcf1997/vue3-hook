import { Ref } from "vue";

export interface IUseListInject<T =any> {
  getListData: (...args: any) => Promise<any>;
  loading: boolean;
  finished: boolean;
  dataSource: Ref<T[]>;
}