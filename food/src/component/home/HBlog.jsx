import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/header/title/Title";
import axios from "axios";
import moment from "moment";

const HBlog = () => {
  // GET BLOGS
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get(`/api/admin/blogs`);
      const featuredBlogs = data.filter((curData) => {
        return curData.featured.toLowerCase() === "on";
      });
      setBlogs(featuredBlogs);
    };
    fatchBlogs();
  }, [blogs]);

  return (
    <>
      <section className="blog padding">
        <div className="container">
          <Title subtitle="Our Blog" title="Recent Posts From Blog" />
        </div>
        <div className="container grid-3">
          {blogs.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            blogs.slice(0, 3).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <img src={"/blogs/" + item.thumb} alt={item.title} />
                </div>
                <div className="text">
                  <div className="admin flexSB">
                    <span>
                      <i className="fa fa-user"></i>
                      <label htmlFor="">{item.post_by}</label>
                    </span>
                    <span>
                      <i className="fa fa-calendar-alt"></i>
                      <label htmlFor="">
                        {moment(item.date).format("lll")}
                      </label>
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
      </section>
    </>
  );
};

export default HBlog;
