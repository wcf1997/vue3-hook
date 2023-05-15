
import { inject } from "vue";
import { IParamsInject } from "./use-table/types";

export const _token = Symbol('provide token')

export function useInject<T = IParamsInject>(){
  return inject(_token) as T;
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
