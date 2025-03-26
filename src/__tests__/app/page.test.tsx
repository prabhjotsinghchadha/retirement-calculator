import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home from '../../app/page';

// Mock the components used by the page
jest.mock('../../app/components/InputForm', () => ({
  __esModule: true,
  default: jest.fn(({ onSubmit }: { onSubmit: (data: any) => void }) => (
    <div data-testid="input-form-mock">
      <button onClick={() => onSubmit({
        currentAge: 35,
        retirementAge: 65,
        currentSavings: 2000000,
        monthlyContribution: 25000,
        expectedRateOfReturn: 8,
        inflationRate: 4,
        currency: 'INR'
      })}>
        Submit Form
      </button>
    </div>
  ))
}));

jest.mock('../../app/components/SavingsChart', () => ({
  __esModule: true,
  default: jest.fn(({ chartData }: { chartData: any }) => (
    <div data-testid="savings-chart-mock">
      Chart Component (Currency: {chartData.currency})
    </div>
  ))
}));

describe('Home page', () => {
  test('renders the page title and InputForm', () => {
    render(<Home />);
    
    // Check for header content
    expect(screen.getByText(/Retirement Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan your financial future/i)).toBeInTheDocument();
    
    // Check if Input Form is rendered
    expect(screen.getByTestId('input-form-mock')).toBeInTheDocument();
    
    // Chart should not be visible initially
    expect(screen.queryByTestId('savings-chart-mock')).toBe(null);
  });

  test('displays chart and results when form is submitted', () => {
    render(<Home />);
    
    // Simulate form submission using act to handle state updates
    act(() => {
      screen.getByText('Submit Form').click();
    });
    
    // Check that results are displayed
    expect(screen.getByText(/Years to Retirement/i)).toBeInTheDocument();
    expect(screen.getByText(/30 years/i)).toBeInTheDocument(); // 65 - 35 = 30
    
    // Check that currency symbol is shown - there are multiple instances
    const currencySymbols = screen.getAllByText(/₹/);
    expect(currencySymbols.length).toBeGreaterThan(0);
    
    // Chart should now be visible
    expect(screen.getByTestId('savings-chart-mock')).toBeInTheDocument();
  });
}); 