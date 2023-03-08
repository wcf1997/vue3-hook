import { Ref } from "vue";
import { IReq, IRes } from "../types";
interface IUseList<T = any> {
    requestApi: (...args: any) => Promise<any>;
    dataSource: T[];
    params: any;
}
interface IUseListOption extends IReq, IRes {
    component?: any;
}
export declare function createUseList(globalOptions: IUseListOption): <T = any>(params: IUseList<T>, options?: Omit<IUseListOption, "component">) => {
    dataSource: Ref<T[]>;
    UseList: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    reset: () => void;
    search: (data: any) => void;
};
export {};
