import React from "react";
import HBlog from "./HBlog";
import Search from "../common/search/Search";
import HCategories from "./HCategories";
import HFood from "./HFood";

export const Home = () => {
  return (
    <>
      <Search />
      <HCategories />
      <HFood />
      <HBlog />
    </>
  );
};
