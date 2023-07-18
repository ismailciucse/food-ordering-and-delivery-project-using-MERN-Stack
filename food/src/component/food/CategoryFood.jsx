import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";
import Rating from "../common/rating/Rating";
import ReactPaginate from "react-paginate";

const CategoryFood = () => {
  const { title } = useParams();

  // GET CATEGORY FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get(`/api/admin/foods`);
      const categoryFoods = data.filter((curData) => {
        return curData.category.toLowerCase() === title.toLowerCase();
      });
      setFoods(categoryFoods);
    };
    fatchFoods();
  }, [title, foods]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = foods.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(foods.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % foods.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      text: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <PageHeader title={title} />
      <section className="food">
        <div className="container">
          <div className="grid-4">
            {currentItems.length === 0 ? (
              <h3 className="text-center">No items found!</h3>
            ) : (
              currentItems.map((item, index) => (
                <div key={index} class="items shadow">
                  <div class="img">
                    <img
                      src={"/foods/" + item.thumb}
                      alt="Pizza"
                      class="img-responsive img-curve"
                    />
                  </div>
                  <div class="text text-center">
                    <h4>
                      <Link to={"/foods/" + item._id}>{item.title}</Link>
                    </h4>
                    <h5>
                      <Rating rating={item.rating} />
                      <span>({item.totalReviews})</span>
                    </h5>
                    <p>{item.description.slice(0, 50)}...</p>
                    <h5>৳ {item.price}</h5>
                    <div class="flexSB">
                      <Link to={"/foods/" + item._id} class="btn-primary">
                        <i class="fas fa-eye"></i> View Detail
                      </Link>
                      {item.active === "on" ? (
                        <Link
                          className="btn-primary"
                          onClick={() => {
                            addItemHandlar(item, item._id);
                          }}
                        >
                          <i className="fas fa-shopping-cart"></i> Add To Cart
                        </Link>
                      ) : (
                        <Link className="btn-primary disableLink">
                          <i className="fas fa-shopping-cart"></i> Stock Out
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {foods.length >= 13 && (
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

export default CategoryFood;
