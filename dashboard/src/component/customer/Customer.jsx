import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./customer.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Customer = () => {
  // GET CUSTOMERS
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get("/api/admin/customers");
      setCustomers(data);
    };
    fatchCustomers();
  }, [customers]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = customers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;
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
      <section className="customer content">
        <Title title="Customers" />
        <div className="customer-items">
          <table>
            <tr>
              <th>Thumb</th>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Address</th>
              <th>Joining_Date</th>
              <th>Action</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="9">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr>
                  <td>
                    <img src={"/customers/" + item.thumb} alt={item.name} />
                  </td>
                  <td>
                    <Link to={"/customers/" + item._id}>{item.name}</Link>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link to={"/customers/" + item._id} className="btn-success">
                      <i class="ri-eye-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id, item.thumb)}
                      className="btn-delete"
                    >
                      <i class="ri-delete-bin-5-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </table>
          {customers.length >= 21 && (
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

export default Customer;
