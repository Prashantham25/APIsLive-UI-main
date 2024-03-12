import { useEffect, useState } from "react";
import objectPath from "object-path";
import { Grid, Stack, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Checkbox from "@mui/material/Checkbox";

// import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MDInput from "../../../../../../components/MDInput";

import MDCheckbox from "../../../../../../components/MDCheckbox";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";

import {
  GetProposalByNumber,
  makePayment,
  fetchPaymentURL,
  getProductIdByProductcode,
} from "./data/APIs/NBTravelApi";

import { useDataController } from "../../../../../BrokerPortal/context";

function ProposerDetails() {
  const [proposerDetails, setProposerDetails] = useState("");
  const [premiums, setPremiums] = useState("");
  const { search } = useLocation();

  const [control] = useDataController();

  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  console.log("dataaaa", dto);

  const [Paymentdetailsss, setPaymentdetailsss] = useState("");
  // const [transactionID, settransactionID] = useState();
  const [Successurl, setSuccessurl] = useState();
  const [Failureurls, setFailureurls] = useState();

  useEffect(async () => {
    const ProposalNumber = new URLSearchParams(search).get("ProposalNo");
    const res = await GetProposalByNumber(ProposalNumber);
    console.log("res", res);
    setProposerDetails({ ...res.data[0].policyDetails });
    setPremiums(res.data[0].policyDetails.PremiumDetail.TotalPremium);
    console.log("want premium", premiums);
  }, []);

  const onProceedtoPayment = async () => {
    // const tDto = { ...topDto };
    debugger; // eslint-disable-line
    // const ProposalNo = objectPath.get(dto, `ProposalNo`);
    // const premiumamount = objectPath.get(dto, `PremiumDetail.TotalPremium`);
    // const emails = objectPath.get(dto, `ProposerDetails.EmailId`);
    const ProposalNumber = new URLSearchParams(search).get("ProposalNo");
    const productcode2 = await getProductIdByProductcode("NBHTIOP22148V012122");
    const resp = await fetchPaymentURL(productcode2.productId, ProposalNumber, premiums);
    console.log("hojayegaablagtahe", resp);
    setPaymentdetailsss(resp);
    console.log("paymentdetailschek", Paymentdetailsss);
    // settransactionID(resp.transactionID);
    // console.log("MilgayaKya", transactionID);
    setSuccessurl(resp.surl);
    console.log("yetoagaya", Successurl);
    // objectPath.set(dto, "PremiumDetail.transectionID", resp.transactionID);
    // objectPath.set(dto, "PremiumDetail.Successurl", resp.surl);
    objectPath.set(proposerDetails, "PremiumDetail.Successurl", resp.surl);
    setFailureurls(resp.furl);
    console.log("yevaya", Failureurls);
    const pay = await makePayment(proposerDetails);
    console.log("payment", pay);
  };

  const [disable, setDisable] = useState(true);
  const handleCheckbox = (e) => {
    if (e.target.value === false) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  console.log("proposerDetails", proposerDetails);
  console.log("proposerDetails123", proposerDetails.ListOfDestination);
  // const tArr1 = [];
  const [dest, setDest] = useState([]);
  useEffect(() => {
    if (proposerDetails !== "") {
      const tArr1 = [];
      const tArr2 = proposerDetails.ListOfDestination;
      console.log("Array", tArr2);
      tArr2.forEach((x) => {
        // console.log("123456", x);
        tArr1.push(x.mValue);
      });
      setDest([...tArr1]);
    }
  }, [proposerDetails]);
  console.log("dest", dest);

  // const Navigate = useNavigate();
  // const onProceedtoPayment = async () => {
  //   debugger; // eslint-disable-line
  //   Navigate("/ReyzorPay");
  // };

  return (
    <Card>
      {proposerDetails !== "" && (
        <MDBox m={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion
                  sx={{
                    ml: 0,
                    boxShadow: "unset",
                    border: "unset",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography
                      variant="h6"
                      sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                    >
                      Insured Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography>Insured Member 01</MDTypography>
                    </Grid>
                    <Grid container spacing={1} p={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Insured Name"
                          value={proposerDetails.InsurableItem[0].RiskItems[0].Name}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Insured Relationship with Proposer"
                          value={
                            proposerDetails.InsurableItem[0].RiskItems[0].relationShipToProposer
                          }
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion
                  sx={{
                    ml: 0,
                    boxShadow: "unset",
                    border: "unset",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography
                      variant="h6"
                      sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                    >
                      Policy Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Policy Start date"
                          // sx={{ background: "#e6e6e6" }}
                          value={proposerDetails.PolicyStartDate}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Policy End date"
                          value={proposerDetails.PolicyEndDate}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="ProductName" value={proposerDetails.ProductName} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="Trip Type" value={proposerDetails.TripType} disabled />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          width="auto"
                          label="CountryofVisit"
                          value={dest}
                          disabled
                          multiline
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="SumInsured" value={proposerDetails.SumInsured} disabled />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Accordion
                    sx={{
                      ml: 0,
                      boxShadow: "unset",
                      border: "unset",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <MDTypography
                        variant="h6"
                        sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                      >
                        Proposer Details
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Salutation"
                            value={proposerDetails.ProposerDetails.Salutation}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="First Name"
                            value={proposerDetails.ProposerDetails.Name}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Proposer DOB"
                            value={proposerDetails.ProposerDetails.DOB}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Proposer Gender"
                            value={proposerDetails.ProposerDetails.Gender}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Email Id"
                            value={proposerDetails.ProposerDetails.EmailId}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Mobile Number"
                            value={proposerDetails.ProposerDetails.ContactNo}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Pan Card No"
                            value={proposerDetails.ProposerDetails.PanNo}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Nationality"
                            value={proposerDetails.ProposerDetails.Nationality}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Accordion
                    sx={{
                      ml: 0,
                      boxShadow: "unset",
                      border: "unset",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <MDTypography
                        variant="h6"
                        sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                      >
                        Communication Details
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography>Commmunication Address Details</MDTypography>
                      </Grid>
                      <Grid container spacing={2} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Address 1"
                            value={
                              proposerDetails.ProposerDetails.CommunicationAddress.AddressLine1
                            }
                            disabled
                          />
                        </Grid>
                        {proposerDetails.ProposerDetails.CommunicationAddress.AddressLine2 !==
                        "" ? (
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Address 2"
                              value={
                                proposerDetails.ProposerDetails.CommunicationAddress.AddressLine2
                              }
                              disabled
                            />
                          </Grid>
                        ) : null}
                        {proposerDetails.ProposerDetails.CommunicationAddress.AddressLine3 !==
                        "" ? (
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Address 3"
                              value={
                                proposerDetails.ProposerDetails.CommunicationAddress.AddressLine3
                              }
                              disabled
                            />
                          </Grid>
                        ) : null}

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="City"
                            value={
                              proposerDetails.ProposerDetails.CommunicationAddress.CityDistrict
                            }
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="District"
                            value={proposerDetails.ProposerDetails.CommunicationAddress.District}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="State"
                            value={proposerDetails.ProposerDetails.CommunicationAddress.State}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Pincode"
                            value={proposerDetails.ProposerDetails.CommunicationAddress.Pincode}
                            disabled
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography>Permanent Address Details</MDTypography>
                      </Grid>
                      <Grid container spacing={2} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Address 1"
                            value={proposerDetails.ProposerDetails.PermanentAddress.AddressLine1}
                            disabled
                          />
                        </Grid>
                        {proposerDetails.ProposerDetails.PermanentAddress.AddressLine2 !== "" ? (
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Address 2"
                              value={proposerDetails.ProposerDetails.PermanentAddress.AddressLine2}
                              disabled
                            />
                          </Grid>
                        ) : null}
                        {proposerDetails.ProposerDetails.PermanentAddress.AddressLine3 !== "" ? (
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Address 3"
                              value={proposerDetails.ProposerDetails.PermanentAddress.AddressLine3}
                              disabled
                            />
                          </Grid>
                        ) : null}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="City"
                            value={proposerDetails.ProposerDetails.PermanentAddress.CityDistrict}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="District"
                            value={proposerDetails.ProposerDetails.PermanentAddress.District}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="State"
                            value={proposerDetails.ProposerDetails.PermanentAddress.State}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Pincode"
                            value={proposerDetails.ProposerDetails.PermanentAddress.Pincode}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Accordion
                    sx={{
                      ml: 0,
                      boxShadow: "unset",
                      border: "unset",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <MDTypography
                        variant="h6"
                        sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                      >
                        Nominee Details
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Nominee Name"
                            value={proposerDetails.NomineeDetails[0].NomineeName}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Nominee Relationship"
                            value={proposerDetails.NomineeDetails[0].NomineeRelationWithProposer}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Nominee DOB"
                            value={proposerDetails.NomineeDetails[0].NomineeDOB}
                            disabled
                          />
                        </Grid>
                        {proposerDetails.NomineeDetails[0].AppointeeName !== "" ? (
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Appointee Name"
                              value={proposerDetails.NomineeDetails[0].AppointeeName}
                              disabled
                            />
                          </Grid>
                        ) : null}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {proposerDetails.TripType === "StudentTravel" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Accordion
                        sx={{
                          ml: 0,
                          boxShadow: "unset",
                          border: "unset",
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <MDTypography
                            variant="h6"
                            sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                          >
                            University Details
                          </MDTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={1} p={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                              <MDInput
                                label="University Name"
                                value={proposerDetails.UniversityDetails.Name}
                                disabled
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                              <MDInput
                                label="Address1"
                                value={proposerDetails.UniversityDetails.AddressLine1}
                                disabled
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                              <MDInput
                                label="Cource opted for"
                                value={proposerDetails.UniversityDetails.CourseOptedFor}
                                disabled
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                              <MDInput
                                label="cource duration"
                                value={proposerDetails.UniversityDetails.CourseDuration}
                                disabled
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Accordion
                        sx={{
                          ml: 0,
                          boxShadow: "unset",
                          border: "unset",
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <MDTypography
                            variant="h6"
                            sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#4d79ff" }}
                          >
                            Sponsor Details
                          </MDTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                              <MDInput
                                label="Sponsor Name"
                                value={proposerDetails.UniversityDetails.Sponsor[0].Name}
                                disabled
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} ml={2}>
                              <MDInput
                                label="Relationship with Student"
                                value={
                                  proposerDetails.UniversityDetails.Sponsor[0]
                                    .RelationshipwithStudent
                                }
                                disabled
                              />
                            </Grid>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>

            <Grid item md={5} lg={5} xl={5} xxl={5} mt={4}>
              <MDBox>
                <Card sx={{ background: "#e6e6e6" }}>
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                        Proposal Summary
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Basic Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {proposerDetails.PremiumDetail.BasicPremium}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Discount
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {proposerDetails.PremiumDetail.Discount}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Gross Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {proposerDetails.PremiumDetail.GrossPremium}
                      </MDTypography>
                    </Grid>
                    {proposerDetails.ProposerDetails.CommunicationAddress.State !==
                    "UTTAR PRADESH" ? (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                            IGST(18%)
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography
                            textAlign="right"
                            variant="h6"
                            sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                          >
                            {proposerDetails.PremiumDetail.TaxDetails[2].Amount}
                          </MDTypography>
                        </Grid>
                      </>
                    ) : null}
                    {proposerDetails.ProposerDetails.CommunicationAddress.State ===
                    "UTTAR PRADESH" ? (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                            CGST(9%)
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography
                            textAlign="right"
                            variant="h6"
                            sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                          >
                            {proposerDetails.PremiumDetail.TaxDetails[0].Amount}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                            SGST(9%)
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDTypography
                            textAlign="right"
                            variant="h6"
                            sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                          >
                            {proposerDetails.PremiumDetail.TaxDetails[1].Amount}
                          </MDTypography>
                        </Grid>
                      </>
                    ) : null}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Total Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {proposerDetails.PremiumDetail.TotalPremium}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                      <Stack direction="row" spacing={2}>
                        <MDCheckbox color="secondary" onClick={handleCheckbox} />

                        <MDTypography
                          sx={{
                            fontSize: "0.87rem",
                            color: "#000000",
                            weight: 400,
                            mt: "0.5rem",
                          }}
                        >
                          By clicking proceed to payment, you are confirming that you have read and
                          agreed to the Terms & Conditions
                        </MDTypography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} ml={2} mb={2}>
                    <MDButton
                      textAlign="left"
                      variant="contained"
                      color="primary"
                      disabled={disable}
                      onClick={() => onProceedtoPayment()}
                    >
                      PROCEED TO PAYMENT
                    </MDButton>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
    </Card>
  );
}
export default ProposerDetails;
