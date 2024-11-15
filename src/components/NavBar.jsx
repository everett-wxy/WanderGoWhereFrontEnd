import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const toggleHideNavBar = () => {
    setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleHideNavBar);

    return () => {
      window.removeEventListener("scroll", toggleHideNavBar);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
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
        {/* if user is logged in - condition <Link>Add Trip</Link> Logout. */}
      </div>
    </div>
  );
};

export default NavBar;
