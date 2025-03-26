/// <reference types="cypress" />

describe('Retirement Calculator - Complete User Flow', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
    // Ensure the page has loaded
    cy.get('h1').contains('Retirement Calculator').should('be.visible');
  });

  it('completes a full retirement planning calculation', () => {
    // STEP 1: Verify initial form state
    cy.log('Step 1: Verify the initial form state with default values');
    cy.get('#currentAge').should('have.value', '30');
    cy.get('#retirementAge').should('have.value', '65');
    cy.get('#currentSavings').should('have.value', '1000000');
    cy.get('#monthlyContribution').should('have.value', '20000');
    cy.get('#expectedRateOfReturn').should('have.value', '7');
    cy.get('#inflationRate').should('have.value', '5');
    cy.get('#currency').should('have.value', 'INR');
    
    // STEP 2: Try submitting with validation error
    cy.log('Step 2: Test validation by setting current age higher than retirement age');
    cy.get('#currentAge').clear().type('70');
    cy.contains('button', 'Calculate').click();
    cy.get('form').within(() => {
      cy.contains('Retirement age must be greater than current age').should('be.visible');
    });
    
    // STEP 3: Fix the error and submit proper values
    cy.log('Step 3: Set valid values and calculate retirement');
    cy.get('#currentAge').clear().type('35');
    cy.get('#retirementAge').clear().type('65');
    cy.get('#currentSavings').clear().type('2500000');
    cy.get('#monthlyContribution').clear().type('50000');
    cy.get('#expectedRateOfReturn').clear().type('10');
    cy.get('#inflationRate').clear().type('6');
    cy.contains('button', 'Calculate').click();
    
    // STEP 4: Verify results are displayed
    cy.log('Step 4: Verify calculation results');
    cy.contains('Your Retirement Projection').should('be.visible');
    cy.contains('30 years').should('be.visible'); // 65 - 35 = 30
    cy.get('.text-green-600').should('be.visible'); // Total savings
    cy.get('.text-blue-600').should('be.visible'); // Inflation-adjusted savings
    
    // STEP 5: Verify chart is displayed and interact with it
    cy.log('Step 5: Verify chart and interact with data series toggles');
    cy.contains('Retirement Savings Growth').should('be.visible');
    
    // Toggle data series visibility
    cy.contains('button', 'Initial Savings').click();
    cy.contains('button', 'Initial Savings').click();
    cy.contains('button', 'Contributions').click();
    cy.contains('button', 'Contributions').click();
    
    // STEP 6: Change currency and verify conversion
    cy.log('Step 6: Change currency to USD and verify conversion');
    cy.get('#currency').select('USD');
    cy.get('#currentSavings').should('not.have.value', '2500000');
    cy.get('#monthlyContribution').should('not.have.value', '50000');
    
    // STEP 7: Calculate with USD and verify results
    cy.log('Step 7: Recalculate with USD currency');
    cy.contains('button', 'Calculate').click();
    cy.contains('$').should('be.visible');
    cy.contains('dollars').should('be.visible');
    
    // STEP 8: Reset form and verify defaults
    cy.log('Step 8: Reset form to defaults');
    cy.contains('button', 'Reset').click();
    cy.get('#currentAge').should('have.value', '30');
    cy.get('#retirementAge').should('have.value', '65');
    cy.get('#currency').should('have.value', 'USD'); // Currency should remain USD
    
    // STEP 9: Test mobile responsive layout
    cy.log('Step 9: Test mobile responsive layout');
    cy.viewport('iphone-x');
    cy.contains('button', 'Calculate').click();
    cy.get('.order-1').should('exist'); // Chart should be first on mobile
    
    // STEP 10: Verify dark mode styling (if supported)
    cy.log('Step 10: Verify dark mode styling classes exist');
    cy.get('.dark\\:bg-gray-800').should('exist');
    cy.get('.dark\\:text-white').should('exist');
  });
}); 