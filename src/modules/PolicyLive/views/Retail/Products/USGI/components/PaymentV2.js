import { useState } from "react";
import swal from "sweetalert";
import { Grid, Card, RadioGroup, FormControlLabel, Radio, Autocomplete } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { subDays } from "date-fns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import { GetBGRMasters } from "../../../../Home/data/index";
import { sendPaymentMail } from "../data/APIs/USGIWCApi"; // makePayment,

export default function PaymentV2({ dto, setDto }) {
  // const navigate = useNavigate();
  const [invalidInsNo, setInvalidInsNo] = useState(false);
  //   const lMasters = masters;

  console.log(invalidInsNo);
  const lDto = dto;
  const [EmailId, setEmail] = useState(dto.ProposerDetails["Email ID"]);
  const { BankName } = GetBGRMasters().bgrMaster.Masters;

  const handleSetValue = (e, v) => {
    lDto.PaymentDetails.BankName = v.mValue;
    setDto({ ...lDto });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onlinePayment = async () => {
    // const res1 = await makePayment(masters.bodyData);
    // console.log("makePayment", res1);
  };

  const onEmail = async () => {
    const mail = await sendPaymentMail(dto.proposalNumber, dto.ProposerDetails["Email ID"]);

    if (mail.data.status === 1) {
      swal({
        text: `Payment Link
          Shared Successfully.`,
        buttons: "Home",
        html: true,
        icon: "success",
      }).then(() => window.open(process.env.REACT_APP_HOMEURL, "_self"));
    }
  };

  const handelInstrument = (e) => {
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value) || e.target.value === "") {
      lDto.PaymentDetails[e.target.name] = e.target.value;
      setDto({ ...lDto });
    }
  };

  const handleDateChange = (d, v) => {
    lDto.PaymentDetails.InstrumentDate = v;
    setDto({ ...lDto });
  };

  const handleInstrumentNoVAlidation = (e) => {
    const numReg = /^[0-9]{6}$/;
    if (!numReg.test(e.target.value)) {
      setInvalidInsNo(true);
    } else {
      setInvalidInsNo(false);
    }
  };
  //   const errText = "Please fill the required fields";

  const onPaymentMethod = (e) => {
    lDto.PaymentDetails.ModeOfPayment = e;
    setDto({ ...lDto });
  };

  return (
    <Grid container mt={2} spacing={2}>
      <Grid item xs={12} sm={12} md={3}>
        <MDBox display="flex" flexDirection="column" spacing={2}>
          <MDButton
            onClick={() => onPaymentMethod("Check")}
            variant={dto.PaymentDetails.ModeOfPayment === "Check" ? "contained" : "outlined"}
          >
            Cheque
          </MDButton>
          <br />
          <MDButton
            onClick={() => onPaymentMethod("Online")}
            variant={dto.PaymentDetails.ModeOfPayment === "Online" ? "contained" : "outlined"}
          >
            Online Payment
          </MDButton>
          <br />
          <MDButton
            onClick={() => onPaymentMethod("EmailLink")}
            variant={dto.PaymentDetails.ModeOfPayment === "EmailLink" ? "contained" : "outlined"}
          >
            Send Payment Link
          </MDButton>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <MDBox display="flex" flexDirection="column">
          {dto.PaymentDetails.ModeOfPayment === "Check" && (
            <>
              <Grid item>
                <MDInput label="Cheque Amount" disabled value={dto.PaymentDetails.ChequeAmount} />
              </Grid>
              <br />
              <MDInput
                label="Instrument No."
                name="InstrumentNo"
                inputProps={{ maxLength: 6 }}
                value={dto.PaymentDetails.InstrumentNo}
                onChange={handelInstrument}
                onBlur={handleInstrumentNoVAlidation}
                error={
                  //   (dto.PaymentDetails.InstrumentNo === "" && masters.errorFlag) ||
                  dto.PaymentDetails.InstrumentNo !== "" && invalidInsNo
                }
                helperText={
                  //   (dto.PaymentDetails.InstrumentNo === "" && masters.errorFlag && errText) ||
                  dto.PaymentDetails.InstrumentNo !== "" &&
                  invalidInsNo &&
                  "Please enter a 6 digit InstrumentNo"
                }
              />
              <br />
              <MDDatePicker
                input={{
                  label: `Instrument Date`,
                  value: dto.PaymentDetails.InstrumentDate,
                  //   error: dto.PaymentDetails.InstrumentDate === "" && masters.errorFlag,
                  //   helperText:
                  //     dto.PaymentDetails.InstrumentDate === "" && masters.errorFlag && errText,
                }}
                value={dto.PaymentDetails.InstrumentDate}
                options={{
                  altFormat: "d-m-Y",
                  dateFormat: "d-m-Y",
                  altInput: true,
                  maxDate: new Date(),
                  minDate: subDays(new Date(), 60),
                }}
                onChange={handleDateChange}
                renderInput={(params) => <MDInput {...params} />}
              />
              <br />
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                disableClearable
                options={BankName}
                onChange={handleSetValue}
                value={{ mValue: lDto.PaymentDetails.BankName }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{ width: "100%" }}
                    label="Bank Name"
                    required
                    // error={dto.PaymentDetails.BankName === "" && masters.errorFlag}
                    // helperText={dto.PaymentDetails.BankName === "" && masters.errorFlag && errText}
                  />
                )}
              />
            </>
          )}
          {dto.PaymentDetails.ModeOfPayment === "Online" && (
            <>
              <MDBox
                sx={{
                  minHeight: "100%",
                  minWidth: "90%",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderColor: "text.primary",
                  borderRadius: 1,
                }}
              >
                <RadioGroup
                  row
                  sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%", ml: 2 }}
                  defaultValue="Pay-U"
                >
                  <FormControlLabel
                    value="Pay-U"
                    control={<Radio />}
                    label="Pay-U"
                    sx={{ borderRadius: "50%" }}
                  />
                </RadioGroup>
              </MDBox>
              <br />
              <MDButton sx={{ width: "200px", ml: "5rem" }} onClick={onlinePayment}>
                Make Payment
              </MDButton>
            </>
          )}
          {dto.PaymentDetails.ModeOfPayment === "EmailLink" && (
            <>
              <MDInput label="Email" value={EmailId} onChange={handleEmailChange} />
              <br />
              <MDButton sx={{ width: "200px", ml: "5rem" }} onClick={onEmail}>
                Send Link
              </MDButton>
            </>
          )}
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Card sx={{ background: "#E5E4E2", borderRadius: "0px" }}>
          <MDBox display="flex" flexDirection="row" sx={{ p: 4 }}>
            <MDBox display="flex" flexDirection="column" spacing={6}>
              <Grid item>
                <MDTypography>Net Premium</MDTypography>
              </Grid>
              <br />
              <Grid item>
                <MDTypography>GST(18%)</MDTypography>
              </Grid>
              <br />
              <Grid item>
                <MDTypography sx={{ fontWeight: "bold" }}>Total Premium</MDTypography>
              </Grid>
            </MDBox>
            <MDBox display="flex" flexDirection="column" ml={5} spacing={6}>
              <Grid item>
                <MDTypography>₹ {dto?.PremiumDetails?.["Net Premium"]}</MDTypography>
              </Grid>
              <br />
              <Grid item>
                <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
              </Grid>
              <br />
              <Grid item>
                <MDTypography sx={{ fontWeight: "bold" }}>
                  ₹ {dto?.PremiumDetails?.["Total with Tax"]}
                </MDTypography>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}
