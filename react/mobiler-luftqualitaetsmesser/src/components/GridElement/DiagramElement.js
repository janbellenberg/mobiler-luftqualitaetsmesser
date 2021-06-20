import React from 'react';
import { Line } from 'react-chartjs-2';
import GridElement from '.';

const DiagramElement = ({title, data, labels, min, max}) => {

  return (
    <GridElement>
      <h2>{title}</h2>
      <Line height={250} width={500}
        data={{
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            fill: true,
            backgroundColor: "#659DBD70",
            borderColor: "#659DBD"
          }]
        }}
        options={{
          elements: { point: { radius: 2 } },
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                min: min,
                max: max
              }
            }]
          },
          legend: {
            display: false
          }
        }}

      />
    </GridElement>
  );

}

export default DiagramElement;