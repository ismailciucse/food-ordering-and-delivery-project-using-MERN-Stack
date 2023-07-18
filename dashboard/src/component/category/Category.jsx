import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./category.css";
import Swal from "sweetalert2";
import moment from "moment";
import ReactPaginate from "react-paginate";

const Category = () => {
  // GET CATEGORIES
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get("/api/admin/categories");
      setCategories(data);
    };
    fatchCategories();
  }, [categories]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // DELETE CATEGORY
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
        axios
          .delete(`/api/admin/categories/${id}?thumb=${thumb}`)
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Category deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="category content">
        <Title title="Categories" />
        <div className="category-items">
          <Link to="/new-category" className="btn-primary">
            Add Category
          </Link>
          <table>
            <tr>
              <th>Thumb</th>
              <th>Title</th>
              <th>Featured</th>
              <th>Active</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="6">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr>
                  <td>
                    <img src={"/categories/" + item.thumb} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.featured === "" ? "off" : item.featured}</td>
                  <td>{item.active === "" ? "off" : item.active}</td>
                  <td>{moment(item.date).format("lll")}</td>
                  <td>
                    <Link
                      to={"/edit-category/" + item._id}
                      className="btn-edit"
                    >
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
          {categories.length >= 21 && (
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

export default Category;
