import PropTypes from 'prop-types';
import GridElement from ".";
import IconButton from "../IconButton";
import ExportIcon from "../../icons/export.png";
import RefreshIcon from "../../icons/refresh.png";
import InfoIcon from '../../icons/info.png';

const ActionElement = ({onExport, onRefresh, onInfo}) => {
  return (
    <GridElement>
      <div id="action-flex">
        <IconButton
          text="Exportieren"
          icon={ExportIcon}
          onClick={onExport} />

        <IconButton
          text="Aktualisieren"
          icon={RefreshIcon}
          onClick={onRefresh} />
        
        <IconButton
          text="Info"
          icon={InfoIcon}
          onClick={onInfo} />
      </div>
    </GridElement>
  );
};

ActionElement.propTypes = {
  onExport: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onInfo: PropTypes.func.isRequired
};

export default ActionElement;