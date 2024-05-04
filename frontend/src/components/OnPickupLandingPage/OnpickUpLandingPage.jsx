import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Carousel from 'react-bootstrap/Carousel';
import img01 from '../../assets/benifits.jpg';
import img02 from '../../assets/2.jpeg'
import img03 from '../../assets/3.png'
import img04 from '../../assets/4.jpg'
import img05 from '../../assets/1.png'
import { Button, Card } from 'react-bootstrap';

function OnpickUpLandingPage() {
    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "black", color: "white", height: "60px" }}
            >
                <center>Sign Up and get 10% off. Sign Up</center>
            </div>
            <Header />
            <br /><br /><br />
            <div style={{ padding: "30px" }}><Card style={{ borderRadius: "20px", backgroundColor: "#ccc", padding: "20px" }}><center> <Carousel>
                <Carousel.Item interval={2000}>
                    <img src={img01} alt="" width="80%" />
                    <Carousel.Caption>
                        {/* <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img src={img02} alt="" width="40%" />
                    <Carousel.Caption>
                        {/* <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img src={img03} alt="" width="60%" />
                    <Carousel.Caption>
                        {/* <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img src={img05} alt="" width="50%" />
                    <Carousel.Caption>
                        {/* <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel></center></Card></div>
            <center> <Button href='/onpickup/registration' variant="primary" size="lg" block> Register Now </Button></center>


            <br /><br /><br />
            <Footer />
        </>

    )
}

export default OnpickUpLandingPage
