
import { inject, useAttrs } from "vue";
import { IParamsInject } from "./types";



export function useInject(){

  const attrs = useAttrs()
  return inject(attrs.projectKey as string) as IParamsInject
}