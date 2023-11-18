import React, {useEffect, useState} from "react";

// import context
import { withRoomConsumer } from "../../Context/Context";

// import components
import Loadings from "../Loading/Loading";
import RoomFilter from "./RoomsFilter";
import RoomList from "./RoomsList";

function RoomContainer({ context }) {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    price: 20000,
    type: 'Все',
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    localStorage.removeItem('dateIn');
    localStorage.removeItem('dateOut');
  }, []);

  useEffect(() => {
    let req = `http://localhost:3010/rooms?price=${filters.price}&type=${filters.type}&breakfast=${filters.breakfast}&pets=${filters.pets}`;
    if (filters.dateIn && filters.dateOut) {
      req += `&dateIn=${filters.dateIn}&dateOut=${filters.dateOut}`;
    }
    fetch(req)
      .then((res) => res.json())
      .then((result) => setRooms(result));
  }, [filters]);

  return (
    <>
      <RoomFilter rooms={rooms} setFilters={setFilters} filters={filters} />
      <RoomList rooms={rooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from "react";

// // import context
// import { RoomConsumer } from "../../Context/Context";

// // import components
// import Loadings from "../Loading/Loading";
// import RoomFilter from "./RoomsFilter";
// import RoomList from "./RoomsList";

// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         const { loading, sortedRooms, rooms } = value;

//         if (loading) {
//           return <Loadings />;
//         }

//         return (
//           <div>
//             Hello From Rooms Container
//             <RoomFilter rooms={rooms} />
//             <RoomList rooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
