import React from "react";
import { TypeAnimation } from "react-type-animation";

const Greeting = (props) => {
  return (
    <div style={{ marginTop: "200px" }}>
      <TypeAnimation
        sequence={[`Hello ${props.username},`]}
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
