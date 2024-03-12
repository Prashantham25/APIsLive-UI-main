import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
// import Stack from "@mui/material/Stack";

import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import {
  useDataController,
  setLoginUserDetails,
  setChannelDetails,
} from "../../../BrokerPortal/context";
// import MenuItems from "../../Menus/MenuItems";
import Sidenav from "../Sidenav";
// import Footer from "layouts/authentication/components/Footer";
import Navbar from "../Navbar";
import Layout from "../MainLayout/PageLayout";
import { getRequest } from "../../../../core/clients/axiosclient";
import { SearchUserSettingDetails, GetUserByUserId } from "../../data";
import AllowedUrls from "../../data/AllowedUrls";
import MDSpeedDial from "../SpeedDial";

function PagesLayout(props) {
  const Theme = localStorage.getItem("REACT_APP_Theme");
  const [localThem, setLocalThem] = useState(
    Theme !== null && Theme !== undefined && Theme !== "" ? Theme : process.env.REACT_APP_Theme
  );

  const [MenuItemsL, setMenuItemsL] = useState([]);
  const [activeMenu, setActiveMenu] = useState({ parentKey: -1, childKey: -1 });
  const { children } = props;
  const [controller] = useMaterialUIController();
  const [, dispatch] = useDataController();
  const { miniSidenav, direction } = controller;
  const [rid, setRoleId] = useState("");
  const navigate = useNavigate();
  const [restrictionFlag, setRestrictionFlag] = useState(false);

  useEffect(async () => {
    // debugger
    const userId = localStorage.getItem("userId");
    const roleId = localStorage.getItem("roleId");

    const Menus = await getRequest(
      `Permission/GetPermissions?permissionType=Menu&userId=${userId}&roleId=${roleId}`
    );
    console.log("Menus", Menus);

    let arr = [];

    Object.keys(Menus.data).forEach((x, key) => {
      const basic = {
        type: "",
        name: "",
        key: "",
        icon: {},
        collapse: [],
        noCollapse: false,
        route: "",
      };

      basic.type = "collapse";
      // }
      basic.key = key;
      basic.name = Menus.data[key].itemDescription;
      basic.icon = <Icon fontSize="medium">{Menus.data[key].icon}</Icon>;
      basic.noCollapse = Menus.data[key].collapse === "false";
      basic.route = Menus.data[key].url;

      Object.keys(Menus.data[key].children).forEach((y, key1) => {
        basic.collapse.push({
          name: Menus.data[key].children[key1].itemDescription,
          key: key * 10 + key1,
          route: Menus.data[key].children[key1].url,
          parentKey: key,
          component: Menus.data[key].children[key1].component,
        });
      });

      console.log("basic", basic);
      arr = [...arr, { ...basic }];

      console.log("arr", arr);
      // }
    });

    setMenuItemsL([...MenuItemsL, ...arr]);

    await GetUserByUserId(userId).then(async (res) => {
      console.log("pageLayout res", res);
      if (res.data !== null && res.data?.userDetailsJson !== null) {
        setChannelDetails(dispatch, res.data.userDetailsJson);
      }
      await SearchUserSettingDetails("LandingPath", { Username: res.data.userName }).then(
        (res2) => {
          const tObj = res.data;
          tObj.displayName = `${tObj.firstName} ${tObj.lastName}`;
          tObj.LandingPath = res2.data.data.LandingPath;
          if (tObj?.branchName) {
            sessionStorage.setItem("BranchName", tObj.branchName);
          }

          setLoginUserDetails(dispatch, { ...tObj });
        }
      );
    });
  }, []);
  useEffect(async () => {
    // debugger
    const userId = localStorage.getItem("userId");
    if (userId === null) navigate(`/pages/login-page`);

    const Menus = await getRequest(
      `Permission/GetPermissions?permissionType=Menu&userId=${userId}&roleId=${
        rid || localStorage.getItem("roleId")
      }`
    );
    console.log("Menus", Menus);

    let arr = [];

    Object.keys(Menus.data).forEach((x, key) => {
      const basic = {
        type: "",
        name: "",
        key: "",
        icon: {},
        collapse: [],
        noCollapse: false,
        route: "",
      };

      basic.type = "collapse";
      basic.key = key;
      basic.name = Menus.data[key].itemDescription;
      basic.icon = <Icon fontSize="medium">{Menus.data[key].icon}</Icon>;
      basic.noCollapse = Menus.data[key].collapse === "false";
      basic.route = Menus.data[key].url;

      Object.keys(Menus.data[key].children).forEach((y, key1) => {
        basic.collapse.push({
          name: Menus.data[key].children[key1].itemDescription,
          key: key * 10 + key1,
          route: Menus.data[key].children[key1].url,
          parentKey: key,
          component: Menus.data[key].children[key1].component,
        });
      });

      console.log("basic", basic);
      arr = [...arr, { ...basic }];

      console.log("arr", arr);
      // }
    });

    setMenuItemsL([...MenuItemsL, ...arr]);
  }, [rid]);

  useEffect(async () => {
    console.log("MenuItemsL", MenuItemsL);
    let tRestriction = restrictionFlag;
    const lRestriction = localStorage.getItem("userRestrictionFlag");
    console.log(true, "lRestriction", lRestriction);
    if (lRestriction !== null) {
      if (lRestriction === "true") setRestrictionFlag(true);
      else setRestrictionFlag(false);
      tRestriction = lRestriction;
    }
    if (tRestriction === true || tRestriction === "true") {
      const eUrl = window.location.pathname;
      const UN = localStorage.getItem("userName");
      const loginuser = { Username: UN };
      const res = await SearchUserSettingDetails("LandingPath", loginuser);
      console.log("window.location.pathname", eUrl);
      if (MenuItemsL.length > 0) {
        let pathnameFlag = false;
        MenuItemsL.forEach((x1) => {
          x1.collapse.forEach((x2) => {
            if (res.data.data && res.data.data.LandingPath === eUrl) pathnameFlag = true;
            if (x2.url && x2.url === eUrl) pathnameFlag = true;
            if (x2.route && x2.route === eUrl) pathnameFlag = true;
          });
        });
        AllowedUrls.forEach((url) => {
          if (url === eUrl) pathnameFlag = true;
        });
        if (pathnameFlag === false) navigate(`/pages/login-page`);
      }
    }
  }, [MenuItemsL]);

  const handleGetMenuByRole = async (id) => {
    setRoleId(id);
    localStorage.setItem("roleId", id);

    setMenuItemsL([]);
  };
  return (
    <Layout>
      <Navbar
        handleGetMenuByRole={handleGetMenuByRole}
        setRestrictionFlag={setRestrictionFlag}
        restrictionFlag={restrictionFlag}
        setLocalThem={setLocalThem}
      />

      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          // position: "relative",
          // padding: "1%",
          mt: "4.2rem",
          [breakpoints.up("xl")]: {
            marginLeft: miniSidenav
              ? pxToRem(direction === "ltr" ? 120 : 0)
              : pxToRem(direction === "ltr" ? 274 : 0),
            marginRight: miniSidenav
              ? pxToRem(direction === "rtl" ? 120 : 0)
              : pxToRem(direction === "rtl" ? 274 : 0),
            transition: transitions.create(
              ["margin-left", "margin-right"],

              {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.standard,
              }
            ),
          },
        })}
      >
        {" "}
        <Sidenav
          brandName="APIsLive"
          routes={MenuItemsL}
          localThem={localThem}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />{" "}
        <Outlet>{children}</Outlet>
        {/* 
       
        <MDBox sx={{ width: "100%" }}>
          {" "}
        </MDBox> */}
      </MDBox>
      {process.env.React_APP_ShowSpeedDialButton === "true" && <MDSpeedDial />}

      {/* <Footer dark /> */}
    </Layout>
  );
}

export default PagesLayout;
