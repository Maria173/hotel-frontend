import React from "react";

// import react-router-dom
import { Link } from "react-router-dom";

// import assets
import defaultImg from "../../assets/img/jpeg/room-1.jpeg";

// import prop-types
import PropTypes from "prop-types";

export default function Room({ room }) {
  // const { name, slug, images, price } = room;
  const { id, name, image, price } = room;


  return (
    <article className="room">
      <div className="img-container">
        <img src={image || defaultImg} alt="single room" />

        <div className="price-top">
          <h6>{price}₽</h6>
          <p>за ночь</p>
        </div>

        <Link to={`/rooms/${id}`} className="btn-primary room-link">
          Подробнее
        </Link>
      </div>
      <p className="room-info">Номер «{name}»</p>
    </article>
  );
}

Room.prototype = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
