import { useState } from "react";
import Header from "./components/Header/";
import DiagramElement from "./components/GridElement/DiagramElement";
import ActionElement from "./components/GridElement/ActionElement";
import InfoElement from "./components/GridElement/InfoElement";
import DiagDialog from "./components/Dialog/DiagDialog";
import FilterDialog from "./components/Dialog/FilterDialog";
import InfoDialog from "./components/Dialog/InfoDialog";

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
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const updateData = async (date, position) => {
    let tmp = await fetch("/get_Data.php?date=" + date + "&position=" + position);
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

  const exportCSV = () => {
    let result = "data:text/csv;charset=utf-8,";
    result += 'Zeit;Temperatur;Luftfeuchte;CO2-Gehalt\r\n';

    for(let i = 0; i < labels.length; i++) {
      result += labels[i];
      result += ';';
      result += temperature[i];
      result += ';';
      result += humidity[i];
      result += ';';
      result += co2[i];
      result += '\r\n';
    }

    encodeURI(result);

    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(result));
    link.setAttribute("download", "export." + lastFilter.date + ".csv");
    document.body.appendChild(link);

    link.click();
  }

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
            temperature={temperature[temperature.length - 1]}
            humidity={humidity[humidity.length - 1]}
            co2={co2[co2.length - 1]} />
          
          <ActionElement onExport={() => {
            if(lastFilter !== undefined) {
              exportCSV();
            }
          }} onInfo={() => setShowInfoDialog(true)}  onRefresh={() => {
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
          min={-10}
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

      { showInfoDialog
        ? <InfoDialog onHide={() => setShowInfoDialog(false)} />
        : null
      }
    </div>
  );
}

export default App;
