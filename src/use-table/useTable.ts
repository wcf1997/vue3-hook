import { h, type InjectionKey, provide, reactive, type Ref, ref, type VNode } from 'vue'
import { IColumns } from './types'

interface IUseTableParams<T = any> {
  requestApi?: (...args: any) => Promise<any>
  dataSource?: T[]
  columns: Omit<IColumns, 'actions'>[]
  hidePaginator?: boolean
  key: string
}

interface IUserTableReturn<T = any> {
  UseTable: (...args: any) => VNode
  search: (...args: any) => any
  reload: (...args: any) => any
  dataSource: T[]
}
interface IUseTableOption {
  component: any
}
let uid = 0

// // 创建TableVnode
export function createUseTable(component: any ) {
  if (!component) {
      throw new Error("请配置表格组件模板");
  }
  return function useTable<T = any>(
    params: IUseTableParams<T>,
    props?: any,
    options?: IUseTableOption
  ): IUserTableReturn<T> {
    const isLoading = ref(false)
    const tableData = ref<T[]>([]) as Ref<T[]>
    const pageInfo = reactive({
      index: 1,
      size: 10,
      total: 0
    })

    let searchInfo = reactive({})

    /** 获取表格数据 */
    async function getTalbeData() {
      if (!params?.requestApi) {
        tableData.value = params?.dataSource || []
        pageInfo.total = params.dataSource?.length || 0
        return
      }
      try {
        const res = await params?.requestApi({ ...pageInfo, ...searchInfo })
        if (!res.success) return
        pageInfo.total = res.data.total
        tableData.value = res.data.records
      } catch (error) {
        console.log(error)
      }
    }
    getTalbeData()

    /** 页数改变事件 */
    async function handlePageChange(currentPage: number) {
      pageInfo.index = currentPage

      getTalbeData()
    }
    /** 每页条数改变事件 */
    async function handleSizeChange(size: number) {
      pageInfo.size = size
      getTalbeData()
    }
    // 搜索
    function search(data: any) {
      searchInfo = { ...data }
      pageInfo.index = 1
      getTalbeData()
    }
    // 重制
    function reload() {
      pageInfo.index = 1
      searchInfo = {}
      getTalbeData()
    }

    /** 操作按钮时间 */
    function handleActionButtonClick(item: any, $event: any) {
      item.onClick(getTalbeData);
    }

    /** 注入params */
    const projectKey = 'uid_' + uid
    provide(projectKey, {
      isLoading,
      columns: params.columns,
      tableData,
      pageInfo,
      handlePageChange,
      handleSizeChange,
      handleActionButtonClick
    })
    uid++
    const UseTableVnode = h(component || options?.component , {
      ...props,
      projectKey: projectKey
    })

    const UseTable = () => UseTableVnode
    return {
      UseTable,
      search,
      reload,
      dataSource: tableData.value
    }
  }
}

