'use client';

import { useState } from 'react';
import InputForm, { Currency } from './components/InputForm';
import SavingsChart from './components/SavingsChart';
import { generateChartData, ChartData as RetirementChartData } from '../utils/chartDataUtils';
import { calculateRetirementSavings } from '../utils/financialCalculations';

interface FormData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedRateOfReturn: number;
  inflationRate: number;
  currency: Currency;
}

interface CalculationResult {
  totalSavings: number;
  inflationAdjustedSavings: number;
  yearsToRetirement: number;
}

export default function Home() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [chartData, setChartData] = useState<RetirementChartData | null>(null);
  
  const handleFormSubmit = (formData: FormData) => {
    // Calculate years to retirement
    const yearsToRetirement = formData.retirementAge - formData.currentAge;
    
    // Use utility functions to calculate retirement savings
    const { totalSavings, inflationAdjustedSavings } = calculateRetirementSavings(
      formData.currentSavings,
      formData.monthlyContribution,
      formData.expectedRateOfReturn,
      yearsToRetirement,
      formData.inflationRate
    );
    
    // Generate chart data
    const newChartData = generateChartData(
      formData.currentAge,
      formData.retirementAge,
      formData.currentSavings,
      formData.monthlyContribution,
      formData.expectedRateOfReturn,
      formData.inflationRate,
      formData.currency
    );
    
    // Set the result state
    setCalculationResult({
      totalSavings: Math.round(totalSavings),
      inflationAdjustedSavings: Math.round(inflationAdjustedSavings),
      yearsToRetirement,
    });
    
    // Set chart data
    setChartData(newChartData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white sm:tracking-tight">
            Retirement Calculator
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            Plan your financial future by estimating your retirement savings growth over time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-1/2">
            <InputForm onSubmit={handleFormSubmit} />
            
            {calculationResult && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Retirement Projection</h3>
                  <div className="ml-2 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Calculated
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Years to Retirement</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{calculationResult.yearsToRetirement} years</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Savings at Retirement</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {chartData?.currency === 'INR' ? '₹' : '$'}{calculationResult.totalSavings.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Inflation-Adjusted Savings</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {chartData?.currency === 'INR' ? '₹' : '$'}{calculationResult.inflationAdjustedSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      (Value in today's {chartData?.currency === 'INR' ? 'rupees' : 'dollars'})
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/2">
            {chartData && (
              <SavingsChart chartData={chartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
