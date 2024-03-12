import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import swal from "sweetalert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useDataController, setTravelClaimJson } from "modules/BrokerPortal/context";
// import Body from "@mui/material/Radio";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import TravelProcessingSideMenu from "./SideMenu";
import ClaimDetails from "./ClaimDetails";
import MDTypography from "../../../../../components/MDTypography";
import { GetMasterData, SeachClaimTransactions } from "../data/index";

function ClaimProcessing() {
  const [controller, dispatch] = useDataController();
  const { TravelEnquiryFlag, TravelClaimJson, ToplevelClaimFlag } = controller;
  const [SearchObj, setSearchObj] = useState({ claimNo: "", policyNo: "", transactionNumber: "" });
  const [SearchedData, setSearchedData] = useState([]);
  const [MasterClaimCategory, setMasterClaimCategory] = useState([]);
  const [MasterClaimSubType, setMasterClaimSubType] = useState([]);
  const [BodyFlag, setBodyFlag] = useState(ToplevelClaimFlag);
  const [TableFlag, setTableFlag] = useState(false);
  const [timer, setTimer] = useState(false);

  const [rows, setRows] = useState([]);

  const onChangeSearch = (e) => {
    setSearchObj({ ...SearchObj, [e.target.name]: e.target.value });
  };

  const onClickSearch = async () => {
    setTimer(true);

    // const getClamsubtypeName = (ClaimTypeVal) => {
    //   const [str, setSte] = useState("");
    //   MasterClaimCategory.forEach((item) => {
    //     if (item.mID.toString() === ClaimTypeVal) {
    //       console.log("aaaaa", item.mValue);
    //       setSte(item.mValue);
    //     }
    //   });
    //   return str;
    // };

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
    console.log("Claim Process", Data);

    const arr = [];

    if (SearchObj.transactionNumber !== "") {
      console.log("arrrr", rows);
    } else if (SearchObj.claimNo !== "") {
      Data.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            // travelStartDate: itemi.basicDetails.claimDetails.travelStartDate,
            // travelEndDate: itemi.basicDetails.claimDetails.travelEndDate,
            transactionNo: itemj.transactionNumber,
            claimNumber: itemi.claimNumber,
            status: itemj.status,
            claimType: itemj.transactionDetailsDto.claimCategory,
            claimSubType: itemj.transactionDetailsDto.claimSubType,
          });
        });
      });
    } else if (SearchObj.policyNo !== "") {
      Data.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            // travelStartDate: itemi.basicDetails.claimDetails.travelStartDate,
            // travelEndDate: itemi.basicDetails.claimDetails.travelEndDate,
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
      // MasterClaimCategory.forEach((q) => {
      //   if (q.mID.toString() === r.claimType.toString()) arr[i].claimType = q.mValue;
      // });
      arr[i].claimType = "Reimbursement Claim";
      MasterClaimSubType.forEach((q) => {
        if (q.mID.toString() === r.claimSubType) {
          arr[i].claimSubType = q.mValue;
        }
      });
    });
    setRows([...arr]);
    // console.log("arrrr", rows);
  };

  // const Tablecolumns = [
  //   {
  //     field: "claimNumber",
  //     headerName: "Claim No",
  //     width: 150,
  //   },

  //   {
  //     field: "TransactionNo",
  //     headerName: "Transaction No",
  //     width: 150,
  //     valueGetter: (params) => params.row.claimTransactionDTO[0].transactionNumber,
  //   },
  //   {
  //     field: "TravelStartDate",
  //     headerName: "Travel Start Date",
  //     width: 150,
  //     valueGetter: (params) => params.row.basicDetails.claimDetails.travelStartDate,
  //   },
  //   {
  //     field: "TravelEndDate",
  //     headerName: "Travel End Date",
  //     width: 150,
  //     valueGetter: (params) => params.row.basicDetails.claimDetails.travelEndDate,
  //   },
  //   {
  //     field: "ClaimType",
  //     headerName: "Claim Type",
  //     width: 150,
  //     valueGetter: (params) =>
  //       params.row.claimTransactionDTO[0].transactionDetailsDto.claimCategory === "48"
  //         ? "Reimbursement"
  //         : "Cashless Claim",
  //   },

  //   {
  //     field: "ClaimSubType",
  //     headerName: "Claim SubType",
  //     width: 150,
  //     valueGetter: (params) => params.row.claimTransactionDTO[0].transactionDetailsDto.claimSubType,
  //   },
  //   {
  //     field: "ClaimStatus",
  //     headerName: "Claim Status",
  //     width: 300,
  //     valueGetter: (params) => params.row.claimTransactionDTO[0].status,
  //   },
  // ];

  const columns = [
    {
      field: "claimNumber",
      headerName: "Claim No",
      width: 150,
    },

    {
      field: "transactionNo",
      headerName: "Transaction No",
      width: 150,
    },
    {
      field: "travelStartDate",
      headerName: "Travel Start Date",
      width: 150,
      hide: true,
    },
    {
      field: "travelEndDate",
      headerName: "Travel End Date",
      width: 150,
      hide: true,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      width: 250,
    },

    {
      field: "claimSubType",
      headerName: "Claim SubType",
      width: 150,
    },
    {
      field: "status",
      headerName: "Claim Status",
      width: 300,
    },
  ];

  const onHandelClaim1 = (ids) => {
    // setTravelClaimJson(dispatch, ids.row);

    console.log("HI");
    SearchedData.forEach((itemi) => {
      itemi.claimTransactionDTO.forEach((itemj) => {
        if (ids.row.transactionNo === itemj.transactionNumber) {
          setTravelClaimJson(dispatch, { ...itemi, claimTransactionDTO: [{ ...itemj }] });
          console.log(itemj);
          console.log(itemi);
          console.log({ ...itemi, claimTransactionDTO: [{ ...itemj }] });
          setBodyFlag(true);
        }
      });
    });
  };

  const [value, setValue] = useState({ item: { label: "Claim Details" } });
  const [content, setContent] = useState(<ClaimDetails />);
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log("newValue", newValue);
  };

  useEffect(() => {
    if (value.item) if (value.item.content) setContent(value.item.content);
    console.log("value", value.item);
  }, [value]);

  useEffect(async () => {
    const result = await GetMasterData();
    result.forEach((item) => {
      if (item.mType === "Travel Claim Category") {
        setMasterClaimCategory(item.mdata);
        console.log(MasterClaimCategory);
      }
      if (item.mType === "SubType") {
        setMasterClaimSubType(item.mdata);
      }
    });
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      {BodyFlag || TravelEnquiryFlag ? (
        <Card sx={{ borderRadius: 0 }}>
          <Grid container>
            <Grid item xl={12} md={12} xxl={12}>
              <Stack direction="row" spacing={3} m={3}>
                <MDTypography variant="body1" color="primary">
                  Policy Number : {TravelClaimJson.policyNo}
                </MDTypography>
                <MDTypography variant="body1" color="primary">
                  Claim Number : {TravelClaimJson.claimNumber}
                </MDTypography>
              </Stack>
            </Grid>
            <Grid item xl={2.5} md={2.5} xxl={2.5}>
              <TravelProcessingSideMenu handleChange={handleChange} setContent={setContent} />
            </Grid>
            <Grid item xl={9.5} md={9.5} xxl={9.5}>
              {/* <MDTypography sx={{ backgroundColor: "#ceebff" }}>{value.item.label}</MDTypography> */}
              {content}
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Claim Processing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Policy Number"
                  name="policyNo"
                  value={SearchObj.policyNo}
                  onChange={(e) => onChangeSearch(e)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Claim Number"
                  name="claimNo"
                  value={SearchObj.claimNo}
                  onChange={(e) => onChangeSearch(e)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
               <MDInput
                 label="Transaction Number "
                 name="transactionNumber"
                 value={SearchObj.transactionNumber}
                 onChange={(e) => onChangeSearch(e)}
               />
             </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton onClick={onClickSearch}>SEARCH</MDButton>
              </Grid>
              {timer ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </MDBox>
                </Grid>
              ) : (
                ""
              )}
              {TableFlag ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {/* <MDBox sx={{ width: "100%" }}>
                   <DataGrid
                     autoHeight
                     rows={SearchedData}
                     columns={Tablecolumns}
                     pageSize={5}
                     rowsPerPageOptions={[5]}
                     disableSelectionOnClick
                     experimentalFeatures={{ newEditingApi: true }}
                     components={{ Toolbar: GridToolbar }}
                     editField="inEdit"
                     // checkboxSelection
                     getRowId={(row) => row.claimNumber}
                     onRowClick={(ids) => onHandelClaim(ids)}
                   />
                 </MDBox> */}
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
                      onRowClick={(ids) => onHandelClaim1(ids)}
                    />
                  </MDBox>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </MDBox>
  );
}

export default ClaimProcessing;
