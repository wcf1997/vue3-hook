# vue3-hook
## createUseTable
### 接收一个IUseTableOption类型参数

| 参数名   | 是否必填 | 默认值  | 描述   |
|--------|--------|--------|--------|
| comoponent | 是 | null | 组件库table组件 |
| req | 否 |null | 全局请求相关配置 |
| req.params | 否 |null | 请求相关额外参数 |
| req.reName  | 否 |null | 重写分页请求当前页和条数名称 |
| req.reName.index | 否 | 'index' | 分页请求当前页名称 |
| req.reName.size | 否 | 'size' | 分页请求当前条数限制名称 |
| res | 否 |否 | 全局响应相关配置 |
| res.reName | 否 |null | 分页接口响应数据 |
| res.reName.total | 否 | 'total' | 根据res.reName.total获取请求返回的总数数据 |
| res.reName.list | 否 | 'data' | 根据res.reName.list获取请求返回的列表数据 |

### createUseTable返回IUserTableReturn类型接口
| 参数名   | 描述   |
|---------|--------|
| UseTableComponent | 返回的TableComponent，在组件内使用 |
| search   | 根据关键字搜索 |
| reload   | 重制表格数据 |
| dataSource | 列表数据源 | 

### TableTemplate.vue 当前使用的组件库的表格组件
```vue

<template>
  <div>
    <el-table
      :data="tableData"
      bodyClass="leading-none"
      v-loading="loading"
     v-bind="attrs"
    >
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :label="col.label"
        :key="col.prop"
        :type="col.type"
      >
        <template #default="scope">
          <!-- 普通列 -->
          <slot
            v-if="!col.type"
            :name="col.slot"
            :data="{ text: scope.row[col.prop], raw: scope.row }"
            ><span class="leading-none">{{
              col.renderText
                ? col.renderText(scope.row[col.prop], scope.row)
                : scope.row[col.prop] || '-'
            }}</span>
          </slot>
          <!-- 状态列 -->
          <template v-if="col.type === 'enum'">
            <Tag
              v-if="col.enum[scope.row[col.prop]]?.text"
              :value="col.enum[scope.row[col.prop]]?.text"
              :icon="`pi ${col.enum[scope.row[col.prop]]?.icon}`"
              :severity="col.enum[scope.row[col.prop]]?.status"
            ></Tag>

            <span v-else>-</span>
          </template>

          <!-- 操作列 -->
          <div v-if="col.type === 'action'">
            <template v-for="(item, index) in actions!.actions(scope.row)" :key="index">
              <el-button
                v-bind="item"

              >
                {{ item.label }}
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
      <template #empty> 暂无数据～ </template>
    </el-table>
    <el-pagination
      v-model:current-page="pageInfo.index"
      v-model:page-size="pageInfo.size"
      :page-sizes="[2, 10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useInject } from 'v3-usehook';
import { computed } from 'vue'


// ## 注入
let {
  columns, // 表格展示列数据
  loading, //  异步数据加载状态
  pageInfo, // 当前分页数据
  tableData,// 表格数据源
  handleSizeChange, // 分页大小change事件
  handlePageChange, // 分页当前页change事件
  handleActionButtonClick, // 操作列按钮事件
  attrs // 表格参数属性
} = useInject()


// 获取操作列按钮列表
const actions = computed(() => columns.find((v: any) => v.type === 'action'))

const onSizeChange = (val: number) => {
  handleSizeChange(val)
}
const onCurrentChange = (val: number) => {
  handlePageChange(val)
}

</script>

<style lang="less" scoped>
span {
  vertical-align: auto;
}
.p-tag-value {
  padding: 3px 7px;
}
.p-button.p-button-sm {
  padding: 7px 15px;
}
</style>

```
### 声明table.js文件
```javascript
// 创建一个useTable方法，传入TableTemplate目标
export const useTable = createUseTable(TableTemplate)

```

### 业务组件内使用
```vue
<template>
  <UseTableComponent />
</template>

<script setup>
const columns: IColumns[] = [
  { type: 'selection', prop: 'selection' },
  { type: 'index', prop: 'index', label: '序号' },
  { prop: 'name', label: '姓名' },
  { prop: 'mobile', label: '联系方式' },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    actions: (record, reload) => [
      {
        label: '操作',
        onClick() {
          // record 当前行数据
          // reload 刷新表格
        }
      }
    ]
  }
]
let {UseTableComponent} = useTable({
  requestApi: API // 列表接口
  columns
})
</script>
```

### useTable(params: IUseTableParams<T>, attrs?: any,  options?: IUseTableOption)

1、 IUseTableParams<T = any>
| 参数名   | 类型 | 描述   |
|---------|-----|--------|
| requestApi | Promise |一步请求API |
 |dataSource   | any[]| 静态表格数据源 |
| columns   | IColumns[] | 表格展示列 |

2、 attrs：表格参数

3、 options： 同上 IUseTableOption

#### IColumns
| 参数名  | 是否必填 | 类型 | 描述   |
|---------|-----|-----|--------|
| label | 是 | |  表格列名 |
| prop | 是 | 表格对应列绑定的列表数据字段参数，根据prop获取当前行的对应数据 |
| hideInTable | 否 | boolean | 是否隐藏该列 |
| type | 否 |"index" ，"checkbox" ，"action" ，"enum"; | 表格列展示类型 | 
| emun | 否| 状态列   | 请看示例 | 
| actions| 否 | | 操作列，请看示例 |
| slot | string | 插槽名称，可以生成对应具名插槽 |
|renderText | 否| (text,record) => any | 格式化当前参数展示数据,text：为当前数据，record：为当前行数据|
| render | 否| (text,record) => Component | 同上 |


## createUseModal （v3.0已废弃）
>  createUseModal: (component:Component) => (content:Copmonent,args:any) =>Promise<any>
> 该方法传入一个组件，返回一个useModal函数，使用该函数创建弹窗，并在改函数内，传入弹窗内的组件
### 用法
1、ModalTemplate
```vue
<template>
  <el-dialog
    v-model="visible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
   
   <component :is='content'></component>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import type { IModalInject } from 'v3-usehoo';
import { useInject } from 'v3-usehook';
// visible：弹窗的显示隐藏、close关闭事件, content弹窗内容
let {visible,close,content} =useInject<IModalInject>() 
function handleClose(){
  close(false)
}
</script>

```
#### 某js文件导出函数

```javascript
export const useModal = createUseModal(ModalTemplate)

```

#### 业务组件内引入

```vue
useModal(AddUserForm,{name:'张三',mobile:'18888888888'}).then(res => {

})
```
#### AddUserForm组件内
```vue
<template>
 <p>name:{{args.name}} mobile: {{args.mobile}}</p>
<template>

<script>
const {args, close} = useInject<IModalInject>()
//args useModal方法中第二个传入的数据
// close 用于关闭弹窗可以传入数据，用于触发useModal的then，并且会携带数据返回
</script>
```

> IModalInject

| 参数名   | 类型 | 描述   |
|---------|-----|--------|
| visible | boolean | 弹窗的显示隐藏 |
 |close   | (data:any) => any| 关闭弹窗并且传递数据 |
| content   |Component | 内容组件 |

## createUseModalComponent创建弹窗（v3.0已废弃）
> 由于createUseModal 中的所有组件无法读取全局组件需要手动引入，因此新增了createUseModalComponent支持使用全局组件

> createUseModalComponent: (component:Component) => (content:Component,args:any) => {open, UseDialogComponent}

###  createUseModalComponent用法同上 （v3.0已废弃）

### createUseModalComponent 与 createUseModal 区别
> createUseModalComponent 创建成功后 返回 useModalComponent
> 业务组件内使用区别如下

#### 业务组件内
```vue
<template>
  <UseModalComponent />
</template>

<script>
  const {open,UseModalComponent} = useModalComponent(AddUseForm,{name:'zs'})
  open().then(res => {
    // res close中传递的数据
  })
</script>
```
## 模态框、抽屉函数创建（v3.0）
### 准备ModalTemplate模板
```vue
<template>
  <n-modal v-model:show="visible" transform-origin="mouse">
    <n-card
      :title="args && args.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <component :is="content"></component>
      <template #footer v-if="args && !args.hideFooter">
        <NSpace class="text-right" justify="end">
          <n-button @click="onConfirm" :loading="loading" type="primary">确定</n-button
          ><n-button @click="handleClose">取消</n-button>
        </NSpace>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NCard, NButton, NSpace } from 'naive-ui'
import { useInject, type IModalInject } from 'v3-usehook'
/**
 * visible：控制显示隐藏
 * args：自定义参数
 * content：引入的内容组件
 * close：关闭事件
 * loading：确认按钮loading动画
 * onOk：接管点击确认事件
 */
const { visible, args, content, close, loading, onOk } = useInject<IModalInject>()
function handleClose() {
  close(false)
}
function onConfirm(){
  onOk()
}
</script>

```
### 步骤一：注入组件
```vue
<script setup>
  import { CustomPopupProvide } from 'v3-usehook'
  // 1、在App.vue文件中引入CustomPopupProvide组件
  // 2、传入模态框模板以及抽屉模板
</script>

<template>
 <CustomPopupProvide :modal-template="ModalTemplate" :drawer-template="DrawerTemplate">
  <App />
 </CustomPopupProvide>
</tempalte

```

### 步骤二：使用组件
```vue
<script>
> comp:传入的组件、args：自定义参数
> uesModal(comp:component | VNode, args:{[propName:string]:any}): Promise<any>
  // 用法一：
  const { useModal, useDrawer } = usePopup()
   function open(){
  // 用法二：
  const modal = useModal()
  // 用法一：
    useModal(/**组件 */,{title:'标题',...args},).then(res => {})
  // 用法二：
    modal(/**组件 */,{title:'标题',...args},).then(res => {})
   }
</script>

<template>
 <button @click="open">open</button>
</tempalte

```
### 步骤三：传入的组件内获取依赖注入
```vue
<script>
  const {args, close,onOk} = useInject<IModalInject>()
</script>

<template>
 
</tempalte

```


## useInject