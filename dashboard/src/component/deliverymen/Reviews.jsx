import moment from "moment";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Rating from "../common/rating/Rating";

const Reviews = ({ reviews }) => {
  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grid-4">
        {currentItems.length === 0 ? (
          <div className="review-item">
            <p>No feedback has been given yet.</p>
          </div>
        ) : (
          currentItems.map((item, index) => (
            <div key={index} className="review-item">
              <div className="grid-2">
                <p className="name bold">{item.name}</p>
                <Rating rating={item.rating} />
              </div>
              <p className="date">
                {item.date && moment(item.date).format("lll")}
              </p>
              <p className="review-content">
                {item.comment ? item.comment : "No comment given..."}
              </p>
            </div>
          ))
        )}
      </div>
      {reviews.length >= 21 && (
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
    </>
  );
};

export default Reviews;
