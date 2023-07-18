import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../blog/Blog";
import EditBlog from "../blog/EditBlog";
import NewBlog from "../blog/NewBlog";
import Category from "../category/Category";
import EditCategory from "../category/EditCategory";
import NewCategory from "../category/NewCategory";
import Customer from "../customer/Customer";
import Dashboard from "../dashboard/Dashboard";
import ErrorPage from "../error-page/ErrorPage";
import { EditFood } from "../food/EditFood";
import Food from "../food/Food";
import NewFood from "../food/NewFood";
import Message from "../message/Message";
import SingleMessage from "../message/SingleMessage";
import Order from "../order/Order";
import ChangeDetails from "../profile/ChangeDetails";
import ChangePassword from "../profile/ChangePassword";
import ChangeProfilePic from "../profile/ChangeProfilePic";
import Profile from "../profile/Profile";
import NewUser from "../user/NewUser";
import User from "../user/User";
import Login from "../login/Login";
import SingleOrder from "../order/SingleOrder";
import SingleCustomer from "../customer/SingleCustomer";
import DeliveryMen from "../deliverymen/DeliveryMen";
import SingleDeliveryMen from "../deliverymen/SingleDeliveryMen";
import NewMan from "../deliverymen/NewMan";
import Revenue from "../order/Revenue";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/new-category" element={<NewCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/foods" element={<Food />} />
        <Route path="/new-food" element={<NewFood />} />
        <Route path="/edit-food/:id" element={<EditFood />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/customers/:id" element={<SingleCustomer />} />
        <Route path="/users" element={<User />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
        <Route path="/revenue/" element={<Revenue />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/message/view/:id" element={<SingleMessage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-details" element={<ChangeDetails />} />
        <Route path="/change-profile-pic" element={<ChangeProfilePic />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delivery-men" element={<DeliveryMen />} />
        <Route path="/new-man" element={<NewMan />} />
        <Route path="/delivery-men/:id" element={<SingleDeliveryMen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Router;
