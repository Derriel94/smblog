import React, {useState, useEffect } from 'react';
import "./Blogs.css";
import axios from 'axios';
import ReactPaginate from "react-paginate";



const Blogs = () => {
const [blogs, setBlogsList] = useState([
	{textId: 0,
	textArea: "This is a story all about how my life got twisted and turned upside down",
	blogTitle: "Welcome To Blog City"}
	]);

const [pageNumber, setPageNumber] = useState(0);
const blogsPerPage = 1;
const pagesVisited = pageNumber * blogsPerPage;
// const starRef = useRef();

const displayBlogs = blogs.slice(pagesVisited, pagesVisited + blogsPerPage).map(blog =>{
	return (
			<div className="blog" key={blog.textId}>
				<img src="./logo.png" alt="mac"/>			
				<h1> {blog.blogTitle} </h1>
				<div> {blog.textArea} </div>
			</div>
		);
})


 // fetch('http://localhost:3001/blogs')
 useEffect(()=> {
 	axios.get('http://localhost:3001/blogs')
    .then((response)=>{
    	setBlogsList(response.data);
    	return response;
     })
}, [])
	
const pageCount = Math.ceil(blogs.length / blogsPerPage);
const changePage = ({selected}) => {
	setPageNumber(selected);
}

	return (
		<div className="home blogs-container">
		<div className="ad"> </div>
			<div className="mainBlogger">
				{displayBlogs}
				<ReactPaginate
				  previousLabel={"<"}
				  nextLabel={">"}
				  pageCount={pageCount}
				  onPageChange={changePage}
				  containerClassName={"page-cont"}
				  activeClassName={"active"}
				  disabledClassName={"disabled"}
				  nextLinkClassName={"pagination-button"}
				  previousLinkClassName={"pagination-button"}
				/>
			</div>
		</div>
		);
}

export default Blogs;