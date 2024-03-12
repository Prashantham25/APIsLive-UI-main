import { Grid, Card, Stack } from "@mui/material";
import Swal from "sweetalert";

import { PolicyDto, RiskItem, relationShip, Gender } from "./data/Json";
import {
  //   getMasterPolicyData,
  GetAssignProduct,
  GetPartnerDetails,
  GetLocationAsync,
  GetAssignProductByMasterPolicyNumber,
  GetPlanOnMasterPolicy,
  GetBenefitDetails,
  //   GenericApi,
  // SaveCreateProposal,
} from "./data";
import {
  AgeCalculator,
  DateFormatFromDateObject,
  //   DateFormatFromStringDate,
  arrayRange,
} from "../../../../../../Common/Validations";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
// import MDButton from "../../../../../../components/MDButton";
import { Quotations, Policies } from "../../data/Apis";

const getPolicyDto = () => {
  console.log(".");
  return PolicyDto;
};

const getProcessSteps = () => {
  const steps = ["Plan Details", "Member Details", "Premium Details", "Certificate Details"];
  return steps;
};

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "", visible: true },
        { name: "Master Policy Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Policy Details", visible: true },
        { name: "Proposer Details", visible: true },
        { name: "Member Details", visible: true },
        { name: "Nominee Details", visible: true },
      ];
      break;
    case 2:
      steps = [{ name: "", visible: true }];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    case 4:
      steps = [
        { name: "e1", visible: true },
        { name: "e2", visible: true },
        { name: "e3", visible: true },
      ];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters, setBackDropFlag }) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;

  const onMPSearch = async (flag) => {
    if (flag) {
      setBackDropFlag(true);
      const res = await GetAssignProductByMasterPolicyNumber(dto.PartnerDetails.masterPolicyNo);
      if (res?.finalResult?.length > 0) {
        const res1 = await GetAssignProduct(res.finalResult[0].agentId);
        const res2 = await GetPartnerDetails(res.finalResult[0].agentId);
        lDto.PartnerDetails.partnerName = res2.partnerName;
        lDto.PartnerDetails.partnerCode = res2.partnerCode;
        lDto.PartnerDetails.PolicyStartDate = res1[0].policyStartDate;
        lDto.PartnerDetails.PolicyEndDate = res1[0].policyEndDate;
        lDto.PartnerDetails.accountNo = res1[0].policyNo;
        const res3 = await GetLocationAsync("Country", 0);
        const res4 = await GetLocationAsync("State", res2.partnerAddress[0].partnerCountryId);
        const res5 = await GetLocationAsync("District", res2.partnerAddress[0].partnerStateId);
        const res6 = await GetLocationAsync("City", res2.partnerAddress[0].partnerDistrictId);
        const res7 = await GetLocationAsync("Pincode", res2.partnerAddress[0].partnerCityId);

        lDto.PartnerDetails.website = res2.website;

        lDto.PartnerDetails.address1 = res2.partnerAddress[0].partnerAddressLine1;
        lDto.PartnerDetails.address2 = res2.partnerAddress[0].partnerAddressLine2;

        lDto.PartnerDetails.city = res6.filter(
          (x) => x.mID === res2.partnerAddress[0].partnerCityId
        )[0].mValue;

        lDto.PartnerDetails.district = res5.filter(
          (x) => x.mID === res2.partnerAddress[0].partnerDistrictId
        )[0].mValue;

        lDto.PartnerDetails.state = res4.filter(
          (x) => x.mID === res2.partnerAddress[0].partnerStateId
        )[0].mValue;

        lDto.PartnerDetails.country = res3.filter(
          (x) => x.mID === res2.partnerAddress[0].partnerCountryId
        )[0].mValue;

        lDto.PartnerDetails.pincode = res7.filter(
          (x) => x.mID === res2.partnerAddress[0].partnerPincodeId
        )[0].mValue;

        setDto({ ...lDto });
      } else Swal({ icon: "error", text: "Master Policy Not Exist" });
      setBackDropFlag(false);
    }
  };

  const onCountOfLives = (e, v) => {
    const arr = [];
    arrayRange(1, v.mID, 1).forEach(() => {
      arr.push({ ...RiskItem() });
    });
    lDto.CountofLives = v.mValue;
    lDto.InsurableItem[0].RiskItems = arr;
    setDto({ ...lDto });
  };

  const onPlanSelect = async (e, v) => {
    const obj = {
      productCode: "AmanaTakaful02",
      planType: v.mValue,
      filterCriteria: [{ SI: dto.SumInsured, Type: "", Region: "", currency: "" }],
      isFilterMemberWise: false,
      setBenefitMemberWise: false,
      insurableItems: null,
    };

    const res1 = await GetBenefitDetails(obj);
    lDto.Plan = v.mValue;
    lDto.Scheme = v.mValue;
    lDto.Benefits = res1.finalResult.benefits;
    setDto({ ...lDto });
    lMasters.benefits = res1.finalResult.benefits;
    setMasters({ ...lMasters });
  };

  const onPolicyStartDate = (e, v) => {
    lDto.PolicyStartDate = v;

    const date1 = new Date();
    // d-m-y   y-m-d
    date1.setFullYear(parseInt(v.split("-")[0], 10) + 1);
    date1.setMonth(parseInt(v.split("-")[1], 10) - 1);

    date1.setDate(parseInt(v.split("-")[2], 10) - 1);

    const date2 = DateFormatFromDateObject(date1, "y-m-d");
    lDto.PolicyEndDate = date2;
    setDto({ ...lDto });
  };

  const onProposerDOB = (e, v) => {
    lDto.ProposerDetails.DOB = v;

    const date1 = new Date();
    date1.setFullYear(v.split("-")[0]);
    date1.setMonth(parseInt(v.split("-")[1], 10) - 1);
    date1.setDate(v.split("-")[2]);
    lDto.ProposerDetails.Age = AgeCalculator(date1);

    setDto({ ...lDto });
  };

  const onMemberDOB = (e, v, i) => {
    lDto.InsurableItem[0].RiskItems[i].DOB = v;

    const date1 = new Date();
    date1.setFullYear(v.split("-")[0]);
    date1.setMonth(parseInt(v.split("-")[1], 10) - 1);
    date1.setDate(v.split("-")[2]);
    lDto.InsurableItem[0].RiskItems[i].Age = AgeCalculator(date1);

    setDto({ ...lDto });
  };

  const onNomineeDOB = (e, v) => {
    lDto.NomineeDetails[0].NomineeDOB = v;

    const date1 = new Date();
    date1.setFullYear(v.split("-")[2]);
    date1.setMonth(parseInt(v.split("-")[1], 10) - 1);
    date1.setDate(v.split("-")[0]);
    lDto.NomineeDetails[0].NomineeAge = AgeCalculator(date1);

    setDto({ ...lDto });
  };

  const onProposerCountry = async (e, v) => {
    lDto.ProposerDetails.PermanentAddress.Country = v.mValue;
    lDto.ProposerDetails.PermanentAddress.State = "";
    lDto.ProposerDetails.PermanentAddress.District = "";
    lDto.ProposerDetails.PermanentAddress.City = "";
    lDto.ProposerDetails.PermanentAddress.Pincode = "";
    const res1 = await GetLocationAsync("State", v.mID);
    lMasters.state = res1;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onProposerState = async (e, v) => {
    lDto.ProposerDetails.PermanentAddress.State = v.mValue;
    lDto.ProposerDetails.PermanentAddress.District = "";
    lDto.ProposerDetails.PermanentAddress.City = "";
    lDto.ProposerDetails.PermanentAddress.Pincode = "";
    const res1 = await GetLocationAsync("District", v.mID);
    lMasters.district = res1;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onProposerDistrict = async (e, v) => {
    lDto.ProposerDetails.PermanentAddress.District = v.mValue;
    lDto.ProposerDetails.PermanentAddress.City = "";
    lDto.ProposerDetails.PermanentAddress.Pincode = "";
    const res1 = await GetLocationAsync("City", v.mID);
    lMasters.city = res1;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onProposerCity = async (e, v) => {
    lDto.ProposerDetails.PermanentAddress.City = v.mValue;
    lDto.ProposerDetails.PermanentAddress.Pincode = "";
    const res1 = await GetLocationAsync("Pincode", v.mID);
    lMasters.pincode = res1;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            visible: true,
            label: "Master Policy No",
            path: "PartnerDetails.masterPolicyNo",
            required: true,
            validationId: 1,
          },
          {
            type: "ValidationControl",
            subType: "Button",
            visible: true,
            label: "Search",
            onClick: onMPSearch,
            validationId: 1,
          },
        ],
        [
          {
            type: "Input",
            visible: true,
            label: "Master Policy Holder Name",
            disabled: true,
            path: "PartnerDetails.partnerName",
          },
          //   { type: "MDDatePicker", visible: true, label: "Proposal Date" },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Master Policy Start Date",
            path: "PartnerDetails.PolicyStartDate",
            disabled: true,
            dateFormat: "Y-m-d",
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Master Policy End Date",
            path: "PartnerDetails.PolicyEndDate",
            disabled: true,
            dateFormat: "Y-m-d",
          },

          //   { type: "Input", visible: true, label: "Business" },
          {
            type: "Input",
            visible: true,
            label: "Website",
            disabled: true,
            path: "PartnerDetails.website",
          },
          {
            type: "Input",
            visible: true,
            label: "Address 1",
            disabled: true,
            path: "PartnerDetails.address1",
          },
          {
            type: "Input",
            visible: true,
            label: "Address 2",
            disabled: true,
            path: "PartnerDetails.address2",
          },
          {
            type: "Input",
            visible: true,
            label: "City",
            disabled: true,
            path: "PartnerDetails.city",
          },
          {
            type: "Input",
            visible: true,
            label: "City",
            disabled: true,
            path: "PartnerDetails.district",
          },
          {
            type: "Input",
            visible: true,
            label: "State",
            disabled: true,
            path: "PartnerDetails.state",
          },
          {
            type: "Input",
            visible: true,
            label: "Country",
            disabled: true,
            path: "PartnerDetails.country",
          },
          {
            type: "Input",
            visible: true,
            label: "Pincode",
            disabled: true,
            path: "PartnerDetails.pincode",
          },
          { type: "Typography", visible: true, label: "", spacing: 12 },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Sum Insured",
            path: "SumInsured",
            onChangeFuncs: ["IsNumeric"],
            validationId: 2,
          },

          {
            type: "ValidationControl",
            subType: "AutoComplete",
            visible: true,
            required: true,
            label: "Select Plan",
            options: masters.plans,
            path: "Plan",
            customOnChange: onPlanSelect,
            validationId: 2,
          },
          { type: "Typography", visible: false, label: "Plan Cover Details", spacing: 12 },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Grid container spacing={4}>
                {masters.benefits.map((x) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h4">{`Cover - ${x.CoverName}`}</MDTypography>
                    <MDTypography variant="h6" color="error">
                      {x.Clauses}
                    </MDTypography>
                    {x.BenefitDetail.length > 0 && (
                      <Grid container spacing={4}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography variant="h5">Benefit</MDTypography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography variant="h5">Sum Insured</MDTypography>
                        </Grid>
                      </Grid>
                    )}
                    {x.BenefitDetail.map((x1, i1) => (
                      <Grid container spacing={4}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography variant="h6">{`${i1 + 1})   ${x1.Benefit}`}</MDTypography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography variant="h6">{x1.SI}</MDTypography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ),
          },
          {
            type: "DataGrid",
            visible: false,
            spacing: 12,
            columns: [
              { field: "Benefit", headerName: "Benefit", width: 200 },
              { field: "BenefitSI", headerName: "Sum Insured", width: 200 },
            ],
            value: masters.benefits,
            rowId: "BenefitID",
          },
        ],
        [],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Policy Tenure",
            path: "PolicyTenure",
          },

          {
            type: "MDDatePicker",
            visible: true,
            required: true,
            label: "Policy Start Date",
            path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            allowInput: true,
            customOnChange: onPolicyStartDate,
            // minDate: new Date(),
            // validationId: 3,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy End Date",
            path: "PolicyEndDate",
            dateFormat: "Y-m-d",
            // disabled: true,
            // validationId: 3,
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Count of Lives",
            path: "CountofLives",
            options: [
              { mID: 1, mValue: "1" },
              { mID: 2, mValue: "2" },
              { mID: 3, mValue: "3" },
              { mID: 4, mValue: "4" },
              { mID: 5, mValue: "5" },
              { mID: 6, mValue: "6" },
            ],
            customOnChange: onCountOfLives,
          },
          //   { type: "Input", visible: true, label: "Geography" },
        ],
        [
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Name",
            path: "ProposerDetails.Name",
          },
          {
            type: "MDDatePicker",
            visible: true,
            required: true,
            label: "Date of Birth",
            path: "ProposerDetails.DOB",
            dateFormat: "Y-m-d",
            customOnChange: onProposerDOB,
            maxDate: new Date(),
          },
          {
            type: "Input",
            visible: true,
            label: "Age",
            path: "ProposerDetails.Age",
            disabled: true,
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Gender",
            path: "ProposerDetails.Gender",
            options: Gender,
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Email ID",
            path: "ProposerDetails.EmailId",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Mobile No",
            path: "ProposerDetails.MobileNo",
          },
          {
            type: "Input",
            visible: true,
            label: "Address 1",
            required: true,
            path: "ProposerDetails.PermanentAddress.AddressLine1",
          },
          {
            type: "Input",
            visible: true,
            label: "Address 2",
            path: "ProposerDetails.PermanentAddress.AddressLine2",
          },

          {
            type: "AutoComplete",
            visible: true,
            label: "Country",
            required: true,
            path: "ProposerDetails.PermanentAddress.Country",
            options: masters.country,
            customOnChange: onProposerCountry,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "State",
            required: true,
            path: "ProposerDetails.PermanentAddress.State",
            options: masters.state,
            customOnChange: onProposerState,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "District",
            required: true,
            path: "ProposerDetails.PermanentAddress.District",
            options: masters.district,
            customOnChange: onProposerDistrict,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "City",
            required: true,
            path: "ProposerDetails.PermanentAddress.City",
            options: masters.city,
            customOnChange: onProposerCity,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Pincode",
            required: true,
            path: "ProposerDetails.PermanentAddress.Pincode",
            options: masters.pincode,
          },
        ],

        [
          {
            type: "Mapper1",
            visible: true,
            spacing: 12,
            path: "InsurableItem.0.RiskItems",
            mapperComponents: [
              {
                type: "Typography",
                visible: true,
                // required: true,
                spacing: 12,
                label: "Member {index}",
              },
              { type: "Input", visible: true, required: true, label: "Name", path: "Name" },
              {
                type: "MDDatePicker",
                visible: true,
                required: true,
                label: "Date of Birth",
                path: "DOB",
                dateFormat: "Y-m-d",
                customOnChange: (e, v, e1, e2, index) => onMemberDOB(e, v, index),
                maxDate: new Date(),
              },
              { type: "Input", visible: true, disabled: true, label: "Age", path: "Age" },
              {
                type: "AutoComplete",
                visible: true,
                required: true,
                label: "Gender",
                path: "Gender",
                options: Gender,
              },
              {
                type: "AutoComplete",
                visible: true,
                required: true,
                label: "Relationship",
                path: "Relationship",
                options: relationShip,
              },
            ],
          },
        ],
        [
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Nominee Name",
            path: "NomineeDetails.0.NomineeName",
          },
          {
            type: "MDDatePicker",
            visible: true,
            required: true,
            label: "Nominee Date of Birth",
            path: "NomineeDetails.0.NomineeDOB",
            maxDate: new Date(),
            customOnChange: onNomineeDOB,
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Nominee Relationship",
            path: "NomineeDetails.0.NomineeRelationWithProposer",
            options: relationShip,
          },
          {
            type: "Input",
            visible: dto.NomineeDetails[0].NomineeAge < 18,
            required: dto.NomineeDetails[0].NomineeAge < 18,
            label: "Appointee Name",
            path: "NomineeDetails.0.AppointeeName",
          },
          {
            type: "MDDatePicker",
            visible: dto.NomineeDetails[0].NomineeAge < 18,
            required: dto.NomineeDetails[0].NomineeAge < 18,
            label: "Appointee Date of Birth",
            path: "NomineeDetails.0.AppointeeDOB",
          },
          {
            type: "AutoComplete",
            visible: dto.NomineeDetails[0].NomineeAge < 18,
            required: dto.NomineeDetails[0].NomineeAge < 18,
            label: "Appointee Relationship",
            path: "NomineeDetails.0.AppointeeRelationWithProposer",
            options: relationShip,
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <Stack direction="row" justifyContent="center">
                  <MDTypography>
                    <strong>Premium Summary</strong>
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                      width: "500px",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Sum Insured</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{formater.format(dto?.SumInsured)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Net Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹ {formater.format(dto?.PremiumDetails?.netPremium)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Tax(18%)</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹ {formater.format(dto?.PremiumDetails?.gst)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>
                          <strong>Total Premium</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>₹ {formater.format(dto?.PremiumDetails?.totalPremium)} </strong>
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Card>
                </Stack>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                {/* <Stack direction="row" justifyContent="center">
                  <MDTypography>
                    <strong>Your COI Details</strong>
                  </MDTypography>
                </Stack> */}
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                      width: "65%",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Insurance Certificate Number</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>{dto.policyNo}</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Master Policy Number</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>{dto.PartnerDetails.masterPolicyNo}</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Master Policy Holder Name</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong> {dto.PartnerDetails.partnerName}</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Proposer Name</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>{dto.ProposerDetails.Name}</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>No. of Insured Members</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>{`${dto.CountofLives} Members`}</strong>
                        </MDTypography>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack
                          direction="row"
                          spacing={3}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <MDButton variant="outlined">Email Policy</MDButton>
                          <MDButton>Download Policy Certificate</MDButton>
                        </Stack>
                      </Grid> */}
                    </Grid>
                  </Card>
                </Stack>
              </MDBox>
            ),
          },
        ],

        [],
        [],
      ];
      break;
    case 4:
      data = [[], [], []];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ dto, setDto, activeStep }) => {
  const lDto = dto;
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      await Quotations(dto).then((x) => {
        if (x.status === 1 && x.finalResult) {
          lDto.PremiumDetails.netPremium = x.finalResult.NetPremium;
          lDto.PremiumDetails.gst = x.finalResult.GST;
          lDto.PremiumDetails.totalPremium = x.finalResult.FinalPremium;
          setDto({ ...lDto });
          fun = true;
        }
      });
      break;
    case 2:
      await Policies(dto).then((x1) => {
        if (x1.status === 1) lDto.policyNo = x1.finalResult.id;
      });
      setDto({ ...lDto });
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Issue Policy", visible: true, loader: "backDrop" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false, loader: "backDrop" },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  //   const lDto = dto;
  const mst = {
    Salutation: [],
    Gender: [],
    plans: [],
    benefits: [],
    country: [],
    state: [],
    district: [],
    city: [],
    pincode: [],
  };
  const res1 = await GetPlanOnMasterPolicy(811, 105);
  mst.plans = res1;
  const res2 = await GetLocationAsync("Country", 0);
  mst.country = res2;

  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
