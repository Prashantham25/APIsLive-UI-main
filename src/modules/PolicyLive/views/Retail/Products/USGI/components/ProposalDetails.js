// import DeleteIcon from "@mui/icons-material/Delete";
// import { Grid } from "@mui/material";
// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";

// import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import { subYears, endOfYear } from "date-fns";
import { getRequest, postRequest } from "core/clients/axiosclient";
import { UploadFiles } from "modules/PolicyLive/views/Home/data/index";

import {
  // IsAlphaSpace,
  IsMobileNumber,
  IsNumeric,
} from "../../../../../../../Common/Validations/index";

import { docDetails, Timer } from "../data/Json/USGIWCJson";
import {
  getCkycDetails,
  // DocumenUpload,
  getPincodeDetails,
  GetProdPartnermasterData,
  getCkycUpdateStatus,
  CkycRegMail,
  DeleteDocument,
  generateFile,
  SendSMS,
  callUpdateQuoteMethod,
  proposalConsentMail,
  calculateProposal,
} from "../data/APIs/USGIWCApi";

import { AgeCalculator1 } from "../data/Json/CyberInsurance";
import { useDataController } from "../../../../../../BrokerPortal/context";
import { getOTP, GetOTP } from "../../../../../../BrokerPortal/Pages/Registration/data/index";

function ProposalDetails({ dto, setDto, masters, setMasters }) {
  const lDto = dto;
  const lMasters = masters;
  // const { search } = useLocation();
  // const quoteNo = new URLSearchParams(search).get("quotationno");
  // console.log("567", dto);
  // // useEffect(async () => {
  // //   if (quoteNo !== null) {
  // //     const obj = { Pincode: lDto.ProposerDetails.PermanentAddress.Pincode };
  // //     const city = await GetProdPartnermasterData("782", "PinCode", obj);
  // //     lMasters.proposerProps.permCD = city;
  // //   }
  // // }, []);
  const handlePincode = async (e, name) => {
    if (IsNumeric(e.target.value) === true) {
      if (name === "Perm") {
        lDto.ProposerDetails.PermanentAddress.Pincode = e.target.value;
      } else if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.Pincode = e.target.value;
      }
      if (e.target.value.length === 6) {
        const ProductId = 782;
        const obj = { Pincode: e.target.value };
        const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
        console.log("city", city);
        if (city.status !== 7) {
          if (name === "Perm") {
            lMasters.proposerProps.permCD = city;
          } else if (name === "Comm") {
            lMasters.proposerProps.commCD = city;
          }
        } else {
          swal({ icon: "error", text: "Enter valid Pincode" });
        }
      } else {
        lMasters.proposerProps.permCD = [];
        lMasters.proposerProps.commCD = [];
      }

      setMasters({ ...lMasters });

      setDto({ ...lDto });
    }
  };
  const handleCity = async (e, v, name) => {
    const res = await getPincodeDetails(v.City_ID);
    console.log("res", res);
    if (name === "Perm") {
      lDto.ProposerDetails.PermanentAddress.CityDistrictID = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.PermanentAddress.StateID = res.state[0].mID;
      lDto.ProposerDetails.PermanentAddress.CityDistrict = v.mValue;
      lDto.ProposerDetails.PermanentAddress.State = res.state[0].State_Name;
    } else if (name === "Comm") {
      lDto.ProposerDetails.CommunicationAddress.CityDistrictID = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.CommunicationAddress.StateID = res.state[0].mID;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
    }

    setDto({ ...lDto });
  };
  // const handleFileUpload = async (event) => {
  //   const maxFileSizeMB = 5;
  //   const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
  //   if (dto?.documentDetails.some((x) => x.DocName === "")) {
  //     swal({
  //       icon: "error",
  //       text: "Please select the Document Name before uploading",
  //     });
  //   } else {
  //     console.log(event);
  //     const file = event.target.files[0];
  //     if (file.size > maxFileSizeBytes) {
  //       swal({
  //         icon: "error",
  //         text: `File size should not be more than ${maxFileSizeMB}MB`,
  //       });
  //       return; // Stop further processing
  //     }
  //     const formData = new FormData();
  //     formData.append("file", file, file.name);
  //     // await DocumenUpload(formData, file.name).then((result) => {
  //     //   if (result.data.dMSDTOs[0].fileName !== null) {
  //     //     console.log("doc", result.data.dMSDTOs[0].fileName);
  //     //     lDto.documentDetails[Number(event.target.name)].fileName = file.name;
  //     //     lDto.documentDetails[Number(event.target.name)].UploadDocDate =
  //     //       new Date().toLocaleDateString();
  //     //     lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
  //     //     lDto.documentDetails[Number(event.target.name)].DocId = result.data.dMSDTOs[0].docId;
  //     //     lMasters.proposerProps.cancelIcon = true;
  //     //     setMasters({ ...lMasters });
  //     //     setDto({ ...lDto });
  //     //     swal({
  //     //       icon: "success",
  //     //       text: "Document uploaded successfully",
  //     //     });
  //     //   }
  //     // });
  //     await UploadFiles(formData).then((result) => {
  //       if (result.data[0].fileName !== null) {
  //         lDto.documentDetails[Number(event.target.name)].fileName = result.data[0].fileName;
  //         lDto.documentDetails[Number(event.target.name)].UploadDocDate =
  //           new Date().toLocaleDateString("en-GB");
  //         lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
  //         lDto.documentDetails[Number(event.target.name)].DocId = result.data[0].docid;
  //         lMasters.proposerProps.cancelIcon = true;
  //         setMasters({ ...lMasters });
  //         setDto({ ...lDto });
  //         swal({
  //           icon: "success",
  //           text: "Document uploaded successfully",
  //         });
  //       }
  //     });
  //     const inputElement = document.getElementById("fileInput");
  //     const file1 = event;
  //     if (inputElement) {
  //       console.log(1212, inputElement);
  //       inputElement.value = "";
  //     }
  //     file1.target.value = "";
  //   }
  // };
  const handleSetValueParms = (e, value) => {
    lDto.ProposerDetails.CKYCParam = value.mValue;
    setDto({ ...lDto });
    if (value.mValue !== "PAN Number") {
      lDto.ProposerDetails.AadharID = "";
      lDto.ProposerDetails.AadharMobileNo = "";
      lDto.ProposerDetails.AadharGender = "";
      lDto.ProposerDetails.AadharName = "";
      lDto.ProposerDetails.DOB = "";
    } else {
      lDto.ProposerDetails.DOB = "";
      lDto.ProposerDetails.PanNo = "";
    }
    setDto({ ...lDto });
  };
  const handleFileUpload = async (event) => {
    if (dto?.documentDetails.some((x) => x.DocName === "")) {
      swal({
        icon: "error",
        text: "Please select the Document Name before uploading",
      });
    } else {
      console.log(event);
      const file = event.target.files[0];
      const fsize = Math.round(event.target.files[0].size / 1024);
      if (fsize > 10240) {
        swal({
          icon: "error",
          text: "File Size should be less than 10 mb",
        });
      } else {
        const formData = new FormData();
        formData.append("file", file, file.name);
        // await DocumenUpload(formData, file.name).then((result) => {
        //   if (result.data.dMSDTOs[0].fileName !== null) {
        //     console.log("doc", result.data.dMSDTOs[0].fileName);
        //     lDto.documentDetails[Number(event.target.name)].fileName = file.name;
        //     lDto.documentDetails[Number(event.target.name)].UploadDocDate =
        //       new Date().toLocaleDateString();
        //     lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
        //     lDto.documentDetails[Number(event.target.name)].DocId = result.data.dMSDTOs[0].docId;
        //     lMasters.proposerProps.cancelIcon = true;
        //     setMasters({ ...lMasters });
        //     setDto({ ...lDto });
        //     swal({
        //       icon: "success",
        //       text: "Document uploaded successfully",
        //     });
        //   }
        // });
        await UploadFiles(formData).then((result) => {
          if (result.data[0].fileName !== null) {
            lDto.documentDetails[Number(event.target.name)].fileName = result.data[0].fileName;
            lDto.documentDetails[Number(event.target.name)].UploadDocDate =
              new Date().toLocaleDateString("en-GB");
            lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
            lDto.documentDetails[Number(event.target.name)].DocId = result.data[0].docid;
            lMasters.proposerProps.cancelIcon = true;
            setMasters({ ...lMasters });
            setDto({ ...lDto });
            swal({
              icon: "success",
              text: "Document uploaded successfully",
            });
          }
        });
      }
    }
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const initiateCkyc = async () => {
    if (dto?.CustomerType === "Individual") {
      const dobString = lDto.ProposerDetails.DOB;
      const [day, month, year] = dobString.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      const Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
      if (Age < 18) {
        lMasters.flags.dob = true;
      } else {
        lMasters.flags.dob = false;
      }
      setMasters({ ...lMasters });
    } else {
      lMasters.flags.dob = false;
      setMasters({ ...lMasters });
    }

    if (lMasters.flags.dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: dto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: dto.ProposerDetails.DOB,
        mobileNo: dto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: dto.ProposerDetails.AadharName,
        extraField2: dto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const obj1 = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "",
        idNo:
          dto.CustomerType === "Individual"
            ? dto?.ProposerDetails.PanNo
            : dto.CustomerType === "Corporate" &&
              (dto?.ProposerDetails?.PanNo ||
                dto?.ProposerDetails?.GSTNumber ||
                dto?.ProposerDetails?.CINNo),
        idType:
          dto.CustomerType === "Individual"
            ? dto?.ProposerDetails?.PanNo && "PAN"
            : dto.CustomerType === "Corporate" &&
              ((dto.ProposerDetails.PanNo && "PAN") ||
                (dto.ProposerDetails.GSTNumber && "GSTIN") ||
                (dto.ProposerDetails.CINNo && "CIN")),
        dob: dto?.ProposerDetails?.DOB,
        mobileNo: "",
        pincode: "",
        ckycNo: "",
        extraField1: "",
        extraField2: "",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const obj2 = dto.ProposerDetails.AadharID !== "" ? objAadhar : obj1;
      const res1 = await getCkycDetails(1204, obj2);
      lDto.CkycStatus = res1.status;
      lDto.CkycDetails = res1;
      setDto({ ...lDto });
      if (res1.status === "success") {
        swal({
          text: `CKYC Successfull.`,
          icon: "success",
        });
        const dobString = dto?.ProposerDetails?.DOB;
        const [day, month, year] = dobString.split("-");
        const date = new Date(`${year}-${month}-${day}`);
        lDto.ProposerDetails.Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
        lMasters.proposerProps.var = { ...lMasters.proposerProps.var, ...res1 };
        lDto.ProposerDetails["First Name"] = res1.result.firstName;
        // lDto.ProposerDetails["Last Name"] = res1.result.lastName;
        if (res1.result.lastName === "" || res1.result.lastName === null) {
          lDto.ProposerDetails["Last Name"] = "";
        } else {
          lDto.ProposerDetails["Last Name"] = res1.result.lastName;
        }
        if (res1.result.email === "" || res1.result.email === null) {
          lDto.ProposerDetails["Email ID"] = dto.QuoteEmail;
        } else {
          lDto.ProposerDetails["Email ID"] = res1.result.email;
        }
        if (res1.result.mobileNumber === "" || res1.result.mobileNumber === null) {
          lDto.ProposerDetails["Mobile Number"] = dto.QuoteMobileNo;
        } else {
          lDto.ProposerDetails["Mobile Number"] = res1.result.mobileNumber;
        }
        if (res1.result.pincode === "") {
          lMasters.proposerProps.pincodeflag = true;
        } else {
          lMasters.proposerProps.pincodeflag = false;
        }
        lDto.ProposerDetails.PermanentAddress.AddressLine1 = res1.result.address1;
        lDto.ProposerDetails.PermanentAddress.AddressLine2 = res1.result.address2;
        lDto.ProposerDetails.PermanentAddress.Pincode = res1.result.pincode;
        // lDto.ProposerDetails.PermanentAddress.City = res1.result.city;
        // lDto.ProposerDetails.PermanentAddress.District = res1.result.district;
        // lDto.ProposerDetails.PermanentAddress.State = res1.result.state;

        if (res1.result.pincode.length === 6) {
          const ProductId = 782;
          const obj = { Pincode: res1.result.pincode };
          const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
          lMasters.proposerProps.permCD = city;
          const res2 = await getPincodeDetails(city[0].City_ID);
          lDto.ProposerDetails.PermanentAddress.CityDistrict = res2.district[0].District_Name;
          lDto.ProposerDetails.PermanentAddress.StateValue = res2.state[0].State_Name;
        } else {
          lMasters.proposerProps.permCD = [];
          lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
          lDto.ProposerDetails.PermanentAddress.State = "";
        }
      }
      if (res1.status === "failure") {
        swal({
          icon: "error",
          text: "CKYC Failure",
        });
        if (dto.proposalNumber === "") {
          lDto.CkycStatus = res1.status;
          const res = await calculateProposal(dto);
          lDto.proposalNumber = res.data.proposalNumber;
          lDto.ProposalNo = res.data.proposalNumber;
          lMasters.SavePymtDTO.proposalNo = res.data.proposalNumber;
          setDto({ ...lDto });
          setMasters({ ...lMasters });
        } else {
          await postRequest(`Policy/UpdateProposalDetails`, dto);
        }
        lMasters.proposerProps.var = { ...lMasters.proposerProps.var, ...res1 };
      }
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}-${propformat(
      propdate.getMonth() + 1
    )}-${propdate.getFullYear()}`;
  };

  const updateckyc = async () => {
    const obj1 = {
      source: "AVO",
      uniqueTransactionNumber: masters.proposerProps.var.uniqueTransactionNumber,
      extraField1: "",
      extraField2: "",
      extraField3: "",
      extraField4: "",
      extraField5: "",
    };
    const res = await getCkycUpdateStatus(obj1);
    console.log("updateckyc", res);
    lDto.CkycStatus = res?.status;
    lDto.CkycDetails = res;

    if (res.status === "success") {
      // lMasters.flags.updateflags = true;
      swal({
        text: `CKYC Successfull.`,
        icon: "success",
      });
      const dobString = res.result.dob;
      const [day, month, year] = dobString.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      lDto.ProposerDetails.Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = res.result.address;
      // lDto.ProposerDetails.PermanentAddress.AddressLine2 = res.result.address2;
      // lDto.ProposerDetails.PermanentAddress.AddressLine3 = res1.result.address3;
      // lDto.ProposerDetails.PermanentAddress.Landmark = res1.result.address3;
      if (res.result.pincode === "" || res.result.pincode === null) {
        lDto.ProposerDetails.PermanentAddress.Pincode = "";
      } else {
        lDto.ProposerDetails.PermanentAddress.Pincode = res.result.pincode;
      }
      lDto.ProposerDetails["First Name"] = res.result.name;
      lDto.ProposerDetails.AadharName = res.result.name;
      lDto.ProposerDetails["Last Name"] = "";
      if (res.result.pan === "" || res.result.pan === null) {
        lDto.ProposerDetails.PanNo = dto.ProposerDetails.PanNo;
      } else {
        lDto.ProposerDetails.PanNo = res.result.pan;
      }

      if (res.result.uploadedDocument === "CIN") {
        lDto.ProposerDetails.CINNo = res?.result?.idNo;
      }
      if (res.result.uploadedDocument === "GSTIN") {
        lDto.ProposerDetails.GSTNumber = res.result.idNo;
      }
      // lDto.ProposerDetails["Last Name"] = res.result.lastName;
      if (res.result.email === null || res.result.email === "") {
        lDto.ProposerDetails["Email ID"] = dto.QuoteEmail;
      } else {
        lDto.ProposerDetails["Email ID"] = res.result.email;
      }
      if (res.result.dob === "" || res.result.dob === null) {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DOB = res.result.ckycDate;
      } else {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DOB =
          lDto.CustomerType === "Individual" ? res.result.dob : formatPropDate(res.result.dob);
      }
      if (res.result.maskedAadhaarNumber !== "") {
        lDto.ProposerDetails.AadharID = res.result.maskedAadhaarNumber.substring(
          res.result.maskedAadhaarNumber.length - 4
        );
      }
      if (res.result.mobileNumber === null || res.result.mobileNumber === "") {
        lDto.ProposerDetails["Mobile Number"] = dto.QuoteMobileNo;
        lDto.ProposerDetails.AadharMobileNo = dto.QuoteMobileNo;
      } else {
        lDto.ProposerDetails["Mobile Number"] = res.result.mobileNumber;
        lDto.ProposerDetails.AadharMobileNo = res.result.mobileNumber;
      }
      if (res.result.pincode === "") {
        lMasters.proposerProps.pincodeflag = true;
      } else {
        lMasters.proposerProps.pincodeflag = false;
      }

      if (res.result.pincode.length === 6) {
        const ProductId = 782;
        const obj = { Pincode: res.result.pincode };
        const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
        lMasters.proposerProps.permCD = city;

        const res2 = await getPincodeDetails(city[0].City_ID);
        lDto.ProposerDetails.PermanentAddress.CityDistrict = res2.district[0].District_Name;
        lDto.ProposerDetails.PermanentAddress.StateValue = res2.state[0].State_Name;
      } else {
        lMasters.proposerProps.permCD = [];
        lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        lDto.ProposerDetails.PermanentAddress.State = "";
      }
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
    // if (res.status === "failure") {
    //   lMasters.flags.updateflags = false;
    // }

    await callUpdateQuoteMethod(lDto);
    await postRequest(`Policy/UpdateProposalDetails`, lDto);
  };
  const sendMail = async () => {
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            CkycUrl: masters.proposerProps.var.result.manualKYCurl,
            ContactUsUrl: process.env.REACT_APP_CONTACTSUPPORT,
          }),
        },
      ],
      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: dto.QuoteEmail,
    };
    const mail = await CkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.status === 1) {
      swal({
        text: `Email sent successfully.`,
        icon: "success",
      });
    }
    const MobileNo = dto.ProposerDetails["Mobile Number"];
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${masters.proposerProps.var.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };
  const handlePanChange = (e) => {
    lDto.CustomerType = e.target.value;
    if (e.target.value === "Corporate") {
      lDto.ProposerDetails.PanNo = "";
      lDto.ProposerDetails.DOB = "";
      lDto.ProposerDetails.GSTNumber = "";
      lDto.ProposerDetails.CINNo = "";
      lDto.ProposerDetails.CKYCParam = "";
    } else {
      lDto.ProposerDetails.PanNo = "";
      lDto.ProposerDetails.DOB = "";
    }
    setDto({ ...dto });
  };
  // const handleDOBChange = (e) => {
  //   lDto.ProposerDetails.DOB = e.target.value;
  //   if (e.target.value === "Date of Birth") {
  //     const [day, month, year] = e;
  //     const date1 = new Date(`${year}-${month}-${day}`);
  //     const age = handleCalculateAge(date1.toLocaleDateString("en-ZA"));
  //     if (age < 18) {
  //       lDto.ProposerDetails.DOB = null;
  //     } else {
  //       lDto.ProposerDetails.DOB = formatDateKYC(e);
  //     }
  //   }
  // };

  const handlevalidChange = (e) => {
    if (dto.ProposerDetails.GSTNumber) {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (gstRegex.test(e.target.value)) {
        lMasters.proposerProps.gstflag = false;
        lMasters.proposerProps.panflag = false;
        lMasters.proposerProps.cinflag = false;
      } else {
        lMasters.proposerProps.gstflag = true;
        swal({ icon: "error", text: "Enter Valid GST No" });
      }
    } else if (dto.ProposerDetails.PanNo) {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (PanRegex.test(e.target.value)) {
        lMasters.proposerProps.panflag = false;
        lMasters.proposerProps.gstflag = false;
        lMasters.proposerProps.cinflag = false;
      } else {
        lMasters.proposerProps.panflag = true;
        swal({ icon: "error", text: "Enter Valid PAN No" });
      }
    } else if (dto.ProposerDetails.CINNo) {
      const cinRegex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
      if (cinRegex.test(e.target.value)) {
        lMasters.proposerProps.cinflag = false;
        lMasters.proposerProps.gstflag = false;
        lMasters.proposerProps.cinflag = false;
      } else {
        lMasters.proposerProps.cinflag = true;
        swal({ icon: "error", text: "Enter Valid CIN No" });
      }
    }
    setMasters({ ...lMasters });
  };

  const onSameAddress = (e) => {
    lDto.ProposerDetails.SameAsPermanentAddress = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 =
        lDto.ProposerDetails.PermanentAddress.AddressLine1;
      lDto.ProposerDetails.CommunicationAddress.AddressLine2 =
        lDto.ProposerDetails.PermanentAddress.AddressLine2;
      lDto.ProposerDetails.CommunicationAddress.Pincode =
        lDto.ProposerDetails.PermanentAddress.Pincode;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict =
        lDto.ProposerDetails.PermanentAddress.CityDistrict;
      lDto.ProposerDetails.CommunicationAddress.State = lDto.ProposerDetails.PermanentAddress.State;
      lDto.ProposerDetails.CommunicationAddress.CityDistrictID =
        lDto.ProposerDetails.PermanentAddress.CityDistrictID;
      lDto.ProposerDetails.CommunicationAddress.StateID =
        lDto.ProposerDetails.PermanentAddress.StateID;
    } else {
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 = "";
      lDto.ProposerDetails.CommunicationAddress.AddressLine2 = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.State = "";
    }
    setDto({ ...lDto });
  };
  const onTab = (e, a) => {
    lMasters.proposerProps.tabIndex = a;
    setMasters({ ...lMasters });
  };

  const handleDeleteFile = async (i) => {
    // const arr1 = dto.documentDetails.filter((x, i1) => i1 !== i);
    const fileName = dto.documentDetails.filter((x, i1) => i1 === i)[0].fileName.toString();
    // lDto.documentDetails = arr1;
    await DeleteDocument(fileName).then((res) => {
      lDto.documentDetails[i].DocName = "";
      if (res.data.status === 5) {
        const filter = { ...dto.documentDetails[i] };
        // filter.DocName = "";
        filter.DocId = "";
        filter.DocType = "";
        // filter.DocTypeName = "";
        filter.UploadDocDate = "";
        filter.contentType = "";
        filter.fileName = "";
        lDto.documentDetails.splice(i, 1, { ...filter });

        setDto({ ...lDto });
      }
    });
  };

  const onAddDocument = () => {
    if (dto?.documentDetails.some((x) => x.fileName === "")) {
      swal({
        icon: "error",
        text: "Please upload the file before Adding",
      });
    } else if (lDto.documentDetails.length < 10) {
      lDto.documentDetails = [...lDto.documentDetails, { ...docDetails() }];
      setDto({ ...lDto });
    } else {
      swal({
        icon: "error",
        text: "Only 10 documents can upload",
      });
    }
  };
  const handleDocFileDelete = async (i) => {
    const arr1 = dto.documentDetails.filter((x, i1) => i1 !== i);
    // const fileName = dto.documentDetails.filter((x, i1) => i1 === i)[0].fileName.toString();
    lDto.documentDetails = arr1;
    // await DeleteDocument(fileName);
    setDto({ ...lDto });
  };
  const spreedDocComponents = () => {
    const arr = [];
    dto.documentDetails.forEach((x, i) => {
      // const isDocumentUploaded = x.fileName !== "";
      // if (isDocumentUploaded) {
      arr.push(
        {
          type: "AutoComplete",
          label: "Document Name",
          path: `documentDetails.${i}.DocName`,
          visible: masters?.proposerProps?.tabIndex === 0,
          disableClearable: true,
          readOnly: lDto.documentDetails[i].fileName !== "",
          // disabled: lDto.documentDetails[i].fileName !== "",
          spacing: 3,
          options: masters.doc,
        },
        {
          type: "Input",
          spacing: 3,
          label: "Document Remarks",
          path: `documentDetails.${i}.DocTypeName`,
          visible: masters?.proposerProps?.tabIndex === 0,
        },
        {
          type: "Custom",
          spacing: 2.5,
          visible: masters?.proposerProps?.tabIndex === 0,
          return: (
            <MDButton variant="outlined" component="label">
              CHOOSE AND UPLOAD
              <input
                id="fileInput"
                hidden
                name={i}
                accept="image/bmp, image/jpeg, image/png, .pdf"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
            </MDButton>
          ),
        },
        {
          type: "Custom",
          visible: masters?.proposerProps?.tabIndex === 0,
          spacing: 0.7,
          return: <DeleteIcon color="primary" onClick={() => handleDeleteFile(i)} />,
        },
        {
          type: "Button",
          label: "ADD",
          // startIcon: <AddIcon />,
          visible: masters?.proposerProps?.tabIndex === 0,
          variant: "outlined",
          // disabled: dto.documentDetails.fileName === "",
          onClick: onAddDocument,
          spacing: 1.8,
        },
        {
          type: "Custom",
          // visible: masters?.proposerProps?.tabIndex === 0 && x.fileName !== "",
          visible: masters?.proposerProps?.tabIndex === 0 && i !== 0,
          spacing: 1,
          return: <CancelIcon color="primary" onClick={() => handleDocFileDelete(i)} />,
        },
        {
          type: "Custom",
          spacing: 6.2,
          visible: true,
        },
        {
          type: "TypographyVal",
          spacing: 4,
          sx: { fontSize: "10px" },
          path: `documentDetails.${i}.fileName`,
          visible: masters?.proposerProps?.tabIndex === 0,
        },
        {
          type: "Custom",
          spacing: 1.8,
          visible: true,
        }
      );
    });
    return arr;
  };
  const onDownloadClick = async (p) => {
    try {
      const result = await getRequest(`DMS/GetDocumentById?id=${p}`);

      const data2 = result.data;
      const fileNames = data2.fileName;
      if (data2.data !== "") {
        generateFile(data2.data, fileNames);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onCheck = (e) => {
    lDto.ProposalConsent.ProposalConsentCheck = e.target.checked;
    if (e.target.checked) {
      proposalConsentMail(dto.QuoteEmail, dto["Quotation No"]);
      // const MobileNo = dto.ProposerDetails["Mobile Number"];
      const MobileNo = dto.QuoteMobileNo;
      const Message = `Dear customer,Quotation No. ${dto["Quotation No"]} is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
      SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
    }
    setDto({ ...lDto });
  };
  const handleSendOTP = () => {
    if (dto.QuoteEmail === "") {
      swal({
        icon: "error",
        text: "Please enter email ID",
      });
    } else {
      lMasters.proposerProps.startCounterFlag = true;

      const sendOtp = {
        name: "",
        otp: "1234",
        email: dto.QuoteEmail,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: dto.QuoteMobileNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          lMasters.proposerProps.status = true;
        } else {
          lMasters.proposerProps.status = false;
        }
      });
      setMasters({ ...lMasters });
    }
  };

  const [dispatch] = useDataController();
  const handleVerifyOTP = () => {
    if (dto.ProposalConsent.OTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: dto.ProposalConsent.OTP,
        email: dto.QuoteEmail,
        mobileNumber: dto.QuoteMobileNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            swal({ icon: "success", text: "OTP verified successfully" });
            lMasters.proposerProps.startCounterFlag = false;
            lMasters.proposerProps.otpflag = true;
          } else {
            lMasters.proposerProps.otpflag = false;
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          lMasters.proposerProps.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      setMasters({ ...lMasters });
    }
  };
  const handleProposerMasters = (e, v, name) => {
    if (name === "Salutation") {
      // lMasters.proposerSal = v.mValue;
      lDto.ProposerDetails.Salutation = v.mValue;
      if (v.mValue === "Mr.") {
        // lMasters.proposerGender = "Male";
        lDto.ProposerDetails.Gender = "Male";
      } else if (v.mValue === "Ms." || v.mValue === "Mrs.") {
        // lMasters.proposerGender = "Female";
        lDto.ProposerDetails.Gender = "Female";
      } else {
        // lMasters.proposerGender = "";
        lDto.ProposerDetails.Gender = "";
      }
    } else if (name === "Gender") {
      // lMasters.proposerGender = v.mValue;
      lDto.ProposerDetails.Gender = v.mValue;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onHypothecation = (e, v) => {
    lDto.Hypothecation = v.mValue;
    if (v.mValue === "No") {
      lDto.HypothecationBankName = "";
      lDto.HypothecationBankAddress = "";
      lDto.HypothecationLoanNo = "";
    }
    setDto({ ...lDto });
  };

  return [
    [
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: { label: "Customer Type", labelVisible: true },
        radioList: [
          {
            value: "Individual",
            label: "Individual",
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            value: "Corporate",
            label: "Corporate",
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
        ],
        path: "CustomerType",
        customOnChange: (e) => handlePanChange(e),
        spacing: 12,
      },
      {
        type: "Input",
        label: "CKYC Status",
        visible: true,
        disabled: true,
        value: dto.CkycStatus,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "AutoComplete",
        label: "Select ID Type",
        visible: dto.CustomerType === "Individual",
        spacing: 3,
        required: true,
        path: `ProposerDetails.CKYCParam`,
        options: masters?.CkycParams,
        customOnChange: (e, v) => handleSetValueParms(e, v),
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "Input",
        label: "PAN Number",
        spacing: 2.3,
        visible:
          dto?.ProposerDetails?.CKYCParam === "PAN Number" || dto.CustomerType === "Corporate",
        required: dto.CustomerType !== "Corporate",
        customOnBlur: (e) => handlevalidChange(e),
        // onBlurFuncs: ["IsPan"],
        path: `ProposerDetails.PanNo`,
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.CINNo !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.GSTNumber !== "") ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "failure",
        // error: masters.proposerProps.panflag && dto.ProposerDetails.PanNo !== "",
        // errtext:
        //   masters.proposerProps.panflag && dto.ProposerDetails.PanNo !== "" && "Enter valid Pan No",
      },
      {
        type: "Input",
        label: "GST Number",
        visible: dto.CustomerType === "Corporate",
        // required: dto.CustomerType === "Corporate",
        customOnBlur: (e) => handlevalidChange(e),
        // onBlurFuncs: ["IsGstNo"],
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.CINNo !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.PanNo !== "") ||
          dto.CkycStatus === "success",
        path: `ProposerDetails.GSTNumber`,
        // error: masters.proposerProps.gstflag && dto.ProposerDetails.GSTNumber !== "",
        // errtext:
        //   masters.proposerProps.gstflag &&
        //   dto.ProposerDetails.GSTNumber !== "" &&
        //   "Enter valid GST No",
      },
      {
        type: "Input",
        label: "CIN Number",
        visible: dto.CustomerType === "Corporate",
        // required: dto.CustomerType === "Corporate",
        customOnBlur: (e) => handlevalidChange(e),
        // onBlurFuncs: [IsCINNo],
        path: `ProposerDetails.CINNo`,
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.GSTNumber !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.PanNo !== "") ||
          dto.CkycStatus === "success",
      },

      {
        type: "Input",
        label: "Enter last 4 digits of Aadhar",
        spacing: 2.3,
        visible: dto?.ProposerDetails?.CKYCParam === "Aadhaar Number",
        required: dto.CustomerType !== "Corporate",
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 4 },
        path: `ProposerDetails.AadharID`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 2.3,
        visible:
          dto.ProductName !== "Cyber Retail" &&
          (dto?.ProposerDetails?.CKYCParam === "PAN Number" ||
            dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
            dto.CustomerType === "Corporate"),
        dateFormat: "d-m-Y",
        label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        maxDate: new Date(),
        path: `ProposerDetails.DOB`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 2.3,
        visible:
          dto.ProductName === "Cyber Retail" &&
          (dto?.ProposerDetails?.CKYCParam === "PAN Number" ||
            dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
            dto.CustomerType === "Corporate"),
        dateFormat: "d-m-Y",
        allowInput: true,
        minDate: subYears(new Date(), 100),
        maxDate: endOfYear(new Date()),
        label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        path: `ProposerDetails.DOB`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "Input",
        label: "Mobile No. as per Aadhar",
        required: dto.CustomerType !== "Corporate",
        visible: dto?.ProposerDetails?.CKYCParam === "Aadhaar Number",
        onBlurFuncs: [IsMobileNumber],
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        spacing: 2.4,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
        path: `ProposerDetails.AadharMobileNo`,
      },
      {
        type: "Input",
        label: "Full Name as per Aadhar",
        spacing: 2.3,
        visible: dto?.ProposerDetails?.CKYCParam === "Aadhaar Number",
        required: dto.CustomerType !== "Corporate",
        onChangeFuncs: ["IsAlphaSpace"],
        InputProps: { maxLength: 50 },
        path: `ProposerDetails.AadharName`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "AutoComplete",
        label: "Gender",
        spacing: 2.3,
        required: dto.CustomerType !== "Corporate",
        visible: dto?.ProposerDetails?.CKYCParam === "Aadhaar Number",
        path: `ProposerDetails.AadharGender`,
        options: masters?.Gender,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
        // customOnChange: (e, v) => handleProposerMasters(e, v, "Gender"),
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "Button",
        label: "Initiate C-kyc",
        visible: true,
        variant: "contained",
        spacing: 3,
        onClick: initiateCkyc,
        disabled:
          (dto?.CustomerType === "Individual" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            dto?.ProposerDetails?.PanNo === "") ||
          (dto.CustomerType === "Individual" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            (dto.ProposerDetails.AadharID === "" ||
              dto.ProposerDetails.AadharMobileNo === "" ||
              dto.ProposerDetails.AadharGender === "" ||
              dto.ProposerDetails.AadharName === "")) ||
          (dto.CustomerType === "Corporate" &&
            !dto?.ProposerDetails?.GSTNumber &&
            !dto?.ProposerDetails?.PanNo &&
            !dto?.ProposerDetails?.CINNo) ||
          dto?.ProposerDetails?.DOB === "" ||
          dto.CkycStatus === "success" ||
          masters.proposerProps.cinflag ||
          masters.proposerProps.panflag ||
          masters.proposerProps.gstflag,
        // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
        //  ||
        // dto.CkycStatus === "failure",
      },
      {
        type: "Button",
        label: "Update Status",
        visible: true,
        variant: "contained",
        spacing: 3,
        disabled:
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            !dto?.ProposerDetails?.PanNo) ||
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            !dto?.ProposerDetails?.AadharID &&
            !dto?.ProposalDetails?.AadharMobileNo &&
            !dto?.ProposalDetails?.AadharGender &&
            !dto?.ProposalDetails?.AadharName) ||
          !dto?.ProposerDetails?.DOB ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "",
        onClick: updateckyc,
      },
      {
        type: "Button",
        label: "Send Email/SMS",
        visible: true,
        variant: "contained",
        spacing: 3,
        disabled:
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            !dto?.ProposerDetails?.PanNo) ||
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            !dto?.ProposerDetails?.AadharID &&
            !dto?.ProposalDetails?.AadharMobileNo &&
            !dto?.ProposalDetails?.AadharGender &&
            !dto?.ProposalDetails?.AadharName) ||
          !dto?.ProposerDetails?.DOB ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "",
        onClick: sendMail,
      },
    ],
    [
      {
        type: "AutoComplete",
        label: "Salutation",
        visible: dto.CustomerType === "Individual",
        spacing: 3,
        required: true,
        path: `ProposerDetails.Salutation`,
        options: masters?.Salutation,
        customOnChange: (e, v) => handleProposerMasters(e, v, "Salutation"),
      },
      {
        type: "Input",
        label: dto.CustomerType === "Corporate" ? "Corporate Name" : "First Name",
        visible: true,
        // required: true,
        path: `ProposerDetails.First Name`,
        onChangeFuncs: ["IsAlphaSpace"],
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "Input",
        label: "Last Name",
        visible: dto.CustomerType === "Individual",
        // required: true,
        path: `ProposerDetails.Last Name`,
        onChangeFuncs: ["IsAlphaSpace"],
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: dto.CustomerType === "Individual",
        spacing: 3,
        disabled:
          dto.ProposerDetails.Salutation === "Mr." ||
          dto.ProposerDetails.Salutation === "Ms." ||
          dto.ProposerDetails.Salutation === "Mrs.",
        InputProps: {
          disabled:
            dto.ProposerDetails.Salutation === "Mr." ||
            dto.ProposerDetails.Salutation === "Ms." ||
            dto.ProposerDetails.Salutation === "Mrs.",
        },
        required:
          dto.ProposerDetails.Salutation !== "Mr." &&
          dto.ProposerDetails.Salutation !== "Ms." &&
          dto.ProposerDetails.Salutation !== "Mrs.",
        path: `ProposerDetails.Gender`,
        options: masters?.Gender,
        customOnChange: (e, v) => handleProposerMasters(e, v, "Gender"),
      },
      // {
      //   type: "Input",
      //   label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "DOB",
      //   visible: true,
      //   required: true,
      //   path: `ProposerDetails.DOB`,
      // },
      {
        type: "MDDatePicker",
        label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        visible: true,
        // allowInput: true,
        // dateFormat: "Y-m-d",
        // path: "ProposerDetails.DOB",

        dateFormat: "d-m-Y",
        path: "ProposerDetails.DOB",
        // InputProps: { disabled: true },
        spacing: 3,
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "Input",
        label: "Email Id",
        visible: true,
        // required: true,
        path: `ProposerDetails.Email ID`,
        onBlurFuncs: ["IsEmail"],
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "Input",
        label: "Mobile Number",
        visible: true,
        // required: true,
        path: `ProposerDetails.Mobile Number`,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10, disabled: true },
        onBlurFuncs: ["IsMobileNumber"],
        disabled: true,
      },
    ],
    [
      {
        type: "Input",
        label: "Address 01",
        visible: true,
        // required: true,
        path: `ProposerDetails.PermanentAddress.AddressLine1`,
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "Input",
        label: "Address 02",
        visible: true,
        path: `ProposerDetails.PermanentAddress.AddressLine2`,
        disabled: true,
        InputProps: { disabled: true },
      },
      // {
      //   type: "Input",
      //   label: "Pincode",
      //   visible: true,
      //   // required: true,
      //   InputProps: { maxLength: 6, disabled: true },
      //   path: `ProposerDetails.PermanentAddress.Pincode`,
      //   customOnChange: (e) => handlePincode(e, "Perm"),
      //   disabled: true,
      // },
      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        InputProps: {
          maxLength: 6,
          disabled:
            (dto.CkycStatus === "success" && dto.ProposerDetails.PermanentAddress.Pincode !== "") ||
            dto.CkycStatus === "",
        },
        path: `ProposerDetails.PermanentAddress.Pincode`,
        customOnChange: (e) => handlePincode(e, "Perm"),
        // disabled: true,
        disabled:
          (dto.CkycStatus === "success" && dto.ProposerDetails.PermanentAddress.Pincode !== "") ||
          dto.CkycStatus === "",
      },

      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `ProposerDetails.PermanentAddress.CityDistrict`,
        options: masters?.proposerProps?.permCD,
        customOnChange: (e, v) => handleCity(e, v, "Perm"),
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        InputProps: { disabled: true },
        path: `ProposerDetails.PermanentAddress.State`,
      },
      {
        type: "Input",
        label: "Country",
        visible: true,
        disabled: true,
        InputProps: { disabled: true },
        path: `ProposerDetails.PermanentAddress.Country`,
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Is Communication address same as CKYC/Permanent address",
          labelVisible: true,
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        path: `ProposerDetails.SameAsPermanentAddress`,
        spacing: 12,
        customOnChange: (e) => onSameAddress(e),
      },
    ],
    [
      {
        type: "Input",
        label: "Address 01",
        visible: true,
        required: true,
        path: `ProposerDetails.CommunicationAddress.AddressLine1`,
        disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes",
        InputProps: { disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes" },
      },
      {
        type: "Input",
        label: "Address 02",
        visible: true,
        path: `ProposerDetails.CommunicationAddress.AddressLine2`,
        disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes",
        InputProps: { disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes" },
      },
      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        InputProps: {
          maxLength: 6,
          disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes",
        },
        path: `ProposerDetails.CommunicationAddress.Pincode`,
        customOnChange: (e) => handlePincode(e, "Comm"),
        disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes",
      },
      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `ProposerDetails.CommunicationAddress.CityDistrict`,
        options: masters?.proposerProps?.commCD,
        customOnChange: (e, v) => handleCity(e, v, "Comm"),
        disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes",
        InputProps: { disabled: dto.ProposerDetails.SameAsPermanentAddress === "Yes" },
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        InputProps: { disabled: true },
        path: `ProposerDetails.CommunicationAddress.State`,
      },
      {
        type: "Input",
        label: "Country",
        visible: true,
        disabled: true,
        InputProps: { disabled: true },
        path: `ProposerDetails.CommunicationAddress.Country`,
      },
    ],
    [
      {
        type: "Input",
        label: "GSTIN Number ",
        visible: dto.ProductName !== "Cyber Retail",
        // disabled: true,
        // InputProps: { disabled: true },
        InputProps: { maxLength: 15 },
        customOnBlur: (e) => handlevalidChange(e),
        path: `ProposerDetails.GSTNumber`,
      },
      {
        type: "Input",
        label: "PAN Number",
        visible: dto.ProductName !== "Cyber Retail",
        disabled: true,
        // required: true,
        InputProps: { disabled: true },
        customOnBlur: (e) => handlevalidChange(e),
        path: `ProposerDetails.PanNo`,
      },
    ],
    [
      // {
      //   type: "Input",
      //   label: "Financier Name",
      //   visible: true,
      //   path: `HypothecationFinancierName`,
      // },
      {
        type: "AutoComplete",
        label: "Hypothecation",
        path: `Hypothecation`,
        required: true,
        visible: dto.ProductName !== "Cyber Retail",
        options: masters.HypothecationCPM,
        customOnChange: (e, v) => onHypothecation(e, v),
      },
      {
        type: "Input",
        label: "Bank Name",
        visible: dto.ProductName !== "Cyber Retail",
        path: `HypothecationBankName`,
        onChangeFuncs: ["IsAlphaSpace"],
        required: dto.Hypothecation === "Yes",
        disabled: dto.Hypothecation === "No",
        InputProps: { disabled: dto.Hypothecation === "No" },
      },
      {
        type: "Input",
        label: "Bank Branch Address",
        // onChangeFuncs: ["IsAlphaNum"],
        visible: dto.ProductName !== "Cyber Retail",
        required: dto.Hypothecation === "Yes",
        disabled: dto.Hypothecation === "No",
        InputProps: { disabled: dto.Hypothecation === "No" },
        path: `HypothecationBankAddress`,
      },
      {
        type: "Input",
        label: "Loan Account Number",
        visible: dto.ProductName !== "Cyber Retail",
        onChangeFuncs: ["IsAlphaNum"],
        required: dto.Hypothecation === "Yes",
        // onBlurFuncs: dto.ProposerDetails.GSTNumber !== "" && ["IsGstNo"],
        disabled: dto.Hypothecation === "No",
        InputProps: { disabled: dto.Hypothecation === "No" },
        path: `HypothecationLoanNo`,
      },
    ],
    [
      {
        type: "Tabs",
        visible: true,
        spacing: 12,
        tabs: [{ label: "Upload" }, { label: "Download" }],
        value: masters?.proposerProps?.tabIndex,
        customOnChange: onTab,
      },
      // {
      //   type: "Typography",
      //   visible: true,
      //   spacing: 12,
      //   label: "",
      // },

      {
        type: "Typography",
        label: `Document Name`,
        visible: masters?.proposerProps?.tabIndex === 0,
        variant: "h6",
        sx: { fontSize: "14px" },
        spacing: 3,
      },

      {
        type: "Typography",
        label: `Document Remark`,
        visible: masters?.proposerProps?.tabIndex === 0,
        variant: "h6",
        sx: { fontSize: "14px" },
        spacing: 3,
      },

      {
        type: "Typography",
        label: `Browse File`,
        visible: masters?.proposerProps?.tabIndex === 0,
        sx: { fontSize: "14px" },
        variant: "h6",
        spacing: 6,
      },

      ...spreedDocComponents(),
      // {
      //   type: "Button",
      //   label: "Add Document",
      //   startIcon: <AddIcon />,
      //   visible: masters?.proposerProps?.tabIndex === 0,
      //   variant: "outlined",
      //   onClick: onAddDocument,
      //   spacing: 12,
      // },
      {
        type: "DataGrid",
        spacing: 12,
        visible: masters?.proposerProps?.tabIndex === 1,
        rowId: "fileName",
        path: "documentDetails",
        columns: [
          {
            field: "DocName",
            headerName: "Document Type",
            width: 300,
          },
          {
            field: "fileName",
            headerName: "File Name",
            sx: { fontSize: "12px" },
            width: 450,

            renderCell: (p) => (
              <div style={{ textAlign: "left", marginLeft: "-20px" }}>
                <MDButton variant="text" onClick={() => onDownloadClick(p.row.fileName)}>
                  {p.row.fileName}
                </MDButton>
              </div>
            ),
          },
          {
            field: "UploadDocDate",
            headerName: "Uploaded Date",
            width: 250,
          },
          // {
          //   field: "action",
          //   headerName: "",
          //   width: 200,
          //   renderCell: (params) => {
          //     console.log("params", params);
          //     const onDelete = () => {
          //       const updatedData = dto.documentDetails.filter(
          //         (item) => item.fileName !== params.row.fileName
          //       );
          //       lDto.documentDetails = updatedData;
          //       setDto({ ...lDto });
          //     };
          //     return  <DeleteIcon onClick={onDelete} />;
          //   },
          // },
        ],
      },
    ],
    [
      {
        type: "Checkbox",
        visible: true,
        required: true,
        label: "Proposal Consent",
        spacing: 12,
        checkedVal: true,
        unCheckedVal: false,
        path: `ProposalConsent.ProposalConsentCheck`,
        // value: masters.ProposalConsent,
        customOnChange: (e) => onCheck(e),
      },
      {
        type: "Input",
        label: "Enter OTP",
        required: dto.ProposalConsent.ProposalConsentCheck,
        path: `ProposalConsent.OTP`,
        visible: dto.ProposalConsent.ProposalConsentCheck,
        spacing: 3,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 6 },
        disabled: masters?.proposerProps?.otpflag,
      },
      {
        type: "Typography",
        label: "",
        visible: dto.ProposalConsent.ProposalConsentCheck,
        spacing: 1,
      },
      // {
      //   type: "Button",
      //   label: masters.counter === 30 ? "Send OTP" : "Resend OTP",
      //   visible: dto.ProposalConsent.ProposalConsentCheck,
      //   disabled: masters.startCounterFlag,
      //   onClick: handleSendOTP,
      //   spacing: 3,
      //   variant: "outlined",
      //   // path: masters.SendOTP,
      // },
      {
        type: "Custom",
        visible: dto.ProposalConsent.ProposalConsentCheck,
        spacing: 3,
        return: (
          <Grid item xs={12} sm={12} md={6}>
            {masters?.proposerProps?.timerFlag ? (
              <MDButton
                color="primary"
                variant="contained"
                onClick={handleSendOTP}
                disabled={masters?.proposerProps?.otpflag}
              >
                Re-Send OTP
              </MDButton>
            ) : (
              masters?.proposerProps?.sendOtpFlag === true && (
                <MDButton color="primary" variant="contained" onClick={handleSendOTP}>
                  Send OTP
                </MDButton>
              )
            )}
          </Grid>
        ),
      },
      {
        type: "Button",
        label: "Verify OTP",
        visible: dto.ProposalConsent.ProposalConsentCheck,
        spacing: 3,
        onClick: handleVerifyOTP,
        variant: "contained",
        // path: masters.verifyOTP,
        disabled: masters?.proposerProps?.otpflag,
      },
      {
        type: "Typography",
        label: (
          <Timer counter={masters.proposerProps.counter} status={masters.proposerProps.status} />
        ),
        visible:
          dto.ProposalConsent.ProposalConsentCheck && masters?.proposerProps?.startCounterFlag,
        spacing: 7,
        // path: masters.verifyOTP,
      },

      {
        type: "Checkbox",
        visible: dto.ProposalConsent.ProposalConsentCheck,
        label: `I/We Hereby declare that the statements made by me/us in this proposal form are true the
          best of my/our knowledge and belief and I/We hereby agree that this declaration shall
          from the basis of the contract between  me/us and the Universal Sompo General Insurance
         Company Limited insurance Company`,
        spacing: 12,
        path: `ProposalConsent.CheckCond1`,
        required: dto.ProposalConsent.ProposalConsentCheck,
        checkedVal: true,
        unCheckedVal: false,
      },

      {
        type: "Checkbox",
        visible: dto.ProposalConsent.ProposalConsentCheck,
        label:
          "I/We also declare that any addition alteration are carried out after the submission of this proposal form that the same would be conveyed to the insurance company immediately",
        spacing: 12,
        path: `ProposalConsent.CheckCond2`,
        required: dto.ProposalConsent.ProposalConsentCheck,
        checkedVal: true,
        unCheckedVal: false,
      },
    ],
  ];
}
export default ProposalDetails;
