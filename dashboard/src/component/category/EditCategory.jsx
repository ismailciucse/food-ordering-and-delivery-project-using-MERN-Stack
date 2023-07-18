import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditCategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [currentThumb, setThumb] = useState("");
  const [featured, setFeatured] = useState("");
  const [active, setActive] = useState("");

  const [category, setCategory] = useState({});
  useEffect(() => {
    const fatchCategory = async () => {
      const { data } = await axios.get(`/api/admin/categories/${id}`);
      setCategory(data);
      setTitle(data.title);
      setThumb(data.thumb);
      setFeatured(data.featured);
      setActive(data.active);
    };
    fatchCategory();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    var newThumb = document.querySelector("#thumb").files[0];
    var thumb;
    if (newThumb) {
      thumb = newThumb;
    } else {
      thumb = currentThumb;
    }
    let updateData = {
      title,
      thumb: thumb,
      featured,
      active,
    };
    axios
      .put(`/api/admin/categories/${id}?cthumb=${currentThumb}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Category updated successfull.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/categories";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category update field!",
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
      <section className="dashboard content">
        <Title title="Edit Category" />
        <div className="profile-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              class="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div class="mb-3">
              {file ? (
                <img src={file} alt="" />
              ) : (
                <img
                  src={"/categories/" + category.thumb}
                  alt={category.title}
                />
              )}
              <input
                type="file"
                onChange={handleThumbChange}
                id="thumb"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="features">Featues:</label>
              <input
                type="radio"
                className="form-check-input"
                name="features"
                value="on"
                onChange={(e) => setFeatured(e.target.value)}
                required
              />{" "}
              Yes
              <input
                type="radio"
                className="form-check-input"
                name="features"
                value="off"
                onChange={(e) => setFeatured(e.target.value)}
                required
              />{" "}
              No
            </div>
            <div class="mb-3">
              <label htmlFor="features">Active:</label>
              <input
                type="radio"
                className="form-check-input"
                name="active"
                value="on"
                onChange={(e) => setActive(e.target.value)}
                required
              />{" "}
              Yes
              <input
                type="radio"
                className="form-check-input"
                name="active"
                value="off"
                onChange={(e) => setActive(e.target.value)}
                required
              />{" "}
              No
            </div>
            <input type="submit" value="Update" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCategory;
