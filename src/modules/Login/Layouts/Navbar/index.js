import React, { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useMsal } from "@azure/msal-react";
// @mui material components
// import Container from "@mui/material/Container";
import {
  Card,
  Icon,
  IconButton,
  MenuItem,
  Menu,
  Grid,
  Switch,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components
import { useMaterialUIController, setMiniSidenav } from "context";

import breakpoints from "assets/theme/base/breakpoints";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import mglogo from "assets/images/logos/iNube-small.png";

// import mglogo from "assets/images/BrokerPortal/CompanyLogos/MutualGlobalLogo.png";

// import mglogo from "assets/images/BrokerPortal/CompanyLogos/ChiragLogo.png";

import PLNavbarLink from "modules/PolicyLive/Layouts/PLNavbar/PLNavbarLink";
// import PLNavbarMobile from "modules/PolicyLive/Layouts/PLNavbar/PLNavbarMobile";
import MenuData from "modules/PolicyLive/Layouts/PLNavbar/data";
import { images, setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import { getRequest } from "../../../../core/clients/axiosclient";
import Transition from "../../../../components/Translation";
import AxisBank from "../../../../assets/images/logos/AxisBankLogo.png";
import IDBIBankLogo from "../../../../assets/images/logos/IDBIBankLogo.png";

// Material Dashboard 2 PRO React base styles

// Material Dashboard 2 PRO React context

function Configurator({ handleConfiguratorClose, setLocalThem }) {
  const logoOptions = [
    "iNubeLogo",
    "SBIGeneral",
    "Rsa",
    "HDFCErgoLogo",
    "USGILogo",
    "NepalLogo",
    "MagmaLogo",
    "ProtectiveMILogo",
    "LICLogo",
    "DhofarLogo",
    "AmanaTakafulLogo",
    "HDFCLifeLogo",
    "LibertyLogo",
    "PramericaLogo",
    "NivaBupaLogo",
    "ArabiaFalconLogo",
    "TakafulOmanLogo",
  ];

  const [, dispatch] = useDataController();
  const handleClick = (event) => {
    console.log("event ID", event.target.id);
    if (event.target.id === "ProtectiveMILogo") {
      localStorage.setItem("NepalCompanySelect", "ProtectiveMIC");
    }
    if (event.target.id === "NepalLogo") {
      localStorage.setItem("NepalCompanySelect", "NepalMIC");
    }
    localStorage.setItem("REACT_APP_Theme", event.target.id);
    setLocalThem(event.target.id);
    setLogo(dispatch, event.target.id);
    setCustTheme(dispatch, event.target.id);
    handleConfiguratorClose();
    window.location.reload();
  };
  return (
    <MDBox
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      p={6}
      sx={{ overflowY: "scroll" }}
    >
      <Card>
        <MDBox width="100%" display="flex" justifyContent="end" p={2}>
          <Icon
            onClick={handleConfiguratorClose}
            sx={{ color: "#000000", fontSize: "2rem!important" }}
          >
            close
          </Icon>
        </MDBox>
        <MDTypography sx={{ textAlign: "center" }}>Choose the logo</MDTypography>
        <MDBox
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <Grid container spacing={2} p={2}>
            {logoOptions.map((logo) => (
              <Grid item xs={12} sm={12} md={4} lg={3} xl={2} xxl={2}>
                <MDBox
                  component="img"
                  id={logo}
                  src={images[logo]}
                  onClick={handleClick}
                  m={2}
                  sx={{ maxHeight: "2.2rem" }}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

function PLNavbar({
  transparent,
  light,
  action,
  handleGetMenuByRole,
  restrictionFlag,
  setRestrictionFlag,
  setLocalThem,
}) {
  const { instance } = useMsal();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, darkMode } = controller;

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  // const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  // const closeMobileNavbar = () => setMobileNavbar(false);

  const [controller1, dispatch1] = useDataController();
  const { logo, loginUserDetails } = controller1;
  const handleConfiguratorOpen = () => setConfiguratorOpen(true);
  const handleConfiguratorClose = () => setConfiguratorOpen(false);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [roles, setRoles] = useState([]);
  // const Navigate = useNavigate();

  useEffect(() => {
    console.log("123", process.env.REACT_APP_IsEnvId, miniSidenav, darkMode);
    console.log(mobileNavbar, mobileView);
    if (process.env.REACT_APP_IsEnvId === "false") {
      setMiniSidenav(dispatch, true);
      setCustTheme(dispatch1, process.env.REACT_APP_Theme);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  const handleNavigate = () => {
    if (localStorage.getItem("loginProvider") !== "LDAP") {
      localStorage.clear();
      window.open(process.env.REACT_APP_CustomerHomePageURL, "_self");
      // Navigate(`pages/login-page`);
    } else {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  const onLogoClick = () => {
    window.open(process.env.REACT_APP_HOMEURL, "_self");
  };

  useEffect(async () => {
    const userId = localStorage.getItem("userId");

    const Roles = await getRequest(`Role/GetAllUserRoles/${userId}`);
    console.log("UserRoles", Roles);
    if (Roles.status === 200) {
      localStorage.setItem("roleId", Roles.data[0].mdata[0].mID);
      Object.keys(Roles.data[0].mdata).forEach((i, keyi) => {
        roles.push({
          mID: Roles.data[0].mdata[keyi].mID,
          mValue: Roles.data[0].mdata[keyi].mValue,
        });
      });
      setRoles(roles);
    }
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      // if (transparentNavbar && !light) {
      if (!light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const onRestrictChange = (e) => {
    setRestrictionFlag(e.target.checked);
    localStorage.setItem("userRestrictionFlag", e.target.checked);
  };

  const onMenuClick = (id) => {
    handleGetMenuByRole(id);
    handleClose();
  };

  return (
    <>
      <MDBox
        py={0.5}
        // px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        px={0.5}
        // my={3}
        // mx={3}
        // width="calc(100% - 48px)"
        width="100%"
        // borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        // left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <Stack direction="row">
          {" "}
          {process.env.REACT_APP_EnvId === "1" || process.env.REACT_APP_EnvId === "297" ? (
            <MDBox display="flex">
              <MDBox
                component="img"
                src={logo}
                sx={{ maxHeight: "3.5rem" }}
                onClick={onLogoClick}
              />
              {localStorage.getItem("userId") === "fc1e417c-1a24-40f5-bb89-298683a0868e" && (
                <MDBox
                  component="img"
                  src={AxisBank}
                  sx={{ maxHeight: "3.5rem" }}
                  ml={1}
                  // onClick={onLogoClick}
                />
              )}
              {localStorage.getItem("userId") === "c95e261b-734d-48b9-b75d-65bc6d0bfffb" && (
                <MDBox
                  component="img"
                  src={IDBIBankLogo}
                  sx={{ maxHeight: "3.5rem" }}
                  ml={1}
                  // onClick={onLogoClick}
                />
              )}
            </MDBox>
          ) : (
            <MDBox
              component={Link}
              display="flex"
              flexDirection="column"
              to={loginUserDetails.LandingPath ? loginUserDetails.LandingPath : "/pages/login-page"}
            >
              <MDBox component="img" src={logo} sx={{ maxHeight: "3.5rem" }} />
            </MDBox>
          )}
          <IconButton onClick={handleMiniSidenav}>
            <Icon sx={iconsStyle}>{miniSidenav ? "menu_open" : "menu"}</Icon>
          </IconButton>
        </Stack>

        <MDBox
          color="inherit"
          justifyContent="flex-end"
          display={{ xs: "flex", lg: "flex" }}
          m={0}
          p={0}
        >
          {process.env.React_APP_ShowThemeSelectionButton === "true" && (
            <>
              {false && (
                <Tooltip title="User Permission Restriction">
                  <Switch checked={restrictionFlag} onChange={onRestrictChange} />
                </Tooltip>
              )}
              <IconButton onClick={handleConfiguratorOpen}>
                <Icon>settings</Icon>
              </IconButton>
            </>
          )}
          {/* Icon for Switching roles */}
          {process.env.REACT_APP_SwitchRoleEnable === "true" && (
            <>
              <IconButton onClick={handleMenu1}>
                <SwitchAccountIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl1)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleNavigate}>Roles</MenuItem> */}
                {roles.map((a, keya) => (
                  <MenuItem onClick={() => onMenuClick(roles[keya].mID)}>
                    {roles[keya].mValue}
                  </MenuItem>
                ))}
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              </Menu>
            </>
          )}

          {process.env.React_APP_ShowLanguageSelectionButton === "true" && <Transition />}
          <IconButton
            // size="medium"
            onClick={handleMenu}
            // color="inherit"
          >
            {false && <AccountCircle />}
            <Avatar
              alt={localStorage.getItem("firstName") ? localStorage.getItem("firstName")[0] : "A"}
              src={`data:image/png;base64, ${localStorage.getItem("profilePicture")}`}
              sx={{ width: 30, height: 30, border: "1px solid #858585" }}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MDTypography variant="h6">
              {loginUserDetails.displayName ? loginUserDetails.displayName : ""}
            </MDTypography>
            <MenuItem onClick={handleNavigate}>
              <MDTypography variant="h6">Log Out</MDTypography>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          </Menu>
          {process.env.REACT_APP_EnvId === "633" && (
            <MDBox sx={{ display: "flex", flex: "none", mt: "10px" }}>
              <MDTypography fontSize="12px">
                <strong>{loginUserDetails.displayName ? loginUserDetails.displayName : ""}</strong>
              </MDTypography>
            </MDBox>
          )}
          <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
            <Configurator
              handleConfiguratorClose={handleConfiguratorClose}
              setLocalThem={setLocalThem}
            />
          </Modal>
          {/* logout code */}
          {action && action.type === "internal"
            ? MenuData().MenuList.POSPMenu.map((item) => (
                <PLNavbarLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                  light={light}
                />
              ))
            : MenuData().MenuList.CustMenu.map((item) => (
                <PLNavbarLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  route={item.route}
                  light={light}
                />
              ))}
        </MDBox>

        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </MDButton>
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </MDButton>
            </MDBox>
          ))}

        {/* <MDBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </MDBox> */}
      </MDBox>
      {/* {mobileView && <PLNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />} */}
    </>
  );
}

// Setting default values for the props of DefaultNavbar
PLNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
PLNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default PLNavbar;
