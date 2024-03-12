import { useState } from "react";
import { Grid, IconButton, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { GetUploadStatus } from "../data";

const modelSty = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
function UploadStatus() {
  const [id, setId] = useState("");
  const [rows, setRows] = useState([]);
  const columns1 = [
    {
      field: "documentDetailsId",
      headerName: "Document Details Id",
      width: 200,
    },

    {
      field: "documentDetails",
      headerName: "Document Details",
      width: 200,
    },
    {
      field: "txnStatus",
      headerName: "Transaction Status",
      width: 250,
    },
    {
      field: "txnErrorDesc",
      headerName: "Transaction Error Desc",
      width: 250,
    },
  ];
  const columns = [
    {
      field: "documentUploadId",
      headerName: "Document Id",
      width: 150,
    },

    {
      field: "totalCount",
      headerName: "Total Count",
      width: 120,
    },
    {
      field: "successCount",
      headerName: "Success Count",
      width: 120,
    },
    {
      field: "failCount",
      headerName: "Fail Count",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "created",
      headerName: "Created",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 70,
      renderCell: (param) => {
        console.log(param);
        const [flg, setFlg] = useState(false);
        const onView = () => {
          setFlg(true);
        };
        const onClose = () => {
          setFlg(false);
        };

        return (
          <div>
            <IconButton onClick={onView}>
              <RemoveRedEyeIcon />
            </IconButton>
            <Modal open={flg} sx={modelSty}>
              <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography>Upload Details</MDTypography>
                  </Grid>{" "}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDButton onClick={onClose}>X</MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <DataGrid
                      autoHeight
                      rows={param.row.uploadDetails}
                      columns={columns1}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                      components={{ Toolbar: GridToolbar }}
                      editField="inEdit"
                      getRowId={(r) => r.documentDetailsId}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Modal>
          </div>
        );
      },
    },
  ];

  const onDocId = (e) => {
    setId(e.target.value);
  };

  const onSearch = async () => {
    await GetUploadStatus(id).then((res) => {
      console.log(res, 245);
      setRows([...res.data.details]);
    });
  };

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Upload Status</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Document Id" value={id} onChange={onDocId} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onSearch}>Search</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            editField="inEdit"
            getRowId={(r) => r.documentUploadId}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default UploadStatus;
