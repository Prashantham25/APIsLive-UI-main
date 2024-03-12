import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
// import { getRequest } from "../../../core/clients/axiosclient";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";
// import MDTypography from "../../../components/MDTypography";
import {
  SeachClaimTransactions,
  GetPolicyInfoByPolicyNumber,
  GetProductById,
} from "./TravelClaims/data/index";
import {
  setTravelClaimJson,
  useDataController,
  setToplevelClaimFlag,
} from "../../BrokerPortal/context";

function TopLevelProcessing() {
  const [, dispatch] = useDataController();
  const [SearchObj, setSearchObj] = useState({ claimNo: "", policyNo: "", transactionNumber: "" });
  const [timer, setTimer] = useState(false);
  const [rows, setRows] = useState([]);
  const [tableFlag, setTableFlag] = useState(false);
  const navigate = useNavigate();

  const [SearchedData, setSearchedData] = useState([]);
  const [lob, setLob] = useState("");

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
      width: 150,
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

  const onChangeSearch = (e) => {
    setSearchObj({ ...SearchObj, [e.target.name]: e.target.value });
  };

  const onClickSearch = async () => {
    setTimer(true);
    setTableFlag(false);
    const Data = await SeachClaimTransactions({ SearchObj });
    setSearchedData(Data);

    if (Data.length === 0) {
      //   setTableFlag(false);
      swal({
        html: true,
        icon: "error",
        title: "No Record found",
        text: "Enter valid Data",
      });
    } else {
      const PolicyNumber = Data[0].policyNo;
      const data1 = await GetPolicyInfoByPolicyNumber(PolicyNumber);
      const data2 = await GetProductById(data1.productIdPk);
      console.log("lob1", data2.loB1);
      setLob(data2.loB1);

      setTimer(false);
      console.log("Claim Process", Data);

      const arr = [];

      if (SearchObj.transactionNumber !== "") {
        console.log("arrrr", rows);
      } else if (SearchObj.claimNo !== "") {
        Data.forEach((itemi) => {
          itemi.claimTransactionDTO.forEach((itemj) => {
            if (data2.loB1 === "Motor")
              arr.push({
                transactionNo: itemj.transactionNumber,
                claimNumber: itemi.claimNumber,
                status: itemj.status,
                // claimType: itemj.transactionDetailsDto.claimCategory,
                // claimSubType: itemj.transactionDetailsDto.claimSubType,
              });
            else
              arr.push({
                travelStartDate: itemi.basicDetails.claimDetails.travelStartDate,
                travelEndDate: itemi.basicDetails.claimDetails.travelEndDate,
                transactionNo: itemj.transactionNumber,
                claimNumber: itemi.claimNumber,
                status: itemj.status,
                claimType: itemj.transactionDetailsDto.claimCategory,
                claimSubType: itemj.transactionDetailsDto.claimSubType,
              });
          });
        });
        setRows([...arr]);
      } else if (SearchObj.policyNo !== "") {
        Data.forEach((itemi) => {
          itemi.claimTransactionDTO.forEach((itemj) => {
            arr.push({
              travelStartDate: itemi.basicDetails.claimDetails.travelStartDate,
              travelEndDate: itemi.basicDetails.claimDetails.travelEndDate,
              transactionNo: itemj.transactionNumber,
              claimNumber: itemi.claimNumber,
              status: itemj.status,
              claimType:
                itemj.transactionDetailsDto.claimCategory === "48"
                  ? "Reimbursement"
                  : "Cashless Claim",
              claimSubType: itemj.transactionDetailsDto.claimSubType,
            });
          });
        });
        setRows([...arr]);
      }

      console.log("arrrr", rows);
      setTableFlag(true);
    }
  };

  const onHandelClaim1 = async (ids) => {
    // setTravelClaimJson(dispatch, ids.row);

    // if (SearchObj.policyNo !== "") {
    //   if (SearchObj.policyNo.length === 13) console.log("Travel");
    //   if (SearchObj.policyNo.length > 17) console.log("Health");
    //   if (false) console.log("Motor");
    // } else if (SearchObj.claimNo !== "") {
    //   if (Number.isInteger(parseInt(SearchObj.claimNo, 10))) console.log("Travel");
    //   //   if (SearchObj.claimNo.length > 17) console.log("Health");
    //   //   if (false) console.log("Motor");
    // } else {
    //   swal({ icon: "error", text: "Something Error, tre again" });
    // }
    console.log("HI");
    SearchedData.forEach((itemi) => {
      itemi.claimTransactionDTO.forEach((itemj) => {
        if (ids.row.transactionNo === itemj.transactionNumber) {
          setTravelClaimJson(dispatch, { ...itemi, claimTransactionDTO: [{ ...itemj }] });
          //   console.log(itemj);
          //   console.log(itemi);
          console.log({ ...itemi, claimTransactionDTO: [{ ...itemj }] });
          if (lob === "Travel") {
            console.log("Travel");
            navigate(`/Claims/Processing`);
          } else if (lob === "Health") {
            console.log("Health");
            navigate(`/HealthClaims/Processing`);
          } else if (lob === "Motor") {
            console.log("Motor");
            navigate(`/Claims/MotorProcessing`);
          }
          setToplevelClaimFlag(dispatch, true);
          //   setHeaderDetails({ PolicyNumber: itemi.policyNo, ClaimNumber: ids.row.claimNumber });
          //   setBodyFlag(true);

          //   MasterLob.forEach((x) => {
          //     if (x.mID === lob) console.log(1112111, x.mValue);
          //   });
        }
      });
    });
  };
  return (
    <MDBox>
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

            {tableFlag && (
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
                    getRowId={(row) => row.transactionNo}
                    onRowClick={(ids) => onHandelClaim1(ids)}
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
export default TopLevelProcessing;
