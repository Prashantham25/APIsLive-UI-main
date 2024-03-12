import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function PlanDetails({ benefitDetails }) {
  const [tableRows, setTableRows] = useState([]);
  const tableColumns = [
    {
      field: "Benefit",
      headerName: "Benefit",
      width: 700,
    },
    {
      field: "Deductible",
      headerName: "Deductible",
      width: 150,
    },
    {
      field: "Value",
      headerName: "Value",
      width: 150,
    },
  ];

  useEffect(() => {
    const dataArray = [];
    let id = 0;
    if (benefitDetails.length > 0) {
      benefitDetails.forEach((prop) => {
        if (prop.Value !== "-") {
          dataArray.push({
            Id: id + 1,
            Benefit: prop.Benefit,
            Deductible: prop.Deductible,
            Value: prop.Value,
          });
        }
        setTableRows(dataArray);
        id += 1;
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
          columns={tableColumns}
          rows={tableRows}
          disableSelectionOnClick
          getRowId={(row) => row.Id}
        />
      </Grid>
    </Grid>
  );
}

export default PlanDetails;
