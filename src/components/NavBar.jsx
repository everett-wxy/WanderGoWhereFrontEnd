import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState("");

  const toggleHideNavBar = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout);
    setScrollTimeout(
      setTimeout(() => {
        setIsScrolling(false);
      })
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleHideNavBar);
    return () => {
      window.removeEventListener("scroll", toggleHideNavBar);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className={!isScrolling ? "navbar" : "hidenavbar"}>
      <div className="container">
        <div className="col-md-3">
          <Link>
            <img src="images/icon.png" width="70px" />
            <img src="images/wgw-trans-green.png" width="100px" />
          </Link>{" "}
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-3 authlink">
          <Link>Login</Link> <Link>Sign up</Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
