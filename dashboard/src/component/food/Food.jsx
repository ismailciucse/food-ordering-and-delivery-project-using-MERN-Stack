import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./food.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Food = () => {
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get("/api/admin/foods");
      setFoods(data);
    };
    fatchFoods();
  }, [foods]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

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

  // DELETE FOOD
  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/foods/${id}?thumb=${thumb}`).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Food deleted field!",
          });
        });
      }
    });
  };

  return (
    <>
      <section className="food content">
        <Title title="Foods" />
        <div className="food-items">
          <Link to="/new-food" className="btn-primary">
            Add Food
          </Link>
          <table>
            <tr>
              <th>Thumb</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </th>
              <th>Category</th>
              <th>Featured</th>
              <th>Active</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="9">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr>
                  <td>
                    <img src={"/foods/" + item.thumb} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>৳ {item.price}</td>
                  <td>{item.description.slice(0, 40)}...</td>
                  <td>
                    {item.rating.toFixed(1)}({item.totalReviews})
                  </td>
                  <td>{item.category}</td>
                  <td>{item.featured === "" ? "off" : item.featured}</td>
                  <td>{item.active === "" ? "off" : item.active}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link to={"/edit-food/" + item._id} className="btn-edit">
                      <i class="ri-edit-box-fill"></i>
                    </Link>{" "}
                    <Link
                      onClick={() => deleteHandler(item._id, item.thumb)}
                      className="btn-delete"
                    >
                      <i class="ri-delete-bin-5-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </table>
          {foods.length >= 21 && (
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

export default Food;
