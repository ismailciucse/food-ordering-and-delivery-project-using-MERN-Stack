import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const ChangeProfilePic = () => {
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("admin");
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(`/api/admin/users/${id}`);
      setThumb(data.thumb);
    };
    fatchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(`/api/admin/users/${id}?cthumb=${currentThumb}`, updateData, {
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
        window.location.href = "/profile";
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

  return (
    <>
      <section className="profile content">
        <Title title="Change Profile Picture" />
        <div className="profile-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            {file ? (
              <img src={file} alt="" />
            ) : (
              <img src={"/users/" + currentThumb} alt="" />
            )}
            <div class="mb-3">
              <input
                type="file"
                onChange={handleThumbChange}
                id="thumb"
                class="form-control"
                required
              />
            </div>

            <input type="submit" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default ChangeProfilePic;
