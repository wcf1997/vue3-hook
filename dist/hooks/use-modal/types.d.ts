import { Ref } from "vue";
export interface IModalInject {
    visible: boolean;
    close: (...args: any) => any;
    content: Comment;
    args: any;
    loading: boolean;
    setLoading?: (loading: boolean) => any;
    onConfirm: () => Promise<any>;
    onConfirmEvent: Ref<(...args: any) => any>;
}
