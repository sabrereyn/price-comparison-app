import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
  <div className="chart-container">
    <Line data={chartData} />
  </div>;
}
