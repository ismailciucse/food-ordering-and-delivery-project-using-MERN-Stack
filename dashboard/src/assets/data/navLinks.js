const navLinks = [
  {
    path: "/dashboard",
    icon: "ri-apps-2-line",
    display: "Dashboard",
  },
  {
    path: "/orders",
    icon: "ri-shopping-basket-line",
    display: "Orders",
  },
  {
    path: "/categories",
    icon: "ri-list-check",
    display: "Categories",
    childrens: [
      {
        display: "All Category",
        icon: "ri-list-check",
        path: "/categories",
      },
      {
        display: "New Category",
        icon: "ri-add-circle-line",
        path: "/new-category",
      },
    ],
  },
  {
    path: "/foods",
    icon: "ri-service-line",
    display: "Foods",
    childrens: [
      {
        display: "All Food",
        icon: "ri-service-line",
        path: "/foods",
      },
      {
        display: "New Food",
        icon: "ri-add-circle-line",
        path: "/new-food",
      },
    ],
  },
  {
    path: "/blogs",
    icon: "ri-pages-line",
    display: "Blogs",
    childrens: [
      {
        display: "All Blog",
        icon: "ri-pages-line",
        path: "blogs",
      },
      {
        display: "New Blog",
        icon: "ri-add-circle-line",
        path: "/new-blog",
      },
    ],
  },
  {
    path: "/delivery-men",
    icon: "ri-truck-line",
    display: "Delivery Men",
    childrens: [
      {
        path: "/delivery-men",
        icon: "ri-truck-line",
        display: "Delivery Men",
      },
      {
        display: "New Man",
        icon: "ri-add-circle-line",
        path: "/new-man",
      },
    ],
  },
  {
    path: "/customers",
    icon: "ri-map-pin-user-fill",
    display: "Customers",
  },
  {
    path: "/users",
    icon: "ri-team-line",
    display: "Users",
    childrens: [
      {
        display: "All User",
        icon: "ri-team-line",
        path: "/users",
      },
      {
        display: "New user",
        icon: "ri-add-circle-line",
        path: "/new-user",
      },
    ],
  },
  {
    path: "/profile",
    icon: "ri-settings-2-line",
    display: "Settings",
    childrens: [
      {
        display: "Profile",
        icon: "ri-user-line",
        path: "profile",
      },
      {
        display: "Informations",
        icon: "ri-edit-line",
        path: "/change-details",
      },
      {
        display: "Profile Picture",
        icon: "ri-account-circle-line",
        path: "/change-profile-pic",
      },
      {
        display: "Password",
        icon: "ri-lock-2-line",
        path: "/change-password",
      },
    ],
  },
];

export default navLinks;
