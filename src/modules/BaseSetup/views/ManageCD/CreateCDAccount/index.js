import React, { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Backdrop,
  CircularProgress,
  Card,
} from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Security from "assets/images/security.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "../../../../../components/MDBox/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import MDButton from "../../../../../components/MDButton/index";
import CDObj from "../data/jsonData";
import {
  GetMasterDataAsynconPartner,
  GetMasterDataAsynconPartnerIDandProduct,
  CreateCDAccountmethod,
} from "../data/index";

function CreateCDAccount() {
  const [partnerdata, setpartnerdata] = useState([]);
  const [ObjData, setObjData] = useState({ ...CDObj });
  const [Saveflag, setSaveflag] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const helperText = "This field  is Required";
  const [productdata, setproductdata] = useState([]);

  const handleSetAutoComplete = async (e, type, value) => {
    if (type === "partnerId") {
      ObjData.CreateCD.partnerId = value.mID;
      ObjData.CreateCD.partnerName = value.mValue;
      console.log("partnerdetailsfilled", ObjData);
      const productonpartner = await GetMasterDataAsynconPartnerIDandProduct(value.mID);
      console.log("productdata", productonpartner);

      if (productonpartner.data[0].mdata.length >= 0) {
        setproductdata([...productonpartner.data[0].mdata]);
      } else {
        swal({
          text: "Product does not exist for this Partner ",
          icon: "error",
        });

        ObjData.CreateCD.partnerId = "";

        setObjData(() => ({ ...ObjData }));
      }

      ObjData.CreateCD.productId = "";
      ObjData.CreateCD.productName = "";

      ObjData.CreateCD.cob = "";
      ObjData.CreateCD.lob = "";
      ObjData.CreateCD.thresholdValue = "";
      ObjData.CreateCD.dropLimit = "";
      setObjData(() => ({ ...ObjData }));
    } else if (type === "productId") {
      ObjData.CreateCD.productId = value.mID;
      ObjData.CreateCD.productName = value.mValue;
      ObjData.CreateCD.cob = value.cob;
      ObjData.CreateCD.lob = value.lob;
      console.log("productdetailsfilled", ObjData);
      // if (ObjData.CreateCD.partnerId !== "") {
      //   ObjData.CreateCD.cob = "";
      //   ObjData.CreateCD.lob = "";
      //   setObjData(() => ({ ...ObjData }));
      // }

      ObjData.CreateCD.thresholdValue = "";
      ObjData.CreateCD.dropLimit = "";
      setObjData(() => ({ ...ObjData }));
    }
  };

  useEffect(async () => {
    await GetMasterDataAsynconPartner().then((result) => {
      setpartnerdata([...result.data[0].mdata]);
      setOpen(false);
    });
    console.log("partnerdata", partnerdata);
  }, []);

  const handleChangethresh = (e) => {
    if (parseInt(e.target.value, 10) <= 100) {
      ObjData.CreateCD.thresholdValue = e.target.value;
      ObjData.CreateCD.dropLimit = "";
      setObjData(() => ({ ...ObjData }));
      console.log("productdetailsfilled", ObjData);
    } else {
      swal({
        text: "Threshold Limit cannot be greater than 1000% ",
        icon: "error",
      });
    }
  };

  const handleChangedrop = (e) => {
    if (parseInt(ObjData.CreateCD.thresholdValue, 10) >= parseInt(e.target.value, 10)) {
      ObjData.CreateCD.dropLimit = e.target.value;
      setObjData(() => ({ ...ObjData }));
    } else {
      swal({
        text: "Drop limit should not be greater than Threshold limit ",
        icon: "error",
      });
    }

    console.log("productdetailsfilled", ObjData);
  };
  const createCDAccountmethod1 = async () => {
    if (
      ObjData.CreateCD.partnerId !== "" &&
      ObjData.CreateCD.productId !== "" &&
      ObjData.CreateCD.productName !== "" &&
      ObjData.CreateCD.cob !== "" &&
      ObjData.CreateCD.lob !== "" &&
      ObjData.CreateCD.thresholdValue !== "" &&
      ObjData.CreateCD.dropLimit !== ""
    ) {
      const Data = await CreateCDAccountmethod(ObjData.CreateCD);
      console.log("ppdata", Data);

      if (Data.status === 200) {
        swal({
          text: Data.data.responseMessage,
          icon: "success",
        });
        navigate("/home/Dashboard");
      } else if (Data.response.data.status === 8) {
        swal({
          text: Data.response.data.errors[0].errorMessage,
          icon: "error",
        });
      } else if (Data.response.data.status === 4) {
        swal({
          text: Data.response.data.errors[0].errorMessage,
          icon: "error",
        });
      } else if (Data.response.status === 400) {
        swal({
          text: Data.response.data[0].errorMessage,
          icon: "error",
        });
      }
      ObjData.CreateCD.partnerId = "";
      ObjData.CreateCD.productId = "";
      ObjData.CreateCD.productName = "";
      ObjData.CreateCD.cob = "";
      ObjData.CreateCD.lob = "";
      ObjData.CreateCD.thresholdValue = "";
      ObjData.CreateCD.dropLimit = "";
      // swal({
      //   icon: "success",
      //   text: Data.data.responseMessage,
      // });
    } else {
      setSaveflag(true);
      swal({
        text: "Some fields are missing",
        icon: "error",
      });
    }
  };

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <MDBox component="img" src={Security} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            Create CD Account
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
                    error={Saveflag && ObjData.CreateCD.partnerId === ""}
                    helperText={Saveflag && ObjData.CreateCD.partnerId === "" ? helperText : ""}
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
                value={{ mValue: ObjData.CreateCD.productName }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "productId", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Product Name"
                    error={Saveflag && ObjData.CreateCD.productId === ""}
                    helperText={Saveflag && ObjData.CreateCD.productId === "" ? helperText : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Line of Business"
                value={ObjData.CreateCD.lob}
                error={Saveflag && ObjData.CreateCD.lob === ""}
                helperText={Saveflag && ObjData.CreateCD.lob === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Class of Business"
                value={ObjData.CreateCD.cob}
                error={Saveflag && ObjData.CreateCD.cob === ""}
                helperText={Saveflag && ObjData.CreateCD.cob === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Threshold Limit(%)"
                type="number"
                value={ObjData.CreateCD.thresholdValue}
                onChange={handleChangethresh}
                error={Saveflag && ObjData.CreateCD.thresholdValue === ""}
                helperText={Saveflag && ObjData.CreateCD.thresholdValue === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Drop Limit(%)"
                type="number"
                onChange={handleChangedrop}
                value={ObjData.CreateCD.dropLimit}
                error={Saveflag && ObjData.CreateCD.dropLimit === ""}
                helperText={Saveflag && ObjData.CreateCD.dropLimit === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row">
                <MDButton
                  display="flex"
                  // sx={{
                  //   maxHeight: "1.5rem",
                  //   width: "8rem",
                  //   fontSize: "0.5rem",
                  //   ml: "2rem",
                  //   borderRadius: "0rem",
                  // }}
                  onClick={createCDAccountmethod1}
                >
                  Submit
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default CreateCDAccount;
