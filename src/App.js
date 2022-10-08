import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import {Routes, Route, Link, useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate();
  const [blogs, setBlogsList] = useState([
  {textId: 0,
  textArea: "This is a story all about how my life got twisted and turned upside down",
  blogTitle: "Welcome To Blog City"
  },
  {textId: 1,
  textArea: "This is a story all about how my life got  upside down",
  blogTitle: "Where tha white women at dawg"
  },
  {textId: 2,
  textArea: "This is a story all about how my got twisted and turned upside down",
  blogTitle: "Welcome My guy"}
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
    
    setIsLoggedIn(true);
    // window.location.reload(true);
  }

  const signOutUser = (user) => {
    setUser({
      userId: '',
      name: '',
      email: ''
    })
    sessionStorage.removeItem("key");
    setIsLoggedIn(false)
    navigate("/")
  } 


  useEffect(()=> {
      if (data){
        setIsLoggedIn(true)
      } else {
        signOutUser(data);

      }
  },[data])


  useEffect(()=> {
     const fetchData = async()=> {
      try {
        const apiUrl = 'https://smblogserver.herokuapp.com/blogs';
        const response = await fetch(apiUrl)
        const json = await response.json();
         console.log(json);
          if (json.error){
            console.log('here2');
            alert("the blogs arnt loading")
            return;
          } else {
            console.log('here1');
            return setBlogsList(json);
          }
      } catch (error) {
        alert('Big error call support!')
        console.log(error);
      }
     }
  
     fetchData();
     console.log(blogs);
      //setBlogsList(response);

  },[])
 
  return (
      <div className="App" style={{color: "papayawhip"}}>
        
        <div className="header-container">
           <div><Link to="/" style={{color: "papayawhip"}}><img src="./2.jpg" className="logo"/></Link></div>
           <div>Superior Minds Ink.</div>
            {isLoggedIn
            ?
              <p onClick={()=>signOutUser(data)} id="signout">SignOut: {data}</p>
            :
              <div><a href=" https://linktr.ee/MadMac21" target="_blank" rel="noreferrer" id="fiverLink"style={{fontSize: "1.3rem"}}> platforms </a></div>
            }
        </div>
          <Nav /> 
          <Routes>
            <Route exact path="/" element={<Home Link={Link} blogs={blogs}/>} />
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route path="/editor" element={<Editor isLoggedIn={isLoggedIn} />} />
            <Route path="/music" element={<Music />} />
            <Route path="/voiceovers" element={<VoiceOver />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/secretthothblogspot" element={<Signin loadUser={loadUser} isLoggedIn={isLoggedIn} />} />       
          </Routes> 
        <div className="footer">
          <Link to="/" style={{color: "papayawhip"}}><h1>Superior Minds</h1></Link>
          <Nav />
        </div>   
        <div className="socialDiv">
            <h1>Social Media</h1>
            <div><a href=" https://linktr.ee/MadMac21" target="_blank" rel="noreferrer"> LinkTree </a></div>
            <div><a href="https://www.instagram.com/macstract/?hl=af" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Instagram: Mactract </a></div>
            <div><a href="https://www.linkedin.com/in/superior-minds-ink-869565207/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Linkdein: Christain Mcbride </a></div>
            <div><a href="https://www.youtube.com/channel/UCBHFh0ZVLkxTvwoYW3hLZ9Q/featured" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'papayawhip' }}> Youtube: Mad Mac </a></div>
        </div>      
         
    </div>
  );
};
  
export default App;