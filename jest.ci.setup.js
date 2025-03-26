// Make tests fail on console.error and console.warn in CI
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = function (...args) {
  originalConsoleError.apply(console, args);
  throw new Error(`Test failed due to console.error: ${args.join(' ')}`);
};

console.warn = function (...args) {
  // Ignore specific React warnings that are not relevant
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    (args[0].includes('React does not recognize the') ||
     args[0].includes('Warning: Invalid DOM property') ||
     args[0].includes('Warning: Each child in a list should have a unique "key" prop'))
  ) {
    originalConsoleWarn.apply(console, args);
    return;
  }
  
  originalConsoleWarn.apply(console, args);
  throw new Error(`Test failed due to console.warn: ${args.join(' ')}`);
}; 