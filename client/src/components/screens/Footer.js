import React ,{Component} from'react';
import '../../css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faGoogle,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import validator from 'validator';
import { Link } from 'react-router-dom';

class Footer extends Component {
	constructor(props){
		super(props);

		this.state={
			name: "",
			email:"",
			message:"",
			emailError:""
		}
		this.clickHandToSend = this.clickHandToSend.bind(this);
		this.sendMail = this.sendMail.bind(this);
        this.resetForm = this.resetForm.bind(this);
	}

	resetForm(){
		this.setState({
			name: "",
			email:"",
			message:""
		});
	}
	
	sendMail(){
		axios.post('/mail/contact',{
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
	}
	
	
	
	clickHandToSend(e)
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

	render(){
		return (
			<div className="footer">
			   <div className="footer-content">
			         <div className="footer-section about">
			         <h1 className="logo">Code-Fox</h1>
			         <p>Code Fox is a technological website which was founded by students 
			        	of NIT Trichy. Who are interested in making best coding platform
			        	for students of every age. We are here to solve problems in a more 
			        	analytic and  efficient manner.
			         </p>
			         	<div className="contact">
			         	    <span><FontAwesomeIcon icon={faPhone} />&nbsp; +91 6385545134</span>
			         	    <span><FontAwesomeIcon icon={faEnvelope} />&nbsp; discitetech04@gmail.com</span>
			         	</div>
			         	<div className="socials">
			         	    <a href="https://www.facebook.com/profile.php?id=100040747339400" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="facebook" /></a>
			         	    <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGoogle} className="goo" /></a>
			         	    <a href="https://www.instagram.com/discitetech" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="instagram" /></a>
			         	</div>
			         </div> 
			         <div className="footer-section link">
			            <h2 className="colour">Quick Links</h2>
			            <ul>
			            <Link to="/Blogs"><li>Blogs</li></Link>
			            <a href="/about#team"><li>Team</li></a>
			            <a href="/Privacy"><li>Terms and Condition</li></a>
			            <Link to="/Privacy"><li>Privacy and Policy</li></Link>
			            </ul>
			         </div> 
			         <div className="footer-section contact-form">
			         <h2>Reviews</h2>
			         <form onSubmit = {(e) => this.clickHand(e)}>
					 	<input type="text" value={this.state.name} placeholder="Your Name...." className="text-input contact-input" onChange={(e)=> {this.setState({name:e.target.value})}}/>
			            <input type="email" value={this.state.email} placeholder="Your Email Address...." className="text-input contact-input" onChange={(e)=> {this.setState({email:e.target.value})}}/>
			            <p>{this.state.emailError}</p>
			            <textarea value={this.state.message} className="text-input contact-input" placeholder="Your Message....." onChange={(e)=> {this.setState({message:e.target.value})}}></textarea>
			            <button type="submit" className="btn btn-big contact-btn" onClick={(event) => {this.clickHandToSend(event)}}><FontAwesomeIcon icon={faEnvelope} /> Send</button>
			         </form>
			         </div> 
			  </div>
			  <div className="footer-bottom">
			      &copy; discitetech.com | designed by four fox
			   </div>
			   <ToastContainer />
			</div>
		 );
	}
}

export default Footer;