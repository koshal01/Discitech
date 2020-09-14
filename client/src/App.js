import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter,Route,Switch, withRouter, Redirect} from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/screens/Home';
import Contact from './components/screens/Contact';
import About from './components/screens/AboutUs';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';
import Footer from './components/screens/Footer';
import Blogs from './components/screens/Blogs';
import BlogContent from './components/screens/BlogContent';
import Privacy from './components/screens/Private';
import ScrollToTop from "./components/screens/ScrollToTop";
import NotFound from './components/screens/404';

const Routing = withRouter(({ location }) => {
  return(
    <div>
      {
        location.pathname !== '/Login' && location.pathname !== '/404' && location.pathname !== '/Signup' &&
        location.pathname !== '/Reset/:token' && location.pathname !== '/Forgot' && location.pathname !== '/Privacy'  && <Navbar /> 
      }
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/Contact">
          <Contact />
        </Route>
        <Route exact path="/Blogs/">
          <Blogs />
        </Route> 
        <Route exact path="/Blogs/BlogContent/:blogid">
          <BlogContent />
        </Route> 

        <Route exact 
          path="/Login"
          render={props => (
            <Login {...props} />
          )}
        >
        </Route>
        <Route exact 
          path="/Signup"
          render={props => (
            <Signup {...props} />
          )}
        >
        </Route>
        <Route exact 
          path="/Forgot"
          render={props => (
            <ForgotPassword {...props} />
          )}
        >
        </Route>
        <Route exact 
          path="/Reset/:token"
          render={props => (
            <ResetPassword {...props} />
          )}
          >          
        </Route>

        <Route exact path="/Privacy">
          <Privacy />
        </Route>

        <Route exact path="/404">
          <NotFound />
        </Route> 
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
      {
        location.pathname !== '/Login' && location.pathname !== '/404' && location.pathname !== '/Signup'
        && location.pathname !== '/Privacy' && location.pathname !== '/Reset/:token' && location.pathname !== '/Forgot' && <Footer /> 
      }
    </div>
  )
})

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routing />
    </BrowserRouter>
  );
};

export default App;