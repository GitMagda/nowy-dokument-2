import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <div>moja firma</div>
      <ul class="nav-links">
        <li class="nav-item">
          <a href="#about">o nas</a>
        </li>
        <li class="nav-item">
          <a href="#offer">oferta</a>
        </li>
        <li class="nav-item">
          <a href="#" class="disabled">
            kontakt
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
