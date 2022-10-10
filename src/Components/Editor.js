import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Editor = ({ isLoggedIn, blogs }) => {

	const [textArea, setTextArea] = useState("");
	const [blogTitle, setBlogTitle] = useState("");
	const navigate = useNavigate();
	let [keyword, setKeyword] = useState('');
	const handleChange = (e) => {
			setKeyword(e.target.value);	
			
	}
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

	//logic to display blogs based on a search bar filter
	const displayBlogs = blogs.filter((blog)=>{
						if(keyword == "") {
							return blog
						} else if (blog.blogTitle.toLowerCase().includes(keyword.toLowerCase())
								   || 
								   blog.textArea.toLowerCase().includes(keyword.toLowerCase())) {
							return blog
						}
			
		}).map(blog =>{
						return (
			<div className="blog" key={blog.textId}>		
				<h1> {blog.blogTitle} </h1>
				<div> {blog.textArea} </div>
				<button onClick={()=>{deleteBlog(blog.textId)}}>Delete Post</button>
			</div>
				);
	});


	// Delete Button Logic

	 async function deleteBlog(textId) {
        await fetch(`https://smblogserver.herokuapp.com/delete/${textId}`, { method: 'DELETE' });
        alert('Delete successful');
    }

	useEffect(()=> {
		if (!isLoggedIn) {
			navigate('/')
		} else {
			navigate('/editor')
			
		}

	},[isLoggedIn])

	return (
			<div className="home blogUpload">		
                    <div className="contact-form" onSubmit={handleBlogSubmit}>
                        <h3>Blog Upload!</h3>
                        <p>Please Enter Your blog!</p>
                        <label className="title">Blog Title: </label>
        				<input onChange={handleTitleChange} className="textbox" type="textbox" placeholder="creative name here" value={blogTitle} />
                        <textarea value={textArea} onChange={handleTextAreaChange} rows="10" cols="60"/>
                        {/*<input {...register("picture")} name="picture"  type="file" />*/}
                        <button className="button" onClick={handleBlogSubmit}>Upload Blog</button>
                    	<p>Enter keyword</p>
						<input type="text" name="keyword" onChange={handleChange} />
                    </div>
				<div className="editorBlogs">
            		{keyword ? <div> {displayBlogs} </div> : <div> </div>}
            	</div>
            </div>
		);
}

export default Editor;