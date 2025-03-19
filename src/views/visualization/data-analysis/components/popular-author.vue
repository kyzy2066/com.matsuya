<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        {{ 'Example: Data=dami' }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <!-- <a-table :data="tableData.list" :pagination="false" :bordered="false" style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }">
        <template #columns>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.ranking')" data-index="ranking"></a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.author')" data-index="author"></a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.content')" data-index="contentCount" :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"></a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.click')" data-index="clickCount" :sortable="{
            sortDirections: ['ascend', 'descend'],
          }"></a-table-column>
        </template>
      </a-table> -->
      <a-table :columns="columns" :data="data" :show-header=false :bordered="true"  :row-class="rowclassmaker" :scroll="{ x: '100%', y: '350px' }"  />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useLoading from '@/hooks/loading'
import { queryPopularAuthor, PopularAuthorRes } from '@/api/visualization'

const { loading, setLoading } = useLoading()
const columns = [
  {
    title: '1',
    dataIndex: 'name',
  },
  {
    title: '2',
    dataIndex: 'salary',
  },
]
const data = reactive([{
  key: '1',
  name: 'Average basket 1Q',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Average basket 2Q',
  salary: 35000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '3',
  name: 'Average basket 3Q',
  salary: 50000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '4',
  name: 'Average basket 4Q',
  salary: 65000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '5',
  name: 'Members per month',
  salary: 140000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
},])
// const tableData = ref<PopularAuthorRes>({ list: [] })
// const fetchData = async () => {
//   try {
//     setLoading(true)
//     const { data } = await queryPopularAuthor()
//     tableData.value = data
//   } catch (err) {
//     // you can report use errorHandler or other
//   } finally {
//     setLoading(false)
//   }
// }
// fetchData()
const rowclassmaker=()=>{
  return 'rowclass2'
}
</script>

<style scoped lang="less">
.general-card {
  max-height: 425px;
}
:deep(.rowclass2>.arco-table-td) {
  background-color: #cad9dd !important;
}
</style>
