import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

const BlogItem = () => {
  // GET BLOGS
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get(`/api/admin/blogs`);
      setBlogs(data);
    };
    fatchBlogs();
  }, [blogs]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grid-3">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item) => (
            <div className="items shadow">
              <div className="img">
                <img src={"/blogs/" + item.thumb} alt="" />
              </div>
              <div className="text">
                <div className="admin flexSB">
                  <span>
                    <i className="fa fa-user"></i>
                    <label htmlFor="">{item.post_by}</label>
                  </span>
                  <span>
                    <i className="fa fa-calendar-alt"></i>
                    <label htmlFor="">{moment(item.date).format("lll")}</label>
                  </span>
                </div>
                <Link to={"/blogs/" + item._id} className="blog-title">
                  <h1>{item.title.slice(0, 60)}...</h1>
                </Link>
                <p>
                  {item.description.slice(0, 100)}...{" "}
                  <Link to={"/blogs/" + item._id} class="success-btn">
                    <i className="fas fa-eye"></i> Read More
                  </Link>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {blogs.length >= 13 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      )}
    </>
  );
};

export default BlogItem;
