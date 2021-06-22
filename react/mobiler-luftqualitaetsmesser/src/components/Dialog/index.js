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
            value="Abbrechen"
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

export default Dialog;