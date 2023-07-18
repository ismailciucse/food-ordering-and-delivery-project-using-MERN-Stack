import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../common/title/Title";
import Swal from "sweetalert2";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [currentThumb, setThumb] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");

  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fatchBlog = async () => {
      const { data } = await axios.get(`/api/admin/blogs/${id}`);
      setBlog(data);
      setTitle(data.title);
      setThumb(data.thumb);
      setDescription(data.description);
      setFeatured(data.featured);
    };
    fatchBlog();
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
      description,
      featured,
    };
    axios
      .put(`/api/admin/blogs/${id}?cthumb=${currentThumb}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Blog updated successfull.",
          showConfirmButton: false,
          timer: 500,
        });
        window.location.href = "/blogs";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Blog update field!",
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
        <Title title="Edit Blog" />
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
                <img src={"/blogs/" + blog.thumb} alt="" />
              )}
              <input
                type="file"
                onChange={handleThumbChange}
                id="thumb"
                class="form-control"
              />
            </div>
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              rows="10"
              class="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            >
              {blog.description}
            </textarea>
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
            <input type="submit" value="Update" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditBlog;
