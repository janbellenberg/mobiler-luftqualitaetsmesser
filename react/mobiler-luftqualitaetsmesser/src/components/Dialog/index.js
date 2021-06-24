import PropTypes from 'prop-types';
import './Dialog.css';

const Dialog = ({title, actionText, onActionClick, onAbortClick, children}) => {
  return (
    <div className="dialog-wrapper">
      <dialog open>
        <h2>{title}</h2>

        {children}

        <div className="dialog-buttons">
          <input 
            type="button"
            value="Schließen"
            onClick={onAbortClick} />

          <input 
            type="button"
            value={actionText}
            onClick={onActionClick} />

        </div>
      </dialog>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.node.isRequired,
  actionText: PropTypes.node.isRequired,
  onActionClick: PropTypes.func.isRequired,
  onAbortClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Dialog;