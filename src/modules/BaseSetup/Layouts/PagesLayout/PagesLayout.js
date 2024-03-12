import React from "react";
import { Outlet } from "react-router-dom";
// import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
// import MenuItems from "../../Menus/MenuItems";
// import Sidenav from "../Sidenav";
// import Footer from "layouts/authentication/components/Footer";
import Navbar from "../Navbar";
import Layout from "../MainLayout/PageLayout";
// import { getRequest } from "../../../../core/clients/axiosclient";

function PagesLayout(props) {
  // const [MenuItemsL, setMenuItemsL] = useState([]);
  const { children } = props;
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  // const [arr,setArr]=useState([])
  // const [basic,setBasic]=useState({
  //   type: "",
  //   name: "",
  //   key: "",
  //   icon: {},
  //   collapse: [

  //   ],
  // })
  // const basicD={
  //   type: "",
  //   name: "",
  //   key: "",
  //   icon: {},
  //   collapse: [

  //   ],
  // }
  // useEffect(async () => {
  //   debugger;
  //   const Menus = await getRequest(
  //     `Permission/GetPermissions?permissionType=Menu&userId=5cc4e1cf-8361-40cd-85c0-a217a8bda0a6&roleId=CD8BF32D-110E-45B5-9ECF-5522541A71D2`
  //   );
  //   console.log("Menus", Menus);
  //   var arr = [];
  //   {
  //     Menus.data.map((x, key) => {
  //       const basic = {
  //         type: "",
  //         name: "",
  //         key: "",
  //         icon: {},
  //         collapse: [],
  //       };
  //       // setBasic(basicD)

  //       // if(Menus.data[key].permissionId===14){
  //       // if(Menus.data[key].collapse==="true"){
  //       basic.type = "collapse";
  //       // }
  //       basic.key = Menus.data[key].itemDescription;
  //       basic.name = Menus.data[key].itemDescription;
  //       basic.icon = <Icon fontSize="medium">{Menus.data[key].icon}</Icon>;
  //       {
  //         Menus.data[key].children.map((y, key1) => {
  //           basic.collapse.push({
  //             name: Menus.data[key].children[key1].itemDescription,
  //             key: Menus.data[key].children[key1].label,
  //             route: Menus.data[key].children[key1].url,
  //             component: Menus.data[key].children[key1].component,
  //           });
  //         });
  //       }
  //       console.log("basic", basic);
  //       arr = [...arr, { ...basic }];
  //       // setArr([...arr,...basic])
  //       console.log("arr", arr);
  //       // }
  //     });
  //   }
  //   // console.log("Menu Items",MenuItems)
  //   setMenuItemsL([...MenuItemsL, ...arr]);
  // }, []);
  // useEffect(() => {
  //   console.log("MenuItemsL", MenuItemsL);
  // }, [MenuItemsL]);
  // useEffect(()=>{

  //   console.log("basic clear",basic);

  // },[basic])
  return (
    <Layout>
      <Navbar />
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          position: "relative",
          padding: "1%",
          mt: "4.2rem",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <MDBox sx={{ width: "150px" }}>
          {/* <Sidenav brandName="APIsLive" routes={MenuItemsL} /> */}
        </MDBox>
        <MDBox sx={{ width: "100%" }}>
          <Outlet>{children}</Outlet>
        </MDBox>
      </MDBox>
      {/* <Footer dark /> */}
    </Layout>
  );
}

export default PagesLayout;
