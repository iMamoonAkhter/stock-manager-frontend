import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Pages/Header";
import ProjectName from "../Pages/ProjectName";
import Home from "../Pages/Home";
import ViewItem from "../Pages/ViewItem";
import Cart from "../Pages/Cart";
import axios from "axios";
import { useEffect } from "react";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";

const gettoken = localStorage.getItem("registertoken");

const f2 = async () => {
  console.log(gettoken, "get token");
  const data = {
    token: gettoken,
  };
  console.log("from Activation api");

  axios
    .post("https://stock-manager-backend-livid.vercel.app/API/users/ActivateAccount", data)
    .then((res) => {
      // history.push("http://localhost:3000/store");
      console.log(res, "user activated");
    })
    .catch((err) => {
      console.log(err);
    });
};

function Store() {
  useEffect(() => {
    if (localStorage.getItem("registertoken")) {
      f2();
    } else if (localStorage.getItem("token")) {
      console.log("u r logedin");
    } else {
      console.log("Kindly register or use correct ");
    }
  }, []);
  console.log("sssssssd3s");
  return (
    <BrowserRouter>
      <Header />
      <ProjectName />
      <Switch>
        <Route path="/store" exact component={Home} />
        <Route path="/about" exact component={AboutUs} />
        <Route path="/contact/:_id" exact component={ContactUs} />
        <Route path="/home/view/:_id" exact component={ViewItem} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}

export default Store;
