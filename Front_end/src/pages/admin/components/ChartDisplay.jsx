import React from "react";
import { Chart, registerables } from "chart.js"; // Correct import statement for Chart.js
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { getAllPayment } from "../../../services/index/paymentPdf";

Chart.register(...registerables); // Register necessary elements

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", 
    },
    title: {
      display: true,
      text: "Doanh Thu",
    },
  },
};

export const ChartDisplay = () => {
  const { data: dataPayment } = useQuery({
    queryFn: () => getAllPayment(),
    queryKey: ["getAllPayment"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const labelsSet = new Set();
  const labels = dataPayment
    ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, 7)
    .map((item) => {
      const label = new Date(item.createdAt).toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      labelsSet.add(label);
      return label;
    });

  const uniqueLabels = Array.from(labelsSet);

  const data = {
    labels: uniqueLabels,
    datasets: [
      {
        label: "Số lượt thanh toán trong tuần",
        data: uniqueLabels.map((label) => {
          const totalRevenue = dataPayment.reduce((total, item) => {
            const itemLabel = new Date(item.createdAt).toLocaleDateString(
              "vi-VN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            );
            if (itemLabel === label) {
              return total + 1;
            }
            return total;
          }, 0);
          return totalRevenue;
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        
      },
    ],
  };

  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
};
