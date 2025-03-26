// Type definitions for @testing-library/jest-dom
// See also: https://github.com/testing-library/jest-dom

/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    // DOM Testing Library Matchers
    toBeInTheDocument(): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | number | string[]): R;
    toBeChecked(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeEmpty(): R;
    toBeEmptyDOMElement(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toBeVisible(): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(htmlText: string): R;
    toHaveAccessibleDescription(description?: string | RegExp): R;
    toHaveAccessibleName(name?: string | RegExp): R;
    toHaveAttribute(attr: string, value?: any): R;
    toHaveClass(...classNames: string[]): R;
    toHaveFocus(): R;
    toHaveFormValues(values: { [name: string]: any }): R;
    toHaveStyle(css: string | object): R;
    
    // Jest Matchers
    toBeCloseTo(number: number, numDigits?: number): R;
    toBe(expected: any): R;
    toHaveBeenCalled(): R;
    toHaveBeenCalledTimes(n: number): R;
    toHaveBeenCalledWith(...args: any[]): R;
    toHaveProperty(keyPath: string, value?: any): R;
    toBeLessThan(number: number): R;
    toBeGreaterThan(number: number): R;
    toBeLessThanOrEqual(number: number): R;
    toBeGreaterThanOrEqual(number: number): R;
  }
}

// Extend the Expect interface for objectContaining
declare namespace jest {
  interface Expect {
    objectContaining<T>(obj: T): T;
  }
} 