import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";
import { FcDecision } from "react-icons/fc";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  maingrid: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "20%",
    boxShadow: "0 5px 10px #777",
    width: "30%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "7em",
    },
  },
}));

function InsidePopup(props) {
  let history = useHistory();
  const classes = useStyles();
  const { openPopup, handleCheckout } = props;
  return (
    <div className={classes.div}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Button component={Link} to="/store">
            <FcDecision size="small" />
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/store"
            >
              Edit Address
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleCheckout}
              color="secondary"
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default InsidePopup;
