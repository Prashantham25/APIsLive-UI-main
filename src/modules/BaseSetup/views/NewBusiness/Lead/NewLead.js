import { useEffect, useState } from "react";
import { Grid, Card } from "@mui/material";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import { IsEmail, IsMobileNumber, IsPassport } from "../../../../../Common/Validations";
import MDButton from "../../../../../components/MDButton";
import { SaveLead, GetMasters } from "../data";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import { get } from "../../../../../Common/RenderControl/objectPath";

function NewLead({ styles, setLoading, setPage }) {
  const { centerRowStyle } = styles;
  const [leadInfo, setLeadInfo] = useState({
    nicno: "",
    contactID: 0,
    contactTypeId: "",
    contactType: "",
    salutation: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    phoneNo: "",
    work: "",
    emailID: "",
    place: "",
    passportNo: "",
    gender: "",
    maritalStatusID: "",
    dateOfBirth: "",
    age: 0,
    occupationId: 0,
    monthlyIncome: "",
    currency: "",

    address: {},
    opportunityDTO: {},
  });
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({
    contactType: [],
    salutationValue: [],
  });

  const getMaster = (name) => masters[name];

  const assignValueId = (a, valueParam, idParam) => {
    if (a !== null) setLeadInfo({ ...leadInfo, [valueParam]: a.mValue, [idParam]: a.mID });
    else setLeadInfo({ ...leadInfo, [valueParam]: "", [idParam]: "" });
  };
  const renderItems = [
    {
      label: "Identification No",
      path: "nicno",
      type: "Input",
      visible: true,
    },
    {
      label: "Type",
      visible: true,
      path: "contactType",
      type: "AutoComplete",
      options: getMaster("contactType"),
      customOnChange: (e, a) => assignValueId(a, "contactType", "contactTypeId"),
      required: true,
    },
    {
      label: "Salutation",
      visible: true,
      path: "salutation",
      type: "AutoComplete",
      name: "salutationValue",
      options: getMaster("salutationValue"),
      customOnChange: (e, a) => assignValueId(a, "salutationValue", "salutation"),
      required: true,
    },
    { label: "First Name", visible: true, path: "firstName", type: "Input", required: true },
    { label: "Last Name", visible: true, path: "lastName", type: "Input", required: true },
    {
      label: "Mobile",
      visible: true,
      path: "mobileNo",
      type: "Input",
      required: true,
      onBlurFunc: IsMobileNumber,
    },
    { label: "Home", visible: true, path: "phoneNo", type: "Input" },
    { label: "Office", visible: true, path: "work", type: "Input" },
    {
      label: "E-Mail",
      visible: true,
      path: "emailID",
      type: "Input",
      required: true,
      onBlurFunc: IsEmail,
    },
    { label: "Place", visible: true, path: "place", type: "Input", required: true },
    { label: "Passport", visible: true, path: "passportNo", type: "Input", onBlurFunc: IsPassport },
  ];
  const handleSave = async () => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(leadInfo, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (validationFlag === false) {
      setNextFlg(true);
      swal({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      setNextFlg(false);
      setLoading(true);
      await SaveLead(leadInfo).then((res) => {
        setLoading(false);
        if (res !== undefined && res.status === 2) {
          swal({
            text: "Data Saved Successfully",
            icon: "success",
          });
          setPage("Lead");
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
    await GetMasters().then((res) => {
      setLoading(false);
      const dummy = masters;
      res.map((elem) => {
        if (elem.mType === "Type") dummy.contactType = elem.mdata;
        if (elem.mType === "Salutation") dummy.salutationValue = elem.mdata;
        return null;
      });
      setMasters({ ...dummy });
    });
  }, []);

  return (
    <MDBox>
      <Card container sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
        <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
          New Lead
        </MDTypography>
        <MDBox sx={centerRowStyle}>
          <Grid container spacing={2} sx={{ ...centerRowStyle, justifyContent: "start", m: 0 }}>
            {renderItems.map((item) => (
              <Grid item xs={12} sm={6} md={3.5} lg={3.5} xl={3} xxl={3}>
                <NewRenderControl
                  item={item}
                  dto={leadInfo}
                  setDto={setLeadInfo}
                  nextFlag={nextFlg}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDButton onClick={handleSave}>Save</MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default NewLead;
