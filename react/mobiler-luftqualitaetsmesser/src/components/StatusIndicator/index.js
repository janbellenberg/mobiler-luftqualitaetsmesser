import './StatusIndicator.css';

const status = [undefined, "good", "attention", "bad"];
const icons = ["?", "✔", "●", "✖"]

const StatusIndicator = ({temperature, humidity, co2}) => {

  let score;

  if (temperature === undefined || humidity === undefined || co2 === undefined) {
    score = 0;
  } else if ((temperature >= 18 && temperature <= 23) && (humidity >= 40 && humidity <= 60) && co2 <= 800) {
    score = 1
  } else if ((temperature >= 15 && temperature <= 26) && (humidity >= 20 && humidity <= 80) && co2 <= 1400) {
    score = 2;
  } else {
    score = 3;
  }

  return (
    <div id="status-indicator" status={status[score]}>
      {icons[score]}
    </div>
  );
};

export default StatusIndicator;