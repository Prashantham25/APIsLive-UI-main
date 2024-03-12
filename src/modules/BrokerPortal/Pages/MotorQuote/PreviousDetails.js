import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { isValid } from "date-fns";
import swal from "sweetalert";
import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomerSupport from "assets/images/BrokerPortal/CustomerSupport.png";
import ClearIcon from "@mui/icons-material/Clear";
import { Modal } from "@mui/material";
import moment from "moment";
import {
  useDataController,
  setSelected,
  setmorethan60,
  setDontKnowPrevdetails,
} from "../../context";
import EditLine from "./EditLine";
import { CompData } from "../MotorComparison/data/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function PreviousDetails({ setPageState, vehicleType, handleEditYear }) {
  const navigate = useNavigate();
  const [prevDetails, setPrevDetails] = useState({
    InsuranceCompany: "",
    PolicyNumber: "",
    PolicyDate: "",
    PreviousPlanType: "",
    // PolicyStartDate: "",
    ODPolicyEndDate: null,
    TPPolicyEndDate: null,
    ODPolicyEndDate1: null,
    TPPolicyEndDate1: null,
    PolicyEndDate: null,
    InsuranceCompanyName: "",
    CompanyName: { mID: "", mValue: "" },
    ODPolicyStartDate: null,
    TPPolicyStartDate: null,
    PrevInsurers: "",
    PolicyData: { mID: "", mValue: "" },
  });
  const [flags, setFlags] = useState({
    compFlag: false,
    tpFlag: false,
    odFlag: false,
    errorFlag: false,
    CompName: { mID: "", mValue: "" },
    prevdetails: false,
    checkFlag: false,
  });

  // const [morethan60days, setmorethan60days] = useState(false);

  const [masters, setMasters] = useState({
    PolicyType: { mID: "", mValue: "" },
  });
  const [controller, dispatch] = useDataController();
  const { selected } = controller;
  // const [date, setDate] = useState(new Date());

  const [modalOpen, setModalOpen] = useState(false);
  // const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // const handleModal60daysClose = () => {
  //   setmorethan60days(false);
  // };

  const { motorQuoteInput } = controller;

  const [validDate, setValidDate] = useState(false);

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const calculateDate = (date, label) => {
    const Year = new Date(date).getFullYear();
    const Month = new Date(date).getMonth();
    const Day = new Date(date).getDate();
    let startDate;
    // console.log("motorQuoteInput", motorQuoteInput);
    if (motorQuoteInput.VehicleType === 16) {
      if (label === "ODPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, ODPolicyStartDate: startDate }));
      } else if (label === "TPPolicyEndDate") {
        startDate = formatDate(new Date(Year - 3, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, TPPolicyStartDate: startDate }));
      }
    }
    if (motorQuoteInput.VehicleType === 17) {
      if (label === "ODPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, ODPolicyStartDate: startDate }));
      } else if (label === "TPPolicyEndDate") {
        startDate = formatDate(new Date(Year - 5, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, TPPolicyStartDate: startDate }));
      }
    }
    if (motorQuoteInput.VehicleType === 193) {
      if (label === "ODPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, ODPolicyStartDate: startDate }));
      } else if (label === "TPPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, TPPolicyStartDate: startDate }));
      }
    }
    if (motorQuoteInput.VehicleType === 194) {
      if (label === "ODPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, ODPolicyStartDate: startDate }));
      } else if (label === "TPPolicyEndDate") {
        startDate = formatDate(new Date(Year - 1, Month, Day + 1));
        setPrevDetails((prevState) => ({ ...prevState, TPPolicyStartDate: startDate }));
      }
    }

    // console.log("qwertyuiop", startDate);
  };

  // const dateFormat = (date) => {
  //   const dateArr = date.split("-");
  //   return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  // };

  const calculateDays = (date) => {
    const todaysDate = new Date();
    const formatTodayDate = formatDate(
      new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate())
    );
    const reverseTodayDate = formatTodayDate.split("-").reverse().join("-").toString();
    const reverseEndDate = date.split("-").reverse().join("-").toString();
    // console.log("start dateee", reverseTodayDate, reverseEndDate);
    const start = moment(reverseTodayDate);
    const end = moment(reverseEndDate);
    const diff = end.diff(start, "days");
    // console.log(diff);
    // if (diff > 60) {
    // setmorethan60days(true);
    setmorethan60(dispatch, diff);
    //  else {
    //   // setmorethan60days(false);
    // }
    // }
  };

  const handleInvalidDatePopup = (date) => {
    const todaysDate = new Date();
    const selectedDate = new Date(date);
    todaysDate.setHours(0, 0, 0, 0);
    if (selectedDate < todaysDate) {
      setPrevDetails((prevState) => ({
        ...prevState,
        ODPolicyEndDate1: null,
        TPPolicyEndDate1: null,
      }));
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  const handleODDate = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setPrevDetails((prevState) => ({ ...prevState, [label]: value, [type]: formatDate(value) }));
      handleInvalidDatePopup(value);
      if (modalOpen === false) {
        calculateDate(value, type);
        calculateDays(formatDate(value));
      }
    } else {
      setValidDate(true);
      setPrevDetails((prevState) => ({ ...prevState, [label]: null, [type]: null }));
    }
  };
  const handleTPDate = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setPrevDetails((prevState) => ({ ...prevState, [label]: value, [type]: formatDate(value) }));
      handleInvalidDatePopup(value);
      if (modalOpen === false) {
        calculateDate(value, type);
        if (masters.PolicyType.mID === "15" || masters.PolicyType.mID === "106") {
          calculateDays(formatDate(value));
        }
      }
    } else {
      setValidDate(true);
      setPrevDetails((prevState) => ({ ...prevState, [label]: null, [type]: null }));
    }
  };
  const handleProceed = () => {
    if (flags.prevdetails === false) {
      if (
        prevDetails.PolicyNumber === "" ||
        flags.CompName.mID === "" ||
        masters.PolicyType.mID === "" ||
        (masters.PolicyType.mID === "14" ||
        masters.PolicyType.mID === "18" ||
        masters.PolicyType.mID === "105" ||
        masters.PolicyType.mID === "107" ||
        masters.PolicyType.mID === "123" ||
        masters.PolicyType.mID === "125" ||
        masters.PolicyType.mID === "126" ||
        masters.PolicyType.mID === "128"
          ? prevDetails.ODPolicyEndDate1 === null
          : null) ||
        (masters.PolicyType.mID === "14" ||
        masters.PolicyType.mID === "18" ||
        masters.PolicyType.mID === "105" ||
        masters.PolicyType.mID === "107" ||
        masters.PolicyType.mID === "123" ||
        masters.PolicyType.mID === "125" ||
        masters.PolicyType.mID === "126" ||
        masters.PolicyType.mID === "128"
          ? prevDetails.TPPolicyEndDate1 === null
          : null) ||
        (masters.PolicyType.mID === "15" ||
        masters.PolicyType.mID === "106" ||
        masters.PolicyType.mID === "124" ||
        masters.PolicyType.mID === "127"
          ? prevDetails.TPPolicyEndDate1 === null
          : null)
      ) {
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      } else {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));

        // console.log("PrevDetails", prevDetails);
        setSelected(dispatch, { ...selected, ...prevDetails, ...flags });
        if (vehicleType === "PvtCar") {
          navigate("/modules/BrokerPortal/Pages/MotorQuote/InputSummary");
        } else if (vehicleType === "TW") {
          navigate("/modules/BrokerPortal/Pages/Bike/InputSummary");
        } else if (vehicleType === "GCV") {
          navigate("/modules/BrokerPortal/Pages/GCV/InputSummary");
        } else if (vehicleType === "PCV") {
          navigate("/modules/BrokerPortal/Pages/PCV/InputSummary");
        }
      }
    } else {
      setSelected(dispatch, { ...selected, ...prevDetails, ...flags });

      if (vehicleType === "PvtCar") {
        navigate("/modules/BrokerPortal/Pages/MotorQuote/InputSummary");
      } else if (vehicleType === "TW") {
        navigate("/modules/BrokerPortal/Pages/Bike/InputSummary");
      } else if (vehicleType === "GCV") {
        navigate("/modules/BrokerPortal/Pages/GCV/InputSummary");
      } else if (vehicleType === "PCV") {
        navigate("/modules/BrokerPortal/Pages/PCV/InputSummary");
      }
    }
  };

  // console.log("Previous Details", prevDetails);
  const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);

  useEffect(() => {
    function changeMargin() {
      setMarginWidth(window.innerWidth / 50);
    }
    window.addEventListener("resize", changeMargin);

    return () => window.removeEventListener("resize", changeMargin());
  }, []);

  const { PreviousPlanType, PrevInsurers } = CompData().QuoteData.Masters;
  const [checkFlag, setcheckFlag] = useState(false);
  const handleInputChange = (event) => {
    setcheckFlag(true);
    const { id, value } = event.target;
    if (id === "PolicyNumber") {
      const policy = /^[a-zA-Z0-9/]+$/;
      if (value === "") {
        setcheckFlag(false);
      }
      if (policy.test(value) || value === "") {
        setPrevDetails((prevState) => ({ ...prevState, [id]: value }));
      }
    }
  };

  const handleDropdown = (event, values) => {
    setcheckFlag(true);
    setFlags((prevState) => ({ ...prevState, errorFlag: false }));
    setPrevDetails((prevState) => ({
      ...prevState,
      ODPolicyEndDate1: null,
      TPPolicyEndDate1: null,
      ODPolicyEndDate: null,
      TPPolicyEndDate: null,
    }));

    if (values !== null) {
      if (
        values.mID === "14" ||
        values.mID === "105" ||
        values.mID === "123" ||
        values.mID === "126"
      ) {
        setFlags((prevState) => ({ ...prevState, compFlag: true, odFlag: false, tpFlag: false }));
      } else if (
        values.mID === "18" ||
        values.mID === "107" ||
        values.mID === "125" ||
        values.mID === "128"
      ) {
        setFlags((prevState) => ({ ...prevState, odFlag: true, compFlag: false, tpFlag: true }));
      } else if (
        values.mID === "15" ||
        values.mID === "106" ||
        values.mID === "124" ||
        values.mID === "127"
      ) {
        setFlags((prevState) => ({ ...prevState, tpFlag: true, compFlag: false, odFlag: false }));
      }
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: values.mID,
        PolicyData: values,
        // CompanyName: values.mValue,
      }));
      setMasters((prevState) => ({ ...prevState, PolicyType: values }));
    } else {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: "",
        PolicyData: { mID: "", mValue: "" },

        // CompanyName: values.mValue,
      }));
      setMasters((prevState) => ({ ...prevState, PolicyType: { mID: "", mValue: "" } }));
      setcheckFlag(false);
    }
  };

  const handleCompanyDropdown = (event, values) => {
    setcheckFlag(true);
    setFlags((prevState) => ({ ...prevState, CompName: values }));
    if (values !== null) {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: values.mID,
        CompanyName: values,
      }));
    } else {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: "",
        CompanyName: "",
      }));
      setcheckFlag(false);
    }
  };

  const handleCheckBox = (event) => {
    setFlags((prevState) => ({ ...prevState, prevdetails: event.target.checked }));
    if (event.target.checked === true) setDontKnowPrevdetails(dispatch, true);
    else setDontKnowPrevdetails(dispatch, false);
  };
  useEffect(() => {
    if (prevDetails.InsuranceCompany !== "") {
      const InsuranceCompanyName = PrevInsurers.filter(
        (ins) => ins.mID === prevDetails.InsuranceCompany
      )[0].mValue;
      setPrevDetails((prevState) => ({ ...prevState, InsuranceCompanyName }));
    }
  }, [prevDetails.InsuranceCompany]);

  const handleContactSupport = () => {
    window.location.href = process.env.REACT_APP_CONTACTSUPPORT;
  };

  return (
    <MDBox>
      <BPNavbar />

      <MDBox display="flex" flexDirection="row" sx={{ pt: "3rem", pl: "3rem" }}>
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography
          onClick={() => setPageState("City")}
          variant="body1"
          sx={{ fontSize: 13, mt: 2 }}
        >
          Back
        </MDTypography>
      </MDBox>

      <MDBox sx={{ textAlign: "center", mt: 3.5, mx: marginWidth }}>
        <Modal
          open={modalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <InvalidDatePopup
            handleClose={handleModalClose}
            handleContactSupport={handleContactSupport}
            title=" As your previous policy is expired,you cannot proceed further
        Kindly contact our customer support to take it further."
          />
        </Modal>

        {/* <Modal
          open={morethan60days}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <InvalidDatePopup
            handleClose={handleModal60daysClose}
            title="As per Insurer guidelines, Insurance company will allow you to renew your policy only 60 days in advance."
          />
        </Modal> */}
        {/* <MDBox component="img" src={CompareInputImg} />
       <MDBox component="img" src={BMW} />
      <img src={images["Fiat.png"]} /> */}
        <Grid container spacing="1.25rem" textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <EditLine
              field="PreviousDetails"
              setPageState={setPageState}
              handleEditYear={handleEditYear}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ size: "1.125rem", color: "#000000", fontWeight: 300 }}>
              Previous Insurance Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={PrevInsurers}
              getOptionLabel={(option) => option.mValue}
              value={flags.CompName}
              id="InsuranceCompany"
              onChange={handleCompanyDropdown}
              renderInput={(params) => (
                <MDInput
                  label="Select Insurance Company"
                  {...params}
                  // sx={{ width: "100%" }}
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                    width: "100%",
                  }}
                  error={
                    Object.values(flags.CompName || {}).every((x) => x === null || x === "")
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(flags.CompName || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              type="login"
              id="PolicyNumber"
              label="Policy Number"
              onChange={handleInputChange}
              required
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  height: "29px !important",
                },
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              value={prevDetails.PolicyNumber}
              error={prevDetails.PolicyNumber === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={PreviousPlanType}
              getOptionLabel={(option) => option.mValue}
              // value={userSelection.PlanType}
              value={masters.PolicyType}
              id="PolicyType"
              onChange={handleDropdown}
              renderInput={(params) => (
                <MDInput
                  type="login"
                  label="Policy Type"
                  {...params}
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={
                    Object.values(masters.PolicyType || {}).every((x) => x === null || x === "")
                      ? flags.errorFlag
                      : null
                  }
                  required
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masters.PolicyType || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          {flags.odFlag === true ||
          (flags.compFlag === true && flags.odFlag === false && flags.tpFlag === false) ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="OD Policy End Date"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="ODPolicyEndDate"
                  value={prevDetails.ODPolicyEndDate1}
                  onChange={(date) => handleODDate(date, "ODPolicyEndDate1", "ODPolicyEndDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{
                        width: "100%",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      required
                      error={flags.errorFlag}
                    />
                  )}
                />
                {validDate && prevDetails.ODPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid date in format dd/mm/yyyy
                  </MDTypography>
                ) : null}
                {flags.errorFlag && prevDetails.ODPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
          ) : null}
          {flags.tpFlag === true ||
          (flags.compFlag === true && flags.odFlag === false && flags.tpFlag === false) ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="TP Policy End Date"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="TPPolicyEndDate"
                  value={prevDetails.TPPolicyEndDate1}
                  onChange={(date) => handleTPDate(date, "TPPolicyEndDate1", "TPPolicyEndDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{
                        width: "100%",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      required
                      error={flags.errorFlag}
                    />
                  )}
                />
                {validDate && prevDetails.TPPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid date in format dd/mm/yyyy
                  </MDTypography>
                ) : null}
                {flags.errorFlag && prevDetails.TPPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
          ) : null}
          <Grid
            item
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
          >
            <Checkbox
              color="secondary"
              checked={flags.prevdetails}
              onChange={handleCheckBox}
              disabled={checkFlag}
            />
            <MDTypography sx={{ fontSize: "1.125rem", color: "#000000", weight: 400 }}>
              I Dont know my previous policy details
            </MDTypography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={handleProceed} sx={{ mt: "2rem" }}>
              Proceed
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
PreviousDetails.defaultProps = {
  setPageState: {},
};

PreviousDetails.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
};

function InvalidDatePopup({ handleClose, title, handleContactSupport }) {
  return (
    <MDBox sx={style}>
      <Grid container justifyContent="flex-end">
        <ClearIcon onClick={handleClose} />
      </Grid>

      <MDBox
        component="img"
        src={CustomerSupport}
        sx={{ mx: "3.2rem", ml: "31px", width: "max-content", height: "auto" }}
      />
      <MDTypography sx={{ fontSize: "1.125rem", color: "#000000" }}>{title}</MDTypography>

      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <MDButton sx={{ fontSize: "0.7rem", ml: "315px" }} onClick={handleContactSupport}>
          Contact support
        </MDButton>
      </Grid>
    </MDBox>
  );
}
export default PreviousDetails;
