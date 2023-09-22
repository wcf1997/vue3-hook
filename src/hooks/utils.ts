import { Component, inject } from "vue";
import { ICommonColumnProp, IParamsInject } from "./use-table/types";
import { IModalInject, NotificationApiInjection } from "./use-modal/types";
import { Modal_INJECT_KEY, TABLE_INJECT_KEY, USE_MODAL_INJECT_KEY } from "./symbols";

/** 模态框、抽屉内部注入的参数 */
export function useInject<T = IModalInject>() {
  return inject(Modal_INJECT_KEY) as T;
}

export function useTableInject<ColumnProps = any>() {
  return inject(TABLE_INJECT_KEY) as IParamsInject<
    any,
    (Partial<ColumnProps> & ICommonColumnProp)[]
  >;
}
/** 模态框、抽屉外层依赖注入 */
export function usePopup(): NotificationApiInjection {
  const api = inject(USE_MODAL_INJECT_KEY) as NotificationApiInjection;
  if (api === null) {
    new Error("need use in setup.");
  }
  return api;
}
/** 模态框单独使用 */
export function useModal(): (content: Component, args: any) => Promise<any> {
  const api = inject(USE_MODAL_INJECT_KEY) as NotificationApiInjection;
  if (api === null) {
    new Error("need use in setup.");
  }
  return api.useModal;
}
/** 抽屉单独使用 */
export function useDrawer(): (content: Component, args: any) => Promise<any> {
  const api = inject(USE_MODAL_INJECT_KEY) as NotificationApiInjection;
  if (api === null) {
    new Error("need use in setup.");
  }
  return api.useDrawer;
}
export async function useTryCatch<T = any>(
  requestApi: any,
  ...args: any[]
): Promise<[{ data: T; success: boolean }, boolean, boolean]> {
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
