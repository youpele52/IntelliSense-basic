import React, { useEffect, useRef, useState } from "react";
import { Chart as Chartjs, registerables } from "chart.js";

Chartjs.register(...registerables);

// set default font size
Chartjs.defaults.font.size = 16;

// temp solution an elegant solution would be to create a
const colors = [
  "#FD7272",
  "#54a0ff",
  "#00d2d3",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#7f8c8d",
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#5f27cd",
  "#54a0ff",
  "#01a3a4",
];

export default function Chart({ chartData }) {
  // create DOM reference for chart
  const chartContainer = useRef(null);

  // store chart instance for easy updates
  const [chartInstance, setChartInstance] = useState(null);

  const createData = (rawData) => {
    const datasets = rawData.map((entry) => {
      return {
        label: entry[0],
        labels: entry[1],
        data: entry[2],
      };
    });
    return datasets;
  };

  useEffect(() => {
    if (chartContainer?.current && chartData.length > 0) {
      const chartConfig = {
        type: "line",
        data: {
          labels: chartData[0][1],
          datasets: chartData.map((entry, i) => {
            return {
              label: entry[0],
              labels: entry[1],
              data: entry[2],
              borderColor: colors[i],
              borderWidth: 3,
              lineTension: 0.3,
            };
          }),
        },
      };
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    return () => chartInstance && chartInstance.destroy();
  }, [chartData]);

  return (
    <div className="chart-card">
      <div className="chart-cont">
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}
