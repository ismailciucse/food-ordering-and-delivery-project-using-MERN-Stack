import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const NewUser = () => {
  // GET ADMIN DETAILS
  const id = Cookies.get("admin");
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(`/api/admin/users/${id}`);
      setAdmin(data);
    };
    fatchAdmin();
  }, [admin]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      username,
      email,
      phone,
      position,
      address,
    };
    axios
      .post("/api/admin/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "User added successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 500,
          });
          window.location.href = "/users";
        } else if (response.data.message === "Already registered.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
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
      <section className="user content">
        <Title title="New User" />
        <div className="user-content">
          <form onSubmit={submitHandler}>
            {admin.position !== "Admin" ? (
              <h5 className="text-center">Only admin can add new user.</h5>
            ) : (
              <>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    placeholder="Name..."
                    required
                  />
                  <label for="floatingInput">Name...</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="form-control"
                    placeholder="Username..."
                    required
                  />
                  <label for="floatingInput">Username...</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                    placeholder="Email..."
                    required
                  />
                  <label for="floatingInput">Email...</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    value="admin (It can be changed later.)"
                    readOnly
                  />
                  <label for="floatingInput">Password...</label>
                </div>
                <div class="form-floating">
                  <select
                    class="form-select"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  >
                    <option value="" selected>
                      Select
                    </option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <label for="category">Position</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    class="form-control"
                    placeholder="Phone..."
                    required
                  />
                  <label for="floatingInput">Phone...</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    class="form-control"
                    placeholder="Address..."
                    required
                  />
                  <label for="floatingInput">Address...</label>
                </div>
                <input type="submit" className="btn-primary" />
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default NewUser;
