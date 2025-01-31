import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface SeriesData {
  name: string;
  type: "line" | "bar"; // Extend this with more chart types if needed
  data: number[];
  stack?: string;
}

interface EChartProps {
  title?: string;
  xAxisData?: string[];
  series?: SeriesData[];
  options?: echarts.EChartsOption;
  width?: string;
  height?: string;
  colors: string[];
}

const EChart = (props: EChartProps): JSX.Element => {
  //let chartRef: HTMLDivElement | undefined;
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef) return;

    const chartInstance = echarts.init(chartRef.current);

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    const defaultOptions: echarts.EChartsOption = {
      title: {
        text: props.title || "EChart",
      },
      color: props.colors || ["#5470c6", "#91cc75", "#fac858", "#ee6666"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: props.series?.map((s) => s.name) || ["Series 1"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: props.xAxisData || ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      yAxis: {
        type: "value",
      },
      series: props.series?.map((s) => ({
        name: s.name,
        type: s.type,
        data: s.data,
        stack: s.stack,
        // areaStyle: {},
        emphasis: {
          focus: "series",
        },
      })) || [
        {
          name: "Series 1",
          type: "line",
          data: [40, 50, 45, 60],
        },
      ],
    };

    chartInstance.setOption(props.options || defaultOptions);
    window.addEventListener("resize", resizeChart);
    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
      window.removeEventListener("resize", resizeChart);
    };
  });

  return <div ref={chartRef} className="h-96 w-full"></div>;
};

export default EChart;
