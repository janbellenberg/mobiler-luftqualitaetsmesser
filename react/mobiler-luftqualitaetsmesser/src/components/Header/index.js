import PropTypes from 'prop-types';
import './Header.css';

const Header = ({onLoadData, onDiag}) => {

  return (
    <header>
      <div>
        <img src="https://hnbk.de/wp-content/uploads/2017/04/HNBKSmall-e1492069901821.png" alt="HNBK" />
        <h1>Mobiler Luftqualitätsmesser</h1>
      </div>
      <div>
        <input 
          type="button"
          value="Daten laden"
          onClick={onLoadData} />

        <input
          type="button"
          value="Diagnose"
          onClick={onDiag} />
      </div>
      <div id="header-bottom" />
    </header>
  );
};

Header.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  onDiag: PropTypes.func.isRequired
};

export default Header;