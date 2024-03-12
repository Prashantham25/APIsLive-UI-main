import React, { useState } from "react";

import {
  Grid,
  //   Autocomplete,
  //   Stack,
  Accordion,
  AccordionDetails,
  //   AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Backdrop,
  Modal,
} from "@mui/material";
import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

// import MDButton from "../../../../../components/MDButton";

// import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";
import Summary from "./Summary";
import { useDataController, setFilterPolicyJson } from "../../../../BrokerPortal/context";

const style = {
  position: "absolute",

  top: "-2%",

  left: "76%",

  transform: "translate(-85%, 6%)",

  width: 1200,

  height: 700,

  bgcolor: "background.paper",

  // border: '2px solid #000',

  boxShadow: 24,

  textAlign: "center",

  p: 4,

  //   "max-height": "100%",

  // "overflow-y": "auto"
};

function RenderControl({ x, id, controlItems1, idd }) {
  // debugger;
  const [controller1, dispatch1] = useDataController();
  const { filterPolicyJson } = controller1;
  const unique = controlItems1.filter((t) => t.parameterName.split(" ").join("") === x)[0].levelId;
  console.log("unique", unique);
  console.log("controlItems1", controlItems1);
  console.log("controller1", controller1);

  // const calculateNoOfDays = (date1, date2) => {
  //   const date = new Date(date1);
  //   const dateF = new Date(date2);
  //   const timeDiff = dateF.getTime() - date.getTime();
  //   const day = timeDiff / (1000 * 60 * 60 * 24);

  //   const newday = day + 1;
  //   return newday;
  // };
  const calculateNoOfDays = (date1, date2) => {
    // debugger;
    const date = new Date(date1);
    const dateF = new Date(date2);
    const timeDiff = dateF.getTime() - date.getTime();
    const day = timeDiff / (1000 * 60 * 60 * 24);
    const newday = day + 1;
    if (filterPolicyJson.Geography === "DOM") {
      if (newday > 30) {
        filterPolicyJson.NOOfDays = "";
        filterPolicyJson.TripEndDate = "";
        swal({
          icon: "error",
          text: "This policy does not cover Travel days beyond 30",
        });
        setFilterPolicyJson({ ...filterPolicyJson });
      } else {
        return newday;
      }
    }

    return newday;
  };
  const ageCalculation = (dateString) => {
    // debugger;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };
  const setNewPolicyDetails = (e, type, idd1) => {
    // debugger;
    switch (type) {
      case "TopLevel":
        if (idd > -1) {
          if (e.target.name === "DateofBirth" || e.target.name === "DOB") {
            filterPolicyJson.InsurableItem[0].RiskItems[idd1][e.target.name] = e.target.value;
            filterPolicyJson.InsurableItem[0].RiskItems[idd1].Age = ageCalculation(e.target.value);
          } else {
            filterPolicyJson.InsurableItem[0].RiskItems[idd1][e.target.name] = e.target.value;
          }
          //

          setFilterPolicyJson(dispatch1, { ...filterPolicyJson });
        } else {
          filterPolicyJson[e.target.name] = e.target.value;
          if (e.target.name === "TripStartDate") {
            filterPolicyJson.NOOfDays = calculateNoOfDays(
              e.target.value,
              filterPolicyJson.TripEndDate
            );
          }
          if (e.target.name === "TripEndDate") {
            filterPolicyJson.NOOfDays = calculateNoOfDays(
              filterPolicyJson.TripStartDate,
              e.target.value
            );
          }

          setFilterPolicyJson(dispatch1, { ...filterPolicyJson });
        }

        break;
      default:
        console.log("wrong choice");
    }
  };
  console.log("2", x, id, controlItems1, filterPolicyJson);
  // console.log("viewFlag", viewFlag);

  //
  return (
    <div>
      {(() => {
        switch (controlItems1.filter((v1) => v1.parameterName.split(" ").join("") === x)[0].type) {
          case "Input":
            return (
              <MDInput
                label={
                  controlItems1.filter((v2) => v2.parameterName.split(" ").join("") === x)[0].label
                }
                name={x}
                disabled={
                  controlItems1.filter((name) => name.parameterName.split(" ").join("") === x)[0]
                    .parameterMode === 1 && true
                }
                onChange={(e) => setNewPolicyDetails(e, "TopLevel", idd)}
                value={
                  unique === 55
                    ? filterPolicyJson.InsurableItem[0].RiskItems[idd][x]
                    : filterPolicyJson[x]
                }
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
function Details({
  controlItems1,
  premiumflag,
  getPremiumCalculation,
  flag1,
  ratingData,
  ratingFlag,
  enType,
  object,
  PolicyJson,
  handleSubmit,
  endorsementCategory,
  endorsementType,
  enCat,
  handleDateChange,
  paymentDate,
  handlePayment,
  saveDto,
  names,
  setNames,
  viewFlag,
}) {
  const [summaryFlag, setSummaryFlag] = useState(false);
  const [controller, dispatch] = useDataController();
  const [modalFlag, setModalFlag] = useState(false);
  const [riskObj, setRiskObj] = useState({
    Name: "",
    DOB: "",
    MemberID: "",
    Age: "",
    Gender: "",
    PassportNo: "",
    PreExistingDisease: "",
    Nationality: "",
    VisaType: "",
    SumInsured: "",
    HeightMember: "",
    WeightMember: "",
    MobileNoMember: "",
    relationShipToProposer: "",
    RelationWithInsured: "",
    DetailsOfExistingPolicyFromNivaBupaHealthInsurance: "",
    DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance: "",
    Questionaire: [],
  });
  const riskObjD = {
    Name: "",
    DOB: "",
    MemberID: "",
    Age: "",
    Gender: "",
    PassportNo: "",
    PreExistingDisease: "",
    Nationality: "",
    VisaType: "",
    SumInsured: "",
    HeightMember: "",
    WeightMember: "",
    MobileNoMember: "",
    relationShipToProposer: "",
    RelationWithInsured: "",
    DetailsOfExistingPolicyFromNivaBupaHealthInsurance: "",
    DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance: "",
    Questionaire: [],
  };
  const [d1, setD1] = useState(new Date());
  const openModal = () => {
    setModalFlag(true);
  };
  const handleClose = () => {
    setModalFlag(false);
  };
  const { filterPolicyJson } = controller;
  const viewSummary = () => {
    if (viewFlag === true || enType === 168) {
      setSummaryFlag(true);
    } else {
      swal({
        text: "Premium not calculated",
        icon: "error",
      });
    }
    console.log("viewFlag", viewFlag);
  };
  const handleRisk = (e) => {
    riskObj[e.target.name] = e.target.value;
    setRiskObj((prev) => ({ ...prev, ...riskObj }));
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const handleRiskDate = (e) => {
    // debugger;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (dd < 10) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;
    const newDate = `${yyyy}-${mm}-${dd}`;
    riskObj.DOB = newDate;
    riskObj.Age = calculateAge(newDate);
    console.log("test", riskObj);
    setD1(newDate);
    setRiskObj((prev) => ({ ...prev, ...riskObj }));
  };

  const addMember = () => {
    setRiskObj(riskObjD);
    filterPolicyJson.InsurableItem[0].RiskItems.push(riskObj);
    names.push({ name: riskObj.Name });
    setNames(names);
    setModalFlag((prev) => !prev);
    setFilterPolicyJson(dispatch, { ...filterPolicyJson });
  };

  const deleteRisk = (e, i) => {
    filterPolicyJson.InsurableItem[0].RiskItems.splice(i, 1);
    names.splice(i, 1);
    setNames(names);
    setFilterPolicyJson(dispatch, { ...filterPolicyJson });
  };
  console.log("enType", enType);
  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h4">Policy Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {Object.keys(filterPolicyJson).map((x, key) =>
              controlItems1.findIndex((val) => val.parameterName === x && val.levelId === 54) >=
              0 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl x={x} id={key} controlItems1={controlItems1} />
                </Grid>
              ) : null
            )}
          </Grid>
          <br />

          {filterPolicyJson.InsurableItem.map((xa, keya) =>
            controlItems1.findIndex(
              (vala) => vala.parameterInsurableName === xa.InsurableName && vala.levelId === 55
            ) >= 0 ? (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDTypography variant="h6">InsurableItem:{xa.InsurableName}</MDTypography>
                    </Grid>
                    {endorsementCategory.filter((e1) => e1.mID === enCat)[0].mValue ===
                    "Member Addition/Deletion" ? (
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDButton variant="outlined" onClick={openModal}>
                          <AddCircleIcon />
                        </MDButton>
                      </Grid>
                    ) : null}
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {filterPolicyJson.InsurableItem[keya].RiskItems.map((xb, keyb) => (
                      <>
                        {/* <Grid container spacing={2}> */}
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                          {/* <MDTypography>{xb.Name}</MDTypography> */}
                          <MDTypography>{names[keyb].name}</MDTypography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDButton variant="outlined" onClick={(e) => deleteRisk(e, keyb)}>
                            <DeleteIcon />
                          </MDButton>
                        </Grid>
                        {/* </Grid> */}

                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}

                        {Object.keys(xb).map((xc, keyc) =>
                          controlItems1.findIndex(
                            (vala1) => vala1.parameterName.split(" ").join("") === xc
                          ) >= 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <RenderControl
                                x={xc}
                                id={keyc}
                                controlItems1={controlItems1}
                                //  filterPolicyJson={filterPolicyJson}
                                xb={xb}
                                idd={keyb}

                                // name="RiskItems"
                              />
                            </Grid>
                          ) : null
                        )}
                        <br />
                        {/* </Grid> */}
                      </>
                    ))}
                  </Grid>
                </AccordionDetails>
                {/* {xa.RiskItems.map((xb,keyb)=>
                        <AccordionDetails>
                            Person{keyb+1}
                           
                        </AccordionDetails>
                        )} */}
              </Accordion>
            ) : null
          )}
          <br />
          <Grid container style={{ justifyContent: "end", alignItems: "end" }}>
            {enType !== 168 ? (
              <Grid item xs={12} sm={12} md={2.5} xl={2.5} xxl={2.5}>
                <MDButton variant="contained" onClick={getPremiumCalculation}>
                  Calculate Premium
                </MDButton>
              </Grid>
            ) : null}
          </Grid>

          {flag1 === true && ratingData?.EndorsementPremium !== undefined ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6">
                  Total Premium:{ratingData.EndorsementPremium.TotalPremium}
                </MDTypography>
              </Grid>
              {flag1 === true &&
                PolicyJson.ProductCode !== "GroupTravelV1" &&
                premiumflag === true && (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h4">Payment Details</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Payment Reference Number"
                        name="PaymentReferenceNumber"
                        value={saveDto.PaymentReferenceNumber}
                        onChange={handlePayment}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Paid Amount"
                        name="PaidAmount"
                        value={saveDto.PaidAmount}
                        onChange={handlePayment}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Payment Type"
                        name="PaymentType"
                        value={saveDto.PaymentType}
                        onChange={handlePayment}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{ label: "Payment Date" }}
                        value={paymentDate}
                        onChange={(e) => handleDateChange(e, "payment")}
                        options={{ altFormat: "d-m-Y", altInput: true }}
                      />
                    </Grid>
                  </>
                )}
            </Grid>
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={ratingFlag}
            >
              <CircularProgress />
            </Backdrop>
          )}
          <Grid container style={{ alignItems: "center", justifyContent: "center" }}>
            <MDButton variant="contained" onClick={viewSummary}>
              View Summary
            </MDButton>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {summaryFlag === true ? (
        <Summary
          filterPolicyJson={filterPolicyJson}
          object={object}
          controlItems1={controlItems1}
          PolicyJson={PolicyJson}
          handleSubmit={handleSubmit}
          endorsementCategory={endorsementCategory}
          endorsementType={endorsementType}
          enCat={enCat}
          enType={enType}
          names={names}
        />
      ) : null}

      <Modal
        hideBackdrop
        open={modalFlag}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <MDBox sx={style}>
          <Grid container justifyContent="end" alignItems="end">
            <MDButton onClick={handleClose}>
              <RemoveIcon />
            </MDButton>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Member Details</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Name" name="Name" value={riskObj.Name} onChange={handleRisk} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                input={{ label: "DOB" }}
                fullWidth
                name="DOB"
                value={d1}
                options={{ altFormat: "d-m-Y", altInput: true }}
                onChange={handleRiskDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="MemberId"
                name="MemberID"
                value={riskObj.MemberID}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Age" name="Age" value={riskObj.Age} onChange={handleRisk} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Gender" name="Gender" value={riskObj.Gender} onChange={handleRisk} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PassportNo"
                name="PassportNo"
                value={riskObj.PassportNo}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PreExisting Disease"
                name="PreExistingDisease"
                value={riskObj.PreExistingDisease}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Nationality"
                name="Nationality"
                value={riskObj.Nationality}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Visa Type"
                name="VisaType"
                value={riskObj.VisaType}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Sum Insured"
                name="SumInsured"
                value={riskObj.SumInsured}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Height Member"
                name="HeightMember"
                value={riskObj.HeightMember}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Weight Member"
                name="WeightMember"
                value={riskObj.WeightMember}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Mobile No"
                name="MobileNoMember"
                value={riskObj.MobileNoMember}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Relationship To Proposer"
                name="relationShipToProposer"
                value={riskObj.relationShipToProposer}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Relation With Insured"
                name="RelationWithInsured"
                value={riskObj.RelationWithInsured}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Details Of Existing Policy From NivaBupa Health Insurance"
                name="DetailsOfExistingPolicyFromNivaBupaHealthInsurance"
                value={riskObj.DetailsOfExistingPolicyFromNivaBupaHealthInsurance}
                onChange={handleRisk}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Details Of Past Travel Insurance Policy From Niva Bupa Health Insurance"
                name="DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance"
                value={riskObj.DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance}
                onChange={handleRisk}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <MDButton onClick={addMember}>Add</MDButton>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

export default Details;
