import { useEffect, useState } from 'react';
import { type ChartData, isSingleSeries, isMultiSeries } from './types/chart';
import { SingleSeriesChart } from './components/SingleSeriesChart';
import { MultiSeriesChart } from './components/MultiSeriesChart';

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load chart data');
        }
        return response.json();
      })
      .then((data: ChartData[]) => {
        setCharts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading charts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
      <div className="container px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Chart Visualization</h1>
        <div className="space-y-8">
          {charts.map((chart, index) => {
            if (isSingleSeries(chart.data)) {
              return (
                <SingleSeriesChart
                  key={index}
                  data={chart.data}
                  title={chart.title}
                />
              );
            } else if (isMultiSeries(chart.data)) {
              return (
                <MultiSeriesChart
                  key={index}
                  data={chart.data}
                  title={chart.title}
                />
              );
            } else {
              return (
                <div key={index} className="text-center text-gray-500">
                  Unable to determine chart type for: {chart.title}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App
