import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import pic from "../pics/l1.jpg";
import { BsPlusCircleFill } from "react-icons/bs";
import { GrSubtractCircle } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import axios from "axios";
import { OrderCheckout } from "../Actions/Order";
const useStyles = makeStyles((theme) => ({
  outer: {
    backgroundColor: "white",
    boxShadow: "0 5px 20px #777",
    marginBottom: "0.5em",
    boxShadow: "0 5px 20px #777",
    paddingLeft: "1em",
    borderRadius: "8px",
    // mx: "1em",
    [theme.breakpoints.down("md")]: {},
  },
  photo: {
    width: "100px",
    borderRadius: "10px",
    height: "100px",
    borderBottom: "1px solid grey",
  },
  actionbtn: {
    marginRight: "1em",
    marginLeft: "1em",
  },
  innerItem: {
    margin: "2em",

    borderRight: "1px solid grey",
  },
  h2: {
    backgroundColor: "#141A46",
    borderRadius: "10px",
    padding: "10px",
    color: "white",
    boxShadow: "0 5px 20px #777",
  },
  smallouter: {
    backgroundColor: "white",
    padding: "0px",
  },
  outer2: {
    paddingTop: "5px",
    marginTop: "5px",
    backgroundColor: "white",
    boxShadow: "0 5px 20px #777",
  },
  checkbtn: {
    [theme.breakpoints.down("md")]: {
      padding: "2px",
      fontSize: "1em",
    },
  },
  fullouter2: {
    backgroundColor: "white",
    boxShadow: "0 5px 20px #777",
    marginTop: "10px",
    padding: "10px",
  },
}));
let tenantID = localStorage.getItem("tenantId");
function Cart() {
  console.log("testing cart");
  const [productData, setProductData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("md"));
  let price = 0;
  const user_id = localStorage.getItem("userID");
  const handleCheckout = () => {
    debugger;

    const addr = localStorage.getItem("address");
    const payload = {
      address: addr,
      totalAmount: price,
      user_id: user_id,
      payment: "COD",
      tenant_id: `${tenantID}`,
      items: productData.map((data) => {
        return {
          product: data.product._id,
          quantity: data.quantity,
        };
      }),
    };
    debugger;
    OrderCheckout(payload);
  };

  const classes = useStyles();
  const [cartitems, setcartitems] = useState([]);
  useEffect(() => {
    axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/cart/${user_id}`)
      .then((res) => {
        debugger;
        console.log("first data", res.data);
        // console.log("first data", res.data);
        // console.log("caaaart", res.data[0].cartItems);
        // // let testing = res.data[0].cartItems;
        // let testing = res.data.cartItems[0];
        let testing = res.data.cartItems;
        setProductData(testing);
        // console.log("testing", testing.price);
        // console.log("testing", testing.quantity);
        // console.log("testing", testing.quantity);

        setcartitems(res.data);
      })
      .then((error) => console.log(error));
  }, []);

  console.log(cartitems);

  // const full = (
  //   <React.Fragment>
  //     <Grid
  //       container
  //       className={classes.outer}
  //       justifyContent="space-evenly"
  //       alignItems="center"
  //     >
  //       <Grid item>
  //         <img src={pic} alt="title" className={classes.photo} />
  //       </Grid>
  //       <Grid item>
  //         <Grid container justifyContent="space-between" spacing={10}>
  //           <Grid item className={classes.innerItem}>
  //             <Button variant="contained" className={classes.actionbtn}>
  //               <BsPlusCircleFill />
  //             </Button>
  //             1
  //             <Button variant="contained" className={classes.actionbtn}>
  //               <GrSubtractCircle />
  //             </Button>
  //           </Grid>
  //           <Grid item className={classes.innerItem}>
  //             $ {price}
  //           </Grid>
  //           <Grid item className={classes.innerItem}>
  //             <Button variant="contained">
  //               <MdDelete fontSize="large" color="red" />
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Grid>

  //     <Grid
  //       container
  //       justifyContent="space-around"
  //       className={classes.fullouter2}
  //       spacing={2}
  //     >
  //       <Grid item>
  //         <b>Total</b>
  //       </Grid>
  //       <Grid item>${price * 2}</Grid>
  //       <Button variant="contained" color="secondary">
  //         <Grid item>CheckOut</Grid>
  //       </Button>
  //     </Grid>
  //   </React.Fragment>
  // );

  // const small = (

  // );

  return (
    // <p>heololololoo</p>

    <div>
      <h2 className={classes.h2}>Cart Items</h2>

      <React.Fragment>
        {/* <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          className={classes.smallouter}
          // key={._id}
        > */}
        
        {console.log(
          "testing1111",
          productData.map((item, index) => {
            console.log("testing22222", item.product.name);
          })
        )}
        {productData.length > 0 &&
          productData.map((item) => {
            price += item.price * item.quantity;
            return (
              <>
                <Grid
                  container
                  direction="row"
                  // spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  style={{ padding: "1em 2em" }}
                  className={classes.outer}
                >
                  <Grid item xs={3} sm={4.5}>
                    <img
                      src={`https://stock-manager-backend-indol.vercel.app/uploads/${item.product.picture}`}
                      alt="title"
                      className={classes.photo}
                    />
                  </Grid>
                  <Grid item xs={3} sm={4.5} style={{ textAlign: "center" }}>
                    <Grid container direction="column" colum>
                      <Grid item style={{ marginBottom: "2px" }}>
                        <b>Title :</b>
                        {item.product.name}
                      </Grid>
                      <Grid item style={{ marginBottom: "2px" }}>
                        <b>price : </b>
                        {item.price}
                      </Grid>

                      <Grid item style={{ marginBottom: "2px" }}>
                        {/* <Button variant="outlined">
                          <BsPlusCircleFill />
                        </Button> */}
                        <b>Quantity :</b>
                        {item.quantity}
                        {/* <Button variant="outlined">
                          <GrSubtractCircle />
                        </Button> */}
                      </Grid>
                      <Grid item style={{ marginBottom: "2px" }}>
                        <b>Price Total : </b>
                        {item.price * item.quantity}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} sm={3} style={{ textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        console.log("user ID", user_id);
                        console.log("id ID", item.product._id);
                        axios
                          .delete(
                            `https://stock-manager-backend-indol.vercel.app/API/cart/${user_id}/${item.product._id}`
                          )
                          .then((res) => {
                            console.log(res.data);
                          });
                      }}
                    >
                      <MdDelete fontSize="large" color="red" />
                    </Button>
                  </Grid>
                </Grid>
              </>
            );
          })}

        {/* </Grid> */}
        <Grid
          container
          justifyContent="flex-end"
          spacing={2}
          alignItems="center"
          className={classes.outer2}
        >
          <Grid item>
            <b>Total</b>
          </Grid>
          <Grid item>
            <b>${price && price}</b>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setOpenPopup(true)}
            >
              CheckOUT
            </Button>
          </Grid>
        </Grid>
        <Popup openPopup={openPopup} handleCheckout={handleCheckout} />
      </React.Fragment>
    </div>
  );
}

export default Cart;
