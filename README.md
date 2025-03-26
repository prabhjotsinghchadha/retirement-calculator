# Retirement Calculator

A modern, responsive web application that helps users plan for retirement by visualizing savings growth over time. This calculator provides detailed projections based on current savings, monthly contributions, expected returns, and inflation rates.

![Retirement Calculator Screenshot](https://via.placeholder.com/800x400?text=Retirement+Calculator+Screenshot)

## 🌟 Features

- **Interactive Calculator**: Input your current age, retirement age, savings, and investment parameters
- **Visual Data Representation**: View your retirement savings growth with an interactive chart
- **Multiple Currency Support**: Switch between INR (₹) and USD ($) with automatic value conversion
- **Inflation Adjustment**: See how inflation impacts your retirement savings in today's value
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Mode Support**: Comfortable viewing in different lighting conditions
- **Data Series Toggling**: Interactively show/hide different data series on the chart

## 🔗 Live Demo

Check out the live application: [Retirement Calculator](https://retirement-calculator-tan.vercel.app)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/retirement-calc.git
cd retirement-calc

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📊 How It Works

The retirement calculator uses the following financial formulas to calculate your retirement savings:

1. **Compound Interest**: For initial savings growth
2. **Future Value of Contributions**: For monthly contribution growth
3. **Inflation Adjustment**: To calculate today's value of future money

The application visualizes these calculations using Chart.js to create an interactive retirement savings growth chart.

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

- **Framework**: [Next.js](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Testing**: 
  - [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests
  - [Cypress](https://www.cypress.io/) for E2E testing
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 💡 Use Cases

- **Young Professionals**: Start planning for retirement early and see the power of compound interest
- **Mid-Career Individuals**: Evaluate if current savings and contributions are on track for retirement
- **Near Retirement**: Fine-tune retirement plans and adjust for inflation
- **Financial Advisors**: Demonstrate retirement strategies to clients with visual projections

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

The layout, chart size, and controls adapt automatically to different screen sizes.

## 🔮 Future Enhancements

- Support for additional currencies
- Multiple retirement scenarios comparison
- Social security and pension integration
- Tax-efficient withdrawal strategies
- Downloadable PDF reports
- User accounts to save calculations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
