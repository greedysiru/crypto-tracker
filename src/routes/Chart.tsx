import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <h1>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => {
                return {
                  x: price.time_close * 1000,
                  y: [price.open, price.high, price.low, price.close],
                };
              })!,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "rgba(0, 0, 0, 0.5)",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
            },
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
