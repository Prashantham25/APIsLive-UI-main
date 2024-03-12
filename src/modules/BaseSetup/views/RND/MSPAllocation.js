import { useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
import ReactJson from "react-json-view";
import Swal from "sweetalert2";

import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import { GetProposalByNumber } from "../../../PolicyLive/views/Retail/data/Apis";
import {
  GenericApi,
  UpdateProposalDetails,
} from "../../../PolicyLive/views/Life/Products/NewBusiness/data";
import MDLoader from "../../../../components/MDLoader";
import MDTypography from "../../../../components/MDTypography";

const GetProposalYear = () => {
  const cDate = new Date();
  const cMonthFlag = cDate.getMonth() <= 3;
  if (cMonthFlag) return cDate.getFullYear() - 1;
  return cDate.getFullYear();
};
const checkForValue = (value) => value !== "" && value !== undefined && value !== null;

const MSPList = [
  {
    mspname: "MSP000001",
    apiName: "MSP000001_SchedulingApi",
    name: "Safeway Insurance TPA Pvt Ltd",
  },
  { mspname: "MSP000002", apiName: "MSP000002_SchedulingApi", name: "MediAssit" },
  {
    mspname: "MSP000006",
    apiName: "LIC_MSP00006_Scheduling",
    name: "MDINDIA Health Insurance TPA",
  },
  {
    mspname: "MSP000007",
    apiName: "MSP000007_SchedulingApi",
    name: "Anmol Medicare Insurance TPA Ltd",
  },
  {
    mspname: "MSP000009",
    apiName: "MSP000009_SchedulingApi",
    name: "HealthIndia Insurance TPA Pvt. Ltd",
  },
  {
    mspname: "MSP000017",
    apiName: "MSP000017_SchedulingAPI",
    name: "Health Assure Private Limited",
  },
];

export default function MSPAllocation() {
  const [loader, setLoader] = useState(false);
  const [ProposalNo, setProposalNo] = useState("");
  const [ProposalJson, setProposalJson] = useState({});
  const [selectMsp, setSelectMsp] = useState({ mspname: "", apiName: "", name: "" });
  const [MSPResponse, setMSPResponse] = useState({});

  const [ExistingResponse, setExistingResponse] = useState({
    MSP: {},
    MSPResponse: {},
    MailResponse: {},
  });
  const [MailResponse, setMailResponse] = useState({});
  const [MailObj, setMailObj] = useState({
    toMail1: "",
    toMail2: "",
    mailSubject: "",
    AccessId: "",
    opportunityId: "",
    ProductId: "",
    Plan: "",
    Name: "",
    DOB: "",
    ContactNo: "",
    EmailId: "",
    MedicalReports: "",
    SumProposed: "",
    PolicyTerm: "",
    LICDivisionName: "",
    ProposalYear: "",
    BranchCode: "",
    ProposalNo: "",
    MSP: {
      scheduleType: "",
      appointmentDate: "",
      mspname: "",
      dcname: "",
      dccode: "",
      dcaddress: "",
      contactMobileNumber: "",
      contactEmail: "",
    },
  });

  const [obj, setObj] = useState({
    accessid: "",
    nameoftheproposer: "",
    mobileNumber: "",
    emailId: "",
    proposalnumber: "",
    proposalYear: GetProposalYear(),
    fullProposalYear: GetProposalYear(),
    pincode: "",
    dccode: "",
    listofprepolicymedicalreportstobeconducted: "",
    appointmentdate: "",
    appointmenttime: "",
    schedulingtype: "Auto",
    branchCode: "",
    mainBranchCode: "",
    medicalFlag: "",
    MemberDOB: "",
    sumAssured: "",
    Address1: "",
  });

  const onClear = () => {
    setObj({
      accessid: "",
      nameoftheproposer: "",
      mobileNumber: "",
      emailId: "",
      proposalnumber: "",
      proposalYear: GetProposalYear(),
      fullProposalYear: GetProposalYear(),
      pincode: "",
      dccode: "",
      listofprepolicymedicalreportstobeconducted: "",
      appointmentdate: "",
      appointmenttime: "",
      schedulingtype: "Auto",
      branchCode: "",
      mainBranchCode: "",
      medicalFlag: "",
      MemberDOB: "",
      sumAssured: "",
      Address1: "",
    });
    setMailObj({
      toMail1: "",
      toMail2: "",
      mailSubject: "",
      AccessId: "",
      opportunityId: "",
      ProductId: "",
      Plan: "",
      Name: "",
      DOB: "",
      ContactNo: "",
      EmailId: "",
      MedicalReports: "",
      SumProposed: "",
      PolicyTerm: "",
      LICDivisionName: "",
      ProposalYear: "",
      BranchCode: "",
      ProposalNo: "",
      MSP: {
        scheduleType: "",
        appointmentDate: "",
        mspname: "",
        dcname: "",
        dccode: "",
        dcaddress: "",
        contactMobileNumber: "",
        contactEmail: "",
      },
    });
    setSelectMsp({ mspname: "", apiName: "", name: "" });
    setProposalNo("");
    setMSPResponse({});
    setMailResponse({});
    setExistingResponse({ MSP: {}, MSPResponse: {}, MailResponse: {} });
  };

  const onFetchProposalDetails = async () => {
    onClear();
    setLoader(true);
    await GetProposalByNumber(ProposalNo).then((res) => {
      const jsn = res?.[0]?.policyDetails;
      setLoader(false);
      setProposalJson(jsn);
      obj.accessid = jsn?.OpportunityNumber;
      obj.nameoftheproposer = jsn?.ProposerDetails.Name;
      obj.mobileNumber =
        jsn?.ProposerDetails?.ContactNo !== ""
          ? jsn?.ProposerDetails?.ContactNo
          : jsn?.ProposerDetails?.AlternativeContactNo;
      obj.emailId = jsn?.ProposerDetails?.EmailId;
      obj.proposalnumber = jsn?.CoreProposalNo;
      obj.pincode = jsn?.ProposerDetails?.PermanentAddress?.Pincode;
      obj.listofprepolicymedicalreportstobeconducted =
        jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.Category?.MedicalReports;
      obj.branchCode = jsn?.ChannelDetails?.DivisionCode;
      obj.mainBranchCode = jsn?.ChannelDetails?.BranchCode;
      obj.medicalFlag = jsn?.Category?.IsMedical;
      obj.MemberDOB = jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.DOB;
      obj.sumAssured = jsn?.SumAssured;
      obj.Address1 = `${jsn?.ProposerDetails?.PermanentAddress?.AddressLine1}, ${jsn?.ProposerDetails?.PermanentAddress?.AddressLine2}, ${jsn?.ProposerDetails?.PermanentAddress?.AddressLine3}, ${jsn?.ProposerDetails?.PermanentAddress?.City}, ${jsn?.ProposerDetails?.PermanentAddress?.District}, ${jsn?.ProposerDetails?.PermanentAddress?.State}`;
      setExistingResponse({
        MSP: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP,
        MSPResponse: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSPResponse,
        MailResponse: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSPMailResponse,
      });
      setObj({ ...obj });
      setProposalNo(jsn?.ProposalNo);

      MailObj.toMail1 = "";
      MailObj.toMail1 = jsn?.ProposerDetails?.EmailId;
      MailObj.toMail2 = jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.contactEmail;
      MailObj.mailSubject = `Medical Tests for ${jsn?.Product} plan, Proposal No. ${jsn?.CoreProposalNo} with reference to AccessID ${jsn?.OpportunityNumber}`;
      MailObj.AccessId = jsn?.OpportunityNumber;
      MailObj.opportunityId = jsn?.opportunityId;
      MailObj.ProductId = jsn?.ProductId;
      MailObj.Plan = jsn?.Product;
      MailObj.Name = jsn?.ProposerDetails?.EmailId;
      MailObj.DOB = jsn?.ProposerDetails?.DOB;
      MailObj.ContactNo = jsn?.ProposerDetails?.ContactNo;
      MailObj.EmailId = jsn?.ProposerDetails?.EmailId;
      MailObj.MedicalReports = jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.Category?.MedicalReports;
      MailObj.SumProposed = jsn?.SumAssured;
      MailObj.PolicyTerm = jsn?.PolicyTerm;
      MailObj.LICDivisionName = "-";
      MailObj.ProposalYear = GetProposalYear();
      MailObj.BranchCode = jsn?.ChannelDetails?.DivisionCode;
      MailObj.ProposalNo = jsn?.CoreProposalNo;
      MailObj.MSP = {
        scheduleType: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.scheduleType,
        appointmentDate: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.appointmentDate,
        mspname: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.mspname,
        dcname: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.dcname,
        dccode: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.dccode,
        dcaddress: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.dcaddress,
        contactMobileNumber: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.contactMobileNumber,
        contactEmail: jsn?.InsurableItem?.[0]?.RiskItems?.[0]?.MSP?.MSP?.contactEmail,
      };
      setMailObj({ ...MailObj });
    });
  };

  const onSchedule = () => {
    if (
      checkForValue(obj.accessid) &&
      checkForValue(obj.proposalnumber) &&
      checkForValue(obj.branchCode) &&
      checkForValue(obj.nameoftheproposer) &&
      checkForValue(obj.mobileNumber) &&
      checkForValue(obj.emailId) &&
      checkForValue(obj.pincode) &&
      checkForValue(obj.listofprepolicymedicalreportstobeconducted) &&
      checkForValue(selectMsp.apiName)
    ) {
      setLoader(true);
      GenericApi("LifeInsurance", selectMsp.apiName, obj).then((res) => {
        setLoader(false);
        setMSPResponse(res.finalResult);
      });
    } else Swal.fire({ icon: "warning", text: "Data Missing" });
  };

  const onChangesDetails = (e) => {
    obj[e.target.name] = e.target.value;
    setObj({ ...obj });
  };

  const onUpdatePRoposal = () => {
    ProposalJson.InsurableItem[0].RiskItems[0].MSP = {
      testName: "",
      pincode: "",
      Name: "",
      scheduleType: "Auto",
      appointmentDate: "",
      appointmentTime: "",
      MSP: {
        schedulerApi: selectMsp.apiName,
        mspcode: selectMsp.mspname,
        mspname: selectMsp.name,
      },
    };
    ProposalJson.InsurableItem[0].RiskItems[0].MSPResponse = MSPResponse;
    ProposalJson.ChannelDetails.DivisionCode = obj.branchCode;
    setLoader(true);
    UpdateProposalDetails({ ...ProposalJson }).then((res) => {
      setLoader(false);
      Swal.fire({ text: res.responseMessage }); //
      onFetchProposalDetails();
    });
  };

  const onSendMail = () => {
    setLoader(true);
    GenericApi("LifeInsurance", "LIC_MSPCustMailAPI", MailObj).then((res) => {
      setLoader(false);
      setMailResponse(res);
      console.log("mail response", res);
    });
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Internal Proposal No"
          value={ProposalNo}
          onChange={(e) => setProposalNo(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton onClick={onFetchProposalDetails}>Fetch Proposal Details</MDButton>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton variant="outlined" onClick={onClear}>
          Clear Data
        </MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Medical Flag" value={obj.medicalFlag} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Access Id" value={obj.accessid} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Core Proposal No" value={obj.proposalnumber} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Branch Code" value={obj.mainBranchCode} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Division Code"
          name="branchCode"
          value={obj.branchCode}
          onChange={onChangesDetails}
        />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Proposer Name" value={obj.nameoftheproposer} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Life Assured DOB" value={obj.MemberDOB} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Mobile Number" value={obj.mobileNumber} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Email ID" value={obj.emailId} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Proposal Year" value={obj.proposalYear} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Pincode" value={obj.pincode} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Sum Assured" value={obj.sumAssured} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput disabled label="Address" value={obj.Address1} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Medical Reports"
          name="listofprepolicymedicalreportstobeconducted"
          value={obj.listofprepolicymedicalreportstobeconducted}
          onChange={onChangesDetails}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography>Current Status</MDTypography>
      </Grid>
      {false && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6">update msp selection</MDTypography>
          <ReactJson
            src={selectMsp}
            displayDataTypes={0}
            displayArrayKey={0}
            displayObjectSize={0}
            style={{ fontSize: 15 }}
            onAdd={(e) => setSelectMsp({ ...e.updated_src })}
            onDelete={(e) => setSelectMsp({ ...e.updated_src })}
            onEdit={(e) => setSelectMsp({ ...e.updated_src })}
            collapsed={3}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6">Selected MSP</MDTypography>
        <ReactJson
          src={ExistingResponse.MSP}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          style={{ fontSize: 15 }}
          onAdd={(e) => setExistingResponse({ ...e.updated_src })}
          onDelete={(e) => setExistingResponse({ ...e.updated_src })}
          onEdit={(e) => setExistingResponse({ ...e.updated_src })}
          collapsed={3}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6">MSP Response</MDTypography>
        <ReactJson
          src={ExistingResponse.MSPResponse}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          style={{ fontSize: 15 }}
          onAdd={(e) => setExistingResponse({ ...e.updated_src })}
          onDelete={(e) => setExistingResponse({ ...e.updated_src })}
          onEdit={(e) => setExistingResponse({ ...e.updated_src })}
          collapsed={3}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6">Mail Response</MDTypography>
        <ReactJson
          src={ExistingResponse.MailResponse}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          style={{ fontSize: 15 }}
          onAdd={(e) => setExistingResponse({ ...e.updated_src })}
          onDelete={(e) => setExistingResponse({ ...e.updated_src })}
          onEdit={(e) => setExistingResponse({ ...e.updated_src })}
          collapsed={3}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={MSPList}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={selectMsp}
          getOptionLabel={(option) => option.mspname}
          onChange={(e, a) => setSelectMsp(a)}
          renderInput={(params) => <MDInput {...params} label="Select MSP" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="MSP Name" value={selectMsp.name} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="MSP Generic API Name" value={selectMsp.apiName} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton onClick={onSchedule}>Schedule MSP</MDButton>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton onClick={onUpdatePRoposal}>Update Proposal</MDButton>{" "}
      </Grid>
      {/* {Object.keys(typeof MSPResponse === "object" ? MSPResponse : {}).length > 0 && ( */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {" "}
        <MDTypography variant="h6">MSP Response</MDTypography>
        <ReactJson
          src={MSPResponse}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setMSPResponse({ ...e.updated_src })}
          onDelete={(e) => setMSPResponse({ ...e.updated_src })}
          onEdit={(e) => setMSPResponse({ ...e.updated_src })}
          style={{ fontSize: 15 }}
          collapsed={3}
        />
      </Grid>
      {/* )} */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h6">Mail Request</MDTypography>
        <ReactJson
          src={MailObj}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setMailObj({ ...e.updated_src })}
          onDelete={(e) => setMailObj({ ...e.updated_src })}
          onEdit={(e) => setMailObj({ ...e.updated_src })}
          style={{ fontSize: 15 }}
          collapsed={2}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton onClick={onSendMail}>Send Mail</MDButton>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h6">Mail Response</MDTypography>
        <ReactJson
          src={MailResponse}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          style={{ fontSize: 15 }}
        />
      </Grid>
      <MDLoader loader={loader} />
    </Grid>
  );
}
