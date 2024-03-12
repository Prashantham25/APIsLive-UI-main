import { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Modal,
} from "@mui/material";
import swal from "sweetalert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Worker from "assets/images/workers.png";
import Card from "@mui/material/Card";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridToolbar } from "@mui/x-data-grid";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDDataGrid from "../../../../../components/MDDataGrid";
// import RuleConfig from "../RuleConfig/index";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import {
  SearchPartnerApi,
  DeletePartner,
  GetPartnerDetails,
  GetMasterDataAsync,
} from "../data/index";
import CreatePartner from "../CreatePartner/index";

function SearchPartner() {
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [MasterPartnerType, setMasterPartnerType] = useState([]);
  const [MasterPartnerClass, setMasterPartnerClass] = useState([]);
  const [MasterPartnerStatus, setMasterPartnerStatus] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const [dataGridFlag, setDataGridFlag] = useState(false);

  const [resObj, setResObj] = useState({});
  console.log("resObj", resObj);
  const [searchObj, setSearchObj] = useState({
    email: "",
    mobile: "",
    pan: "",
    partnerClassId: "",
    partnerCode: "",
    partnerId: "",
    partnerName: "",
    partnerTypeId: "",
    status: "",
  });

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    {
      field: "partnerCode",
      headerName: "Partner Code",
      width: 190,
    },

    {
      field: "partnerName",
      headerName: "Partner Name",
      width: 190,
    },
    {
      field: "partnerType",
      headerName: "Partner Type",
      width: 190,
    },
    {
      field: "partnerClass",
      headerName: "Partner Class",
      width: 190,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 190,
      renderCell: (param) => {
        console.log("param", param);
        const onView = async () => {
          const r1 = await GetPartnerDetails(param.row.partnerId);
          console.log(r1, 644);
          // const b = JSON.parse(r1.partnerDetails);
          if (r1.partnerDetails !== null && r1.partnerDetails !== undefined) {
            r1.partnerDetails = JSON.parse(r1.partnerDetails);
          }
          console.log("heyIGotData", r1);
          r1.BranchName = r1.partnerDetails.BranchName;
          r1.BranchCode = r1.partnerDetails.BranchCode;
          r1.SalesPersonCode = r1.partnerDetails.SalesPersonCode;
          r1.SalesPersonName = r1.partnerDetails.SalesPersonName;

          setResObj(r1);
          setViewFlag(true);
          setEditFlag(false);
          setFlag(true);
        };
        const onEdit = async () => {
          const r1 = await GetPartnerDetails(param.row.partnerId);
          if (r1.partnerDetails !== null && r1.partnerDetails !== undefined) {
            r1.partnerDetails = JSON.parse(r1.partnerDetails);
          }
          console.log("heyIGotData", r1);
          r1.BranchName = r1.partnerDetails.BranchName;
          r1.BranchCode = r1.partnerDetails.BranchCode;
          r1.SalesPersonCode = r1.partnerDetails.SalesPersonCode;
          r1.SalesPersonName = r1.partnerDetails.SalesPersonName;
          setResObj(r1);
          setEditFlag(true);
          setViewFlag(false);
          setFlag(true);
        };
        return (
          <div>
            <IconButton onClick={onView}>
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },

    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderCell: (param) => {
        console.log("param", param);
        const handleChange = async (e) => {
          await DeletePartner(param.row.partnerId);
          if (e.target.checked === true) {
            swal({
              icon: "success",
              text: "Partner is Deactivated",
            });
          } else {
            swal({
              icon: "success",
              text: "Partner is Activated",
            });
          }
          const res = await SearchPartnerApi(searchObj);
          const arr = res.data;
          arr.forEach((ev, i) => {
            arr[i].id = i;
          });
          setRows(res.data);
        };
        return <Switch {...label} checked={param.row.isActive} onChange={handleChange} />;
      },
    },
  ];

  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };
  const onMDChange = (e) => {
    setSearchObj({ ...searchObj, [e.target.name]: e.target.value });
  };
  const onAutoChange = (e, v, name) => {
    setSearchObj({ ...searchObj, [name]: v.mID });
  };
  const onSearch = async () => {
    if (
      searchObj.partnerName !== "" ||
      searchObj.partnerTypeId !== "" ||
      searchObj.partnerClassId !== "" ||
      searchObj.status !== ""
    ) {
      const res = await SearchPartnerApi(searchObj);
      const arr = res.data;
      arr.forEach((e, i) => {
        console.log("eeee", e);
        console.log("iiii", i);
        arr[i].id = i;
      });
      setRows(res.data);
      setDataGridFlag(true);
    } else {
      setDataGridFlag(false);
      swal({ icon: "error", text: "Please enter any one search parameter" });
    }
  };
  const onModelClose = () => {
    setFlag(false);
  };
  useEffect(async () => {
    const res1 = await GetMasterDataAsync();
    res1.data.forEach((x) => {
      if (x.mType === "PartnerType") setMasterPartnerType(x.mdata);
      if (x.mType === "PartnerClass") setMasterPartnerClass(x.mdata);
      if (x.mType === "PartnerStatus")
        setMasterPartnerStatus(x.mdata.filter((i) => i.mValue !== "All"));

      //  masters.Salutation = item.mdata.filter((x) => x.mValue !== "M/S.");
    });
  }, []);
  return (
    <MDBox p={2}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
              }}
            >
              <MDBox component="img" src={Worker} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            Search Partner
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Partner Name"
                name="partnerName"
                value={searchObj.partnerName}
                onChange={onMDChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerType}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                onChange={(e, v) => onAutoChange(e, v, "partnerTypeId")}
                renderInput={(params) => <MDInput {...params} label="Partner Type" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerClass}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                onChange={(e, v) => onAutoChange(e, v, "partnerClassId")}
                renderInput={(params) => <MDInput {...params} label="Partner Class" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerStatus}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                onChange={(e, v) => onAutoChange(e, v, "status")}
                renderInput={(params) => <MDInput {...params} label="Partner Status" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onSearch}>SEARCH</MDButton>
              </MDBox>
            </Grid>
            {dataGridFlag && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography style={{ marginLeft: "10px" }}>Partner Details</MDTypography>
                <MDBox sx={{ width: "100%" }}>
                  <MDDataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.id}
                    // rowsPerPageOptions={[5, 10, 15, 20]}
                    pagination
                  />
                </MDBox>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={flag}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid black",
          overflowY: "scroll",
        }}
      >
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <MDBox p={3}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onModelClose}>X</MDButton>
            </MDBox>
            <CreatePartner resObj={resObj} editFlag={editFlag} viewFlag={viewFlag} />
          </MDBox>
        </Accordion>
      </Modal>
    </MDBox>
  );
}
export default SearchPartner;
