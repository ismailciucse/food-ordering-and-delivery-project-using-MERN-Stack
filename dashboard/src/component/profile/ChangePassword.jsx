import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Title from "../common/title/Title";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentThumb, setThumb] = useState("");

  // GET ADMIN DETAILS
  const id = Cookies.get("admin");
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(`/api/admin/users/${id}`);
      setThumb(data.thumb);
      setEmail(data.email);
    };
    fatchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === conPassword) {
      let updateData = {
        oldPassword,
        newPassword,
        email,
        thumb: currentThumb,
      };
      axios
        .put(`/api/admin/users/${id}?cthumb=${currentThumb}`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.message === "Something wrong.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else if (response.data.message === "Old password doesn't match.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 1000,
            });
            window.location.href = "/profile";
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update field!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Confirm password doesn't match.",
      });
    }
  };

  return (
    <>
      <section className="profile content">
        <Title title="Change Password" />
        <div className="profile-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old password..."
              required
            />
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password..."
              required
            />
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              placeholder="Confirm password..."
              required
            />

            <input type="submit" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
