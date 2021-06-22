import { useState } from "react";
//import SearchBar from "./SearchBar";
import Header from "./components/Header/";
import DiagramElement from "./components/GridElement/DiagramElement";
import ActionElement from "./components/GridElement/ActionElement";
import InfoElement from "./components/GridElement/InfoElement";
import DiagDialog from "./components/Dialog/DiagDialog";
import './index.css';

const App = () => {
  
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [co2, setCo2] = useState([]);
  const [labels, setLabels] = useState([]);

  const [showDiagDialog, setShowDiagDialog] = useState(false);

  const updateData = async (date, position) => {
    let tmp = await fetch("http://localhost/data.json?date=" + date + "&position=" + position );
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
  };

  return (
    <div className="App">
      <Header onLoadData={undefined} onDiag={() => setShowDiagDialog(true)} />
      
      {/*<SearchBar onSearch={updateData} />*/}
      <br/>

      <main>
        <div>
          <InfoElement location={"Dahnstraße"} room={"221"} position={"5"} temperature={20} humidity={30} co2={650} />
          <ActionElement onExport={undefined}  onRefresh={undefined} />
        </div>
        <DiagramElement 
          title="Temperatur in °C"
          data={temperature}
          labels={labels}
          min={0}
          max={40} />

        <DiagramElement 
          title="Luftfeuchte in %"
          data={humidity}
          labels={labels}
          min={0}
          max={100} />

        <DiagramElement 
          title="CO&#8322; in ppm"
          data={co2}
          labels={labels}
          min={0}
          max={5000} />
      </main>

      { showDiagDialog
        ? <DiagDialog onHide={() => setShowDiagDialog(false)} />
        : null
      }
      
    </div>
  );
}

export default App;
