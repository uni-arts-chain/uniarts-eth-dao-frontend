/** * Created by Lay Hunt on 2022-01-14 11:12:12. */
<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, watch } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "chart",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    // TODO
    const { data } = toRefs(props);
    const chart = ref(null);
    let myChart;
    onMounted(() => {
      myChart = echarts.init(chart.value);
      if (data.value.length > 0) {
        setOption();
      }
    });

    const setOption = () => {
      myChart.setOption({
        grid: {
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "10%",
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: (value) => {
              var date = new Date(parseInt(value));
              var texts = [date.getMonth() + 1, date.getDate()];
              return texts.join("/");
            },
            showMinLabel: true,
            showMaxLabel: true,
            color: "#333",
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#ccc",
            },
          },
          splitLine: {
            lineStyle: {
              color: ["#ccc"],
            },
          },
          axisLabel: {
            color: "#333",
          },
          axisTick: {
            show: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(50,50,50,0.8)",
          formatter: (params) =>
            `<div style="text-align: left;font-size: .85rem;color: white;padding: 5px 10px;">
              <span>${new Date(params[0].value[0]).toLocaleDateString()}</span><br/>
              <span style="color: #aaa;padding-top: 10px">Price: ${params[0].value[1]}</span>
            </div>`,
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0,
            },
          },
        },
        series: [
          {
            data: data.value.map((v) => {
              v[0] = v[0] * 1000;
              return v;
            }),
            type: "line",
            lineStyle: {
              width: 2,
              color: "#000",
            },
            itemStyle: {
              color: "#000",
            },
            symbol: "circle",
            symbolSize: 3,
            showSymbol: false,
            smooth: true,
          },
        ],
      });
    };

    watch(data, () => {
      setOption();
    });

    return {
      chart,
    };
  },
});
</script>

<style lang="scss" scoped></style>
