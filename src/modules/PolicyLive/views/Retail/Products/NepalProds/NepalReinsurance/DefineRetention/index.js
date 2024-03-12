import { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import swal from "sweetalert";
import MDBox from "../../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../../../../components/MDLoader";

import {
  ApproveRetention,
  GetMasterDataType,
  GetRetentionGroupById,
  GetyearinRetention,
  ModifyRetention,
  RIValidations,
} from "../data";

import { get } from "../../../../../../../../Common/RenderControl/objectPath";

import { DateFormatFromDateObject } from "../../../../../../../../Common/Validations";

function DefineRetention({ retentionGroupId, setOpen }) {
  const [nextCount, setNextCount] = useState(0);

  const [dto, setDto] = useState({
    retentionGroupId: 0,
    retentionGroupName: "",
    retentionYear: "",
    SearchretentionGroupName: "",
    year: "",
    businessTypeId: "",
    businessType: "",
    retentionLogicId: "",
    retentionType: "",
    percentage: "",
    limit: "",
    effectiveFrom: "",
    effectiveTo: "",
    roleid: localStorage.getItem("roleId"),
    status: "",
    isApproved: "N",
    comment: "",
    createdDate: null,
    createdBy: null,
    modifiedDate: null,
    modifiedBy: null,
    isActive: null,

    tblRimappingDetail: [],
  });
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({ businessType: [], retentionType: [], year: [] });
  const [loading, setLoading] = useState(false);
  const styles = {
    rowStyle: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    centerRowStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      verticalAlign: "middle",
      textAlign: "center",
      fontSize: "1rem",
    },
    cardStyle: {
      display: "flex",
      flexDirection: "column",
      verticalAlign: "middle",
      textAlign: "center",
      width: "15rem",
      border: "2px solid rgba(112, 112, 112, 0.3)",
      borderRadius: "0.5rem",
      m: 0.5,
      p: 0.5,
      "&:hover": {
        backgroundColor: "#DEEFFD",
        cursor: "pointer",
      },
    },
    headingStyle: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#000000",
      justifyContent: "start",
      display: "flex",
      width: "100%",
      pl: "1rem",
    },
  };

  // const IsNumericNonZeroandhundred = (number) => {
  //   const regex = /^(?:100(?:\.0+)?|\d{1,2}(?:\.\d{1,2})?|\.\d{1,2})$/;
  //   if (regex.test(number)) {
  //     if (number <= 100) {
  //       return true;
  //     }
  //   }
  //   if (number > 100) {
  //     return "Percentage should not be more than 100";
  //   }
  //   return "Allows only number";
  // };

  const IsNumericNonZeroandhundred = (number) => {
    const regex = /^(100(?:\.0+)?|\d{1,2}(?:\.\d{1,2})?)$/;
    // const inputValue = Number(number);
    // const formattedValue = inputValue.toFixed(2);

    if (!/^(\d{1,2}(\.\d{1,2})?|100(\.00?)?)$/.test(number) && number <= 100) {
      return "Percentage should be 00.00 format";
    }
    if (regex.test(number)) {
      if (number <= 100) {
        return true;
      }
    }
    if (number > 100) {
      return "Percentage should not be more than 100";
    }
    return "Allows only number";
  };

  const IsAlphaNumNoSpace = (str) => {
    if (str === " ") return "Allows only alphabets and numbers ";
    const regex = /^[A-Za-z0-9\s]*$/;
    if (regex.test(str)) return true;
    return "Allows only alphabets, numbers and space";
  };
  // const IsNumericNonZero = (number) => {
  //   // const regex = /^[0-9]*$/;
  //   // const regex = /^[1-9][0-9]*$/;
  //   const regex = /^(?:[1-9][0-9]*)?$/;
  //   if (regex.test(number)) return true;
  //   return "Allows only number";
  // };

  const IsNumeric1 = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
  };

  const { headingStyle } = styles;

  const idValueMap = {
    businessType: "businessTypeId",
    retentionType: "retentionLogicId",
    year: "yearId",
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const assignValueId = (a, valueParam, idParam) => {
    // debugger;
    if (valueParam === "retentionType") {
      dto.percentage = "";
      dto.limit = "";
    }
    // if (valueParam === "YearType") {
    //   // dto.effectiveFrom = "";
    //   // dto.effectiveTo = "";
    //   setDto({
    //     ...dto,
    //     [valueParam]: a.mValue,
    //     [idParam]: a.mID,
    //     effectiveFrom: "",
    //     effectiveTo: "",
    //   });
    // }
    if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
    else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
  };

  const handleYearChange = (e, a) => {
    if (a === null) {
      setDto({ ...dto, year: "", effectiveTo: "", effectiveFrom: "" });
    } else {
      setDto({ ...dto, year: a.mValue, effectiveTo: "", effectiveFrom: "" });
    }
  };

  const onstartDate = (e, d) => {
    setDto((prevState) => ({ ...prevState, effectiveTo: "" }));
    setDto((prevState) => ({ ...prevState, effectiveFrom: d.toString() }));
    const date = new Date(d);
    const year = date.getFullYear();

    if (year !== dto.year && d) {
      dto.effectiveFrom = "";

      setDto((prevState) => ({ ...prevState, effectiveFrom: "" }));

      swal({
        text: "Effective From Year shall be same as selected in Year Field.",
        icon: "error",
      });
    }
  };

  const onEndDate = (e, d) => {
    setDto((prevState) => ({ ...prevState, effectiveTo: d.toString() }));

    const enddate = new Date(d);
    const startdate1 = new Date(dto.effectiveFrom);

    const year = enddate.getFullYear();
    if (year !== dto.year && d) {
      setDto((prevState) => ({ ...prevState, effectiveTo: "" }));
      swal({
        text: "Effective To Year shall be same as selected in Year Field.",
        icon: "error",
      });
    }

    if (enddate < startdate1) {
      setDto((prevState) => ({ ...prevState, effectiveTo: "" }));
      swal({
        text: "Effective To Date should not be more than Effective From Date.",
        icon: "error",
      });
    }
  };
  /* eslint-disable eqeqeq */
  const getAutocompleteValue = (master, id) => {
    if (master) return !checkForValue(id) ? master.filter((x) => x.mID == id)[0] : { mValue: "" };
    return { mValue: "" };
  };
  /* eslint-enable eqeqeq */
  const getMaster = (name) => masters[name];

  const validateCode = async (e, a, setErrorFlag, setErrorText) => {
    if (dto.SearchretentionGroupName !== e.target.value) {
      const RI = await RIValidations(e.target.value, "RetentionGroupName");
      if (RI.data.responseMessage !== null && RI.data.status === 9) {
        setErrorText(RI.data.responseMessage);
        setErrorFlag(true);

        setDto((prevState) => ({ ...prevState, retentionGroupName: "" }));
      }
    }
  };

  /* eslint-disable */
  const handleSave = async () => {
    setNextCount(nextCount + 1);
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto, x2.path);
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
      const response = await ApproveRetention({ ...dto, status: "Sent for Approval" });
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
        setDto({
          retentionGroupId: 0,
          retentionGroupName: "",
          retentionYear: "",

          year: "",
          businessTypeId: "",
          businessType: "",
          retentionLogicId: "",
          retentionType: "",
          percentage: "",
          limit: "",
          effectiveFrom: "",
          effectiveTo: "",
          roleid: localStorage.getItem("roleId"),
          status: "",
          isApproved: "N",
          comment: "",
          createdDate: null,
          createdBy: null,
          modifiedDate: null,
          modifiedBy: null,
          isActive: null,

          tblRimappingDetail: [],
        });
      } else
        swal({
          text: "Data Save failed. Please Try Again!",
          icon: "error",
        });
    }
  };

  const handleUpdate = async () => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto, x2.path);
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
      const response = await ModifyRetention(retentionGroupId, dto);
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
        // .then(() => {
        //   setOpen(false);
        // });
        setOpen(false);
      } else
        swal({
          text: "Data Save failed. Please Try Again!",
          icon: "error",
        });
    }
  };

  // const generateYearOptions = () => {
  //   debugger;
  //   const currentYear = new Date().getFullYear();
  //   const options = [];
  //   for (let i = currentYear; i >= currentYear - 2; i--) {
  //     options.push({ label: `${i}`, value: `${i}` });
  //   }
  //   return options;
  // };

  const renderItems = [
    {
      type: "AutoComplete",
      label: "Year",
      path: "year",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("year"),
      // options: masters.year,
      // options: generateYearOptions(),
      // customOnChange: (e, a) => assignValueId(a, "YearType", "YearTypeId"),
      customOnChange: (e, a) => handleYearChange(e, a),
    },
    {
      type: "AutoComplete",
      label: "Business Type",
      path: "businessType",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("businessType"),
      customOnChange: (e, a) => assignValueId(a, "businessType", idValueMap.businessType),
    },
    {
      label: "Retention Group Name",
      path: "retentionGroupName",
      type: "Input",
      onChangeFuncs: [IsAlphaNumNoSpace],
      // disabled: !checkForValue(retentionGroupId),
      // readOnly: !checkForValue(retentionGroupId),
      required: true,
      visible: true,
      spacing: 3,
      InputProps: { maxLength: 20 },
      customOnChange: (e, a, setErrorFlag, setErrorText) => {
        setDto((prevState) => ({
          ...prevState,
          retentionGroupName: e.target.value,
        }));
        setErrorFlag(false);
        setErrorText("");
      },
      customOnBlur: validateCode,
    },
    {
      type: "AutoComplete",
      label: "Retention Logic",
      path: "retentionType",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("retentionType").filter((x) => x.mValue !== "Lines"),
      customOnChange: (e, a) => assignValueId(a, "retentionType", idValueMap.retentionType),
    },
    {
      type: "Input",
      label: "Percentage (%)",
      path: "percentage",
      onBlurFuncs: [IsNumericNonZeroandhundred],
      customOnChange: [IsNumericNonZeroandhundred],
      visible: dto.retentionType === "Percentage" || dto.retentionType === "Percentage with Limit",
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Limit",
      path: "limit",
      onBlurFuncs: [IsNumeric1],
      customOnChange: [IsNumeric1],
      visible: dto.retentionType === "Limit" || dto.retentionType === "Percentage with Limit",
      required: true,
      spacing: 3,
    },
    {
      type: "MDDatePicker",
      label: "Effective From Date",
      path: "effectiveFrom",
      required: true,
      visible: dto.year !== "",
      spacing: 3,
      // minDate: dto.year !== "" || dto.year !== undefined ? new Date(dto.year, 0, 1) : null,
      // maxDate: dto.year !== "" || dto.year !== undefined ? new Date(dto.year, 11, 31) : null,
      customOnChange: (e, d) => onstartDate(e, d),
    },
    {
      type: "MDDatePicker",
      label: "Effective To Date",
      path: "effectiveTo",
      required: true,
      visible: dto.year !== "",
      spacing: 3,
      customOnChange: (e, d) => onEndDate(e, d),
    },
    {
      type: "Input",
      label: "Comments",
      path: "comment",
      visible: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Status",
      path: "Status",
      visible: true,
      disabled: true,
      spacing: 3,
    },
    {
      type: "Typography",
      label: "",
      spacing: 9,
      visible: true,
    },

    {
      type: "Button",
      label: "Save",
      spacing: 6,
      visible: checkForValue(retentionGroupId),
      justifyContent: "right",
      onClick: handleSave,
    },
    {
      type: "Button",
      label: "Save and submit for approval",
      spacing: 6,
      visible: checkForValue(retentionGroupId),
      justifyContent: "left",
      onClick: handleSave,
    },
    {
      type: "Button",
      label: "Update",
      spacing: 12,
      visible: !checkForValue(retentionGroupId),
      justifyContent: "center",
      onClick: handleUpdate,
    },
  ];
  /* eslint-enable */

  useEffect(async () => {
    const mst = { ...masters };
    setLoading(true);
    const res = await GetMasterDataType();

    const yearData = await GetyearinRetention();
    setLoading(false);
    if (res.data.filter((x) => x.mType === "BusinessType")[0]) {
      mst.businessType = [...res.data.filter((x) => x.mType === "BusinessType")[0].mdata];
    }
    if (res.data.filter((x) => x.mType === "AllocationLogic")[0]) {
      mst.retentionType = [...res.data.filter((x) => x.mType === "AllocationLogic")[0].mdata];
    }
    if (yearData.data) {
      if (localStorage.getItem("userName") === "upasana@gmail.com") {
        yearData.data[0].mdata.shift();
        yearData.data[0].mdata.shift();
        mst.year = yearData.data[0].mdata;
      } else {
        mst.year = yearData.data[0].mdata;
      }
    }

    if (!checkForValue(retentionGroupId)) {
      setLoading(true);
      const result = await GetRetentionGroupById(retentionGroupId);
      setDto({
        ...result.data,
        businessType: getAutocompleteValue(mst.businessType, result.data.businessTypeId).mValue,
        retentionType: getAutocompleteValue(mst.retentionType, result.data.retentionLogicId).mValue,
        effectiveFrom: DateFormatFromDateObject(new Date(result.data.effectiveFrom), "m-d-y"),
        effectiveTo: DateFormatFromDateObject(new Date(result.data.effectiveTo), "m-d-y"),
        SearchretentionGroupName: result.data.retentionGroupName,
      });
      setLoading(false);
    }

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  console.log(masters, "masters");
  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card
        sx={{ width: "100%", p: "1rem", boxShadow: !checkForValue(retentionGroupId) && "unset" }}
      >
        <MDTypography sx={headingStyle}>
          {checkForValue(retentionGroupId) ? "Define" : "Modify"} Retention
        </MDTypography>
        <MDBox>
          <Grid container spacing={2} sx={{ pt: "1rem" }}>
            {renderItems.map(
              (item) =>
                item.visible && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={item.spacing ? item.spacing : 3}
                    lg={item.spacing ? item.spacing : 3}
                    xl={item.spacing ? item.spacing : 3}
                    xxl={item.spacing ? item.spacing : 3}
                  >
                    <NewRenderControl
                      item={item}
                      dto={dto}
                      setDto={setDto}
                      nextFlag={nextFlg}
                      nextCount={nextCount}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default DefineRetention;