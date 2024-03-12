import { useEffect, useState } from "react";
import { IconButton, Grid } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDDataGrid from "../../../../../../../components/MDDataGrid";
import { GetLeadPool } from "../data";

function NeedAnalysisCompleted({ styles, setLoading, setPage, setSelectedId }) {
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
    setPage("Modify Prospect");
  };
  const columns = [
    { field: "Type", headerName: "Type", width: 150, editable: false },
    { field: "id", headerName: "Lead Number", width: 150, editable: false },
    { field: "LeadDate", headerName: "Lead Date", width: 150, editable: false },
    { field: "ProposerName", headerName: "Proposer Name", width: 150, editable: false },
    { field: "Place", headerName: "Place", width: 150, editable: false },
    { field: "Mobile", headerName: "Mobile", width: 150, editable: false },
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
    await GetLeadPool("NeedAnalysisCompleted").then((res) => {
      setLoading(false);
      const newData = res.map((elem) => ({
        Type: elem.contactType,
        id: elem.contactID,
        LeadDate: formatDate(elem.creationDate),
        ProposerName: elem.firstName,
        Place: elem.place,
        Mobile: elem.mobileNo,
      }));
      setDetailsRows(newData);
    });
  }, []);
  return (
    <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
      <MDTypography sx={headingStyle}>Need Analysis Completed</MDTypography>
      <Grid container sx={{ width: "100%" }}>
        <MDBox sx={{ ...centerRowStyle, width: "100%", pl: "1rem", pt: "1rem", pb: "1rem" }}>
          <MDDataGrid
            sx={{ fontSize: "0.875rem" }}
            rows={detailsRows}
            getRowId={(x) => x.id}
            columns={columns}
            // rowID="id"
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
    </MDBox>
  );
}
export default NeedAnalysisCompleted;
