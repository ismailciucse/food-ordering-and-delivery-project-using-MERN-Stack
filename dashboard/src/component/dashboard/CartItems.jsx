import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartItems = () => {
  // Orders
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      setOrders(data);
    };
    fatchOrders();
  }, [orders]);

  // Revenue
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    const fatchRevenue = async () => {
      const { data } = await axios.get("/api/admin/revenue");
      setRevenue(data);
    };
    fatchRevenue();
  }, [revenue]);

  // Foods
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get("/api/admin/foods");
      setFoods(data);
    };
    fatchFoods();
  }, [foods]);

  // Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get("/api/admin/categories");
      setCategories(data);
    };
    fatchCategories();
  }, [categories]);

  // Blogs
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get("/api/admin/blogs");
      setBlogs(data);
    };
    fatchBlogs();
  }, [blogs]);

  // Customers
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get("/api/admin/customers");
      setCustomers(data);
    };
    fatchCustomers();
  }, [customers]);

  // Delivery Men
  const [deliveryMan, setDeliveryMan] = useState([]);
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get("/api/admin/delivery-men");
      setDeliveryMan(data);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  // Users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fatchUsers = async () => {
      const { data } = await axios.get("/api/admin/users");
      setUsers(data);
    };
    fatchUsers();
  }, [users]);

  // Messages
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get("/api/admin/messages");
      setMessages(data);
    };
    fatchMessages();
  }, [messages]);

  return (
    <div>
      <div className="dashboard-cards">
        <Link to="/orders">
          <div className="single-card">
            <div className="card-content">
              <h4>Total Orders</h4>
              <span>{orders.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-shopping-basket-line"></i>
            </span>
          </div>
        </Link>

        <Link to="/revenue">
          <div className="single-card">
            <div className="card-content">
              <h4>Revenue</h4>
              <span>
                ৳{" "}
                {revenue.map((item) => (
                  <span>{item._id && item.revenue}</span>
                ))}
              </span>
            </div>
            <span className="card-icon">
              <i class="ri-currency-fill"></i>
            </span>
          </div>
        </Link>

        <Link to="/foods">
          <div className="single-card">
            <div className="card-content">
              <h4>Foods</h4>
              <span>{foods.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-service-line"></i>
            </span>
          </div>
        </Link>

        <Link to="/categories">
          <div className="single-card">
            <div className="card-content">
              <h4>Categories</h4>
              <span>{categories.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-list-check"></i>
            </span>
          </div>
        </Link>
      </div>

      <div className="dashboard-cards">
        <Link to="/blogs">
          <div className="single-card">
            <div className="card-content">
              <h4>Blogs</h4>
              <span>{blogs.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-pages-line"></i>
            </span>
          </div>
        </Link>

        <Link to="/customers">
          <div className="single-card">
            <div className="card-content">
              <h4>Customers</h4>
              <span>{customers.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-map-pin-user-fill"></i>
            </span>
          </div>
        </Link>

        <Link to="/delivery-men">
          <div className="single-card">
            <div className="card-content">
              <h4>Delivery Men</h4>
              <span>{deliveryMan.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-truck-line"></i>
            </span>
          </div>
        </Link>

        <Link to="/users">
          <div className="single-card">
            <div className="card-content">
              <h4>Managers</h4>
              <span>{users.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-team-line"></i>
            </span>
          </div>
        </Link>
      </div>
      <div className="dashboard-cards">
        <Link to="/messages">
          <div className="single-card">
            <div className="card-content">
              <h4>Total Message</h4>
              <span>{messages.length}+</span>
            </div>
            <span className="card-icon">
              <i class="ri-chat-2-line"></i>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartItems;
