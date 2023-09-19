import { Component, Ref, VNode } from "vue";
export interface IModalInject {
    visible: boolean;
    close: (...args: any) => any;
    content: VNode;
    args: any;
    setLoading?: (loading: boolean) => any;
    onConfirm: any;
    onOk?: any;
    loading: Ref<boolean>;
}
export interface NotificationApiInjection {
    useModal: (content: Component, args: any) => Promise<any>;
    useDrawer: (content: Component, args: any) => Promise<any>;
}
