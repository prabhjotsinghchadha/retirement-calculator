'use client';

import { useState } from 'react';
import InputForm, { Currency } from './components/InputForm';
import SavingsChart from './components/SavingsChart';
import { generateChartData, ChartData as RetirementChartData } from '../utils/chartDataUtils';
import { calculateRetirementSavings } from '../utils/financialCalculations';
import SEO from './components/SEO';

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
    <>
      <SEO />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-3 sm:py-8 sm:px-4 md:py-12 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white sm:tracking-tight">
              Retirement Calculator
            </h1>
            <p className="mt-2 sm:mt-3 max-w-md mx-auto text-sm sm:text-base text-gray-500 dark:text-gray-400 md:text-lg">
              Plan your financial future by estimating your retirement savings growth over time.
            </p>
            <div className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <p>Free online calculator to help you plan for retirement with personalized projections</p>
              <p className="mt-1">Calculate how much you need to save for a comfortable retirement</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 justify-center">
            <div className="w-full">
              <InputForm onSubmit={handleFormSubmit} />
            </div>
            
            {calculationResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-800 order-2 md:order-1">
                  <div className="flex flex-wrap items-center mb-4 gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Your Retirement Projection</h3>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        Calculated
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Years to Retirement</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-1">{calculationResult.yearsToRetirement} years</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Savings</p>
                      <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                        {chartData?.currency === 'INR' ? '₹' : '$'}{calculationResult.totalSavings.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Inflation-Adjusted</p>
                      <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {chartData?.currency === 'INR' ? '₹' : '$'}{calculationResult.inflationAdjustedSavings.toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
                        (In today&apos;s {chartData?.currency === 'INR' ? 'rupees' : 'dollars'})
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full order-1 md:order-2">
                  {chartData && (
                    <SavingsChart chartData={chartData} />
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Plan for Retirement?</h2>
              <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                <p>
                  Planning for retirement is crucial to ensure financial security in your later years. Our retirement calculator helps you:
                </p>
                <ul>
                  <li>Visualize how your savings will grow over time</li>
                  <li>Understand the impact of compound interest on long-term savings</li>
                  <li>See how inflation affects your purchasing power</li>
                  <li>Determine if you&apos;re saving enough to meet your retirement goals</li>
                  <li>Adjust your savings strategy based on projected outcomes</li>
                </ul>
                <p>
                  Start planning today to secure your financial future and enjoy a comfortable retirement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
