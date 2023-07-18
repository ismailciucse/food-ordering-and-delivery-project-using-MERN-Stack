import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./component/blog/Blog";
import SingleBlog from "./component/blog/SingleBlog";
import Categories from "./component/categories/Categories";
import Footer from "./component/common/footer/Footer";
import Header from "./component/common/header/Header";
import Contact from "./component/contact/Contact";
import CategoryFood from "./component/food/CategoryFood";
import Food from "./component/food/Food";
import { Home } from "./component/home/Home";
import Login from "./component/login/Login";
import SignUp from "./component/login/SignUp";
import Order from "./component/order/Order";
// Customer Profile
import Dashboard from "./component/customer/Dashboard";
import CustomerOrder from "./component/customer/Order";
import ProfilePicChange from "./component/customer/ChangeProfilePic";
import ChangePassword from "./component/customer/ChangePassword";
import ChangeDetails from "./component/customer/ChangeDetails";
import InvalidPage from "./component/error-page/InvalidPage";
import SingleFood from "./component/food/SingleFood";
import { CartProvider } from "react-use-cart";
import DeliveryMan from "./component/login/delivery-man";
// Delivery Profile
import ManDashboard from "./component/delivery-men/Dashboard";
import DeliveryManReviews from "./component/delivery-men/Reviews";
import DeliveryManOrder from "./component/delivery-men/Order";
import ManProfilePicChange from "./component/delivery-men/ChangeProfilePic";
import ManChangePassword from "./component/delivery-men/ChangePassword";
import ManChangeDetails from "./component/delivery-men/ChangeDetails";
import ScrollToTop from "./component/common/scroll-to-top/ScrollToTop";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/foods" element={<Food />} />
          <Route exact path="/foods/:id" element={<SingleFood />} />
          <Route
            exact
            path="/category-food/:title"
            element={<CategoryFood />}
          />
          <Route exact path="/orders" element={<Order />} />
          <Route exact path="/blogs" element={<Blog />} />
          <Route exact path="/blogs/:id" element={<SingleBlog />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<SignUp />} />
          <Route exact path="/delivery-man" element={<DeliveryMan />} />
          {/* Customer Profile */}
          <Route exact path="/customer/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/customer/dashboard/:id"
            element={<CustomerOrder />}
          />
          <Route
            exact
            path="/customer/change-details"
            element={<ChangeDetails />}
          />
          <Route
            exact
            path="/customer/change-profile-picture"
            element={<ProfilePicChange />}
          />
          <Route
            exact
            path="/customer/change-password"
            element={<ChangePassword />}
          />
          {/* Deliver Man Profile */}
          <Route
            exact
            path="/delivery-man/dashboard"
            element={<ManDashboard />}
          />
          <Route
            exact
            path="/delivery-man/reviews"
            element={<DeliveryManReviews />}
          />
          <Route
            exact
            path="/delivery-man/dashboard/:id"
            element={<DeliveryManOrder />}
          />
          <Route
            exact
            path="/delivery-man/change-details"
            element={<ManChangeDetails />}
          />
          <Route
            exact
            path="/delivery-man/change-profile-picture"
            element={<ManProfilePicChange />}
          />
          <Route
            exact
            path="/delivery-man/change-password"
            element={<ManChangePassword />}
          />
          <Route exact path="*" element={<InvalidPage />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
