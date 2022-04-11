import React from "react";
import "./Offer.css";
import OfferBox from "./OfferBox";

const offers = [
  {
    offerTitle: "Usługa 1",
    isNew: true,
    id: 1,
  },
  {
    offerTitle: "Usługa 2",
    isNew: false,
    id: 2,
  },
  {
    offerTitle: "Usługa 3 ",
    isNew: false,
    id: 3,
  },
  {
    offerTitle: "Usługa 4",
    isNew: false,
    id: 4,
  },
  {
    offerTitle: "Usługa 5",
    isNew: false,
    id: 5,
  },
  {
    offerTitle: "Usługa 6",
    isNew: false,
    id: 6,
  },
];

function Offer() {
  return (
    <section id="last">
      <h1>Czym zajmuje się nasza firma?</h1>
      <div class="offers-wrapper">
        {offers.map((offer) => {
          return (
            <OfferBox
              title={offer.offerTitle}
              isNew={offer.isNew}
              key={offer.id}
            />
          );
        })}
      </div>
    </section>
  );
}
export default Offer;
