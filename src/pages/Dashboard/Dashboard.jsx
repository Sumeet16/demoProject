import React, { useState, useEffect } from "react";
import ReactDataTablePagination from 'react-datatable-pagination'
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [sales, setSales] = useState([])
  const [orders, setorders] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/logAdmin", { replace: true })
    }
  })

  const getSales = async () => {
    try {
      const res = await fetch("http://localhost:8000/getSales");

      const sales = await res.json();

      setSales(sales.sales);
    } catch (error) {
      console.log(error);
    }
  }

  const getOrder = async () => {
    try {
      const res = await fetch("http://localhost:8000/getOrder");
      const orders = await res.json();
      setorders(orders.orders)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSales();
    getOrder();
    localStorage.setItem("userName", "Admin");
  }, [])


  var totalSales = 0

  for (let i = 0; i < sales.length; i++) {
    totalSales += sales[i].price
  }

  const handleClick = async (element, item) => {
    const res = await fetch("http://localhost:8000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        element, item
      })
    })

    const result = await res.json();
    setorders(result.orders)
  }

  return (
    <>
      <div className="revenue_container">
        <h1 style={{ marginLeft: '5rem', marginBlockStart: "3rem" }}>Approve Order</h1>
        <div className="recent_purchase">
          {orders.length > 0 ? <>
            <table>
              <tr>
                <th>Course Name</th>
                <th>Customer Name</th>
                <th>Course Price</th>
                <th>Transaction ID</th>
                <th>Transaction Image</th>
                <th>Transaction Time</th>
                <th>Approve/Decline</th>
              </tr>
              {orders.map((elem, index) => {
                return (
                  <>
                    <tr>
                      <td>{elem.title}</td>
                      <td>{elem.userName}</td>
                      <td>{elem.price} RS</td>
                      <td>{elem.transactionid.length > 0 ? elem.transactionid : <>N/A</>}</td>
                      <td>{elem.img.length > 0 ? <><a style={{ border: "none" }} target="_blank" href={elem.img}>{elem.img}</a></> : <>N/A</>}</td>
                      <td>{elem.time}</td>
                      <td style={{ display: "flex", justifyContent: "space-around" }}><p onClick={() => { handleClick("Approve", elem) }} style={{ cursor: "pointer" }}>✅</p><p onClick={() => { handleClick("Decline", elem) }} style={{ cursor: "pointer" }}>❌</p></td>
                    </tr>
                  </>
                )
              })}
            </table>
          </> : <><h3>No Order At Time</h3></>}
        </div>

        <h1 style={{ marginLeft: '5rem', marginBlockStart: "3rem" }}>Purchase History</h1>

        <div className="recent_purchase">
          {sales.length > 0 ? <ReactDataTablePagination arrayOfObjects={sales.reverse()} dataInOnePage={5} /> : <><p>Loading Data...</p></>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;