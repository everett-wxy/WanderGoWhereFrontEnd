import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/user";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  const toggleHideNavBar = () => {
    setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
  };

  const createTrip = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            name: "unnamed trip",
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        navigate(`/planboard/${data.createdTrip._id}`);
      }
    } catch (error) {
      console.error(error.message);
    }
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
            <Link onClick={props.signupFn}>Sign up</Link>{" "}
            <Link onClick={props.loginFn}>Login</Link>{" "}
          </div>
        )}
        {accessToken.length > 0 && (
          <div className="col-md-3 authlink">
            {isDashboard ? (
              <Link onClick={createTrip}>Add Trip</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
