import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../store';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsDashboard() {
  const { classifications } = useStore();

  const last24Hours = classifications.filter(
    (c) => new Date().getTime() - c.timestamp.getTime() < 24 * 60 * 60 * 1000
  );

  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = format(new Date().setHours(new Date().getHours() - i), 'ha');
    const items = last24Hours.filter(
      (c) => format(c.timestamp, 'ha') === hour
    );
    return {
      hour,
      smooth: items.filter((c) => c.type === 'smooth').length,
      rough: items.filter((c) => c.type === 'rough').length,
    };
  }).reverse();

  const chartData = {
    labels: hourlyData.map((d) => d.hour),
    datasets: [
      {
        label: 'Smooth Surfaces',
        data: hourlyData.map((d) => d.smooth),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Rough Surfaces',
        data: hourlyData.map((d) => d.rough),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Surface Classifications (Last 24 Hours)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const totalClassifications = classifications.length;
  const smoothCount = classifications.filter((c) => c.type === 'smooth').length;
  const roughCount = totalClassifications - smoothCount;
  const averageConfidence =
    classifications.reduce((acc, c) => acc + c.confidence, 0) /
    totalClassifications;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Total Classifications</h3>
          <p className="text-2xl font-bold">{totalClassifications}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Smooth Surfaces</h3>
          <p className="text-2xl font-bold text-green-500">{smoothCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Rough Surfaces</h3>
          <p className="text-2xl font-bold text-red-500">{roughCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Avg. Confidence</h3>
          <p className="text-2xl font-bold">
            {(averageConfidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;