import React, { useState, useEffect } from "react";
import ReactDataTablePagination from 'react-datatable-pagination'
import "./Dashboard.css";
import RevenueCard from "../../components/RevenueCard/RevenueCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [sales, setSales] = useState([])
  const [orders, setorders] = useState([]);

  const [currentDate, setCurrentDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const [salesBracket, setSalesBracket] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0,
    total: 0
  })

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/logAdmin", { replace: true })
    }
  })

  const getSales = async () => {
    try {
      const res = await fetch("http://localhost:8080/getSales");

      const sales = await res.json();

      setSales(sales.sales);
    } catch (error) {
      console.log(error);
    }
  }

  const getOrder = async () => {
    try {
      const res = await fetch("http://localhost:8080/getOrder");
      const orders = await res.json();
      setorders(orders.orders)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSales();
    getOrder();
  }, [])

  useEffect(() => {
    if (sales.length != 0) {

      const dailySalesArray = [];
      const monthlySalesArray = [];
      const yearlySalesArray = [];
      const totalSalesArray = [];

      sales.forEach((sale) => {

        const dateWithComma = sale.time.split(" ")[0];
        const salesDateWithoutComma = dateWithComma.slice(0, -1);
        const dateDMYarray = salesDateWithoutComma.split("/");

        const temp = dateDMYarray[0]; // storing 1st ele as temp variable

        // replacing date with month (2nd element becomes 1st)
        const dateIndex = dateDMYarray.indexOf(dateDMYarray[0]);
        if (dateIndex !== -1) {
          dateDMYarray[0] = dateDMYarray[1];
        }

        // replacing month with date (1st element stored as a temp veriable becomes second)
        const monthIndex = dateDMYarray.indexOf(dateDMYarray[1]);
        if (monthIndex !== -1) {
          dateDMYarray[1] = temp;
        }

        const formattedDate = new Date(dateDMYarray.join("-"));
        // console.log(formattedDate);

        const day = formattedDate.getDate()
        const month = formattedDate.getMonth()
        const year = formattedDate.getFullYear()

        day == currentDate.day && dailySalesArray.push(sale.price)
        month == currentDate.month && monthlySalesArray.push(sale.price)
        year == currentDate.year && yearlySalesArray.push(sale.price)
        totalSalesArray.push(sale.price)
      })

      // console.log({
      //   monthlySalesArray,
      //   dailySalesArray,
      //   yearlySalesArray,
      //   totalSalesArray
      // })

      function addArray(array) {
        let total = 0
        array.forEach((ele) => {
          total = total + ele
        })
        return total
      }

      const daily = addArray(dailySalesArray)
      const monthly = addArray(monthlySalesArray)
      const yearly = addArray(yearlySalesArray)
      const total = addArray(totalSalesArray);

      setSalesBracket((prev) => {
        return {
          ...prev,
          daily,
          monthly,
          yearly,
          total
        }
      })

    }
  }, [sales])


  var totalSales = 0

  for (let i = 0; i < sales.length; i++) {
    totalSales += sales[i].price
  }

  const handleClick = async (element, item) => {
    const res = await fetch("http://localhost:8080/pay", {
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
        <div className="revenue-card-holder">
          <RevenueCard title={"Yearly Sales"} amount={salesBracket.yearly / 100} />
          <RevenueCard title={"Monthly Sales"} amount={salesBracket.monthly / 100} />
          <RevenueCard title={"Daily Sales"} amount={salesBracket.daily / 100} />
          <RevenueCard title={"Total Sales"} amount={(salesBracket.total) / 100} />
        </div>

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
                      <td>{elem.img.length > 0 ? <><a style={{border: "none"}} target="_blank" href={elem.img}>{elem.img}</a></> : <>N/A</>}</td>
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