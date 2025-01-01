import React, {Fragment, useEffect, useState} from "react";
;
import Cookies from "js-cookie";

const PrivateRoute = (props:any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    };

    setResponsiveness();

    window.addEventListener("resize", setResponsiveness);

    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  // const isAuth  = false

   // const token = localStorage.getItem("token");
  const token = Cookies.get("token");
  return (
      <Fragment>
{/*  
      <>{token ? <Route {...props} /> : <Redirect to="/login" />}</>

    */}

  </Fragment>);
};

export default PrivateRoute;
