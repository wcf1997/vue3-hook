import { type Component } from "vue";
export declare function createUseModal(template: Component): (content?: Component, args?: any) => Promise<any>;
export declare function createModalComponent(template: Component): (content?: Component, args?: any) => {
    open: (args?: any) => Promise<any>;
    UseDialogComponent: import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
};
