import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/login.css';
import '../../css/signup.css';
import validator from 'validator';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Signup extends Component{

	constructor(props){
		super(props);
		this.state={
			name: "",
			email: "",
            password:"", 
            tick: false
		}
		this.clickHandler = this.clickHandler.bind(this);
		this.signUp = this.signUp.bind(this);
		this.googleAuth = this.googleAuth.bind(this);
		this.facebookAuth = this.facebookAuth.bind(this);
		this.githubAuth = this.githubAuth.bind(this);

	}

	googleAuth(){
        axios.get('/auth/google')
        .then((res) => {
            if(res.data.success === true){
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
             
                toast.success('You have successfully signIn through Google.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.props.history.push('/');
            } 
            else if(res.data.success === false){
                toast.error('Failed Sign In', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


	githubAuth(){
        axios.get('/auth/github')
        .then((res) => {
            if(res.data.success === true){
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
             
                toast.success('You have successfully signIn through Github.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.props.history.push('/');
            } 
            else if(res.data.success === false){
                toast.error('Failed Sign In', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    facebookAuth(){
        axios.get('/auth/facebook')
        .then((res) => {
            if(res.data.success === true){
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
             
                toast.success('You have successfully signIn through Facebook.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.props.history.push('/');
            } 
            else if(res.data.success === false){
                toast.error('Failed Sign In', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

 	signUp(){
 		axios.post('http://localhost:5000/signup',{
 		    name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then((res) => {
            if(res.data.success === true){
                this.setState = {
                	name: "",
                    email: "",
                    password: ""
                };
				
				this.props.history.push('/Login');
            } 
            else if(res.data.success === false){
                toast.error('Failed Sign In', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
 	}   

	clickHandler(e){
		e.preventDefault();
		if(validator.isLength(this.state.password , {min:5, max: 15}) && validator.isEmail(this.state.email) && validator.isAlphanumeric(this.state.name) && this.state.tick){
            this.signUp();
		}
		else if(!validator.isLength(this.state.password , {min:5, max: 15}) && !validator.isEmail(this.state.email) && !validator.isAlphanumeric(this.state.name)){
			toast.error('🦄 Invalid Password. It should contain 5 to 15 values', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
		else if(!validator.isLength(this.state.password , {min:5, max: 15}) && !validator.isEmail(this.state.email)){
			toast.error('🦄 Invalid password. It should contain 5 to 15 value!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        else if(!validator.isLength(this.state.password , {min:5, max: 15}) && !validator.isAlphanumeric(this.state.name)){
			toast.error('🦄 Invalid Email!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.error('🦄 Invalid password. It should contain 5 to 15 value!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
        }
        else if(!validator.isLength(this.state.password , {min:5, max: 15})){
            toast.error('🦄 Invalid password. It should contain 5 to 15 value!', {
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
        else if(!this.state.tick){
            toast.error('Please agree terms and conditions', {
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
		return(
			<div>
				<div className="nav-1">
                    <Link to="/">
                        Code Fox
                    </Link>
                </div>
				<div className="main-container signup-container">		
					<div className="base-container-1 wont-post-3">
						<h1>Sign Up</h1>
                        <h3>It only takes 2 minutes!</h3>
							<form className="form-deco">
								<div>
									<FontAwesomeIcon icon={faUser} className="user-logo"/>				
									<input type="text" className="input-4"  value={this.state.name} name="username" placeholder="username" onChange={(event)=> {this.setState({name:event.target.value})}}/>
								</div>
								<div>
									<FontAwesomeIcon icon={faEnvelope} className="user-logo"/>				
									<input type="email" className="input-4" value={this.state.email}  name="username" placeholder="email" onChange={(event)=> {this.setState({email:event.target.value})}}/>
								</div>
								<div>
									<FontAwesomeIcon icon={faLock} className="user-logo"/>				
                                	<input type="password" className="input-4" value={this.state.password} name="password" placeholder="password" onChange={(event) => {this.setState({password:event.target.value})}}/>
								</div>
								<p><span><input type="checkbox" onChange={()=> this.setState({tick: !this.state.tick})}/></span> I agree to the terms and conditions of the services</p>
								<button type="submit" onClick={(event) => {this.clickHandler(event)}} className="btn-4">Sign Up</button>
							</form>
						<div className="form-bottom-2 decrease-gap">
							<p>Already have a code fox account?</p>
							<Link to="/Login">Sign In</Link>
					</div>
	  			 </div>
					
				<div className="vertical-line increase-height"><p className="or">OR</p></div>
					<div className="base-container-2 wont-post-2">
						<h1>Other ways to Login</h1>
						<div className="adjust-4">                          
							<div className="envolope">
								<span  className="logo-color-1"><FontAwesomeIcon icon={faFacebook} /></span>
                                <button className="social-6" onClick={this.facebookAuth}>Facebook Login</button>
							</div>
						<div className="envolope">
							<span  className="logo-color-1"><FontAwesomeIcon icon={faGoogle}/></span>
							<button className="social-6" onClick={this.googleAuth}>Google Login</button>
						</div>
						<div className="envolope">
							<span  className="logo-color-1"><FontAwesomeIcon icon={faGithub} /></span>
							<button className="social-6" onClick={this.githubAuth}>Github Login</button>
						</div>
                        <div className="wont-post">
	                        <p>Don't worry, we won't post anything without your permission.</p>
	                    </div> 
					</div>
	   			</div>
	    	</div>
			<div className="footer-2">&copy; discitetech.com | designed by code fox </div>
	        <ToastContainer />
		</div>
	)}
};

export default Signup;