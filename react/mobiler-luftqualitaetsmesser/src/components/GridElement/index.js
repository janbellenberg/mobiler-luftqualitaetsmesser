import PropTypes from 'prop-types';
import './GridElement.css';

const GridElement = ({children}) => {
  return (
    <section>
      {children}
    </section>
  );
};

GridElement.propTypes = {
  children: PropTypes.node
};

export default GridElement;