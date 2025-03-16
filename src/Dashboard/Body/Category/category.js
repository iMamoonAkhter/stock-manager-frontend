import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { FcPrint } from "react-icons/fc";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import FlashMessage from "../../../Pages/FlashMessage";
import EditCategory from "../Category/EditCategory";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  miandiv: {
    // width: "100%",
    height: 450,
    backgroundColor: "white",
    border: "1px dashed grey",
    [theme.breakpoints.down("md")]: {
      height: 600,
      marginTop: "2em",
    },
    title: {
      marginTop: "10px",
    },
  },
  uppergrid: {
    marginTop: "2em",
    marginBottom: "1em",
  },
  avatar: {
    width: "25px",
    height: "20px",
  },
  delete: {
    color: "red",
    marginRight: "5px",
  },
  edit: {},
}));

let tenantID = localStorage.getItem("tenantId");
function Category() {
  const classes = useStyles();
  let history = useHistory();
  let { path, url } = useRouteMatch();
  // const [data, setDate] = useState(orders);
  const [rowdata, setRowdata] = useState([]);
  const [success, setSuccess] = useState(false);
  const handleDelete = (_id) => {
    console.log(_id);
    axios
      .delete(`http://localhost:8000/API/categories/${_id}`)
      .then((res) => {
        // history.push("http://localhost:3000/store");
        console.log(res.data);

        setRowdata(rowdata);
        setSuccess(true);
        history.push("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(rowdata, "rowdatarowdatarowdata");
  const columns = [
    { field: "id", headerName: "ID", width: 195 },
    {
      field: "name",
      headerName: "Name",
      width: 320,
    },
    {
      field: "tenant_id",
      headerName: "Tenant_Id",
      width: 320,
    },

    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Link>
              <Button
                variant="contained"
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(params.row._id)}
              >
                <DeleteOutlineIcon
                  style={{ color: "red", marginRight: "5px" }}
                />
              </Button>
            </Link>

            <Link to={`${url}/${params.row._id}`}>
              <Button variant="contained">
                <EditIcon style={{ color: "blue", cursor: "pointer" }} />
              </Button>
            </Link>
          </>
        );
      },
      width: 360,
    },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/API/categories/${tenantID}`)
      .then((res, req) => {
        // history.push("http://localhost:3000/store");
        console.log(res.data);
        setRowdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(rowdata);

  // const rows = [
  //   {
  //     id: 1,
  //     name: "Ahsan",
  //   },
  // ];
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.uppergrid}
      >
        <Grid item>
          <Typography variant="h3" className={classes.title}>
            Category
          </Typography>
        </Grid>
        <Grid item>
          <Link to={`${url}/add`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add Category
            </Button>
          </Link>
        </Grid>
      </Grid>

      {rowdata.length > 0 && (
        <div className={classes.miandiv}>
          <DataGrid
            rows={rowdata}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      )}
      {success ? <FlashMessage message={"Category Delete"} /> : ""}
    </>
  );
}

export default Category;
