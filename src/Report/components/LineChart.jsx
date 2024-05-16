import React from 'react';
import { Line, LineChart, ResponsiveContainer } from "recharts";
// import { useConfig } from "@/hooks/use-config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "../../components/ui/card";

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

function CardsStats() {
//   const [config] = useConfig();

  return (
    <>
      <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        {/* <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription> */}
      </CardHeader>
        <CardContent>

          <div className="h-[300px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="revenue"
                  activeDot={{
                    r: 6,
                    style: { fill: "#000000", opacity: 0.25 },
                  }}
                  style={{ stroke: "#000000" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default CardsStats;
