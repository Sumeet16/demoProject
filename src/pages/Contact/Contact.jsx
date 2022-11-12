import React from "react";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import { UilTelegram } from '@iconscout/react-unicons'
import { UilPhoneAlt } from '@iconscout/react-unicons'
import { UilEnvelopeDownload } from '@iconscout/react-unicons'
import "./Contact.css"

const Contact = () => {
    return (
        <>
            <Header color="black" />
            <div className="contact_info">
                <div className="inner_cont">
                    <div style={{marginLeft: "5%"}}>
                        <h2>Contact Information</h2>
                        <p className="desc">You can get in touch with our team use the details given below, we are glad for the opportunity to help you.</p>
                    </div>
                    <div className="contact_section">
                        <div className="row_1">
                            <UilPhoneAlt className="footer_icon contact" />
                            <div className="inner_div new_contact">
                                <p className="bold">Phone No.</p>
                                <p className="number" style={{ color: "#f2d9ff", fontSize: "0.8rem" }}>7023639107</p>
                            </div>
                        </div>
                        <div className="row_1">
                            <UilTelegram className="footer_icon contact" />
                            <div className="inner_div new_contact">
                                <p className="bold">Telegram</p>
                                <p className="number" style={{ color: "#f2d9ff", fontSize: "0.8rem", marginBlockStart: "0.2rem" }}>https://t.me/trdzo</p>
                            </div>
                        </div>
                        <div className="row_1">
                            <UilEnvelopeDownload className="footer_icon contact" />
                            <div className="inner_div new_contact">
                                <p className="bold">Mail Us</p>
                                <p className="number" style={{ color: "#f2d9ff", fontSize: "0.8rem" }}>tradelal.com@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="big_circle"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact