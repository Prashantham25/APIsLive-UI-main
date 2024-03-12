import { useEffect, useState } from "react";
import { IconButton, Grid } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDDataGrid from "../../../../../../../components/MDDataGrid";
import { FetchQuotation } from "../data";
import MDButton from "../../../../../../../components/MDButton";

function LoadQuotation({ styles, setLoading, setPage, setSelectedId }) {
  const [pageSize, setPageSize] = useState(5);
  const [detailsRows, setDetailsRows] = useState([]);
  const { centerRowStyle, headingStyle } = styles;

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""}${month}-${year}`;
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setPage("Generate Quote");
  };
  const columns = [
    { field: "Type", headerName: "Type", width: 150, editable: false },
    { field: "id", headerName: "Quote Number", width: 150, editable: false },
    { field: "ProposerName", headerName: "Proposer Name", width: 150, editable: false },
    { field: "identificationNo", headerName: "Identification Number", width: 150, editable: false },
    { field: "creationDate", headerName: "Quotation Creation Date", width: 150, editable: false },
    { field: "mobile", headerName: "Mobile Number", width: 150, editable: false },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={centerRowStyle}>
          <IconButton onClick={() => handleEdit(param.id)}>
            <EditIcon />
          </IconButton>
        </MDBox>
      ),
    },
  ];
  useEffect(async () => {
    setLoading(true);
    await FetchQuotation().then((res) => {
      setLoading(false);
      const newData = res.map((elem) => ({
        Type: elem.channel,
        id: elem.quoteNo,
        ProposerName: elem.customerName,
        identificationNo: elem.id,
        creationDate: formatDate(elem.quoteDate),
        mobile: elem.mobileNumber,
      }));
      setDetailsRows(newData);
    });
  }, []);
  return (
    <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
      <MDTypography sx={headingStyle}>Load Quotation</MDTypography>
      <Grid container sx={{ width: "100%" }}>
        <MDBox sx={{ ...centerRowStyle, width: "100%", pl: "1rem", pt: "1rem", pb: "1rem" }}>
          <MDDataGrid
            sx={{ fontSize: "0.875rem" }}
            rows={detailsRows}
            getRowId={(x) => x.id}
            columns={columns}
            rowID="id"
            checkboxSelection
            autoHeight
            // onSelectionModelChange={handleCheckBox}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
          />
        </MDBox>
      </Grid>
      <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
        <MDButton>Create Proposal</MDButton>
      </MDBox>
    </MDBox>
  );
}
export default LoadQuotation;
