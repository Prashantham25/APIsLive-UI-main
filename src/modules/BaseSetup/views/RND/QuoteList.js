import { useEffect, useState } from "react";
import { Grid, Stack, Card, Chip, Collapse, Checkbox, FormControlLabel } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetQuote } from "./data";
import MDBox from "../../../../components/MDBox";
import MDAvatar from "../../../../components/MDAvatar";

import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";
import { images } from "../../../BrokerPortal/context";

function PlanCard() {
  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        height: "auto",
        justifyContent: "center",
        alignItems: "normal",
        borderWidth: "thin",
        bgcolor: "#ECF3F8",
      }}
      width="100%"
    >
      <MDBox width="100%">
        <Grid container spacing={2} textAlign="center" p={2}>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography sx={{ fontSize: 15 }}>Plan Name</MDTypography>
            <MDTypography variant="h6">Plan Name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography sx={{ fontSize: 15 }}>Loss Of Passport</MDTypography>
            <MDTypography variant="h6">Not Covered</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography sx={{ fontSize: 15 }}>Baggage Loss</MDTypography>
            <MDTypography variant="h6">Not Covered</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography sx={{ fontSize: 15 }}>Trip Cancellation</MDTypography>
            <MDTypography variant="h6">$1,000</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography sx={{ fontSize: 15 }}>Premium</MDTypography>
            <MDTypography variant="h6">Premium</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Stack spacing={0.2}>
              <MDButton>BUY NOW</MDButton>
              <MDButton variant="outlined">Plan Details</MDButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel control={<Checkbox />} label="Add to compare" />
          </Grid>
        </Grid>{" "}
      </MDBox>
    </Card>
  );
}
const prods = [
  { partnerName: "Reliance", Premium: "10300", Tax: "3.5%" },
  { partnerName: "Care", Premium: "1134000", Tax: "1.4%" },
  { partnerName: "ICICI", Premium: "11000", Tax: "2.4%" },
  { partnerName: "SBI", Premium: "100430", Tax: "6.2%" },
  { partnerName: "Reliance", Premium: "101200", Tax: "2.4%" },
  { partnerName: "SBI", Premium: "143000", Tax: "1.5%" },
  { partnerName: "SBI", Premium: "103400", Tax: "5.5%" },
  { partnerName: "Reliance", Premium: "104500", Tax: "55.5%" },
  { partnerName: "Care", Premium: "101300", Tax: "3.55%" },
  { partnerName: "Reliance", Premium: "106500", Tax: "1.25%" },
  { partnerName: "SBI", Premium: "1001230", Tax: "3.35%" },
  { partnerName: "SBI", Premium: "103400", Tax: "2.5%" },
  { partnerName: "Reliance", Premium: "1023400", Tax: "5.2%" },
  { partnerName: "Care", Premium: "1012100", Tax: "0.3%" },
];
function QuoteList() {
  const [list, setList] = useState([]);
  const [groupList, setGroupList] = useState({});
  const [expands, setExpands] = useState({});

  const onExpandClick = (prodName) => {
    expands[prodName] = !expands[prodName];
    setExpands({ ...expands });
  };

  useEffect(async () => {
    await GetQuote("0918/0053/113010/00/000").then((res) => {
      console.log("res", res);
      const finalRes = res.data.quotationDetails;
      setList([...finalRes]);

      const tGroupArr = prods.reduce((group1, product) => {
        const group = group1;
        const { partnerName } = product;
        group[partnerName] = group[partnerName] ?? [];
        group[partnerName].push(product);
        return group;
      }, {});
      setGroupList({ ...tGroupArr });

      Object.keys(tGroupArr).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    });
  }, []);

  console.log("list", list);
  console.log("groupList", groupList);
  return (
    <MDBox>
      <Stack spacing={2}>
        {Object.keys(groupList).map((x1) => (
          <Stack direction="row">
            <MDBox>
              <MDAvatar src={images[x1.partnerName]} size="xxl" variant="square" />
            </MDBox>
            <MDBox width="100%">
              {groupList[x1].map((x2, i2) => i2 === 0 && <PlanCard />)}

              {groupList[x1].map(
                (x2, i2) =>
                  i2 !== 0 && (
                    <Collapse in={expands[x1]} out={!expands[x1]}>
                      <PlanCard />
                    </Collapse>
                  )
              )}

              {groupList[x1].length > 1 && (
                <Chip
                  label={
                    expands[x1]
                      ? "Hide more options from ".concat(x1)
                      : (groupList[x1].length - 1).toString().concat(" more options for ", x1)
                  }
                  onClick={() => onExpandClick(x1)}
                  icon={expands[x1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                />
              )}
            </MDBox>
          </Stack>
        ))}
      </Stack>
    </MDBox>
  );
}
export default QuoteList;
