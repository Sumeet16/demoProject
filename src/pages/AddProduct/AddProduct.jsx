import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProduct.css'
import { UilPlus } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilPen } from '@iconscout/react-unicons'
import axios from "axios";

const AddProduct = () => {
  const [showUpdateBox, setshowUpdateBox] = useState(false);
  const [updateCourseInfo, setupdateCourseInfo] = useState([]);
  const [newVideoLink, setnewVideoLink] = useState();
  const [videos, setvideos] = useState([]);
  const [videoDisplay, setvideoDisplay] = useState([]);
  const [course, setCourse] = useState([]);
  const [newCourseSchema, setNewCourseSchema] = useState({
    title: "",
    price: 0,
    discount: 0,
    description: "",
    courseImage: "",
    videoTitle: "",
    courseVideoLinkAdder: ""
  });
  const handleChange = (event) => {
    setNewCourseSchema({ ...newCourseSchema, [event.target.name]: event.target.value })
  }

  const getCourse = async () => {
    const res = await axios("http://localhost:8080/getCourse", {
      method: "GET",
    });
    setCourse(res.data.course);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, price, discount, description, courseImage } = newCourseSchema

    let dprice = 0;

    if (discount > -1 && discount < 100) {
      dprice = price - (price * discount / 100)
    } else {
      toast.error(`Discount can't be lower than 0 or greater than 100`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const res = await fetch("http://localhost:8080/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, price, discount, description, courseImage, videos, dprice
      })
    })

    const result = await res.json();
    const statusCode = res.status;

    if (statusCode === 422 || !result) {
      toast.error('Course Add Failed !!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success('Course Added!!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setNewCourseSchema({
        title: "",
        price: 0,
        discount: 0,
        description: "",
        courseImage: "",
        videoTitle: "",
        courseVideoLinkAdder: ""
      })

      getCourse();
    }
  };

  const addLink = () => {
    const { videoTitle, courseVideoLinkAdder } = newCourseSchema
    setvideos([...videos, { videoTitle: videoTitle, videoUrl: courseVideoLinkAdder }])
    setvideoDisplay([...videoDisplay, courseVideoLinkAdder])
  }

  const removeIt = (index) => {
    console.log(index);
    setvideoDisplay(videoDisplay.filter((o, i) => index !== i));
    setvideos([
      ...videos.slice(0, index),
      ...videos.slice(index + 1, videos.length)
    ])
  }

  useEffect(() => {
    getCourse();
  }, []);

  const deleteIt = async (id) => {
    const res = await fetch("http://localhost:8080/deleteCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      })
    })

    const result = await res.json();
    console.log(result);

    getCourse();
  }

  const getCourseById = async (id) => {
    const res = await fetch("http://localhost:8080/getCourseById", {
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
    setupdateCourseInfo(data)
    setvideos(data.videos)
  }

  const updateCourse = async (event) => {
    event.preventDefault();
    const discount = updateCourseInfo.discount
    const price = updateCourseInfo.price;

    let dprice = 0;

    if (discount > -1 && discount < 100) {
      dprice = price - (price * discount / 100)
    } else {
      toast.error(`Discount can't be lower than 0 or greater than 100`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const res = await fetch("http://localhost:8080/updateCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateCourseInfo, videos, dprice
      })
    })

    const result = await res.json();
    const data = result.course;
    console.log(result);
    setNewCourseSchema({
      title: "",
      price: 0,
      discount: 0,
      description: "",
      courseImage: "",
      videoTitle: "",
      courseVideoLinkAdder: ""
    })

    getCourse()
  }


  return (
    <>
      <div className="updateForm">
        {showUpdateBox ? (
          <div className="bg_updateBox">
            <div className="updateCloseBtn"><UilTimes onClick={() => { setshowUpdateBox(!showUpdateBox); setvideos([]) }} /></div>
            <form className="input-holder-new update">
              <h2>UpdateCourse</h2>
              <input
                type="text"
                name="title"
                id="name"
                placeholder="Enter Course Name here"
                value={updateCourseInfo.title}
                onChange={(event) => { setupdateCourseInfo({ ...updateCourseInfo, [event.target.name]: event.target.value }) }}
              />
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter Course Price"
                onChange={(event) => { setupdateCourseInfo({ ...updateCourseInfo, [event.target.name]: event.target.value }) }}
                value={updateCourseInfo.price}
              />
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount on course (optional)"
                onChange={(event) => { setupdateCourseInfo({ ...updateCourseInfo, [event.target.name]: event.target.value }) }}
                value={updateCourseInfo.discount}
              />
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Course Description"
                rows="4" cols="75"
                onChange={(event) => { setupdateCourseInfo({ ...updateCourseInfo, [event.target.name]: event.target.value }) }}
                value={updateCourseInfo.description}
              />
              <input
                type="text"
                name="courseImage"
                id="CImage"
                placeholder="Enter Course Image URL here"
                onChange={(event) => { setupdateCourseInfo({ ...updateCourseInfo, [event.target.name]: event.target.value }) }}
                value={updateCourseInfo.courseImage}
              />
              <div className="addVideoCont">
                <input
                  type="text"
                  name="courseVideoLinkAdder"
                  id="videoAdder"
                  placeholder="Enter Course Video links here"
                  onChange={(event) => handleChange(event)}
                />
                <div className="add_Cont">
                  <UilPlus className="add" onClick={addLink} />
                </div>
              </div>
              <div className="videoLinksDisplayBox">
                {
                  videoDisplay.map((elem, index) => {
                    return (
                      <>
                        <div><UilTimes className="CourseCross" key={index} onClick={() => { removeIt(index); }} /><a href={elem}><p>{elem}</p></a><br /></div>
                      </>
                    )
                  })
                }
              </div>
              <p onClick={(event) => { updateCourse(event) }} className="submit-btn">Update Course</p>
              <ToastContainer />
            </form>
          </div>
        ) : (<></>)}
      </div>
      <div className="flexbox">
        {!showUpdateBox ? (
          <>
            <form method="post" onSubmit={(event) => handleSubmit(event)} className="input-holder-new">
              <h2>Add a New Course</h2>
              <input
                type="text"
                name="title"
                id="name"
                placeholder="Enter Course Name here"
                onChange={(event) => handleChange(event)}
              />
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter Course Price"
                onChange={(event) => handleChange(event)}
              />
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount on course (optional)"
                onChange={(event) => handleChange(event)}
              />
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Course Description"
                rows="4" cols="75"
                onChange={(event) => handleChange(event)}
              />
              <input
                type="text"
                name="courseImage"
                id="CImage"
                placeholder="Enter Course Image URL here"
                onChange={(event) => handleChange(event)}
              />
              <input
                type="text"
                name="videoTitle"
                id="vTitle"
                placeholder="Enter video title here"
                onChange={(event) => handleChange(event)}
              />
              <div className="addVideoCont">
                <input
                  type="text"
                  name="courseVideoLinkAdder"
                  id="videoAdder"
                  placeholder="Enter Course Video links here"
                  onChange={(event) => handleChange(event)}
                />
                <div className="add_Cont">
                  <UilPlus className="add" onClick={addLink} />
                </div>
              </div>
              <div className="videoLinksDisplayBox">
                {
                  videoDisplay.map((elem, index) => {
                    return (
                      <>
                        <div><UilTimes className="CourseCross" key={index} onClick={() => { removeIt(index) }} /><a href={elem}><p>{elem}</p></a><br /></div>
                      </>
                    )
                  })
                }
              </div>
              <button type="submit" className="submit-btn">Add Course</button>
              <ToastContainer />
            </form>

            <div className="updateSection">
              <h1>Update/Delete Courses</h1>

              <div className="updateCourseCard">
                {
                  course.map((elem, index) => {
                    return (
                      <>
                        <div className="cardRow">
                          <div className="leftSide">
                            <div className="detailsDiv">
                              <p className="detailDivTitle">Course Title</p>
                              <p className="details">{course[index].title}</p>
                            </div>
                            <div className="detailsDiv">
                              <p className="detailDivTitle">Course Price</p>
                              <p className="details">{course[index].dprice}$</p>
                            </div>
                            <div className="detailsDiv">
                              <p className="detailDivTitle">Discount</p>
                              <p className="details">{course[index].discount}%</p>
                            </div>
                          </div>
                          <div className="rightSide">
                            <div className="editBTN"><UilPen onClick={() => { setshowUpdateBox(!showUpdateBox); window.scrollTo(top); getCourseById(course[index]._id) }} /></div>
                            <div className="deleteBTN"><UilTrashAlt onClick={() => { deleteIt(course[index]._id) }} /></div>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </>
        ) : (<></>)}


      </div>
    </>
  )
}

export default AddProduct

