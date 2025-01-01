import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Components/Login/Login";
import RestrictedRoute from "./Auth/RestrictedRoute";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Components/Home/Home";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TokenLogin from "./Components/Login/TokenLogin";
import axios from "axios";
import Shows from "./Components/Shows/Shows";
import CreateShow from "./Components/CreateShow/CreateShow";
import Products from "./Components/Products/Products";
import Account from "./Components/Account/Account";
import EditShow from "./Components/EditShow/EditShow";
import BroLive from "./Components/BroLive/BroLive";
import Cookies from 'js-cookie';
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import User from "./Components/Login/User";
import Orders from "./Components/Orders/Orders";
import Settings from "./Components/Settings/Settings";
function App() {
  const [isVisible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState<any>('');
  const [callBackUrl, setCallBackUrl] = useState<any>();
  const [mobile, setMobile] = useState<any>();


  let defaultId: any;

  const urlLogin= async()=>{
      axios.get(`https://api.borolive.ir/customers/login?expirekey=${defaultId}`, {
          headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'fetch',
          }
      })
          .then((res) => {
              Cookies.set("token", res.data.data.token  ,{expires:30,secure:true})
              Cookies.set("mobile", res.data.data.mobile)
              localStorage.setItem("CallBackUrl", res.data.data.callBackUrl)
              localStorage.setItem("userMarket",res.data.data.uniqueKey)
              setPosts(res.data)
              setToken(res.data.data.token)
              setCallBackUrl(res.data.data.callBackUrl)
              setMobile(res.data.data.mobile)
              setVisible(true);

          })
          .catch((err: any) => {
              console.log(err)



          })
      // }


  }
  useEffect(() => {
      urlLogin()
  },[] )

    //http://localhost:5050/index.html?id=50296
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('id')) {
    defaultId = urlParams.get('id');
    localStorage.setItem("expirekey", defaultId)

  } else if (localStorage.getItem("expirekey") !== null) {
    defaultId = localStorage.getItem("expirekey");

  } else {
    console.log("arr")
  }


  return (
      <BrowserRouter>
      <Switch>
          <RestrictedRoute exact path="/" component={Products}/>
          <RestrictedRoute exact path="/createProduct" component={CreateProduct}/>
    
        </Switch>
    </BrowserRouter>
  );
}

export default App;
