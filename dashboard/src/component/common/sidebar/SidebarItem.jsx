import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const [active, setActive] = useState(false);

  if (item.childrens) {
    return (
      <div className={active ? "sidebar-item active" : "sidebar-item"}>
        <div className="sidebar-title" onClick={() => setActive(!active)}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.display}
          </span>
          <i className="ri-arrow-down-s-fill toggle-icon"></i>
        </div>
        <div className="sidebar-submenu">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <li className="nav-item">
        <NavLink
          to={item.path || "#"}
          className={(navClass) =>
            navClass.isActive
              ? "nav-active nav-link sidebar-item"
              : "nav-link sidebar-item"
          }
        >
          {item.icon && <i className={item.icon}></i>} {item.display}
        </NavLink>
      </li>
    );
  }
};

export default SidebarItem;
