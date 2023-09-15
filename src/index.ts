import { createUseTable } from "./hooks/use-table/use-table";
import { useDrawer, useInject, useModal, usePopup, useTableInject, useTryCatch } from "./hooks/utils";
// import { createModalComponent, createUseModal } from "./hooks/use-modal/use-modal";
import { createUseList } from "./hooks/use-list/use-list";
import { IModalInject } from "./hooks/use-modal/types";
import { IColumns } from "./hooks/use-table/types";
import { IUseListInject } from "./hooks/use-list/types";
import CustomPopupProvide from "./hooks/use-modal/custom-popup-provide";

export {
  createUseTable,
  /** modal and drawer inject */
  useInject,
  /** table inject  */
  useTableInject,
  // createUseModal,
  createUseList,
  // createModalComponent,
  IModalInject,
  IColumns,
  IUseListInject,
  useTryCatch,
  /** 顶层弹出层注入组件 */
  CustomPopupProvide,
  /** modal和drawer同一导出 */
  usePopup,
  /** 单独使用modal */
  useModal,
  /** 单独使用drawer */
  useDrawer
};