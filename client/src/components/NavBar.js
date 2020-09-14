import React from "react";
import "../css/Navbar.css";
import logo from '../images/codefox-logo.png';
import { Navbar, Nav, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhoneAlt, faAt, faCode } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from 'react-router-dom';
import NavState from './NavState';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      scrollbar: "scroll"
    };
  }  

  listenScrollEvent = (e) => {
    if (window.scrollY > 66) {
      this.setState({ scrollbar: "scrolled" });
    } else {
      this.setState({ scrollbar: "scroll" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  render() {
    return (
      <>
        <Navbar expand="lg" fixed="top" className={this.state.scrollbar}>
            <Navbar.Brand className="logo-left">
              <Link to="/">
                <Image src={logo}  />
              </Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className = "button-left"/>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end right"
            >
            <Nav>
              <NavLink exact to="/" activeClassName="active" className="nav-link">
                <FontAwesomeIcon icon={faHome} />Home</NavLink>
              <NavLink exact to="/Blogs" activeClassName="active" className="nav-link">
                <FontAwesomeIcon icon={faCode} />Blogs</NavLink>
              <NavLink exact to='/About' activeClassName="active" className="nav-link">
                <FontAwesomeIcon icon={faAt} />About Us</NavLink>
              <NavLink to="/Contact" activeClassName="active" className="nav-link">
                <FontAwesomeIcon icon={faPhoneAlt} />Contact</NavLink>
              <NavState />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;