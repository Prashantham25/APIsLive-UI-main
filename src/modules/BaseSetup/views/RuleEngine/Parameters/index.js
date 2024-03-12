import { useState } from "react";
import {
  Grid,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import { GetAllParameters, CreateParameters, DeleteParamter } from "../data/index";

function Parameters() {
  const padTo2Digits = (num) => num.toString().padStart(2, "0");
  const formatDate = (date) => {
    if (new Date(date) !== "Invalid Date")
      return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
        .join("-")
        .concat(
          "T",
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(":")
        );
    return "";
  };
  const [rows, setRows] = useState([]);
  const [GridFlag, setGridFlag] = useState(false);
  const [Obj, setObj] = useState({
    CreatedDate: "2022-12-13T16:42:16",
    IsActive: 1,
    ParamMasterLink: "",
    ParamName: "",
    ParamType: "",
  });
  const columns = [
    {
      headerName: "Param Name",
      field: "paramName",
      width: 250,
    },
    {
      headerName: "Param Type",
      field: "paramType",
      width: 250,
    },

    {
      headerName: "Param Master Link",
      field: "paramMasterLink",
      width: 250,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (param) => {
        const onDelete = async () => {
          await DeleteParamter(param.row.paramId);
          const r1 = await GetAllParameters();
          if (Array.isArray(r1)) setRows(r1);
        };

        return (
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const onInputChange = (e) => {
    setObj({ ...Obj, [e.target.name]: e.target.value });
  };

  const onAutoChange = (e, a) => {
    setObj({ ...Obj, ParamType: a });
  };

  const onGridClick = async () => {
    const r1 = await GetAllParameters();
    if (Array.isArray(r1)) setRows(r1);
    setGridFlag(true);
  };

  const onSaveClick = async () => {
    if (Obj.ParamName === "" || Obj.ParamType === "")
      swal({ icon: "error", text: "Some fields are missing" });
    else {
      Obj.CreatedDate = formatDate(new Date());
      setObj(Obj);
      await CreateParameters(Obj);
      swal({ icon: "success", text: "Parameter Saved Successfully" });
      setObj({ CreatedDate: "", IsActive: 1, ParamMasterLink: "", ParamName: "", ParamType: "" });
      const r1 = await GetAllParameters();
      if (Array.isArray(r1)) setRows(r1);
    }
  };
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            General Parameter
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                required
                label="Parameter Name"
                name="ParamName"
                value={Obj.ParamName}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={["String", "Int", "Float", "Date", "MobileNo", "Email", "PassportNum"]}
                value={Obj.ParamType}
                getOptionLabel={(option) => option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                onChange={onAutoChange}
                renderInput={(params) => <MDInput {...params} required label="Data Type" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Master Name"
                name="ParamMasterLink"
                value={Obj.ParamMasterLink}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" sx={{ display: "flex", justifyContent: "center" }} spacing={3}>
                <MDButton onClick={onSaveClick}>SAVE</MDButton>{" "}
                <MDButton onClick={onGridClick}>View Parameters Details</MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Collapse in={GridFlag}>
                <MDBox sx={{ width: "100%" }}>
                  <MDTypography variant="body1" color="primary">
                    Parameter Details
                  </MDTypography>
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    loading={columns.length === 0}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(option) => option.paramId}
                    editField="inEdit"

                    // onRowClick={(ids) => onHandelMemberDetails(ids)}
                  />
                </MDBox>
              </Collapse>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default Parameters;
