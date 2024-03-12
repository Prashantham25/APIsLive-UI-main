import React, { useState, useRef, useEffect } from "react";
// import objectPath from "object-path";
import {
  Grid,
  Stack,
  Card,
  Radio,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import MDTabs from "../../../../PolicyLive/components/Tabs";
import MDTypography from "../../../../../components/MDTypography";
import {
  getPolicySearch,
  getProposalPolicyDetail,
  getEndorsementDetail,
  getClaimDetails,
  getProductById,
  sendEmail,
  getDocumentByType,
} from "./data";
import { data, policyDetailsData, searchTransactionJson, emailJson } from "./data/JsonData";
import PolicyDetails from "./PolicyDetails";
import MemberDetails from "./MemberDetails";
import PlanDetails from "./PlanDetails";
import EndorsementDetails from "./EndorsementDetails";
import ClaimDetails from "./ClaimDetails";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";
// import { GetPolicyDetailsByNumber } from "../../../../PolicyLive/views/Retail/Products/NBRetail/data/APIs/NBTravelApi";

function PolicySearch() {
  debugger; // eslint-disable-line
  const [policyJsonData, setPolicyJsonData] = useState(policyDetailsData);
  const [MemberData, setMemberDetails] = useState([]);
  const [benefitDetails, setBenefitDetails] = useState([]);
  const [endorsementDetails, setEndorsementDetails] = useState([]);
  const [claimsDetails, setClaimsDetails] = useState([]);
  const [ckycData, setCkycData] = useState({
    Docdetails: [],
    CKYCNo: "",
    PanNo: "",
    FatherName: "",
    Pincode: "",
    District: "",
    City: "",
    State: "",
    Address1: "",
    Address2: "",
    // DocName: "",
    // DocType: "",
  });
  const [emailJsonData, setEmailJsonData] = useState(emailJson);
  const [downloadJson, setDownloadJson] = useState({
    refenceNumber: "",
    documentType: "",
    emailId: "",
  });
  const [respMessage, setRespMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [policySearchJson, setPolicySearchJson] = useState(data);
  const [policyFlag, setPolicyFlag] = useState(false);
  const [dataFlag, setDataFlag] = useState(false);
  const [searchTranJson, setSearchTranJson] = useState(searchTransactionJson);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  let policyType = useRef("");
  const [ext] = useState(".pdf");
  const [flag, setFlag] = useState(false);
  const [animate, setAnimate] = useState(true);
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const [renewlalflag, setRenewalflag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, [5000]);
  }, []);
  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const redirecttohome = async () => {
    debugger; // eslint-disable-line

    if (genericInfo) {
      if (policySearchJson.policynumber !== "") {
        const Resp1 = await getProposalPolicyDetail(policySearchJson.policynumber);
        console.log("checking resp1", Resp1);
        console.log("checking node", Resp1.data.proposalPolicyDetail);
        setGenericInfo(dispatch, { prod: "NBTravel" });
        // objectPath.del(Resp1, "Resp1.data.proposalPolicyDetail.ProposerDetails.Age");
        // delete Resp1.data.proposalPolicyDetail.ProposerDetails.Age;
        // delete Resp1.data.proposalPolicyDetail["Children Count"];
        // delete Resp1.data.proposalPolicyDetail["Total Count"];
        // delete Resp1.data.proposalPolicyDetail["Adult Count"];
        console.log("change node", Resp1);
        setGenericPolicyDto(dispatch, { ...Resp1.data.proposalPolicyDetail });
        console.log("check", genericInfo);
        // Navigate(`/retail`);
        Navigate(`/retail?PolicyNo=${policySearchJson.policynumber}`);
      }
    }
  };

  const handleEmail = async (e, id, isPolicy) => {
    if (isPolicy === true) {
      const policyData = tableRows.find((x) => x.policyNumber === id.policyNumber);
      const Resp = await getProductById(policyData.productIdPk);
      if (Resp.status === 200) {
        policyType = Resp.data.policyType;
        console.log(policyType, "prodResp");
      }
    }
    switch (isPolicy) {
      case true:
        if (policyType !== "") {
          if (policyType === "retail" || policyType === "Retail") {
            emailJsonData.type = "Policy";
            emailJsonData.eventType = "PolicyCreated";
            emailJsonData.keyValue = id.policyNumber;
            emailJsonData.subType = "NivaTravel";
            emailJsonData.keyType = "NivaPolicy";
            setEmailJsonData(emailJsonData);
          } else if (policyType === "Group" || policyType === "group") {
            emailJsonData.type = "Policy";
            emailJsonData.eventType = "PolicyCreated";
            emailJsonData.keyValue = id.policyNumber;
            emailJsonData.subType = "GroupTravel";
            emailJsonData.keyType = "NivaPolicy";
            setEmailJsonData(emailJsonData);
          }
        }
        break;
      case false:
        emailJsonData.type = "Endorsement";
        emailJsonData.eventType = "Endorsement";
        emailJsonData.keyValue = id.EndorsementNumber;
        emailJsonData.subType = id.EndorsementType;
        emailJsonData.keyType = "NivaEndorsement";
        setEmailJsonData(emailJsonData);
        break;
      default:
        break;
    }

    const emailResp = await sendEmail(emailJsonData);
    if (emailResp.status === 200 && emailResp !== null) {
      setRespMessage("Email Sent Successfully!");
      setSeverity("success");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      setRespMessage("Something Went Wrong!");
      setSeverity("error");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    }
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const handleDownload = async (e, policyNo) => {
    downloadJson.refenceNumber = `${policyNo}${ext}`;
    setDownloadJson(downloadJson);
    const downloadRes = await getDocumentByType(downloadJson);
    if (downloadRes.status === 200) {
      console.log("downloadRes", downloadRes);
      generateFile(downloadRes.data.documentDetails[0].data, policyNo);
      setFlag(false);
      setRespMessage("Downloaded Successfully!");
      setSeverity("success");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      setRespMessage("Downloaded Failed!");
      setSeverity("error");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    }
  };
  const handleCkycDownload = async (e, v) => {
    setFlag(true);
    downloadJson.refenceNumber = v;
    setDownloadJson(downloadJson);
    const downloadRes = await getDocumentByType(downloadJson);
    if (downloadRes.status === 200) {
      console.log("downloadRes", downloadRes);
      generateFile(downloadRes.data.documentDetails[0].data, v);
      setFlag(false);
      setRespMessage("Downloaded Successfully!");
      setSeverity("success");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      setFlag(true);
      setRespMessage("Downloaded Failed!");
      setSeverity("error");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    }
  };

  const tabs = [
    {
      label: "Policy Details",
      content: (
        <PolicyDetails policyJsonData={policyJsonData} handleCkycDownload={handleCkycDownload} />
      ),
      value: 1,
    },
    {
      label: "Member Details",
      content: <MemberDetails MemberData={MemberData} />,
      value: 2,
    },
    {
      label: "Plan Details",
      content: <PlanDetails benefitDetails={benefitDetails} />,
      value: 3,
    },
    {
      label: "Claim Details",
      content: <ClaimDetails claimsDetails={claimsDetails} />,
      value: 4,
    },
    {
      label: "Endorsement Details",
      content: (
        <EndorsementDetails
          endorsementDetails={endorsementDetails}
          handleEmail={handleEmail}
          handleDownload={handleDownload}
        />
      ),
      value: 5,
    },
  ];
  const [value1, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setSearchData = (e) => {
    policySearchJson[e.target.name] = e.target.value;
    setPolicySearchJson((prev) => ({ ...prev, ...policySearchJson }));
    console.log(policySearchJson);
  };
  const getPolicyData = async () => {
    if (
      policySearchJson.policynumber === "" &&
      policySearchJson.mobileNumber === "" &&
      policySearchJson.customerName === "" &&
      policySearchJson.email === ""
    ) {
      setRespMessage("Please Fill Atleast One Detail");
      setSeverity("error");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    } else {
      setFlag(true);
      setPolicyFlag(false);
      setDataFlag(false);
      const Response = await getPolicySearch(policySearchJson);
      debugger; // eslint-disable-line
      console.log("need response", Response);
      if (Response.status === 200) {
        setPolicyFlag(true);
        const arr = [];
        Response.data.forEach((row) => {
          arr.push({
            policyNumber: row.policyNo,
            proposerName: row.insuredName,
            mobileNo: row.mobileNumber,
            policyStartDate: new Date(row.policyStartDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            policyEndDate: new Date(row.policyEndDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            productIdPk: row.productIdPk,
          });
          setTableRows([...arr]);
          setFlag(false);
        });
        debugger; // eslint-disable-line
        const res3 = await getProposalPolicyDetail(policySearchJson.policynumber);
        if (
          (Response.data[0].productIdPk === 698 || Response.data[0].productIdPk === 455) &&
          res3.data.proposalPolicyDetail.TripType !== "SingleTrip"
        ) {
          // debugger; // eslint-disable-line
          setRenewalflag(true);
        }
      }
    }
  };

  // const getProductType = async (productId) => {
  //   const Resp = await getProductById(productId);
  //   if (Resp.status === 200) {
  //     const data = Resp.data.policyType;
  //   }
  // };

  const onPolicyRowSelect = async (e, polNo, productIdPk) => {
    setFlag(true);
    searchTranJson.policyNo = polNo;
    setSearchTranJson(searchTranJson);
    const Resp = await getProposalPolicyDetail(polNo);
    console.log("checkingproposaljson", Resp);
    const endorsementResult = await getEndorsementDetail(polNo);
    const claimDataRes = await getClaimDetails(searchTranJson);
    console.log(endorsementResult);
    console.log(claimDataRes);
    if (Resp.status === 200) {
      policyJsonData.proposerName = Resp.data.proposalPolicyDetail.ProposerDetails.Name
        ? Resp.data.proposalPolicyDetail.ProposerDetails.Name
        : "";
      policyJsonData.Address = Resp.data.proposalPolicyDetail.ProposerDetails.CommunicationAddress
        .AddressLine1
        ? Resp.data.proposalPolicyDetail.ProposerDetails.CommunicationAddress.AddressLine1
        : "";
      policyJsonData.customerId = Resp.data.proposalPolicyDetail.CustomerId
        ? Resp.data.proposalPolicyDetail.CustomerId
        : "";
      policyJsonData.mobileNumber = Resp.data.proposalPolicyDetail.ProposerDetails.ContactNo
        ? Resp.data.proposalPolicyDetail.ProposerDetails.ContactNo
        : "";
      policyJsonData.sDate = Resp.data.proposalPolicyDetail.PolicyStartDate
        ? new Date(Resp.data.proposalPolicyDetail.PolicyStartDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";
      policyJsonData.eDate = Resp.data.proposalPolicyDetail.PolicyEndDate
        ? new Date(Resp.data.proposalPolicyDetail.PolicyEndDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";
      policyJsonData.premiumAmount = Resp.data.proposalPolicyDetail.PremiumDetail.TotalPremium
        ? Resp.data.proposalPolicyDetail.PremiumDetail.TotalPremium
        : "";
      policyJsonData.PolicyNumber = Resp.data.proposalPolicyDetail.PolicyNumber
        ? Resp.data.proposalPolicyDetail.PolicyNumber
        : "";
      policyJsonData.planName = Resp.data.proposalPolicyDetail.Plan
        ? Resp.data.proposalPolicyDetail.Plan
        : "";
      policyJsonData.SumInsured = Resp.data.proposalPolicyDetail.SumInsured
        ? Resp.data.proposalPolicyDetail.SumInsured
        : "";
      policyJsonData.noOfPplCovered = Resp.data.proposalPolicyDetail.InsurableItem[0].RiskItems
        .length
        ? Resp.data.proposalPolicyDetail.InsurableItem[0].RiskItems.length
        : "";
      policyJsonData.NomineeName = Resp.data.proposalPolicyDetail.NomineeDetails
        ? Resp.data.proposalPolicyDetail.NomineeDetails[0].NomineeName
        : "";
      policyJsonData.NomineeRelation = Resp.data.proposalPolicyDetail.NomineeDetails
        ? Resp.data.proposalPolicyDetail.NomineeDetails[0].NomineeRelationWithProposer
        : "";
      policyJsonData.Geography = Resp.data.proposalPolicyDetail.Geography
        ? Resp.data.proposalPolicyDetail.Geography
        : "";
      policyJsonData.Renewalduedate = Resp.data.proposalPolicyDetail.PolicyEndDate
        ? new Date(Resp.data.proposalPolicyDetail.PolicyEndDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";
      policyJsonData.TripType = Resp.data.proposalPolicyDetail.TripType
        ? Resp.data.proposalPolicyDetail.TripType
        : "";
      policyJsonData.policyStatus = Resp.data.proposalPolicyDetail.PolicyStatus
        ? Resp.data.proposalPolicyDetail.PolicyStatus
        : "";
      policyJsonData.policyTenure = Resp.data.proposalPolicyDetail.NOOfDays
        ? Resp.data.proposalPolicyDetail.NOOfDays
        : "";
      policyJsonData.AgentID =
        Resp.data.proposalPolicyDetail.Channel != null
          ? Resp.data.proposalPolicyDetail.Channel.AgentID
          : "WEB0030001";
      policyJsonData.AgentName =
        Resp.data.proposalPolicyDetail.Channel != null
          ? Resp.data.proposalPolicyDetail.Channel.AgentName
          : "Policybazaar Insurance Brokers Private Limited";
      if (Resp.data.proposalPolicyDetail.ProductCode !== "GroupTravelV1") {
        ckycData.PanNo = Resp.data.proposalPolicyDetail.ProposerDetails.PanNo;
        ckycData.Address1 =
          Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.AddressLine1;

        ckycData.Address2 =
          Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.AddressLine2;
        ckycData.City =
          Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.CityDistrict;
        ckycData.District =
          Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.District;
        ckycData.Pincode = Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.Pincode;
        ckycData.State = Resp.data.proposalPolicyDetail.ProposerDetails.PermanentAddress.State;
        ckycData.CKYCNo = Resp.data.proposalPolicyDetail.ProposerDetails.CKYCNo;
        ckycData.FatherName = Resp.data.proposalPolicyDetail.ProposerDetails.FatherName;
        ckycData.Docdetails = Resp.data.proposalPolicyDetail.documentDetails
          ? Resp.data.proposalPolicyDetail.documentDetails
          : [];
      }
      // ckycData.DocName = Resp.data.proposalPolicyDetail.documentDetails[0].DocName;

      console.log("KYCNO", ckycData.Docdetails);
      const type = await getProductById(productIdPk);
      debugger; // eslint-disable-line
      if (type.status === 200) {
        if (type.data.policyType === ("Group" || "group")) {
          policyJsonData.MasterPolicyNo =
            Resp.data.proposalPolicyDetail.PartnerDetails.masterPolicyNo;
          policyJsonData.MasterPolicyholderName =
            Resp.data.proposalPolicyDetail.PartnerDetails.partnerName;
          policyJsonData.MasterPolicyStartDate = new Date(
            Resp.data.proposalPolicyDetail.PolicyStartDate
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          policyJsonData.MasterPolicyEndDate = new Date(
            Resp.data.proposalPolicyDetail.PolicyEndDate
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          policyJsonData.flag = true;
        } else policyJsonData.flag = false;
      }

      const MemData = Resp.data.proposalPolicyDetail.InsurableItem;
      const benData = Resp.data.proposalPolicyDetail.Benefit;
      MemData[0].RiskItems.forEach((x, i) => {
        MemData[0].RiskItems[i].DOB = new Date(MemData[0].RiskItems[i].DOB).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
      });
      console.log("benData", benData);
      // setPolicyJsonData(policyJsonData);
      setCkycData(ckycData);
      setPolicyJsonData({ ...policyJsonData, ...ckycData });
      setMemberDetails(MemData);
      setBenefitDetails(benData);
    }
    if (endorsementResult.status === 200 && endorsementResult.data.endoData !== null) {
      const endorsemetD = endorsementResult.data.endoData;
      setEndorsementDetails(endorsemetD);
    } else {
      setEndorsementDetails([]);
    }
    if (claimDataRes.status === 200 && claimDataRes.data.length > 0) {
      const ClaimResp = claimDataRes.data;
      setClaimsDetails(ClaimResp);
    } else {
      setClaimsDetails([]);
    }
    console.log(Resp);
    setPolicyFlag(false);
    setDataFlag(true);
    setFlag(false);
  };

  const tableColumns = [
    {
      field: "select",
      headerName: "Select Row",
      width: 100,
      renderCell: (param) => (
        <Radio
          onClick={(e) => onPolicyRowSelect(e, param.row.policyNumber, param.row.productIdPk)}
        />
      ),
    },
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 250,
    },
    {
      field: "proposerName",
      headerName: "Proposer Name",
      width: 150,
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 150,
    },
    {
      field: "policyStartDate",
      headerName: "Policy Start Date",
      width: 150,
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      renderCell: (param) => (
        <MDButton
          size="medium"
          variant="text"
          onClick={(e) => handleEmail(e, param.row, true)}
          startIcon={<EmailIcon fontSize="large" variant="contained" />}
          textAlign="center"
        />
      ),
    },
    {
      field: "download",
      headerName: "Download",
      width: 100,
      renderCell: (param) => (
        <MDButton
          size="medium"
          variant="text"
          onClick={(e) => handleDownload(e, param.row.policyNumber)}
          startIcon={<DownloadIcon fontSize="large" variant="contained" />}
          textAlign="center"
        />
      ),
    },

    {
      // field: "renewal",
      // headerName: "Renewal",

      renderCell: () =>
        renewlalflag === true && (
          <MDButton
            sx={{ justifyContent: "right" }}
            // onClick={getPolicyData}
            onClick={redirecttohome}
            variant="contained"
          >
            RENEWAL
          </MDButton>
        ),
    },
  ];

  return (
    <Card>
      <Grid p={2}>
        {animate === false ? (
          <MDTypography variant="body1" color="primary">
            Policy Search
          </MDTypography>
        ) : (
          <Skeleton animate="wave" variant="rectangle" />
        )}
      </Grid>
      <Grid container spacing={4} p={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {animate === false ? (
            <MDInput label="Policy Number" name="policynumber" onChange={(e) => setSearchData(e)} />
          ) : (
            <Skeleton animate="wave" variant="rectangle" />
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {animate === false ? (
            <MDInput label="Mobile Number" name="mobileNumber" onChange={(e) => setSearchData(e)} />
          ) : (
            <Skeleton animate="wave" variant="rectangle" />
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {animate === false ? (
            <MDInput label="Customer Name" name="customerName" onChange={(e) => setSearchData(e)} />
          ) : (
            <Skeleton animate="wave" variant="rectangle" />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {animate === false ? (
            <MDInput label="Email" name="email" onChange={(e) => setSearchData(e)} />
          ) : (
            <Skeleton animate="wave" variant="rectangle" />
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {animate === false ? (
            <Stack justifyContent="right" direction="row">
              <MDButton
                sx={{ justifyContent: "right" }}
                onClick={getPolicyData}
                variant="contained"
              >
                SEARCH
              </MDButton>
            </Stack>
          ) : (
            <Skeleton animate="wave" variant="rectangle" />
          )}
        </Grid>
      </Grid>

      {policyFlag === true && (
        <Grid>
          <DataGrid
            autoHeight
            rows={tableRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.policyNumber}
          />
        </Grid>
      )}

      {dataFlag === true && <MDTabs tabsList={tabs} onChange={handleChange} value={value1} />}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
          {respMessage}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={flag}>
        <CircularProgress />
      </Backdrop>
    </Card>
  );
}

export default PolicySearch;
