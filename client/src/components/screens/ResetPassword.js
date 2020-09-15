import React,{Component} from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

class ResetPassword extends Component{

    constructor(props){
		super(props);
		this.state = {
            new_password: "",
            confirm_password: "",
            token: props.match.params.token
		}
        this.newpass = this.newpass.bind(this);
    };

	newpass(e){
        e.preventDefault();
        
        const {token} = this.state;

		if(!validator.isLength(this.state.new_password , {min:5, max: 15})){
			toast.error('🦄 Invalid password. It should contain 5 to 15 value!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(!validator.equals(this.state.new_password, this.state.confirm_password)){
            toast.error("Confirm password didn't match with New password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
			axios.post('/mail/new-password',{
                password: this.state.new_password,
                token: token
            })
			.then((res) => {
				if(res.data.success ===  true){
					this.setState({
						email: ""
					});
					toast.success(res.data.msg, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
                    });
					this.props.history.push('/Login');
                    
				}else if(res.data.success === false){
					toast.error(res.data.msg, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

    render(){
        return(
            <div>
                {/* <div className="nav-1">
                    <Link to="/">
                        Code Fox
                    </Link>
                </div> */}
                <div className="change-1">
                    <h1 className="readjust-2">Change Password</h1>
                    <p>Please enter your new password.</p>
                    <input type="password" value={this.state.new_password} className="input-6" name="password" placeholder="New password" onChange={(event)=> {this.setState({new_password:event.target.value})}}/>
                    <input type="password" value={this.state.confirm_password} className="input-6" name="password" placeholder="Confirm password" onChange={(event)=> {this.setState({confirm_password:event.target.value})}}/>
                    <button type="button" onClick={(event) => {this.newpass(event)}} className="btn-6">Reset Password</button>
                </div>
                {/* <div className="footer-2">&copy; discitetech.com | designed by code fox </div> */}
				<ToastContainer />
            </div>
        );
    }
}

export default ResetPassword;