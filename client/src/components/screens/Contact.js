import React ,{Component} from'react';
import "../../css/contactus.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faGoogle,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import axios from'axios';

class Contact extends Component{
    constructor(props){
		super(props);

		this.state={
			name: "",
            email:"",
            message: ""
		}
		this.clickHandler = this.clickHandler.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    clickHandler(e)
	{
        e.preventDefault();
		if(validator.isEmail(this.state.email) && validator.isAlphanumeric(this.state.name)){
			this.sendMail();
			this.resetForm();
		
		}
		else if(!validator.isEmail(this.state.email) && !validator.isAlphanumeric(this.state.name)){
		toast.error('🦄 Invalid Email!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            	toast.error('🦄 Invalid Username. It should contain numbers and letters only!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		}
		else if(!validator.isEmail(this.state.email)){
			toast.error('🦄 Invalid Email!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		}
		else if(!validator.isAlphanumeric(this.state.name)){
			toast.error('🦄 Invalid Username. It should contain numbers and letters only!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		}
    }

    resetForm(){
        this.setState({
            name: "",
            email:"",
            message: ""
        });
    }
    
    sendMail() {
        axios.post('/mail/contact', {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        })
        .then((res) => {
            if(res.data.success === true){
				console.log(res.data);
				toast.success(res.data.msg, {
					position: "bottom-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				this.resetForm();
			}
			else if(res.data.success === false){
				toast.error(res.data.msg, {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		})
		.catch((error) => {
			console.log(error);
			toast.error('Your message failed to send', {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		})
    };
    
	render(){
		return (
			<div>
				<section className="bg-img"></section>
			    <div className="heading-pic pic-1"></div>
			        <h1 className="text-center">Contact Us</h1>
			        <p className="intro-1">Our help center is fresh and always open for any language related query. If you can’t find the answer you’re looking for, we’re here to lend a hand.</p>
			        <div className="main-container-1">
			        <div className="section-1">
			             <input type="text" name="username" placeholder="Your Name...." className="text-input-1" onChange={(event)=> {this.setState({name:event.target.value})}} value={this.state.name}/>
			             <input type="email" name="email" placeholder="Your Email Address...." className="text-input-1" onChange={(event)=> {this.setState({email:event.target.value})}} value={this.state.email}/>
			             <p>{this.state.emailError}</p>
			        </div>
			        <div className="sectiom-2">
			             <textarea name="message" className="text-input-1 contact-input-1" placeholder="Your Message....."  onChange={(event)=> {this.setState({message:event.target.value})}} value={this.state.message}></textarea>
			             <button type="submit" className="contact-btn-1" onClick={this.clickHandler}><FontAwesomeIcon icon={faEnvelope} /> Send</button>
			        </div>       
                </div>
			<div className="main-container-2">
				<div className="size-1">
				<h1 className="text-center">Other ways to reach us</h1>
			</div>
			      <div className="contact-social">   
					<div className="envolope">
					<span  className="logo-color"><FontAwesomeIcon icon={faEnvelope}/></span>
					<a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer">discitetech04@gmail.com</a>
					</div>
					<div className="envolope">
					<span  className="logo-color"><FontAwesomeIcon icon={faPhone} /></span>
					<a href="#" target="_blank">6385545134</a>
					</div>
					<div className="envolope">
					<span  className="logo-color"><FontAwesomeIcon icon={faFacebook} /></span>
					<a href="https://www.facebook.com/profile.php?id=100040747339400&ref=bookmarks" target="_blank" rel="noopener noreferrer">Code-Fox</a>
					</div>
					{/* <div className="envolope">
					<span  className="logo-color"><FontAwesomeIcon icon={faGoogle}/></span>
					<a href="#" target="_blank" rel="noopener noreferrer">some kind of url</a>
					</div> */}
					<div className="envolope">
					<span  className="logo-color"><FontAwesomeIcon icon={faInstagram} /></span>
					<a href="https://www.instagram.com/discitetech" target="_blank" rel="noopener noreferrer">Code-Fox</a>
					</div>
			      </div>
	        </div>
			<ToastContainer />
			</div>
		);
	}
}

export default Contact;