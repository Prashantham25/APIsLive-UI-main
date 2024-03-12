import { useEffect } from "react";

// react-router-dom components
import { NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import sidebar from "assets/images/sidebar-3.jpg";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setAzureSidenav,
} from "context";

// Material Dashboard 2 React example components
import SidenavCollapse from "./SidenavCollapse";
import SidenavList from "./SidenavList";
import SidenavItem from "./SidenavItem";
import SidenavRoot from "./SidenavRoot";

import { useDataController } from "../../../BrokerPortal/context";

// Custom styles for the Sidenav

function Sidenav({
  localThem,
  color,
  brand,
  brandName,
  routes,
  activeMenu,
  setActiveMenu,
  ...rest
}) {
  const [controller1] = useDataController();
  const { custTheme, logo } = controller1;
  // const [openCollapse, setOpenCollapse] = useState(false); //
  // const [openNestedCollapse, setOpenNestedCollapse] = useState(false); //
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, azureSidenav, darkMode, direction } =
    controller;
  // const location = useLocation();
  // const { pathname } = location;
  // const collapseName = pathname.split("/").slice(1)[0];
  // const items = pathname.split("/").slice(1);
  // const itemParentName = items[1];
  // const itemName = items[items.length - 1];

  console.log("activeMenu", activeMenu);
  // const lRoutes = [
  //   {
  //     type: "collapse",
  //     name: "Test Item",
  //     noCollapse: true,
  //     route: "/ProductConfig/ProductSearch1",
  //     key: "TestCollapse",
  //     icon: "key",
  //     collapse: [
  //       {
  //         name: "Test Item",
  //         route: "/ProductConfig/ProductSearch",
  //         key: "TestCollapse1",
  //         icon: "key",
  //         component: "ProductSearch",
  //       },
  //     ],
  //   },
  // ];

  // console.log("Testing", routes);

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  console.log("122132", custTheme, logo);
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  // useEffect(() => {
  //   setOpenCollapse(collapseName);
  //   setOpenNestedCollapse(itemParentName);
  // }, []);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
      setAzureSidenav(dispatch, window.innerWidth < 1200 ? false : azureSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);

  const handleClick = (name) => {
    console.log("hit", name);
    localStorage.setItem("DemoProduct", name);
  };
  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, parentKey, href }) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem
            name={name}
            active={activeMenu.parentKey === parentKey && activeMenu.childKey === key}
            nested
          />
        </NavLink>
      )
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key, parentKey }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            // active={key === itemParentName ? "isParent" : false}
            active={activeMenu.parentKey === parentKey && activeMenu.childKey === key}
            open={activeMenu.childKey === key}
            // onClick={({ currentTarget }) =>
            //   openNestedCollapse === key && currentTarget.classList.contains("MuiListItem-root")
            //     ? setOpenNestedCollapse(false)
            //     : setOpenNestedCollapse(key)
            // }
            onClick={() => setActiveMenu({ parentKey, childKey: key })}
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem
              color={color}
              name={name}
              active={activeMenu.parentKey === parentKey && activeMenu.childKey === key}
              // onClick={() => handleClick(name)}
              onClick={() => {
                setActiveMenu({ parentKey, childKey: key });
                handleClick(name);
              }}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem
              color={color}
              name={name}
              active={activeMenu.parentKey === parentKey && activeMenu.childKey === key}
              // onClick={() => handleClick(name)}
              onClick={() => {
                setActiveMenu({ parentKey, childKey: key });
                handleClick(name);
              }}
            />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === activeMenu.parentKey}
                noCollapse={noCollapse}
              />{" "}
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                open={activeMenu.parentKey === key}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <MDBox key={key}>
              {key !== 0 && (
                <Divider
                  sx={{ margin: 0 }}
                  light={
                    (!darkMode && !whiteSidenav && !transparentSidenav) ||
                    (darkMode && !transparentSidenav && whiteSidenav)
                  }
                />
              )}
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                active={activeMenu.parentKey === key}
                open={activeMenu.parentKey === key}
                onClick={() =>
                  activeMenu.parentKey === key
                    ? setActiveMenu({ ...activeMenu, parentKey: -1 })
                    : setActiveMenu({ ...activeMenu, parentKey: key })
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </MDBox>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      anchor={direction === "rtl" ? "right" : "left"}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, azureSidenav, miniSidenav, darkMode }}
    >
      {/* <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      /> */}
      {false && (
        <MDBox
          display={{ xs: "block", xl: "none" }}
          // position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h1">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
      )}
      <MDBox sx={{ maxWidth: "100%" }}>
        {localThem === "iNubeLogo" ? (
          <MDBox xs={{ width: "100%", height: "100%", bgcolor: "#212121" }}>
            <div
              style={{
                backgroundImage: `url(${sidebar})`,
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                // position: "absolute",
                width: "100%",
                backgroundPosition: "center",
                // filter: "blur(5px)",
              }}
            >
              <List>{renderRoutes}</List>
              <MDBox sx={{ mb: 4 }} />
            </div>
          </MDBox>
        ) : (
          <MDBox>
            <List>{renderRoutes}</List>
            <MDBox sx={{ mb: 4 }} />
          </MDBox>
        )}
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
