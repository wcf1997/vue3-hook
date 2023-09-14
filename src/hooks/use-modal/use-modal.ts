import {
  defineComponent,
  h,
  provide,
  ref,
  readonly,
  Ref,
  inject,
  markRaw
} from "vue";
import { Modal_INJECT_KEY, _provideKey } from "../symbols";
// import { _provideKey, _token } from "../utils";

export const useProvideModalComponent = markRaw(
  defineComponent({
    props: ["args", "content", "uniqueId", "template", "close"],
    setup(props) {
      const visible = ref<boolean>(false);
      // 用定时器防止没有加载动画
      let visibleTimer = setTimeout(() => {
        visible.value = true;
        clearTimeout(visibleTimer);
      }, 50);

      let arguements = props.args || {};
      const { popupComponentList } = inject(_provideKey) as {
        popupComponentList: Ref<any[]>;
      };
      const loading = ref<boolean>(false);
      /** 本地报错onOK中的事件并且下发的onOK事件， responseFn不存在时不能触发，存在时会触发函数 */
      let responseFn: undefined | ((...args: any) => any);
      function onOk(fn: ((...args: any) => any) | undefined = undefined) {
        if (!responseFn) {
          if (fn && fn instanceof Function) {
            responseFn = fn;
            return;
          }
        } else {
          responseFn();
        }
      }

      function setLoading(isLoading: boolean) {
        loading.value = isLoading;
      }
      function close(data: any = false) {
        visible.value = false;
        props.close(data);
        const timer = setTimeout(() => {
          const index = popupComponentList.value.findIndex(
            v => v.id === props.uniqueId
          );
          if (index > -1) {
            popupComponentList.value.splice(index, 1);
          }

          clearTimeout(timer);
        }, 300);
      }
      provide(Modal_INJECT_KEY, {
        visible,
        close,
        content: props.content,
        args: arguements,
        loading: readonly(loading),
        onOk,
        setLoading
      });

      return () => h(props.template);
    }
  })
);
