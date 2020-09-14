import React, { Component } from 'react'
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from'axios';

export class BlogItem extends Component {
    state = {
        imgUrl: '',
        author: '',
        isLoaded: false
    }

    componentDidMount(){
        const { featured_media, author } = this.props.blog;

        const getImageUrl = axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/media/${featured_media}`)
        const getAuthor = axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/users/${author}`)
        
        Promise.all([getImageUrl, getAuthor])
        .then(res => {
            this.setState({
                imgUrl: res[0].data.media_details.sizes.full.source_url,
                author: res[1].data.name,
                isLoaded: true
            })
        })
    }

    render() {
        const { title, id, excerpt } = this.props.blog;
        const { imgUrl, author, isLoaded } = this.state;
        
        if(isLoaded){
            return (
                <div>
                    <Col lg={4} xs={12} md={6} className="blog-col" key={id}>   
                        <Card className="blog-card" >
                            <Link to={ "/Blogs/BlogContent/" + id }>
                                <Card.Img variant="top" src={imgUrl} className="blog-card-image"  />
                            </Link>
                            <Card.Body className="blog-card-body" >
                                <Card.Text className="blog-card-text" >
                                    <Link to={ "/Blogs/BlogContent/" + id}>
                                        <span className="blog-card-title"  dangerouslySetInnerHTML ={{__html: title.rendered}} />
                                    </Link>
                                    <span dangerouslySetInnerHTML ={{__html: excerpt.rendered}} style={{textAlign: "justify"}} />
                                </Card.Text>
                                <Card.Text>
                                    <span className="blog-category" >{author}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            )
        }

        return null;
    }
}

export default BlogItem;
