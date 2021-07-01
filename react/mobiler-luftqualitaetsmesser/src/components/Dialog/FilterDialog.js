import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {SERVER} from '../../config';
import Dialog from ".";

const FilterDialog = ({onFilter, onHide}) => {

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState(0);
  const [room, setRoom] = useState(0);
  const [position, setPosition] = useState(0);

  const [locationList, setLocations] = useState([]);
  const [roomList, setRooms] = useState([]);
  const [positionList, setPositions] = useState([]);

  useEffect(() => {
    fetch("http://" + SERVER + "/get_Data.php?locations")
      .then(res => res.json())
      .then(json => {
        setLocation(json[0].id);
        setLocations(json);
      })
      .then(() => setRooms([]))
      .then(() => setRoom(0))
      .then(() => setPositions([]))
      .then(() => setPosition(0));
  }, []);

  useEffect(() => {
    fetch("http://" + SERVER + "/get_Data.php?location_id=" + location)
      .then(res => res.json())
      .then(json => {
        setRooms(json);
        setRoom(json[0]);
      })
      .then(() => setPositions([]))
      .then(() => setPosition(0));
  }, [location]);

  useEffect(() => {
    fetch("http://" + SERVER + "/get_Data.php?room_id=" + room)
      .then(res => res.json())
      .then(json => {
        setPositions(json);
        setPosition(json[0]);
      });
  }, [room]);

  return (
    <div id="filter-dialog">
      <Dialog
        title="Daten filtern"
        actionText="Daten abrufen"
        onActionClick={() => onFilter({
          date: date,
          location: (locationList.filter(i => i.id === location)[0] || {}).name || "",
          room: room,
          position: position
        })}
        onAbortClick={onHide}>

        {/* Datum */}

        <label htmlFor="date">Datum: </label>
        <input
          type="date"
          id="date"
          max={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={e => setDate(e.target.value)} /><br/>

        {/* Standort */}

        <label htmlFor="location">Standort: </label>
        <select id="location"
          value={location}
          onChange={e => setLocation(parseInt(e.target.value))}>

          {locationList.map((item) => 
            <option 
              key={item.id} 
              value={item.id}>
                {item.name}
            </option>
          )}
        </select><br/>
        
        {/* Raum */}

        <label htmlFor="room">Raum: </label>
        <select id="room"
          value={room}
          onChange={e => setRoom(parseInt(e.target.value))}>

          {roomList.map((item) => 
            <option 
              key={item} 
              value={parseInt(item)}>
                Raum {item}
            </option>
          )}
        </select>
        
        {/* Position */}

        <label htmlFor="position">Position: </label>
        <select id="position"
          value={position}
          onChange={e => setPosition(parseInt(e.target.value))}>

          {positionList.map((item) => 
            <option 
              key={item} 
              value={parseInt(item)}>
                #{item}
            </option>
          )}
        </select>
      </Dialog>
    </div>
  );
}

FilterDialog.propTypes = {
  onHide: PropTypes.func.isRequired
};

export default FilterDialog;