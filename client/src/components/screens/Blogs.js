import React, {Component} from 'react';
import '../../css/blog.css';
import BlogItem from './BlogItem';
// import { Link } from 'react-router-dom';
import {Container, Row } from 'react-bootstrap';
import axios from'axios';

class Blogs extends Component{

	constructor(props){
		super(props);
		this.state = {
            posts: [],
            categories: [],
            isLoaded: false
        }
        this.jsBlog = this.jsBlog.bind(this);
	}

    componentDidMount() {
        axios.get('https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/posts?per_page=100')
        .then(res => {
            this.setState({
                posts: res.data,
                isLoaded: true
            })
        })
        .catch(err => {
            console.log(err);
        })

        axios.get('https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/categories')
        .then(res => {
            this.setState({
                categories: res.data
            })
        })
    }

    jsBlog(name) {
        this.state.categories.map(category => {
            if(category.name === name){
                axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/posts?categories=${category.id}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    }

    render(){
        const { posts, isLoaded } = this.state;
        if(isLoaded){
            return(
                <div>
                    <section>
                        <div className="bg-img"></div>
                        <div className="content-wrapper">
                            <div className="section-header">
                                <h2>Blogs</h2>
                                <ul className="list">
                                    <li key={"1"}>
                                        <a href="/Blogs">All</a>
                                    </li>
                                    <li key={"2"}>
                                        <button id="JavaScript" onClick={(e) => this.jsBlog(e.target.id)}>JavaScript</button>
                                    </li>
                                    <li key={"3"}>
                                        <button id="Java" onClick={(e) => this.jsBlog(e.target.id)}>Java</button>
                                    </li>
                                    <li key={"4"}>
                                        <button id="C++" onClick={(e) => this.jsBlog(e.target.id)}>C++</button>
                                    </li>
                                    <li key={"5"}>
                                        <button id="R" onClick={(e) => this.jsBlog(e.target.id)}>R</button>
                                    </li>
                                </ul>
                            </div> 
                            <Container fluid>
                                <Row className = "blog-row"> 
                                    {posts.map(post => {
                                        return <BlogItem key={post.id} blog = {post} />
                                    }) }
                                </Row>
                            </Container>
                        </div>
                    </section>
                </div>
            );
        }

        return null;
    }
};

export default Blogs;