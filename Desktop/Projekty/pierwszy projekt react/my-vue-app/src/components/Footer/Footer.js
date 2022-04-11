import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container container-footer text-white">
        <h2>Nazwa firmy - wszelkie prawa zastrzeżone, 2022</h2>
        <div className="social-links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://pl-pl.facebook.com/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
