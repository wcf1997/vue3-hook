import { type Component } from "vue";
export declare function createUseModal(template: Component): (content?: Component, args?: any) => Promise<any>;
export declare function createModalComponent(template: Component): (content?: Component, args?: any) => {
    open: () => Promise<any>;
    UseDialogComponent: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
