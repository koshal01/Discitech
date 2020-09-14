import React, { Component } from 'react';
import { Nav, Button, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";

export class NavState extends Component {
    
    state = {
        token: localStorage.getItem("jwt")
    }


    render() {
        if(this.state.token){
            var user = JSON.parse(localStorage.getItem("user"));
            return (
                <>
                    <Nav.Item className="ml-auto signin-btn">
                        <Link to="/">
                            <Button className="ml-2 mr-3 btn-100" variant="outline-danger" onClick={() =>{
                                localStorage.clear();
                                window.location.reload();
                            }}>
                                Log Out
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <NavLink className="letter-circle"  data-tip data-for="registerTip" style= {{width : "37px"}}>{user.charAt(0).toUpperCase()}</NavLink>

                        <ReactTooltip id="registerTip" place="bottom" effect="solid" type="info">
                            {user}
                        </ReactTooltip>
                    </Nav.Item>
                </>
            )
        }else{
            return(
                <Nav.Item className="ml-auto signin-btn">
                    <Link to="/Login">
                        <Button className="ml-3 mr-2 btn-100" variant="outline-danger">
                            Log In
                        </Button>
                    </Link>
                </Nav.Item>
            )
        }
    }
}

export default NavState;
