/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Extend the Cypress namespace to include custom commands
declare namespace Cypress {
  interface Chainable {
    /**
     * Fill retirement calculator form with custom values
     * @param currentAge Current age value
     * @param retirementAge Retirement age value
     * @param currentSavings Current savings amount
     * @param monthlyContribution Monthly contribution amount
     * @param expectedRateOfReturn Expected rate of return percentage
     * @param inflationRate Inflation rate percentage
     * @param currency Currency selection (INR or USD)
     */
    fillRetirementForm(
      currentAge?: number,
      retirementAge?: number,
      currentSavings?: number,
      monthlyContribution?: number,
      expectedRateOfReturn?: number,
      inflationRate?: number,
      currency?: 'INR' | 'USD'
    ): void;

    /**
     * Calculate retirement based on form inputs
     */
    calculateRetirement(): void;

    /**
     * Reset the retirement calculator form
     */
    resetRetirementForm(): void;

    /**
     * Verify retirement results are displayed
     * @param yearsToRetirement Expected years to retirement
     */
    verifyRetirementResults(yearsToRetirement: number): void;
  }
}

// Fill the retirement calculator form with provided values
Cypress.Commands.add('fillRetirementForm', (
  currentAge = 30,
  retirementAge = 65,
  currentSavings = 1000000,
  monthlyContribution = 20000,
  expectedRateOfReturn = 7,
  inflationRate = 5,
  currency = 'INR'
) => {
  // Clear and set currency first (as it may affect other values)
  if (currency !== 'INR') {
    cy.get('#currency').select(currency);
    // Allow time for currency conversion
    cy.wait(100);
  }
  
  // Fill form fields
  cy.get('#currentAge').clear().type(currentAge.toString());
  cy.get('#retirementAge').clear().type(retirementAge.toString());
  cy.get('#currentSavings').clear().type(currentSavings.toString());
  cy.get('#monthlyContribution').clear().type(monthlyContribution.toString());
  cy.get('#expectedRateOfReturn').clear().type(expectedRateOfReturn.toString());
  cy.get('#inflationRate').clear().type(inflationRate.toString());
});

// Calculate retirement based on current form inputs
Cypress.Commands.add('calculateRetirement', () => {
  cy.contains('button', 'Calculate').click();
  // Allow time for calculations
  cy.wait(1000);
});

// Reset the retirement calculator form
Cypress.Commands.add('resetRetirementForm', () => {
  cy.contains('button', 'Reset').click();
});

// Verify retirement results are displayed with expected years
Cypress.Commands.add('verifyRetirementResults', (yearsToRetirement) => {
  cy.contains('Your Retirement Projection').should('be.visible');
  cy.contains(`${yearsToRetirement} years`).should('be.visible');
  cy.contains('Retirement Savings Growth').should('be.visible');
}); 