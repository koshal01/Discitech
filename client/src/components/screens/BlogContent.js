import React,  {useState,useEffect} from 'react';
import '../../css/blogContent.css';
import bg from '../../images/1.jpg';
import { Image } from 'react-bootstrap';
import {useParams } from 'react-router-dom';
import axios from'axios';

function BlogContent() {

    const [data,setData] = useState("");
    const {blogid} = useParams();
    const [imgUrl,setImgUrl] = useState("");
    const [authorName,setAuthorName] = useState("");
    const [authorDesc,setAuthorDesc] = useState("");

    useEffect(() => {
        axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/posts/${blogid}`)
        .then(post => {
            setData(post.data);
        });
    },[blogid]);

    const fetchData = () => {
        const {featured_media, author} = data

        const getImageUrl = axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/media/${featured_media}`)
        const getAuthor = axios.get(`https://code-fox-288120.firebaseapp.com/wp-json/wp/v2/users/${author}`)
        
        Promise.all([getImageUrl, getAuthor])
        .then(res => {
            setImgUrl(res[0].data.media_details.sizes.full.source_url);
            setAuthorName(res[1].data.name);
            setAuthorDesc(res[1].data.description);
        })
    }

    return(
        <>
        {data ?
            <div>
                {fetchData()}
                <section>
                    <section className="bg-img"></section>
                    <div className="content-wrapper">
                        <div className="blog-title">
                            <h1>{data.title.rendered}</h1>
                        </div>
                        <div className="blog-contain">
                            <div>
                                <div className="writer">
                                    <Image src={bg} className="user-image" roundedCircle />
                                    <div className="user-name">
                                        {authorName}<br />
                                        <h6 style={{fontWeight: "lighter", fontSize: "initial"}}>{data.modified.replace("T", " ")}</h6>
                                    </div>
                                    <div className="user-description">
                                        <h6>{authorDesc}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="content-box">
                                <Image src={imgUrl} fluid />
                                <div className="writing">
                                    <span dangerouslySetInnerHTML ={{__html: data.content.rendered}} style={{textAlign: "justify"}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        :
        <h2>Loading...</h2>
        }
    </>
    );
};

export default BlogContent;