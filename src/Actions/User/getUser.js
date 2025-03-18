import axios from "axios";

export const activateInActiveUser = (data, setRowdata) => {
  debugger;
  axios
    .put(
      `http://localhost:8000/API/users/${
        data.id ? `deactivate/${data.id}` : "Reactivate"
      }`,
      data.email ? data.email : { email: data }
    )
    .then((res) => {
      debugger;
      getAllUser(setRowdata);
      console.log("add cart response    ", res.data);
    })
    .then((error) => console.log(error));
};

export const getAllUser = (setRowdata) => {
  debugger;
  axios
    .get("http://localhost:8000/API/users")
    .then((res) => {
      debugger;
      console.log(res.data);
      setRowdata(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
