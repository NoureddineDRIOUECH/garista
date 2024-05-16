import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Text } from "recharts";
import moment from 'moment'; // ensure moment is installed

const Overview = ({ orders }) => {
    const processData = (orders) => {
        let groupedData = {};
        if (orders) {
            orders.forEach(order => {
                const day = moment(order.created_at).format("MMM DD");
                if (!groupedData[day]) {
                    groupedData[day] = {
                        name: day,
                        total: 0
                    };
                }
                groupedData[day].total += parseFloat(order.total);
            });
        }
        return Object.values(groupedData);
    };

    const data = processData(orders);

    if (data.length === 0) {
        return (
        <div className="dark:bg-gray-800 rounded-xl p-8 flex items-center  justify-center">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <BarChartIcon className="w-12 h-12 text-gray-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No Data Available</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    There is currently no data to display.
                </p>
            </div>
        </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} className="bar-chart">
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
function BarChartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    )
  }
export default Overview;