import React, {useState} from 'react';


const Contact = () => {
	const [email, setEmail] = useState("");
	const [textArea, setTextArea] = useState("");
	const onEmailChange = (e) => {setEmail(e.target.value)};
	const handleTextAreaChange = (e) => {setTextArea(e.target.value)};


	return(
		<div className="home Contact">
			<h1 className="musicTitle">My Many Alias</h1>
			<div>
				<h2>Mad Mac</h2>
				<h2>Thoths Host</h2>
				<h2>Chris Mac</h2>
			</div>
			 <form className="contact-form" action="https://formsubmit.co/chrismacbuff35@gmail.com" method="POST">
				<label className="" htmlFor="email-address">Email</label>
              	<input onChange={onEmailChange} className="" value={email} name="email-address"  id="email-address" />
				<p>Leave me a message if you want to work, colab etc.</p>
				<textarea value={textArea} onChange={handleTextAreaChange} rows="10" cols="60"/>
				<button type="submit" value="submit">SendEmail</button>
			</form>
		</div>
		);
}

export default Contact;