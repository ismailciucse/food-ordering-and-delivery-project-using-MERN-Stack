import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

const Revenue = () => {
  // GET COMPLETED ORDER
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get("/api/admin/orders");
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() === "delivered";
      });
      setOrders(completeOrder);
    };
    fatchOrders();
  }, [orders]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="order content">
        <Title title="Revenue" />
        <div className="order-items">
          <table>
            <tr>
              <th>Customer</th>
              <th>Order_id</th>
              <th>Items</th>
              <th>Qty</th>
              <th>Total_price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Order_date</th>
              <th>Accept_Time</th>
              <th>Exp_Time</th>
              <th>Delivery_man</th>
            </tr>
            {currentItems.length === 0 ? (
              <tr>
                <td className="text-center" colSpan="13">
                  No items found!
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr
                  className={
                    (item.status === "Ordered" && "text-bold") ||
                    (item.status === "OnDelivery" && "text-bold")
                  }
                >
                  <td>
                    <Link to={"/customers/" + item.customer_id}>
                      {item.customer_name}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/orders/" + item._id}>{item.orderID}</Link>
                  </td>
                  <td>{item.total_foods}</td>
                  <td>{item.total_quantity}</td>
                  <td>৳ {item.total_price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <span
                      className={
                        (item.status === "Ordered" && "btn-order") ||
                        (item.status === "OnDelivery" && "btn-on-delv") ||
                        (item.status === "Cancelled" && "btn-cncl") ||
                        (item.status === "Delivered" && "btn-delv")
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{moment(item.order_date).format("lll")}</td>
                  <td>
                    {item.accept_time && moment(item.accept_time).format("lll")}
                  </td>
                  <td>{item.exp_time === 0 ? "NaN" : item.exp_time}</td>
                  <td>
                    {item.delivery_man_name === "NaN" ? (
                      "Nan"
                    ) : (
                      <Link to={"/delivery-men/" + item.delivery_man_id}>
                        {item.delivery_man_name}
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </table>
          {orders.length >= 21 && (
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

export default Revenue;
