import React, {useState, useEffect } from 'react';
import "./Blogs.css";
import ReactPaginate from "react-paginate";



const Blogs = ( {blogs} ) => {

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
//  useEffect(()=> {
//  	axios.get('https://smblogserver.herokuapp.com/blogs')
//     .then((response)=>{
//     	setBlogsList(response.data);
//     	return response;
//      })
// }, [])
	
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