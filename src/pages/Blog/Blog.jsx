import React from 'react'
import Header from '../../components/Header/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'
import Footer from '../../components/Footer/Footer'

const Blog = () => {
    const { slug } = useParams()
    const [blogDetails, setBlogDetails] = useState({})

    useEffect(() => {
        fetch('http://localhost:8080/getBlog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug: slug
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setBlogDetails(data.blog)
        })
    }, [])
    return (
        <>
            <Header />
            {
                Object.keys(blogDetails).length !== 0 && (
                    <section className='blogContain' style={{margin: "2rem 0"}}>
                        <div className='blogMain'>
                            <div className='blogImageContain'>
                                <img src={blogDetails.image} alt="" />
                            </div>
                            <h1>{blogDetails.title}</h1>
                            <article>
                                {blogDetails.description}
                            </article>
                        </div>
                    </section>
                )
            }
            <footer><Footer /></footer>
        </>
    )
}

export default Blog