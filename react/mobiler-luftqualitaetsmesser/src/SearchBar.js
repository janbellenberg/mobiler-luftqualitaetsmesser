import { useEffect, useState } from "react";

const SearchBar = ({onSearch}) => {

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [building, setBuilding] = useState(0);
  const [room, setRoom] = useState(0);
  const [position, setPosition] = useState(0);

  const[buildingList, setBuildings] = useState([]);
  const[roomList, setRooms] = useState([]);
  const[positionList, setPositions] = useState([]);

  useEffect(() => {
    fetch("http://localhost/buildings.json")
      .then(res => res.json())
      .then(json => setBuildings(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost/rooms.json?building=" + building)
      .then(res => res.json())
      .then(json => setRooms(json));
  }, [building]);

  useEffect(() => {
    fetch("http://localhost/positions.json?room=" + room)
      .then(res => res.json())
      .then(json => setPositions(json));
  }, [room]);

  return (
    <fieldset>
      <legend>Suche</legend>

      <label htmlFor="date">Datum: </label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)} />
      
      <label htmlFor="building">Gebäude: </label>
      <select id="building"
        value={building}
        onChange={e => setBuilding(parseInt(e.target.value))}>

        {buildingList.map((item) => 
          <option 
            key={item.id} 
            value={item.id}>
              {item.bezeichnung}
          </option>
        )}
      </select>
      
      <label htmlFor="room">Raum: </label>
      <select id="room"
        value={room}
        onChange={e => setRoom(parseInt(e.target.value))}>

        {roomList.map((item) => 
          <option 
            key={item.id} 
            value={item.id}>
              {item.bezeichnung}
          </option>
        )}
      </select>
      
      <label htmlFor="position">Position: </label>
      <select id="position"
        value={position}
        onChange={e => setPosition(parseInt(e.target.value))}>

        {positionList.map((item) => 
          <option 
            key={item.id} 
            value={item.id}>
              {item.bezeichnung}
          </option>
        )}
      </select>
      <br/>

      <input type="button"
        value="Suchen"
        onClick={() => onSearch(date, position)} />
    </fieldset>
  );
};

export default SearchBar;