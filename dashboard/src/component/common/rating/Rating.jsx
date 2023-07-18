import React from "react";
import "./rating.css";

const Rating = ({ rating }) => {
  return (
    <>
      <span className="rating" title={"Rating: " + rating}>
        <i
          className={
            rating >= 1
              ? "ri-star-fill"
              : rating >= 0.5
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
        <i
          className={
            rating >= 2
              ? "ri-star-fill"
              : rating >= 1.5
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
        <i
          className={
            rating >= 3
              ? "ri-star-fill"
              : rating >= 2.5
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
        <i
          className={
            rating >= 4
              ? "ri-star-fill"
              : rating >= 3.5
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
        <i
          className={
            rating >= 5
              ? "ri-star-fill"
              : rating >= 4.5
              ? "ri-star-half-line"
              : "ri-star-line"
          }
        ></i>
      </span>
    </>
  );
};

export default Rating;
