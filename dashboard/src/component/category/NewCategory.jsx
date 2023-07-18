import React, { useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";
import axios from "axios";

const NewCategory = () => {
  const [title, setTitle] = useState("");
  const [featured, setFeatured] = useState("");
  const [active, setActive] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      title,
      thumb: document.querySelector("#thumb").files[0],
      featured,
      active,
    };
    axios
      .post("/api/admin/categories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Category added successfull.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/categories";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category added faield!",
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
      <section className="category content">
        <Title title="New Category" />
        <div className="category-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="form-control"
                placeholder="Category title..."
                required
              />
              <label for="title">Category title...</label>
            </div>
            <div class="mb-3">
              {file && <img src={file} alt="" />}
              <input
                type="file"
                onChange={handleThumbChange}
                id="thumb"
                class="form-control"
                required
              />
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                name="featured"
                onChange={(e) => setFeatured(e.target.value)}
                type="checkbox"
              />
              <label class="form-check-label" for="featured">
                Featured
              </label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                name="active"
                onChange={(e) => setActive(e.target.value)}
                type="checkbox"
              />
              <label class="form-check-label" for="active">
                Active
              </label>
            </div>

            <input type="submit" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewCategory;
