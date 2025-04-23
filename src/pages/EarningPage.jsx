import React, { useEffect, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import HomeSideNav from "../components/HomeSideNav";
import { getSalesSummary } from "../lib/supabase";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EarningPage() {
  const [salesSummary, setSalesSummary] = useState({
    earnings: {
      today: 0,
      weekly: 0,
      monthly: 0,
    },
    salesCount: {
      today: 0,
      weekly: 0,
      monthly: 0,
    },
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const summary = await getSalesSummary();
        setSalesSummary(summary);
      } catch (err) {
        console.error("Error fetching sales summary:", err.message);
      }
    };

    fetchSales();
  }, []);

  const earningsChartData = {
    labels: ["Today", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Earnings (PHP)",
        data: [
          salesSummary.earnings.today,
          salesSummary.earnings.weekly,
          salesSummary.earnings.monthly,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  const salesCountChartData = {
    labels: ["Today", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Sales Count",
        data: [
          salesSummary.salesCount.today,
          salesSummary.salesCount.weekly,
          salesSummary.salesCount.monthly,
        ],
        backgroundColor: ["#FF5722", "#9C27B0", "#3F51B5"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <main className="grid grid-cols-[auto,1fr,1fr] grid-rows-[auto,1fr] gap-4 h-svh bg-secondary font-poppins text-primary">
      <HeaderNav />
      <HomeSideNav />
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Earnings Summary</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Today's Earnings</h2>
            <p className="text-2xl font-bold">
              {salesSummary.earnings.today} PHP
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Weekly Earnings</h2>
            <p className="text-2xl font-bold">
              {salesSummary.earnings.weekly} PHP
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Monthly Earnings</h2>
            <p className="text-2xl font-bold">
              {salesSummary.earnings.monthly} PHP
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Today's Sales</h2>
            <p className="text-2xl font-bold">
              {salesSummary.salesCount.today}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Weekly Sales</h2>
            <p className="text-2xl font-bold">
              {salesSummary.salesCount.weekly}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Monthly Sales</h2>
            <p className="text-2xl font-bold">
              {salesSummary.salesCount.monthly}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Earnings Graph</h2>
          <Bar data={earningsChartData} options={chartOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Count Graph</h2>
          <Bar data={salesCountChartData} options={chartOptions} />
        </div>
      </main>
    </main>
  );
}
