import React, { useState } from "react";
import { Card, Grid, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { Masters } from "../data/Json/TravelJson";

function MasterPolicySearch() {
  const [dto, setDto] = useState({
    rows: [
      {
        MasterPolicyNo: "AVO/12345/65456",
        InsuredName: "Travel",
        StartDate: "12/08/2000",
        ExpiryDate: "23/23/2023",
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

  const handlePolicySearch = () => {
    navigate("/Travel/CreateMasterPolicy");
  };
  const handleCreateCOI = () => {
    navigate(
      "/redirectToRetail?prodCode=GroupTravel&prodLabel=Create New Certificate&url=/Travel/CreateCOI"
    );
  };

  const handleSearchCOI = () => {
    navigate("/Travel/SearchCOI");
  };

  const SearchData = [
    {
      label: "Master Policy Number",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
    },
    {
      label: "Master Policy Holder Name",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
    },
    {
      label: "Search",
      type: "Button",
      visible: true,
      spacing: 2,
    },
    {
      type: "DataGrid",
      spacing: 11,
      visible: true,
      rowId: "MasterPolicyNo",
      path: "rows",
      rowPerPage: 20,
      columns: [
        {
          field: "MasterPolicyNo",
          headerName: "Master Policy Number.",
          width: 200,
          align: "center",
        },
        {
          field: "InsuredName",
          headerName: "Insured Name",
          width: 200,
          align: "center",
        },
        {
          field: "StartDate",
          headerName: "Start Date",
          width: 150,
          align: "center",
        },
        {
          field: "ExpiryDate",
          headerName: "Expiry Date",
          width: 150,
          align: "center",
        },
        {
          field: "PolicyStatus",
          headerName: "Policy Status",
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
                  <MenuItem onClick={handlePolicySearch}>
                    <EditIcon />
                    Edit Master Policies
                  </MenuItem>
                  <MenuItem onClick={handleCreateCOI}>
                    <AddIcon />
                    Create Certificate
                  </MenuItem>
                  <MenuItem onClick={handleSearchCOI}>
                    <VisibilityIcon />
                    View Certificate
                  </MenuItem>
                  <MenuItem>
                    <DownloadIcon />
                    Download MP
                  </MenuItem>
                  <MenuItem>
                    <EmailIcon />
                    View MP
                  </MenuItem>
                </Menu>
              </>
            );
          },
        },
      ],
    },
  ];
  return (
    <Card>
      <Grid item xs={12} m={1}>
        Master Policy Search
      </Grid>
      <Grid container spacing={2} m={1}>
        {SearchData.map((elem) => (
          <Grid item xs={elem.spacing}>
            <NewRenderControl
              item={elem}
              dto={dto}
              setDto={setDto}
              // dto={leadInfo} setDto={setLeadInfo} nextFlag={nextFlg}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default MasterPolicySearch;
