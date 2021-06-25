import GridElement from ".";
import StatusIndicator from "../StatusIndicator";
import PropTypes from 'prop-types';

import TemperatureIcon from '../../icons/temperture.png';
import HumidityIcon from '../../icons/humidity.png';
import CO2Icon from '../../icons/co2.png';

const InfoElement = ({location, room, position, temperature, humidity, co2}) => {
  return (
    <GridElement>
      <div id="info-flex">
        <StatusIndicator temperature={temperature}  humidity={humidity}  co2={co2} />
        <div style={{marginTop: "15px"}}>
          <b>Raum {room}</b><br/>
          #{position}<br/>
          {location}<br/>
        </div>
        <div>
          <div className="info-item">
            <img src={TemperatureIcon} alt="Temperatur" />
            {temperature || "- "}°C
          </div>
          <div className="info-item">
            <img src={HumidityIcon} alt="Luftfeuchte" />
            {humidity || "- "}%
          </div>
          <div className="info-item">
            <img src={CO2Icon} alt="CO2-Gehalt" />
            {co2 || "-"} ppm
          </div>
          
        </div>
      </div>
    </GridElement>
  );
};

InfoElement.propTypes = {
  location: PropTypes.node,
  room: PropTypes.node,
  position: PropTypes.node,
  temperature: PropTypes.number,
  humidity: PropTypes.number,
  co2: PropTypes.number
};

export default InfoElement;