import { useEffect, useState } from "react";
import { Drawer, IconButton, ListItemText, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import MDBox from "../../../../components/MDBox";
// import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";

import WhatsappIntegration from "./WhatsappIntegration";
import PWA from "./PWA";
import Transliteration from "./Transliteration";
import SkeltonLoader from "./SkeltonLoader";
import Charts from "./Charts";
// import DynamicPageConfigurator from "./DynamicPageConfigurator";
import DynamicDataGridXL from "./DynamicDataGridXL";
import QuoteList from "./QuoteList";
// import CustomTreeView from "./CustomTreeView";
import Components from "./Components";
import FormBasedRedirection from "./FormBasedRedirection";
import AllPaymentMethods from "./AllPaymentMethods";
import NepalBPCBulkUpload from "./BulkUpload/NepalBPCBulkUpload";
import CoBrowsing from "./CoBrowsing/inedx";
import ColorsSetting from "../../../../assets/themes/BrokerPortal/ColorsSetting";
import DocuSign from "./DocuSign";
import ImageProcessing from "./ImageProcessing";
import SplitFormFilling from "./SplitFormFilling";
import MSPAllocation from "./MSPAllocation";
import MDInput from "../../../../components/MDInput";
import UpdateOTPStamp from "./UpdateOTPStamp";
import PIVC from "./PIVC";
import GenericMailTrigger from "./GenericMailTrigger";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: ColorsSetting().primary.main,
  color: "white",

  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function RND() {
  // const [menuFlag, setMenuFlag] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState("");
  const [accessId, setAccessId] = useState("");

  useEffect(() => {
    setAccessId(localStorage.getItem("rnd_accessid"));
  }, []);

  const onAccessId = (e) => {
    localStorage.setItem("rnd_accessid", e.target.value);
    setAccessId(e.target.value);
  };

  const RnDPagesData = [
    { name: "WhatsApp", icon: "whatshot", page: <WhatsappIntegration /> },
    { name: "PWA", icon: "install_mobile", page: <PWA /> },
    { name: "Transliteration", icon: "translate", page: <Transliteration /> },
    { name: "Skelton Loader", icon: "refresh", page: <SkeltonLoader /> },
    { name: "Data Visual", icon: "signal_cellular_alt", page: <Charts /> },
    // { name: "Page Config", icon: <NoteAddIcon />, page: <DynamicPageConfigurator /> },
    { name: "XL to Grid", icon: "grid_on", page: <DynamicDataGridXL /> },
    { name: "Bulk Upload", icon: "fact_check", page: <NepalBPCBulkUpload /> },
    { name: "Quote List", icon: "view_list", page: <QuoteList /> },
    { name: "Components", icon: "toggle_on", page: <Components /> },
    { name: "Redirection", icon: "arrow_outward", page: <FormBasedRedirection /> },
    { name: "Payments", icon: "account_balance", page: <AllPaymentMethods /> },
    { name: "Co-Browsing", icon: "cast", page: <CoBrowsing /> },
    { name: "DocuSign", icon: "edit", page: <DocuSign /> },
    { name: "Image Processing", icon: "image", page: <ImageProcessing /> },
    { name: "Form Filling", icon: "vertical_split", page: <SplitFormFilling /> },
    { name: "MSP Allocation", icon: "medical_services", page: <MSPAllocation /> },
    { name: "OTP Stamp", icon: "approval", page: <UpdateOTPStamp /> },
    { name: "PIVC", icon: "videocam", page: <PIVC /> },
    { name: "Generic Mail", icon: "mail", page: <GenericMailTrigger /> },
  ];

  const onBtnClick = (x) => {
    setName(x.name);
    setPage(x.page);
    // setMenuFlag(false);
    localStorage.setItem("RND_Page", x.name);
  };
  useEffect(() => {
    try {
      const rp = localStorage.getItem("RND_Page");
      if (rp !== null && rp !== "" && rp !== undefined) {
        setName(rp);
        setPage(RnDPagesData.filter((x) => x.name === rp)[0].page);
      } else {
        setName("WhatsApp Integration");
        setPage(<WhatsappIntegration />);
      }
    } catch {
      //
    }
  }, []);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MDBox>
      {accessId === "inube@2024" ? (
        <MDBox sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              {open ? (
                <IconButton color="inherit" onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <MDTypography color="white" variant="h6" noWrap component="div">
                {name}
              </MDTypography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                // boxSizing: "border-box",
                borderRadius: "0rem",
                margin: "0rem",
                bgcolor: open ? ColorsSetting().coloredShadows.light : "#ffffff",
                height: "100%",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <List>
              {RnDPagesData.map((item) => (
                <ListItem
                  key={item.name}
                  disablePadding
                  sx={{
                    bgcolor:
                      item.name === name
                        ? ColorsSetting().coloredShadows.info
                        : ColorsSetting().coloredShadows.light,
                  }}
                >
                  <ListItemButton onClick={() => onBtnClick(item)}>
                    {/* <ListItemIcon> */}
                    <IconButton>
                      <Icon>{item.icon}</Icon>
                    </IconButton>
                    {/* </ListItemIcon> */}
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            {page}
          </Main>
        </MDBox>
      ) : (
        <MDBox sx={{ display: "flex", justifyContent: "center" }} width="100vw" mt={20}>
          <MDBox width={250}>
            <MDInput
              label="Enter Access ID"
              type="password"
              value={accessId}
              onChange={onAccessId}
            />
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}
export default RND;
