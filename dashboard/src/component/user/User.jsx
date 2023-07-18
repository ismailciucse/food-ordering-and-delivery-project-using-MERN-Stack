import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./user.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";

const User = () => {
  // GET ALL USERS
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fatchUsers = async () => {
      const { data } = await axios.get("/api/admin/users");
      setUsers(data);
    };
    fatchUsers();
  }, [users]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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

  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/users/${id}?thumb=${thumb}`).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User deleted field!",
          });
        });
      }
    });
  };

  return (
    <>
      <section className="user content">
        <Title title="Users" />
        <div className="user-items">
          {admin.position === "Admin" && (
            <Link to="/new-user" className="btn-primary">
              Add User
            </Link>
          )}
          <table>
            <tr>
              <th>Thumb</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Address</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="8">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr>
                  <td>
                    <img src={"/users/" + item.thumb} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.position}</td>
                  <td>{item.address}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    {users.length === 1 || admin.position !== "Admin" ? (
                      <Link className="btn-delete disableLink">
                        <i class="ri-delete-bin-5-fill"></i>
                      </Link>
                    ) : (
                      <Link
                        onClick={() => deleteHandler(item._id, item.thumb)}
                        className="btn-delete"
                      >
                        <i class="ri-delete-bin-5-fill"></i>
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </table>
          {users.length >= 21 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default User;
