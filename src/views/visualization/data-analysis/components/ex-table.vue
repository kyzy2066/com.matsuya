<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <!-- <template #title>
        {{ $t('dataAnalysis.popularAuthor') }}
      </template> -->
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <!-- <a-table :data="[]" :columns="columns" :pagination="false" :bordered="false" style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }">   
        <template #columns>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.ranking')" data-index="ranking"></a-table-column>
          <a-table-column :title="$t('dataAnalysis.popularAuthor.column.author')" data-index="author"></a-table-column>
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.content')"
            data-index="contentCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'], 
            }"
          ></a-table-column>
          <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.click')"
            data-index="clickCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          ></a-table-column>
        </template>
      </a-table> -->
      <a-table :columns="columns" style="margin-bottom: 20px;" :data="tbData1" :pagination="false" size="mini" />
      <a-table :columns="columns2" :data="tbData2" style="margin-bottom: 20px;" :pagination="false" size="mini" />

      <a-table :columns="columns3" :data="tbData3" :pagination="false" class="t3" size="mini" />

      <!-- <a-table :columns="columns" :data="tbData" size="mini" />
      <a-table :columns="columns" :data="tbData" size="mini" /> -->

    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import useLoading from '@/hooks/loading'
import { queryPopularAuthor, PopularAuthorRes } from '@/api/visualization'

const { loading, setLoading } = useLoading()
const tableData = ref<PopularAuthorRes>({ list: [] })
const columns: any = [
  {
    title: "", dataIndex: "type", fixed: 'left',
    width: 300
  }, // 第一列
  ...Array.from({ length: 24 }, (_, i) => ({
    title: `Month${i + 1}`,
    dataIndex: `Month${i + 1}`,

  }))
]
const rowclassmaker = () => {
  return 'rowclass2'
}
const columns1 = columns.map((i) => {
  return {
    ...i, headerCellStyle: {
      backgroundColor: "pink",
    }
  }
})
const columns2 = columns.map((i, e) => {
  return {

    ...i, headerCellStyle: {
      backgroundColor: "#ffeaa0",
    }, bodyCellStyle: e === 0 ? {
      backgroundColor: "#ffeaa0",
    } : {}
  }
})
const columns3 = columns.map((i, e) => {
  return {
    ...i, headerCellStyle: {
      backgroundColor: "#cad9dd",
    }, bodyCellStyle: e === 0 ? {
      backgroundColor: "#cad9dd",
    } : {}
  }
})
// const rowClass = (a, rowIndex) => {
//   switch (true) {
//     case (rowIndex < 2):
//       return "";
//     case (rowIndex >= 2 && rowIndex < 5):
//       return "rowclass2";
//     case (rowIndex >= 10):
//       return "rowclass3";
//     default:
//       return "无效的行索引";
//   }
// }
const typeValues1 = reactive(["Conversion rate", "Cumlative conversion rate", "Repeat rate",])
const typeValues2 = ["Total sales", "Cumulative sales"]
const typeValues3 = ["Converted members during the month",
  'Sales from newly converted members',
  'Month 1 joined members',
  ...Array.from({ length: 16 }, (_, i) => `Month ${i + 2} joined members`), 'Total Potential sales of the cohort 1']; // 你的自定义 type 值
const makeTbData = (typeValues) => {
  return typeValues.map((type, index) => ({
    key: index,
    type, // 直接使用数组中的值
    ...Object.fromEntries(
      Array.from({ length: 24 }, (_, i) => [`Month${i + 1}`, Math.floor(Math.random() * 100)])
    )
  }));

}
const tbData1: any = makeTbData(typeValues1)
const tbData2: any = makeTbData(typeValues2)
const tbData3: any = makeTbData(typeValues3)

const fetchData = async () => {
  try {
    setLoading(true)
    const { data } = await queryPopularAuthor()
    tableData.value = data
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}
// fetchData()
</script>

<style scoped lang="less">
.general-card {
  // max-height: 425px;
}

:deep(.rowclass2>.arco-table-td) {
  background-color: #cad9dd !important;
}
</style>
