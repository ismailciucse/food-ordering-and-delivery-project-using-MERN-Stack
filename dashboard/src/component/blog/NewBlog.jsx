import axios from "axios";
import React, { useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      title,
      thumb: document.querySelector("#thumb").files[0],
      description,
      featured,
    };
    axios
      .post("/api/admin/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Blog added successfull.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/blogs";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Blog added faield!",
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
      <section className="blog content">
        <Title title="New Blog" />
        <div className="blog-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="form-control"
                placeholder="Blog title..."
                required
              />
              <label for="floatingInput">Blog title...</label>
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
                type="checkbox"
                name="featured"
                onChange={(e) => setFeatured(e.target.value)}
                role="switch"
                id="featured"
              />
              <label class="form-check-label" for="featured">
                Featured
              </label>
            </div>

            <div class="mb-3">
              <textarea
                class="form-control"
                name="description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                required
              ></textarea>
            </div>

            <input type="submit" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewBlog;
