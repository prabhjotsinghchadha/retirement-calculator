# Cypress E2E Tests for Retirement Calculator

This directory contains end-to-end tests for the Retirement Calculator application using Cypress.

## Test Files Overview

1. **`retirement-calculator.cy.ts`** - Individual test cases for each feature of the retirement calculator
2. **`end-to-end-flow.cy.ts`** - A comprehensive test that walks through the complete user flow

## Running the Tests

### Prerequisites

Make sure you have all dependencies installed:

```bash
npm install
```

### Running in Development Mode (Visual UI)

To run tests in the Cypress UI with a development server:

```bash
npm run test:e2e:dev
```

This will:
1. Start the Next.js development server
2. Open the Cypress test runner UI
3. Allow you to run tests interactively

### Running in Headless Mode (CI)

To run all tests in headless mode (good for CI pipelines):

```bash
npm run test:e2e
```

This will:
1. Start the Next.js production server
2. Run all Cypress tests in headless mode
3. Show the results in the terminal

### Running Specific Tests

To run a specific test file in the Cypress UI:

1. Start the Cypress UI with `npm run cypress`
2. Click on the test file you want to run

## Test Structure

Our tests follow a pattern of:

1. **Setup**: Visit the application and verify initial state
2. **Actions**: Interact with the application (fill forms, click buttons)
3. **Assertions**: Verify expected outcomes (correct calculations, UI changes)

## Custom Commands

We've created several custom Cypress commands to make tests more readable:

- `fillRetirementForm()` - Fill the retirement calculator form with custom values
- `calculateRetirement()` - Click the Calculate button and wait for results
- `resetRetirementForm()` - Click the Reset button
- `verifyRetirementResults()` - Verify that retirement results are displayed correctly

## Key Features Tested

- Form validation and error handling
- Calculations with different input values
- Currency switching (INR/USD)
- Chart display and interaction
- Responsive layout on different screen sizes
- Dark mode styling 