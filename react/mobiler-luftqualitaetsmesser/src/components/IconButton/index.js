import './IconButton.css';

const IconButton = ({text, icon, onClick}) => {
  return (
    <span className="icon-button" onClick={onClick}>
      <img src={icon} alt="" />
      {text}
    </span>
  );
};

export default IconButton;