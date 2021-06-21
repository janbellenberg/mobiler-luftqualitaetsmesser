import './StatusIndicator.css';

const status = ["good", "attention", "bad"];
const icons = ["✔", "●", "✖"]

const StatusIndicator = ({temperature, humidity, co2}) => {

  const score = 0;

  return (
    <div id="status-indicator" status={status[score]}>
      {icons[score]}
    </div>
  );
};

export default StatusIndicator;