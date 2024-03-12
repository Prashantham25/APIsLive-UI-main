import { useEffect, useState } from "react";
import {
  Grid,
  // IconButton,
  Stack,
  // Icon,
  // Card,  Accordion, AccordionDetails, AccordionSummary
} from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import swal2 from "sweetalert2";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import { IsEmail, IsMobileNumber } from "../../../../../../../Common/Validations";
import MDButton from "../../../../../../../components/MDButton";
import { GetMasters, SaveContact, GetProdPartnerMasterDataCM } from "../data";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { get } from "../../../../../../../Common/RenderControl/objectPath";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function NewLead({ styles, setLoading, setPage, setSelectedId }) {
  const { headingStyle } = styles;
  const [leadInfo, setLeadInfo] = useState({
    opportunityId: 0,
    contactId: 0,
    contactTypeId: null,
    contactType: "",
    IdentificationNo: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    ContactNo: "",
    HomeNo: "",
    WorkNo: "",
    Salutation: "",
    SalutationId: "",
    // DOB: "",
    // Age: "",
    PassportNo: "",
    EmailId: "",
    Place: "",
    Gender: "",
    MaritalStatus: "",
    ResidentStatus: "",
    TypeOfProposal: "Individual",
    leadNo: "",
    leadDate: "",
    CommunicationAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      Landmark: "",
      City: "",
      District: "",
      State: "",
      Country: "",
      Pincode: "",
    },
    PermanentAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      Landmark: "",
      City: "",
      District: "",
      State: "",
      Country: "",
      Pincode: "",
    },
    ForeignAddress: {
      OCI: "",
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      City: "",
      District: "",
      State: "",
      Country: "",
      Pincode: "",
    },
    isPermanentAddrSameasCommAddr: true,
  });
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({
    contactType: [],
    Salutation: [],
  });

  const Navigate = useNavigate();

  const getMaster = (name) => masters[name];

  const getAge = (e, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const Age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    setLeadInfo({ ...leadInfo, DOB: birthdate, Age });
  };

  const assignValueId = (a, valueParam, idParam) => {
    if (a !== null) setLeadInfo({ ...leadInfo, [valueParam]: a.mValue, [idParam]: a.mID });
    else setLeadInfo({ ...leadInfo, [valueParam]: "", [idParam]: "" });
  };
  // const onPassportNo = (e) => {
  //   setLeadInfo({ ...leadInfo, PassportNo: e.target.value.toUpperCase() });
  // };
  const renderItems = [
    {
      type: "Custom",
      visible: true,
      spacing: 3,
      return: (
        <MDBox
          sx={{
            p: "1px",
          }}
        >
          <MDBox
            sx={{
              backgroundColor: ColorsSetting().primary.main,
            }}
            p={0.5}
          >
            <MDTypography
              color="white"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 600,
              }}
            >
              Basic Details
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
    },
    { type: "Custom", return: <MDBox />, spacing: 12, visible: true },
    { label: "First Name", visible: true, path: "FirstName", type: "Input", required: true },
    { label: "Middle Name", visible: true, path: "MiddleName", type: "Input", required: false },
    { label: "Last Name", visible: true, path: "LastName", type: "Input", required: true },
    {
      label: "Date of Birth",
      path: "DOB",
      visible: true,
      allowInput: true,
      type: "MDDatePicker",
      required: true,
      maxDate: new Date(),
      dateFormat: "Y-m-d",
      customOnChange: getAge,
    },
    { label: "Age", path: "Age", type: "Input", visible: true, disabled: true },
    {
      label: "Gender",
      path: "Gender",
      visible: true,
      type: "AutoComplete",
      options: getMaster("Gender"),
      customOnChange: (e, a) => assignValueId(a, "Gender", ""),
      required: true,
    },
    //   {
    //     label: "Identification No",
    //     path: "IdentificationNo",
    //     type: "Input",
    //     visible: true,
    //   },
    // {
    //   label: "Type",
    //   visible: true,
    //   path: "contactType",
    //   type: "AutoComplete",
    //   options: getMaster("contactType"),
    //   customOnChange: (e, a) => assignValueId(a, "contactType", "contactTypeId"),
    //   required: true,
    // },
    // {
    //   label: "Salutation",
    //   visible: true,
    //   path: "Salutation",
    //   type: "AutoComplete",
    //   name: "Salutation",
    //   options: getMaster("Salutation"),
    //   customOnChange: (e, a) => assignValueId(a, "Salutation", "SalutationId"),
    //   required: true,
    // },
    // {
    //   label: "Passport",
    //   visible: true,
    //   path: "PassportNo",
    //   type: "Input",
    //   customOnChange: onPassportNo,
    //   onBlurFuncs: [IsPassport],
    // },
    {
      label: "Mobile No.",
      visible: true,
      path: "ContactNo",
      type: "Input",
      required: true,
      errorFlag: IsMobileNumber(leadInfo.ContactNo) !== true,
      errorText:
        IsMobileNumber(leadInfo.ContactNo) !== true ? IsMobileNumber(leadInfo.ContactNo) : "",
      customOnBlur: (e, a, setErrorFlag, setErrorText) => {
        const response = IsMobileNumber(e.target.value);
        if (response !== true) {
          setErrorFlag(true);
          setErrorText(response);
        } else {
          setErrorFlag(false);
          setErrorText("");
          if (!leadInfo.WhatsAppNo) {
            setLeadInfo({ ...leadInfo, WhatsAppNo: e.target.value });
          }
        }
      },
    },
    {
      label: "WhatsApp No.",
      visible: true,
      path: "WhatsAppNo",
      type: "Input",
      inputType: "number",
    },
    {
      label: "Email Id",
      visible: true,
      path: "EmailId",
      type: "Input",
      required: true,
      errorFlag: IsEmail(leadInfo.EmailId) !== true,
      errorText: IsEmail(leadInfo.EmailId) !== true ? IsEmail(leadInfo.EmailId) : "",
    },
    {
      label: "Resident Status",
      path: "ResidentStatus",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("ResidentStatus"),
      // customOnChange: (e, a) => locationMasters("country", a),
    },
    {
      label: "Country of Residence",
      path: "PermanentAddress.Country",
      visible: leadInfo.ResidentStatus !== "Resident Indian",
      type: "AutoComplete",
      required: true,
      options: getMaster("country"),
      // customOnChange: (e, a) => locationMasters("country", a),
    },
  ];

  const handleSave = async () => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(leadInfo, x2.path);
        if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      setNextFlg(true);
      swal({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      const saveJson = {
        ...leadInfo,
        creationDate: new Date(),
        lastUpdated: new Date(),
        needAnalysisJson: null,
        stageId: 1,
        stageStatusId: 1,
        txnType: "",
        txnValue: "",
        txnValueId: "",
      };
      setNextFlg(false);
      setLoading(true);
      await SaveContact(saveJson).then((res) => {
        setLoading(false);
        if (res !== undefined && res.status <= 3) {
          swal2
            .fire({
              icon: "success",
              html: `<div style="display: flex; flex-direction: row;">
            <div style="flex: 3; text-align: center; margin-left: 0rem" ">
            <div>Lead No: <b>${res.finalResult.contactId}</b> Saved Successfully</div>
            <div>Do you Want to Proceed for Quote?</div>
            </div>`,
              showConfirmButton: true,
              cancelButtonText: "No",
              cancelButtonColor: "#006400",
              width: 500,
              confirmButtonText: "Yes",
              showCancelButton: true,
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                const page = res.finalResult.contactId;
                setSelectedId(page);
                Navigate(`/life/plans?LeadId=${page}`);
              } else {
                setSelectedId("");
                setPage("Lead Pool");
              }
            });
        } else
          swal({
            text: "Data Save failed. Please Try Again!",
            icon: "error",
          });
      });
    }
  };

  const handleProceedLead = async () => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(leadInfo, x2.path);
        if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      setNextFlg(true);
      swal({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      const saveJson = {
        ...leadInfo,
        creationDate: new Date(),
        lastUpdated: new Date(),
        needAnalysisJson: null,
        stageId: 1,
        stageStatusId: 1,
        txnType: "",
        txnValue: "",
        txnValueId: "",
      };
      setNextFlg(false);
      setLoading(true);
      await SaveContact(saveJson).then((res) => {
        setLoading(false);
        if (res !== undefined && res.status <= 3) {
          swal2
            .fire({
              icon: "success",
              html: `<div style="display: flex; flex-direction: row;">
            <div style="flex: 3; text-align: center; margin-left: 0rem" ">
            <div>Application: <b>${res.finalResult.contactId}</b> Saved Successfully</div>
            <div>Do you Want to Proceed With Need Analysis?</div>
            </div>`,
              showConfirmButton: true,
              cancelButtonText: "No",
              cancelButtonColor: "#006400",
              width: 500,
              confirmButtonText: "Yes",
              showCancelButton: true,
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                setSelectedId(res.finalResult.contactId);
                setPage("Modify Lead");
              } else {
                setSelectedId("");
                setPage("Lead Pool");
              }
            });
        } else
          swal({
            text: "Data Save failed. Please Try Again!",
            icon: "error",
          });
      });
    }
  };

  useEffect(async () => {
    setLoading(true);
    await Promise.all([GetMasters(), GetProdPartnerMasterDataCM("LICCountry", [])]).then((res) => {
      setLoading(false);
      const dummy = masters;
      res[0].map((elem) => {
        // if (elem.mType === "Type") dummy.contactType = elem.mdata;
        // if (elem.mType === "Salutation") dummy.Salutation = elem.mdata;
        if (elem.mType === "ResidentStatus") dummy.ResidentStatus = elem.mdata;
        if (elem.mType === "Gender") dummy.Gender = elem.mdata;
        return null;
      });
      setMasters({ ...dummy, country: res[1] });
    });
  }, []);

  return (
    // <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
    <MDBox sx={{ width: "100%" }} p={2}>
      {false && <MDTypography sx={headingStyle}>Create Lead</MDTypography>}
      <MDBox>
        <Grid container spacing={2}>
          {renderItems.map(
            (item) =>
              item.visible === true && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={item.spacing ? item.spacing : 3.5}
                  lg={item.spacing ? item.spacing : 3.5}
                  xl={item.spacing ? item.spacing : 3}
                  xxl={item.spacing ? item.spacing : 3}
                >
                  <NewRenderControl
                    item={item}
                    dto={leadInfo}
                    setDto={setLeadInfo}
                    nextFlag={nextFlg}
                  />
                </Grid>
              )
          )}
        </Grid>
      </MDBox>
      {/* <Card container sx={{ flexDirection: "column", width: "100%" }}>
        <MDBox sx={{ flexDirection: "column", width: "100%" }}>
          {renderItems.map((item) => (
            <Accordion
              disableGutters
              defaultExpanded
              sx={{
                // ...centerRowStyle,
                // textAlign: "start",
                // flexDirection: "column",
                // width: "100%",
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
                pt: "0.5rem",
                // pb: "0.3rem",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ background: "rgba(218, 232, 254, 1)", mb: "0.5rem" }}
              >
                <MDTypography
                  color="primary"
                  sx={{
                    // ...centerRowStyle,
                    // justifyContent: "start",
                    // width: "100%",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  {item.heading}
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {item.details.map((elem) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={elem.spacing ? elem.spacing : 3.5}
                      lg={elem.spacing ? elem.spacing : 3.5}
                      xl={elem.spacing ? elem.spacing : 3}
                      xxl={elem.spacing ? elem.spacing : 3}
                      sx={elem.sx ? elem.sx : {}}
                    >
                      {elem.visible === true && (
                        <NewRenderControl
                          item={elem}
                          dto={leadInfo}
                          setDto={setLeadInfo}
                          nextFlag={nextFlg}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </MDBox>
      </Card> */}
      <Stack direction="row" justifyContent="space-between" pt={2}>
        <MDButton variant="outlined" onClick={() => setPage("Lead Pool")}>
          Back
        </MDButton>
        {/* <IconButton>
          <Icon>arrow_back</Icon>
        </IconButton> */}
        <Stack direction="row" justifyContent="right" spacing={2} ml={2}>
          <MDButton variant="outlined" onClick={handleProceedLead}>
            Proceed with Need Analysis
          </MDButton>
          <MDButton onClick={handleSave}>Save Lead</MDButton>
        </Stack>
      </Stack>
    </MDBox>
  );
}
export default NewLead;
