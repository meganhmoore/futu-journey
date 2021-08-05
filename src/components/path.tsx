import React, { Component } from "react";
import P5 from "../components/p5";

interface PathProps {
  name: string;
}

const PathContainer: React.FC<PathProps> = ({ name }) => {
  const buttonStyle = {
    border: "0px",
    borderRadius: "100px",
    margin: "1em",
    padding: "0.5em",
  };
  return (
    <div
      className="row"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="column">
        <P5 />
      </div>
      <div
        className="column"
        style={{
          minWidth: "40%",
          fontFamily: "Futurice",
          margin: "1em",
          padding: "1em",
        }}
      >
        {name}
        <h1>Add A Step</h1>
        <p>You can add up to 10 steps.</p>
        <p style={{ fontWeight: "bold" }}>Select a Type</p>
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "20vw" }}>
          <button style={buttonStyle}>Job</button>
          <button style={buttonStyle}>Education</button>
          <button style={buttonStyle}>Travel</button>
          <button style={buttonStyle}>Volunteering</button>
          <button style={buttonStyle}>Other</button>
        </div>
        <p style={{ fontWeight: "bold" }}>Select a Duration</p>
        <div>
          <input type="date" />
          till
          <input type="date" />
        </div>
        <button> Add Step</button>
        <button> Done</button>
      </div>
    </div>
  );
};

export default PathContainer;
