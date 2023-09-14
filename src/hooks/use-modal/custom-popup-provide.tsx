import {
  Component,
  Teleport,
  VNode,
  defineComponent,
  markRaw,
  provide,
  ref
} from "vue";
import { useProvideModalComponent } from "./use-modal";
import { _modalKey, _provideKey } from "../symbols";

function createId() {
  return `${new Date().getTime()}`;
}
export default defineComponent({
  name: "CustomPopupProvide",
  // props: notificationProviderProps,
  props: {
    modalTemplate: null,
    drawerTemplate: null
  },
  setup(props) {
    // const { mergedClsPrefixRef } = useConfig(props);
    const popupList = ref<
      {
        vnode?: any;
        close?: (...args: any) => any;
        id?: string;
        content?: any;
        args?: any;
        template: VNode;
      }[]
    >([]);

    function useModal(
      content: any | Component,
      args: any = "asdafasfasfalkdaskld"
    ) {
      return new Promise(resolve => {
        const id = createId();
        const ModalComponent = markRaw(useProvideModalComponent);

        popupList.value.push({
          id,
          vnode: ModalComponent,
          content: markRaw(content),
          args,
          close: resolve,
          template: markRaw(props.modalTemplate)
        });
      });
    }

    function useDrawer(content: VNode | Component, args: any) {
      return new Promise(resolve => {
        const id = createId();
        const ModalComponent = markRaw(useProvideModalComponent);
        popupList.value.push({
          id,
          vnode: ModalComponent,
          content: markRaw(content),
          args,
          close: resolve,
          template: markRaw(props.drawerTemplate)
        });
      });
    }
    const api = {
      useModal,
      useDrawer
    };

    provide(_modalKey, api);
    provide(_provideKey, {
      popupComponentList: popupList
    });
    // provide(_modalKey, {
    //   props,
    //   wipTransitionCountRef
    // });

    // deprecated
    // function open(options: NotificationOptions): NotificationReactive {
    //   return create(options);
    // }
    // function destroyAll(): void {
    //   Object.values(notificationListRef.value).forEach(notification => {
    //     notification.hide();
    //   });
    // }
    return Object.assign(
      {
        popupList
        // handleAfterLeave
      },
      api
    );
  },

  render() {
    return (
      <>
        {this.$slots["default"]?.()}

        {this.popupList.length ? (
          <Teleport to={"body"}>
            {this.popupList.map(vn => (
              <vn.vnode
                content={vn.content}
                uniqueId={vn.id}
                args={vn.args}
                close={vn.close}
                template={vn.template}
              />
            ))}
          </Teleport>
        ) : null}
      </>
    );
  }
});
