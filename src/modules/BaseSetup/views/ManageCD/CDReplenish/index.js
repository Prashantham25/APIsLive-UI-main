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
import swal from "sweetalert";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import ReplenishCDAc from "assets/images/Replenish.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "../../../../../components/MDBox/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import MDButton from "../../../../../components/MDButton/index";
import CDObj from "../data/jsonData";
import {
  GetMasterDataAsynconPartner,
  GetMasterDataAsynconPartnerIDandProduct,
  SearchCDAccountmethod,
  ReplenishAccountmethod,
  GetMasterDataAsynconPaymentMode,
} from "../data/index";

function CDReplenish() {
  const [partnerdata, setpartnerdata] = useState([]);

  const helperText = "This field  is Required";
  const [paymentdata, setpaymentdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [post, setPost] = useState([]);
  // const [key, setkey] = useState([]);
  const [show, setShow] = useState(false);
  const [statement, setstatement] = useState(false);
  const [Replenish, setreplenish] = useState(false);

  const [Saveflag, setSaveflag] = useState(false);
  const [ObjReplData, setObjReplData] = useState({ ...CDObj });

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
    if (
      ObjReplData.ReplenishCD.partnerId !== "" &&
      ObjReplData.ReplenishCD.productId !== "" &&
      ObjReplData.ReplenishCD.cob !== "" &&
      ObjReplData.ReplenishCD.lob !== ""
    ) {
      const Data = await SearchCDAccountmethod(ObjReplData.ReplenishCD);

      if (Data.data.length > 0) {
        ObjReplData.ReplenishCD.accountNo = Data.data[0].accountNo;
        setObjReplData({ ...ObjReplData });

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
        icon: "error",
        text: "Some Fields are Missing",
      });
    }
  };

  const replenishsubmit = async () => {
    if (
      ObjReplData.ReplenishCD.paymentModeId !== "" &&
      ObjReplData.ReplenishCD.paymentRefernceId !== "" &&
      ObjReplData.ReplenishCD.txnAmount !== ""
    ) {
      const Data = await ReplenishAccountmethod(ObjReplData.ReplenishCD).then((response) => {
        if (response.data.status === 2) {
          const Tarr = response.data.cdReplnish;
          Tarr.forEach((x, i) => {
            const tt = x.transactionDate.split("T")[0];
            const newtt = tt.split("-").reverse().join("-");
            console.log("ttttttttt", tt);
            Tarr[i].srNo = i + 1;
            Tarr[i].transactionDate = newtt;
          });
          setPost(Tarr);

          // setPost(response.data.cdReplnish[0].transactionDate.split("T")[0]);
          console.log("aaaaaaaaaaaaa", response);
          setstatement(true);

          swal({
            icon: "success",
            text: response.data.responseMessage,
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
        } else if (response.data.status === 8) {
          swal({
            icon: "error",
            text: response.data.responseMessage,
          });
        } else {
          swal({ text: "Try Again", icon: "error" });
        }
      });

      console.log("submitresponse", Data);
    } else {
      setSaveflag(true);
      swal({
        icon: "error",
        text: "Some Feilds are Missing",
      });
    }
  };
  console.log("DATAGRIDdata", post);

  // const getstatement = async () => {
  //   const STData = await SearchCdTransactionAsyncmethod(myjsonobj).then((response) => {
  //     setPost(response.data);
  //     console.log("DATAGRIDdata", post);
  //     setstatement(true);
  //   });

  //   console.log("statementdata", STData);
  // };

  const handleRepllensih = () => {
    setreplenish(true);
  };
  const DataChange = (e) => {
    ObjReplData.ReplenishCD[e.target.name] = e.target.value;
    if (e.target.name === "paymentRefernceId") {
      ObjReplData.ReplenishCD.paymentRefernceId = e.target.value;
      console.log("33", ObjReplData);
    } else if (e.target.name === "bankName") {
      ObjReplData.ReplenishCD.bankName = e.target.value;
      console.log("33", ObjReplData);
    } else if (e.target.name === "txnAmount") {
      ObjReplData.ReplenishCD.txnAmount = e.target.value;
      console.log("33", ObjReplData);
    }
    setObjReplData({ ...ObjReplData });
  };
  const handleSetAutoComplete = async (e, type, value) => {
    if (type === "partnerId") {
      ObjReplData.ReplenishCD.partnerId = value.mID;
      ObjReplData.ReplenishCD.partnerName = value.mValue;
      console.log("partnerdetailsfilled", ObjReplData.ReplenishCD);
      const productonpartner = await GetMasterDataAsynconPartnerIDandProduct(value.mID);
      console.log("productdata", productonpartner);
      setproductdata([...productonpartner.data[0].mdata]);
    } else if (type === "productId") {
      ObjReplData.ReplenishCD.productId = value.mID;
      ObjReplData.ReplenishCD.productName = value.mValue;
      ObjReplData.ReplenishCD.cob = value.cob;
      ObjReplData.ReplenishCD.lob = value.lob;
      console.log("productdetailsfilled", ObjReplData.ReplenishCD);
    } else if (type === "paymode") {
      ObjReplData.ReplenishCD.paymentModeId = value.mID;

      console.log("productdetailsfilled", ObjReplData.ReplenishCD);
    }
    setObjReplData({ ...ObjReplData });
  };

  useEffect(async () => {
    await GetMasterDataAsynconPartner().then((result) => {
      setpartnerdata([...result.data[0].mdata]);
    });
    console.log("partnerdata", partnerdata);
  }, []);
  useEffect(async () => {
    await GetMasterDataAsynconPaymentMode().then((result) => {
      console.log("rrrrrrrrrrrrrrrr", result);
      setpaymentdata([...result.data[6].mdata]);
    });
  }, []);
  console.log("paymentfetcheddata", paymentdata);

  const card = (
    <CardContent>
      <Stack direction="row" justifyContent="space-between">
        <MDTypography variant="h6">Partner Number: </MDTypography>
        <MDTypography variant="h6"> {ObjReplData.ReplenishCD.accountNo}</MDTypography>
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
              <MDBox component="img" src={ReplenishCDAc} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            Replenish CD Account
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={partnerdata}
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
                    error={Saveflag && ObjReplData.ReplenishCD.partnerId === ""}
                    helperText={
                      Saveflag && ObjReplData.ReplenishCD.partnerId === "" ? helperText : ""
                    }
                  />
                )}
                onChange={(e, value) => handleSetAutoComplete(e, "partnerId", value)}
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
                    error={Saveflag && ObjReplData.ReplenishCD.productId === ""}
                    helperText={
                      Saveflag && ObjReplData.ReplenishCD.productId === "" ? helperText : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Line of Business"
                value={ObjReplData.ReplenishCD.lob}
                error={Saveflag && ObjReplData.ReplenishCD.lob === ""}
                helperText={Saveflag && ObjReplData.ReplenishCD.lob === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Class of Business"
                value={ObjReplData.ReplenishCD.cob}
                error={Saveflag && ObjReplData.ReplenishCD.cob === ""}
                helperText={Saveflag && ObjReplData.ReplenishCD.cob === "" ? helperText : ""}
              />
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
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} my={2}>
                  <Stack justifyContent="center" direction="row">
                    <MDButton onClick={handleRepllensih}>Replenish</MDButton>
                  </Stack>
                </Grid>
                {Replenish && (
                  <>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        fullWidth
                        options={paymentdata}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Select Mode"
                            error={Saveflag && ObjReplData.ReplenishCD.paymentModeId === ""}
                            helperText={
                              Saveflag && ObjReplData.ReplenishCD.paymentModeId === ""
                                ? helperText
                                : ""
                            }
                          />
                        )}
                        onChange={(e, value) => handleSetAutoComplete(e, "paymode", value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Payment Reference Id"
                        value={ObjReplData.ReplenishCD.paymentRefernceId}
                        name="paymentRefernceId"
                        onChange={DataChange}
                        error={Saveflag && ObjReplData.ReplenishCD.paymentRefernceId === ""}
                        helperText={
                          Saveflag && ObjReplData.ReplenishCD.paymentRefernceId === ""
                            ? helperText
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Bank Name"
                        value={ObjReplData.ReplenishCD.bankName}
                        name="bankName"
                        onChange={DataChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Transaction amount"
                        value={ObjReplData.ReplenishCD.txnAmount}
                        name="txnAmount"
                        onChange={DataChange}
                        error={Saveflag && ObjReplData.ReplenishCD.txnAmount === ""}
                        helperText={
                          Saveflag && ObjReplData.ReplenishCD.txnAmount === "" ? helperText : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} my={2}>
                      <Stack justifyContent="center" direction="row">
                        <MDButton onClick={replenishsubmit}>Submit</MDButton>
                      </Stack>
                    </Grid>
                  </>
                )}
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
                    getRowId={(row) => row.txnAmount}
                    rowHeight={80}
                    autoHeight
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
export default CDReplenish;
