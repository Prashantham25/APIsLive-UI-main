import { useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  GetProposalByNumber,
  MobileNumberLogin,
  VerifyingOTPForDeclaration,
  GetProposalByMobileNumber,
  IssuePolicy,
  UpdateProposal,
} from "../data";
import MDTypography from "../../../../../components/MDTypography";

const sty = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

const vObj = {
  "Make Model": "",
  "Vehicle Number": "",
  "Year of Registration": "",
  "Vehicle Type": "",
  Documents: [
    {
      FileName: " ",
      DocumentID: "",
      DocumentType: "",
      VehicleView: "",
    },
  ],
  NCBValue: 0,
};

function AddDriverDetails() {
  //   const { search } = useLocation();
  const navigate = useNavigate();
  const [dto, setDto] = useState("");
  const [localDto, setLocalDto] = useState({
    enteredMobileNo: "",
    OTP: "",
    loginDto: {},
    policyNumber: "",
  });
  const [pageName, setPageName] = useState("");

  const onGo = async () => {
    const res1 = await GetProposalByMobileNumber(localDto.enteredMobileNo);
    if (res1.data && res1.data.proposalNumber) {
      const res2 = await GetProposalByNumber(res1.data.proposalNumber);
      setDto({ ...res2.data[0].policyDetails });
      const obj2 = res2.data[0].policyDetails;
      const rObj = {
        name: obj2.Name,
        email: obj2["Email ID"],
        userName: "",
        envId: "297",
        productType: "Mica",
        mobileNumber: obj2["Mobile Number"],
        sendSms: true,
        isBerry: false,
        client: "",
      };
      setLocalDto({ ...localDto, loginDto: rObj });

      const res3 = await MobileNumberLogin(rObj);
      if (res3.data.status === 1) setPageName("OTP");
    } else setPageName("toCrateProposer");
  };

  const onOTP = async () => {
    const rObj = localDto.loginDto;
    rObj.otp = localDto.OTP;
    const res = await VerifyingOTPForDeclaration(rObj);
    if (res.data.status === 1) setPageName("DriverDetails");
    else swal({ icon: "error", text: "Wrong OTP entered" });
  };
  const onNext = async (nam) => {
    if (nam === "QuickBuy") {
      navigate("/DBI");
    } else setPageName(nam);

    if (nam === "Vehicle") await UpdateProposal(dto);
  };
  console.log(11211, pageName, dto);
  const onChange = (e, name, i) => {
    if (name === "DriverName") dto.InsurableItem[0].RiskItems[i].Name = e.target.value;
    if (name === "DriverAge") dto.InsurableItem[0].RiskItems[i].Age = e.target.value;
    if (name === "DriverSalutation") dto.InsurableItem[0].RiskItems[i].Salutation = e;

    if (name === "Make Model") dto.InsurableItem[1].RiskItems[i]["Make Model"] = e.target.value;
    if (name === "Year of Registration")
      dto.InsurableItem[1].RiskItems[i]["Year of Registration"] = e.target.value;
    if (name === "Vehicle Number")
      dto.InsurableItem[1].RiskItems[i]["Vehicle Number"] = e.target.value;
    if (name === "enteredMobileNo") localDto.enteredMobileNo = e.target.value;
    if (name === "OTP") localDto.OTP = e.target.value;

    setDto({ ...dto });
    setLocalDto({ ...localDto });
  };

  const onAddNewVehicle = () => {
    dto.InsurableItem[1].RiskItems.push(vObj);
    setDto({ ...dto });
  };

  const onIssuePolicy = async () => {
    await UpdateProposal(dto);
    const res = await IssuePolicy(dto);
    console.log("policy", res);
    if (res.data.status === 2) {
      setPageName("PolicyIssued");
      setLocalDto({ ...localDto, policyNumber: res.data.id });
    }
  };

  return (
    <MDBox p={2} sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      <MDBox>
        {pageName === "" && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4" sx={{ textAlign: "center" }}>
                Get Started
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Enter your registered mobile number</MDTypography>
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
              <MDInput
                label="Mobile Number"
                value={localDto.enteredMobileNo}
                onChange={(e) => onChange(e, "enteredMobileNo")}
              />
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
              <MDButton onClick={onGo}>GO</MDButton>
            </Grid>
          </Grid>
        )}
        {pageName === "OTP" && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4" sx={{ textAlign: "center" }}>
                OTP Verification
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Enter the otp sent to Email ID</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput label="OTP" value={localDto.OTP} onChange={(e) => onChange(e, "OTP")} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDButton onClick={onOTP}>Verify and Proceed </MDButton>
            </Grid>
          </Grid>
        )}
        {pageName === "toCrateProposer" && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4" sx={{ textAlign: "center" }}>
                Get Started
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>You donot seem to have purchased the product yet</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDButton onClick={() => onNext("QuickBuy")}>Quick Buy</MDButton>
            </Grid>
          </Grid>
        )}
        {pageName === "DriverDetails" && (
          <MDBox>
            <MDTypography variant="h4" sx={{ textAlign: "center" }}>
              Add Driver details
            </MDTypography>
            {dto.InsurableItem[0].RiskItems.map((x, i) => (
              <Grid container spacing={2} paddingBottom={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">{`Driver ${i + 1}`}</MDTypography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    fullWidth
                    options={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "M/s"]}
                    getOptionLabel={(option) => option}
                    sx={sty}
                    renderInput={(params) => <MDInput {...params} label="Title" />}
                    onChange={(e, v) => onChange(v, "DriverSalutation", i)}
                    value={x.Salutation}
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                  <MDInput
                    label="Name"
                    value={x.Name}
                    onChange={(e) => onChange(e, "DriverName", i)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Age"
                    value={x.Age}
                    onChange={(e) => onChange(e, "DriverAge", i)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput label="Upload License" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton variant="outlined" component="label">
                      <input hidden type="file" accept="image/*" />
                      {/* onChange={onUploadArr} */}
                      <FileUploadIcon />
                      Upload License
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ))}
            <MDBox p={3} sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={() => onNext("Vehicle")}>Next</MDButton>
            </MDBox>
          </MDBox>
        )}
        {pageName === "Vehicle" && (
          <MDBox>
            <MDTypography variant="h4" sx={{ textAlign: "center" }}>
              Add Vehicle Details
            </MDTypography>
            {dto.InsurableItem[1].RiskItems.map((x, i) => (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">{`Vehicle ${i + 1}`}</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Vehicle Number"
                    value={x["Vehicle Number"]}
                    onChange={(e) => onChange(e, "Vehicle Number", i)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Make & Model"
                    value={x["Make Model"]}
                    onChange={(e) => onChange(e, "Make Model", i)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Year of Registration"
                    value={x["Year of Registration"]}
                    onChange={(e) => onChange(e, "Year of Registration", i)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton variant="outlined" component="label">
                      <input hidden type="file" accept="image/*" />
                      {/* onChange={onUploadArr} */}
                      <FileUploadIcon />
                      Upload vehicle pictures
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ))}
            <MDBox p={3} sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onAddNewVehicle} variant="outlined">
                <AddIcon />
                Add New Vehicle
              </MDButton>
            </MDBox>
            <MDBox p={3} sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onIssuePolicy}>Issue Policy</MDButton>
            </MDBox>
          </MDBox>
        )}
        {pageName === "PolicyIssued" && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4" color="success" sx={{ textAlign: "center" }}>
                Policy Issued Successfully
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>{`Your policy number ${localDto.policyNumber}`}</MDTypography>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </MDBox>
  );
}
export default AddDriverDetails;
