import * as React from "react";
import P5 from "../components/p5";
import "./index.css";
import JourneyContainer from "../components/input";

// markup
const IndexPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="column">
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Futurice",
            }}
          >
            Show us your Journey!
          </h1>
          <p
            style={{
              display: "flex",
              flex: "wrap",
              justifyContent: "center",
              fontFamily: "Futurice",
              textAlign: "center",
              width: "40vw",
            }}
          >
            Are you ready to visualize your own journey? Simply follow the steps
            of our journey creator and compile your own joruney line. You can
            download and share your result or directly forward it to our
            recruiters.
          </p>
        </div>
      </div>
      <div
        className="column"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "70vh",
            width: "80vw",
            backgroundImage: "url(/background.png)",
            objectFit: "fill",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <JourneyContainer />
          {/* <P5 /> */}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
