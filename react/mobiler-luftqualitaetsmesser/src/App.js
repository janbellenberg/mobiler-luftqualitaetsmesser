import { useState, useEffect, useCallback } from "react";
import LineChart from "./LineChart";
import './index.css';

const App = () => {
  
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [co2, setCo2] = useState([]);
  const [labels, setLabels] = useState([]);

  const updateData = useCallback(async () => {
    let tmp = await fetch("http://localhost/data.json?date=" + date );
    tmp = await tmp.json();
    let t = [];
    let h = [];
    let c = [];
    let l = [];

    tmp.forEach((item) => {
      t.push(item.temperature);
      h.push(item.humidity);
      c.push(item.co2);
      l.push(item.timestamp);
    });

    setTemperature(t);
    setHumidity(h);
    setCo2(c);
    setLabels(l);
  }, [date]);

  useEffect(() => {
    updateData();
  }, [updateData, date]);

  return (
    <div className="App">
      Mobiler Luftqualitätsmesser<br/>
      <label htmlFor="date">Datum:</label>
      <input 
        id="date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)} />
      <br/>

      <LineChart 
        title="Temperatur"
        data={temperature}
        labels={labels}
        color="#ff8c00" />

      <LineChart 
        title="Luftfeuchte"
        data={humidity}
        labels={labels}
        color="#156ea6" />

      <LineChart 
        title="CO2"
        data={co2}
        labels={labels}
        color="#e800e8" />
    </div>
  );
}

export default App;
