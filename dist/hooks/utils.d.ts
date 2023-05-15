import { IParamsInject } from "./use-table/types";
export declare const _token: unique symbol;
export declare function useInject<T = IParamsInject>(): T;
export declare function useTryCatch<T = any>(requestApi: any, ...args: any[]): Promise<[{
    data: T;
    success: boolean;
}, boolean, boolean]>;
