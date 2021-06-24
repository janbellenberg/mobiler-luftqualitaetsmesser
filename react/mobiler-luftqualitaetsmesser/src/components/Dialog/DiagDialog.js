import { useState, useReducer, useEffect } from "react";
import PropTypes from 'prop-types';
import Dialog from ".";
import SerialPort from '@serialport/stream';
import WSABinding from 'serialport-binding-webserialapi';

SerialPort.Binding = WSABinding;
let port;

const DiagDialog = ({onHide}) => {

  function reducer(state, action) {
    switch (action.type) {
      case 'append':
        return state + action.payload;
      default:
        throw new Error();
    }
  }

  const [baudRate, setBaudRate] = useState(9600);
  const [connected, setConnected] = useState(false);
  const [content, dispatch] = useReducer(reducer, "");

  const dec2hex16bitWithPad = (i) => {
    return (i + 0x10000).toString(16).substr(-4).toUpperCase();
  }  

  const connect = async () => {
    port = await navigator.serial.requestPort();
    let info = port.getInfo();
    let path = 'wsa://'
      + dec2hex16bitWithPad(info.usbVendorId)
      + '-'
      + dec2hex16bitWithPad(info.usbProductId);

    port = new SerialPort(path, { 
      baudRate: baudRate,
      autoOpen: true
    });

    port.on('open', () => {
      setConnected(true);
    });

    port.on('data', data => {
      let encodedString = String.fromCharCode.apply(null, data);
      dispatch({type: 'append', payload: encodedString});
    });
  };

  const close = () => {
    setConnected(false);
    if(port !== undefined && port !== null && port.binding.isOpen) {
      port.close();
    }
    onHide();
  };

  useEffect(() => {
    return () => {
      if(port !== undefined && port !== null && port.binding.isOpen) {
        port.close();
      }
    }
  }, []);

  return (
    <div id="diag-dialog-wrapper">
      <Dialog
        title={"Diagnose (" + (connected ? "Verbindung hergestellt" : "keine Verbindung") + ")"}
        actionText="Verbinden"
        onActionClick={connect}
        onAbortClick={close}>

        <span id="baud-rate-wrapper">
          <label htmlFor="baudrate">Baudrate: </label>
          <select
            id="baudrate"
            value={baudRate}
            onChange={(e) => { setBaudRate(parseInt(e.target.value)) }}>

            <option>300</option>
            <option>600</option>
            <option>1200</option>
            <option>2400</option>
            <option>4800</option>
            <option>9600</option>
            <option>14400</option>
            <option>19200</option>
            <option>28800</option>
            <option>38400</option>
            <option>56000</option>
            <option>57600</option>
            <option>115200</option>
            <option>128000</option>
            <option>256000</option>
          </select>
        </span>
          
        <textarea
          readOnly
          value={content}
          style={{height: "15em"}} />

      </Dialog>
    </div>
  );
};

DiagDialog.propTypes = {
  onHide: PropTypes.func.isRequired
};

export default DiagDialog;