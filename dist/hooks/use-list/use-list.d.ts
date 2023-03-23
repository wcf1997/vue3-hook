import { Component, Ref } from "vue";
import { IReq, IRes } from "../types";
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
export declare function createUseList(globalOptions: IUseListOption): <T = any>(params: IUseList<T>, options?: IUseListOption) => IUseListReturn<T>;
export {};
