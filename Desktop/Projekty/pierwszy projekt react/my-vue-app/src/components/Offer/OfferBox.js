import React from "react";

function OfferBox({ title, isNew }) {
  return (
    <div className="offers-wrapper-box">
      <div className={`${isNew ? "dott" : ""} `}></div>
      <div className="offers-wrapper-box-content">
        <h2>{title}</h2>
        {isNew && <span className="newOffer">(Nowość!)</span>}
      </div>
    </div>
  );
}
export default OfferBox;
