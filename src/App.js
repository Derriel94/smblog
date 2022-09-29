import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import Home from "./Components/Home/Home.js"; 
import Register from "./Components/Register.js";
import Signin from "./Components/Signin.js";  
import Blogs from "./Components/Blogs/Blogs.js";
import Nav from "./Components/Nav/Nav.js"; 
import Editor from "./Components/FileUpload.js";
import Music from "./Components/Music/Music.js";
import VoiceOver from "./Components/VoiceOver/VoiceOver.js";
import Contact from "./Components/Contact/Contact.js";


const App = () => {
  var data = sessionStorage.getItem("key");

  axios.defaults.withCredetials = true;
  const [blogs, setBlogsList] = useState([
  {textId: 0,
  textArea: "This is a story all about how my life got twisted and turned upside down",
  blogTitle: "Welcome To Blog City"}
  ]);

  
  const [user, setUser] = useState({
    userId: '',
    name: '',
    email: ''
  });
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loadUser = (user) => {
    setUser({
      userId: user.userId,
      name: user.name,
      email: user.email,
    });
    
    setIsLoggedIn('true');
    // window.location.reload(true);
  }

  const signOutUser = (user) => {
    setUser({
      userId: '',
      name: '',
      email: ''
    })
    sessionStorage.removeItem("key");
    setIsLoggedIn('false')
    window.location.reload(true);
  } 

  const registerRef = useRef();
  useEffect(()=> {
      if (data){
        setIsLoggedIn(true)
      }
  },[data])
  useEffect(()=> {

     if (isLoggedIn) {
        registerRef.current.style.display = "none";
    }


  },)
  useEffect(()=> {
    axios.get('https://smblogserver.herokuapp.com/blogs')
      .then((response)=>{
      setBlogsList(response.data);
      })
  },[])
 
  return (
    <div className="App" style={{color: "papayawhip"}}>
      <Router>
        <div className="header-container">
           <div><Link to="/" style={{color: "papayawhip", marginLeft: "160px"}}>Superior Minds</Link></div>
            {data
            ?
              <p onClick={()=>signOutUser(user)} id="signout">SignOut: {data}</p>
            :
              <Link to="/signin" style={{color: "papayawhip"}}><p id="signin">SignIn</p></Link>
            }
            <Link to="/contact" style={{color: "papayawhip"}}><p id="register" ref={registerRef}>Register</p></Link> 
        </div>
        <Nav /> 
          <Routes>
            <Route exact path="/" element={<Home Link={Link} blogs={blogs}/>} />
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/music" element={<Music />} />
            <Route path="/voiceovers" element={<VoiceOver />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Signin loadUser={loadUser} isLoggedIn={isLoggedIn} />} />       
          </Routes> 
        <div className="footer">
          <Link to="/" style={{color: "papayawhip"}}><h1>Superior Minds</h1></Link>
          <Nav />
        </div>   
        <div className="socialDiv">
            <h1>Social Media</h1>
            <a href="https://www.instagram.com/macstract/?hl=af" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Instagram: Mactract </a>
            <a href="https://www.linkedin.com/in/superior-minds-ink-869565207/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Linkdein: Christain Mcbride </a>
            <a href="https://www.youtube.com/channel/UCBHFh0ZVLkxTvwoYW3hLZ9Q/featured" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Youtube: Mad Mac </a>    
        </div>         
      </Router>
    </div>
  );
};
  
export default App;