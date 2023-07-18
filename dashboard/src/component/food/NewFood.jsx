import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";

const NewFood = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get("/api/admin/categories");
      setCategories(data);
    };
    fatchCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");
  const [active, setActive] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      title,
      thumb: document.querySelector("#thumb").files[0],
      price,
      category,
      description,
      featured,
      active,
    };
    axios
      .post("/api/admin/foods", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Food added successfull.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/foods";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Food added faield!",
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
      <section className="food content">
        <Title title="New Food" />
        <div className="food-content">
          <form enctype="multipart/form-data" onSubmit={submitHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                class="form-control"
                placeholder="Category title..."
                required
              />
              <label for="floatingInput">Food title...</label>
            </div>
            <div class="mb-3">
              {file && <img src={file} alt="" />}
              <input
                type="file"
                name="thumb"
                id="thumb"
                class="form-control"
                onChange={handleThumbChange}
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">৳</span>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                class="form-control"
                placeholder="Price..."
                required
              />
            </div>

            <div class="form-floating">
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                class="form-select"
                required
              >
                <option value="" selected>
                  Select
                </option>
                {categories.map((item) => (
                  <option value={item.title}>{item.title}</option>
                ))}
              </select>
              <label for="category">Category</label>
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

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="featured"
                onChange={(e) => setFeatured(e.target.value)}
                id="featured"
              />
              <label class="form-check-label" for="featured">
                Featured
              </label>
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="active"
                onChange={(e) => setActive(e.target.value)}
                id="active"
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

export default NewFood;
