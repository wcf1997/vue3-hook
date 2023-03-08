
import { inject } from "vue";
import { IParamsInject } from "./use-table/types";

export const _token = Symbol('provide token')

export function useInject<T = IParamsInject>(){
  return inject(_token) as T;
}