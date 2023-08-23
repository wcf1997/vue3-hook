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
export declare const useProvideModalComponent: import("vue").Raw<import("vue").DefineComponent<Readonly<{
    args?: any;
    content?: any;
    uniqueId?: any;
    template?: any;
    close?: any;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    args?: any;
    content?: any;
    uniqueId?: any;
    template?: any;
    close?: any;
}>>>, {
    readonly args?: any;
    readonly content?: any;
    readonly uniqueId?: any;
    readonly template?: any;
    readonly close?: any;
}>>;
