export interface IModalInject {
  visible:boolean
  close:(...args:any) => any
  content:Comment
  args:any
  onOk?:(fn:(...args:any) => any) => any
}