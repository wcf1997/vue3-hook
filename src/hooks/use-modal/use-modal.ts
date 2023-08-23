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
import { _provideKey, _token } from "../utils";

/**
 * 废弃
 * @param template 
 * @returns 

export function createUseModal(template: Component) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useModal(content?: Component, args?: any): Promise<any> {
    return new Promise(resolve => {
      const visible = ref<boolean>(false);
      const loading = ref<boolean>(false);
      let confirmEvent = ref<(...args: any) => any>();
      function onConfirm() {
        return new Promise(resolve => {
          confirmEvent.value = () => resolve(true);
        });
      }
      function setLoading(isLoading: boolean) {
        loading.value = isLoading;
      }
      const ModalVnode = defineComponent({
        setup() {
          provide(_token, {
            visible,
            close,
            content,
            args,
            loading: readonly(loading),
            onConfirmEvent: readonly(confirmEvent),
            onConfirm,
            setLoading
          });
          return () => h(template);
        }
      });

      const divWrap = document.createElement("div");

      document.body.appendChild(divWrap);
      function close(data: any) {
        visible.value = false;
        resolve(data);
        let timer = setTimeout(() => {
          divWrap.remove();
          clearTimeout(timer);
        });
      }

      let timer = setTimeout(() => {
        render(h(ModalVnode), divWrap);
        visible.value = true;
        clearTimeout(timer);
      });
    });
  };
}

export function createModalComponent(template: Component) {
  if (!template) {
    throw new Error("请配置弹窗模板");
  }
  return function useDialog(content?: Component, args?: any) {
    const visible = ref<boolean>(false);
    let closeResolve: any = null;
    let arguements = args || {};
    function close(data: any) {
      visible.value = false;
      closeResolve(data);
    }
    const loading = ref<boolean>(false);
    let confirmEvent = ref<(...args: any) => any>();
    function onConfirm() {
      return new Promise(resolve => {
        confirmEvent.value = () => resolve(true);
      });
    }
    function setLoading(isLoading: boolean) {
      loading.value = isLoading;
    }
    const UseDialogComponent = defineComponent({
      setup() {
        provide(_token, {
          visible,
          close,
          content,
          args: arguements,
          loading: readonly(loading),
          onConfirmEvent: readonly(confirmEvent),
          onConfirm,
          setLoading
        });
        return () => h(Teleport, { to: "body" }, h(template));
      }
    });

    function open(args?: any): Promise<any> {
      arguements = { ...arguements, ...args };
      return new Promise(resolve => {
        closeResolve = resolve;
        visible.value = true;
      });
    }
    return { open, UseDialogComponent };
  };
}
*/
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
      provide(_token, {
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