import React, { useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
//import './Signin.css';


const Signin = ( {loadUser} ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onEmailChange = (e) => {setEmail(e.target.value)};
  const onPasswordChange = (e) => {setPassword(e.target.value)};


  const onSubmitSignIn = async() => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
    };

    try {
      const apiUrl = 'https://smbserver3-env.eba-swxmxpht.us-east-1.elasticbeanstalk.com/signin';
      const response = await fetch(apiUrl, settings);
      const responseData = await response.json();
    
      if (responseData.err) {
        console.log(responseData)
        alert(responseData.err); 
        return responseData;
      } else {
        
         alert(`${responseData[0].name} You are the Leader lets Go Blog and will be logged out if you leave the site`);
         loadUser(responseData[0]);
         sessionStorage.setItem("key", responseData[0].name);
         navigate("/editor")
         return responseData;
      }
      // const json = response.json().then((json)=>{
      //   if (json.err) {
      //     console.log(json)
      //     alert(json.err); 
      //     return ;
      //   }
      //   console.log(json)
        
       
      // })

    } catch (err) {
        console.log(err);
        alert("Wrong Password Combo, try again!"); 
    }
    // Axios.post('http://localhost:3001/signin',{ 
    //     email: email,
    //     password: password,
    // })
    // .then(res => {
    //     console.log(res);
    //   if (res.message) {
    //     alert('Wrong Creditials Fool!');
    //     navigate("/signin");
    //   } else if (res.data[0].name === "ChrisMac" && res.data[0].userId === 1){
    //    alert(`${res.data[0].name} You are the Leader lets Go Blog and will be logged out if you leave the site`);
    //    loadUser(res.data[0])
    //     sessionStorage.setItem("key", res.data[0].name);
    //      navigate("/editor")
    //    console.log(res.data[0].name);
    //  } else if (res.data[0].name !== "ChrisMac" && res.data[0].userId) {
    //     alert(`${res.data[0].name} you are signed In and will be logged out if you leave the site`);
    //     loadUser(res.data[0])
    //      navigate("/blogs");
    //  }
    // }) 
  }

  

  return(
        <div className="home signInUpBox">
            <h1 className="musicTitle">Sign In</h1>
          <div className="border">
            <div className="">
              <label className="" htmlFor="email-address">Email</label>
              <input onChange={onEmailChange} className="" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="">
              <label className="" htmlFor="password">Password</label>
              <input onChange={onPasswordChange} className="" type="password" name="password"  id="password" />
            </div>
            <input onClick={onSubmitSignIn} className="signinbutton" type="submit" value="Sign in" />
            <Link to="/register" style={{color: "papayawhip"}}><p id="register">Register</p></Link> 
        </div>
        </div>
  );
};

export default Signin;