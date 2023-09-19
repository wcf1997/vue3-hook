import { Component } from "vue";
import { ICommonColumnProp, IParamsInject } from "./use-table/types";
import { IModalInject, NotificationApiInjection } from "./use-modal/types";
/** 模态框、抽屉内部注入的参数 */
export declare function useInject<T = IModalInject>(): T;
export declare function useTableInject<ColumnProps = any>(): IParamsInject<any, (Partial<ColumnProps> & ICommonColumnProp)[]>;
/** 模态框、抽屉外层依赖注入 */
export declare function usePopup(): NotificationApiInjection;
/** 模态框单独使用 */
export declare function useModal(): (content: Component, args: any) => Promise<any>;
/** 抽屉单独使用 */
export declare function useDrawer(): (content: Component, args: any) => Promise<any>;
export declare function useTryCatch<T = any>(requestApi: any, ...args: any[]): Promise<[{
    data: T;
    success: boolean;
}, boolean, boolean]>;
