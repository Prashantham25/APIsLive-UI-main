import { useEffect, useState } from "react";
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
import { GetAllParameters, CreateParamset, GetAllParamSetDetailsGrid } from "../data/index";

function RuleObject() {
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
  const [rows2, setRows2] = useState([]);
  const [autoArr, setAutoArr] = useState([]);
  const [allRuleParameter, setAllRuleParameter] = useState([]);
  const [GridFlag, setGridFlag] = useState(false);
  const [GridFlag2, setGridFlag2] = useState(false);
  const [tbl, setTbl] = useState([]);
  const [Obj, setObj] = useState({
    paramSetName: "",
    IsActive: 1,
    createdDate: "",
    tblParamSetDetails: [],
  });
  console.log("rows2", rows2);
  console.log("tbl", tbl);
  const columns = [
    {
      headerName: "Parameter Set Name",
      field: "paramSetName",
      width: 250,
    },
    {
      headerName: "Parameter Name",
      field: "paramName",
      width: 250,
    },
  ];
  const columns2 = [
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
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows2.filter((row) => row.paramId !== param.row.paramId);
          setRows2([...newArray]);
          setAutoArr([...newArray]);

          const arr2 = [];
          newArray.forEach((item) => {
            arr2.push({ paramId: item.paramId.toString() });
          });

          setTbl([...arr2]);
        };
        return (
          <IconButton onClick={deleteRow}>
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
    // setGridFlag2(false);
    setAutoArr([...a]);

    // setObj({...Obj,tblParamSetDetails})
  };

  const onAddClick = () => {
    if (Obj.paramSetName === "" || autoArr.length === 0)
      swal({ icon: "error", text: "Some fields are missing" });
    else {
      setRows2([...autoArr]);
      const arr2 = [];
      autoArr.forEach((item) => {
        arr2.push({ paramId: item.paramId.toString() });
      });
      setGridFlag2(true);
      setTbl([...arr2]);
    }
  };

  const onGridClick = async () => {
    const r1 = await GetAllParamSetDetailsGrid();
    const arr1 = [...r1];
    arr1.forEach((row, index) => {
      arr1[index].id = index;
    });
    setRows(arr1);
    setGridFlag(true);
  };

  const onSaveClick = async () => {
    if (Obj.paramSetName === "" || rows2.length === 0)
      swal({ icon: "error", text: "Some fields are missing" });
    else if (tbl.length !== rows2.length || !GridFlag2) {
      swal({ icon: "error", text: "Click on Add button" });
    } else {
      Obj.createdDate = formatDate(new Date());
      Obj.tblParamSetDetails = [...tbl];
      setObj(Obj);
      await CreateParamset(Obj);
      swal({ icon: "success", text: "Parameter Saved Successfully" });
      setObj({ paramSetName: "", IsActive: 1, createdDate: "", tblParamSetDetails: [] });
      setGridFlag2(false);
      setGridFlag(false);
      setRows2([]);
      setTbl([]);
      setAutoArr([]);
    }
  };
  useEffect(async () => {
    const r1 = await GetAllParameters();
    if (Array.isArray(r1)) setAllRuleParameter(r1);
  }, []);
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Rule Object
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Parameter Name"
                name="paramSetName"
                value={Obj.paramSetName}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                disableCloseOnSelect
                multiple
                fullWidth
                options={allRuleParameter}
                value={autoArr}
                getOptionLabel={(option) => option.paramName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                onChange={onAutoChange}
                renderInput={(params) => <MDInput {...params} label="Data Type" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onAddClick}>ADD</MDButton>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Collapse in={GridFlag2} out={rows2.length === 0}>
                <MDBox sx={{ width: "100%" }}>
                  <MDTypography variant="body1" color="primary">
                    Parameter Details
                  </MDTypography>
                  <DataGrid
                    autoHeight
                    rows={rows2}
                    columns={columns2}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(option) => option.paramId}
                    editField="inEdit"

                    // onRowClick={(ids) => onHandelMemberDetails(ids)}
                  />
                </MDBox>{" "}
              </Collapse>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" sx={{ display: "flex", justifyContent: "center" }} spacing={3}>
                <MDButton onClick={onSaveClick}>SAVE</MDButton>{" "}
                <MDButton onClick={onGridClick}>View Parameters Set Details</MDButton>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Collapse in={GridFlag} out={!GridFlag}>
                <MDBox sx={{ width: "100%" }}>
                  <MDTypography variant="body1" color="primary">
                    Parameter Set Details
                  </MDTypography>
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    loading={rows.length === 0}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(option) => option.id}
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
export default RuleObject;
