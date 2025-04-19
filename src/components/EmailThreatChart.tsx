
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface EmailThreatChartProps {
  data: {
    name: string;
    count: number;
    color: string;
  }[];
}

const EmailThreatChart: React.FC<EmailThreatChartProps> = ({ data }) => {
  return (
    <div className="h-80 w-full">
      <ChartContainer 
        config={{
          threatBars: {
            theme: {
              light: "#333",
              dark: "#fff"
            }
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              tick={{ fill: '#999' }}
              height={60}
            />
            <YAxis tick={{ fill: '#999' }} />
            <ChartTooltip 
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default EmailThreatChart;
