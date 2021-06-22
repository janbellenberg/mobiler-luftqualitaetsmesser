import { useState } from "react";
import Header from "./components/Header/";
import DiagramElement from "./components/GridElement/DiagramElement";
import ActionElement from "./components/GridElement/ActionElement";
import InfoElement from "./components/GridElement/InfoElement";
import DiagDialog from "./components/Dialog/DiagDialog";
import FilterDialog from "./components/Dialog/FilterDialog";
import './index.css';

const App = () => {
  
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [co2, setCo2] = useState([]);
  const [labels, setLabels] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedPosition, setSelectedPosition] = useState();
  const [lastFilter, setLastFilter] = useState();

  const [showDiagDialog, setShowDiagDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(true);

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
      <Header
        onLoadData={() => setShowFilterDialog(true)}
        onDiag={() => setShowDiagDialog(true)} />
      <br/>

      <main>
        <div>
          <InfoElement
            location={selectedLocation || "Standort nicht ausgewählt"}
            room={selectedRoom || "nicht ausgewählt"}
            position={selectedPosition || " -"}
            temperature={20}
            humidity={30}
            co2={650} />
          
          <ActionElement onExport={undefined}  onRefresh={() => {
            if(lastFilter === undefined) {
              setShowFilterDialog(true);
            } else {
              updateData(lastFilter.date, lastFilter.position);
            }
          }} />
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

      { showFilterDialog
        ? <FilterDialog
            onFilter={(data) => {
              setSelectedLocation(data.location);
              setSelectedRoom(data.room);
              setSelectedPosition(data.position);
              updateData(data.date, data.position);
              setShowFilterDialog(false);
              setLastFilter({date: data.date, position: data.position});
            }}
            onHide={() => setShowFilterDialog(false)} />
        : null
      }
    </div>
  );
}

export default App;
