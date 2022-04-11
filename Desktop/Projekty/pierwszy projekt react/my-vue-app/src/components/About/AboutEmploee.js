import React from "react";

function AboutEmployee({ name, desc, img }) {
  return (
    <div className="person1">
      <div style={{ backgroundImage: `url(${img})` }} className="person1"></div>
      <div className="specjaliści">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
export default AboutEmployee;
