import {
  defineComponent,
  h,
  provide,
  ref,
  render,
  Teleport,
  type Component
} from "vue";
import { _token } from "../utils";

export function createUseModal(template: Component) {
    if (!template) {
      throw new Error("请配置弹窗模板");
    }
  return function useModal(content?: Component, args?: any): Promise<any> {
    return new Promise(resolve => {
      const visible = ref<boolean>(false);
      const ModalVnode = defineComponent({
        setup() {
          provide(_token, {
            visible,
            close,
            content,
            args
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
  return function useDialog(content?: Component, data?: any) {
    const visible = ref<boolean>(false);
    let closeResolve: any = null;
    function close(data: any) {
      visible.value = false;
      closeResolve(data);
    }

    const DialogVnode = defineComponent({
      setup() {
        provide(_token, {
          visible,
          close,
          content,
          data
        });
        return () => h(template);
      }
    });

    const UseDialogComponent = () => h(Teleport, { to: "body" }, h(DialogVnode));

    function open(): Promise<any> {
      return new Promise(resolve => {
        closeResolve = resolve;
        visible.value = true;
      });
    }
    return { open, UseDialogComponent };
  };
}

