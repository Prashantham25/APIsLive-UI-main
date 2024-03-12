import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Chip, Stack } from "@mui/material";

function CoverDetails({ PolicyDto, setPolicyDto }) {
  const PolicyDtoL = PolicyDto;
  const [coverTypes, setCoverTypes] = useState([
    { id: 1, selected: false, value: "Flat Coverage" },
    { id: 2, selected: false, value: "Graded Coverage" },
  ]);
  const [id, setId] = useState(-1);
  const [id1, setId1] = useState(-1);
  const [id2, setId2] = useState(-1);

  const [coverageAmount, setCoverageAmount] = useState([
    { id: 1, selected: false, value: "₹ 1 Lac", amount: 100000 },
    { id: 2, selected: false, value: "₹ 2 Lac", amount: 200000 },
    { id: 3, selected: false, value: "₹ 3 Lac", amount: 300000 },
    { id: 4, selected: false, value: "₹ 4 Lac", amount: 400000 },
    { id: 5, selected: false, value: "₹ 5 Lac", amount: 500000 },
    { id: 6, selected: false, value: "₹ 10 Lac", amount: 1000000 },
  ]);

  // const familyDef = ["Employee, Spouse & 2 Kids", "Employee only"];
  const [familyDef, setFamilyDef] = useState([
    { id: 1, selected: false, value: "Employee and Spouse", type: "2A" },
    { id: 2, selected: false, value: "Employee, Spouse & Children", type: "2A and C" },
    {
      id: 3,
      selected: false,
      value: "Employee, Spouse, Children & Dependent Parents",
      type: "4A and C",
    },
    { id: 4, selected: false, value: "Employee Only", type: "1A" },
  ]);
  const handleChip = (e, idd) => {
    setId(idd);
    PolicyDtoL.ProposerDetails.CoverageType = coverTypes[idd].value;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDtoL }));
    console.log("id", id);
  };
  useEffect(() => {
    console.log("2121", id);
    if (id > -1) {
      coverTypes[id].selected = true;
    }
    setCoverTypes(coverTypes);
  }, [id]);

  const handleChip1 = (e, idd1) => {
    PolicyDtoL.ProposerDetails.CoverageAmountPerEmployee = coverageAmount[idd1].amount;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDtoL }));

    setId1(idd1);
    console.log("id", id1);
  };
  useEffect(() => {
    console.log("2121", id1);
    if (id1 > -1) {
      coverageAmount[id1].selected = true;
    }
    setCoverageAmount(coverageAmount);
  }, [id1]);
  const handleChip2 = (e, idd2) => {
    PolicyDtoL.ProposerDetails.CoverageAmountPer = familyDef[idd2].value;
    PolicyDtoL.FamilyDefinition = familyDef[idd2].type;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDtoL }));

    setId2(idd2);
    console.log("id", id2);
  };
  useEffect(() => {
    console.log("2121", id2);
    if (id2 > -1) {
      familyDef[id2].selected = true;
    }
    setFamilyDef(familyDef);
    console.log("098765", PolicyDtoL);
  }, [id2]);
  return (
    <MDBox mt={1}>
      <MDTypography variant="body1" sx={{ my: "1rem" }} color="primary">
        Select Cover details
      </MDTypography>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Select Coverage Type
      </MDTypography>
      <Stack spacing={1} direction="row">
        {coverTypes.map((item, key) => (
          <Chip
            // clickable
            // variant="outlined"
            label={coverTypes[key].value}
            onClick={(e) => handleChip(e, key)}
            // color={id>-1&&coverTypes[id].selected === true ? "success" : "default"}
            color={id === key ? "success" : "default"}
          />
        ))}
      </Stack>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Select Coverage Amount per Employee
      </MDTypography>
      <Stack spacing={1} direction="row">
        {coverageAmount.map((item1, key1) => (
          <Chip
            label={coverageAmount[key1].value}
            onClick={(e) => handleChip1(e, key1)}
            // color={id>-1&&coverTypes[id].selected === true ? "success" : "default"}
            color={id1 === key1 ? "success" : "default"}
          />
        ))}
      </Stack>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Select Family Definition
      </MDTypography>
      <Stack spacing={1} direction="row">
        {familyDef.map((item2, key2) => (
          <Chip
            label={familyDef[key2].value}
            onClick={(e) => handleChip2(e, key2)}
            // color={id>-1&&coverTypes[id].selected === true ? "success" : "default"}
            color={id2 === key2 ? "success" : "default"}
          />
        ))}
      </Stack>
    </MDBox>
  );
}

export default CoverDetails;
