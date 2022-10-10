import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Editor = ({ isLoggedIn }) => {

	const [textArea, setTextArea] = useState("");
	const [blogTitle, setBlogTitle] = useState("");
	const navigate = useNavigate();

	const handleTextAreaChange = (e) => {
		setTextArea(e.target.value);
	};

	const handleTitleChange = (e) => {
		setBlogTitle(e.target.value);
	}

	const handleBlogSubmit = (e) => {
			fetch('https://smblogserver.herokuapp.com/editor', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify ({
					textArea: textArea,
					blogTitle: blogTitle,
				}),	
			})
			.then((response)=> {
				if (response.status === 400) {
					 return alert('There was an error')
				} else {
					alert('Title and Blog were submited')
				}

			})
	
	}
	useEffect(()=> {
		if (!isLoggedIn) {
			navigate('/')
		} else {
			navigate('/editor')
			
		}

	},[isLoggedIn])

	return (
			<div className="home file-upload-container">		
                    <div className="contact-form" onSubmit={handleBlogSubmit}>
                        <h3>Blog Upload!</h3>
                        <p>Please Enter Your blog!</p>
                        <label className="title">Blog Title: </label>
        				<input onChange={handleTitleChange} className="textbox" type="textbox" placeholder="creative name here" value={blogTitle} />
                        <textarea value={textArea} onChange={handleTextAreaChange} rows="10" cols="60"/>
                        {/*<input {...register("picture")} name="picture"  type="file" />*/}
                        <button className="button" onClick={handleBlogSubmit}>Upload Blog</button>
                    </div>
            </div>
		);
}

export default Editor;