function MenuData() {
  return {
    MenuList: {
      CustMenu: [
        // { icon: "donut_large", name: "Insurance", route: "" },
        // { icon: "person", name: "About Us", route: "" },
        // { icon: "person", name: "Blogs", route: "" },
        // { icon: "person", name: "FAQ's", route: "" },
        // { icon: "person", name: "Claims", route: "" },
        // { icon: "person", name: "Contact Us", route: "" },
      ],
      POSPMenu: [
        //   { icon: "donut_large", name: "dashboard", route: "/dashboard" },
        //   { icon: "person", name: "training", route: "/profile" },
        //   { icon: "account_circle", name: "my customers", route: "/authentication/sign-up" },
        //   { icon: "key", name: "Refer earn", route: "/authentication/sign-in" },
        //   { icon: "key", name: "resources", route: "/authentication/sign-in" },
        {
          // icon: "person",
          name: "My Profile",
          route: "/modules/BrokerPortal/Pages/MyProfile",
        },
        {
          icon: "logout",
          name: "Logout",
          route: "/modules/BrokerPortal/Login/BPLogin",
        },
      ],
    },
  };
}

export default MenuData;
