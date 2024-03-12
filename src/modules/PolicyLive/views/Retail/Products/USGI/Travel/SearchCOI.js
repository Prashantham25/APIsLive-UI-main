import React, { useState } from "react";
import { Card, Grid, Menu, MenuItem, IconButton } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { Masters } from "../data/Json/TravelJson";

function SearchCOIS() {
  const [dto, setDto] = useState({
    rows: [
      {
        MasterPolicyNo: "AVO/12345/65456",
        COINo: "CERT/AVO/2861/10000001/1",
        CertificateName: "Sudheer Reddy",
        AgentCode: "0000012",
        CertificatePremium: "9544",
        CertificateDate: "12/08/2000",
      },
    ],
  });
  function handleDownload() {}
  const [mast, setMaster] = useState(Masters);

  const handleClick = (event) => {
    mast.flag.anchorEl = event.currentTarget;
    setMaster({ ...mast });
  };
  const handleMenuClose = () => {
    mast.flag.anchorEl = null;
    setMaster({ ...mast });
  };
  const SearchCOIData = [
    {
      label: "Certificate Policy No.",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
    },
    {
      label: "Certificate Holder Name",
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
          field: "COINo",
          headerName: "COI No.",
          width: 200,
          align: "center",
        },
        {
          field: "CertificateName",
          headerName: "Certificate name",
          width: 150,
          align: "center",
        },
        {
          field: "AgentCode",
          headerName: "Agent Code",
          width: 150,
          align: "center",
        },
        {
          field: "CertificatePremium",
          headerName: "Certificate Premium",
          width: 150,
          align: "center",
        },
        {
          field: "CertificateDate",
          headerName: "Certificate Date",
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
          field: "ViewEndorsement",
          headerName: "View Endorsement",
          width: 150,
          align: "center",
          renderCell: (params) => (
            <IconButton onClick={() => handleDownload(params.row)}>
              <RemoveRedEyeIcon />
            </IconButton>
          ),
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
                  <MenuItem>
                    <DownloadIcon />
                    Download Certificate
                  </MenuItem>
                  <MenuItem>
                    <EmailIcon />
                    Email Certificate
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
              // dto={leadInfo} setDto={setLeadInfo} nextFlag={nextFlg}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default SearchCOIS;
