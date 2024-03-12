import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { postRequest } from "core/clients/axiosclient";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
// import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import { HandleDownload, sendPolicyPdf } from "./data";

function COI() {
  const [SearchObj, setSearchObj] = useState({
    flag: false,
    quoteNumber: "",
    proposalnumber: "",
    policynumber: "",
    eventId: "",
    productId: 769,
    partnerId: "",
    mobileNumber: "",
    email: "",
    insuredreference: "",
    customerName: "",
    customerDOB: "",
    eventDate: "",
    policyStatus: "",
  });
  const [Rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(Rows, "Rows");
  const [loading, setLoading] = useState(false);
  // const [selectedRowData, setSelectedRowData] = useState([]);
  // const [CSVarr, setCSVarr] = useState([]);
  const [data, setdata] = useState([]);
  const callRetrieveMethod = async (jsonValue) => {
    try {
      const proposal = await postRequest(`Policy/PolicySearch`, jsonValue);
      return proposal;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  const callPolicysearch = () => {
    callRetrieveMethod(SearchObj).then((result) => {
      console.log("Responsedata", result);

      if (result.status === 200) {
        setdata(result.data);
        console.log(data);
        // setFlag(true);
      }
    });
  };
  const Tablecolumns = [
    {
      field: "policyNo",
      headerName: "Policy Number.",
      width: 270,
    },
    {
      field: "policyStartDate",
      headerName: "Policy Start Date.",
      width: 250,
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date.",
      width: 250,
    },
    {
      field: "premiumAmount",
      headerName: "Total Premium",
      width: 170,
    },
    {
      field: "masterPolicyNo",
      headerName: "Master Policy Number",
      width: 250,
    },
    {
      field: "insuredName",
      headerName: "Customer Name",
      width: 250,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 250,
    },
    {
      field: "bankName",
      headerName: "No Of Members",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (param) => {
        console.log(param);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
        const handleAction = () => {
          handleClose();
          console.log("1234", param.row.policyNo);
          HandleDownload(param.row.policyNo);
        };
        const handleAction1 = () => {
          handleClose();
          console.log("1234", param.row.email);
          sendPolicyPdf(param.row.policyNo, param.row.email);
          HandleDownload(param.row.policyNo);
        };
        return (
          <div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleAction}>Download Policy</MenuItem>
              <MenuItem onClick={handleAction1}>Email Policy</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`/Chomp`);
  };

  const onHandelToDate = (e) => {
    setSearchObj({ ...SearchObj, [e.target.name]: e.target.value });

    console.log(SearchObj);
  };
  const onSearch = async () => {
    setLoading(true);
    //  const data = await GetClaimTransactionFinanceBankData({ SearchObj });
    callPolicysearch();

    setRows(data.data);
    setLoading(false);
    console.log("rrr", Rows);
    console.log("data11", 1);
  };

  // const onSelectRows = (ids) => {
  //   const selectedIDs = new Set(ids);
  //   setSelectedRowData(Rows.filter((row) => selectedIDs.has(row.transactionNumber.toString())));
  //   const selectArr = Rows.filter((row) => selectedIDs.has(row.transactionNumber.toString()));
  //   console.log("selectedRowData", selectedRowData);

  //   selectArr.forEach((row) => {
  //     CSVarr.push({
  //       BankFileId: row.bankFileId,
  //       PolicyNo: row.policyNo,
  //       ClaimNo: row.claimNo,
  //       TransactionNumber: row.transactionNumber,
  //       ClaimStatus: row.claimStatus,
  //       InsuredName: row.insuredName,
  //       InsuredRefNo: row.insuredRefNo,
  //       BankAccountHolderName: row.bankAccountHolderName,
  //       BankName: row.bankName,
  //       BankAccountNumber: row.bankAccountNumber,
  //       BankBranchAddress: row.bankBranchAddress,
  //       BankIFSCCode: row.bankIfsccode,
  //       Amount: row.amount,
  //       UTRNo: row.utrno,
  //       PaymentStatus: row.paymentStatus,
  //       PaymentDate: "",
  //       PaymentType: "",
  //       PaymentMethod: "",
  //       ReferenceNumber: "",
  //       ClaimSubmittedBy: "",
  //     });
  //     setCSVarr(CSVarr);
  //     console.log("csvarr", CSVarr);
  //   });
  // };

  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="h4" sx={{ color: "red" }}>
            Search Policies
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDButton onClick={handleProceed} sx={{ marginLeft: 40 }}>
            + Create COI
          </MDButton>
        </Grid>
      </Grid>

      <Accordion defaultExpanded expandIcon={<ExpandMoreIcon />}>
        <AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  name="policynumber"
                  label="Policy Number"
                  fullWidth
                  value={SearchObj.policynumber}
                  onChange={onHandelToDate}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  name="MasterPolicyNo"
                  label="Master Policy Number"
                  fullWidth
                  value={SearchObj.MasterPolicyNo}
                  onChange={onHandelToDate}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  value={SearchObj.customerName}
                  onChange={onHandelToDate}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  name="mobileNumber"
                  label="Mobile Number"
                  fullWidth
                  value={SearchObj.mobileNumber}
                  onChange={onHandelToDate}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                fullWidth
                value={SearchObj.toDate === "" ? " " : new Date(SearchObj.toDate)}
                input={{ label: "To Date", name: "toDate" }}
                onChange={(e, date) => onHandelToDate(e, date)}
                options={{ dateFormat: "Y-m-d", altFormat: "Y-m-d" }}
              />
            </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton onClick={onSearch}>SEARCH</MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={data}
                    columns={Tablecolumns}
                    checkboxSelection
                    loading={loading}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.policyId}
                    // onSelectionModelChange={(ids) => onSelectRows(ids)}

                    // onRowClick={(ids) => onHandelMemberDetails(ids)}
                    // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                  />
                </MDBox>
              </Grid>
              <Grid container>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onDownload}>DOWNLOAD EXCEL</MDButton>
                </MDBox>
              </Grid> */}
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <CSVLink
                    data={CSVarr}
                    headers={headers}
                    filename="download.xlsx"
                    onClick={onDownload}
                  >
                    DOWNLOAD EXCEL
                  </CSVLink>
                </MDBox>
              </Grid> */}
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDButton
                  // onClick={(e) => {
                  //   downloadxls(e, CSVarr);
                  // }}
                  >
                    Download Excel
                  </MDButton>
                </MDBox>
              </Grid> */}
              </Grid>
            </Grid>
          </AccordionDetails>
        </AccordionSummary>
      </Accordion>
    </MDBox>
  );
}
export default COI;
