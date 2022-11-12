import React, { useEffect, useState } from 'react'
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./MeetingScheduler.css"
import moment from 'moment';

const MeetingScheduler = () => {
  const [courseTitle, setCourseTitle] = useState([]);
  const [scheduleMeeting, setScheduleMeeting] = useState([]);
  const [newMeetingSchema, setNewMeetingSchema] = useState({
    meetingTitle: "",
    dateAndTimeSelecter: "",
    courseTitle: {},
  });

  const handleChange = (event) => {
    setNewMeetingSchema({
      ...newMeetingSchema,
      [event.target.name]: event.target.value,
    });
  };

  const getCourse = async () => {
    const res = await axios("http://localhost:8080/getCourse", {
      method: "GET",
    });
    setCourseTitle(res.data.course);
  };

  const getMeetingsList = async () => {
    const res = await axios("http://localhost:8080/getMeetings", {
      method: "GET",
    });

    setScheduleMeeting(res.data.meetings);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { meetingTitle, dateAndTimeSelecter, courseTitle } = newMeetingSchema;
    const courseData = JSON.parse(courseTitle)
    const meetingLink = `http://localhost:3000/?id=-${courseData.title.replaceAll(' ', '')}&ref=admin`

    const res = await fetch("http://localhost:8080/addNewMeeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingTitle,
        dateAndTimeSelecter,
        courseTitle,
        meetingLink
      }),
    });

    const result = await res.json();
    const statusCode = res.status;

    getMeetingsList()

    if (statusCode === 422 || !result) {
      toast.error("Meeting Not Added !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 409) {
      toast.error("Same Meeting Exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 401) {
      toast.error("Unauthorized", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 200) {
      toast.success("Meeting Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch("http://localhost:8080/deleteMeeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      })
    })

    const result = await res.json();
    const statusCode = res.status;

    if (statusCode == 200) {
      toast.success("Meeting Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Error Occured while deleting the meeting", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    getMeetingsList()
  }


  useEffect(() => {
    getCourse();
    getMeetingsList();
  }, []);

  return (
    <>
      <div className="addBlogMainContain">
        <ToastContainer />
        <form
          method="post"
          className="input-holder-addblog"
          onSubmit={(e) => { handleSubmit(e) }}
        >
          <h2>Schedule New Meeting</h2>
          <input
            type="text"
            name="meetingTitle"
            id="meetingTitle"
            placeholder="Meeting Title"
            onChange={(event) => handleChange(event)}
          />

          <input
            type="datetime-local"
            name="dateAndTimeSelecter"
            id="dateAndTimeSelecter"
            onChange={(event) => handleChange(event)}
          />

          <select name="courseTitle" id="courseTitle" onChange={(event) => handleChange(event)}>
            <option value="select">Select the course</option>
            {
              courseTitle.map((elem, index) => {
                return (
                  <option value={JSON.stringify({ id: elem._id, title: elem.title })}>{elem.title}</option>
                )
              })
            }
          </select>

          <button type="submit" className="submit-btn">
            Schedule Meeting
          </button>
        </form>
      </div>

      <div className="updateSection">
        <h1>Scheduled Meeting</h1>

        {scheduleMeeting.length == 0 ? <><b>No Scheduled Meeting</b></> : <div className="updateCourseCard">
          {
            scheduleMeeting.map((elem, index) => {
              return (
                <>
                  <div className="cardRow">
                    <div className="leftSide" style={{ width: "85%" }}>
                      <div className="detailsDiv">
                        <p className="detailDivTitle">Meeting Title</p>
                        <p className="details">{elem.meetingTitle}</p>
                      </div>
                      <div className="detailsDiv">
                        <p className="detailDivTitle">Meeting Date And Time</p>
                        <p className="details">{moment(elem.dateAndTimeSelecter).format("llll")}</p>
                      </div>
                      <div className="detailsDiv">
                        <p className="detailDivTitle">Course Title</p>
                        <p className="details">{elem.courseT}</p>
                      </div>
                      <div className="detailsDiv">
                        <p className="detailDivTitle">Email Status</p>
                        {elem.emailStatus ? <><p className="details">Email Send ✅</p></> : <><p className="details">Sending the emails...</p></>}
                      </div>
                    </div>
                    <div className="rightSide" style={{ width: "15%" }}>
                      <div className="editBTN" style={{ fontWeight: "800", fontSize: "1.1rem" }}> <a style={{ textDecoration: "none", color: "black" }} href={elem.meetingLink} target="_blank" rel="noopener noreferrer">Join Now</a> </div>
                      <div className="editBTN" style={{ fontWeight: "800", fontSize: "1.1rem" }}> <p style={{ textDecoration: "none", color: "black" }} onClick={() => { handleDelete(elem._id) }} >Delete It</p> </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>}
      </div>
    </>
  )
}

export default MeetingScheduler