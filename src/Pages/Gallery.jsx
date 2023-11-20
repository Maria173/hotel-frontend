import React from "react";

// imports components
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";

function Gallery() {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Галерея">
          Прикоснись к нашей эстетике
        </Banner>
      </Hero>
      <div>
      <img src="https://thumb.tildacdn.com/tild3335-3064-4431-b231-333138653133/-/format/webp/DJI_0383.jpg" alt="pic" />
      <img src="https://thumb.tildacdn.com/tild3365-6565-4664-b537-613236306362/-/format/webp/039__Pine_River_Katy.jpg" alt="pic" />
      <img src="https://thumb.tildacdn.com/tild3539-3836-4337-b533-353034333733/-/format/webp/DC8B4E23-DC4D-44DD-9.jpg" alt="pic" />
      <img src="https://thumb.tildacdn.com/tild3166-3065-4738-b833-623635323461/-/format/webp/EM_web-338.jpg" alt="pic" />
      <img src="https://thumb.tildacdn.com/tild3363-3838-4331-a164-393164646266/-/format/webp/SUNSET_BARN_WEDDING_.jpg" alt="pic" />
      <img src="https://thumb.tildacdn.com/tild6564-3635-4638-a366-353532356634/-/format/webp/D992D54E-C003-4A28-9.jpeg" alt="pic" />
      </div>
    </>
  );
}

export default Gallery;
