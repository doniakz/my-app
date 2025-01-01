import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const RestrictedRoute = (props:any) => {
  // const isAuth  = false

  // const token = localStorage.getItem('auth');
  const token = Cookies.get("token");

  // console.log("token",token);
 
  return <>{!token ? <Route {...props} /> : <Redirect to="/" />}</>;

};

export default RestrictedRoute;