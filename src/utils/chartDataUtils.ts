import { Currency } from "../app/components/InputForm";

/**
 * Interface representing a data point for the retirement savings chart
 */
export interface SavingsDataPoint {
  year: number;
  age: number;
  initialSavingsValue: number;
  contributionsValue: number;
  totalValue: number;
}

/**
 * Interface for the chart data with metadata
 */
export interface ChartData {
  labels: string[];
  initialSavingsData: number[];
  contributionsData: number[];
  totalData: number[];
  currency: Currency;
  yearsToRetirement: number;
}

/**
 * Generates year-by-year data for the retirement savings chart
 * 
 * This function creates data points for each year from current age to retirement age,
 * tracking the growth of initial savings and monthly contributions separately.
 * 
 * @param currentAge - Current age of the user
 * @param retirementAge - Expected retirement age
 * @param currentSavings - Current savings amount
 * @param monthlyContribution - Monthly contribution amount
 * @param expectedRateOfReturn - Expected annual rate of return (percentage)
 * @param inflationRate - Expected annual inflation rate (percentage)
 * @param currency - Currency being used (INR or USD)
 * @returns Object with data arrays for chart rendering
 */
export function generateChartData(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  expectedRateOfReturn: number,
  inflationRate: number,
  currency: Currency
): ChartData {
  // Handle edge cases and ensure positive values
  const startAge = Math.max(0, currentAge);
  const endAge = Math.max(startAge, retirementAge);
  const initialSavings = Math.max(0, currentSavings);
  const contribution = Math.max(0, monthlyContribution);
  const returnRate = Math.max(0, expectedRateOfReturn);
  
  // Calculate years to retirement (handle same age case)
  const yearsToRetirement = Math.max(0, endAge - startAge);
  const dataPoints: SavingsDataPoint[] = [];
  
  // Convert percentage rates to decimals
  const annualRate = returnRate / 100;
  const monthlyRate = annualRate / 12;
  
  let initialSavingsValue = initialSavings;
  let contributionsValue = 0;
  
  // Generate data for each year
  for (let year = 0; year <= yearsToRetirement; year++) {
    const age = startAge + year;
    
    // For year 0, just use initial values
    if (year === 0) {
      dataPoints.push({
        year,
        age,
        initialSavingsValue,
        contributionsValue: 0,
        totalValue: initialSavingsValue
      });
      continue;
    }
    
    // Calculate growth of initial savings (compounding annually)
    initialSavingsValue = initialSavingsValue * (1 + annualRate);
    
    // For zero or negative return rate, simplify calculations
    if (returnRate <= 0) {
      contributionsValue += contribution * 12;
    } else {
      // For the first year, we only have new contributions
      if (year === 1) {
        contributionsValue = calculateYearlyContributionsValue(contribution, monthlyRate);
      } else {
        // For subsequent years, we grow previous contributions plus add new ones
        contributionsValue = contributionsValue * (1 + annualRate) + 
          calculateYearlyContributionsValue(contribution, monthlyRate);
      }
    }
    
    const totalValue = initialSavingsValue + contributionsValue;
    
    dataPoints.push({
      year,
      age,
      initialSavingsValue: Math.round(initialSavingsValue),
      contributionsValue: Math.round(contributionsValue),
      totalValue: Math.round(totalValue)
    });
  }
  
  // Extract arrays needed for the chart
  const labels = dataPoints.map(point => `Age ${point.age}`);
  const initialSavingsData = dataPoints.map(point => point.initialSavingsValue);
  const contributionsData = dataPoints.map(point => point.contributionsValue);
  const totalData = dataPoints.map(point => point.totalValue);
  
  return {
    labels,
    initialSavingsData,
    contributionsData,
    totalData,
    currency,
    yearsToRetirement
  };
}

/**
 * Helper function to calculate the value of monthly contributions over one year
 * with compounding interest each month
 * 
 * @param monthlyContribution - Monthly contribution amount
 * @param monthlyRate - Monthly interest rate as a decimal
 * @returns Total value of contributions at the end of the year with compounding
 */
function calculateYearlyContributionsValue(
  monthlyContribution: number,
  monthlyRate: number
): number {
  // Handle edge cases
  if (monthlyContribution <= 0 || monthlyRate < 0) {
    return 0;
  }
  
  // For zero interest rate, simplify calculation
  if (monthlyRate === 0) {
    return monthlyContribution * 12;
  }
  
  let value = 0;
  
  // Calculate the value of each month's contribution at the end of the year
  for (let month = 0; month < 12; month++) {
    // Number of months of compounding this contribution receives
    const monthsRemaining = 12 - month;
    // Add contribution with the appropriate compounding
    value += monthlyContribution * Math.pow(1 + monthlyRate, monthsRemaining);
  }
  
  return value;
} 