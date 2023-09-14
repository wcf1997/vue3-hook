import { IUseTableOption, IUserTableReturn, IUseTableParams, ICommonColumnProp } from "./types";
export declare function createUseTable<ColumnProps = any, TableProps = any>(globalOptions: IUseTableOption): <T = any>(params: IUseTableParams<T, Partial<ColumnProps> & ICommonColumnProp>, tableAttrs?: Partial<TableProps> & {
    /** 是否使用列表模式 */
    listMode?: boolean;
    /** 分页器 */
    pagination?: boolean;
}) => IUserTableReturn<T>;
