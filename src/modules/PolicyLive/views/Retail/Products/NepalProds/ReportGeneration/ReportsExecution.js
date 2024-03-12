import React, { useState, useEffect } from "react";
import MDDataGrid from "components/MDDataGrid";
// import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
// GridToolbarContainer, GridToolbarExport
// import { gridClasses } from "@mui/x-data-grid";
import { Grid, Autocomplete, Stack, Backdrop, CircularProgress, Accordion } from "@mui/material";
import { CSVLink } from "react-csv";
import swal from "sweetalert";
// import { grey } from "@mui/material/colors";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import exportlogo from "assets/images/BrokerPortal/Admin/excel.png";
import { GetDynamicPermissions, GetParameters, QueryExecution } from "../../../../Reports/data";
import MDInput from "../../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDButton from "../../../../../../../components/MDButton";
import {
  GetNPCommonMaster,
  GetProdPartnermasterData,
  GetProdPartnermasterData1,
} from "../data/APIs/MotorCycleApi";
import { DateFormatFromDateObject } from "../../../../../../../Common/Validations";
import { GetTreatyById } from "../NepalReinsurance/data";
import { postRequest } from "../../../../../../../core/clients/axiosclient";

const masters = {
  "Participant Name": [],
  "Treaty Type": [],
  "Treaty Name": [],
  RIReportFrequency: [],
  RIReportFiscalYear: [],
  RIReportMonth: [],
  RIReportQuarter: [],
  RIReportHalfYearly: [],
  FileName: "",
  FileNamePush: [],
  "Branch Name": [],
  "Province State": [],
  "Fiscal Year": [],
  "Bank Name": [],
};

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport
//         printOptions={{
//           disableToolbarButton: true,
//           fileName: masters.FileName,
//         }}
//         csvOptions={{ fileName: masters.FileName }}
//       />
//     </GridToolbarContainer>
//   );
// }
// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

function ReportGeneration() {
  const [finalReportResponse, setFinalReportResponse] = useState([]);

  console.log("finalReportResponse", finalReportResponse);
  const [ReportConfigData, setReportConfigData] = useState({
    ReportName: "",
    DatgridReportData: {},
    AutocompleteOptions: {
      ReportNameoptions: [],
    },

    Parameters: {
      ReportConfigId: "",
      paramList: [],
    },
    Frequency: "",
    FrequencyPeriod: "",

    finalReportResponse: [],

    flags: {
      GetParameters: "false",
    },
    ExportFileNameArray: [],
    ExportFileName: "",
  });
  const [flags, setFlags] = useState({
    planflag: false,
    gridflag: false,
    filterflag: false,
    Addtionalfileds: false,
    AddtionalfiledsButton: true,
  });

  const [finalReport, setFinalReport] = useState({});

  const [column, setColumn] = useState([]);
  const [rows, setRows] = useState([]);
  const [CSVLinkReport, setCSVLinkReport] = useState([]);
  const [reportValue, setReportsValue] = useState([]);
  const [reportParameterList, setReportParameterList] = useState([]);

  // const errorMes = "This field is required.";
  const errorText = "This field  is Required";

  const [Saveflag, setSaveflag] = useState(false);

  useEffect(async () => {
    await GetDynamicPermissions().then((response) => {
      setReportsValue([...response]);
    });
    if (masters["Participant Name"].length === 0) {
      await GetNPCommonMaster().then((r) => {
        console.log(r, 2222);
        r.forEach((x) => {
          masters[x.mType] = x.mdata;
        });
      });
    }
    if (
      localStorage.getItem("NepalCompanySelect") !== null ||
      process.env.REACT_APP_EnvId !== "297"
    ) {
      let Company = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Company = "NMIC";
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Company = "PMIC";
      }
      if (
        process.env.REACT_APP_EnvId === "297" &&
        localStorage.getItem("NepalCompanySelect") === null
      ) {
        Company = "NMIC";
      }
      if (masters["Branch Name"].length === 0) {
        await GetProdPartnermasterData("BranchName", {
          Description: Company,
        }).then((res) => {
          console.log(" res.data", res.data);
          masters["Branch Name"] = res.data;
        });
        const b = await GetProdPartnermasterData("State", {});
        masters["Province State"] = b.data;
      }
    }
    if (masters["Bank Name"].length === 0) {
      await GetProdPartnermasterData1("BankDetails", {
        MasterType: "BankDetails",
      }).then((x) => {
        masters["Bank Name"] = x.data;
      });
    }
  }, []);
  console.log("reportValue", reportValue);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const handleReportNameChange = async (e, value) => {
    setRows([]);
    setColumn([]);
    setCSVLinkReport([]);

    if (value === null) {
      ReportConfigData.ReportName = "";
      masters.FileNamePush.push(value.mValue);
    } else {
      ReportConfigData.ReportName = value.mValue;
      masters.FileName = value.mValue;
    }

    ReportConfigData.FrequencyPeriod = "";
    ReportConfigData.Frequency = "";
    console.log(value.mValue, "value.mValue");

    if (value.mValue === "Branchwise Portfolio Summary") {
      masters.RIReportFrequency = masters.RIReportFrequency.filter(
        (x) => x.mValue !== "Half Yearly"
      );
    }
    ReportConfigData.Parameters.ReportConfigId = value.mID.toString();

    const abc = await GetParameters(value.mID);
    console.log("abc", abc);
    ReportConfigData.Parameters.paramList = [];
    if (abc.length !== 0) {
      ReportConfigData.flags.GetParameters = "true";
      abc.forEach(async (x) => {
        ReportConfigData.Parameters.paramList.push({
          /* eslint-disable */
          parameterName: x.parameterName,
          parameterValue:
            x.parameterName === "FromDate" || x.parameterName === "ToDate"
              ? DateFormatFromDateObject(new Date(), "y-m-d")
              : x.parameterName === "Department" &&
                ReportConfigData.Parameters.ReportConfigId === "421"
              ? "Agriculture"
              : x.parameterName === "Department" &&
                ReportConfigData.Parameters.ReportConfigId === "519"
              ? "Property"
              : "",
          /* eslint-enable */
        });
      });

      setReportParameterList(abc);
      flags.filterflag = true;
      setFlags({ ...flags });
    } else {
      ReportConfigData.flags.GetParameters = "false";
      swal({
        text: "Please Try Again ",
        icon: "error",
      });
    }

    setReportConfigData({ ...ReportConfigData });
  };
  const handleDateChange = (e, date, type) => {
    ReportConfigData.Parameters.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        ReportConfigData.Parameters.paramList[index].parameterValue = date;
      }
    });
    ReportConfigData.Parameters.paramList.forEach((x1, ind) => {
      if (x1.parameterName === type) {
        ReportConfigData.Parameters.paramList[ind].parameterValue = date;
      }
      if (
        ReportConfigData.Parameters.paramList[1].parameterValue <
        ReportConfigData.Parameters.paramList[0].parameterValue
      ) {
        ReportConfigData.Parameters.paramList[1].parameterValue = "";
        swal({
          icon: "error",
          text: "To Date Should be greater than From Date ",
          confirmButtonColor: "#0079CE",
        });
      }
    });
    setFinalReport({ ...ReportConfigData.Parameters });
    setReportConfigData({ ...ReportConfigData });
  };
  const handleAutoComplete = (e, type, value) => {
    ReportConfigData.Parameters.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        if (value !== null) {
          ReportConfigData.Parameters.paramList[index].parameterValue = value.mValue;
          masters.FileNamePush.push(value.mValue);
          if (ReportConfigData.Parameters.ReportConfigId === "440") {
            // Nepal_DOSubDOBusiness_Report
            if (ReportConfigData.Parameters.paramList[index].parameterValue === "23/24") {
              ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-17";
              ReportConfigData.Parameters.paramList[1].parameterValue = "2024-07-15";
            }
            if (ReportConfigData.Parameters.paramList[index].parameterValue === "24/25") {
              ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-16";
              ReportConfigData.Parameters.paramList[1].parameterValue = "2024-07-15";
            }
          }
        } else {
          ReportConfigData.Parameters.paramList[index].parameterValue = "";
          delete masters.FileNamePush.filter((x1, i) => x1 === type && i + 2);
        }
      }
      // masters.FileName = masters.FileNamePush.join("_").concat("_", ReportConfigData.ReportName);
    });

    setReportConfigData({ ...ReportConfigData });
  };
  const handleinputchange = (e, type) => {
    ReportConfigData.Parameters.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        ReportConfigData.Parameters.paramList[index].parameterValue = e.target.value;
        // x.parameterValue = e.target.value;
      }
    });

    setFinalReport({ ...ReportConfigData.Parameters });
  };

  const handleAddCriterial = async (e, type) => {
    if (type === "Remove") {
      flags.Addtionalfileds = false;
      flags.AddtionalfiledsButton = true;

      ReportConfigData.Frequency = "";
      ReportConfigData.FrequencyPeriod = "";
    } else {
      flags.AddtionalfiledsButton = false;
      flags.Addtionalfileds = true;
    }
    setFlags({ ...flags });
  };
  console.log("finalReport", finalReport);
  console.log("ReportConfigData", ReportConfigData);

  console.log("reportParameterList", reportParameterList);
  const handlesetfrequency = async (e, type, value) => {
    console.log("value", value);
    if (type === "Frequency") {
      if (value === null) {
        ReportConfigData.FrequencyPeriod = "";
        ReportConfigData.Frequency = "";

        ReportConfigData.Parameters.paramList[0].parameterValue = DateFormatFromDateObject(
          new Date(),
          "y-m-d"
        );
        ReportConfigData.Parameters.paramList[1].parameterValue = DateFormatFromDateObject(
          new Date(),
          "y-m-d"
        );
      } else {
        ReportConfigData.Frequency = value.mValue;
        ReportConfigData.FrequencyPeriod = "";
      }

      if (ReportConfigData.Frequency === "Yearly") {
        ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-17";
        ReportConfigData.Parameters.paramList[1].parameterValue = "2024-07-15";
      }
    }

    if (type === "FrequencyPeriod") {
      if (value !== null) {
        ReportConfigData.FrequencyPeriod = value.mValue;
        if (ReportConfigData.Frequency === "Monthly") {
          let month = "";
          let year = "";
          const treatyData = await GetTreatyById(25);

          console.log("treatyData", treatyData);

          let startDate = new Date(treatyData.data.startDate);
          let EndDate = new Date(treatyData.data.endDate);
          month = startDate.getMonth() + 1;

          year = startDate.getFullYear();
          ReportConfigData.Parameters.paramList[0].parameterValue = startDate.toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );

          const [daynew, monthnew, yearnew] =
            ReportConfigData.Parameters.paramList[0].parameterValue.split("/");
          ReportConfigData.Parameters.paramList[0].parameterValue = `${yearnew}-${monthnew}-${daynew}`;
          const TodayDate = new Date();

          console.log("TodayDate", TodayDate);

          if (value.shortCode !== 7) {
            if (value.shortCode > month) {
              year = startDate.getFullYear();
              console.log("year1", year);
            } else {
              year = EndDate.getFullYear();
              console.log("year2", year);
            }
          } else {
            year = startDate.getFullYear();
          }

          startDate = new Date(year, value.shortCode - 1, 1);
          EndDate = new Date(year, value.shortCode, 0);

          ReportConfigData.Parameters.paramList[0].parameterValue = startDate.toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );

          let [day1, month1, year1] =
            ReportConfigData.Parameters.paramList[0].parameterValue.split("/");
          ReportConfigData.Parameters.paramList[0].parameterValue = `${year1}-${month1}-${day1}`;

          ReportConfigData.Parameters.paramList[1].parameterValue = EndDate.toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          [day1, month1, year1] =
            ReportConfigData.Parameters.paramList[1].parameterValue.split("/");
          ReportConfigData.Parameters.paramList[1].parameterValue = `${year1}-${month1}-${day1}`;

          if (value.shortCode === "7") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-17";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2023-07-31";
          }

          if (value.shortCode - 1 === TodayDate.getMonth()) {
            console.log("TodayDate.getMonth()", TodayDate.getMonth());
            ReportConfigData.Parameters.paramList[1].parameterValue = TodayDate.toLocaleDateString(
              "en-GB",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            );
            [day1, month1, year1] =
              ReportConfigData.Parameters.paramList[1].parameterValue.split("/");
            ReportConfigData.Parameters.paramList[1].parameterValue = `${year1}-${month1}-${day1}`;
          }
        }
        if (ReportConfigData.Frequency === "Half Yearly") {
          if (value.mValue === "First Half") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-17";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2024-01-14";
          } else {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2024-01-15";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2024-04-15";
          }
        }
        if (ReportConfigData.Frequency === "Quaterly") {
          if (value.mValue === "First Quarter") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2023-07-17";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2023-10-17";
          }
          if (value.mValue === "Second Quarter") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2023-10-18";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2024-01-14";
          }
          if (value.mValue === "Third Quarter") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2024-01-15";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2024-04-12";
          }
          if (value.mValue === "Fourth Quarter") {
            ReportConfigData.Parameters.paramList[0].parameterValue = "2024-04-13";
            ReportConfigData.Parameters.paramList[1].parameterValue = "2024-04-15";
          }
        }

        // if (ReportConfigData.Frequency === "Monthly") {
        //   const treatyData = await GetTreatyById(25);
        //   console.log("treatyData", treatyData);
        //   if (value.mValue !== "July") {
        //     if (value.mID > month) {
        //       year = startDate.getFullYear();
        //       console.log("year1", year);
        //     } else {
        //       year = EndDate.getFullYear();
        //       console.log("year2", year);
        //     }
        //   } else {
        //     year = startDate.getFullYear();
        //   }

        //   console.log("d1", d1);

        //   startDate = new Date(year, value.mID - 1, 1);
        //   EndDate = new Date(year, value.mID, 0);

        //   d1[0].FromDate = startDate.toLocaleDateString("en-GB", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   });

        //   let [day1, month1, year1] = d1[0].FromDate.split("/");
        //   d1[0].FromDate = `${year1}-${month1}-${day1}`;

        //   d1[1].ToDate = EndDate.toLocaleDateString("en-GB", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   });
        //   [day1, month1, year1] = d1[1].ToDate.split("/");
        //   d1[1].ToDate = `${year1}-${month1}-${day1}`;

        //   reportConfigDto.paramList[0].parameterValue = d1[0].FromDate;

        //   reportConfigDto.paramList[1].parameterValue = d1[1].ToDate;

        //   if (value.mID === 7) {
        //     d1[0].FromDate = "2023-07-17";
        //     reportConfigDto.paramList[0].parameterValue = "2023-07-17";
        //   }

        //   setD1([...d1]);
        //   console.log("d2", d1);
        // }
      } else {
        ReportConfigData.FrequencyPeriod = "";
        ReportConfigData.Parameters.paramList[0].parameterValue = DateFormatFromDateObject(
          new Date(),
          "y-m-d"
        );
        ReportConfigData.Parameters.paramList[1].parameterValue = DateFormatFromDateObject(
          new Date(),
          "y-m-d"
        );
      }
    }
    setReportConfigData({ ...ReportConfigData });
  };
  const capitalizeFirstLetter = (str) => {
    let capitalizedKey = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    if (str === "LOB" || str === "COB") {
      capitalizedKey = str;
    }

    return capitalizedKey;
  };

  const getHeaderName = (name) => {
    let hName = name;

    hName = hName.replace("1", "");
    hName = hName.replace("2", "");
    hName = hName.replace("3", "");
    hName = hName.replace("4", "");
    hName = hName.replace("5", "");
    hName = hName.replace("6", "");
    hName = hName.replace("7", "");
    hName = hName.replace("8", "");
    hName = hName.replace("9", "");
    hName = hName.replace("0", "");
    hName = hName.replace("1", "");
    hName = hName.replace("2", "");

    return hName;
  };

  const handleGenerate = async () => {
    if (
      ReportConfigData.Parameters.paramList[1].parameterValue === "" ||
      ReportConfigData.Parameters.paramList[0].parameterValue === "" ||
      ReportConfigData.ReportName === ""
    ) {
      setSaveflag(true);
      // console.log("ReportConfigData", ReportConfigData);
      swal({
        icon: "error",
        text: "Please fill the required fields",
        confirmButtonColor: "#0079CE",
      });
    } else {
      console.log("backdropflag", flags);

      flags.planflag = true;

      setFlags({ ...flags });
      await QueryExecution(ReportConfigData.Parameters).then((x) => {
        console.log("x?.data", x?.data);
        if (x?.data) {
          if (x.data.length !== 0) {
            const Data = x.data;
            // Data.forEach((x1, i) => {
            //   if (x1.Row_id === undefined) {
            //     Data[i].Row_id = i;
            //   }
            // });
            const updatedRows = Data.map((row) => {
              const updatedRow = {};
              Object.keys(row).forEach((key) => {
                const updatedKey = capitalizeFirstLetter(key);

                updatedRow[updatedKey] = row[key];
              });
              return updatedRow;
            });

            const updatedRowsIndex = updatedRows.map((x45, key) => ({ ...x45, id: key }));

            console.log("updatedRowsIndex", updatedRowsIndex);
            updatedRowsIndex.forEach((x43, i) => {
              updatedRowsIndex[i].Row_id = i;
            });
            setRows([...updatedRowsIndex]);

            console.log("1212", updatedRows[0]);
            const columns = Object.keys(updatedRows[0]).map((key) => {
              console.log("key", key);
              let capitalizedKey = key
                .toString()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              console.log("capitalizedKey", capitalizedKey);

              if (capitalizedKey === "lob") {
                capitalizedKey = "LOB";
              }
              if (capitalizedKey === "cob") {
                capitalizedKey = "COB";
              }

              return {
                field: capitalizedKey,
                headerName: getHeaderName(capitalizedKey.toString()),
                minWidth:
                  capitalizedKey === "Policy Number" ||
                  capitalizedKey === "Endorsement Number" ||
                  capitalizedKey === "Customer AcName" ||
                  capitalizedKey === "Txn Description" ||
                  capitalizedKey === "Document No" ||
                  capitalizedKey === "Policy No." ||
                  capitalizedKey === "Document No."
                    ? 400
                    : 220,
                flex: 1,
                headerAlign: "center",
                align: "center",
                hide: capitalizedKey === "Row_id",
              };
            });

            setColumn([...columns]);
            setCSVLinkReport(updatedRows);
            setFinalReportResponse(updatedRowsIndex);
            ReportConfigData.ExportFileNameArray = [];
            if (ReportConfigData.Parameters.ReportConfigId === "472") {
              ReportConfigData.ExportFileNameArray = masters.FileNamePush;
              if (masters.FileNamePush.length !== 0) {
                ReportConfigData.ExportFileName = ReportConfigData.ExportFileNameArray.join(
                  " "
                ).concat(" ", ReportConfigData.ReportName);
              } else {
                ReportConfigData.ExportFileName = ReportConfigData.ReportName;
              }
            } else {
              ReportConfigData.ExportFileName = ReportConfigData.ReportName;
            }
            // ReportConfigData.Parameters.paramList.forEach((detail) => {
            //   const InsuredNameEnglishnew = detail.parameterValue;
            //   ReportConfigData.ExportFileNameArray.push(InsuredNameEnglishnew);
            // });

            // ReportConfigData.ExportFileNameArray.shift();
            // ReportConfigData.ExportFileNameArray.shift();

            // ReportConfigData.ExportFileName =
            //   ReportConfigData.ExportFileName.concat("RI Bordreaux Report.csv");

            // if (ReportConfigData.Parameters.ReportConfigId === "472") {
            //   ReportConfigData.ExportFileName = "RI Bordreaux Report";
            // }
            // if (ReportConfigData.Parameters.ReportConfigId === "499") {
            //   ReportConfigData.ExportFileName = "Accounting Report";
            // }
            setReportConfigData({ ...ReportConfigData });

            flags.planflag = false;
          } else {
            swal({
              text: "Sorry No Data Found",
              icon: "error",
            });
            setColumn([]);
            setRows([]);
            setCSVLinkReport([]);
            setFinalReportResponse([]);
            flags.planflag = false;
          }
        }
      });

      setFlags({ ...flags });
    }
  };
  const handleDateCalanderMinDate = () => {
    let Date = "";
    if (ReportConfigData.Parameters.ReportConfigId === "440") {
      // Nepal_DOSubDOBusiness_Report
      if (ReportConfigData.Parameters.paramList[0].parameterValue === "23/24") {
        Date = "2023-07-17";
      }
      if (ReportConfigData.Parameters.paramList[0].parameterValue === "24/25") {
        Date = "2023-07-16";
      }
    }
    if (ReportConfigData.Parameters.ReportConfigId === "472") {
      // RI Bordereaux Report
      Date = "2024-01-15";
      //
    }
    return Date;
  };
  const handleDateCalanderMaxDate = () => {
    let Date = "";
    if (ReportConfigData.Parameters.ReportConfigId === "440") {
      // Nepal_DOSubDOBusiness_Report
      Date = "2024-07-15";
    }
    if (ReportConfigData.Parameters.ReportConfigId === "472") {
      // RI Bordereaux Report
      //
      if (ReportConfigData.Frequency === "") {
        Date = new Date();
      }
    }

    return Date;
  };

  console.log("column", column);
  console.log("rows", rows);

  // const getRowSpacing = React.useCallback(
  //   (params) => ({
  //     top: params.isFirstVisible ? 0 : 5,
  //     bottom: params.isLastVisible ? 0 : 5,
  //   }),
  //   []
  // );

  // console.log("finalReportResponse", finalReportResponse);

  const columnGroupingModel = [
    {
      groupId: "Basic (A)",
      headerAlign: "center",
      description: "",
      children: [
        {
          groupId: "Period of Insure",
          headerAlign: "center",

          children: [
            { field: "S.No." },
            { field: "Branch" },
            { field: "Policy No." },
            { field: "Document No." },
            { field: "Name Of Insured" },
            { field: "Endorsement Date" },
            { field: "Master Effective" },
            { field: "Master Expiring" },
          ],
        },
        {
          groupId: "U/W",
          headerAlign: "center",
          children: [
            { field: "Fiscal Year" },
            { field: "Sum Insured" },
            { field: "Gross Premium" },
          ],
        },

        {
          groupId: "Nepal Re",
          headerAlign: "center",
          children: [{ field: "Sum Insured1" }, { field: "Premium" }, { field: "Commission" }],
        },

        {
          groupId: "Himalayan Re",
          headerAlign: "center",
          children: [{ field: "Sum Insured2" }, { field: "Premium1" }, { field: "Commission1" }],
        },

        {
          groupId: "Quota",
          headerAlign: "center",
          children: [{ field: "Sum Insured3" }, { field: "Premium2" }, { field: "Commission2" }],
        },
        {
          groupId: "Net Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured4" }, { field: "Premium3" }],
        },

        {
          groupId: "Extra Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured5" }, { field: "Premium4" }],
        },

        {
          groupId: "Surplus",
          headerAlign: "center",
          children: [{ field: "Sum Insured6" }, { field: "Premium5" }, { field: "Commission3" }],
        },

        {
          groupId: "Local Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured7" }, { field: "Premium6" }, { field: "Commission4" }],
        },

        {
          groupId: "International Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured8" }, { field: "Premium7" }, { field: "Commission5" }],
        },

        {
          groupId: "Auto Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured9" }, { field: "Premium8" }, { field: "Commission6" }],
        },

        {
          groupId: "Total",
          headerAlign: "center",
          children: [{ field: "Basic Premium" }, { field: "Basic Commission" }],
        },
      ],
    },
    {
      groupId: "RSMDT (B)",
      headerAlign: "center",
      children: [
        {
          groupId: "Quota",
          headerAlign: "center",
          children: [{ field: "Sum Insured10" }, { field: "Premium9" }, { field: "Commission7" }],
        },
        {
          groupId: "Net Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured11" }, { field: "Premium10" }],
        },
        {
          groupId: "Surplus",
          headerAlign: "center",
          children: [{ field: "Sum Insured12" }, { field: "Premium11" }, { field: "Commission8" }],
        },

        {
          groupId: "Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured13" }, { field: "Premium12" }, { field: "Commission9" }],
        },

        {
          groupId: "Auto Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured14" }, { field: "Premium13" }, { field: "Commission10" }],
        },

        {
          groupId: "Extra Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured15" }, { field: "Premium14" }],
        },

        {
          groupId: "Total",
          headerAlign: "center",
          children: [{ field: "Rsmdt Premium" }, { field: "Rsmdt Comm" }],
        },
      ],
    },

    {
      groupId: "Third Party ©",
      headerAlign: "center",
      children: [
        {
          groupId: "Nepal Re",
          headerAlign: "center",
          children: [{ field: "Sum Insured16" }, { field: "Premium15" }, { field: "Commission11" }],
        },

        {
          groupId: "Himalayan Re",
          headerAlign: "center",
          children: [{ field: "Sum Insured17" }, { field: "Premium16" }, { field: "Commission12" }],
        },
        {
          groupId: "Net Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured18" }, { field: "Premium17" }],
        },
        {
          groupId: "Quota",
          headerAlign: "center",
          children: [{ field: "Sum Insured19" }, { field: "Premium18" }, { field: "Commission13" }],
        },

        {
          groupId: "Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured20" }, { field: "Premium19" }, { field: "Commission14" }],
        },
        {
          groupId: "Auto Facultative",
          headerAlign: "center",
          children: [{ field: "Sum Insured21" }, { field: "Premium20" }, { field: "Commission15" }],
        },

        {
          groupId: "Extra Retention",
          headerAlign: "center",
          children: [{ field: "Sum Insured22" }, { field: "Premium21" }],
        },

        {
          groupId: "Total",
          headerAlign: "center",
          children: [{ field: "Tpl Premium" }, { field: "Tpl Commission" }],
        },
      ],
    },

    {
      groupId: "Grand Total (A+B+C)",
      headerAlign: "center",
      children: [
        {
          groupId: "   ",
          headerAlign: "center",
          children: [{ field: "Total Premium " }, { field: "Total Commission" }],
        },
      ],
    },
  ];
  console.log("columnGroupingModel", columnGroupingModel);

  const downloadExcelFromBase64 = async () => {
    const Dynamicexcel = {
      templateName: "RITemplate.xlsx",
      ReportConfigId: "472",
      paramList: [...ReportConfigData.Parameters.paramList],
    };

    const Base64data = await postRequest(`ExcelUpload/GetExcelReport`, Dynamicexcel);
    console.log("Base64data", Base64data);
    const link = document.createElement("a");

    link.href = `data:text/csv;base64,${Base64data.data.fileUploadResp.fileData}`;
    link.download = "RI Bordereaux Report.csv";
    link.click();
  };

  return (
    <Accordion>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Report Generation
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Report Name" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="ReportName"
            name="Report Name"
            options={reportValue}
            value={{ mValue: ReportConfigData.ReportName }}
            onChange={handleReportNameChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput
                {...params}
                label="Report Name"
                required
                sx={redAsterisk}
                error={Saveflag && ReportConfigData.ReportName === ""}
                helperText={Saveflag && ReportConfigData.ReportName === "" ? errorText : ""}
              />
            )}
          />
        </Grid>
        {flags.filterflag && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {ReportConfigData.flags.GetParameters === "true" ? (
                <MDTypography variant="h6" color="primary">
                  Criteria
                </MDTypography>
              ) : null}

              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                {reportParameterList.map((x, i) => {
                  if (x.dataType === "String" && flags.Addtionalfileds) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        xxl={4}
                        sx={{ mt: 2 }}
                        spacing={2}
                      >
                        <MDInput
                          label={x.rangeType}
                          value={ReportConfigData.Parameters.paramList[i].parameterValue}
                          onChange={(e) => handleinputchange(e, x.parameterName)}
                          disabled={x.parameterName === "FacName"}
                          inputProps={{ readOnly: x.parameterName === "FacName" }}
                        />
                      </Grid>
                    );
                  }
                  if (x.dataType === "Date") {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        xxl={4}
                        sx={{ mt: 2 }}
                        spacing={2}
                      >
                        <MDDatePicker
                          input={{
                            label: x.rangeType,
                            value: ReportConfigData.Parameters.paramList[i].parameterValue,

                            error:
                              Saveflag &&
                              ReportConfigData.Parameters.paramList[i].parameterValue === "",

                            helperText:
                              Saveflag &&
                              ReportConfigData.Parameters.paramList[i].parameterValue === ""
                                ? errorText
                                : "",
                            // disabled: ReportConfigData.FrequencyPeriod !== "",
                          }}
                          // name={x.parameterName}
                          onChange={(e, date) => handleDateChange(e, date, x.parameterName)}
                          value={ReportConfigData.Parameters.paramList[i].parameterValue}
                          disabled={ReportConfigData.Frequency !== ""}
                          options={{
                            dateFormat: "Y-m-d",
                            altFormat: "d/m/Y",
                            altInput: true,
                            minDate: handleDateCalanderMinDate(),
                            // ReportConfigData.Parameters.ReportConfigId === "472"
                            //   ? "2024-01-15"
                            //   : "",
                            maxDate:
                              ReportConfigData.Frequency === ""
                                ? new Date()
                                : handleDateCalanderMaxDate(),
                          }}
                        />
                      </Grid>
                    );
                  }
                  if (x.dataType === "DropDown" && flags.Addtionalfileds) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        xxl={4}
                        sx={{ mt: 2 }}
                        spacing={2}
                      >
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={masters[x.rangeType] || []}
                          getOptionLabel={(option) => option.mValue}
                          value={{
                            mValue: ReportConfigData.Parameters.paramList[i].parameterValue,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          onChange={(e, value) => handleAutoComplete(e, x.parameterName, value)}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              label={x.rangeType}
                              disabled={
                                (ReportConfigData.Parameters.paramList[i].parameterValue ===
                                  "Agriculture" &&
                                  ReportConfigData.Parameters.ReportConfigId === "421") ||
                                (ReportConfigData.Parameters.ReportConfigId === "519" &&
                                  ReportConfigData.Parameters.paramList[i].parameterValue ===
                                    "Property")
                              }
                            />
                          )}
                        />
                      </Grid>
                    );
                  }

                  return null;
                })}
                {flags.Addtionalfileds &&
                  (ReportConfigData.Parameters.ReportConfigId === "472" ||
                    ReportConfigData.Parameters.ReportConfigId === "513") && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ mt: 2 }}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        options={masters.RIReportFrequency || []}
                        value={{ mValue: ReportConfigData.Frequency }}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handlesetfrequency(e, "Frequency", value)}
                        renderInput={(params) => <MDInput {...params} label="Frequency" />}
                      />
                    </Grid>
                  )}
                {ReportConfigData.Frequency !== "" &&
                  ReportConfigData.Frequency !== "Yearly" &&
                  flags.Addtionalfileds &&
                  ReportConfigData.Parameters.ReportConfigId === "472" && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ mt: 2 }}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        options={
                          (ReportConfigData.Frequency === "Monthly" && masters.RIReportMonth) ||
                          (ReportConfigData.Frequency === "Quaterly" && masters.RIReportQuarter) ||
                          (ReportConfigData.Frequency === "Half Yearly" &&
                            masters.RIReportHalfYearly) ||
                          []
                        }
                        value={{ mValue: ReportConfigData.FrequencyPeriod }}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handlesetfrequency(e, "FrequencyPeriod", value)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Frequency Period"
                            sx={redAsterisk}
                            required={ReportConfigData.Frequency !== "Yearly"}
                          />
                        )}
                      />
                    </Grid>
                  )}
              </Grid>
            </Grid>
            {flags.filterflag && (
              <Grid item xs={12} sm={12} md={11.8} lg={11.8} xl={11.8} xxl={11.8}>
                <Stack display="flex" justifyContent="right" direction="row" spacing={2}>
                  {flags.Addtionalfileds === true && process.env.NODE_ENV === "development" && (
                    <MDButton onClick={(e) => handleAddCriterial(e, "Remove")}>
                      Remove Additional Criteria
                    </MDButton>
                  )}
                  {flags.AddtionalfiledsButton === true &&
                    process.env.NODE_ENV === "development" && (
                      <MDButton onClick={(e) => handleAddCriterial(e, "Add")}>
                        Additional Criteria
                      </MDButton>
                    )}
                  <MDButton onClick={handleGenerate}>GENERATE</MDButton>
                </Stack>
              </Grid>
            )}

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={flags.planflag}
            >
              <CircularProgress />
            </Backdrop>
          </>
        )}

        {rows.length > 0 && (
          <>
            <Grid item xs={12} sm={12} md={11.8} lg={11.8} xl={11.8} xxl={11.8}>
              <Stack display="flex" justifyContent="space-between" direction="row">
                <MDTypography variant="h6" color="primary">
                  Report Details
                </MDTypography>
              </Stack>
            </Grid>
            {rows.length > 0 && ReportConfigData.Parameters.ReportConfigId !== "472" ? (
              <Grid item xs={12} sm={12} md={11.8} lg={11.8} xl={11.8} xxl={11.8} sx={{ mt: 0.5 }}>
                <CSVLink data={CSVLinkReport} filename={ReportConfigData.ExportFileName}>
                  <MDButton color="success" variant="contained">
                    <MDBox
                      component="img"
                      src={exportlogo}
                      sx={{ maxHeight: "8rem", spacing: "1rem" }}
                    />
                    &nbsp; Export
                  </MDButton>
                </CSVLink>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={11.8} lg={11.8} xl={11.8} xxl={11.8} sx={{ mt: 0.5 }}>
                <MDButton color="success" variant="contained" onClick={downloadExcelFromBase64}>
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ maxHeight: "8rem", spacing: "1rem" }}
                  />
                  &nbsp; Export
                </MDButton>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={11.8} lg={11.8} xl={11.8} xxl={11.8}>
              <MDBox
                sx={{
                  width: "100%",
                }}
              >
                <MDDataGrid
                  rows={rows}
                  columns={column}
                  getRowId={(row) => row.Row_id}
                  rowsPerPageOptions={[5]}
                  // getEstimatedRowHeight={() => 200}
                  // // getRowHeight={() => "auto"}
                  columnGroupingModel={columnGroupingModel}
                  rowHeight={60}
                  pageSize={5}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  // components={{ Toolbar: CustomToolbar }}
                  //  components={{ Toolbar: GridToolbar }}
                  experimentalFeatures={{
                    columnGrouping: ReportConfigData.Parameters.ReportConfigId === "472",
                  }}

                  // getRowSpacing={getRowSpacing}
                  // sx={{
                  //   [`& .${gridClasses.row}`]: {
                  //     bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
                  //   },
                  // }}
                />
              </MDBox>
            </Grid>
          </>
        )}
      </Grid>
    </Accordion>
  );
}

export default ReportGeneration;
