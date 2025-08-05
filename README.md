Chart Visualization Application
This project is a React application that visualizes data from a data.json file. It's designed to dynamically render either a single-series or multi-series line chart using the D3.js library, based on the structure of the data it receives.

Features
Dynamic Chart Rendering: Automatically determines if a chart is single-series or multi-series based on the data structure.

D3.js Integration: Leverages the power of D3.js for creating responsive and interactive data visualizations.

Component-Based: Built with reusable React components (SingleSeriesChart.tsx, MultiSeriesChart.tsx) for a clean and maintainable codebase.

Type-Safe: Uses TypeScript to define data types, ensuring data consistency and reducing runtime errors.

Error Handling: Displays a user-friendly error message if the data fails to load.

Responsive Design: The charts are designed to be responsive and adapt to different screen sizes.

Project Structure
src/App.tsx: The main application component. It fetches data from data.json and renders the appropriate chart component based on the data's type.

src/components/SingleSeriesChart.tsx: A React component responsible for rendering a line chart for a single series of data using D3.js.

src/components/MultiSeriesChart.tsx: A React component for rendering a line chart with up to three different data series, also using D3.js.

src/types/chart.ts: Defines the TypeScript interfaces and types used throughout the application, including ChartData, SingleSeriesData, and MultiSeriesData. It also includes type-guard functions isSingleSeries and isMultiSeries to help with data validation.

Data Structure
The application expects a data.json file at the root of the project. This file should contain an array of objects, where each object represents a chart to be rendered.

An example data.json could look like this:

[
  {
    "title": "Single Series Example",
    "data": [
      [1, 10],
      [2, 25],
      [3, 18],
      [4, 30]
    ]
  },
  {
    "title": "Multi Series Example",
    "data": [
      [1, [10, 15, 5]],
      [2, [25, 20, 12]],
      [3, [18, 15, 8]],
      [4, [30, 22, 10]]
    ]
  }
]

title: The title of the chart.

data: An array of [timestamp, value] pairs for single-series charts, or [timestamp, [value1, value2, value3]] for multi-series charts.

Installation and Usage
To run this project, you will need a modern JavaScript development environment.

Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd <project-name>

Install dependencies:
npm install

Create a data.json file:
Place a data.json file in the public directory (or wherever your application fetches from) with the expected data structure.

Run the development server:
npm run dev

The application will be available at http://localhost:5173.
