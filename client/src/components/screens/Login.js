import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook,faGoogle,faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import '../../css/login.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import validator from 'validator';

class Login extends Component{
    
	constructor(props){
		super(props);
		this.state = {
			email: "",
            password:"",
            tick: false
		}
		this.clickHand = this.clickHand.bind(this);
        this.login = this.login.bind(this);
        this.googleAuth = this.googleAuth.bind(this);
		this.facebookAuth = this.facebookAuth.bind(this);
		this.githubAuth = this.githubAuth.bind(this);
	}

    login(){
        axios.post('/login',{
            email: this.state.email,
            password: this.state.password
        })
        .then((res) => {
            if(res.data.success === true){
                localStorage.setItem("jwt",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                this.setState = {
                    email: "",
                    password: ""
                };

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

    googleAuth(){
        axios.get('https://code-fox-01.herokuapp.com/auth/google',{
            headers: {"Access-Control-Allow-Origin": "*"}
        })
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
        axios.get('https://code-fox-01.herokuapp.com/auth/github',{
            headers: {"Access-Control-Allow-Origin": "*"}
        })
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
        fetch('/auth/facebook', {
            method: 'get'
        }).then(res=>res.json())
        .then(result=>{
            if(result.success === true){
                localStorage.setItem("jwt",result.token);
                localStorage.setItem("user",JSON.stringify(result.user));
             
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
            else if(result.success === false){
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

        // axios.get('/auth/facebook',{
        //     headers: {"Access-Control-Allow-Origin": "*"}
        // })
        // .then((res) => {
        //     if(res.data.success === true){
        //         localStorage.setItem("jwt",res.data.token);
        //         localStorage.setItem("user",JSON.stringify(res.data.user));
             
        //         toast.success('You have successfully signIn through Facebook.', {
        //             position: "top-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         this.props.history.push('/');
        //     } 
        //     else if(res.data.success === false){
        //         toast.error('Failed Sign In', {
        //             position: "top-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined
        //         });
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }


	clickHand(e)
	{
		e.preventDefault();
		if(validator.isLength(this.state.password , {min:5, max: 15}) && validator.isEmail(this.state.email) && this.state.tick){
            this.login();
		}
		else if(!validator.isLength(this.state.password , {min:5, max: 15}) && !validator.isEmail(this.state.email)){
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
				<div className="main-container">		
                    <div className="base-container-1">
                        <h1>Log In</h1>
                        <form className="form-deco">
                            <div>
								<FontAwesomeIcon icon={faEnvelope} className="user-logo"/>				
                                <input type="text" className="input-4" name="email" value={this.state.email} placeholder="Your Email..." onChange={(event)=> {this.setState({email:event.target.value})}}/>
                            </div>	
                            <div>
								<FontAwesomeIcon icon={faLock} className="user-logo"/>				
                                <input type="password" className="input-4" value={this.state.password} name="password" placeholder="Your Password..." onChange={(event) => {this.setState({password:event.target.value})}}/>
                            </div>			
                            <p><span><input type="checkbox" onChange={()=> this.setState({tick: !this.state.tick})}/></span> I agree to the terms and conditions of the services</p>
                            <button type="submit" onClick={(event) => {this.clickHand(event)}} className="btn-4">Log In</button>
                            <Link to="/Forgot">Forgot Pasword ?</Link>
                        </form>
                        <div className="form-bottom-2">
                            <p>Don't have a Code Fox account yet?</p>
                            <Link to="/Signup">Create your account now</Link>
                        </div>
	                </div>
                    <div className="vertical-line"><p className="or">OR</p></div>
                        <div className="base-container-2">
                            <h1>Other ways to Login</h1>
                            <div className="adjust-4">
                                <div className="envolope">
                                    <span className="logo-color-1"><FontAwesomeIcon icon={faFacebook} /></span>
                                    <a href="https://code-fox-01.herokuapp.com/auth/google"><button className="social-6">Facebook Login</button></a>
                                </div>
                                <div className="envolope">
                                    <span className="logo-color-1"><FontAwesomeIcon icon={faGoogle}/></span>
                                    <a href="https://code-fox-01.herokuapp.com/auth/google"><button className="social-6" >Google Login</button></a>
                                </div>
                                <div className="envolope">
                                    <span className="logo-color-1"><FontAwesomeIcon icon={faGithub} /></span>
                                    <button className="social-6" onClick={this.githubAuth}>Github Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-2">&copy; discitetech.com | designed by code fox </div>
	        <ToastContainer />
	    </div>
	)}
}

export default Login;