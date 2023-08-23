
import { Component, inject } from "vue";
import { IParamsInject } from "./use-table/types";
import { NotificationApiInjection } from "./use-modal/types";

export const _token = Symbol('provide token')
export const _modalKey = Symbol("modal and drawer");
export const _provideKey = Symbol("Privacy data");

/** 模态框、抽屉内部注入的参数 */
export function useInject<T = IParamsInject>(){
  return inject(_token) as T;
}

/** 模态框、抽屉外层依赖注入 */
export function usePopup(): NotificationApiInjection {
  const api = inject(_modalKey) as NotificationApiInjection;
  if (api === null) {
    new Error("use modal not  found.");
  }
  return api;
}
/** 模态框单独使用 */
export function useModal(): (content: Component, args: any) => Promise<any> {
  const api = inject(_modalKey) as NotificationApiInjection;
  if (api === null) {
    new Error("use modal not  found.");
  }
  return api.useModal;
}
/** 抽屉单独使用 */
export function useDrawer(): (content: Component, args: any) => Promise<any> {
  const api = inject(_modalKey) as NotificationApiInjection;
  if (api === null) {
    new Error("use modal not  found.");
  }
  return api.useDrawer;
}
export async function useTryCatch<T = any>(
  requestApi: any,
  ...args: any[]
): Promise<[{data:T,success:boolean}, boolean, boolean]> {
  let res,
    isError = false,
    isFinally = false;
  try {
    res = await requestApi.apply(requestApi, args);
  } catch (error) {
    isError = true;
  } finally {
    isFinally = true;
  }
  return [res, isError, isFinally];
}
