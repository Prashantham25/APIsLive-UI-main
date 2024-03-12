import { useState, useEffect } from "react";
import swal from "sweetalert";
import {
  Grid,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  CircularProgress,
  Stack,
  Backdrop,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { subDays } from "date-fns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import MDCheckbox from "components/MDCheckbox";
// import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import Policypayment from "../data/Json/PaymentJson";
import { postRequest } from "../../../../../../../core/clients/axiosclient";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import { GetBGRMasters } from "../../../../Home/data/index";
import {
  makePayment,
  sendPaymentMail,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  fetchusername,
  SavePaymentdetails,
  SendSMS,
  policyEmail,
  policyEmailShopkeeper,
  policyEmailCyber,
  makeBilldeskPayment,
} from "../data/APIs/USGIWCApi";
// import { IsEmail } from "../../../../../../../Common/Validations";

function Payment({ dto, setDto, masters, setMasters }) {
  const navigate = useNavigate();
  const lDto = dto;
  const [invalidInsNo, setInvalidInsNo] = useState(false);
  const [SinglePolicySinglePayment, setSinglePolicySinglePayment] = useState(false);
  const [ACDaccount, setACDaccount] = useState();
  const [checkbutton, setCheckButton] = useState(true);
  console.log("setCheckbutton", setCheckButton);
  const ProposalNumber = lDto.proposalNumber;
  console.log("ProposalNumber", ProposalNumber);
  const [CDSubmit, setCDSubmit] = useState(false);
  console.log(setCDSubmit);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData1, setselectedRowData1] = useState();
  console.log("selectedRowData1", selectedRowData1);
  const [selectedRowSum, setSelectedRowSum] = useState(0);
  console.log("selectedRowSum", selectedRowSum);
  const [amountCollected, setAmountCollected] = useState(false);
  const [paymentdata, setpaymentdata] = useState(Policypayment);
  const [loadingflag, setloadingflag] = useState(false);
  const [paymentSelected, setpaymentSelected] = useState(null);
  // const [transactionID, settransactionID] = useState();
  // const [Sucessurl, setSuccessurl] = useState();
  // const [Failureurl, setFailureurl] = useState();
  const [billdeskflag, setbilldeskflag] = useState(false);
  const [payUflag, setpayUflag] = useState(true);

  const [PaymentDto] = useState(dto);
  const lMasters = masters;

  const { BankName } = GetBGRMasters().bgrMaster.Masters;

  const handleSetValue = (e, value) => {
    lDto.PaymentDetails.BankName = value.mValue;
    lMasters.SavePymtDTO.paymentDetailsDTO.BankName = value.mValue;
    setDto((prevState) => ({ ...prevState, ...lDto }));
    setMasters({ ...lMasters });
  };
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await fetchusername(`${localStorage.getItem("userId")}`);
      setUsername(result.data.userName);
    };
    fetchUserData();
  }, []);
  const [masterss, setMasterss] = useState({
    PaymentDetails: {
      paymentSource: "",
      ModeOfPayment: "",
    },
  });
  const onPaymentMethod = async (e) => {
    masterss.PaymentDetails.ModeOfPayment = e;
    masterss.PaymentDetails.paymentSource = e;
    lDto.ModeOfPayment = e;
    setDto({ ...lDto });
    setMasterss({ ...masterss });
    if (masterss.PaymentDetails.paymentSource === "EB") {
      const obj = {
        code: username,
        key: "oOb?eo%vsP7539",
      };
      const response = await GetACDBalanceAmt(obj);
      setACDaccount(response.data);
      setSinglePolicySinglePayment(true);
    }
  };
  const handleEmailChange = (e) => {
    lDto.QuoteEmail = e.target.value;
    setDto({ ...lDto });
  };
  const IsEmailVal = (e) => {
    const regex =
      /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
    if (regex.test(e.target.value) === true) {
      lDto.QuoteEmail = e.target.value;
      lMasters.EmailVal = false;
    } else {
      lDto.QuoteEmail = "";
      lMasters.EmailVal = true;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const chequePayment = async () => {
    if (
      dto?.PaymentDetails?.InstrumentNo === "" ||
      dto?.PaymentDetails?.InstrumentDate === "" ||
      dto?.PaymentDetails?.BankName === ""
    ) {
      lMasters.errorFlag = true;
      setMasters({ ...lMasters });
    } else {
      setloadingflag(true);
      lDto.PaymentDetails.paymentSource = "CHEQUE";
      lDto.PaymentDetails.ModeOfPayment = "CHEQUE";
      lDto.PaymentDetails.ChequeAmount = lDto.PremiumDetails["Total with Tax"];

      setDto({ ...lDto });
      await postRequest(`Policy/UpdateProposalDetails`, dto);
      console.log("dto", dto);

      const res = await SavePaymentdetails(masters?.SavePymtDTO);
      console.log("SavePaymentdetails", res);
      // lMasters.chequePayStatus = res.data.status;
      setMasters({ ...lMasters });

      if (res.data.status === 1) {
        let Message = "";
        if (dto["Product Code"] === "WorkmanCompensation_v1") {
          await policyEmail(res.data.id, dto?.QuoteEmail);
          Message = `Dear Customer,Welcome to USGI Family. Your Employee's Compensation Insurance has been issued with policy no. ${
            res.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
        } else if (dto["Product Code"] === "USGI Package") {
          Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM Insurance has been issued with policy no. ${
            res.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          await policyEmailShopkeeper(res.data.id, dto?.QuoteEmail);
        } else if (dto["Product Code"] === "IRDAN134RP0019V01202223") {
          await policyEmailCyber(res.data.id, dto?.QuoteEmail);
          Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - CYBERRETAIL Insurance has been issued with policy no. ${
            res.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
        }
        await SendSMS("usgi", dto?.QuoteMobileNo, Message).then((smsResp) => {
          console.log("1234567890", smsResp);
        });
        navigate(`/Home/PaymentSuccess?backURL=&PaymentRefNo=${dto?.PaymentDetails?.paymentRefNo}`);
      } else {
        navigate(`/Home/PaymentFailure}`);
      }
      setloadingflag(false);
    }
  };

  // const onlinePayment = async () => {
  //   const res1 = await makePayment(masters.bodyData);
  //   console.log("makePayment", res1);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const obj = {
  //       code: username,
  //       key: "oOb?eo%vsP7539",
  //     };
  //     const response = await GetACDBalanceAmt(obj);
  //     setACDaccount(response.data);
  //     setSinglePolicySinglePayment(true);
  //   };

  //   fetchData();
  // }, [username]);

  // const handleEB = async () => {
  //   const obj = {
  //     code: username,
  //     key: "oOb?eo%vsP7539",
  //   };
  //   const response = await GetACDBalanceAmt(obj);
  //   setACDaccount(response.data);
  // };

  const handleCheckboxChange = (rowId) => {
    const numberOfSelectedCheckboxes = selectedRows.length;

    if (numberOfSelectedCheckboxes >= 2 && !selectedRows.some((row) => row.Payment_ID === rowId)) {
      swal({
        icon: "warning",

        text: "You can only select up to two Receipt",
      });

      return;
    }
    if (
      selectedRowSum >= lDto.PremiumDetails["Total with Tax"] &&
      !selectedRows.some((row) => row.Payment_ID === rowId)
    ) {
      swal({
        icon: "warning",

        text: "Sufficient Amount is Present",
      });

      return;
    }

    setSelectedRows((prevSelectedRows) => {
      const rowIndex = prevSelectedRows.findIndex((row) => row.Payment_ID === rowId);

      const updatedSelectedRows = [...prevSelectedRows];

      if (rowIndex !== -1) {
        updatedSelectedRows.splice(rowIndex, 1);
      } else {
        const selectedRowData = ACDaccount.find((row) => row.Payment_ID === rowId);
        setselectedRowData1(selectedRowData);

        if (selectedRowData) {
          updatedSelectedRows.push(selectedRowData);
        }
      }
      if (updatedSelectedRows.length === 0) {
        setAmountCollected(false);
        setCDSubmit(false);
        setCheckButton(true);
      } else {
        const selectedRowsSum = updatedSelectedRows.reduce(
          (total, row) => total + row.BalanceAmt,
          0
        );

        setSelectedRowSum(selectedRowsSum);

        setCheckButton(false);
      }
      return updatedSelectedRows;
    });
  };

  const handleCDSubmit = () => {
    if (selectedRowSum < lDto.PremiumDetails["Total with Tax"]) {
      swal({
        icon: "error",
        text: "Insufficient Amount",
        buttons: "Okay",
      });
    } else {
      setCDSubmit(true);
      setAmountCollected(true);
    }
  };

  const handleIssuePolicy = async () => {
    setloadingflag(true);
    const pytmid1 = selectedRows[1] ? selectedRows[1].Payment_ID : "";
    const obj1 = {
      cod: username,
      pytmid1: selectedRows[0].Payment_ID,
      pytmid2: pytmid1,
      amount: lDto.PremiumDetails["Total with Tax"],
      usr: "a",
      props: ProposalNumber,
      ky: "oOb?eo%vsP7539",
    };
    console.log("obj1", obj1);
    const result = await GetACDPaymentStatus(obj1);
    console.log("result111", result);
    if (result.status === 200) {
      const { PaymentDetails } = PaymentDto;
      PaymentDetails.ChequeAmount = lDto.PremiumDetails["Total with Tax"];
      PaymentDetails.transactionNo = lDto.TransactionID;
      PaymentDetails.paymentSource = "EB";
      setDto((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", lDto);
      setloadingflag(true);
      const Paymentdetls1 = paymentdata;
      console.log("Paymentdetls1", Paymentdetls1);
      Paymentdetls1.policyNo = "";
      Paymentdetls1.proposalNo = ProposalNumber;
      Paymentdetls1.paymentDetailsDTO.ChequeAmount = lDto.PremiumDetails["Total with Tax"];
      Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
      Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
      Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
      setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
      await postRequest(`Policy/UpdateProposalDetails`, dto);
      console.log("dto", dto);
      SavePaymentdetails(Paymentdetls1).then(async (res) => {
        if (res.data.status === 1) {
          let Message = "";
          if (dto["Product Code"] === "WorkmanCompensation_v1") {
            await policyEmail(res.data.id, dto?.QuoteEmail);
            Message = `Dear Customer,Welcome to USGI Family. Your Employee's Compensation Insurance has been issued with policy no. ${
              res.data.id
            } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          } else if (dto["Product Code"] === "USGI Package") {
            Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM Insurance has been issued with policy no. ${
              res.data.id
            } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
            await policyEmailShopkeeper(res.data.id, dto?.QuoteEmail);
          } else if (dto["Product Code"] === "IRDAN134RP0019V01202223") {
            await policyEmailCyber(res.data.id, dto?.QuoteEmail);
            Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - CYBERRETAIL Insurance has been issued with policy no. ${
              res.data.id
            } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          }
          await SendSMS("usgi", dto?.QuoteMobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });

          navigate(
            `/Home/PaymentSuccess?backURL=&PaymentRefNo=${dto?.PaymentDetails?.paymentRefNo}`
          );
          setloadingflag(false);
        } else {
          navigate("/Home/PaymentFailure");
        }
      });
    }
  };
  const handleClearButtonClick = () => {
    setSelectedRows([]);
    setCheckButton(true);
    setSelectedRowSum(0);
    setCDSubmit(false);
    setAmountCollected(false);
  };

  const onEmail = async () => {
    if (dto.QuoteEmail === "") {
      swal({ icon: "error", text: "Please Enter Email" });
    } else {
      setloadingflag(true);
      const mail = await sendPaymentMail(dto.proposalNumber, dto.QuoteEmail);

      if (mail.data.status === 1) {
        swal({
          text: `Payment Link Shared Successfully`,
          buttons: "Home",
          html: true,
          icon: "success",
        }).then(() => window.open(process.env.REACT_APP_HOMEURL, "_self"));
      }
      setloadingflag(false);
    }
  };

  const handleInstrument = (e) => {
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value) || e.target.value === "") {
      lDto.PaymentDetails[e.target.name] = e.target.value;
      lMasters.SavePymtDTO.paymentDetailsDTO.InstrumentNo = e.target.value;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };

  const handleDateChange = (d) => {
    lDto.PaymentDetails.InstrumentDate = formatPropDate(d);
    lMasters.SavePymtDTO.paymentDetailsDTO.InstrumentDate = formatPropDate(d);
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleInstrumentNoVAlidation = (e) => {
    const numReg = /^[0-9]{6}$/;
    if (!numReg.test(e.target.value)) {
      setInvalidInsNo(true);
    } else {
      setInvalidInsNo(false);
    }
  };

  const handlepaymentchange = (e) => {
    console.log("Paymentselected", paymentSelected);
    if (e.target.value === "PAY-U") {
      setpayUflag(true);
      // setPayU(true);
      setbilldeskflag(false);
      setpaymentSelected(e.target.value);
    } else if (e.target.value === "BillDesk") {
      setbilldeskflag(true);
      // setPayU(true);
      setpayUflag(false);
      // setFinsal(false);
      setpaymentSelected(e.target.value);
    }
  };
  const handleformData = async () => {
    if (payUflag === true) {
      await postRequest(`Policy/UpdateProposalDetails`, dto);
      makePayment(masters?.bodyData);
    } else if (billdeskflag === true) {
      const bodyData = {
        key: process.env.REACT_APP_BilldeskKey,
        txnid: dto?.PaymentDetails?.paymentRefNo,
        amount: dto?.PremiumDetails["Total with Tax"],
        productinfo: masters?.bodyData?.productinfo,
        firstname: dto?.ProposerDetails["First Name"],
        email: dto?.ProposerDetails["Email ID"],
        phone: dto?.ProposerDetails["Mobile Number"],
        surl: masters?.bodyData?.surl,
        furl: masters?.bodyData?.furl,
        salt: process.env.REACT_APP_BilldeskSalt,
      };
      makeBilldeskPayment(bodyData);
    }
  };

  const errText = "Please fill the required fields";

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container mt={0} spacing={2}>
        <Grid item xs={12} sm={12} md={2.5}>
          <MDBox display="flex" flexDirection="column">
            {!(lDto.ProductId === "1331" || lDto.ProposerDetails.ProductId === "1356") && (
              <MDBox mt={1}>
                <MDButton
                  sx={{ width: "80%" }}
                  onClick={() => onPaymentMethod("Cheque")}
                  variant={
                    masterss.PaymentDetails.paymentSource === "Cheque" ? "contained" : "outlined"
                  }
                >
                  Cheque
                </MDButton>
              </MDBox>
            )}
            <MDBox mt={1}>
              <MDButton
                sx={{ width: "80%" }}
                onClick={() => onPaymentMethod("Online")}
                variant={
                  masterss.PaymentDetails.paymentSource === "Online" ? "contained" : "outlined"
                }
              >
                Online Payment
              </MDButton>
            </MDBox>
            <MDBox mt={1}>
              <MDButton
                sx={{ width: "80%" }}
                onClick={() => onPaymentMethod("EmailLink")}
                variant={
                  masterss.PaymentDetails.paymentSource === "EmailLink" ? "contained" : "outlined"
                }
              >
                Send Payment Link
              </MDButton>
            </MDBox>
            {/* {(dto["Product Code"] === "USGI Package" ||
              // dto["Product Code"] === "IRDAN134RP0019V01202223") && ( */}
            <MDBox>
              {dto.PaymentDetails.paymentType === "AgentPayment" && lDto.ProductId !== "1331" && (
                <>
                  <MDBox mt={1}>
                    <MDButton
                      sx={{ width: "80%" }}
                      variant={
                        masterss.PaymentDetails.paymentSource === "EB" ? "contained" : "outlined"
                      }
                      onClick={() => onPaymentMethod("EB")}
                    >
                      CD Account
                    </MDButton>
                  </MDBox>
                  {amountCollected && (
                    <MDBox>
                      <MDBox mt={45}>
                        <MDTypography variant="text"> Amount Collected: </MDTypography>
                      </MDBox>
                      <MDBox mt={1}>
                        <MDTypography variant="text" fontWeight="500">
                          {" "}
                          {selectedRowSum}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  )}
                </>
              )}
            </MDBox>
            {/* )} */}
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={2.5} ml={5} mr={3}>
          <MDBox display="flex" flexDirection="column">
            {masterss.PaymentDetails.paymentSource === "Cheque" && (
              <>
                <Grid item mt={1}>
                  <MDInput
                    label="Cheque Amount"
                    readOnly
                    // value={dto.PaymentDetails.ChequeAmount}
                    value={lDto.PremiumDetails["Total with Tax"]}
                  />
                </Grid>
                <Grid item mt={1}>
                  <MDInput
                    label="Instrument No."
                    name="InstrumentNo"
                    inputProps={{ maxLength: 6 }}
                    value={dto.PaymentDetails.InstrumentNo}
                    onChange={(e) => handleInstrument(e)}
                    onBlur={handleInstrumentNoVAlidation}
                    error={
                      (dto.PaymentDetails.InstrumentNo === "" && masters.errorFlag) ||
                      (dto.PaymentDetails.InstrumentNo !== "" && invalidInsNo)
                    }
                    helperText={
                      (dto.PaymentDetails.InstrumentNo === "" && masters.errorFlag && errText) ||
                      (dto.PaymentDetails.InstrumentNo !== "" &&
                        invalidInsNo &&
                        "Please enter a 6 digit InstrumentNo")
                    }
                  />
                </Grid>
                <Grid item mt={1}>
                  <MDDatePicker
                    input={{
                      label: `Instrument Date`,
                      value: dto.PaymentDetails.InstrumentDate,
                      error: dto.PaymentDetails.InstrumentDate === "" && masters.errorFlag,
                      helperText:
                        dto.PaymentDetails.InstrumentDate === "" && masters.errorFlag && errText,
                    }}
                    value={dto.PaymentDetails.InstrumentDate}
                    options={{
                      altFormat: "d-m-Y",
                      dateFormat: "d-m-Y",
                      altInput: true,
                      maxDate: new Date(),
                      minDate: subDays(new Date(), 60),
                    }}
                    onChange={(d) => handleDateChange(d)}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                </Grid>
                <Grid item mt={1}>
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
                        error={dto.PaymentDetails.BankName === "" && masters.errorFlag}
                        helperText={
                          dto.PaymentDetails.BankName === "" && masters.errorFlag && errText
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item mt={1}>
                  <MDButton sx={{ ml: "2rem" }} onClick={chequePayment}>
                    Make Payment
                  </MDButton>
                </Grid>
              </>
            )}
            {masterss.PaymentDetails.paymentSource === "Online" && (
              <>
                {/* <MDBox
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
                  </RadioGroup> */}
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  spacing={2}
                  ml={3}
                  mr={10}
                >
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <RadioGroup
                      row
                      sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%" }}
                      defaultValue="Pay-U"
                      onChange={handlepaymentchange}
                    >
                      <MDBox
                        sx={{
                          minHeight: "100%",
                          minWidth: "150%",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          borderColor: "text.primary",
                          borderRadius: 1,
                        }}
                      >
                        <FormControlLabel
                          value="Pay-U"
                          control={<Radio sx={{ ml: 2 }} />}
                          label="Pay-U"
                          sx={{ borderRadius: "50%" }}
                          // onClick={handlePayU}
                        />
                      </MDBox>
                      <MDBox
                        sx={{
                          minHeight: "100%",
                          minWidth: "150%",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          borderColor: "text.primary",
                          borderRadius: 1,
                          mt: "1rem",
                        }}
                      >
                        <FormControlLabel
                          value="BillDesk"
                          control={<Radio sx={{ ml: 2 }} />}
                          label="BillDesk"
                          name="BillDesk"
                          sx={{ borderRadius: "50%" }}
                        />
                      </MDBox>
                    </RadioGroup>
                  </Stack>
                </MDBox>
                <br />
                <MDButton sx={{ width: "200px", ml: "1rem" }} onClick={handleformData}>
                  Make Payment
                </MDButton>
              </>
            )}
            {masterss.PaymentDetails.paymentSource === "EmailLink" && (
              <>
                <MDInput
                  label="Email"
                  value={dto.QuoteEmail}
                  onChange={handleEmailChange}
                  onBlur={IsEmailVal}
                  error={masters?.EmailVal}
                  helperText={masters?.EmailVal && "Please Enter Valid Email"}
                  sx={{ width: "300px" }}
                />
                <br />
                <MDButton sx={{ width: "200px" }} onClick={onEmail}>
                  Send Link
                </MDButton>
              </>
            )}
            {masterss.PaymentDetails.paymentSource === "EB" &&
              dto.PaymentDetails.paymentType === "AgentPayment" && (
                <MDBox>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      defaultValue="singlepolicysinglepayment"
                    >
                      <FormControlLabel
                        value="singlepolicysinglepayment"
                        control={<Radio sx={{ ml: -2 }} />}
                        label="Single Policy-Single Payment"
                      />
                    </RadioGroup>
                  </FormControl>
                  {SinglePolicySinglePayment && (
                    <Grid container ml={-3} mt={1.5} width="180%">
                      <Table aria-label="simple table">
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Select Receipt</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Receipt Number</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Receipt Date</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Receipt Amount</TableCell>
                        </TableRow>
                        {ACDaccount.map((row) => (
                          <TableBody>
                            <TableCell>
                              <MDCheckbox
                                key={row.Payment_ID}
                                checked={selectedRows.some(
                                  (selectedRow) => selectedRow.Payment_ID === row.Payment_ID
                                )}
                                onChange={() => handleCheckboxChange(row.Payment_ID)}
                              />
                            </TableCell>
                            <TableCell>{row.Payment_ID}</TableCell>
                            <TableCell>{row.ChqDate}</TableCell>
                            <TableCell>{row.BalanceAmt}</TableCell>
                          </TableBody>
                        ))}
                      </Table>
                      <Grid container mt={3}>
                        <Grid item xs={12} sm={12} md={6}>
                          <MDButton
                            disabled={checkbutton}
                            color="primary"
                            fullwidth
                            alignItems="center"
                            sx={{ ml: "5rem" }}
                            onClick={handleCDSubmit}
                          >
                            Submit
                          </MDButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <MDButton
                            color="primary"
                            fullwidth
                            alignItems="center"
                            onClick={handleClearButtonClick}
                          >
                            Clear
                          </MDButton>
                        </Grid>
                      </Grid>
                      {CDSubmit && (
                        <Table
                          aria-label="simple table"
                          sx={{ marginTop: "3rem", marginLeft: "1rem" }}
                        >
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Receipt Number</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Receipt Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Receipt Amount</TableCell>
                          </TableRow>
                          {selectedRows.map((row1) => (
                            <TableBody>
                              <TableCell>{row1.Payment_ID}</TableCell>
                              <TableCell>{row1.ChqDate}</TableCell>
                              <TableCell>{row1.BalanceAmt}</TableCell>
                            </TableBody>
                          ))}
                        </Table>
                      )}
                      {CDSubmit && (
                        <Grid container mt={3} ml={-2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <MDButton
                              color="primary"
                              // textAlign="right"
                              fullwidth
                              alignItems="center"
                              sx={{ ml: "4rem" }}
                              onClick={handleIssuePolicy}
                            >
                              Issue Policy
                            </MDButton>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </MDBox>
              )}
          </MDBox>
        </Grid>
        {lDto.ProductId !== "1331" && (
          <Grid item xs={12} sm={12} md={5}>
            <Card sx={{ background: "#E5E4E2", borderRadius: "0px", width: 350, ml: 25, mt: 2 }}>
              <MDBox display="flex" flexDirection="row" sx={{ p: 2 }}>
                <MDBox display="flex" flexDirection="column" spacing={1}>
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
                <MDBox display="flex" flexDirection="column" ml={13} spacing={4}>
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
        )}
        {lDto.ProductId === "1331" && (
          <Grid item xs={12} sm={12} md={5}>
            <Card sx={{ background: "#E5E4E2", borderRadius: "0px", width: 400, ml: 14 }}>
              <MDBox display="flex" flexDirection="row" sx={{ p: 2 }}>
                <MDBox display="flex" flexDirection="column" spacing={1}>
                  <Grid item>
                    <MDTypography>Proposal No</MDTypography>
                  </Grid>

                  <Grid item>
                    <MDTypography>Product Name</MDTypography>
                    {/* <Divider variant="dashed" sx={{ color: "#000000" }} /> */}
                  </Grid>

                  <Grid item>
                    <MDTypography sx={{ color: "red" }}>Health Premium</MDTypography>
                    {/* <hr /> */}
                  </Grid>
                  <Grid item>
                    <MDTypography>Policy Start Date</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Policy End Date</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Premium</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>GST(18%)</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Total Health Premium</MDTypography>
                  </Grid>
                  <br />
                  {/* <hr /> */}
                  <Grid item>
                    <MDTypography sx={{ color: "red" }}>Life Premium</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Date of Commencement</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Date of Policy Maturity</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Premium</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>GST(18%)</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>Total Life Premium</MDTypography>
                  </Grid>
                  <br />
                  <Grid item>
                    <MDTypography sx={{ fontSize: "25px", color: "red" }}>
                      Total Premium
                    </MDTypography>
                  </Grid>
                </MDBox>
                <MDBox display="flex" flexDirection="column" ml={5} spacing={4}>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>

                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>

                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  {/* <hr /> */}
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>&nbsp;</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography>₹ {dto?.PremiumDetails?.GST}</MDTypography>
                  </Grid>
                  {/* <hr /> */}
                  <Grid item>
                    <MDTypography sx={{ fontWeight: "bold" }}>
                      ₹ {dto?.PremiumDetails?.["Total with Tax"]}
                    </MDTypography>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}
export default Payment;
