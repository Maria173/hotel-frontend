import React from "react";

// imports components
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";

function About() {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="О нас">
          Контакты
        </Banner>
      </Hero>
      <p class="about about-title">Как нас найти?</p>
      <p class="about">г. Москва, ул. Долгопрудная, 15</p>
      <img style={{width: '100%'}} src="/map.png" alt="map" />
      <p class="about about-title">Как с нами связаться?</p>
      <p class="about">8 (908) 384 89-34</p>
      <p class="about" style={{marginBottom: '40px'}}>hoteln@yandex.ru</p>
    </>
  );
}

export default About;
