import {
  Modal,
  Grid,
  Autocomplete,
  Radio,
  FormControlLabel,
  RadioGroup,
  //   Stack,
} from "@mui/material";

import MDTypography from "components/MDTypography";
import CloseIcon from "@mui/icons-material/Close";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDDatePicker from "components/MDDatePicker";

import { modelStyle1 } from "../data/Json/USGIWCJson";

const errText = "Please fill the required fields";

const datePlaceHolder = (format) => {
  //   debugger;
  const finalFormat = [];
  const deliMeter = format[1];
  const spiltFormat = format.split(deliMeter);
  spiltFormat.forEach((x) => {
    if (x === "d") finalFormat.push("DD");
    if (x === "m") finalFormat.push("MM");
    if (x === "Y") finalFormat.push("YYYY");
  });
  console.log("8765435", finalFormat.join(deliMeter));
  return finalFormat.join(deliMeter);
};

function MemberDetails({ dto, setDto, masters, setMasters }) {
  const lMasters = masters;
  const lDto = dto;

  const handleChange = (e) => {
    const { name, value } = e.target;
    lMasters.newRisk[name] = value;
    setMasters({ ...lMasters });
  };
  const handleAuto = (e, v, n) => {
    lMasters.newRisk[n] = v.mValue;
    setMasters({ ...lMasters });
  };
  const handleDateChange = (e, d) => {
    // lMasters.newRisk.DOB = formatDateKYC(e);
    lMasters.newRisk.DOB = d;

    setMasters({ ...lMasters });
  };
  const handelClose = () => {
    lMasters.newRisk = {
      SNo: "",
      Name: "",
      Gender: "",
      DOB: "",
      MAge: "",
      relationShipToProposer: "",
      Nationality: "",
      PassportNo: "",
      MobileNoMember: "",
    };
    lMasters.addFlag = false;
    setMasters({ ...lMasters });
  };

  const handleAdd = () => {
    if (
      masters.newRisk.Name === "" ||
      masters.newRisk.Gender === "" ||
      masters.newRisk.DOB === "" ||
      masters.newRisk.MAge === "" ||
      masters.newRisk.Nationality === "" ||
      masters.newRisk.MobileNoMember === "" ||
      masters.newRisk.PassportNo === "" ||
      masters.newRisk.relationShipToProposer === ""
    ) {
      lMasters.errRisk = true;
      setMasters({ ...lMasters });
    } else {
      lDto.InsurableItem[0].RiskItems = [
        ...dto.InsurableItem[0].RiskItems,
        {
          ...lMasters.newRisk,
          SNo: dto.InsurableItem[0].RiskItems.length + 1,
          RelationWithInsured: "",
          VisaType: " ",
        },
      ];

      lMasters.newRisk = {
        SNo: "",
        Name: "",
        Gender: "",
        DOB: "",
        MAge: "",
        relationShipToProposer: "",
        Nationality: "",
        PassportNo: "",
        MobileNoMember: "",
      };
      lMasters.editval = false;
      lMasters.addFlag = false;
      setMasters({ ...lMasters });
      setDto({ ...lDto });
    }
  };
  const handleEdit = () => {
    if (
      masters.newRisk.Name === "" ||
      masters.newRisk.Gender === "" ||
      masters.newRisk.DOB === "" ||
      masters.newRisk.MAge === "" ||
      masters.newRisk.Nationality === "" ||
      masters.newRisk.MobileNoMember === "" ||
      masters.newRisk.PassportNo === "" ||
      masters.newRisk.relationShipToProposer === ""
    ) {
      lMasters.errRisk = true;
      setMasters({ ...lMasters });
    } else {
      const riskIndex = lDto.InsurableItem[0].RiskItems.findIndex(
        (item) => item.SNo === masters.rowId
      );
      if (riskIndex !== -1) {
        const updatedRiskItems = [...lDto.InsurableItem[0].RiskItems];
        updatedRiskItems[riskIndex] = {
          ...lMasters.newRisk,
        };
        lDto.InsurableItem[0].RiskItems = updatedRiskItems;
        updatedRiskItems.forEach((x, i) => {
          updatedRiskItems[i].SNo = i + 1;
        });
        setDto({ ...lDto });
      }

      lMasters.editval = false;
      lMasters.addFlag = false;
      lMasters.editFlag = false;
      setMasters({
        ...lMasters,
        newRisk: {
          SNo: "",
          Name: "",
          Gender: "",
          DOB: "",
          MAge: "",
          relationShipToProposer: "",
          Nationality: "",
          PassportNo: "",
          MobileNoMember: "",
        },
      });
      setDto({ ...lDto });
    }
  };

  // const dto=lDto;
  return (
    <Modal open={masters?.addFlag}>
      <MDBox sx={modelStyle1}>
        <CloseIcon
          sx={{
            position: "fixed",
            top: "40px",
            right: "40px",
            cursor: "pointer !important",
            transition: "transform 0.5s ease-in-out !important",
          }}
          onClick={handelClose}
        />

        <MDTypography variant="h6" color="primary">
          {masters.editFlag ? "Edit Member Details" : "Member Details"}
          {/* All Risk */}
        </MDTypography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Name"
              required
              name="Name"
              value={lMasters.newRisk.Name}
              onChange={handleChange}
              placeholder="Enter "
              error={masters.newRisk.Name === "" && masters.errRisk}
              helperText={masters.newRisk.Name === "" && masters.errRisk && errText}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDInput
              label="Gender"
              name="Gender"
              value={lMasters.newRisk.Gender}
              onChange={handleChange}
              placeholder="Enter"
              // InputProps={{ readOnly: true }}
              // error={masters.flags.gradeErr}
              // helperText={
              //   masters.flags.gradeErr &&
              //   "This will be subject to underwriter Approval. Kindly refer the proposal to Underwriter"
              // }
            /> */}
            <Autocomplete
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masters.Gender}
              value={{ mValue: masters.newRisk.Gender }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, v) => handleAuto(e, v, "Gender")}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Gender"
                  required
                  error={masters.newRisk.Gender === "" && masters.errRisk}
                  helperText={masters.newRisk.Gender === "" && masters.errRisk && errText}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDInput
              label="Date of Birth"
              required
              name="DOB"
              // type="number"
              value={lMasters.newRisk.DOB}
              onChange={handleChange}
              // onBlur={IsNumeric}
              // placeholder="Enter No"
              // error={masters.newRisk.NoOfEmployees === "" && masters.errRisk}
              // helperText={masters.newRisk.NoOfEmployees === "" && masters.errRisk && errText}
            /> */}
            {/* <MDDatePicker
              fullWidth
              name="DOB"
              label="Date of Birth"
              options={{
                dateFormat: "Y-m-d",
                altFormat: "d-m-Y",
                altInput: true,
                maxDate: new Date(),
                allowInput: true,
              }}
              input={{
                label: "Date of Birth",
                value: masters.newRisk.DOB,
                error: masters.newRisk.DOB === "" && masters.errRisk,
                helperText: masters.newRisk.DOB === "" && masters.errRisk && errText,
                required: true,
                placeholder: datePlaceHolder("d-m-Y"),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={masters.newRisk.DOB}
              onChange={(e, d) => handleDateChange(e, d)}
            /> */}
            <MDDatePicker
              fullWidth
              options={{
                dateFormat: "Y-m-d",
                altFormat: "d-m-Y",
                altInput: true,
                maxDate: new Date(),
                allowInput: true,
              }}
              input={{
                label: "Date of Birth",
                value: masters?.newRisk?.DOB === null ? "" : masters?.newRisk?.DOB,
                error: masters.newRisk.DOB === "" && masters.errRisk,
                helperText: masters.newRisk.DOB === "" && masters.errRisk && errText,
                required: true,
                InputLabelProps: {
                  shrink: true,
                },
                placeholder: datePlaceHolder("d-m-Y"),
              }}
              value={masters.newRisk.DOB}
              onChange={(e, d) => handleDateChange(e, d)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Age"
              required
              name="MAge"
              value={lMasters.newRisk.MAge}
              onChange={handleChange}
              //   onBlur={handleMonthly}
              // placeholder="Enter Amount"
              // error={masters.newRisk.MonthlyWagesPerWorker === "" && masters.errRisk}
              // helperText={
              //   masters.newRisk.MonthlyWagesPerWorker === "" && masters.errRisk && errText
              // }

              error={masters.newRisk.MAge === "" && masters.errRisk}
              helperText={masters.newRisk.MAge === "" && masters.errRisk && errText}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="RelationShip to Proposer"
              name="relationShipToProposer"
              value={lMasters.newRisk.relationShipToProposer}
              required
              onChange={handleChange}
              error={masters.newRisk.relationShipToProposer === "" && masters.errRisk}
              helperText={
                masters.newRisk.relationShipToProposer === "" && masters.errRisk && errText
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Nationality"
              name="Nationality"
              value={lMasters.newRisk.Nationality}
              required
              onChange={handleChange}
              error={masters.newRisk.Nationality === "" && masters.errRisk}
              helperText={masters.newRisk.Nationality === "" && masters.errRisk && errText}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="PassportNo"
              name="PassportNo"
              value={lMasters.newRisk.PassportNo}
              required
              onChange={handleChange}
              error={masters.newRisk.PassportNo === "" && masters.errRisk}
              helperText={masters.newRisk.PassportNo === "" && masters.errRisk && errText}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Mobile Number"
              name="MobileNoMember"
              value={lMasters.newRisk.MobileNoMember}
              required
              onChange={handleChange}
              error={masters.newRisk.MobileNoMember === "" && masters.errRisk}
              helperText={masters.newRisk.MobileNoMember === "" && masters.errRisk && errText}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                <MDTypography sx={{ fontSize: "1rem" }}>
                  I hereby declare on behalf of all members proposed to be insured that I/we are in
                  good health and not under any treatment or surgical problem or follow up for any
                  medical condition. Neither have I/we ever been investigated for,diagnosed with or
                  under treatmentfor any chronic health condition nor are any medical or surgical
                  treatment or follow up planned for me/us in the near future.
                </MDTypography>{" "}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <RadioGroup row>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    //   disabled={!ViewFlag1}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    //   disabled={!ViewFlag1}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="right" mt={6}>
          <MDButton
            onClick={masters.editFlag ? handleEdit : handleAdd}
            // onClick={handleAdd}
          >
            {masters.editFlag ? "Update" : "Submit"}
            {/* Submit */}
          </MDButton>
        </Grid>
      </MDBox>
    </Modal>
  );
}
export default MemberDetails;
