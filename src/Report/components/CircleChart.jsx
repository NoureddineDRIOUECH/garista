import React from 'react';
import { DonutChart } from '@tremor/react';
import { Card ,CardHeader,CardTitle,CardDescription} from '../../components/ui/card';

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

const dataFormatter = (number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

const DonutChartHero = () => (
  <Card className="col-span-3">
    <div className="mx-auto space-y-12">
      <div className="space-y-3">
      <CardHeader>
        <CardTitle>Top performing Categories</CardTitle> {/* Titre du composant Card */}
        {/* <CardDescription>Your exercise minutes are ahead of where you normally are.</CardDescription> Description du composant Card */}
      </CardHeader>
        <div className="flex justify-center">
          <DonutChart
            className='pb-4 text-white '
            data={datahero}
            variant="pie"
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
            style={{ width: '400px', height: '300px' }}
            colors={['#FF5733', '#C70039', '#900C3F', '#581845', '#900C3F', '#C70039']}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          />
        </div>
      </div>
    </div>
  </Card>
);

export default DonutChartHero;
