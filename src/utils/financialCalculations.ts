/**
 * Financial calculation utility functions for retirement planning
 * 
 * This module provides functions to calculate various aspects of retirement savings,
 * including compound interest, future value of contributions, and inflation adjustments.
 */

/**
 * Calculates the future value of a lump sum investment using compound interest
 * 
 * @param principal - The initial investment amount
 * @param annualRate - The annual interest rate as a percentage (e.g., 7 for 7%)
 * @param years - The number of years to compound
 * @param compoundingFrequency - Number of times interest is compounded per year (default: 1)
 * @returns The future value of the investment
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number = 1
): number {
  // Handle edge cases
  if (principal <= 0 || years < 0) {
    return principal;
  }
  
  if (annualRate <= 0) {
    return principal;
  }
  
  // Convert percentage to decimal
  const rate = annualRate / 100;
  
  // Calculate using the compound interest formula: A = P(1 + r/n)^(nt)
  const futureValue = principal * Math.pow(
    1 + rate / compoundingFrequency,
    compoundingFrequency * years
  );
  
  return futureValue;
}

/**
 * Calculates the future value of regular periodic contributions with compound interest
 * 
 * This function models monthly contributions over a period of years, with each
 * contribution growing with compound interest until the end date.
 * 
 * @param monthlyContribution - The amount contributed each month
 * @param annualRate - The annual interest rate as a percentage (e.g., 7 for 7%)
 * @param years - The number of years to contribute
 * @returns The future value of all contributions with compound interest
 */
export function calculateFutureValueOfContributions(
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  // Handle edge cases
  if (monthlyContribution <= 0 || years <= 0) {
    return 0;
  }
  
  // Special case for zero interest rate
  if (annualRate <= 0) {
    return monthlyContribution * 12 * years;
  }
  
  // Convert percentage to decimal and calculate monthly rate
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.round(years * 12);
  
  let futureValue = 0;
  
  // Loop through each month to add the contribution and compound the interest
  for (let month = 0; month < totalMonths; month++) {
    futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate);
  }
  
  return futureValue;
}

/**
 * Calculates the inflation-adjusted value of a future amount
 * 
 * This function converts a future value to present-day purchasing power,
 * accounting for the erosion of value due to inflation.
 * 
 * @param futureValue - The nominal value in the future
 * @param inflationRate - The annual inflation rate as a percentage (e.g., 2.5 for 2.5%)
 * @param years - The number of years
 * @returns The present value of the future amount, adjusted for inflation
 */
export function calculateInflationAdjustedValue(
  futureValue: number,
  inflationRate: number,
  years: number
): number {
  // Handle edge cases
  if (futureValue <= 0 || years <= 0) {
    return futureValue;
  }
  
  // Handle zero inflation
  if (inflationRate <= 0) {
    return futureValue;
  }
  
  // Convert percentage to decimal
  const rate = inflationRate / 100;
  
  // Calculate using the present value formula: PV = FV / (1 + r)^t
  const presentValue = futureValue / Math.pow(1 + rate, years);
  
  return presentValue;
}

/**
 * Calculates the total retirement savings with both initial savings and monthly contributions
 * 
 * This function combines the growth of initial savings and regular contributions
 * to determine total savings at retirement, as well as the inflation-adjusted value.
 * 
 * @param currentSavings - Current retirement savings amount
 * @param monthlyContribution - The amount contributed each month
 * @param annualReturnRate - The expected annual return rate as a percentage
 * @param years - The number of years until retirement
 * @param inflationRate - The expected annual inflation rate as a percentage
 * @returns An object containing total nominal savings and inflation-adjusted savings
 */
export function calculateRetirementSavings(
  currentSavings: number,
  monthlyContribution: number,
  annualReturnRate: number,
  years: number,
  inflationRate: number
): { totalSavings: number; inflationAdjustedSavings: number } {
  // Ensure positive values
  const initialSavings = Math.max(0, currentSavings);
  const contribution = Math.max(0, monthlyContribution);
  const returnRate = Math.max(0, annualReturnRate);
  const inflation = Math.max(0, inflationRate);
  const period = Math.max(0, years);
  
  // Calculate future value of current savings
  const futureValueOfCurrentSavings = calculateCompoundInterest(
    initialSavings,
    returnRate,
    period,
    1 // Annual compounding for simplicity
  );
  
  // Calculate future value of monthly contributions
  const futureValueOfContributions = calculateFutureValueOfContributions(
    contribution,
    returnRate,
    period
  );
  
  // Total nominal savings at retirement
  const totalSavings = futureValueOfCurrentSavings + futureValueOfContributions;
  
  // Inflation-adjusted value
  const inflationAdjustedSavings = calculateInflationAdjustedValue(
    totalSavings,
    inflation,
    period
  );
  
  return {
    totalSavings,
    inflationAdjustedSavings
  };
} 