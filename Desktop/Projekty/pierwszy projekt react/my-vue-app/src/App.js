import React from "react";
import "./App.css";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Components/LandingPage/LandingPage";
import Nav from "./Components/Nav/Nav";
import Offer from "./Components/Offer/Offer";

function App() {
  return (
    <>
      <Nav></Nav>
      <main>
        <LandingPage></LandingPage>
        <About></About>
        <Offer></Offer>
      </main>
      <Footer></Footer>
    </>
  );
}
export default App;
