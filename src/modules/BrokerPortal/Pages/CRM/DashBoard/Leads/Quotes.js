import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "../../../../../../components/MDTypography";

import MDBox from "../../../../../../components/MDBox";

const {
  IconButton,
  Grid,
  Chip,

  Popper,
  Fade,
  Paper,
} = require("@mui/material");

function Quotes() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [pageSize, setPageSize] = React.useState(5);

  const columns = [
    {
      field: "QuoteNum",
      headerName: "Quote Number",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (p) => (
        <MDTypography
          variant="h4"
          style={{
            color: "blue",
            textDecoration: "underline",
            fontSize: "14px",
            fontWeight: "400",
            cursor: "pointer",
          }}
        >
          {p.row.QuoteNum}
        </MDTypography>
      ),
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "InsurerName",
      headerName: "InsurerName",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "Premium",
      headerName: "Premium",
      // type: "number",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "MobileNo",
      headerName: "MobileNo",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "status",
      headerName: "status",
      headerAlign: "left",
      align: "left",
      sortable: false,
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (p) => (
        <Chip
          label={p.row.status}
          sx={{
            backgroundColor: "#27AE60",
            color: "#FFFFFF",
          }}
        />
      ),
    },

    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 100,

      renderCell: () => {
        const handleView = (newPlacement) => (event) => {
          setAnchorEl(event.currentTarget);
          setOpen((prev) => placement !== newPlacement || !prev);
          setPlacement(newPlacement);
        };
        return (
          <MDBox sx={{ width: 500 }}>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <MDTypography sx={{ p: 2 }}>View Quote</MDTypography>
                    <MDTypography sx={{ p: 2 }}>Edit Quote</MDTypography>
                    <MDTypography sx={{ p: 2 }}>Deactivate Quote</MDTypography>
                    <MDTypography sx={{ p: 2 }}>Share Quote</MDTypography>
                    <MDTypography sx={{ p: 2 }}>Download Quote</MDTypography>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <IconButton onClick={handleView("top-start")}>
              <MoreVertIcon />
            </IconButton>
          </MDBox>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      QuoteNum: "123456789",
      CreatedDate: "13/11/2022",
      LOB: "Car Insurance",
      InsurerName: "jhon Sinha",
      Premium: 383638,
      MobileNo: 9886765635,
      status: "Active",
    },

    {
      id: 2,
      QuoteNum: "123456789",
      CreatedDate: "13/11/2022",
      LOB: "Car Insurance",
      InsurerName: "jhon Sinha",
      Premium: 383638,
      MobileNo: 9886765635,

      status: "Active",
    },
  ];
  return (
    <Grid container style={{ paddingTop: "10px", paddingLeft: "16px", paddingRight: "8px" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontWeight: "400" }}
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 15, 10, 20]}
          pagination
        />
      </Grid>
    </Grid>
  );
}

export default Quotes;
