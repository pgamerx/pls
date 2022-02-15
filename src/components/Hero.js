import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Random Stuff Api</h1>

    <p className="lead">
    Random Stuff API (RSA) is a powerful API developed by PGamerX, and it's free to use as well as open-source. It allows you to get AI responses, jokes, memes, anime, facts, animal images, image manipulation, and many other things
    </p>


  </div>
);

export default Hero;
