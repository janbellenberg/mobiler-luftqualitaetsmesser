import { useState, useEffect, useCallback } from "react";
import LineChart from "./LineChart";
import './index.css';

const App = () => {
  
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [tLabels, setTLabels] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [hLabels, setHLabels] = useState([]);
  const [co2, setCo2] = useState([]);
  const [cLabels, setCLabels] = useState([]);

  const updateData = useCallback(async () => {
    let tmp = await fetch("http://localhost/data.json?date=" + date );
    tmp = await tmp.json();
    let t = [];
    let tL = [];
    let h = [];
    let hL = [];
    let c = [];
    let cL = [];

    tmp.temperature.forEach((item) => {
      t.push(item.value);
      tL.push(item.timestamp);
    });

    tmp.humidity.forEach((item) => {
      h.push(item.value);
      hL.push(item.timestamp);
    });

    tmp.co2.forEach((item) => {
      c.push(item.value);
      cL.push(item.timestamp);
    });

    setTemperature(t);
    setTLabels(tL);
    setHumidity(h);
    setHLabels(hL);
    setCo2(c);
    setCLabels(cL);
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
        labels={tLabels}
        color="#ff8c00" />

      <LineChart 
        title="Luftfeuchte"
        data={humidity}
        labels={hLabels}
        color="#156ea6" />

      <LineChart 
        title="CO2"
        data={co2}
        labels={cLabels}
        color="#e800e8" />
    </div>
  );
}

export default App;
