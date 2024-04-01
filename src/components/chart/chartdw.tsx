import React, { PureComponent } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Content } from "next/font/google";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const data = [
  {
    name: "January",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "February",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "August",
    uv: 3090,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "September",
    uv: 2690,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "October",
    uv: 2390,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "November",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: "December",
    uv: 390,
    pv: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <div className="w-full py-6 text-sm flex h-full]">
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 5,
                left: 0,
                bottom: 10,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-xl pb-4 text-center">university usage</div>
        </div>
      </div>
    );
  }
}
