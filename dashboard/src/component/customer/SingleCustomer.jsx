import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./customer.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const SingleCustomer = () => {
  // GET CUSTOMER DETAILS
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${id}`);
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      const fatchOrders = data.filter((curData) => {
        return curData.customer_id === id;
      });
      setOrders(fatchOrders);
    };
    fatchOrders();
  }, [orders]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // CUSTOMER DELETE
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
        axios
          .delete(`/api/admin/customers/${id}?thumb=${thumb}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Customer deleted successfull.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/customers";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Customer deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="single-customer content">
        <Title title="Customer Profile" />
        <div className="profile-items">
          <div className="left">
            <img src={"/customers/" + customer.thumb} alt={customer.name} />
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Name: </b> {customer.name}
                </li>
                <li class="list-group-item">
                  <b>Email: </b> {customer.email}
                </li>
                <li class="list-group-item">
                  <b>Phone: </b> {customer.phone}
                </li>
                <li class="list-group-item">
                  <b>Joining Date: </b> {moment(customer.date).format("ll")}
                </li>
                <li class="list-group-item">
                  <b>Address: </b> {customer.address}
                </li>
              </ul>
            </div>
            <Link className="btn-primary" to="/customers">
              BACK
            </Link>{" "}
            <Link
              onClick={() => deleteHandler(customer._id, customer.thumb)}
              className="btn-delete"
            >
              DELETE
            </Link>
          </div>
          <div className="right">
            <table className="customers-order">
              <tr>
                <th>Order ID</th>
                <th>Order date</th>
                <th>Order status</th>
                <th>Action</th>
              </tr>
              {currentItems.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan="10">
                    No items found!
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={"/orders/" + item._id}>{item.orderID}</Link>
                    </td>
                    <td>{moment(item.order_date).format("lll")}</td>
                    <td>
                      <span
                        className={
                          (item.status === "Ordered" && "btn-order") ||
                          (item.status === "OnDelivery" && "btn-on-delv") ||
                          (item.status === "Cancelled" && "btn-cncl") ||
                          (item.status === "Delivered" && "btn-delv")
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <Link to={"/orders/" + item._id} className="btn-success">
                        <i class="ri-eye-fill"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </table>
            {orders.length >= 11 && (
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
        </div>
      </section>
    </>
  );
};

export default SingleCustomer;
