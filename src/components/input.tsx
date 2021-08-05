import React, { Component, useState } from "react";
import { Path } from "typescript";
import PathContainer from "./path";

const JourneyContainer: React.FC = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("start");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("journey");
  };

  const startPage = () => {
    return (
      <div
        style={{
          alignSelf: "center",
        }}
      >
        <label style={{ fontFamily: "Futurice" }}>What's your name:</label>
        <form
          style={{
            display: "flex",
            verticalAlign: "baseline",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Emilia"
            value={value}
            onChange={handleChange}
            style={{
              padding: "1em",
              marginRight: "1em",
              border: "1px solid black",
            }}
          />
          <input
            type="submit"
            value="START"
            style={{
              fontFamily: "Futurice",
              padding: "1em",
              backgroundColor: "#009F77",
              color: "white",
              border: "0",
            }}
          />
        </form>
      </div>
    );
  };

  const determinePage = () => {
    if (status == "start") {
      return startPage();
    } else if (status == "journey") {
      return <PathContainer name={value} />;
    } else {
      return <div>Problem</div>;
    }
  };

  return determinePage();
};

export default JourneyContainer;
