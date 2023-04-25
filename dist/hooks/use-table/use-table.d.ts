import { Component } from "vue";
import { IReq, IRes } from "../types";
import { IColumns } from "./types";
interface IUseTableParams<T = any> {
    requestApi?: (...args: any) => Promise<any>;
    dataSource?: T[];
    columns: Omit<IColumns, "actions">[];
    hidePaginator?: boolean;
}
interface IUserTableReturn<T = any> {
    UseTableComponent: Component;
    search: (...args: any) => any;
    reload: (...args: any) => any;
    dataSource: T[];
}
interface IExt {
    [propName: string]: any;
}
interface IUseTableOption extends IReq, IRes {
    component: any;
}
export declare function createUseTable(globalOptions: IUseTableOption): <T = any>(params: IUseTableParams<T>, options?: Omit<IUseTableOption, "component"> & IExt) => IUserTableReturn<T>;
export {};
