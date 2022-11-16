import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./StripeContainer.css"
import { UilTimesCircle } from '@iconscout/react-unicons'

const StripeContainer = () => {
  const navigate = useNavigate();
  const [success, setsuccess] = useState(false);
  const [User, setUser] = useState([]);
  const [transactionId, settransactionId] = useState("");
  const [qr, setQr] = useState('')
  const [closeState, setcloseState] = useState(false);
  const [courseInfo, setCourseInfo] = useState([]);
  const [newImg, setnewImg] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');
  const [upiUrl, setupiUrl] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      navigate(`/loguser`)
    }
    const getCourseById = async (id) => {
      const res = await fetch("http://localhost:8000/getCourseById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      })

      const result = await res.json();
      const data = result.course;
      setCourseInfo(data)
      setupiUrl(`upi://pay?pa=9265587630@paytm&pn=Ecom&am=${data.dprice}&cu=INR`)

      QRCode.toDataURL(`upi://pay?pa=9265587630@paytm&pn=Ecom&am=${data.dprice}&cu=INR`, {
        margin: 2,
        color: {
          dark: '#335383FF',
          light: '#EEEEEEFF'
        }
      }, (err, url) => {
        if (err) return console.error(err)

        console.log(url)
        setQr(url)
      })
    }
    getCourseById(myParam)

    const getUser = async () => {
      const userId = localStorage.getItem("userId")

      const response = await axios.post("http://localhost:8000/getUser", {
        userId
      })
      setUser(response.data.user);
    }
    getUser()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId")
      var transactionid;
      if (transactionId || newImg) {
        transactionid = transactionId
        const response = await axios.post("http://localhost:8000/order", {
          amount: courseInfo.dprice,
          courseId: courseInfo._id,
          courseTitle: courseInfo.title,
          userName: User.username,
          email: User.email,
          transactionid,
          img: newImg,
          userId
        })

        if (response.data.success) {
          console.log("Successful payment")
          setcloseState(false)
          setsuccess(true)
        }
      } else {
        alert("Enter the input properly....")
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  const getImgURL = (ev) => {
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("https://api.imgur.com/3/image", {
      method: "post",
      headers: {
        Authorization: "Client-ID 733ffe3304238a7",
        Accept: "application/json",
      },
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => {
        setnewImg(data.data.link)
      });
  };

  return (
    <>
      <div className="payment_Main_Cont">
        <div className="sucess_page_cont" style={success ? { visibility: "visible" } : { visibility: "hidden" }}>
          <div className="blur"></div>
          <div className="success_page">
            <h1>Order Submitted🎉🎉</h1>
            <div className="confirnBtn" onClick={() => { navigate("/", { replace: true }) }} style={{ width: "50%", textAlign: "center", cursor: "pointer", background: "orange", padding: "1rem", borderRadius: "2rem" }}>Go Back To Home Page</div>
          </div>
        </div>
        <div style={closeState ? { visibility: "visible" } : { visibility: "hidden" }}>
          <div className="blur"></div>
          <form
            method="post"
            onSubmit={(event) => handleSubmit(event)}
            className="input-holder-addblog confirmOrderPage"
          >
            <div className='firstRow'><h2>Confirmation Form</h2> <p onClick={() => { setcloseState(false) }}><UilTimesCircle /></p></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter the Transaction Id"
              onChange={(event) => settransactionId(event.target.value)}
            />

            <p>Or</p>

            <input
              type="file"
              name="file"
              id="file"
              onChange={(ev) => getImgURL(ev)}
            />
            <p>{newImg}</p>
            {
              newImg !== "" && (
                <div className="preview-image">
                  <img
                    src={newImg}
                    alt="loading..."
                    className="prev-img"
                  />
                </div>
              )
            }
            <button type="submit" className="submit-btn">
              Confirm Payment
            </button>
          </form>
        </div>

        <div className="payment_cont">
          <h1>Payment Page</h1>
          {qr && <>
            <img src={qr} />
          </>}
          <p className="price">Course Amount: {courseInfo.dprice} Rs</p>
          <p className="note">Note: After Successful payment upload Transaction Id or upload the screenshot of payment sucess page. After submiting the screenshot or Transaction Id you would be added to the course within 24 HR.</p>
          <div className='upiOnPhone'>{upiUrl && <a href={upiUrl} target="_blank">Open Link on Phone</a>}<p>(Requirses UPI app)</p></div>
          <div className="confirnBtn" onClick={() => { setcloseState(true) }} style={{ width: "30%", textAlign: "center", cursor: "pointer", background: "orange", padding: "1rem", borderRadius: "2rem" }}>Confirm Payment</div>
        </div>
      </div>
    </>
  )
}

export default StripeContainer