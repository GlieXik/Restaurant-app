import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const Chart = ({ orders }) => {
  //* change wtf date to normal month
  const changeDate = orders.map((order) => {
    const date = new Date(order.createdAt);
    const month = labels[date.getMonth()];
    return {
      ...order,
      createdAt: month,
    };
  });
  //* create array, index of === month, value suma by month
  const result = changeDate.reduce((acc, item) => {
    const monthIndex = labels.indexOf(item.createdAt);
    if (monthIndex !== -1) {
      acc[monthIndex] += item.totalPrice;
    }
    return acc;
  }, Array(12).fill(0));

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Продано (сума)",
        data: result.map((e) => e),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "#1976d2",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
