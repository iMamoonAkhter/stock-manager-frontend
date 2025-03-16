import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Nav/Navbar";
import Sidebar from "./Sidenav/Sidenav";
import Dashboard from "../Body/Dashboard";
import Notification from "../Body/Notification";
import Sales from "../Body/Sales/Sales";
import Products from "../Body/Products/Products";
import SingleProduct from "../Body/Products/SingleProduct";
import AddNewProduct from "../Body/Products/AddNewProduct";
import SingleSale from "../Body/Sales/SingalSale";
import AddNewSale from "../Body/Sales/AddNewSale";
import Order from "../Body/Order/Order";
import FlashMessage from "../../Pages/FlashMessage";
import AddOrder from "../Body/Order/AddOrder";
import { Box } from "@material-ui/core";
import Category from "../Body/Category/category";
import AddCategory from "../Body/Category/AddCategory";
import EditCategory from "../Body/Category/EditCategory";
import Message from "../Body/Message/Message";
import People from "../Body/people/People";
import Expense from "../Body/Expense/Expense";
import AddExpense from "../Body/Expense/AddExpense";
import EditExpense from "../Body/Expense/EditExpense";
import ManualOrder from "../Body/ManaulOrder/ManualOrder";
import ManualSale from "../Body/Sales/ManualSale";
import axios from "axios";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    marginTop: "1.5em",
    // backgroundColor: "#27ABEB",
    padding: theme.spacing(6, 2, 0, 32),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
      marginTop: "2em",
    },
  },
}));

// const gettoken = localStorage.getItem("adminregistertoken");

// const f2 = async () => {
//   console.log(gettoken, "get token");
//   const data = {
//     token: gettoken,
//   };
//   console.log("from Activation api");

//   axios
//     .post("https://stock-manager-backend-livid.vercel.app/API/admin/ActivateAccount", data)
//     .then((res) => {
//       // history.push("http://localhost:3000/store");
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

function HeaderComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("adminregistertoken")) {
  //     f2();
  //     setSuccess(true);
  //   } else if (localStorage.getItem("admintoken")) {
  //     console.log("u r logedin");
  //     setSuccess(true);
  //   } else {
  //     console.log("Kindly register or use correct ");
  //   }
  // }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar handleDrawerToggle={handleDrawerToggle} />

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerClose={handleDrawerClose}
      />
      {/* {success ? <FlashMessage message={"Your are logedIn"} /> : ""} */}
      <Box className={classes.wrapper}>
        <Switch>
          <Route path="/admin" exact component={Dashboard} />
          <Route path="/admin/:token" exact component={Dashboard} />
          <Route path="/notification" exact component={Notification} />
          <Route path="/sales" exact component={Sales} />
          <Route path="/sales/manual" exact component={ManualSale} />
          <Route path="/message" exact component={Message} />
          <Route path="/people" exact component={People} />
          <Route path="/expense" exact component={Expense} />
          <Route path="/expense/add" exact component={AddExpense} />
          <Route path="/expense/:id" exact component={EditExpense} />

          <Route path="/products" exact component={Products} />
          <Route path="/products/add" exact component={AddNewProduct} />
          <Route path="/products/:id" exact component={SingleProduct} />
          <Route path="/sales/add" exact component={AddNewSale} />
          <Route path="/sales/:saleId" exact component={SingleSale} />
          <Route path="/orders" exact component={Order} />
          <Route path="/ordermanual" exact component={ManualOrder} />

          <Route path="/ordermanual/add" exact component={AddOrder} />
          <Route path="/category" exact component={Category} />
          <Route path="/category/add" exact component={AddCategory} />
          <Route path="/category/:id" exact component={EditCategory} />
        </Switch>
      </Box>
    </div>
  );
}

export default HeaderComponent;
