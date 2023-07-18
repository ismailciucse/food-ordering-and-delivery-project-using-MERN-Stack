import Cookies from "js-cookie";
import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import Profile from "./Profile";

const ProfilePicChange = () => {
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${id}`);
      setThumb(data.thumb);
    };
    fatchCustomer();
  }, [currentThumb]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(`/api/admin/customers/${id}?cthumb=${currentThumb}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.href = "/customer/dashboard";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <PageHeader title="Change Profile Picture" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content change-profile-pic-form">
              <form enctype="multipart/form-data" onSubmit={submitHandler}>
                {file ? (
                  <img src={file} alt="" />
                ) : (
                  <img src={"/customers/" + currentThumb} alt="" />
                )}
                <input
                  type="file"
                  onChange={handleThumbChange}
                  id="thumb"
                  class="form-control"
                  required
                />
                <button className="btn-primary">Update</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default ProfilePicChange;
