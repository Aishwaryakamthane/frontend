import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function ChartWidget({ title = "Chart", data }) {
  const sample = data || {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      { label: "Sales", data: [12, 19, 10, 14, 20], borderColor: "#4f46e5", tension: 0.3 },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <Line data={sample} />
    </div>
  );
}
