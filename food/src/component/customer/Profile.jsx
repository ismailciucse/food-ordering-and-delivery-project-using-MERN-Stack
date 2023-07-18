import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${id}`);
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer]);

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  return (
    <>
      <div className="dashboard-content-inner grid-2">
        <div className="grid-2">
          <div className="img">
            <img src={"/customers/" + customer.thumb} alt={customer.name} />
          </div>
          <div className="profile-text">
            <h4>
              <i class="fa fa-user"></i> {customer.name}
            </h4>
            <p>
              <i class="fa fa-user-plus"></i>
              {""}
              {customer.date && moment(customer.date).format("ll")}
            </p>
            <p>
              <i class="fa fa-envelope"></i> {customer.email}
            </p>
            <p>
              <i class="fa fa-phone"></i> {customer.phone}
            </p>
            <p>
              <i class="fa fa-location-dot"></i> {customer.address}
            </p>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/customer/dashboard" className="btn-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/customer/change-details" className="btn-primary">
                Change Details
              </Link>
            </li>
            <li>
              <Link
                to="/customer/change-profile-picture"
                className="btn-primary"
              >
                Change Profile Picture
              </Link>
            </li>
            <li>
              <Link to="/customer/change-password" className="btn-primary">
                Change Password
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  customerLogout();
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
