import React, { useState } from "react";
import { Grid, Menu, MenuItem, Card } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import { Masters } from "../data/Json/TravelJson";

function CreateCerficate() {
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

  const handleCreateCertificate = () => {
    navigate(
      "/redirectToRetail?prodCode=GroupTravel&prodLabel=Create New Certificate&url=/Travel/CreateCOI"
    );
  };
  const SearchCOIData = [
    {
      label: "Masters Policy No.",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
    },
    {
      label: "Masters Holder Name",
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
          headerName: "Master Policy No.",
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
                  <MenuItem onClick={handleCreateCertificate}>
                    <AddIcon />
                    Create Certificate
                  </MenuItem>
                  <MenuItem>
                    <VisibilityIcon />
                    View Certificate
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
        COI Issuance
      </Grid>
      <Grid container spacing={2} m={1}>
        {SearchCOIData.map((elem) => (
          <Grid item xs={elem.spacing}>
            <NewRenderControl
              item={elem}
              dto={dto}
              setDto={setDto}
              // nextFlag={nextFlg}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
export default CreateCerficate;
