import { Title } from "chart.js";
import React, { PureComponent } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Used", value: 400, fill: "#003f5c" },
  { name: "Unused", value: 300, fill: "#ff6361" },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
];
const sumOfData01 = data01.reduce(
  (accumulator, currentValue) => accumulator + currentValue.value,
  0
);

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          />
          <Pie
            dataKey="value"
            data={data02}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
          />
          <Tooltip />(<div></div>
          );
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
