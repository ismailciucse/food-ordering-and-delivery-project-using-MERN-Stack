import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./message.css";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Message = () => {
  // GET MESSAGES
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get("/api/admin/messages");
      setMessages(data);
    };
    fatchMessages();
  }, [messages]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = messages.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(messages.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % messages.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // DELETE MESSAGE
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/messages/${id}`).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Message deleted field!",
          });
        });
      }
    });
  };

  // OPEN MESSAGE
  const viewHandler = (id) => {
    axios
      .put(`/api/admin/messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.location.href = `/message/view/${id}`;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Food update field!",
        });
      });
  };

  return (
    <div>
      <section className="message content">
        <Title title="Messages" />
        <div className="message-items">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="7">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={index} className={item.read === "No" && "text-bold"}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject.slice(0, 20)}...</td>
                  <td>{item.phone}</td>
                  <td>{item.message.slice(0, 20)}...</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link
                      onClick={() => viewHandler(item._id)}
                      className="btn-success"
                    >
                      <i class="ri-eye-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id)}
                      className="btn-delete"
                    >
                      <i class="ri-delete-bin-5-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </table>
          {messages.length >= 21 && (
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
    </div>
  );
};

export default Message;
