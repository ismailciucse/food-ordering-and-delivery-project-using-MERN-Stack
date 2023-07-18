import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    axios
      .post(`/api/admin/customerlogin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Email doesn't exist.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email doesn't exist.",
          });
        } else if (response.data.message === "Password doesn't match.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password doesn't match.",
          });
        } else {
          // Set Cookies
          Cookies.set("customer", response.data.customer._id, { expires: 30 });
          Cookies.set("customerName", response.data.customer.name, {
            expires: 30,
          });
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 500,
          });
          window.location.href = "/customer/dashboard/";
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something wrong.",
        });
      });
  };
  return (
    <>
      <PageHeader title="Login" />
      <section className="login">
        <div className="container">
          <div className="login-form text-center">
            {Cookies.get("customer") ? (
              <h3>You are already logged in.</h3>
            ) : (
              <div>
                <form onSubmit={submitHandler}>
                  <img src={"/default/avatar.png"} alt="" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password..."
                    required
                  />
                  <input
                    type="submit"
                    name="submit"
                    value="Login"
                    class="btn-primary"
                  />
                </form>
                <Link to="/registration">Create Account</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
