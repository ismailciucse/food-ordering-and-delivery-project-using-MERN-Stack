import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../common/rating/Rating";

const Profile = () => {
  // GET DELIVERY MAN DETAILS
  const id = Cookies.get("delivery-man");
  const [deliveryMan, setDeliveryMan] = useState({});
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(`/api/admin/delivery-men/${id}`);
      setDeliveryMan(data);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  // CUSTOMER LOGOUT
  const deliveryManLogout = () => {
    Cookies.remove("delivery-man");
    window.location.href = "/";
  };

  return (
    <>
      <div className="dashboard-content-inner grid-2">
        <div className="grid-2">
          <div className="img">
            <img
              src={"/delivery-men/" + deliveryMan.thumb}
              alt={deliveryMan.name}
            />
          </div>
          <div className="profile-text">
            <h4>
              <i class="fa fa-user"></i> {deliveryMan.name}
            </h4>
            <p>
              <i class="fas fa-star"></i> <Rating rating={deliveryMan.rating} />
              ({deliveryMan.totalReviews})
            </p>
            <p>
              <i class="fa fa-user-plus"></i>
              {""}
              {deliveryMan.date && moment(deliveryMan.date).format("ll")}
            </p>
            <p>
              <i class="fa fa-envelope"></i> {deliveryMan.email}
            </p>
            <p>
              <i class="fa fa-phone"></i> {deliveryMan.phone}
            </p>
            <p>
              <i class="fa fa-location-dot"></i> {deliveryMan.address}
            </p>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/delivery-man/dashboard" className="btn-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/delivery-man/reviews" className="btn-primary">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/delivery-man/change-details" className="btn-primary">
                Change Details
              </Link>
            </li>
            <li>
              <Link
                to="/delivery-man/change-profile-picture"
                className="btn-primary"
              >
                Change Profile Picture
              </Link>
            </li>
            <li>
              <Link to="/delivery-man/change-password" className="btn-primary">
                Change Password
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  deliveryManLogout();
                }}
                className="btn-primary"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Profile;
