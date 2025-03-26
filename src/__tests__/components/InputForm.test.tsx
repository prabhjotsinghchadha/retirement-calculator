import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputForm from '../../app/components/InputForm';

// Mock setTimeout to speed up tests
jest.useFakeTimers();

describe('InputForm', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    // Clear mock before each test
    mockOnSubmit.mockClear();
  });
  
  test('renders all input fields correctly', () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Check for all form elements
    expect(screen.getByLabelText(/Current Age/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Retirement Age/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Savings/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Contribution/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expected Rate of Return/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Inflation Rate/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Currency/)).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });
  
  test('initializes with default values', () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Check default values
    expect(screen.getByLabelText(/Current Age/)).toHaveValue(30);
    expect(screen.getByLabelText(/Retirement Age/)).toHaveValue(65);
    expect(screen.getByLabelText(/Current Savings/)).toHaveValue(1000000);
    expect(screen.getByLabelText(/Monthly Contribution/)).toHaveValue(20000);
    expect(screen.getByLabelText(/Expected Rate of Return/)).toHaveValue(7);
    expect(screen.getByLabelText(/Inflation Rate/)).toHaveValue(5);
    
    // Check default currency
    const currencySelect = screen.getByLabelText(/Currency/) as HTMLSelectElement;
    expect(currencySelect.value).toBe('INR');
  });
  
  test('validates form inputs and shows error messages', async () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Set invalid values
    fireEvent.change(screen.getByLabelText(/Current Age/), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/), { target: { value: '30' } }); // Same as current age
    fireEvent.change(screen.getByLabelText(/Expected Rate of Return/), { target: { value: '35' } }); // Too high
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    
    // Check for error messages - look for text nodes near input fields
    await waitFor(() => {
      // The validation summary should be visible (container element)
      const errorSummary = screen.getByRole('list'); // The error list
      expect(errorSummary).toBeInTheDocument();
      
      // Check that onSubmit was not called (validation failed)
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
  
  test('reset button restores default values', () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Change values
    fireEvent.change(screen.getByLabelText(/Current Age/), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/), { target: { value: '70' } });
    
    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    
    // Check if values are restored
    expect(screen.getByLabelText(/Current Age/)).toHaveValue(30);
    expect(screen.getByLabelText(/Retirement Age/)).toHaveValue(65);
  });
  
  test('currency change updates values', () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Get initial INR values
    const initialSavings = (screen.getByLabelText(/Current Savings/) as HTMLInputElement).value;
    const initialContribution = (screen.getByLabelText(/Monthly Contribution/) as HTMLInputElement).value;
    
    // Change currency to USD
    fireEvent.change(screen.getByLabelText(/Currency/), { target: { value: 'USD' } });
    
    // Check if values are converted
    const usdSavings = (screen.getByLabelText(/Current Savings/) as HTMLInputElement).value;
    const usdContribution = (screen.getByLabelText(/Monthly Contribution/) as HTMLInputElement).value;
    
    // USD values should be smaller due to conversion rate
    expect(Number(usdSavings)).toBeLessThan(Number(initialSavings));
    expect(Number(usdContribution)).toBeLessThan(Number(initialContribution));
  });
  
  test('submits form with correct values when valid', async () => {
    render(<InputForm onSubmit={mockOnSubmit} />);
    
    // Change some values
    fireEvent.change(screen.getByLabelText(/Current Age/), { target: { value: '35' } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/), { target: { value: '68' } });
    fireEvent.change(screen.getByLabelText(/Current Savings/), { target: { value: '1500000' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    
    // Fast-forward timer to get past the loading delay
    jest.advanceTimersByTime(1000);
    
    // Check if onSubmit was called with correct values
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        currentAge: 35,
        retirementAge: 68,
        currentSavings: 1500000,
        currency: 'INR'
      }));
    });
  });
}); 