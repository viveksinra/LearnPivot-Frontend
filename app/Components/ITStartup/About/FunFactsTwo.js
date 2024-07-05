"use client"

import React from "react";

const FunFactsTwo = () => {
  // Define an array of objects representing fun facts
  const funFacts = [
    { icon: "bx bx-list-check", value: 124, text: "Completed Classes" },
    { icon: "bx bx-smile", value: 5600, text: "Happy Clients" },
    { icon: "bx bx-user-plus", value: 28, text: "Mock Test" },
    { icon: "bx bx-trophy", value: 29, text: "Winning Awards" }
  ];

  return (
    <div className="fun-facts-two pt-100 pb-70 bg-f2f2f7">
      <div className="container">
        <div className="row">
          {funFacts.map((fact, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="fun-fact-card">
                <i className={fact.icon}></i>
                <h3>
                  <span className="odometer">{fact.value}</span>
                  <span className="sign-icon">+</span>
                </h3>
                <p>{fact.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFactsTwo;
