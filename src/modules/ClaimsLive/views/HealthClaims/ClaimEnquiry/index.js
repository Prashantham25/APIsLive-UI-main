import { useState, useEffect } from "react";
import { Grid, Accordion, AccordionDetails, AccordionSummary, Autocomplete } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useDataController,
  setTravelClaimJson,
  setTravelEnquiryFlag,
} from "modules/BrokerPortal/context";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
// import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import { SeachClaimTransactions, GetMasterData } from "../data/index";

function ClaimEnquiry() {
  const [controller, dispatch] = useDataController();
  const { TravelClaimJson } = controller;
  console.log(1234321, TravelClaimJson);
  // const [ClaimObj] = useState(TravelClaimJson);

  const [SearchObj, setSearchObj] = useState({ claimNo: "", policyNo: "", transactionNumber: "" });
  const [SearchedData, setSearchedData] = useState([]);
  // const [MasterClaimCategory, setMasterClaimCategory] = useState([]);
  // const [BodyFlag, setBodyFlag] = useState(true);
  const [MasterClaimType, setMasterClaimType] = useState([]); // Re Cashless
  const [MasterClaimSubType, setMasterClaimSubType] = useState([]);
  const [MasterClaimStatus, setMasterClaimStatus] = useState([]);
  const [TableFlag, setTableFlag] = useState(false);
  const [timer, setTimer] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: "claimNumber",
      headerName: "Claim No",
      width: 150,
    },

    {
      field: "transactionNo",
      headerName: "Transaction No",
      hide: true,
      width: 150,
    },
    {
      field: "travelStartDate",
      headerName: "Travel Start Date",
      hide: true,
      width: 150,
    },
    {
      field: "travelEndDate",
      headerName: "Travel End Date",
      hide: true,
      width: 150,
    },
    {
      field: "PtName",
      headerName: "Pt Name",
      width: 150,
    },
    {
      field: "Employee Name",
      headerName: "EmployeeName",
      hide: true,
      width: 150,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      width: 250,
    },

    {
      field: "claimSubType",
      headerName: "Claim Sub Type",
      width: 150,
    },
    {
      field: "status",

      headerName: "Claim Status",
      width: 300,
    },
  ];

  const onSetSearchObj = (e) => {
    setSearchObj({ ...SearchObj, [e.target.name]: e.target.value });
  };
  const onClickSearch = async () => {
    setTimer(true);
    //   const result = await GetMasterData();
    //   result.forEach((item) => {
    //     if (item.mType === "Travel Claim Category") {
    //       setMasterClaimCategory(item.mdata);
    //       console.log(MasterClaimCategory);
    //     }
    //   });

    const Data = await SeachClaimTransactions({ SearchObj });
    setSearchedData(Data);
    if (Data.length === 0) {
      setTableFlag(false);
      swal({
        html: true,
        icon: "error",
        title: "No Record found",
        text: "Enter valid Data",
      });
    } else {
      setTableFlag(true);
    }
    setTimer(false);
    //   console.log("Claim Process", Data);

    const arr = [];

    if (SearchObj.transactionNumber !== "") {
      Data.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            transactionNo: itemj.transactionNumber,
            claimNumber: itemi.claimNumber,
            status: itemj.status,
            claimType: itemj.transactionDetailsDto.claimCategory,
            claimSubType: itemj.transactionDetailsDto.claimSubType,
            PtName: itemi.basicDetails.memberDetails.insuredName,
          });
        });
      });
    } else if (SearchObj.claimNo !== "") {
      Data.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            transactionNo: itemj.transactionNumber,
            claimNumber: itemi.claimNumber,
            status: itemj.status,
            claimType: itemj.transactionDetailsDto.claimCategory,
            claimSubType: itemj.transactionDetailsDto.claimSubType,
            PtName: itemi.basicDetails.memberDetails.insuredName,
          });
        });
      });
    } else if (SearchObj.policyNo !== "") {
      Data.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            transactionNo: itemj.transactionNumber,
            claimNumber: itemi.claimNumber,
            status: itemj.status,
            claimType: itemj.transactionDetailsDto.claimCategory,
            claimSubType: itemj.transactionDetailsDto.claimSubType,
          });
        });
      });
    }
    arr.forEach((r, i) => {
      MasterClaimType.forEach((q) => {
        if (q.mID.toString() === r.claimType) arr[i].claimType = q.mValue;
      });
      MasterClaimSubType.forEach((q) => {
        if (q.mID.toString() === r.claimSubType) arr[i].claimSubType = q.mValue;
      });
    });
    setRows([...arr]);
  };
  console.log("arrrr", rows);
  const onHandelClaim = (ids) => {
    // setTravelClaimJson(dispatch, ids.row);

    console.log("HI");
    SearchedData.forEach((itemi) => {
      itemi.claimTransactionDTO.forEach((itemj) => {
        if (ids.row.transactionNo === itemj.transactionNumber) {
          setTravelEnquiryFlag(dispatch, true);
          setTravelClaimJson(dispatch, { ...itemi, claimTransactionDTO: [{ ...itemj }] });
          navigate(`/HealthClaims/Processing`);
          console.log(itemj);
          console.log(itemi);
          console.log({ ...itemi, claimTransactionDTO: [{ ...itemj }] });
          // setHeaderDetails({ PolicyNumber: itemi.policyNo, ClaimNumber: ids.row.claimNumber });
          // setBodyFlag(false);
        }
      });
    });
  };

  useEffect(async () => {
    const arr = [];
    const data = await GetMasterData();
    data.forEach((row) => {
      if (row.mType === "Claim Status") {
        row.mdata.forEach((r) => {
          if (r.mValue !== "Under Repair" && r.mValue !== "Vehicle Inspection") arr.push(r);
        });
        setMasterClaimStatus(arr);
      }
      if (row.mType === "Travel Claim Category") setMasterClaimType(row.mdata);

      if (row.mType === "SubType") setMasterClaimSubType(row.mdata);
    });
  }, []);

  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography>Claim Enquiry</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Policy Number"
                name="policyNo"
                value={SearchObj.policyNo}
                onChange={(e) => onSetSearchObj(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Member ID"
                name="memberId"
                // value={SearchObj.policyNo}
                // onChange={(e) => onSetSearchObj(e)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Claim Number"
                name="claimNo"
                value={SearchObj.claimNo}
                onChange={(e) => onSetSearchObj(e)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Transaction Number"
                name="transactionNumber"
                value={SearchObj.transactionNumber}
                onChange={(e) => onSetSearchObj(e)}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "Loss Date" }}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={MasterClaimStatus}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, newVal) => setSearchObj({ ...SearchObj, statusID: newVal.mID })}
                renderInput={(params) => <MDInput {...params} label="Claim Status" />}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={MasterClaimType}
                getOptionLabel={(option) => option.mValue}
                // onChange={(e, newVal) => setSearchObj({ ...SearchObj, statusID: newVal.mID })}
                renderInput={(params) => <MDInput {...params} label="Claim Type" />}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={MasterClaimSubType}
                getOptionLabel={(option) => option.mValue}
                // onChange={(e, newVal) => setSearchObj({ ...SearchObj, statusID: newVal.mID })}
                renderInput={(params) => <MDInput {...params} label="Claim Sub Type" />}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onClickSearch}>SEARCH</MDButton>
            </Grid>
            {timer && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </MDBox>
              </Grid>
            )}
            {TableFlag && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    // checkboxSelection
                    getRowId={(row) => row.transactionNo}
                    onRowClick={(ids) => onHandelClaim(ids)}
                  />
                </MDBox>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default ClaimEnquiry;
