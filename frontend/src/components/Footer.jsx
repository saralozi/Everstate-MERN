import React from 'react'
import './css/footer.css'

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>EVER</span>STATE</h3>
                            <p style={{textAlign: 'left'}}>"Discover your dream home with us. Contact EverState for expert guidance in buying, selling, or renting properties. </p>
                            <div className="footer-icons">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5 className='footerMeet'>Meet us</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="/" href="/about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/buy">Buy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/rent">Rent</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/team">Team</a>
                                </li>
                              
                              
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5 className='footerContact'>Contact</h5>
                            <p style={{textAlign: 'left'}}><i className="fa-solid fa-phone-volume"></i> +92 3121324083</p>
                            <p style={{textAlign: 'left'}}><i className="fa-solid fa-envelope"></i> everstate@gmail.com</p>
                            <p style={{textAlign: 'left'}}><i className="fa-solid fa-paper-plane"></i> Tirana, Albania</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer