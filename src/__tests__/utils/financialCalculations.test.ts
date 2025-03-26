import { 
  calculateCompoundInterest, 
  calculateFutureValueOfContributions, 
  calculateInflationAdjustedValue,
  calculateRetirementSavings
} from '../../utils/financialCalculations';

describe('calculateCompoundInterest', () => {
  test('should correctly calculate compound interest for a simple case', () => {
    // $1000 at 10% for 1 year = $1100
    const result = calculateCompoundInterest(1000, 10, 1);
    expect(result).toBeCloseTo(1100);
  });

  test('should correctly calculate compound interest over multiple years', () => {
    // $1000 at 5% for 10 years = $1628.89...
    const result = calculateCompoundInterest(1000, 5, 10);
    expect(result).toBeCloseTo(1628.89, 1);
  });

  test('should handle zero interest rate', () => {
    // $5000 at 0% for any number of years should remain $5000
    const result = calculateCompoundInterest(5000, 0, 5);
    expect(result).toBe(5000);
  });

  test('should handle zero principal', () => {
    // $0 at any interest rate for any number of years should remain $0
    const result = calculateCompoundInterest(0, 7, 10);
    expect(result).toBe(0);
  });

  test('should correctly calculate with different compounding frequencies', () => {
    // $1000 at 12% for 1 year:
    // - Annually (n=1): $1120
    // - Monthly (n=12): $1126.83...
    const annualResult = calculateCompoundInterest(1000, 12, 1, 1);
    const monthlyResult = calculateCompoundInterest(1000, 12, 1, 12);
    
    expect(annualResult).toBeCloseTo(1120);
    expect(monthlyResult).toBeCloseTo(1126.83, 1);
    expect(monthlyResult).toBeGreaterThan(annualResult);
  });
});

describe('calculateFutureValueOfContributions', () => {
  test('should correctly calculate future value for monthly contributions', () => {
    // $100 monthly at 6% for 1 year
    const result = calculateFutureValueOfContributions(100, 6, 1);
    expect(result).toBeCloseTo(1240, 0);
  });
  
  test('should handle zero contribution', () => {
    // $0 monthly at any rate for any time should be $0
    const result = calculateFutureValueOfContributions(0, 5, 10);
    expect(result).toBe(0);
  });
  
  test('should handle zero interest rate', () => {
    // $200 monthly at 0% for 2 years = 24 months * $200 = $4800
    const result = calculateFutureValueOfContributions(200, 0, 2);
    expect(result).toBeCloseTo(4800);
  });
  
  test('should scale properly with time', () => {
    // Contributions for 2 years should be more than twice contributions for 1 year
    // (due to compound interest)
    const oneYearResult = calculateFutureValueOfContributions(500, 7, 1);
    const twoYearResult = calculateFutureValueOfContributions(500, 7, 2);
    
    expect(twoYearResult).toBeGreaterThan(oneYearResult * 2);
  });
});

describe('calculateInflationAdjustedValue', () => {
  test('should correctly adjust for inflation', () => {
    // $10000 with 3% inflation for 10 years
    const result = calculateInflationAdjustedValue(10000, 3, 10);
    expect(result).toBeCloseTo(7440.94, 1);
  });
  
  test('should handle zero inflation', () => {
    // With 0% inflation, present value equals future value
    const result = calculateInflationAdjustedValue(5000, 0, 20);
    expect(result).toBe(5000);
  });
  
  test('should handle zero years', () => {
    // With 0 years, present value equals future value
    const result = calculateInflationAdjustedValue(7500, 5, 0);
    expect(result).toBe(7500);
  });
  
  test('should handle high inflation rates', () => {
    // $1000 with 20% inflation for 5 years
    const result = calculateInflationAdjustedValue(1000, 20, 5);
    expect(result).toBeCloseTo(401.88, 1);
  });
});

describe('calculateRetirementSavings', () => {
  test('should correctly calculate total and inflation-adjusted retirement savings', () => {
    // Initial: $10000, Monthly: $500, Rate: 7%, Years: 30, Inflation: 3%
    const { totalSavings, inflationAdjustedSavings } = calculateRetirementSavings(
      10000, 500, 7, 30, 3
    );
    
    // Expected totalSavings based on actual calculated value
    expect(totalSavings).toBeGreaterThan(650000);
    expect(totalSavings).toBeLessThan(750000);
    
    // Expected inflationAdjustedSavings based on actual calculated value
    expect(inflationAdjustedSavings).toBeGreaterThan(250000);
    expect(inflationAdjustedSavings).toBeLessThan(350000);
  });
  
  test('should handle case with only initial savings, no contributions', () => {
    // Initial: $50000, Monthly: $0, Rate: 5%, Years: 20, Inflation: 2%
    const { totalSavings, inflationAdjustedSavings } = calculateRetirementSavings(
      50000, 0, 5, 20, 2
    );
    
    // Expected values based on actual calculations
    expect(totalSavings).toBeCloseTo(132700, -2);
    expect(inflationAdjustedSavings).toBeCloseTo(89300, -2);
  });
  
  test('should handle case with only contributions, no initial savings', () => {
    // Initial: $0, Monthly: $1000, Rate: 6%, Years: 25, Inflation: 2.5%
    const { totalSavings, inflationAdjustedSavings } = calculateRetirementSavings(
      0, 1000, 6, 25, 2.5
    );
    
    // Verify we get reasonable results
    expect(totalSavings).toBeGreaterThan(0);
    expect(inflationAdjustedSavings).toBeGreaterThan(0);
    expect(inflationAdjustedSavings).toBeLessThan(totalSavings);
  });
  
  test('should handle edge case with zero interest rate and zero inflation', () => {
    // Initial: $20000, Monthly: $2000, Rate: 0%, Years: 10, Inflation: 0%
    const { totalSavings, inflationAdjustedSavings } = calculateRetirementSavings(
      20000, 2000, 0, 10, 0
    );
    
    // Expected totalSavings = $20000 + (2000 * 12 * 10) = $260,000
    expect(totalSavings).toBe(260000);
    
    // With zero inflation, adjusted value should equal total value
    expect(inflationAdjustedSavings).toBe(totalSavings);
  });
}); 