import React from "react";
import "./About.css";
import AboutEmployee from "./AboutEmployee";

const employees = [
  {
    name: "Naziwsko imię [dział]",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui commodi voluptatem expedita ea soluta, voluptatum magnam, animi sunt blanditiis esse recusandae quisquam modi porro, molestiae vitae numquam? Libero, saepe praesentium.",
    img: "https://i.picsum.photos/id/1074/5472/3648.jpg?hmac=w-Fbv9bl0KpEUgZugbsiGk3Y2-LGAuiLZOYsRk0zo4A",
    id: 01,
  },
  {
    name: "Nazwisko imię [dział]",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui commodi voluptatem expedita ea soluta, voluptatum magnam, animi sunt blanditiis esse recusandae quisquam modi porro, molestiae vitae numquam? Libero, saepe praesentium.",
    img: "https://i.picsum.photos/id/433/4752/3168.jpg?hmac=Og-twcmaH_j-JNExl5FsJk1pFA7o3-F0qeOblQiJm4s",
    id: 02,
  },
];
function About() {
  return (
    <section className="about">
      <h1>Nasi specjaliści</h1>
      {employees.map((employee) => {
        return (
          <AboutEmployee
            name={employee.name}
            desc={employee.desc}
            img={employee.img}
            key={employee.id}></AboutEmployee>
        );
      })}
    </section>
  );
}
export default About;
