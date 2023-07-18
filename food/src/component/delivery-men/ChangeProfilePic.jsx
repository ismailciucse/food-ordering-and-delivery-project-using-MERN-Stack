import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageHeader from "../common/header/title/PageHeader";
import "../customer/customer.css";
import Profile from "./Profile";

const ProfilePicChange = () => {
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("delivery-man");
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(`/api/admin/delivery-men/${id}`);
      setThumb(data.thumb);
    };
    fatchDeliveryMan();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(`/api/admin/delivery-men/${id}?cthumb=${currentThumb}`, updateData, {
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
        window.location.href = "/delivery-man/dashboard";
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

  if (!Cookies.get("delivery-man")) {
    window.location.href = "/delivery-man";
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
                  <img src={"/delivery-men/" + currentThumb} alt="" />
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
