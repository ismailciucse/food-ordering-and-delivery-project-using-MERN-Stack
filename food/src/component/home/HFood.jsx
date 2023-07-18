import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/header/title/Title";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";

const HFood = () => {
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get(`/api/admin/foods`);
      const featuredFoods = data.filter((curData) => {
        return curData.featured.toLowerCase() === "on";
      });
      setFoods(featuredFoods);
    };
    fatchFoods();
  }, [foods]);

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
      <section className="food padding">
        <div className="container">
          <Title subtitle="Our Food Menu" title="Our Populer Food Menu" />
        </div>
        <div className="container grid-4">
          {foods.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            foods.slice(0, 8).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <Link to={"/foods/" + item._id}>
                    <img
                      src={"/foods/" + item.thumb}
                      alt={item.title}
                      className="img-responsive img-curve"
                    />
                  </Link>
                </div>
                <div className="text text-center">
                  <h4>
                    <Link to={"/foods/" + item._id}>{item.title}</Link>
                  </h4>
                  <h5>
                    <Rating rating={item.rating} />
                    <span>({item.totalReviews})</span>
                  </h5>
                  <p>{item.description.slice(0, 50)}...</p>
                  <h5>৳ {item.price}</h5>
                  <div className="flexSB">
                    <Link to={"/foods/" + item._id} className="btn-primary">
                      <i className="fas fa-eye"></i> View Detail
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
      </section>
    </>
  );
};

export default HFood;
