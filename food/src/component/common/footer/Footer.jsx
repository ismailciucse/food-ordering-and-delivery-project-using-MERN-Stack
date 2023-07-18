import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import axios from "axios";
import moment from "moment";

const Footer = () => {
  // Show/Hide Back-To-Top Button
  const [bactToTop, setBactToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) {
        setBactToTop(false);
      } else {
        setBactToTop(true);
      }
    });
  }, []);

  // GET BLOGS
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get(`/api/admin/blogs`);
      setBlogs(data);
    };
    fatchBlogs();
  }, [blogs]);

  // BACK TO TOP
  const bactToTopButton = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer>
        <div className="container padding grid-4">
          <div className="box footer-logo">
            <img src={"/default/logo.png"} alt="Logo" />
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
            <div className="social">
              <Link to="#">
                <i className="fab fa-facebook-f icon facebook"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram icon instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter icon twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in icon linkedin"></i>
              </Link>
            </div>
          </div>
          <div className="box link">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/foods">Food</Link>
              </li>
              <li>
                <Link to="/blogs">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="http://localhost:2000/">Admin</a>
              </li>
              <li>
                <Link to="/delivery-man">Delivery Man</Link>
              </li>
            </ul>
          </div>
          <div className="box">
            <h3>Recent Post</h3>
            {blogs.length === 0 ? (
              <p className="text-center">No items found!</p>
            ) : (
              blogs.slice(0, 3).map((item, index) => (
                <div key={index} className="footer-item flexSB">
                  <div className="img">
                    <Link to="blog">
                      <img src={"/blogs/" + item.thumb} alt="" />
                    </Link>
                  </div>
                  <div className="text">
                    <span>
                      <i className="fa fa-calendar-alt"></i>
                      <label htmlFor="">{moment(item.date).format("ll")}</label>
                    </span>
                    <span>
                      <i className="fa fa-user"></i>
                      <label htmlFor="">{item.post_by}</label>
                    </span>
                    <h4>
                      <Link to={"/blogs/" + item._id}>
                        {item.title.slice(0, 20)}...
                      </Link>
                    </h4>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="box last">
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className="fa fa-location-dot"></i>
                Bahaddarhat, Chittagong, Bangladesh
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +2 392 3929 210
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                contact@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>
          &copy; Copyright 2023 All Right Reserve. By <span>Md. Ismail</span>
        </p>
        <Link
          id="back-to-top"
          className={`btn-primary smooth-scroll ${bactToTop ? "show" : "hide"}`}
          onClick={() => bactToTopButton()}
        >
          <i className="fa fa-angle-double-up"></i>
        </Link>
      </div>
    </>
  );
};

export default Footer;
