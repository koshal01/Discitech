import React, { Component } from "react";
import '../../css/home.css';
import ide from '../../images/ide.jpg';
import quiz from '../../images/quiz.jpg';
import upcoming_events from '../../images/upcoming_events.jpg';
import { Container, Row, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogItem from './BlogItem';
import axios from 'axios'

class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
            posts: [],
            isLoaded: false
        }
	}

    componentDidMount() {
        axios.get('https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/posts?per_page=3')
        .then(res => {
            this.setState({
                posts: res.data,
                isLoaded: true
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        const { posts, isLoaded } = this.state;
        if(isLoaded){
            return(
                <div>
                    <div className="bg-img"></div>
                    <div className="home-container">
                        <div className="home-width">
                            <div>
                                <p className="headline">Programming made easy by students for students.</p>
                                <p className="sub-headline">"One stop solution for all your programming needs."</p>
                            </div>
                            <div className="quotes">
                                <h1>Quotes</h1>
                                <ul>
                                    <li>
                                        “If we wish to count lines of code, we should not regard them as ‘lines produced’ but as ‘lines spent.’
                                        “— Edsger Dijkstra
                                    </li>
                                    <li>
                                        “Don’t repeat yourself. Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.”
                                        — Andy Hunt and Dave Thomas
                                    </li>
                                    <li>
                                        Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to produce bigger and better idiots. So far, the universe is winning.
                                        - Rick Cook
                                    </li>
                                </ul>  
                            </div>
                            <h1>Latest Blog Posts</h1>
                            <Container fluid>
                                <Row className = "blog-row"> 
                                    {posts.map(post => {
                                        return <BlogItem key={post.id} blog = {post} />
                                    }) }
                                </Row>
                            </Container>
                            <div className="more-blog">
                                <Link to="/Blogs">
                                    <Button className="more-blog-btn">More Blogs</Button>
                                </Link>
                            </div>
                        </div>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={upcoming_events}
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>Upcoming Features</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={quiz}
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                <h3>Quizzes</h3>
                                <p>Interactive quizzes and challenges for different programming languages.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={ide}
                                alt="Third slide"
                                />

                                <Carousel.Caption>
                                <h3>IDE Environment</h3>
                                <p>IDE Environment for different languages.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            )
        }

        return null;
    }
}

export default Home;