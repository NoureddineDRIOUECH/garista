import React from 'react';
import { DonutChart } from '@tremor/react';
import { Card ,CardHeader,CardTitle,CardDescription} from '../../components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const datahero = [
  {
    name: 'Noche Holding AG',
    value: 9800,
  },
  {
    name: 'Rain Drop AG',
    value: 4567,
  },
  {
    name: 'Push Rail AG',
    value: 3908,
  },
  {
    name: 'Flow Steal AG',
    value: 2400,
  },
  {
    name: 'Tiny Loop Inc.',
    value: 2174,
  },
  {
    name: 'Anton Resorts Holding',
    value: 1398,
  },
];
const COLORS = ['#FF5733', '#C70039', '#900C3F', '#581845', '#3B3B6D', '#1F77B4'];

const dataFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

const DonutChartHero = ({data}) => (
  <Card className="col-span-3">
  <div className="mx-auto space-y-12">
    <div className="space-y-3">
      <CardHeader>
        <CardTitle>Top performing Categories</CardTitle>
      </CardHeader>
      <div className="flex justify-center">
        <PieChart width={360} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={dataFormatter} />
          <Legend />
        </PieChart>
      </div>
    </div>
  </div>
</Card>
);

export default DonutChartHero;
