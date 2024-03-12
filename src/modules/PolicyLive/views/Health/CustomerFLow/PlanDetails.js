import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import { getPlanDetailsByProductID } from "./data";
import MDButton from "../../../../../components/MDButton";

function PlanDetails({ handleNext }) {
  const [PlanCoverCompleteDetails, setPlanCoverCompleteDetails] = useState([]);
  const [JsonBenefitdetails, setJsonBenefitdetails] = useState([]);

  useEffect(async () => {
    const PlanCoverDetails = await getPlanDetailsByProductID();
    setPlanCoverCompleteDetails(PlanCoverDetails);
    console.log("plpl", PlanCoverCompleteDetails);
    // console.log("groupdetails", PlanCoverCompleteDetails[0].groupDetails[0].sectionMappingDetails);

    console.log("plpl", PlanCoverCompleteDetails);
    console.log("Benefitdetaisl", JsonBenefitdetails);
  }, []);

  useEffect(() => {
    if (PlanCoverCompleteDetails.length > 0) {
      const arr = [];
      PlanCoverCompleteDetails.map((key, row) => {
        arr.push(JSON.parse(PlanCoverCompleteDetails[row].groupDetails[0].sectionMappingDetails));

        console.log(JsonBenefitdetails, "roww");
        console.log(key, "roww");
        console.log(row, "roww");
        return null;
      });
      setJsonBenefitdetails(arr);

      console.log("Benefitdetaisl", arr);
    }
  }, [PlanCoverCompleteDetails]);

  useEffect(() => {
    console.log("Benefitdetaisl", JsonBenefitdetails);
    console.log("plpl", PlanCoverCompleteDetails);
  }, [PlanCoverCompleteDetails, JsonBenefitdetails]);

  return (
    <Card sx={{ overflowX: "scroll" }}>
      <Stack direction="row" spacing={2} alignContent="center">
        {JsonBenefitdetails.length > 0
          ? JsonBenefitdetails.map((cd, inx) => (
              <MDBox pt={3}>
                <Card
                  // onClick={() => handleClick(model)}
                  sx={{
                    width: "20.18rem",
                    height: "auto",
                    border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    borderRadius: "0.25rem",
                    textAlign: "left",
                    justifyContent: "center",
                    display: "flex",
                    p: "1rem",
                    // "&:hover": {
                    //   // backgroundColor: `${primary.main}`,
                    //   cursor: "pointer",
                    //   "& .text": {
                    //     color: "#FFFFFF",
                    //   },
                    // },
                  }}
                >
                  <MDTypography
                    className="text"
                    sx={{ color: "#000000", fontSize: "1rem", ml: "55px" }}
                  >
                    {PlanCoverCompleteDetails[inx].groupName}
                  </MDTypography>
                  {cd.BenefitDetails.map((ab) => (
                    <MDTypography className="text" sx={{ color: "#000000", fontSize: "1rem" }}>
                      {ab.CoverName}
                    </MDTypography>
                  ))}
                  <MDButton onClick={handleNext}>Choose Plan</MDButton>
                </Card>
              </MDBox>
            ))
          : null}
      </Stack>
    </Card>
  );
}
export default PlanDetails;
