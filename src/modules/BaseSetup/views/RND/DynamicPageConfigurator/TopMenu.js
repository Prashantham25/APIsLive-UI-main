import { useEffect, useState } from "react";
import {
  Stack,
  MenuItem,
  Fade,
  Menu,
  Switch,
  Autocomplete,
  Icon,
  IconButton,
  // Paper,
  Toolbar,
  Tooltip,
  Badge,
  Snackbar,
  Alert,
} from "@mui/material";
import swal from "sweetalert";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
// import MDBox from "components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { autoStyle } from "./data";
import logo from "../../../../../assets/images/icons/logo192.png";
import MDBox from "../../../../../components/MDBox";
import "./style.css";

export default function TopMenu({
  onUploadExcel,
  onDownloadArr,
  productList,
  productData,
  setProductData,
  onProductSelection,
  onSavePage,
  windowFlag,
  setWindowFlag,
  setStepsArr,
  setAccordionArr,
  setComponentArr,
  setButtonArr,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cMenu, setCMenu] = useState("");
  const [autoSaveProp, setAutoSaveProp] = useState({ color: "#ffffff", count: 0 });
  const [alertFlag, setAlertFlag] = useState(false);

  useEffect(() => {
    if (windowFlag.autoSave === true)
      setTimeout(() => {
        if (autoSaveProp.count % 2 === 0) autoSaveProp.color = "#e53935";
        else autoSaveProp.color = "#ffffff";
        autoSaveProp.count += 1;
        setAutoSaveProp({ ...autoSaveProp });
      }, 1000);
    else {
      autoSaveProp.color = "#ffffff";
      setAutoSaveProp(autoSaveProp);
    }
    console.log("autoSaveProp", autoSaveProp.count);
  }, [windowFlag.autoSave, autoSaveProp]);

  useEffect(() => {
    setAlertFlag(true);
  }, [windowFlag.autoSave]);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const onProductChange = (e) => {
    const lObj = productData;
    lObj.productCode = e.target.value;
    setProductData({ ...lObj });
  };

  const File = [
    { label: "New", icon: "note_add" },
    {
      label: "Open",
      icon: "folder_open",
      type: "AutoComplete",
      options: productList,
      value: productData.productCode,
      typeLabel: "Select Product",
      onChange: onProductSelection,
    },
    {
      label: "Save",
      icon: "save",
      type: "Input",
      typeLabel: "Product Code",
      value: productData.productCode,
      onChange: onProductChange,
    },
    { label: "Save As", icon: "save_as", type: "Input", typeLabel: "New Product Code", value: "" },

    {
      label: "Auto Save",
      icon: "published_with_changes",
      switch: true,
      name: "autoSave",
      checked: windowFlag.autoSave,
      onChange: setWindowFlag,
      tooltip: "Auto save at every 10 min",
    },
    { label: "Exit", icon: "exit_to_app" },
  ];
  const Edit = [
    {
      label: "Modify",
      icon: "edit_square",
      switch: true,
      name: "modify",
      checked: windowFlag.modify,
      onChange: setWindowFlag,
    },
    { label: "Download Excel", icon: "download" },
    { label: "Upload Excel", icon: "upload", inputType: "file" },
  ];
  const Help = [
    { label: "Download Excel Template", icon: "view_list" },
    { label: "Download Manual", icon: "library_books" },
  ];
  const View = [
    {
      label: "Preview Window",
      icon: "visibility",
      switch: true,
      name: "preview",
      checked: windowFlag.preview,
      onChange: setWindowFlag,
    },
    {
      label: "Screen Config Window",
      icon: "dvr",
      switch: true,
      name: "screenConfig",
      checked: windowFlag.screenConfig,
      onChange: setWindowFlag,
    },
    {
      label: "On Page Load Window",
      icon: "input",
      switch: true,
      name: "pageLoad",
      checked: windowFlag.pageLoad,
      onChange: setWindowFlag,
    },
    {
      label: "onClick Function Window",
      icon: "settings",
      switch: true,
      name: "onClick",
      checked: windowFlag.onClick,
      onChange: setWindowFlag,
    },
    {
      label: "Navigation Controls Window",
      icon: "swipe_vertical",
      switch: true,
      name: "onProceed",
      checked: windowFlag.onProceed,
      onChange: setWindowFlag,
    },
  ];
  const Settings = [
    { label: "Company Theme", icon: "apartment" },
    { label: "Product History", icon: "history" },
  ];

  const minMenu = [
    // { icon: "save", tooltip: "Save" },
    // { icon: "edit", tooltip: "Edit Controls" },
    {
      icon: "visibility",
      tooltip: "Preview Window",
      name: "preview",
    },
    {
      icon: "dvr",
      tooltip: "Screen config Window",
      name: "screenConfig",
    },
    {
      icon: "input",
      tooltip: "On Page Load Window",
      name: "pageLoad",
    },
    {
      icon: "settings",
      tooltip: "Function Window",
      name: "onClick",
    },
    {
      icon: "swipe_vertical",
      tooltip: "Navigation Control window",
      name: "onProceed",
    },
  ];

  const menuList = ["File", "Edit", "View", "Help"];
  const subMenuList = { File, Edit, Help, View, Settings };

  const handleClick = (event, name) => {
    console.log("name", name);
    setCMenu(name);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuClick = (x, e) => {
    if (x === "Upload Excel") onUploadExcel(e);
    if (x === "Download Excel") onDownloadArr();
    if (x === "Save") {
      if (productData.productCode === "")
        swal({ icon: "warning", text: "Please Enter Product Code" });
      else onSavePage();
    }
    if (x === "New") {
      setComponentArr([]);
      setAccordionArr([]);
      setStepsArr([]);
      setButtonArr([]);
      setProductData({ productCode: "", productDetails: { screenId: 0 } });
    }
    if (x === "Exit") navigate("/pages/login-page");
    // handleClose();
  };

  return (
    <Toolbar sx={{ display: "flex", width: "100vw" }}>
      <Stack direction="row" p={1}>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={`Screen ID - ${productData?.productDetails?.screenId}\nProduct Code - ${productData?.productCode}`
            .split("\n")
            .map((x) => (
              <p>{x}</p>
            ))}
        >
          <img width="20rem" src={logo} alt="logo" />
        </Tooltip>
        {menuList.map((x) => (
          <MDButton
            id="leftSlide"
            color="inherit"
            onClick={(e) => handleClick(e, x)}
            variant="text"
            // onMouseEnter={(e) => handleClick(e, x)}

            // onMouseLeave={() => setAnchorEl(null)}
          >
            {x}
          </MDButton>
        ))}
      </Stack>
      {minMenu.map((x) => (
        <Tooltip title={x.tooltip}>
          <IconButton
            onClick={() => setWindowFlag({ ...windowFlag, [x.name]: !windowFlag[x.name] })}
          >
            <Icon
              sx={{
                color: windowFlag[x.name] ? "#f5f5f5" : "#616161",
                transition: "transform 0.5s",
                "&:hover": {
                  transform: "scaleX(-1)",
                  cursor: "pointer",
                },
              }}
            >
              {x.icon}
            </Icon>
          </IconButton>
        </Tooltip>
      ))}

      <MDBox sx={{ display: "flex", width: "100%", justifyContent: "right" }} id="rightSlide">
        <Stack direction="row" spacing={0}>
          <Tooltip title={`Auto save ${windowFlag.autoSave ? "on" : "off"}`}>
            <IconButton>
              <Icon sx={{ color: autoSaveProp.color }}>published_with_changes</Icon>
            </IconButton>
          </Tooltip>

          {/* <Tooltip title={`${localStorage.getItem("REACT_APP_Theme")} Theme`}>
            <IconButton>
              <Icon sx={{ color: "#ffffff" }}>apartment</Icon>
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Announcements">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Icon sx={{ color: "#ffffff" }}>notifications</Icon>
              </Badge>
            </IconButton>
          </Tooltip>
          {/* <IconButton title="Product History">
            <Icon sx={{ color: "#ffffff" }}>history</Icon>
          </IconButton> */}
          <IconButton title="prashantha.m@inubeolutions.com">
            <Icon sx={{ color: "#ffffff" }}>account_circle</Icon>
          </IconButton>
          <IconButton onClick={(e) => handleClick(e, "Settings")}>
            <Icon sx={{ color: "#ffffff" }}>settings</Icon>
          </IconButton>
        </Stack>
      </MDBox>
      {[...menuList, "Settings"].map((x1) => (
        <Menu
          elevation={20}
          anchorEl={anchorEl}
          open={open && cMenu === x1}
          onClose={handleClose}
          TransitionComponent={Fade}
          sx={{ marginTop: 2 }}
          // onMouseLeave={() => setAnchorEl(null)}
        >
          {subMenuList?.[x1]?.map((x2) => (
            <Stack direction="row" spacing={1}>
              <IconButton>
                <Icon>{x2.icon}</Icon>
              </IconButton>
              {!x2.inputType && (
                <MenuItem onClick={() => onMenuClick(x2.label)}>{x2.label}</MenuItem>
              )}
              {x2.switch && x2.switch === true && (
                <MDBox>
                  {x2.tooltip ? (
                    <Tooltip title={x2.tooltip}>
                      <Switch
                        checked={x2.checked}
                        onChange={() => x2.onChange({ ...windowFlag, [x2.name]: !x2.checked })}
                      />
                    </Tooltip>
                  ) : (
                    <Switch
                      checked={x2.checked}
                      onChange={() => x2.onChange({ ...windowFlag, [x2.name]: !x2.checked })}
                    />
                  )}
                </MDBox>
              )}

              {x2.inputType && x2.inputType === "file" && (
                <MenuItem component="label">
                  <input
                    hidden
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => onMenuClick(x2.label, e)}
                  />
                  {x2.label}
                </MenuItem>
              )}

              {x2.type === "AutoComplete" && (
                <Autocomplete
                  fullWidth
                  options={Array.isArray(x2.options) ? x2.options : []}
                  sx={{ ...autoStyle, width: "300px" }}
                  onChange={x2.onChange}
                  value={{ productCode: x2.value }}
                  getOptionLabel={(option) => option.productCode}
                  renderInput={(params) => (
                    <MDInput {...params} label={x2.typeLabel} variant="standard" />
                  )}
                />
              )}
              {x2.type === "Input" && (
                <MDInput
                  label={x2.typeLabel}
                  value={x2.value}
                  variant="standard"
                  onChange={x2.onChange}
                />
              )}
            </Stack>
          ))}
        </Menu>
      ))}
      <Snackbar
        open={alertFlag}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        TransitionComponent="Fade"
        onClose={() => setAlertFlag(false)}
      >
        <Alert
          onClose={() => setAlertFlag(false)}
          severity={windowFlag.autoSave ? "success" : "warning"}
          sx={{ width: "100%" }}
        >
          {`Auto Save ${windowFlag.autoSave ? "ON" : "OFF"} !`}
        </Alert>
      </Snackbar>
    </Toolbar>
  );
}
