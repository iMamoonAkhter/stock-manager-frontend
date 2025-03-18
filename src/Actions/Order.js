import axios from "axios";

let tenantID = localStorage.getItem("tenantId");
const userId = localStorage.getItem("userID");

export const OrderCheckout = (payload) => {
  // debugger;
  axios
    .post(`http://localhost:8000/API/orders/placeOrder/${userId}`, payload)
    .then((res) => {
      // debugger;
      console.log("add cart response", res.data);
    })
    .then((error) => console.log(error));
};

export const getOrders = (setData) => {
  // debugger;
  axios
    .get(`http://localhost:8000/API/orders/tenant/${tenantID}`)
    .then((res) => {
      console.log(res);
      let managedData = res.data.map((item) => {
        // debugger;
        console.log(res, "res");
        return {
          id: item._id,
          customerName: item.user_id.firstname + " " + item.user_id.lastname,
          number: item.user_id.contact,
          totalprice: item.totalAmount,
          address: item.address,
          status: item.OrderStatus,
        };
      });
      setData(managedData);
    })
    .then((error) => console.log(error));
};

export const getManualOrders = (setData) => {
  // debugger;
  axios
    .get(`http://localhost:8000/API/ManualOrders/tenant/${tenantID}`)
    .then((res) => {
      console.log(res);
      let managedData = res.data.map((item) => {
        // debugger;
        console.log(res, "res");
        return {
          id: item._id,
          customerName: item.name,
          number: item.contact,
          totalprice: item.totalAmount,
          address: item.address,
          status: item.OrderStatus,
        };
      });
      setData(managedData);
    })
    .then((error) => console.log(error));
};

export const orderplaced = (id) => {
  // debugger;

  axios
    .put(`http://localhost:8000/API/orders/${id}`)
    .then((res) => {
      // debugger;
      console.log("placedorder   ", res.data);
    })
    .then((error) => console.log(error));
};

export const UpdateManualOrderPlaced = (id) => {
  // debugger;

  axios
    .put(`http://localhost:8000/API/ManualOrders/${id}`)
    .then((res) => {
      // debugger;
      console.log("UpdateManualOrderPlaced   ", res.data);
    })
    .then((error) => console.log(error));
};

export const placeManualOrder = (data) => {
  debugger;

  axios
    .post(
      `http://localhost:8000/API/ManualOrders/ManualOrder/${data.tenant_id}`,
      data
    )
    .then((res) => {
      debugger;
      console.log("Manualorderplaced   ", res.data);
    })
    .then((error) => console.log(error));
};
