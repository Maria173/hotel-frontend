import React from "react";

// import react-router-dom
import { Link } from "react-router-dom";

// imports components
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";

function Error() {
  return (
    <Hero>
      <Banner title="404" subtitle="Страница не найдена">
        <Link to="/" className="btn-primary">
          На главную
        </Link>
      </Banner>
    </Hero>
  );
}

export default Error;
