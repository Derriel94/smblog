import React, {useState, useEffect} from 'react';
import "./../../App.css";
import axios from 'axios';



const Home = ( {Link} ) => {
	const [blogs, setBlogsList] = useState([
	{textId: 0,
	textArea: "This is a story all about how my life got twisted and turned upside down",
	blogTitle: "Welcome To Blog City"}
	]);
	useEffect(()=> {
		axios.get('https://smblogserver.herokuapp.com/blogs')
    	.then((response)=>{
    	setBlogsList(response.data);
     	})
	},[])
	
	return (
	<div className="home">
		<div className="sidebar">
				<h1>About Mac</h1>
				<img src="./logo.png" alt="mac"/>
				<p>My name is Christian McBride, I am an audiobook producer and narrator. This will be my 2nd year producing audiobooks I love what I do. I'm also an editorial intern for whatstrending.com writing is a passion of mine and I look to continually expand my talents in this direction. I look forward to not only meeting other writers and voice artists but grow with a team as well.</p>
		</div>
		<div className="main">
			<h1>Most Recent Blog</h1>
			<h3>{blogs[blogs.length - 1].blogTitle}</h3>
				<img src="./logo.png" alt="mac"/>
			<p>{blogs[blogs.length -1 ].textArea}</p>
		</div>
		<div className="video">
			<h1><Link to='/blogs' style={{color: "papayawhip"}}>Recent Music</Link></h1>
			<iframe width="560" height="315" 
			src="https://www.youtube.com/embed/mBTtoql1Atc" 
			title="YouTube video player" 
			frameBorder="5" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
			allowFullScreen></iframe>
		</div>
	</div>		
		);
}

export default Home;