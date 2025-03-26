# Retirement Calculator

[![CI Status](https://github.com/yourusername/retirement-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/retirement-calculator/actions/workflows/ci.yml)
[![Deployment Status](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://retirement-calculator-tan.vercel.app)

A modern, responsive web application that helps users plan for retirement by visualizing savings growth over time.
This calculator provides detailed projections based on current savings, monthly contributions, expected returns, and inflation rates.

![Retirement Calculator Screenshot](https://via.placeholder.com/800x400?text=Retirement+Calculator+Screenshot)

## 🌟 Features

-   **Interactive Calculator**: Input your current age, retirement age, savings, and investment parameters
-   **Visual Data Representation**: View your retirement savings growth with an interactive chart
-   **Multiple Currency Support**: Switch between INR (₹) and USD ($) with automatic value conversion
-   **Inflation Adjustment**: See how inflation impacts your retirement savings in today's value
-   **Responsive Design**: Optimized for both desktop and mobile devices
-   **Dark Mode Support**: Comfortable viewing in different lighting conditions
-   **Data Series Toggling**: Interactively show/hide different data series on the chart

## 🔗 Live Demo

Check out the live application: [Retirement Calculator](https://retirement-calculator-tan.vercel.app)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.0.0 or higher
-   npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/retirement-calculator.git
    cd retirement-calculator
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Available Scripts

-   `npm run dev` - Start the development server
-   `npm run build` - Build the application for production
-   `npm start` - Start the production server
-   `npm run lint` - Run ESLint to check code quality
-   `npm run lint:md` - Lint markdown files using markdownlint
-   `npm run type-check` - Run TypeScript type checking
-   `npm test` - Run tests using Jest
-   `npm run test:watch` - Run tests in watch mode
-   `npm run test:coverage` - Run tests with coverage report
-   `npm run test:all` - Run all tests in the **tests** directory
-   `npm run cypress` - Open Cypress for E2E testing
-   `npm run test:e2e` - Run E2E tests in headless mode

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and Vercel for continuous deployment.

### GitHub Actions

Two workflow files are provided:

1. **CI Only** (`.github/workflows/ci.yml`): Runs tests and type checking but doesn't handle deployment.
   Use this if you're using Vercel's GitHub integration for automatic deployments.

2. **Full CI/CD** (`.github/workflows/ci-cd.yml`): Handles both testing and deployment to Vercel.

### Setting Up Vercel Deployment

#### Option 1: Vercel GitHub Integration (Recommended)

1. Connect your GitHub repository to Vercel through their dashboard
2. Use the CI-only workflow file (no additional setup required)

#### Option 2: GitHub Actions Deployment

If using the full CI/CD workflow, add these repository secrets:

-   `VERCEL_TOKEN`: Your Vercel API token (from Vercel account settings)
-   `VERCEL_ORG_ID`: Your Vercel organization ID
-   `VERCEL_PROJECT_ID`: Your Vercel project ID

To find your Vercel project and org IDs, run:

```bash
npx vercel login
npx vercel link
```

### Workflow Status

You can view the status of all workflows in the "Actions" tab of your GitHub repository.

## 📊 How It Works

The retirement calculator uses compound interest principles to project how your savings will grow over time. It takes into account:

-   Your current age and target retirement age
-   Initial savings amount
-   Monthly contribution amount
-   Expected annual rate of return on investments
-   Expected annual inflation rate

The calculator generates:

1. A projected growth chart showing the breakdown of initial savings growth, contribution growth, and total savings
2. An estimate of total retirement savings
3. The inflation-adjusted value (in today's money)

## 🧪 Testing

### Unit Tests

The application includes comprehensive unit tests for all financial calculations and components:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

### End-to-End Tests

We use Cypress for E2E testing to ensure the application works correctly from a user's perspective:

```bash
# Open Cypress UI for interactive testing
npm run cypress

# Run all E2E tests headlessly
npm run test:e2e

# Run E2E tests with a development server
npm run test:e2e:dev
```

## 🛠️ Technologies Used

-   **Framework**: [Next.js](https://nextjs.org/)
-   **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Charts**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
-   **Testing**:
-   [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests
-   [Cypress](https://www.cypress.io/) for E2E testing
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 💡 Use Cases

-   **Young Professionals**: Start planning for retirement early and see the power of compound interest
-   **Mid-Career Individuals**: Evaluate if current savings and contributions are on track for retirement
-   **Near Retirement**: Fine-tune retirement plans and adjust for inflation
-   **Financial Advisors**: Demonstrate retirement strategies to clients with visual projections

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:

-   Desktop computers
-   Tablets
-   Mobile phones

The layout, chart size, and controls adapt automatically to different screen sizes.

## 🔮 Future Enhancements

-   Support for additional currencies
-   Multiple retirement scenarios comparison
-   Social security and pension integration
-   Tax-efficient withdrawal strategies
-   Downloadable PDF reports
-   User accounts to save calculations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
