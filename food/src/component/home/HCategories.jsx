import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../common/header/title/Title";
import { Link } from "react-router-dom";

const HCategories = () => {
  // GET CATEGORIES
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get(`/api/admin/categories`);
      const featuredCategories = data.filter((curData) => {
        return curData.featured.toLowerCase() === "on";
      });
      setCategories(featuredCategories);
    };
    fatchCategories();
  }, [categories]);

  return (
    <>
      <section className="categories padding">
        <div className="container">
          <Title subtitle="Our Categories" title="Explore Foods Categories" />
        </div>
        <div className="container grid-4">
          {categories.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            categories.slice(0, 4).map((item, index) => (
              <div key={index} className="items shadow">
                <Link to={"/category-food/" + item.title}>
                  <div class="box-3 float-container">
                    <div className="category-thumb text-center">
                      <img
                        src={"/categories/" + item.thumb}
                        alt={item.title}
                        class="img-responsive img-curve"
                      />
                    </div>
                    <div className="category-title text-center">
                      <h4 class="float-text text-white">{item.title}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default HCategories;
