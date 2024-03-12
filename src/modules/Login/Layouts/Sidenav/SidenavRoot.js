// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useMaterialUIController } from "../../../../context";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { transparentSidenav, whiteSidenav, azureSidenav, miniSidenav, darkMode } = ownerState;
  const [controller] = useMaterialUIController();
  const { direction } = controller;
  const sidebarWidth = 250;
  const { transparent, gradients, white, azure, background } = palette;
  const { xxl } = boxShadows;
  const { pxToRem, linearGradient } = functions;

  let backgroundValue = darkMode
    ? background.sidenav
    : linearGradient(gradients.azure.main, gradients.azure.state);

  if (transparentSidenav) {
    backgroundValue = transparent.main;
  } else if (whiteSidenav) {
    backgroundValue = white.main;
  } else if (azureSidenav) {
    backgroundValue = azure.main;
  }

  backgroundValue = linearGradient(gradients.azure.main, gradients.azure.state);

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    background: backgroundValue,
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      boxShadow: transparentSidenav ? "none" : xxl,
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    background: backgroundValue,
    transform: `translateX(${pxToRem(direction === "ltr" ? -320 : 320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      boxShadow: transparentSidenav ? "none" : xxl,
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: pxToRem(96),
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),
    },
  });

  return {
    "& .MuiDrawer-paper": {
      marginTop: "4rem",
      marginLeft: "0rem",
      marginRight: "0rem",
      boxShadow: xxl,
      border: "none",
      borderRadius: 0,
      overflowX: "hidden",
      overflowY: "hidden",
      "&:hover": {
        overflowY: "auto",
      },
      "&::-webkit-scrollbar": {
        display: "none",
      },
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
