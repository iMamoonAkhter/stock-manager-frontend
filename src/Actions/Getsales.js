import axios from "axios";
let tenantID = localStorage.getItem("tenantId");
export const getSales = (setData) => {
  axios
    .get(`http://localhost:8000/API/orders/sales/${tenantID}`)
    .then((res) => {
      console.log(res);
      let managedData = res.data.map((item) => {
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

export const getManualSales = (setData) => {
  axios
    .get(`http://localhost:8000/API/ManualOrders/ManualOrderSales/${tenantID}`)
    .then((res) => {
      console.log(res);
      let managedData = res.data.map((item) => {
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
