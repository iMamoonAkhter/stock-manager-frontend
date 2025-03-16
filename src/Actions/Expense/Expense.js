import axios from "axios";
export const editExpense = (data, history, id, setSuccess) => {
  axios
    .put(`https://stock-manager-backend-livid.vercel.app/API/expense/${id}`, data)
    .then((res) => {
      console.log("add cart response    ", res.data);
      setSuccess(true);
      history.push("/category");
    })
    .then((error) => console.log(error));
};
export const getExpense = (id, setData) => {
  debugger;
  axios
    .get(`https://stock-manager-backend-livid.vercel.app/API/expense/${id}`, id)
    .then((res) => {
      debugger;
      console.log("add cart response    ", res.data);
      setData(res.data);
    })
    .then((error) => console.log(error));
};
