import React from "react";
import { TypeAnimation } from "react-type-animation";

const Greeting = (props) => {
  return (
    <div style={{ marginTop: "200px", height: "100px" }}>
      <TypeAnimation
        sequence={["Hello", 1000, "Where do you want to go today?", 1000]}
        wrapper="span"
        speed={50}
        style={props.fontstyle}
        repeat={0}
        cursor={false}
      />
    </div>
  );
};

export default Greeting;
