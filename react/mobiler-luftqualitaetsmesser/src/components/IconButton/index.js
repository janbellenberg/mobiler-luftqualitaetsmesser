import PropTypes from 'prop-types';
import './IconButton.css';

const IconButton = ({text, icon, onClick}) => {
  return (
    <span className="icon-button" onClick={onClick}>
      <img src={icon} alt="" />
      {text}
    </span>
  );
};

IconButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IconButton;