// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add better error handling and debugging
Cypress.on('fail', (error, runnable) => {
  // For debugging purposes
  console.error('Test failed: ', runnable.title);
  console.error('Error: ', error.message);
  
  // Allow the error to continue to be handled by Cypress
  throw error;
}); 