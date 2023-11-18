import React, { Component, useEffect, useState } from "react";

// import context
import { RoomContext } from "../../Context/Context";

// import components
import Loading from "../Loading/Loading";
import Room from "../Room/Room";
import Title from "../Title/Title";

export default function FeatureRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/rooms')
      .then((res) => res.json())
      .then((result) => setRooms(result));
  }, []);

  return (
    <section className="featured-rooms">
      <Title title="Номера" />
      <div className="featured-rooms-center">
        {rooms.slice(0, 3).map((room) => <Room key={room.id} room={room} />)}
      </div>
    </section>
  );
}
