import './App.css';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const App = () => {
  let title = "Test"; // npm run build
  
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const load = async () => {
    let response = await fetch("http://localhost/test.json");
    let json = await response.json();
    
    let tmpLabels = [];
    let tmpData = [];

    json.forEach(element => {
      tmpLabels.push(element.id);
      tmpData.push(element.data);
    });

    setLabels(tmpLabels);
    setData(tmpData);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      Hallo

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
                min: 0,
                max: 10
              }
            }]
          },
          legend: {
            display: false
          }
        }}

      />
    </>
  );
}

export default App;