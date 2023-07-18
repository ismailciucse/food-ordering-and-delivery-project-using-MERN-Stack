import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Title from "../common/title/Title";
import "./message.css";
import Swal from "sweetalert2";

const SingleMessage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get(`/api/admin/messages/${id}`);
      setMessage(data);
    };
    fatchMessages();
  }, [message]);

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
        axios
          .delete(`/api/admin/messages/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Message deleted successfull.",
              showConfirmButton: false,
              timer: 500,
            });
            window.location.href = "/messages";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Message deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="dashboard content">
        <Title title="View Message" />
        <div className="message-item">
          <div className="single-message">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Name: </b> {message.name}
                </li>
                <li class="list-group-item">
                  <b>Email: </b> {message.email}
                </li>
                <li class="list-group-item">
                  <b>Phone: </b> {message.phone}
                </li>
                <li class="list-group-item">
                  <b>Subject: </b> {message.subject}
                </li>
                <li class="list-group-item">
                  <b>Date: </b> {moment(message.date).format("lll")}
                </li>
                <li class="list-group-item">
                  <b>Message: </b> {message.message}
                </li>
              </ul>
            </div>
            <Link to="/messages" className="btn-primary">
              Back
            </Link>
            <Link
              onClick={() => deleteHandler(message._id)}
              className="btn-delete"
            >
              Delete
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMessage;
