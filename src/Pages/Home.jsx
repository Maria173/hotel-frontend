import React from "react";
// import react-router-dom
import { Link } from "react-router-dom";
import Banner from "../Components/Banner/Banner";
import FeaturedRooms from "../Components/FeaturedRooms/FeaturedRooms";
// imports components
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";

function Home(props) {
  return (
    <>
      <Hero>
        <Banner
          title="ГОСТИНИЦА N"
          subtitle="НОМЕРА ОТ 5000₽"
        >
          <Link to="/rooms" className="btn-primary">
            Выбрать номер
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms mockRooms={props.mockRooms} />
    </>
  );
}

export default Home;
