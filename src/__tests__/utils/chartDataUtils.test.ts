import { generateChartData } from '../../utils/chartDataUtils';

describe('generateChartData', () => {
  test('should generate correct data structure', () => {
    const chartData = generateChartData(30, 40, 100000, 5000, 7, 3, 'INR');
    
    // Check the structure of the returned data
    expect(chartData).toHaveProperty('labels');
    expect(chartData).toHaveProperty('initialSavingsData');
    expect(chartData).toHaveProperty('contributionsData');
    expect(chartData).toHaveProperty('totalData');
    expect(chartData).toHaveProperty('currency', 'INR');
    expect(chartData).toHaveProperty('yearsToRetirement', 10);
  });
  
  test('should generate correct number of data points', () => {
    // For a 20 year period, we should have 21 data points (including year 0)
    const chartData = generateChartData(35, 55, 200000, 10000, 8, 4, 'USD');
    
    expect(chartData.labels.length).toBe(21); // 20 years + initial year
    expect(chartData.initialSavingsData.length).toBe(21);
    expect(chartData.contributionsData.length).toBe(21);
    expect(chartData.totalData.length).toBe(21);
  });
  
  test('initial values at year 0 should be correct', () => {
    const initialSavings = 500000;
    const chartData = generateChartData(40, 60, initialSavings, 15000, 6, 3, 'INR');
    
    // At year 0, initialSavingsData should equal initial savings
    expect(chartData.initialSavingsData[0]).toBe(initialSavings);
    
    // At year 0, contributions should be 0
    expect(chartData.contributionsData[0]).toBe(0);
    
    // At year 0, total should equal initial savings
    expect(chartData.totalData[0]).toBe(initialSavings);
  });
  
  test('total value should be sum of initial savings and contributions', () => {
    const chartData = generateChartData(45, 65, 1000000, 30000, 9, 5, 'INR');
    
    // For each year, total should be approximately equal to initialSavings + contributions
    for (let i = 0; i < chartData.totalData.length; i++) {
      // Allow a small difference (±1) due to floating point calculations
      const diff = Math.abs(chartData.totalData[i] - (chartData.initialSavingsData[i] + chartData.contributionsData[i]));
      expect(diff).toBeLessThanOrEqual(1);
    }
  });
  
  test('should handle edge case with zero years to retirement', () => {
    const chartData = generateChartData(65, 65, 2000000, 0, 5, 2, 'USD');
    
    // Should have just one data point
    expect(chartData.labels.length).toBe(1);
    expect(chartData.initialSavingsData.length).toBe(1);
    expect(chartData.contributionsData.length).toBe(1);
    expect(chartData.totalData.length).toBe(1);
    
    // Values should be initial amounts
    expect(chartData.initialSavingsData[0]).toBe(2000000);
    expect(chartData.contributionsData[0]).toBe(0);
    expect(chartData.totalData[0]).toBe(2000000);
  });
}); 