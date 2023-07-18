import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import CategoriesItem from "./CategoriesItem";
import "./categories.css";

const Categories = () => {
  return (
    <>
      <PageHeader title="Our Categories" />
      <section className="categories">
        <div className="container">
          <CategoriesItem />
        </div>
      </section>
    </>
  );
};

export default Categories;
