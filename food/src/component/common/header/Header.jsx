import "./header.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import { useCart } from "react-use-cart";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  // NAVIGATION ANIMATE
  const [siteTopNav, setSiteTopNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) {
        setSiteTopNav(false);
      } else {
        setSiteTopNav(true);
      }
    });
  }, []);

  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // CART DROPDOWN
  let cartRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // PROFILE DROPDOWN
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const { totalUniqueItems } = useCart();

  // GET CUSTOMER DETAILS
  const customer_id = Cookies.get("customer");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${customer_id}`);
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer]);

  // GET DELIVERY MAN DETAILS
  const deliveryMan_id = Cookies.get("delivery-man");
  const [deliveryMan, setDeliveryMan] = useState({});
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        `/api/admin/delivery-men/${deliveryMan_id}`
      );
      setDeliveryMan(data);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  // DELIVERY MAN LOGOUT
  const deliveryManLogout = () => {
    Cookies.remove("delivery-man");
    window.location.href = "/";
  };

  return (
    <>
      <header className="navbar">
        <nav
          id="site-top-nav"
          className={`navbar-menu navbar-fixed-top ${
            siteTopNav && "site-top-nav"
          }`}
        >
          <div className="container">
            <div className="logo">
              <Link to="/" title="Logo">
                <img
                  src={"/default/logo.png"}
                  alt="Restaurant Logo"
                  className="img-responsive"
                />
              </Link>
            </div>
            <div id="menu" className="menu text-right">
              <ul>
                <li>
                  <Link className="hvr-underline-from-center" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/foods">
                    Food
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/orders">
                    Order
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/blogs">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="hvr-underline-from-center" to="/contact">
                    Contact
                  </Link>
                </li>
                {!Cookies.get("customer") && (
                  <li>
                    <Link className="hvr-underline-from-center" to="/login">
                      Login
                    </Link>
                  </li>
                )}

                <li ref={cartRef}>
                  <Link
                    onClick={() => {
                      setOpenCart(!openCart);
                    }}
                    className="shopping-cart"
                  >
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>{" "}
                    <span className="notify">{totalUniqueItems}</span>
                  </Link>
                  <div
                    className={`cart-content ${
                      openCart ? "active" : "inactive"
                    }`}
                  >
                    <h3 className="text-center">Shopping Cart</h3>
                    <ShoppingCart />
                  </div>
                </li>
                {Cookies.get("customer") && (
                  <li>
                    <Link
                      className="customer-profile-pic"
                      ref={menuRef}
                      onClick={() => {
                        setOpenProfile(!openProfile);
                      }}
                    >
                      <div className="img">
                        <Link>
                          {!customer.thumb ? (
                            <img src={"/default/avatar.png"} alt="avatar" />
                          ) : (
                            <img
                              src={"/customers/" + customer.thumb}
                              alt="avatar"
                            />
                          )}
                        </Link>
                      </div>
                    </Link>
                    <div
                      className={`customer-profile-content ${
                        openProfile ? "active" : "inactive"
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to="/customer/dashboard">
                            <i
                              className="fa-solid fa-gauge"
                              aria-hidden="true"
                            ></i>{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => {
                              customerLogout();
                            }}
                          >
                            <i className="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
                {Cookies.get("delivery-man") && (
                  <li>
                    <Link
                      ref={menuRef}
                      onClick={() => {
                        setOpenProfile(!openProfile);
                      }}
                      className="customer-profile-pic"
                    >
                      <div className="img">
                        <Link>
                          {!deliveryMan.thumb ? (
                            <img src={"/default/avatar.png"} alt="avatar" />
                          ) : (
                            <img
                              src={"/delivery-men/" + deliveryMan.thumb}
                              alt="avatar"
                            />
                          )}
                        </Link>
                      </div>
                    </Link>
                    <div
                      className={`customer-profile-content ${
                        openProfile ? "active" : "inactive"
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to="/delivery-man/dashboard">
                            <i
                              className="fa-solid fa-gauge"
                              aria-hidden="true"
                            ></i>{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => {
                              deliveryManLogout();
                            }}
                          >
                            <i className="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="mobile-menu">
              <span id="mobile-menu-bar" className="mobile-menu-bar">
                &#9776;
              </span>
              <div id="mobileNav" className="mobileNav menu">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/foods">Food</Link>
                  </li>
                  <li>
                    <Link to="/orders">Order</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  {!Cookies.get("customer") && (
                    <li>
                      <Link className="hvr-underline-from-center" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  <li ref={cartRef}>
                    <Link
                      onClick={() => {
                        setOpenCart(!openCart);
                      }}
                      id="shopping-cart-mobile"
                      className="shopping-cart"
                    >
                      <i
                        className="fa fa-cart-arrow-down"
                        aria-hidden="true"
                      ></i>{" "}
                      <span className="notify">(1)</span>
                    </Link>
                    <div
                      className={`cart-content ${
                        openCart ? "active" : "inactive"
                      }`}
                    >
                      <h3 className="text-center">Shopping Cart</h3>
                      <ShoppingCart />
                    </div>
                  </li>
                  {Cookies.get("customer") && (
                    <li>
                      <Link
                        className="customer-profile-pic"
                        ref={menuRef}
                        onClick={() => {
                          setOpenProfile(!openProfile);
                        }}
                      >
                        <div className="img">
                          <Link>
                            {!customer.thumb ? (
                              <img src={"/default/avatar.png"} alt="avatar" />
                            ) : (
                              <img
                                src={"/customers/" + customer.thumb}
                                alt="avatar"
                              />
                            )}
                          </Link>
                        </div>
                      </Link>
                      <div
                        className={`customer-profile-content ${
                          openProfile ? "active" : "inactive"
                        }`}
                      >
                        <ul>
                          <li>
                            <Link to="/customer/dashboard">
                              <i
                                className="fa-solid fa-gauge"
                                aria-hidden="true"
                              ></i>{" "}
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                customerLogout();
                              }}
                            >
                              <i className="fa-solid fa-right-from-bracket"></i>{" "}
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                  {Cookies.get("delivery-man") && (
                    <li>
                      <Link
                        ref={menuRef}
                        onClick={() => {
                          setOpenProfile(!openProfile);
                        }}
                        className="customer-profile-pic"
                      >
                        <div className="img">
                          <Link>
                            {!deliveryMan.thumb ? (
                              <img src={"/default/avatar.png"} alt="avatar" />
                            ) : (
                              <img
                                src={"/delivery-men/" + deliveryMan.thumb}
                                alt="avatar"
                              />
                            )}
                          </Link>
                        </div>
                      </Link>
                      <div
                        className={`customer-profile-content ${
                          openProfile ? "active" : "inactive"
                        }`}
                      >
                        <ul>
                          <li>
                            <Link to="/delivery-man/dashboard">
                              <i
                                className="fa-solid fa-gauge"
                                aria-hidden="true"
                              ></i>{" "}
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                deliveryManLogout();
                              }}
                            >
                              <i className="fa-solid fa-right-from-bracket"></i>{" "}
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
