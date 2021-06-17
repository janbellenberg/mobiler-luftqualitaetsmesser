import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({title, data, labels, color}) => {

  const chartRef = useRef();

  return (
    <Line height={250} width={500} ref={chartRef}
      data={{
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: "#ffffff",
          borderColor: color,
          borderWidth: 2
        }]
      }}
      options={{
        elements: {point: {radius: 2}},
        maintainAspectRatio: true,
        responsive: false,
        scales: {
          xAxes: [                        // disable x-grid
            {
              display: false
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 20,
          },
        }
      }}

    />
  );

}

export default LineChart;