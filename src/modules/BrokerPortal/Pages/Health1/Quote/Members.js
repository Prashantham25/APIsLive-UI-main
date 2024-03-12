import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Grid, Card, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
// import { useDataController, setHealthInsuranceDetails } from "../../context";
import { arrayRange } from "Common/Validations";
import { riskItem } from "../data/json";

function CardButton({ item, ind, membersDto, setMemberDto }) {
  const lDto = membersDto;
  const onCardClick = (e) => {
    lDto[ind].select = e.target.checked;
    setMemberDto([...lDto]);
  };
  return (
    <Card sx={{ background: item.select ? "#42a5f5" : "#f5f5f5" }} component="label">
      <input type="checkbox" hidden onChange={(e) => onCardClick(e)} />
      <MDBox p={3}>
        <MDTypography align="center">{item.label}</MDTypography>
      </MDBox>
    </Card>
  );
}
function CardCountButton({ item, ind, membersDto, setMemberDto }) {
  const lDto = [...membersDto];
  const onAdd = () => {
    lDto[ind].count = item.count + 1;
    lDto[ind].select = item.count !== 0;
    setMemberDto([...lDto]);
  };
  const onSub = () => {
    lDto[ind].count = item.count - 1;
    lDto[ind].select = item.count !== 0;
    setMemberDto([...lDto]);
  };

  return (
    <Card sx={{ background: item.count === 0 ? "#f5f5f5" : "#42a5f5" }}>
      <MDBox p={1} pl={3} pr={3}>
        <MDTypography align="center">{item.label}</MDTypography>
        <Stack direction="row">
          <MDButton variant="text" onClick={onAdd} disabled={lDto[2].count + lDto[3].count === 4}>
            <AddIcon />
          </MDButton>
          <MDTypography align="center">{item.count}</MDTypography>
          <MDButton variant="text" onClick={onSub} disabled={item.count === 0}>
            <RemoveIcon />
          </MDButton>
        </Stack>
      </MDBox>
    </Card>
  );
}

function Members({ handleNext, policyDto, setPolicyDto }) {
  const LPolicyDto = policyDto;
  const [useEFlag, setUseEFlag] = useState(0);
  const [membersDto, setMemberDto] = useState([
    { label: "Self", select: false },
    { label: "Spouse", select: false },
    { label: "Son", select: false, count: 0 },
    { label: "Daughter", select: false, count: 0 },
    { label: "Father", select: false },
    { label: "Mother", select: false },
    { label: "FatherInLaw", select: false },
    { label: "MotherInLaw", select: false },
  ]);

  useEffect(() => {
    if (useEFlag !== 0) {
      const arr = [];
      membersDto.forEach((x) => {
        if (x.select) {
          if (x.label === "Son") {
            arrayRange(1, x.count, 1).forEach(() => {
              arr.push({ ...riskItem, RelationshipWithApplicant: x.label, Gender: "19" });
            });
          } else if (x.label === "Daughter") {
            arrayRange(1, x.count, 1).forEach(() => {
              arr.push({ ...riskItem, RelationshipWithApplicant: x.label, Gender: "20" });
            });
          } else if (x.label === "Father" || x.label === "FatherInLaw")
            arr.push({ ...riskItem, RelationshipWithApplicant: x.label, Gender: "19" });
          else if (x.label === "Mother" || x.label === "MotherInLaw")
            arr.push({ ...riskItem, RelationshipWithApplicant: x.label, Gender: "20" });
          else arr.push({ ...riskItem, RelationshipWithApplicant: x.label });
        }
      });
      console.log(5555, arr);
      LPolicyDto.InsurableItem[0].RiskItems.forEach((x1) => {
        arr.forEach((x2, i2) => {
          if (x1.RelationshipWithApplicant === x2.RelationshipWithApplicant) {
            arr[i2].DateOfBirth = x1.DateOfBirth;
            arr[i2].Age = x1.Age;
            arr[i2].Gender = x1.Gender;
            arr[i2].GenderValue = x1.GenderValue;
            arr[i2].Address = x1.Address;
          }
        });
      });
      LPolicyDto.InsurableItem[0].RiskItems = [...arr];
      setPolicyDto({ ...LPolicyDto });
    }
  }, [membersDto]);

  const navigate = useNavigate();

  console.log(545454, LPolicyDto);

  const OnNext = () => {
    handleNext();
  };

  const OnBack = () => {
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
  };

  useEffect(() => {
    if (LPolicyDto.InsurableItem[0].RiskItems.length > 0) {
      let sunC = 0;
      let daughterC = 0;
      LPolicyDto.InsurableItem[0].RiskItems.forEach((x1) => {
        membersDto.forEach((x2, i2) => {
          if (x1.RelationshipWithApplicant === x2.label) membersDto[i2].select = true;
        });
        if (x1.RelationshipWithApplicant === "Son") sunC += 1;
        if (x1.RelationshipWithApplicant === "Daughter") daughterC += 1;
      });
      membersDto[2].count = sunC;
      membersDto[3].count = daughterC;
    }
    setMemberDto([...membersDto]);
    setUseEFlag(useEFlag + 1);
  }, []);

  return (
    <MDBox>
      <MDTypography>Select members you want to insure </MDTypography>

      <Grid container spacing={1}>
        {membersDto.map((x, i) => (
          <Grid item xs={4} md={4} lg={3} xl={3} xxl={3}>
            {x.label === "Son" || x.label === "Daughter" ? (
              <CardCountButton
                item={x}
                ind={i}
                membersDto={membersDto}
                setMemberDto={setMemberDto}
              />
            ) : (
              <CardButton item={x} ind={i} membersDto={membersDto} setMemberDto={setMemberDto} />
            )}
          </Grid>
        ))}

        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: "0.7rem" }}>
            Disclaimer: <span style={{ color: "#D90000" }}>You can add maximum of 4 children</span>
          </MDTypography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: "0.7rem" }}>
            By clicking, I agree to *<span style={{ color: "#0071D9" }}>terms & conditions</span>{" "}
            and <span style={{ color: "#0071D9" }}>privacy policy.</span>
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox sx={{ mt: "2rem" }}>
        <Grid container justifyContent="space-between">
          <MDButton onClick={OnBack} variant="outlined" color="info">
            Back
          </MDButton>
          <MDButton
            onClick={OnNext}
            variant="contained"
            color="info"
            disabled={LPolicyDto.InsurableItem[0].RiskItems.length === 0}
          >
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Members;
