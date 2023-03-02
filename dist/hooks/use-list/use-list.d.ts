import { Ref } from "vue";
import { IReq, IRes } from "../types";
interface IUseList<T = any> {
    requestApi: (...args: any) => Promise<any>;
    dataSource: T[];
    params: any;
}
interface IUseListOption extends IReq, IRes {
    component: any;
}
export declare function createUseList(globalOptions: IUseListOption): <T = any>(params: IUseList<T>, props?: any, options?: IUseListOption) => {
    dataSource: Ref<T[]>;
    useList: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
export {};
