# React Business Dashboard

A responsive business dashboard built with React, TypeScript, and Vite. This portfolio project demonstrates dashboard UI development, interactive data tables, client-side filtering and sorting, reporting, and CSV export.

## Features

- **Business summary cards** — display sample revenue, orders, customers, and conversion metrics.
- **Orders table** — display order IDs, customers, dates, amounts, and statuses.
- **Search** — find orders by order ID or customer name.
- **Status filtering** — filter orders by Completed, Pending, or Cancelled.
- **Sorting** — sort by Order ID, Customer, and Date.
- **Reports popup** — view order counts by status and the total value of displayed orders.
- **CSV export** — export the currently filtered and sorted orders.
- **Responsive layout** — adapt the interface for desktop and smaller screens.

## Technology Stack

- React
- TypeScript
- Vite
- CSS
- ESLint

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

Clone the repository, then open a terminal in the project directory and run:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown in your terminal.

### Run lint checks

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

The production files are generated in the `dist` directory.

## Sample Data

This project uses static sample data for demonstration purposes. It does not currently connect to a live database or backend API. The summary cards use illustrative sample metrics, while the reports popup calculates its totals from the orders currently displayed.

## Skills Demonstrated

- Building reusable, typed React UI components
- Managing interactive UI state with React hooks
- Searching, filtering, and sorting tabular data
- Calculating report metrics from displayed data
- Generating and downloading CSV files in the browser
- Creating responsive layouts with CSS
- Running lint checks and production builds

## Future Improvements

- Connect to a backend REST API
- Add automated tests for search, filtering, sorting, and CSV export
- Add pagination when working with larger datasets
- Deploy a live demo

## Project Status

The core dashboard features are implemented. ESLint checks and the production build have completed successfully in the development environment.

---

**Note:** This is a portfolio demonstration project, and all displayed business and customer data is fictional.