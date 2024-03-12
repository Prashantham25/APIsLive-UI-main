import { Grid, Stack, RadioGroup, Autocomplete, Radio, FormControlLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import MDBox from "../../../../../../../components/MDBox";
import NavBar from "./NavBar";

import MDTypography from "../../../../../../../components/MDTypography";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import { GetProposalByNumber, GenericApi, UpdateProposalDetails, GetOpportunityByNumber } from "."; // NotificationsVerifyOTP
import { Authenticate } from "../../../../../../Login/data";
import MDLoader from "../../../../../../../components/MDLoader";
import MDDatePicker from "../../../../../../../components/MDDatePicker";

const checkForValue = (value) => value === "" || value === undefined || value === null;
const handleKeyDown = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

const headerStyle = {
  "& .MuiDataGrid-columnHeaderTitle": {
    overflow: "visible",
    lineHeight: "2rem",
    whiteSpace: "normal",
  },
};

export default function AdditionalQuestions() {
  const { search } = useLocation();
  const proposalNo = new URLSearchParams(search).get("pno");
  const [loader, setLoader] = useState(false);

  const [otp, setOTP] = useState("");
  const [transactionNo, setTransactionNo] = useState("");
  const [ClientIPAddr, setClientIPAddress] = useState("");
  const [OTPVerifyStatus1, setOtpVerifyStatus1] = useState(false);

  const [proposalJson, setProposalJson] = useState({});

  const [dto, setDto] = useState({
    PreviousDetails1: "no",
    PreviousDetailsArr1: [{}, {}, {}, {}, {}],
    PreviousDetails2: "no",
    PreviousDetailsArr2: [{}, {}, {}, {}, {}],
  });

  const [ProposerDetails, setProposerDetails] = useState({
    Name: "",
    Gender: "",
    DOB: "",
    EmailId: "",
    ContactNo: "",
    Product: "",
    PlanNumber: "",
  });

  const onChange2 = (e, id, name) => {
    dto.PreviousDetailsArr1[id][name] = e.target.value;
    setDto({ ...dto });
  };
  const onChange3 = (e, id, name) => {
    dto.PreviousDetailsArr2[id][name] = e.target.value;
    setDto({ ...dto });
  };

  useEffect(async () => {
    setLoader(true);

    const loginuser = {
      Username: "LICCustomer01@gmail.com",
      Password: "Mica@123",
      ProductType: "Mica",
      envId: process.env.REACT_APP_EnvId,
    };
    await Authenticate(loginuser).then((res) => {
      setLoader(false);

      if (res.data.status === 1) {
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("roleId", res.data.roleId);
        localStorage.setItem("organizationId", res.data.organizationId);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("partnerId", res.data.partnerId);
        localStorage.setItem("firstName", res.data.firstName);
      }
    });

    // location.replace(`${window.origin}/customerLifeLanding`);
    // navigate(`/customerLifeLanding`);

    if (proposalNo !== "" && proposalNo !== null && proposalNo !== undefined) {
      let pno = proposalNo?.toString()?.replace(".", "/");
      if (proposalNo.toString().length === 10) {
        await GetOpportunityByNumber(pno).then((r) => {
          if (Array.isArray(r.OpportunityDetails)) {
            r.OpportunityDetails.forEach((x) => {
              if (x.txnType === "Proposal") pno = x.txnValue;
            });
          }
        });
      }

      GetProposalByNumber(pno).then((r) => {
        setProposerDetails({
          Name: r[0]?.policyDetails?.ProposerDetails?.Name,
          Gender: r[0]?.policyDetails?.ProposerDetails?.Gender,
          DOB: r[0]?.policyDetails?.ProposerDetails?.DOB,
          EmailId: r[0]?.policyDetails?.ProposerDetails?.EmailId,
          ContactNo: r[0]?.policyDetails?.ProposerDetails?.ContactNo,
          Product: r[0]?.policyDetails?.Product,
          PlanNumber: r[0]?.policyDetails?.PlanNumber,
        });
        if (r[0]?.policyDetails?.OTPVerifyStatus1) setOtpVerifyStatus1(true);
        setProposalJson(r[0]?.policyDetails);
      });
    }
  }, [proposalNo]);

  const columns2 = [
    {
      field: "PolicyNo",
      headerName: "Proposal/Policy No ",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange2(e, p.row.id, "PolicyNo")} />,
    },
    {
      field: "PlanTerm",
      headerName: "Plan & Term ",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange2(e, p.row.id, "PlanTerm")} />,
    },
    {
      field: "SumAssured",
      headerName: "Sum Assured ",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange2(e, p.row.id, "SumAssured")} />,
    },
    {
      field: "CommencementDate",
      headerName: "Commencement date",
      width: 210,
      renderCell: (p) => (
        <MDDatePicker
          input={{ label: "", value: p.row.CommencementDate }}
          value={p.row.CommencementDate}
          onChange={(e, a) => onChange2({ target: { value: a } }, p.row.id, "CommencementDate")}
          options={{
            dateFormat: "d/m/Y",
            altFormat: "d/m/Y",
            altInput: true,
            maxDate: new Date(),
          }}
        />
      ),
    },
    {
      field: "AnnualPremium",
      headerName: "Annual Premium",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange2(e, p.row.id, "AnnualPremium")} />,
    },
    {
      field: "Insurer",
      headerName: "Insurer",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange2(e, p.row.id, "Insurer")} />,
    },
  ];
  const columns3 = [
    {
      field: "PolicyNumber",
      headerName: "Policy number ",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "PolicyNumber")} />,
    },
    {
      field: "Insurer",
      headerName: "Insurer",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "Insurer")} />,
    },
    {
      field: "PlanTerm",
      headerName: "Plan & Term",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "PlanTerm")} />,
    },
    {
      field: "SumAssured",
      headerName: "Sum Assured",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "SumAssured")} />,
    },
    {
      field: "CommencementDate",
      headerName: "Commencement date",
      width: 210,
      renderCell: (p) => (
        <MDDatePicker
          input={{ label: "", value: p.row.CommencementDate }}
          value={p.row.CommencementDate}
          onChange={(e, a) => onChange3({ target: { value: a } }, p.row.id, "CommencementDate")}
          options={{
            dateFormat: "d/m/Y",
            altFormat: "d/m/Y",
            altInput: true,
            maxDate: new Date(),
          }}
        />
      ),
    },
    {
      field: "Premium",
      headerName: "Premium",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "Premium")} />,
    },
    {
      field: "HowAccepted",
      headerName: "How accepted",
      width: 210,
      renderCell: (p) => <MDInput onChange={(e) => onChange3(e, p.row.id, "HowAccepted")} />,
    },
    {
      field: "PolicyStatus",
      headerName: "Policy status",
      width: 210,
      renderCell: (p) => (
        <Autocomplete
          fullWidth
          options={[
            "Postponed",
            "Declined",
            "Rated up",
            "with extra premium",
            "Rejected",
            "Withdrawn",
          ]}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          onChange={(e, a) => onChange3({ target: { value: a } }, p.row.id, "HowAccepted")}
          getOptionLabel={(option) => option}
          renderInput={(params) => <MDInput {...params} />}
        />
      ),
    },
  ];

  const onRadio = (e, name) => {
    dto[name] = e.target.value;
    setDto({ ...dto });
  };

  const onSendOTP = async () => {
    try {
      setLoader(true);
      await GenericApi("LifeInsurance", "SendOtpAPi", {
        MasterType: "ProposalConsent",
        email: ProposerDetails.EmailId,
        whatsAppNo: checkForValue(ProposerDetails.ContactNo) ? "" : ProposerDetails.ContactNo,
        contactNo: checkForValue(ProposerDetails.ContactNo) ? "" : ProposerDetails.ContactNo,
        addtionalDetails: {
          isEmail: checkForValue(ProposerDetails.EmailId) ? "false" : "true",
          isSMS: checkForValue(ProposerDetails.ContactNo) ? "false" : "true",
          isWhatsApp: checkForValue(ProposerDetails.ContactNo) ? "false" : "true",
        },
      }).then((res) => {
        setLoader(false);
        if (res.status === 1 && res.finalResult?.TransactionNo) {
          setTransactionNo(res.finalResult.TransactionNo);
          setClientIPAddress(res.finalResult.AddtionalDetails);
          Swal.fire({
            // icon: "success",
            text: `OTP sent successfully`,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({ icon: "warning", text: "Please Retry" });
        }
      });
      setLoader(false);
    } catch {
      //
    }
  };

  const onVerifyOTP = async () => {
    setLoader(true);

    // await NotificationsVerifyOTP({
    //   otp,
    //   transactionNo,
    // }).then((res) => {
    //   setLoader(false);

    const questionnareArr = [
      {
        LevelNo: 100000000,
        QId: 1720,
        QText: "Previous Insurance Details",
        ControlType: "Header",
        OnChangeVal: "",
        Visibility: "true",
        QSubType: "Previous Insurance Details",
        Answer: "",
      },
      {
        LevelNo: 110000000,
        QId: 1722,
        QText:
          "Is your life now being proposed for another assurance or an application for revival of a policy on your life or any other proposal under consideration in any office of the Corporation or to any other insurer?",
        QParentId: 1720,
        DefaultValue: "No",
        ControlType: "Radio",
        MasterType: "BooleanValue",
        OnChangeVal: "",
        DetailsLabel: "Enter Details",
        Visibility: "true",
        QSubType: "Previous Insurance Details",
        Answer: dto.PreviousDetails1,
        "Enter Details": "",
      },
      {
        LevelNo: 111010000,
        QId: 5148,
        QText: "Previous Policies",
        QParentId: 1722,
        ControlType: "GridView",
        MasterType: "PreviousPolicyDetails1",
        OnChangeVal: "Yes",
        Visibility: "true",
        QSubType: "Previous Insurance Details",
        Answer: dto.PreviousDetailsArr1,
      },
      // {
      //   LevelNo: 200000000,
      //   QId: 5147,
      //   QText:
      //     "Have any such proposals on your life/application for reinstatement ever been accepted with extra premium, postponement, decline, withdrawal ,non-completion, been offered on modified terms ?",
      //   QParentId: 1720,
      //   DefaultValue: "No",
      //   ControlType: "Radio",
      //   MasterType: "BooleanValue",
      //   OnChangeVal: "",
      //   DetailsLabel: "Enter Details",
      //   Visibility: "true",
      //   QSubType: "Previous Insurance Details",
      //   Answer: dto.PreviousDetails2,
      //   "Enter Details": "",
      // },
      // {
      //   LevelNo: 201010000,
      //   QId: 5234,
      //   QText: "Previous Policies",
      //   QParentId: 5147,
      //   ControlType: "GridView",
      //   MasterType: "PreviousPolicyDetails2",
      //   OnChangeVal: "Yes",
      //   Visibility: "true",
      //   QSubType: "Previous Insurance Details",
      //   Answer: dto.PreviousDetailsArr2,
      // },
    ];

    // if (res.status === 1) {
    let Questionnare = [...proposalJson.InsurableItem[0].RiskItems[0].Questionnare];
    Questionnare = Questionnare.filter((x) => x.QId !== 1720 && x.QId !== 1722 && x.QId !== 5148);

    setOtpVerifyStatus1(true);
    proposalJson.InsurableItem[0].RiskItems[0].Questionnare = [...questionnareArr, ...Questionnare];

    const d = new Date();
    proposalJson.OTPVerifyStatus1 = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}/${d.getHours()}/${d.getMinutes()}/${d.getSeconds()}`;
    proposalJson.ClientIPAddr1 = ClientIPAddr;

    UpdateProposalDetails({
      ...proposalJson,
    });
    // } else
    //   Swal.fire({
    //     // icon: "error",
    //     text: res.responseMessage,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // });
    setLoader(false);
  };

  return (
    <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }}>
      <NavBar />{" "}
      {ProposerDetails?.PlanNumber?.toString() === "954" && (
        <MDBox mt={15} sx={{ minHeight: "80vh" }}>
          <MDLoader loader={loader} />
          {OTPVerifyStatus1 === true ? (
            <MDBox>
              <MDTypography
                variant="h5"
                color="success"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Answers submitted successfully
              </MDTypography>
            </MDBox>
          ) : (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Product Name" value={ProposerDetails.Product} disabled />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Proposer Name" value={ProposerDetails.Name} disabled />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Gender" value={ProposerDetails.Gender} disabled />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Date of Birth" value={ProposerDetails.DOB} disabled />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Contact No" value={ProposerDetails.ContactNo} disabled />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Email Id" value={ProposerDetails.EmailId} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox mt={3} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h5">Answer the following questions and submit</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing>
                  <MDTypography>
                    Is your life being proposed for another insurance/or an application for revival
                    of a policy on your life or any other proposal under consideration in any of the
                    offices of LICI or to any other insurer
                  </MDTypography>
                  <MDBox sx={{ width: 250 }}>
                    <RadioGroup
                      row
                      value={dto.PreviousDetails1}
                      onChange={(e) => onRadio(e, "PreviousDetails1")}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </MDBox>
                </Stack>
              </Grid>
              {dto.PreviousDetails1 === "yes" && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    rows={dto.PreviousDetailsArr1.map((x, i) => ({ ...x, id: i }))}
                    getRowId={(row) => row.id}
                    rowHeight={80}
                    autoHeight
                    columns={columns2}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={headerStyle}
                    onCellKeyDown={{ handleKeyDown }}
                  />
                </Grid>
              )}
              {false && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" spacing>
                    <MDTypography>
                      Have any such proposals on your life/application for reinstatement ever been
                      accepted with extra premium, postponement, decline,withdrawal,non-completion,
                      been offered on modified terms
                    </MDTypography>
                    <MDBox sx={{ width: 250 }}>
                      <RadioGroup
                        row
                        value={dto.PreviousDetails2}
                        onChange={(e) => onRadio(e, "PreviousDetails2")}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>
                  </Stack>
                </Grid>
              )}
              {false && dto.PreviousDetails2 === "yes" && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    rows={dto.PreviousDetailsArr2.map((x, i) => ({ ...x, id: i }))}
                    getRowId={(row) => row.id}
                    rowHeight={80}
                    autoHeight
                    columns={columns3}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={headerStyle}
                    onCellKeyDown={{ handleKeyDown }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox mt={3} />
              </Grid>
              {false && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox display="flex" justifyContent="center">
                    <MDBox width={290}>
                      <MDInput
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </MDBox>
                  </MDBox>
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack spacing={2} direction="row" justifyContent="center">
                  {false && (
                    <MDButton onClick={onSendOTP}>
                      {transactionNo === "" ? "Send OTP" : "Resend OTP"}
                    </MDButton>
                  )}
                  <MDButton onClick={onVerifyOTP}>Submit</MDButton>
                </Stack>
              </Grid>
            </Grid>
          )}
        </MDBox>
      )}{" "}
    </MDBox>
  );
}
