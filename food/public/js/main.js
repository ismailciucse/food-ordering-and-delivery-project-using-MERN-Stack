// Menu JS
// $(function () {
//   $(window).scroll(function () {
//     if ($(this).scrollTop() < 50) {
//       $("nav").removeClass("site-top-nav");
//     } else {
//       $("nav").addClass("site-top-nav");
//     }
//   });
// });

// Main Menu JS
// $(function () {
//   $("#shopping-cart").on("click", function () {
//     $("#customer-profile-content").hide("blind", "", 100);
//     $("#cart-content").toggle("blind", "", 500);
//   });
//   $("#customer-profile-pic").on("click", function () {
//     $("#cart-content").hide("blind", "", 100);
//     $("#customer-profile-content").toggle("blind", "", 200);
//   });
//   $("#shopping-cart-mobile").on("click", function () {
//     $("#customer-profile-content-mobile").hide("blind", "", 100);
//     $("#cart-content-mobile").toggle("blind", "", 500);
//   });
//   $("#customer-profile-pic-mobile").on("click", function () {
//     $("#cart-content-mobile").hide("blind", "", 100);
//     $("#customer-profile-content-mobile").toggle("blind", "", 200);
//   });
//   $("#confirm-order-btn").on("click", function () {
//     $("#cart-content").hide("blind", "", 500);
//   });
//   $("#customer-profile-content li a").on("click", function () {
//     $("#customer-profile-content").hide("blind", "", 500);
//   });
// });

//Mean Menu
$(function () {
  $("#mobile-menu-bar").on("click", function () {
    $("#mobileNav").toggle("blind", "", 500);
  });
});

// Back-To-Top Button JS
// $(function () {
//   $("#back-to-top").click(function (event) {
//     event.preventDefault();
//     $("html, body").animate(
//       {
//         scrollTop: 0,
//       },
//       1000
//     );
//   });
// });

// Show Hide Button
// $(function () {
//   $(window).scroll(function () {
//     if ($(this).scrollTop() < 50) {
//       $("#back-to-top").fadeOut();
//     } else {
//       $("#back-to-top").fadeIn();
//     }
//   });
// });

// Sidebar
// $(function () {
//   $(".sidebar-items").accordion({
//     collapsible: true,
//     heightStyle: "content",
//     icons: false,
//   });
// });
