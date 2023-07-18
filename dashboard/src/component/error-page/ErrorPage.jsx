import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="error-page text-center">
        <p>404 Error!</p>
        <h1>Page Not Found</h1>
        <br />
        <Link to="/" className="btn-primary">
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
