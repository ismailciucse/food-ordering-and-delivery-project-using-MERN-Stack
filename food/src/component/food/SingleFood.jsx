import React, { useEffect, useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./food.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";
import moment from "moment";
import ReactPaginate from "react-paginate";

const SingleFood = () => {
  // GET SINGLE FOOD
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fatchFood = async () => {
      const { data } = await axios.get(`/api/admin/foods/${id}`);
      setFood(data);
      setReviews(data.reviews.reverse());
    };
    fatchFood();
  }, [food]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // GET RECOMMENDED FOODS
  const [recomFoods, setRecomFoods] = useState([]);
  useEffect(() => {
    const fatchRecomFood = async () => {
      const { data } = await axios.get(`/api/admin/foods/recommended`);
      setRecomFoods(data);
    };
    fatchRecomFood();
  }, [recomFoods]);

  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      title: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <PageHeader title={food.title} />
      <section className="food single-food">
        <div className="container">
          <div className="single-food-item grid-2">
            <div className="left">
              <img src={"/foods/" + food.thumb} alt={food.title} />
            </div>
            <div className="right">
              <h3>{food.title}</h3>
              <p>{food.description}</p>
              <div className="single-order-form">
                <ul>
                  <li>
                    <span>Price</span>
                    <h4>৳ {food.price}</h4>
                  </li>
                  <li>
                    <span>Category</span>
                    <h4>{food.category}</h4>
                  </li>

                  <li>
                    <span>Reviews</span>
                    <h4>
                      <Rating rating={food.rating} />
                      <span>({food.totalReviews})</span>
                    </h4>
                  </li>

                  <li>
                    <span>Status</span>
                    <h4>
                      {food.active === "on" ? "Available" : "Unavailable"}
                    </h4>
                  </li>

                  <li>
                    {food.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(food, food._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link className="btn-primary disableLink">
                        <i className="fas fa-shopping-cart"></i> Out Of Stock
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="single-food-item">
            <div className="all-review">
              <h3 className="text-center" style={{ marginBottom: "20px" }}>
                REVIEWS
              </h3>
              <div className="grid-4">
                {reviews.length === 0 ? (
                  <div className="review-item">
                    <p>No feedback has been given yet.</p>
                  </div>
                ) : (
                  currentItems.map((item, index) => (
                    <div key={index} className="review-item">
                      <div className="grid-2">
                        <h5 className="name bold">{item.name}</h5>
                        <Rating rating={item.rating} />
                      </div>
                      <p className="date">
                        {item.date && moment(item.date).format("lll")}
                      </p>
                      <p className="content">
                        {item.comment ? item.comment : "No comment given..."}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {reviews.length >= 13 && (
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
            </div>
          </div>
        </div>
        <div className="single-food-item container">
          <h3 className="text-center" style={{ marginBottom: "20px" }}>
            RECOMMENDED FOODS
          </h3>
          <div className="grid-4">
            {recomFoods.slice(0, 4).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <img
                    src={"/foods/" + item.thumb}
                    alt="Pizza"
                    className="img-responsive img-curve"
                  />
                </div>
                <div className="text text-center">
                  <h4>
                    <Link to={"/foods/" + item._id}>{item.title}</Link>
                  </h4>
                  <h5>
                    <Rating rating={item.rating} />
                    <span>({item.totalReviews})</span>
                  </h5>
                  <p>{item.description.slice(0, 50)}...</p>
                  <h5>৳ {item.price}</h5>
                  <div className="flexSB">
                    <Link to={"/foods/" + item._id} className="btn-primary">
                      <i className="fas fa-eye"></i> View Detail
                    </Link>
                    {item.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(item, item._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link className="btn-primary disableLink">
                        <i className="fas fa-shopping-cart"></i> Stock Out
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleFood;
