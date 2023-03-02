
import { inject, useAttrs } from "vue";
import { IParamsInject } from "./use-table/types";



export function useInject(){

  const attrs:any = useAttrs()
  return inject(attrs.provideKey as string) as IParamsInject;
}