import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import {
  Grid,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Swal from "sweetalert2";
import POSPAAdded from "assets/images/BrokerPortal/POSPAAdded.png";
import { GenericApi, CreatePartner, SaveProductMasterPolicy } from "./data/index";

function MasterPolicySetup() {
  const navigate = useNavigate();
  const [masterPolicyNo, setMasterPolicyNo] = useState("");
  const numRegex = /^[A-Z0-9'//]*$/;
  const [policyHolderName, setPolicyHolderName] = useState("");
  const alphaSpaceRegex = /^[A-Za-z\s./]+$/;
  const [customerID, setCustomerID] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    masterPolicyNo: false,
    policyHolderName: false,
  });
  const [objMapperDto, setObjMapperDto] = useState({
    GetMasterPolicyDetailsResult: "",
  });
  const [partnerDto, setPartnerDto] = useState({
    BranchCode: "",
    BranchName: "",
    SalesPersonCode: "",
    SalesPersonName: "",
    cinnumber: "",
    email: "",
    fax: "",
    gst: true,
    gstnumber: "",
    isActive: true,
    mobile: "",
    pan: "",
    pannumber: "",
    partnerAddress: [
      {
        partnerAddressLine1: "",
        partnerAddressLine2: "",
        partnerAddressLine3: "",
        partnerAddressType: "",
        partnerCityId: 846,
        partnerCountryId: 1,
        partnerDistrictId: 65,
        partnerPincodeId: 10235,
        partnerStateId: 17,
      },
    ],
    partnerAddressLine1: "",
    partnerAddressLine2: "",
    partnerAddressLine3: "",
    partnerCityId: "",
    partnerClassId: 10,
    partnerCode: "",
    partnerCountryId: "",
    partnerDetails: "",
    partnerDistrictId: "",
    partnerName: "",
    partnerPincodeId: "",
    partnerStateId: "",
    partnerTypeId: 8,
    salutationId: 13,
    // salutationId: 13,
    telephone: "",
    website: "",
  });

  const [saveMasterPolicyDto, setsaveMasterPolicyDto] = useState({
    assignProductID: 0,
    partnerId: "", // create partner
    productId: 0,
    assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
    effectiveFrom: "", // policy start date
    effectiveTo: "", // policy end date
    isActive: true,
    createBy: "",
    createDate: moment(new Date()).format("YYYY-MM-DD"), // date
    modifiedBy: "",
    modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
    isPaymentReceived: true,
    lstProductId: [
      [
        {
          ProductId: 1022,
          SectionMapping: {
            MappedSections: [
              {
                GroupID: "",
                GroupType: 105,
                GroupName: "",
              },
            ],
          },
          MasterPolicy: "true",
          MasterPolicyDetails: "",
        },
      ],
    ],
  });

  const handleRedirectToMasterPolicy = async () => {
    const newErrors = {
      masterPolicyNo: masterPolicyNo === "",
      policyHolderName: policyHolderName === "",
    };
    setErrors(newErrors);
    if (masterPolicyNo !== "" && policyHolderName !== "") {
      const request = {
        AuthenticateKey: "",
        CustomerID: customerID,
        MasterPolicyNo: masterPolicyNo,
        MasterPolicyHolderName: policyHolderName,
      };
      setLoading(true);
      const saveGcData = await GenericApi(
        "MagmaHospiCash01",
        "Magma_MP_SaveMasterPolicyDetail",
        request
      );
      console.log("SaveGcDataaa", saveGcData);
      if (
        saveGcData &&
        saveGcData.finalResult &&
        saveGcData.finalResult.message === "MasterPolicy details saved successfully!"
      ) {
        partnerDto.mobile = saveGcData.finalResult.MobileNo;
        partnerDto.email = saveGcData.finalResult.PrimaryEmailID;
        partnerDto.website = saveGcData.finalResult.OtherEmailID;
        partnerDto.pan = saveGcData.finalResult.PANNO;
        partnerDto.partnerName = saveGcData.finalResult.FirstName;
        partnerDto.partnerAddress[0].partnerAddressLine1 =
          saveGcData.finalResult.HomeOfficeAddress.AddressLine1;
        partnerDto.partnerAddress[0].partnerAddressLine2 =
          saveGcData.finalResult.HomeOfficeAddress.AddressLine2;
        partnerDto.partnerAddress[0].partnerAddressLine3 =
          saveGcData.finalResult.HomeOfficeAddress.AddressLine3;
        setPartnerDto(partnerDto);
        const createpartner = await CreatePartner(partnerDto);
        console.log("Createeeeeee", createpartner);
        saveMasterPolicyDto.partnerId = createpartner.data.id;

        objMapperDto.GetMasterPolicyDetailsResult = saveGcData.finalResult;
        setObjMapperDto(objMapperDto);
        const MasterPolicyDto = await GenericApi(
          "MagmaHospiCash01",
          "Magma_GC_SaveMasterPolicy",
          objMapperDto
        );
        console.log("jsonnnn", MasterPolicyDto.finalResult);
        // Formatted, because SaveProductMasterPolicy API was failed while click on Fetch MP
        const PolicyStartDate = moment(
          MasterPolicyDto.finalResult.PolicyStartDate,
          "DD/MM/YYYY"
        ).format("MM/DD/YYYY");
        const PolicyEndDate = moment(
          MasterPolicyDto.finalResult.PolicyEndDate,
          "DD/MM/YYYY"
        ).format("MM/DD/YYYY");
        MasterPolicyDto.finalResult.PlanDetailsJson = [];
        MasterPolicyDto.finalResult.operationsStatus = "Pending";
        MasterPolicyDto.finalResult.underWriterStatus = "Pending";
        MasterPolicyDto.finalResult.claimsStatus = "Pending";
        saveMasterPolicyDto.effectiveFrom = PolicyStartDate;
        saveMasterPolicyDto.effectiveTo = PolicyEndDate;
        saveMasterPolicyDto.lstProductId[0][0].MasterPolicyDetails = MasterPolicyDto.finalResult;
        setsaveMasterPolicyDto(saveMasterPolicyDto);
        const saveProductMasterPolicy = await SaveProductMasterPolicy(saveMasterPolicyDto);
        console.log("saveddddd", saveProductMasterPolicy);
        setLoading(false);
        setOpen(true);
      } else if (saveGcData && saveGcData.status === 4) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text: "Master Policy Not Found",
          allowOutsideClick: false,
          showCloseButton: true,
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text: "Master Policy Already Exist",
          allowOutsideClick: false,
          showCloseButton: true,
        });
      }
    }
  };
  const handleViewPlan = () => {
    navigate("/ListOfMaster");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMP = (e) => {
    const input = e.target.value;
    if ((input.length <= 23 && numRegex.test(input)) || input === "") {
      setMasterPolicyNo(input);
    }
  };
  const handleMPHolder = (e) => {
    const holderinput = e.target.value;
    if (alphaSpaceRegex.test(holderinput) || holderinput === "") {
      setPolicyHolderName(holderinput);
    }
  };
  return (
    <Card>
      <MDTypography ml={2}>Fetch Master Policy from GC </MDTypography>
      <Grid container spacing={2} mt={10} mb={5}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={15}>
          <MDInput
            label="Master Policy No"
            name="Master Policy No"
            placeholder="Enter MP No"
            value={masterPolicyNo}
            onChange={handleMP}
          />

          {(!masterPolicyNo && errors.masterPolicyNo) || !numRegex.test(masterPolicyNo) ? (
            <span style={{ color: "red", fontSize: 12 }}>Master Policy No is required</span>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Master Policy Holder Name"
            name="Master Policy Holder Name"
            placeholder="Enter Name"
            value={policyHolderName}
            onChange={handleMPHolder}
          />

          {errors.policyHolderName && policyHolderName === "" ? (
            <span style={{ color: "red", fontSize: 12 }}>
              Master Policy Holder Name is required
            </span>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Customer ID"
            name="Customer ID"
            placeholder="Enter Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" mb={40}>
        <MDButton onClick={handleRedirectToMasterPolicy}>Fetch MP</MDButton>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress />
        </Backdrop>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "730px",
                maxHeight: "380px",
              },
            },
          }}
        >
          <DialogContent>
            <Grid container justifyContent="flex-end">
              <MDButton
                startIcon={<CloseIcon />}
                sx={{ fontSize: "1rem" }}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="text"
                color="black"
                onClick={handleClose}
              />
            </Grid>

            <Grid container justifyContent="center">
              <MDBox
                component="img"
                src={POSPAAdded}
                sx={{ maxHeight: "15.5rem", width: 120, spacing: "0rem", m: "0" }}
                justifyContent="flex-end"
                alignItems="flex-end"
              />
            </Grid>

            <Grid container justifyContent="center">
              <DialogTitle id="alert-dialog-title" sx={{ color: "green", lineHeight: "0" }}>
                Master Policy Fetched Successfully
              </DialogTitle>
            </Grid>

            <Grid container justifyContent="center">
              <DialogTitle id="alert-dialog-title">Master Policy No:{masterPolicyNo}</DialogTitle>
            </Grid>

            <Grid container justifyContent="center">
              <MDButton
                onClick={handleClose}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="outlined"
                color="error"
                ml={25}
              >
                Close
              </MDButton>

              <span style={{ marginRight: "35px" }} />

              <MDButton
                onClick={handleViewPlan}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="contained"
                color="error"
                ml={25}
                mr={3}
              >
                View All MPs
              </MDButton>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </Card>
  );
}

export default MasterPolicySetup;
