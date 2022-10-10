import React, {useState, useEffect } from 'react';
import "./Blogs.css";
import ReactPaginate from "react-paginate";



const Blogs = ( {blogs} ) => {

const [pageNumber, setPageNumber] = useState(0);
const blogsPerPage = 1;
const pagesVisited = pageNumber * blogsPerPage;
// const starRef = useRef();
let [keyword, setKeyword] = useState('');
const handleChange = (e) => {
			setKeyword(e.target.value);	
	}
const displayBlogs = blogs.filter((blog)=>{
						if(keyword == "") {
							return blog
						} else if (blog.blogTitle.toLowerCase().includes(keyword.toLowerCase())
								   || 
								   blog.textArea.toLowerCase().includes(keyword.toLowerCase())) {
							return blog
						}
					}).slice(pagesVisited, pagesVisited + blogsPerPage).map(blog =>{
	return (
			<div className="blog" key={blog.textId}>
				<img src="./1.jpg" alt="mac"/>			
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
	
let pageCount = Math.ceil(blogs.length / blogsPerPage);
const changePage = ({selected}) => {
	setPageNumber(selected);
}

	return (
		<div className="home blogs-container">
		<div className="ad"> </div>
			<div className="mainBlogger">
			<p>Enter keyword</p>
			<input type="text" name="keyword" onChange={handleChange} />
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