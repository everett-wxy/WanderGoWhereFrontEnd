import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/user";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(UserContext);
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
        {accessToken.length === 0 && (
          <div className="col-md-3 authlink">
            <Link onClick={props.loginFn}>Login</Link>{" "}
            <Link onClick={props.signupFn}>Sign up</Link>{" "}
          </div>
        )}
        {accessToken.length > 0 && (
          <div className="col-md-3 authlink">
            <Link to="/" onClick={() => setAccessToken("")}>
              Logout
            </Link>
            <Link to="/planboard">Add Trip</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
