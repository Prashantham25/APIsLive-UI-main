import { Grid } from "@mui/material";
import MDDatePicker from "../../../../components/MDDatePicker";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import MDBox from "../../../../components/MDBox";
import { addDays } from "../../../../Common/Validations";

function StartingDate({ handleNext, setObj, obj }) {
  const onChange = (e, v) => {
    const dd = v.split("-");
    const ed = addDays(`${dd[1]}-${dd[2]}-${dd[0]}`, 365);
    const dd1 = ed.split("-");
    console.log(dd, ed, dd1);

    setObj({
      ...obj,
      ProposerReq: {
        ...obj.ProposerReq,
        "Policy Start Date": v,
        "Policy End Date": `${dd1[2]}-${dd1[0]}-${dd1[1]}`,
      },
    });
  };

  const onProceed = () => {
    handleNext();
  };
  // const onBack = () => {
  //   handleBack();
  // };
  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography>Starting Date</MDTypography>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{
            label: "Start Date",
            value: obj.ProposerReq["Policy Start Date"] ? " " : "",
          }}
          value={obj.ProposerReq["Policy Start Date"]}
          options={{
            dateFormat: "Y-m-d",
            altFormat: "Y-m-d",
            altInput: true,
          }}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          {/* <MDButton onClick={onBack}>Back</MDButton> */}
          <MDButton onClick={onProceed}>Proceed</MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default StartingDate;
