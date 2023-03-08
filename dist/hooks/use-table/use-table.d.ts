import { VNode } from "vue";
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
export declare function createUseTable(globalOptions: IUseTableOption): <T = any>(params: IUseTableParams<T>, props?: any, options?: Omit<IUseTableOption, 'component'>) => IUserTableReturn<T>;
export {};
