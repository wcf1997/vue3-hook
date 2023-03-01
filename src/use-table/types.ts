import { Ref, VNode } from "vue";


interface IFormItem {
  type?:
    | "input"
    | "select"
    | "multi-select"
    | "date"
    | "cascader"
    | "switch"
    | "radio";
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
  type?: "index" | "checkbox" | "action" | "enum";
  /** 字段名称 */
  label: string;
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
  // search?: IFormItem;
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

export interface ISchema<T = any> {
  [prop: string]: ISchemaItem;
}

export interface IParamsInject<T = any> {
  /** 加载状态 */
  isLoading: Ref<boolean>;
  /** 静态数据源 */
  tableData?: Ref<T[]>;
  /** 表格列 */
  columns: Omit<IColumns, "actions">[];

  pageInfo: any;
  /** 接口 */
  // requestApi?: (...args: any) => Promise<IBaseResponse>;
  hidePaginator?: boolean;
  // 分页条数变换事件
  handleSizeChange: (...args: any) => any;
  // 当前页变化事件
  handlePageChange: (...args: any) => any;
  // 操作按钮点击事件
  handleActionButtonClick: (...args: any) => any;
}
