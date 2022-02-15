import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Footer = () => (
  <footer className="bg-light p-3 text-center">
 <FontAwesomeIcon icon={solid("heart")} />     
 <p>
      Made with love by <a href="https://pgamerx.com">PGamerX</a>
    </p>
  </footer>
);

export default Footer;
