import React from 'react'
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

const PrivacyPolicy = () => {
    return (
        <>
            <Header color="black" />
            <div className="terms-frame" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <iframe src="https://tradelal-privacy-policy.netlify.app/" style={{ marginBottom: "2rem" }} width="90%" height="600"></iframe>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy