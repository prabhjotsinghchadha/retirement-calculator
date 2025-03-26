'use client';

import { useState } from 'react';
import { 
  calculateCompoundInterest, 
  calculateFutureValueOfContributions, 
  calculateInflationAdjustedValue, 
  calculateRetirementSavings 
} from '../../utils/financialCalculations';

export type Currency = 'INR' | 'USD';

interface FormData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedRateOfReturn: number;
  inflationRate: number;
  currency: Currency;
}

interface InputFormProps {
  onSubmit: (data: FormData) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 1000000, // Default in INR
    monthlyContribution: 20000, // Default in INR
    expectedRateOfReturn: 7,
    inflationRate: 5, // Default inflation rate for India
    currency: 'INR',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name === 'currency') {
      // Convert values when changing currency
      const conversionRate = value === 'USD' ? 0.012 : 83.33; // Approximate INR to USD and USD to INR rates
      const previousCurrency = formData.currency;
      
      if (previousCurrency !== value) {
        setFormData((prev) => ({
          ...prev,
          currency: value as Currency,
          currentSavings: value === 'USD' 
            ? Math.round(prev.currentSavings * 0.012) 
            : Math.round(prev.currentSavings * 83.33),
          monthlyContribution: value === 'USD'
            ? Math.round(prev.monthlyContribution * 0.012)
            : Math.round(prev.monthlyContribution * 83.33),
        }));
      } else {
        setFormData((prev) => ({ ...prev, currency: value as Currency }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'currentAge' || name === 'retirementAge' 
          ? parseInt(value) || 0 
          : parseFloat(value) || 0,
      }));
    }
  };

  const validateInputs = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    // Current Age validation
    if (formData.currentAge === 0) {
      errors.currentAge = "Please enter your current age";
    } else if (formData.currentAge < 0) {
      errors.currentAge = "Age cannot be negative";
    } else if (formData.currentAge > 100) {
      errors.currentAge = "Please enter a valid age (0-100)";
    }
    
    // Retirement Age validation
    if (formData.retirementAge === 0) {
      errors.retirementAge = "Please enter your retirement age";
    } else if (formData.retirementAge <= formData.currentAge) {
      errors.retirementAge = "Retirement age must be greater than current age";
    } else if (formData.retirementAge > 120) {
      errors.retirementAge = "Please enter a reasonable retirement age (up to 120)";
    }
    
    // Current Savings validation
    if (formData.currentSavings < 0) {
      errors.currentSavings = "Current savings cannot be negative";
    } else if (isNaN(formData.currentSavings)) {
      errors.currentSavings = "Please enter a valid amount";
    }
    
    // Monthly Contribution validation
    if (formData.monthlyContribution < 0) {
      errors.monthlyContribution = "Monthly contribution cannot be negative";
    } else if (isNaN(formData.monthlyContribution)) {
      errors.monthlyContribution = "Please enter a valid amount";
    }
    
    // Expected Rate of Return validation
    if (formData.expectedRateOfReturn < 0) {
      errors.expectedRateOfReturn = "Rate of return cannot be negative";
    } else if (formData.expectedRateOfReturn > 30) {
      errors.expectedRateOfReturn = "Rate of return seems unrealistically high (max 30%)";
    } else if (isNaN(formData.expectedRateOfReturn)) {
      errors.expectedRateOfReturn = "Please enter a valid percentage";
    }
    
    // Inflation Rate validation
    if (formData.inflationRate < 0) {
      errors.inflationRate = "Inflation rate cannot be negative";
    } else if (formData.inflationRate > 20) {
      errors.inflationRate = "Inflation rate seems unrealistically high (max 20%)";
    } else if (isNaN(formData.inflationRate)) {
      errors.inflationRate = "Please enter a valid percentage";
    }
    
    return errors;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setShowValidationSummary(false);
    
    // Validate inputs
    const errors = validateInputs();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setShowValidationSummary(true);
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      // Simulate a delay to show loading state (remove in production)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Call the onSubmit callback with form data
      onSubmit(formData);
    } catch (error) {
      // Handle any unexpected errors
      console.error("Calculation error:", error);
      setFormErrors({
        general: "An error occurred during calculation. Please try again."
      });
      setShowValidationSummary(true);
    } finally {
      // End loading
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: formData.currency === 'INR' ? 1000000 : 12000,
      monthlyContribution: formData.currency === 'INR' ? 20000 : 240,
      expectedRateOfReturn: 7,
      inflationRate: 5,
      currency: formData.currency,
    });
    setFormErrors({});
    setShowValidationSummary(false);
  };

  const currencySymbol = formData.currency === 'INR' ? '₹' : '$';

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Retirement Calculator</h2>
      
      {showValidationSummary && Object.keys(formErrors).length > 0 && (
        <div className="mb-6 p-4 border border-red-400 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Please fix the following errors:</h3>
          <ul className="mt-2 text-sm text-red-700 dark:text-red-400 list-disc pl-5">
            {Object.values(formErrors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
          </select>
        </div>

        <div>
          <label htmlFor="currentAge" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Age
          </label>
          <input
            type="number"
            id="currentAge"
            name="currentAge"
            value={formData.currentAge}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.currentAge ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min="0"
            max="100"
            required
          />
          {formErrors.currentAge && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.currentAge}</p>
          )}
        </div>

        <div>
          <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Retirement Age
          </label>
          <input
            type="number"
            id="retirementAge"
            name="retirementAge"
            value={formData.retirementAge}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.retirementAge ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min={formData.currentAge + 1}
            max="120"
            required
          />
          {formErrors.retirementAge && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.retirementAge}</p>
          )}
        </div>

        <div>
          <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Savings ({currencySymbol})
          </label>
          <input
            type="number"
            id="currentSavings"
            name="currentSavings"
            value={formData.currentSavings}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.currentSavings ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min="0"
            step={formData.currency === 'INR' ? "10000" : "1000"}
            required
          />
          {formErrors.currentSavings && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.currentSavings}</p>
          )}
        </div>

        <div>
          <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Monthly Contribution ({currencySymbol})
          </label>
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={formData.monthlyContribution}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.monthlyContribution ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min="0"
            step={formData.currency === 'INR' ? "1000" : "50"}
            required
          />
          {formErrors.monthlyContribution && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.monthlyContribution}</p>
          )}
        </div>

        <div>
          <label htmlFor="expectedRateOfReturn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Expected Rate of Return (%)
          </label>
          <input
            type="number"
            id="expectedRateOfReturn"
            name="expectedRateOfReturn"
            value={formData.expectedRateOfReturn}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.expectedRateOfReturn ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min="0"
            max="30"
            step="0.1"
            required
          />
          {formErrors.expectedRateOfReturn && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.expectedRateOfReturn}</p>
          )}
        </div>

        <div>
          <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Inflation Rate (%)
          </label>
          <input
            type="number"
            id="inflationRate"
            name="inflationRate"
            value={formData.inflationRate}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 border ${formErrors.inflationRate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed`}
            min="0"
            max="20"
            step="0.1"
            required
          />
          {formErrors.inflationRate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.inflationRate}</p>
          )}
        </div>

        <div className="pt-4 flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </>
            ) : "Calculate"}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="flex-none py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
} 