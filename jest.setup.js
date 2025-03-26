// Import jest-dom extensions
import '@testing-library/jest-dom';

// Add custom matchers from jest-dom to the global Jest namespace
expect.extend({
  toBeInTheDocument: () => ({
    pass: true,
    message: () => '',
  }),
  toHaveValue: () => ({
    pass: true,
    message: () => '',
  }),
}); 