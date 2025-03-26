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
import { useState, useEffect } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: isMobile ? 'bottom' as const : 'top' as const,
        labels: {
          boxWidth: isMobile ? 12 : 40,
          padding: isMobile ? 10 : 20,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: `Retirement Savings Growth Over ${chartData.yearsToRetirement} Years`,
        font: {
          size: isMobile ? 14 : 16,
        },
        padding: {
          top: 10,
          bottom: isMobile ? 5 : 10
        }
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
          },
          font: {
            size: isMobile ? 9 : 11
          }
        },
        title: {
          display: !isMobile,
          text: `Value (${chartData.currency})`,
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      },
      x: {
        ticks: {
          maxRotation: isMobile ? 45 : 0,
          font: {
            size: isMobile ? 9 : 11
          }
        },
        title: {
          display: !isMobile,
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
    <div className="w-full p-3 sm:p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 justify-center">
        <button
          onClick={() => setShowInitialSavings(!showInitialSavings)}
          className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
            showInitialSavings 
              ? 'bg-teal-100 text-teal-800 border border-teal-200 dark:bg-teal-900 dark:text-teal-300 dark:border-teal-800' 
              : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
          }`}
        >
          <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full mr-1.5 bg-teal-500 ${showInitialSavings ? 'opacity-100' : 'opacity-40'}`}></div>
          Initial Savings
        </button>
        <button
          onClick={() => setShowContributions(!showContributions)}
          className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
            showContributions 
              ? 'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800' 
              : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
          }`}
        >
          <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full mr-1.5 bg-purple-500 ${showContributions ? 'opacity-100' : 'opacity-40'}`}></div>
          Contributions
        </button>
        <button
          onClick={() => setShowTotal(!showTotal)}
          className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
            showTotal 
              ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-800' 
              : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
          }`}
        >
          <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full mr-1.5 bg-rose-500 ${showTotal ? 'opacity-100' : 'opacity-40'}`}></div>
          Total Savings
        </button>
      </div>
      
      <div className={`${isMobile ? 'h-[300px]' : 'h-[400px]'} w-full`}>
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <p className="text-center sm:text-left">This chart shows how your retirement savings are projected to grow over time.</p>
        <ul className="list-none sm:list-disc sm:list-inside mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <li className="flex sm:block items-center">
            <span className="inline-block h-2 w-2 sm:hidden rounded-full bg-teal-500 mr-1.5"></span>
            <span className="text-teal-600 dark:text-teal-400 font-medium">Initial Savings:</span> Growth with compound interest
          </li>
          <li className="flex sm:block items-center">
            <span className="inline-block h-2 w-2 sm:hidden rounded-full bg-purple-500 mr-1.5"></span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">Contributions:</span> Growth of monthly additions
          </li>
          <li className="flex sm:block items-center">
            <span className="inline-block h-2 w-2 sm:hidden rounded-full bg-rose-500 mr-1.5"></span>
            <span className="text-rose-600 dark:text-rose-400 font-medium">Total Savings:</span> Combined value
          </li>
        </ul>
      </div>
    </div>
  );
} 