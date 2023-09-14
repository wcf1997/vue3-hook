import { Component, Ref, VNode } from "vue";
interface IFormItem {
    type?: "input" | "select" | "multi-select" | "date" | "cascader" | "switch" | "radio";
    /** yup验证规则 */
    yup?: any;
    /** 下拉搜索数据源 */
    options?: ISelectOptions[];
    /** 远程接口请求options数据 */
    requestApi?: (params?: any) => any;
    /** 请求参数 */
    requestParams?: any;
    /** 选项文本对应的prop */
    optionLabel?: string;
    /** 选项值对应的prop */
    optionValue?: string;
    /** onChange事件 */
    onChange?: (data: ISelectOptions) => void;
    /** 多选 */
    multiple?: boolean;
    /** radioButton 列 */
    radioOptions?: ISelectOptions[];
    /**  */
    addon?: any;
    suffix?: any;
    inputType?: string;
}
interface ISelectOptions {
    label: string;
    value: any;
    [propName: string | number]: any;
}
export interface IActionButton {
    onClick?: (...ars: any) => any;
    isPopup?: boolean;
}
export interface IColumns<T = any> {
    type?: "index" | "checkbox" | "action" | "enum" | "selection";
    /** 字段名称 */
    label?: string;
    /** 字段对应的key */
    prop: string;
    props?: string[];
    /** 自定义渲染文本内容 */
    renderText?: (text: any, record: T) => any;
    render?: (text: any, record: T) => VNode;
    /** 插槽名称 */
    slot?: string;
    /** 不显示在表格中 */
    hideInTable?: boolean;
    /** 不显示在form表单中 */
    hideInForm?: boolean;
    /** 搜索配置，配置这个属性会显示搜索表单 */
    /** 操作按钮 */
    actions?: (record: T, reload?: () => any) => Partial<IActionButton>[];
    /** 跨列 */
    colSpan?: number | string;
    /** 状态 */
    enum?: {
        [value: string | number]: {
            text: string;
            status: "success" | "info" | "primary" | "danger" | "warning";
        };
    };
    [propName: string]: any;
}
export interface ISchemaItem extends IFormItem {
    label: string;
    prop?: string;
    colSpan?: string;
}
export interface ISchema {
    [prop: string]: ISchemaItem;
}
export interface ICommonColumnProp {
    hideInForm?: boolean | (() => boolean);
    hideInTable?: boolean | (() => boolean);
    slot?: string;
    renderText?: (text: any, record: any) => any;
    render?: (text: any, record: any) => VNode | [VNode];
}
export interface IParamsInject<T = any, ColumnProps = any> {
    /** 加载状态 */
    loading: Ref<boolean>;
    /** 静态数据源 */
    tableData?: Ref<T[]>;
    /** 表格列 */
    columns: ColumnProps;
    pageInfo: any;
    /** 接口 */
    hidePaginator?: boolean;
    handleSizeChange: (...args: any) => any;
    handlePageChange: (...args: any) => any;
    handleActionButtonClick: (...args: any) => any;
    /** 表格属性 */
    attrs: any;
}
export interface IUserTableReturn<T = any> {
    STComponent: Component;
    /** 搜索 */
    search: (...args: any) => any;
    /** 重置 */
    reload: (...args: any) => any;
    /** 刷新 */
    refresh: (...args: any) => any;
    getDataSource: () => T[];
    setDataSource: (data: T[]) => any;
    onPageChange: (fn: () => any) => any;
}
export interface IReq {
    req?: {
        params?: any;
        reName?: {
            index?: string;
            size?: string;
        };
        lazyLoad?: Boolean;
    };
}
export interface IRes {
    res?: {
        reName?: {
            total?: string;
            list?: string;
        };
    };
}
export interface IUseTableOption extends IReq, IRes {
    component: any;
}
export interface IUseTableParams<T = any, ColumnProps = IColumns> extends IReq, IRes {
    requestApi?: (...args: any) => Promise<any>;
    onLoad?: (data: any) => any;
    dataSource?: T[];
    columns: ColumnProps[];
    hidePaginator?: boolean | (() => boolean);
}
export {};
