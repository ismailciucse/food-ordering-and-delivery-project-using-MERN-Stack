import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";

const InvalidPage = () => {
  return (
    <div>
      <PageHeader title="Page not found" />
      <section className="error-page padding text-center">
        <p>404 Error!</p>
        <h1>Page Not Found</h1>
        <br />
        <Link to="/" className="btn-primary">
          Home Page
        </Link>
      </section>
    </div>
  );
};

export default InvalidPage;
