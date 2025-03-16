import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { MdDelete } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import FlashMessage from "../Pages/FlashMessage";
import { Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  maingrid: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10%",
    // boxShadow: "0 5px 10px #777",
    border: "0.5px solid grey",
    width: "40%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "7em",
    },
  },
}));
const gettoken = localStorage.getItem("adminregistertoken");

const f2 = async () => {
  console.log(gettoken, "get token");
  const data = {
    token: gettoken,
  };
  console.log("from Activation api");

  axios
    .post("https://stock-manager-backend-livid.vercel.app/API/admin/ActivateAccount", data)
    .then((res) => {
      // history.push("http://localhost:3000/store");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function Login() {
  let history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [success, setSuccess] = useState(false);
  const [TenantItem, setTenantItem] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("adminregistertoken")) {
      f2();
      // setSuccess(true);
    } else if (localStorage.getItem("admintoken")) {
      console.log("u r logedin");
      // setSuccess(true);
    } else {
      console.log("Kindly register or use correct ");
    }

    // axios
    //   .get(`https://stock-manager-backend-livid.vercel.app/API/tenant/Admin/${id}`)
    //   .then((res) => {
    //     debugger;
    //     console.log(res.data);
    //     setTenantItem(res.data[0].Tenant);
    //     //   history.push("/store");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getTenants();
  }, []);

  const getTenants = () => {
    debugger;
    const id = localStorage.getItem("adminID");
    axios
      .get(`https://stock-manager-backend-livid.vercel.app/API/tenant/Admin/${id}`)
      .then((res) => {
        debugger;
        console.log(res.data);
        setTenantItem(res.data[0].Tenant);
        //   history.push("/store");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (Tenant_id) => {
    debugger;
    const id = localStorage.getItem("adminID");
    axios
      .delete(`https://stock-manager-backend-livid.vercel.app/API/tenant/${id}/${Tenant_id}`)
      .then((res) => {
        debugger;
        console.log(res.data);
        getTenants();
        //   history.push("/store");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const onSubmit = (data) => console.log(data);
  console.log(TenantItem);
  return (
    <div className={classes.div}>
      {success ? <FlashMessage message={"Your are logedIn"} /> : ""}
      <Grid
        container
        className={classes.maingrid}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">
              Tenant Login <BiLogInCircle color="blue" />
            </Typography>
          </Grid>

          {TenantItem.map((item) => {
            console.log("check1", item.Tenant_name);
            return (
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  style={{
                    boxShadow: "0 5px 10px #777",
                    border: "0.5px solid grey",
                    borderRadius: "10px",
                    backgroundColor: "",
                    marginTop: "1em",
                  }}
                >
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={() => {
                        localStorage.setItem("tenantId", item.Tenant_id);
                        history.push("/admin");
                      }}
                    >
                      {item.Tenant_name}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => handleDelete(item._id)}>
                      <MdDelete size="3em" color="red" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => history.push("/createnew")}
            >
              Create New
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
