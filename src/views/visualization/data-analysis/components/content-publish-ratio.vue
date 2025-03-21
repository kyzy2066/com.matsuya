<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title>
        {{ "Example: Data=dami" }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { ToolTipFormatterParams } from '@/types/echarts'
import useLoading from '@/hooks/loading'
import { queryContentPublish, ContentPublishRecord } from '@/api/visualization'
import useChartOption from '@/hooks/chart-option'

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
  return items
    .map(
      (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
    )
    .join('')
}

const { loading, setLoading } = useLoading(true)
const xAxis = ref<string[]>([])
const textChartsData = ref<number[]>([])
const imgChartsData = ref<number[]>([])
const videoChartsData = ref<number[]>([])
const { chartOption } = useChartOption((isDark) => {
  return {
    grid: {
      left: '4%',
      right: 0,
      top: '20',
      bottom: '60',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#4E5969',
      },
    },
    xAxis: {
      type: 'category',
      data: xAxis.value,
      axisLine: {
        lineStyle: {
          color: isDark ? '#3f3f3f' : '#A9AEB8',
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#86909C',
        },
      },
      axisLabel: {
        color: '#86909C',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#86909C',
        formatter(value: number, idx: number) {
          if (idx === 0) return `${value}`
          return `${value / 1000}%`
        },
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#3F3F3F' : '#E5E6EB',
        },
      },
    },
    dataZoom: [
      {
        // type: 'inside', // 允许鼠标滚轮缩放

      },
      { type: 'slider' }
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as ToolTipFormatterParams[]
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`
      },
      className: 'echarts-tooltip-diy',
    },
    series: [
      {
        name: 'Conversion rate',
        data: [...textChartsData.value, ...textChartsData.value],
        stack: 'one',
        type: 'bar',
        barWidth: 8,
        color: isDark ? '#4A7FF7' : '#246EFF',
      },
      {
        name: 'Cumlative conversion rate',
        data: [...imgChartsData.value, ...imgChartsData.value],
        stack: 'two',
        type: 'bar',
        color: isDark ? '#085FEF' : '#00B2FF',
      },
      {
        name: 'Repeat rate',
        data: [...videoChartsData.value, ...videoChartsData.value],
        stack: 'three',
        type: 'bar',
        color: isDark ? '#01349F' : '#81E2FF',
        itemStyle: {
          borderRadius: 2,
        },
      },
    ],
  }
})
const fetchData = async () => {
  setLoading(true)
  try {


    const { data: chartData } = await queryContentPublish()
    const months = Array.from({ length: 24 }, (_, i) => `${i + 1}`);
    xAxis.value = months
    // textChartsData.value = 
    console.log(imgChartsData.value)

    console.log(videoChartsData.value)
    chartData.forEach((el: ContentPublishRecord) => {
      if (el.name === '纯文本') {
        textChartsData.value = el.y
      } else if (el.name === '图文类') {
        imgChartsData.value = el.y
      }
      videoChartsData.value = el.y
    })


  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}
fetchData()
</script>

<style scoped lang="less"></style>
