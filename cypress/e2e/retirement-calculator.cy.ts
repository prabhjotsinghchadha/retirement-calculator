/// <reference types="cypress" />

describe('Retirement Calculator Application', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
    
    // Ensure the page has loaded
    cy.get('h1').contains('Retirement Calculator').should('be.visible');
  });

  it('displays the initial form with default values', () => {
    // Check that the form is displayed with default values
    cy.get('#currentAge').should('have.value', '30');
    cy.get('#retirementAge').should('have.value', '65');
    cy.get('#currentSavings').should('have.value', '1000000');
    cy.get('#monthlyContribution').should('have.value', '20000');
    cy.get('#expectedRateOfReturn').should('have.value', '7');
    cy.get('#inflationRate').should('have.value', '5');
    cy.get('#currency').should('have.value', 'INR');
    
    // Chart and results should not be visible initially
    cy.contains('Retirement Savings Growth').should('not.exist');
    cy.contains('Your Retirement Projection').should('not.exist');
  });

  it('validates inputs and shows appropriate error messages', () => {
    // Use custom command to fill form with invalid values
    cy.fillRetirementForm(0, 30, 1000000, 20000, 35, 5);
    
    // Submit the form
    cy.calculateRetirement();
    
    // Check for error messages
    cy.get('form').within(() => {
      cy.contains('Please enter your current age').should('be.visible');
    });
    
    // The chart should not be displayed when validation fails
    cy.contains('Retirement Savings Growth').should('not.exist');
  });

  it('calculates retirement savings correctly with default values', () => {
    // Fill with default values and submit
    cy.calculateRetirement();
    
    // Verify results with custom command
    cy.verifyRetirementResults(35); // 65 - 30 = 35
    
    // Verify the chart controls
    cy.contains('button', 'Initial Savings').should('be.visible');
    cy.contains('button', 'Contributions').should('be.visible');
    cy.contains('button', 'Total Savings').should('be.visible');
  });

  it('updates calculation when input values change', () => {
    // Use custom command to fill form with custom values
    cy.fillRetirementForm(40, 70, 2000000, 30000, 8, 4);
    
    // Calculate with custom values
    cy.calculateRetirement();
    
    // Verify results with custom command
    cy.verifyRetirementResults(30); // 70 - 40 = 30
    
    // Verify chart title is updated
    cy.contains('Retirement Savings Growth Over 30 Years').should('be.visible');
  });

  it('switches currency from INR to USD and adjusts values', () => {
    // Use custom command to fill form with USD currency
    cy.fillRetirementForm(30, 65, 1000000, 20000, 7, 5, 'USD');
    
    // Check that values are converted
    cy.get('#currentSavings').should('not.have.value', '1000000'); // Should be converted to USD
    cy.get('#monthlyContribution').should('not.have.value', '20000'); // Should be converted to USD
    
    // Calculate with USD
    cy.calculateRetirement();
    
    // Verify results show $ currency
    cy.contains('$').should('be.visible');
    cy.contains('dollars').should('be.visible');
  });

  it('toggles chart data series visibility', () => {
    // Calculate retirement first to display the chart
    cy.calculateRetirement();
    
    // Chart should be visible
    cy.contains('Retirement Savings Growth').should('be.visible');
    
    // Click on each button to toggle data series
    cy.contains('button', 'Initial Savings').click();
    cy.contains('button', 'Contributions').click();
    cy.contains('button', 'Total Savings').click();
    
    // Turn Total Savings back on
    cy.contains('button', 'Total Savings').click();
    
    // The chart should still be visible
    cy.contains('Retirement Savings Growth').should('be.visible');
  });

  it('resets form to default values', () => {
    // Change some values
    cy.fillRetirementForm(40, 70);
    
    // Reset the form using custom command
    cy.resetRetirementForm();
    
    // Check that values are reset to defaults
    cy.get('#currentAge').should('have.value', '30');
    cy.get('#retirementAge').should('have.value', '65');
  });

  it('handles edge case with current age equal to retirement age', () => {
    // Set current age and retirement age to the same value
    cy.fillRetirementForm(65, 65);
    
    // Submit the form
    cy.calculateRetirement();
    
    // Form should show validation error
    cy.get('form').within(() => {
      cy.contains('Retirement age must be greater than current age').should('be.visible');
    });
  });

  it('works on mobile viewport', () => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    
    // Calculate retirement
    cy.calculateRetirement();
    
    // Verify results and chart are displayed correctly
    cy.verifyRetirementResults(35);
    
    // Check the ordering of elements on mobile (chart should be first)
    cy.get('.order-1').should('exist');
  });

  it('handles large numbers correctly', () => {
    // Input very large values
    cy.fillRetirementForm(30, 65, 10000000, 100000); // 1 crore savings, 1 lakh monthly
    
    // Calculate retirement
    cy.calculateRetirement();
    
    // Results should show formatted large numbers
    cy.contains('Your Retirement Projection').should('be.visible');
    cy.get('.text-green-600').should('be.visible'); // Total savings element
    cy.get('.text-blue-600').should('be.visible'); // Inflation-adjusted savings element
  });

  it('handles special input validation scenarios', () => {
    // Test negative values
    cy.fillRetirementForm(-10, 65);
    cy.calculateRetirement();
    
    cy.get('form').within(() => {
      cy.contains('Age cannot be negative').should('be.visible');
    });
    
    // Reset and test too high expected return
    cy.resetRetirementForm();
    cy.fillRetirementForm(30, 65, 1000000, 20000, 40, 5);
    cy.calculateRetirement();
    
    cy.get('form').within(() => {
      cy.contains('Rate of return seems unrealistically high').should('be.visible');
    });
  });
}); 