import React from 'react';
import '../../css/about.css';
import yash from '../../images/yash.jpg';
import shubham from '../../images/shubham.jpg';
import chirag from '../../images/chirag.jpg';
import koshal from '../../images/koshal.jpeg';
import { Image, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function About() {
    return(
        <div>
        <section className="bg-img"></section>
        <div style={{backgroundColor:"#B2BABB"}}>
            <div className="about-container">
                <h1 >About Us</h1>
                <p className="aboutus">"One stop solution for all your programming needs."</p>
                <p className="content" id="team">
                    We as a group of students from NIT Trichy started this project as to share the knowledge
                    with you in a more natural way, not from a tutor to student but from a friend to a friend 
                    prespective. That's why we will try our best to deliver quality content in an innovative
                    manner. 
                    Along the way, we try to inspire you to learn programming skills.    
                </p>
                <p className="content">
                    Code Fox is a technological website which was founded by students 
			        of NIT Trichy. Who are interested in making best coding platform
			        for students of every age. We are here to solve problems in a more 
			        analytic and  efficient manner.
                </p>
                <hr />
                </div>
                <div className="team-container">
                    <h2>Team Members</h2>
                    <Container>
                        <Row>
                        <Col lg={6}  xs={12} > 
                            <div className="team">
                                <div className="border-extension">
                                    <Image src={koshal} className="img" roundedCircle />
                                </div>
                                <h2>Koshal Agrawal</h2>
                                <h4>Web Developer</h4>
                                <div className="hide">
                                    <ul className="same-line">
                                    <li><a href="https://www.instagram.com/_koshal_/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="fa-lg"/></a></li>
                                        <li><a href="https://www.facebook.com/koshal.agrawal.77" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="fa-lg"/></a></li>
                                        <li><a href="https://www.linkedin.com/in/koshal-a-273945a0/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="fa-lg"/></a></li>
                                        <li><a href="https://twitter.com/AgrawalKoshal" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="fa-lg"/></a></li>
                                        <li><a href="https://github.com/koshal01" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fa-lg"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            </Col>
                            <Col lg={6}  xs={12} > 
                            <div className="team">
                                <div className="border-extension">
                                    <Image src={yash} className="img" roundedCircle />
                                </div>
                                <h2>Yash Tyagi</h2>
                                <h4>&nbsp;Web Developer</h4>
                                <div className="hide">
                                    <ul className="same-line">
                                        <li><a href="https://www.instagram.com/yashtyagi39" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="fa-lg"/></a></li>
                                        <li><a href="https://www.linkedin.com/in/yash-tyagi-ab8b061b6" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="fa-lg"/></a></li>
                                        <li><a href="https://github.com/yashtyagi39" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fa-lg"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            </Col>
                            <Col lg={6}  xs={12} > 
                            <div className="team">
                                <div className="border-extension">
                                    <Image src={chirag} className="img" roundedCircle />
                                </div>
                                <h2>Chirag Verma</h2>
                                <h4>Designer</h4>
                                <div className="hide">
                                    <ul className="same-line">
                                        <li><a href="https://www.instagram.com/chiragverma17037/?hl=en" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="fa-lg"/></a></li>
                                        <li><a href="https://www.facebook.com/chirag.verma.173" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="fa-lg"/></a></li>
                                        <li><a href="https://twitter.com/ChiragV02660010" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="fa-lg"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            </Col>
                            <Col lg={6}  xs={12} > 
                            <div className="team">
                                <div className="border-extension">
                                    <Image src={shubham} className="img" roundedCircle />
                                </div>
                                <h2>Shubham Kadam</h2>
                                <h4>Manager</h4>
                                <div className="hide">
                                    <ul className="same-line">
                                    <li><a href="https://www.instagram.com/shubham_._kadam/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="fa-lg"/></a></li>
                                        <li><a href="https://www.linkedin.com/in/shubhamkadam00" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="fa-lg"/></a></li>
                                        <li><a href="https://twitter.com/Noblefuneral?Shubham" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="fa-lg"/></a></li>
                                        <li><a href="https://github.com/noblefuneral" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fa-lg"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default About;    