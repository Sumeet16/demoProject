import react from "react";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./Terms.css"

const Terms = () => {
    return (
        <>
            <Header color="black" />
            <div className="terms-frame">
                <iframe src="https://tradelal-terms-page.netlify.app/" width="90%" height="600"></iframe>
            </div>
            <Footer />
        </>
    )
}

export default Terms