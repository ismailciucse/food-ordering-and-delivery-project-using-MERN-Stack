import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodItem from "../../food/FoodItem";
import Title from "../header/title/Title";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get(`/api/admin/foods?q=${query}`);
      setFoods(data);
    };
    fatchFoods();
  }, [query]);

  return (
    <>
      <section className="food-search text-center">
        <div className="container">
          <div className="search-food-form">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Food.."
              required
            />
          </div>
        </div>
      </section>
      {query.length > 0 && (
        <section className="food">
          <div className="container text-center">
            <Title title="Searcing Foods" />
            <FoodItem foods={foods} />
          </div>
        </section>
      )}
    </>
  );
};

export default Search;
