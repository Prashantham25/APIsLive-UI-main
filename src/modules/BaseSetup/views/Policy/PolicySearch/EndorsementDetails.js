import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDButton from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";

function EndorsementDetails({ endorsementDetails, handleEmail, handleDownload }) {
  const [tableRows, setTableRows] = useState([]);
  const tableColumns = [
    {
      field: "EndorsementNumber",
      headerName: "Endorsement No",
      width: 200,
    },
    {
      field: "EndorsementType",
      headerName: "Endorsement Type",
      width: 200,
    },
    {
      field: "EndorsementCategory",
      headerName: "Endorsement Category",
      width: 200,
    },
    {
      field: "EndorsementDate",
      headerName: "Endorsement Date",
      width: 200,
    },
    {
      field: "TotalPremium",
      headerName: "Total Premium Amount",
      width: 200,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 100,
      renderCell: (param) => (
        <MDButton
          size="medium"
          variant="text"
          onClick={(e) => handleEmail(e, param.row, false)}
          startIcon={<EmailIcon fontSize="large" variant="contained" />}
          textAlign="center"
        />
      ),
    },
    {
      field: "Download",
      headerName: "Download",
      width: 100,
      renderCell: (param) => (
        <MDButton
          size="medium"
          variant="text"
          onClick={(e) => handleDownload(e, param.row.EndorsementNumber)}
          startIcon={<DownloadIcon fontSize="large" variant="contained" />}
          textAlign="center"
        />
      ),
    },
  ];

  useEffect(() => {
    const dataArray = [];
    if (endorsementDetails.length > 0) {
      endorsementDetails.forEach((prop) => {
        dataArray.push({
          EndorsementNumber: prop.endorsementNumber,
          EndorsementType: prop.endorsementType,
          EndorsementCategory: prop.endorsementCategory,
          EndorsementDate: prop.endorsementDate,
          TotalPremium: prop.totalPremiumAmount,
        });
        setTableRows(dataArray);
      });
    } else {
      setTableRows([]);
    }
  }, []);

  return (
    <Grid container spacing={4} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={tableRows}
          columns={tableColumns}
          disableSelectionOnClick
          getRowId={(row) => row.EndorsementNumber}
        />
      </Grid>
    </Grid>
  );
}

export default EndorsementDetails;
