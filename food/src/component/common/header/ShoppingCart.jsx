import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";

const ShoppingCart = () => {
  // ADD TO CART
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  // CLEAR CART
  const claerCart = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };
  return (
    <>
      <table className="cart-table" border="0">
        <thead>
          <tr>
            <th>Food</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr className="empty-cart-row">
              <td className="text-center" colSpan="6">
                Your Cart is Empty.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={"/foods/" + item._id}>
                    <img src={"/foods/" + item.thumb} alt="" />
                  </Link>
                </td>
                <td>
                  <Link to={"/foods/" + item._id}>
                    {item.title.slice(0, 5)}...
                  </Link>
                </td>
                <td>৳ {item.price}</td>
                <td>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>{" "}
                  {item.quantity}{" "}
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>৳ {item.itemTotal}</td>
                <td>
                  <Link
                    onClick={() => removeItem(item.id)}
                    className="danger-btn"
                  >
                    &times;
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th colSpan="3">Total</th>
            <th></th>
            <th></th>
            <th>{totalItems}</th>
            <th>৳ {cartTotal}</th>
            <th></th>
          </tr>
        </thead>
        <thead className="confirm-order-thead">
          <tr>
            <th colSpan="5">
              <Link to="/orders" className="btn-primary">
                Confirm Order
              </Link>{" "}
              <Link className="btn-danger" onClick={() => claerCart()}>
                Clear Cart
              </Link>
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default ShoppingCart;
