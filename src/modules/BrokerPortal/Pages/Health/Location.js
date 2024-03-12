import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import MDButton from "../../../../components/MDButton";
import { useDataController, setHealthInsuranceDetails } from "../../context";

function Location({ handleNext, handleBack, Json }) {
  const [controller, dispatch] = useDataController();
  const { HealthInsuranceDetails } = controller;
  const pincodeRegex = /^[0-9]{1,6}$/;
  const [QuoteJson, setQuoteJson] = useState(Json);
  const [PincodeDTO, setPincodeDTO] = useState({
    Pincode: "",
    ParentsPincode: "",
    ParentInLawPincode: "",
  });

  const handleChange = (e) => {
    if (pincodeRegex.test(e.target.value)) {
      setPincodeDTO((Prev) => ({ ...Prev, [e.target.name]: e.target.value }));
    }
  };

  const OnNext = () => {
    const { InsurableItem } = QuoteJson;
    const { RiskItems } = InsurableItem[0];
    const Riskdetails = RiskItems;

    const data = Riskdetails.map((item) => {
      const RiskItem = item;
      if (
        (HealthInsuranceDetails.FamilyMembers.Self === true &&
          RiskItem.RelationshipWithApplicant === "Self") ||
        (HealthInsuranceDetails.FamilyMembers.Spouse === true &&
          RiskItem.RelationshipWithApplicant === "Spouse") ||
        (HealthInsuranceDetails.FamilyMembers.Son === true &&
          RiskItem.RelationshipWithApplicant === "Son") ||
        (HealthInsuranceDetails.FamilyMembers.Daughter === true &&
          RiskItem.RelationshipWithApplicant === "Daughter")
      ) {
        // RiskItem.Address[0].Pincode = PincodeDTO.Pincode;
        return {
          ...item,
          Address: [{ ...item.Address[0], Pincode: PincodeDTO.Pincode }],
        };
      }
      if (
        (HealthInsuranceDetails.FamilyMembers.Mother === true &&
          RiskItem.RelationshipWithApplicant === "Mother") ||
        (HealthInsuranceDetails.FamilyMembers.Father === true &&
          RiskItem.RelationshipWithApplicant === "Father")
      ) {
        // RiskItem.Address[0].Pincode = PincodeDTO.ParentsPincode;
        return {
          ...item,
          Address: [{ ...item.Address[0], Pincode: PincodeDTO.ParentsPincode }],
        };
      }
      if (
        (HealthInsuranceDetails.FamilyMembers.MotherInLaw === true &&
          RiskItem.RelationshipWithApplicant === "MotherInLaw") ||
        (HealthInsuranceDetails.FamilyMembers.FatherInLaw === true &&
          RiskItem.RelationshipWithApplicant === "FatherInLaw")
      ) {
        // RiskItem.Address[0].Pincode = PincodeDTO.ParentsPincode;
        return {
          ...item,
          Address: [{ ...item.Address[0], Pincode: PincodeDTO.ParentInLawPincode }],
        };
      }
      return RiskItem;
    });
    InsurableItem[0].RiskItems = data;
    setQuoteJson((prevState) => ({ ...prevState, ...InsurableItem }));
    console.log("QuoteJson", QuoteJson);
    handleNext();
  };
  const OnBack = () => {
    handleBack();
  };
  console.log(HealthInsuranceDetails);

  useEffect(() => {
    // setHealthInsuranceDetails(dispatch, PincodeDTO);
    setHealthInsuranceDetails(dispatch, { ...HealthInsuranceDetails, Pincode: { ...PincodeDTO } });
  }, [PincodeDTO]);

  return (
    <MDBox>
      <MDTypography> Tell us where do you & your family members live </MDTypography>
      <MDBox mt={6} ml={3}>
        <Grid container textAlign="center" spacing={3}>
          <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
            Where do you live?
          </MDTypography>
          <MDBox ml={24} sx={{ fontSize: "1.25rem", color: "rgba(0, 0, 0, 0.87)" }}>
            <MDInput
              label="Pincode you live"
              fullWidth
              type="text"
              value={PincodeDTO.Pincode}
              onChange={handleChange}
              name="Pincode"
              inputProps={{ minLength: 6 }}
            />
          </MDBox>
        </Grid>
      </MDBox>
      {HealthInsuranceDetails.FamilyMembers.Father ||
      HealthInsuranceDetails.FamilyMembers.Mother === true ? (
        <MDBox mt={6} ml={3}>
          <Grid container textAlign="center" spacing={3}>
            <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
              Where do your parents live?
            </MDTypography>
            <MDBox ml={14} sx={{ fontSize: "1.25rem", color: "rgba(0, 0, 0, 0.87)" }}>
              <MDInput
                label="Pincode your parents live"
                text="number"
                fullWidth
                value={PincodeDTO.ParentsPincode}
                sx={{ minLength: 6 }}
                onChange={handleChange}
                name="ParentsPincode"
              />
            </MDBox>
          </Grid>
        </MDBox>
      ) : null}
      {HealthInsuranceDetails.FamilyMembers.FatherInLaw ||
      HealthInsuranceDetails.FamilyMembers.MotherInLaw === true ? (
        <MDBox mt={6} ml={3}>
          <Grid container textAlign="center" spacing={3}>
            <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
              Where do your parent-in-law`s live?
            </MDTypography>
            <MDBox ml={6} sx={{ fontSize: "1.25rem", color: "rgba(0, 0, 0, 0.87)" }}>
              <MDInput
                label="Pincode your parent-in-law`s  live"
                text="number"
                fullWidth
                value={PincodeDTO.ParentInLawPincode}
                sx={{ minLength: 6 }}
                onChange={handleChange}
                name="ParentInLawPincode"
              />
            </MDBox>
          </Grid>
        </MDBox>
      ) : null}
      <MDBox>
        <Grid container justifyContent="space-between">
          <MDButton
            onClick={OnBack}
            // disabled={activeStep === 0}
            variant="outlined"
            color="info"
            sx={{ mt: "2rem" }}
          >
            Back
          </MDButton>

          <MDButton
            onClick={OnNext}
            // disabled={activeStep === steps.length}
            variant="contained"
            color="info"
            sx={{ mt: "2rem" }}
          >
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Location;
