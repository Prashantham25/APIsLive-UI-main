import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import MDBox from "../MDBox";

function MDDataGrid({ columns, rows, rowID, ...rest }) {
  const [device, setDevice] = useState("");
  useEffect(() => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setDevice("mobile");
    } else {
      setDevice("Browser");
    }
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      {device === "mobile" ? (
        <Grid container spacing={2}>
          {rows.map((x1) => (
            <Grid item xs={12}>
              {columns.map((x2) => (
                <Grid container spacing={1} sx={{ bgcolor: "#e3f2fd" }} key={x2.headerName} p={1}>
                  <Grid item xs={6}>
                    <MDBox justifyContent="center">
                      <Typography sx={{ fontSize: 15, fontWeight: 100 }}>
                        {x2.headerName}
                      </Typography>
                    </MDBox>
                  </Grid>{" "}
                  <Grid item xs={6}>
                    {x2.renderCell ? (
                      x2.renderCell({
                        row: x1,
                        id: x1[rowID],
                      })
                    ) : (
                      <Typography sx={{ fontSize: 15, fontWeight: 10 }}>{x1[x2.field]}</Typography>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(x) => x[rowID]}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          {...rest}
        />
      )}
    </MDBox>
  );
}
export default MDDataGrid;
