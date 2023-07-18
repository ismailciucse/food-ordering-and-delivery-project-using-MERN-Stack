import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PageHeader from "../common/header/title/PageHeader";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      subject,
      phone,
      message,
    };
    axios
      .post(`/api/admin/messages`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Message send successfull.",
          showConfirmButton: false,
          timer: 1000,
        });
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Message send faield!",
        });
      });
  };

  return (
    <>
      <PageHeader title="Contact Us" />
      <section className="contacts">
        <div className="container flexSB">
          <div className="left row">
            <iframe
              src="https://maps.google.com/maps?q=Chittagogn,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="Map"
            ></iframe>
          </div>
          <div className="right row">
            <h1>Get in touch</h1>
            <div className="items grid-3">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>Bahaddarhat, CTG, Bangladesh</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p>contact@gmail.com</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p>+123 456 7894</p>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="flexSB">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />
              <textarea
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type messages...."
                required
              ></textarea>
              <input
                type="submit"
                value="SEND MESSAGE"
                className="btn-primary"
              />
            </form>
            <h3>Follow Us</h3>
            <div className="social">
              <Link to="#">
                <i className="fab fa-facebook-f icon facebook"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram icon instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter icon twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube icon youtube"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in icon linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
