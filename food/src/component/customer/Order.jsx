import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Profile from "./Profile";
import Rating from "../common/rating/Rating";

const Order = () => {
  const { id } = useParams();
  // GET SINGLE ORDER
  const [order, setOrder] = useState({});
  const [items, setitems] = useState([]);
  const [deliveryManID, setDeliveryManID] = useState("");
  useEffect(() => {
    const fatchOrder = async () => {
      const { data } = await axios.get(`/api/admin/orders/${id}`);
      setOrder(data);
      setitems(data.items);
      setDeliveryManID(data.delivery_man_id);
    };
    fatchOrder();
  }, [order]);

  // GET DELIVERY MAN DETAILS
  const [deliveryMan, setDeliveryMan] = useState({});
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        `/api/admin/delivery-men/${deliveryManID}`
      );
      setDeliveryMan(data);
    };
    fatchDeliveryMan();
  }, [order]);

  // CANCEL ORDER
  const deleteHandler = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/orders/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Order Celceled.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/customer/dashboard";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order deleted field!",
            });
          });
      }
    });
  };

  // Delivery Man Review Submition
  const [deliveryManRating, setDeliveryManRating] = useState("");
  const [deliveryManComment, setDeliveryManComment] = useState("");
  const customer_id = Cookies.get("customer");
  const name = Cookies.get("customerName");
  const deliveryManReview = (e) => {
    e.preventDefault();
    let data = {
      name,
      rating: deliveryManRating,
      comment: deliveryManComment,
      customer_id,
      deliveryManID,
    };
    axios
      .post(`/api/admin/delivery-men/${id}/review`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Successfully reviewed.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          let updateData = {
            deliveryManReview: "Yes",
          };
          axios
            .put(`/api/admin/orders/${id}`, updateData, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Order update field!",
              });
            });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Broken.",
        });
      });
  };

  // Food Review Submition
  const foodReviewHandler = (foodID) => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        html:
          '<select id="foodRating" class="swal2-select" ><option value="">Rating...</option><option value="1">1 - Poor</option> <option value="2">2 - Fair</option><option value="3">3 - Good</option><option value="4">4 - Very Good</option><option value="5">5 - Excellent</option></select>' +
          '<textarea id="foodComment" class="swal2-textarea" rows="2" placeholder="Write a comment..." required ></textarea> ',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("foodRating").value,
            document.getElementById("foodComment").value,
          ];
        },
      });

      if (formValues) {
        if (formValues[0].length !== 0) {
          let data = {
            name,
            rating: formValues[0],
            comment: formValues[1],
            customer_id,
          };
          axios
            .post(`/api/admin/foods/${foodID}/review`, data, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              if (response.data.message === "Successfully reviewed.") {
                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                  showConfirmButton: false,
                  timer: 1000,
                });
                let foodData = {
                  food_id: foodID,
                };
                axios.put(`/api/admin/orders/${id}/review/`, foodData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Oops...",
                  text: response.data.message,
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something wrong.",
              });
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Rating required!",
          });
        }
      }
    })();
  };

  // ACCEPT ORDER
  const acceptHandler = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          status: "Delivered",
        };
        axios
          .put(`/api/admin/orders/${id}`, updateData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            let updateManData = {
              pendingOrders: deliveryMan.pendingOrders - 1,
              completeOrders: deliveryMan.completeOrders + 1,
              thumb: deliveryMan.thumb,
            };
            axios
              .put(
                `/api/admin/delivery-men/${deliveryManID}?cthumb=${deliveryMan.thumb}`,
                updateManData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Delivery man update failed.",
                });
              });
            Swal.fire({
              icon: "warning",
              text: "Plese, Give a review for Delivery Man and Foods!",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order update failed!",
            });
          });
      }
    });
  };

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <PageHeader title="Dashboard" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <div className="order order-details">
                <div className="order-items">
                  <h3 className="text-center">Order Details</h3>
                  <div className="heading-border"></div>
                  <table>
                    <tr>
                      <th>Thumb</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total_price</th>
                    </tr>
                    {items.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="13">
                          No items found!
                        </td>
                      </tr>
                    ) : (
                      items.map((val, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={"/foods/" + val._id}>
                              <img
                                src={"/foods/" + val.thumb}
                                alt={val.title}
                              />
                            </Link>
                          </td>
                          <td>
                            <Link to={"/foods/" + val._id}>{val.title}</Link>
                          </td>
                          <td>৳ {val.price}</td>
                          <td>{val.quantity}</td>
                          <td>{val.itemTotal}</td>
                        </tr>
                      ))
                    )}
                    <tr className="bold">
                      <td colSpan="2">Total Items: {order.total_foods}</td>
                      <td colSpan="2">Total Qty: {order.total_quantity}</td>
                      <td>
                        Sub-Total: ৳ {order.total_price - order.deliveryCost}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Delviery Cost: ৳ {order.deliveryCost}</th>
                      <th colSpan="2">Total Cost: ৳ {order.total_price}</th>
                    </tr>
                  </table>
                  <div className="grid-3">
                    <div className="order-summury">
                      <h5>Order Status</h5>
                      <ul>
                        <li>
                          <b>Order ID: </b> {order.orderID}
                        </li>
                        <li>
                          <b>Status: </b>
                          <span
                            className={
                              (order.status === "Ordered" && "btn-order") ||
                              (order.status === "OnDelivery" &&
                                "btn-on-delv") ||
                              (order.status === "Cancelled" && "btn-cncl") ||
                              (order.status === "Delivered" && "btn-delv")
                            }
                          >
                            {order.status}
                          </span>
                        </li>
                        <li>
                          <b>Payment: </b> {order.payment}
                        </li>
                        <li>
                          <b>Order Date: </b>
                          {order.order_date
                            ? moment(order.order_date).format("lll")
                            : "NaN"}
                        </li>
                        <li>
                          <b>Accept Time: </b>
                          {order.accept_time
                            ? moment(order.accept_time).format("lll")
                            : "NaN"}
                        </li>
                        <li>
                          <b>Expected Time: </b>
                          {order.exp_time === "0" ? "NaN" : order.exp_time}
                        </li>
                      </ul>
                      {!order.status ||
                      order.status === "Ordered" ||
                      order.status === "Delivered" ||
                      order.status === "Cancelled" ? (
                        <Link className="btn-primary disableLink">ACCEPT</Link>
                      ) : (
                        <Link
                          onClick={() => acceptHandler()}
                          className="btn-primary"
                        >
                          ACCEPT
                        </Link>
                      )}{" "}
                      {order.status === "Ordered" ? (
                        <Link
                          onClick={() => deleteHandler()}
                          className="btn-danger"
                        >
                          CANCEL
                        </Link>
                      ) : (
                        <Link className="btn-danger disableLink">CANCEL</Link>
                      )}
                    </div>
                    {order.delivery_man_id !== "NaN" && (
                      <div className="order-summury">
                        <h5>Delivery Man</h5>
                        <ul>
                          <li className="delivery-man-details">
                            <img
                              src={"/delivery-men/" + deliveryMan.thumb}
                              alt={deliveryMan.name}
                            />
                          </li>
                          <li title="Police Verified">
                            <b>Name: </b> {deliveryMan.name}{" "}
                            <i className="fa-solid fa-shield"></i>
                          </li>
                          <li>
                            <b>Rating: </b>
                            <Rating rating={deliveryMan.rating} /> (
                            {deliveryMan.totalReviews})
                          </li>
                          <li title="Police Verified">
                            <b>Complete Orders: </b>{" "}
                            {deliveryMan.completeOrders}
                          </li>
                          <li>
                            <b>Phone: </b>
                            <a href={"tel:" + deliveryMan.phone}>
                              {deliveryMan.phone}
                            </a>
                          </li>
                          <li>
                            <b>Email: </b>
                            <a href={"mailto:" + deliveryMan.email}>
                              {deliveryMan.email}
                            </a>
                          </li>
                          <li>
                            <b>Police Emergency: </b>
                            <a href="tel:999" className="btn-delv">
                              Click For Call
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                    {order.status === "Delivered" && (
                      <div className="order-summury">
                        <h5>Review for Delivery Man</h5>
                        {order.deliveryManReview === "No" ? (
                          <form onSubmit={deliveryManReview}>
                            <p>Rating</p>
                            <select
                              name="rating"
                              value={deliveryManRating}
                              onChange={(e) =>
                                setDeliveryManRating(e.target.value)
                              }
                              required
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </select>
                            <p>Comment</p>
                            <textarea
                              rows="2"
                              value={deliveryManComment}
                              onChange={(e) =>
                                setDeliveryManComment(e.target.value)
                              }
                              placeholder="Write a comment..."
                            ></textarea>
                            <button className="btn-primary">Submit</button>
                          </form>
                        ) : (
                          <p className="review-item text-center">
                            Review submitted.
                          </p>
                        )}

                        <h5>Review for Foods</h5>
                        <table>
                          <tr>
                            <th>Thumb</th>
                            <th>Title</th>
                            <th>Review</th>
                          </tr>
                          {items.length === 0 ? (
                            <tr>
                              <td className="text-center" colSpan="13">
                                No items found!
                              </td>
                            </tr>
                          ) : (
                            items.map((val, index) => (
                              <tr key={index}>
                                <td>
                                  <Link to={"/foods/" + val._id}>
                                    <img
                                      src={"/foods/" + val.thumb}
                                      alt={val.title}
                                    />
                                  </Link>
                                </td>
                                <td>
                                  <Link to={"/foods/" + val._id}>
                                    {val.title}
                                  </Link>
                                </td>
                                <td>
                                  {val.review === "Yes" ? (
                                    <i className="fas fa-check-circle"></i>
                                  ) : (
                                    <Link
                                      className="success-btn"
                                      onClick={() => {
                                        foodReviewHandler(val._id);
                                      }}
                                    >
                                      Review
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Order;
