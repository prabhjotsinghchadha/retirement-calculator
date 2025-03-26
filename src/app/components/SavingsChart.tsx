'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData as ChartJSData,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from '../../utils/chartDataUtils';
import { useState } from 'react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SavingsChartProps {
  chartData: ChartData;
}

export default function SavingsChart({ chartData }: SavingsChartProps) {
  const [showInitialSavings, setShowInitialSavings] = useState(true);
  const [showContributions, setShowContributions] = useState(true);
  const [showTotal, setShowTotal] = useState(true);

  const currencySymbol = chartData.currency === 'INR' ? '₹' : '$';
  
  // Format large numbers for tooltip and axis labels
  const formatValue = (value: number) => {
    if (value >= 10000000) { // 10 million+
      return `${currencySymbol}${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) { // 100k+
      return `${currencySymbol}${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) { // 1k+
      return `${currencySymbol}${(value / 1000).toFixed(1)}K`;
    }
    return `${currencySymbol}${value}`;
  };

  // Create Chart.js data structure
  const data: ChartJSData<'line'> = {
    labels: chartData.labels,
    datasets: [
      ...(showInitialSavings ? [{
        label: 'Initial Savings',
        data: chartData.initialSavingsData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }] : []),
      ...(showContributions ? [{
        label: 'Contributions',
        data: chartData.contributionsData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }] : []),
      ...(showTotal ? [{
        label: 'Total Savings',
        data: chartData.totalData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
      }] : []),
    ]
  };

  // Chart configuration
  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Retirement Savings Growth Over ${chartData.yearsToRetirement} Years`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            if (label) {
              const value = context.parsed.y;
              return `${label}: ${formatValue(value)}`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              return formatValue(value);
            }
            return value;
          }
        },
        title: {
          display: true,
          text: `Value (${chartData.currency})`,
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Age',
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      }
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showInitialSavings"
            checked={showInitialSavings}
            onChange={() => setShowInitialSavings(!showInitialSavings)}
            className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="showInitialSavings" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Initial Savings
          </label>
        </div>
        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            id="showContributions"
            checked={showContributions}
            onChange={() => setShowContributions(!showContributions)}
            className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="showContributions" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Contributions
          </label>
        </div>
        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            id="showTotal"
            checked={showTotal}
            onChange={() => setShowTotal(!showTotal)}
            className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="showTotal" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Savings
          </label>
        </div>
      </div>
      
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>This chart shows how your retirement savings are projected to grow over time.</p>
        <ul className="list-disc list-inside mt-2">
          <li><span className="text-teal-600 dark:text-teal-400 font-medium">Initial Savings</span>: Growth of your current savings with compound interest</li>
          <li><span className="text-purple-600 dark:text-purple-400 font-medium">Contributions</span>: Growth of your regular monthly contributions</li>
          <li><span className="text-rose-600 dark:text-rose-400 font-medium">Total Savings</span>: Combined value of initial savings and contributions</li>
        </ul>
      </div>
    </div>
  );
} 