import React, { useState } from "react";
import { Card, Grid, AccordionDetails, AccordionSummary, Menu, MenuItem } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import { Masters } from "../data/Json/TravelJson";

function ModifyUsers() {
  const [dto, setDto] = useState({
    rows: [
      {
        UserNames: "William",
        FirstNames: "Pitt",
        DateofBirth: "01/01/1992",
        PAN: "BWXPA340EP",
        MobileNumber: "9900488349",
      },
    ],
  });
  const [mast, setMaster] = useState(Masters);
  const navigate = useNavigate();
  const handleClick = (event) => {
    mast.flag.anchorEl = event.currentTarget;
    setMaster({ ...mast });
  };
  const handleMenuClose = () => {
    mast.flag.anchorEl = null;
    setMaster({ ...mast });
  };

  const handleViewUser = () => {
    navigate("/Travel/CreateUser");
  };
  const Data = [
    {
      label: "First Name",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
      onChangeFuncs: ["IsAlphaSpace"],
    },
    {
      label: "Partner ID",
      type: "Input",
      visible: true,
      spacing: 2.7,
    },
    {
      label: "Email ID/User Name",
      type: "Input",
      visible: true,
      spacing: 2.7,
      onChangeFuncs: ["IsAlphaSpace"],
    },
    {
      type: "Input",
      label: "Mobile Number",
      visible: true,
      spacing: 2.7,
      onBlurFuncs: ["IsMobileNumber"],
      onChangeFuncs: ["IsNumeric"],
      InputProps: { maxLength: 10 },
    },
    {
      type: "Input",
      label: "PAN ",
      visible: true,
      spacing: 2.7,
      onBlurFuncs: ["IsPan"],
      InputProps: { maxLength: 10 },
    },
    {
      label: "Select Status",
      type: "AutoComplete",
      visible: true,
      required: true,
      Option: [],
      spacing: 2.7,
    },
    {
      label: "",
      type: "Typography",
      visible: true,
      spacing: 9.5,
    },
    {
      label: "Reset",
      type: "Button",
      visible: true,
      spacing: 1,
      variant: "outlined",
    },
    {
      label: "Search",
      type: "Button",
      visible: true,
      spacing: 1,
    },
    {
      type: "DataGrid",
      spacing: 11,
      visible: true,
      rowId: "UserNames",
      path: "rows",
      rowPerPage: 20,
      columns: [
        {
          field: "UserNames",
          headerName: "User Names",
          width: 200,
          align: "center",
        },
        {
          field: "FirstNames",
          headerName: "First Names",
          width: 200,
          align: "center",
        },
        {
          field: "DateofBirth",
          headerName: "Date of Birth",
          width: 150,
          align: "center",
        },
        {
          field: "PAN",
          headerName: "PAN",
          width: 150,
          align: "center",
        },
        {
          field: "MobileNumber",
          headerName: "Mobile Number",
          width: 150,
          align: "center",
        },
        {
          field: "Action",
          headerName: "Action",
          width: 80,
          renderCell: (params) => {
            console.log("data", params);
            return (
              <>
                <MoreVertIcon fontSize="medium" onClick={handleClick} />
                <Menu
                  anchorEl={mast.flag.anchorEl}
                  open={Boolean(mast.flag.anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleViewUser}>
                    <VisibilityIcon />
                    View
                  </MenuItem>
                  <MenuItem onClick={handleViewUser}>
                    <EditIcon />
                    Edit
                  </MenuItem>
                </Menu>
              </>
            );
          },
        },
        {
          field: "Status",
          headerName: "Status",
          width: 100,
          align: "center",
        },
        {
          field: "Lock User",
          headerName: "Lock User",
          width: 100,
          align: "center",
        },
      ],
    },
  ];

  return (
    <Card>
      <Grid item xs={12} m={1}>
        Modify User
      </Grid>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <MDTypography variant="body1" fontWeight="bold" color="primary">
          User Details
        </MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} m={1}>
          {Data.map((elem) => (
            <Grid item xs={elem.spacing}>
              <NewRenderControl item={elem} dto={dto} setDto={setDto} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Card>
  );
}

export default ModifyUsers;
