import React, { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import View from "assets/images/shield.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "../../../../../components/MDBox/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import MDButton from "../../../../../components/MDButton/index";
import MDDatePicker from "../../../../../components/MDDatePicker/index";
import CDObj from "../data/jsonData";

import {
  GetMasterDataAsynconPartner,
  GetMasterDataAsynconPartnerIDandProduct,
  SearchCDAccountmethod,
  SearchCdTransactionAsyncmethod,
} from "../data/index";

function CDView() {
  const [partnerdata, setpartnerdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [post, setPost] = useState([]);
  const [Saveflag, setSaveflag] = useState(false);
  const [dateflag, setdateflag] = useState(false);

  const helperText = "This field  is Required";
  const [show, setShow] = useState(false);
  const [partnername, setpartnername] = useState("");
  const [idflag, setidflag] = useState(false);
  const [statement, setstatement] = useState(false);
  const [ObjViewData, setObjViewData] = useState({ ...CDObj });

  const [view, setview] = useState({
    initialAmount: "",
    availableBalance: "",
  });

  const columns = [
    {
      field: "srNo",
      headerName: "Sr.No.",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "transactionDate",
      headerName: "Trans-Date",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: " Description",
      width: 400,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      align: "center",
    },
    {
      field: "initialAmount",
      headerName: "Opening Balance",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "txnType",
      headerName: "Trans-Type",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,

      align: "center",
    },
    {
      field: "txnAmount",
      headerName: "Trans-Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "availableAmount",
      headerName: "Closing Balance",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
  ];

  const searchcdmethod = async () => {
    const Data = await SearchCDAccountmethod(ObjViewData.ViewCD);
    if (ObjViewData.ViewCD.partnerId !== "" && ObjViewData.ViewCD.productId !== "") {
      if (Data.data.length > 0) {
        ObjViewData.ViewCD.accountNo = Data.data[0].accountNo;
        setObjViewData({ ...ObjViewData });

        view.initialAmount = Data.data[0].initialAmount;
        view.availableBalance = Data.data[0].availableBalance;
        setview({ ...view });
        console.log("ppdata", Data);
        setShow(true);
        console.log("showorno", show);
      } else {
        swal({
          icon: "error",
          text: "CD Account does not exist for this partner",
        });
      }
    } else {
      setSaveflag(true);
      swal({
        text: "Some Fields are missing",
        icon: "error",
      });
    }
  };

  const getstatement = async () => {
    if (ObjViewData.ViewCD.fromDate !== "" && ObjViewData.ViewCD.toDate !== "") {
      const STData = await SearchCdTransactionAsyncmethod(ObjViewData.ViewCD).then((response) => {
        if (response.data.length > 0) {
          const Tarr = response.data;
          Tarr.forEach((x, i) => {
            const tt = x.transactionDate.split("T")[0];
            const newtt = tt.split("-").reverse().join("-");
            console.log("ttttttttt", tt);
            Tarr[i].srNo = i + 1;
            Tarr[i].transactionDate = newtt;
          });
          setPost(Tarr);
          // setPost(response.data.transactionDate.split("T")[0]);
          console.log("DATAGRIDdata", post);
          console.log("hhhhhhhhhhh", Tarr);
          setstatement(true);
        } else {
          swal({
            icon: "error",
            text: "No CD Account Found",
            buttons: {
              buttonTwo: {
                text: "OK",
                value: "Confirm",
                visible: true,
              },
            },
          }).then((value) => {
            if (value === "Confirm") {
              window.location.reload();
            }
          });
        }
      });
      console.log("statementdata", STData);
    } else {
      setdateflag(true);
      swal({
        text: "Please select From and To date",
        icon: "error",
      });
    }
  };
  const handleSetAutoComplete = async (e, type, value) => {
    if (type === "partnerId") {
      ObjViewData.ViewCD.partnerId = value.mID;
      // ObjViewData.ViewCD.partnerName = value.mValue;
      setpartnername(value.mValue);

      console.log("partnerdetailsfilled", ObjViewData);
      const productonpartner = await GetMasterDataAsynconPartnerIDandProduct(value.mID);

      console.log("productdata", productonpartner);
      setproductdata([...productonpartner.data[0].mdata]);
      setObjViewData(() => ({ ...ObjViewData }));
    } else if (type === "productId") {
      ObjViewData.ViewCD.productId = value.mID;
      ObjViewData.ViewCD.productName = value.mValue;
      ObjViewData.ViewCD.cob = value.cob;
      ObjViewData.ViewCD.lob = value.lob;
      console.log("productdetailsfilled", ObjViewData.ViewCD);
      setObjViewData(() => ({ ...ObjViewData }));
    }
  };

  useEffect(() => {
    partnerdata.forEach((item) => {
      if (ObjViewData.ViewCD.partnerId === item.mID) {
        setpartnername(item.mValue);
      }
    });
  }, [partnerdata]);

  useEffect(async () => {
    const LoadID = localStorage.getItem("partnerId");

    console.log("loadingid", LoadID);

    const result = await GetMasterDataAsynconPartner();
    setpartnerdata([...result.data[0].mdata]);

    if (LoadID > 0) {
      ObjViewData.ViewCD.partnerId = LoadID;

      result.data[0].mdata.forEach((x) => {
        if (x.mID.toString() === LoadID) setpartnername(x.mValue);
      });
      // partnerdata.filter((x) => x.mID === LoadID)[0].mID;
      setObjViewData(() => ({ ...ObjViewData }));

      console.log("itsmore");

      setidflag(true);
    }
  }, []);
  const card = (
    <CardContent>
      <Stack direction="row" justifyContent="space-between">
        <MDTypography variant="h6">Account Number: </MDTypography>
        <MDTypography variant="h6"> {ObjViewData.ViewCD.accountNo}</MDTypography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <MDTypography variant="h6">Initial Amount:</MDTypography>
        <MDTypography variant="h6"> {view.initialAmount}</MDTypography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <MDTypography variant="h6">Available Balance:</MDTypography>
        <MDTypography variant="h6"> {view.availableBalance}</MDTypography>
      </Stack>
    </CardContent>
  );
  const onDateChange = async (e, type, date) => {
    if (type === "fromDate") {
      ObjViewData.ViewCD.fromDate = date;
      console.log("productdetailsfilled", ObjViewData);
      setObjViewData(() => ({ ...ObjViewData }));
    } else if (type === "toDate") {
      ObjViewData.ViewCD.toDate = date;
      console.log("productdetailsfilled", ObjViewData);
      setObjViewData(() => ({ ...ObjViewData }));
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
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
              }}
            >
              <MDBox component="img" src={View} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            View CD Account
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={partnerdata}
                value={{ mValue: partnername }}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Partner Name"
                    error={Saveflag && ObjViewData.ViewCD.partnerId === ""}
                    helperText={Saveflag && ObjViewData.ViewCD.partnerId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, value) => handleSetAutoComplete(e, "partnerId", value)}
                disabled={idflag}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={productdata}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                // value={}
                onChange={(e, value) => handleSetAutoComplete(e, "productId", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Product Name"
                    error={Saveflag && ObjViewData.ViewCD.productId === ""}
                    helperText={Saveflag && ObjViewData.ViewCD.productId === "" ? helperText : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Line of Business" value={ObjViewData.ViewCD.lob} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Class of Business" value={ObjViewData.ViewCD.cob} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row">
                <MDButton onClick={searchcdmethod}>Search</MDButton>
              </Stack>
            </Grid>
            {show && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Card variant="outlined">{card}</Card>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ mt: 2 }}>
                  <MDDatePicker
                    fullWidth
                    input={{ label: "From Date", value: ObjViewData.ViewCD.fromDate }}
                    value={ObjViewData.ViewCD.fromDate}
                    onChange={(e, date) => onDateChange(e, "fromDate", date)}
                    options={{
                      altInput: true,
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                    }}
                    error={dateflag && ObjViewData.ViewCD.fromDate === ""}
                    helperText={dateflag && ObjViewData.ViewCD.fromDate === "" ? helperText : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ mt: 2 }}>
                  <MDDatePicker
                    fullWidth
                    input={{ label: "To Date", value: ObjViewData.ViewCD.toDate }}
                    value={ObjViewData.ViewCD.toDate}
                    onChange={(e, date) => onDateChange(e, "toDate", date)}
                    options={{
                      altInput: true,
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                    }}
                    error={dateflag && ObjViewData.ViewCD.toDate === ""}
                    helperText={dateflag && ObjViewData.ViewCD.toDate === "" ? helperText : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} my={2}>
                  <Stack justifyContent="center" direction="row">
                    <MDButton onClick={getstatement}>Get Statement</MDButton>
                  </Stack>
                </Grid>
              </>
            )}

            {statement && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ my: 2 }}>
                <MDBox
                // sx={{
                //   width: "100%",
                //   "& .super-app-theme--header": {
                //     backgroundColor: "#e0e0e0",
                //   },
                // }}
                >
                  <DataGrid
                    rows={post}
                    getRowId={(row) => row.srNo}
                    rowHeight={80}
                    autoHeight
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
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
export default CDView;
