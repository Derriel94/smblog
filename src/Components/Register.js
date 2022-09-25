import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Signin.css';


const Register = (  ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const onEmailChange = (e) => {setEmail(e.target.value)};
  const onPasswordChange = (e) => {setPassword(e.target.value)};
  const onNameChange = (e) => {setName(e.target.value)};


  const onSubmitRegister = (e) => {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
        
      })
    })
      .then(response => {
        response.json()
        if (response.status === 400){
          alert('You did not finish your login creditials. Refresh page and start over!')
          window.location.reload(true);
          navigate("/register");
        //try event default here
        } else if (response.status === 200) {
           alert('Thanks for Registering Now Lets go sign in!')
           navigate("/signin");
        } 
          //display editor link    
          //and or redirect to editor page
      })
        // navigate("/editor");

    //   .then(user => {
    //   if (user.id) {
    
    //   }
    // });     
  };

  return(
        <div className="home signInUpBox">
            <h1 className="musicTitle">Register</h1>
          <div className="border">
            <div>
              <label className="" htmlFor="name">Name</label>
              <input onChange={onNameChange} className="" type="name" name="name"  id="name" />
            </div>
            <div>
              <label className="" htmlFor="email-address">Email</label>
              <input onChange={onEmailChange} className="" type="email" name="email-address"  id="email-address" />
            </div>
            <div>
              <label className="" htmlFor="password">Password</label>
              <input onChange={onPasswordChange} className="" type="password" name="password"  id="password" />
            </div>
            <input onClick={onSubmitRegister}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />   
          </div>
        </div>

  );
};

export default Register;