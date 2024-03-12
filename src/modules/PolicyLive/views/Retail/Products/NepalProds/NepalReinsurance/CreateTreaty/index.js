import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import { Add, Cancel, Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import MDBox from "../../../../../../../../components/MDBox";
import MDInput from "../../../../../../../../components/MDInput";
import MDAutocomplete from "../../../../../../../../components/MDAutocomplete";
import MDTypography from "../../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../../../../components/MDLoader";
import MDButton from "../../../../../../../../components/MDButton";
import {
  GetBranchCode,
  GetBrokers,
  GetMasterDataType,
  GetParticipantNameByCode,
  GetReinsurers,
  GetTreatyById,
  GetyearinRetention,
  ModifyTreaty,
  RIValidations,
  SaveTreatyData,
} from "../data";
import { get, set } from "../../../../../../../../Common/RenderControl/objectPath";

import {
  DateFormatFromDateObject,
  IsAlphaNumSpace,
} from "../../../../../../../../Common/Validations";

function CreateTreaty({ treatyId }) {
  const [dto, setDto] = useState({
    treatyCode: "",
    searchtreatycode: "",
    treatyDescription: "",
    treatyCategoryId: 1,
    treatyTypeId: "",
    treatyYearId: "",
    startDate: "",
    endDate: "",
    treatyBasisId: "",
    treatyBasis: "",
    accountingToId: "",
    currencyId: "",
    borderauxFreqId: "",
    statusId: "",
    remarks: "",
    isActive: "",
    isApproved: "",
    treatyYear: "",
    status: "",
    comment: "",
    roleid: localStorage.getItem("roleId"),
    tblParticipant: [
      {
        reInsurerId: "",
        brokername: "",
        reinsurername: "",
        reInsurerBranchId: "",
        brokerId: "",
        brokerBranchId: "",
        sharePercentage: "",
        brokeragePercentage: "",
        ricommissionPercentage: "",
        bordereauxFreqId: "",
        status: "",
        isActive: "",
      },
    ],
    tblTreatyGroup: [],
    searchTreatyGroup: [],
    groupDeltedList: [],
  });
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({
    treatyCategory: [],
    treatyType: [],
    treatyYear: [],
    treatyBasis: [],
    accountingTo: [],
    borderauxFreq: [],
    businessType: [],
    allocationLogic: [],
    currency: [],
    reinsurerCode: [],
    brokerCode: [],
    reInsurerBranchCode: [],
    brokerBranch: [],
  });
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [noOfParticipants, setNoOfParticipants] = useState(0);

  const handleOpen = (id) => {
    setSelectedIndex(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
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

  const { headingStyle } = styles;

  const idValueMap = {
    treatyType: "treatyTypeId",
    treatyYear: "treatyYearId",
    treatyBasis: "treatyBasisId",
    accountingTo: "accountingToId",
    borderauxFreq: "borderauxFreqId",
    businessType: "businessTypeId",
    allocationLogic: "allocationLogicId",
    currency: "currencyId",
    reinsurerCode: "reinsurerCodeId",
    brokerCode: "brokerCodeId",
    reInsurerBranchCode: "reInsurerBranchId",
    brokerBranch: "brokerBranchId",
    bordereauxFreq: "bordereauxFreqId",
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];

    if (valueParam === "treatyYear") {
      dto.endDate = "";
      dto.startDate = "";
    }
    if (path === "") {
      if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
      else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(dto, path);
      if (a !== null)
        set(dto, path, { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID }, setDto);
      else set(dto, path, { ...dummy, [valueParam]: "", [idParam]: "" }, setDto);
    }
  };

  const onstartDate = (e, d) => {
    dto.startDate = d;
    dto.endDate = "";
    setDto({ ...dto });
    const date = new Date(d);
    const year = date.getFullYear();
    if (year !== dto.treatyYear) {
      dto.startDate = "";
      setDto({ ...dto });
      swal({
        text: "Start Date Year shall be same as selected in Treaty Year Field.",
        icon: "error",
      });
    }

    setDto({ ...dto });
  };

  const onEndDate = (e, d) => {
    setDto((prevState) => ({ ...prevState, endDate: d.toString() }));

    const enddate = new Date(d);
    const startdate1 = new Date(dto.startDate);

    const year = enddate.getFullYear();
    if (year !== dto.treatyYear) {
      setDto((prevState) => ({ ...prevState, endDate: "" }));
      swal({
        text: "End Date Year shall be same as selected in Treaty Year Field.",
        icon: "error",
      });
    }
    if (enddate < startdate1) {
      setDto((prevState) => ({ ...prevState, endDate: "" }));

      swal({
        text: "End Date should not be more than Start Date.",
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
    if (dto.searchtreatycode !== e.target.value) {
      const RI = await RIValidations(e.target.value, "TreatyCode");
      if (RI.data.responseMessage !== null && RI.data.status === 9) {
        setErrorText(RI.data.responseMessage);
        setErrorFlag(true);
        setDto((prevState) => ({ ...prevState, treatyCode: "" }));
      }
    }
  };

  const handleChange = async (e, index) => {
    const newTreatyGroup = dto.tblTreatyGroup.map((x, i) =>
      i === index ? { ...x, [e.target.id]: e.target.value } : { ...x }
    );
    setDto({ ...dto, tblTreatyGroup: [...newTreatyGroup] });
  };
  const handleChangeonblur = async (e, index) => {
    console.log("index", index);
    let newTreatyGroup = dto.tblTreatyGroup.map((x, i) =>
      i === index ? { ...x, [e.target.id]: e.target.value } : { ...x }
    );
    setDto({ ...dto, tblTreatyGroup: [...newTreatyGroup] });
    const arr = dto.tblTreatyGroup;
    arr.forEach((x1, y) => {
      if (x1.treatyGroupName === e.target.value && y !== index && x1.treatyGroupName !== "") {
        newTreatyGroup = dto.tblTreatyGroup.map((k, i) =>
          i === index ? { ...k, [e.target.id]: "" } : { ...k }
        );
        swal({
          text: `Treaty Group  Already Exist`,
          icon: "error",
        });
      }
    });

    // if (dto.searchTreatyGroup[index].treatyGroupName !== e.target.value) {
    const RI = await RIValidations(e.target.value, "GroupName");

    if (RI.data.responseMessage !== null && RI.data.status === 9) {
      swal({
        text: RI.data.responseMessage,
        icon: "error",
      });

      setDto((prevState) => ({ ...prevState, treatyCode: "" }));

      newTreatyGroup = dto.tblTreatyGroup.map((x, i) =>
        i === index ? { ...x, [e.target.id]: "" } : { ...x }
      );
    }
    // }
    setDto({ ...dto, tblTreatyGroup: [...newTreatyGroup] });
  };

  const rows = dto.tblTreatyGroup.map((x, index) => ({ ...x, id: index + 1 }));
  const columns = [
    {
      field: "id",
      headerName: "S No",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "treatyGroupName",
      headerName: "Treaty Group",
      width: 300,

      // disabled: !checkForValue(treatyId),
      // readOnly: !checkForValue(treatyId),
      headerAlign: "center",
      align: "center",

      renderCell: (param) => (
        <MDInput
          id="treatyGroupName"
          onChange={(e) => handleChange(e, param.id - 1)}
          value={param.row.treatyGroupName}
          onBlur={(e) => handleChangeonblur(e, param.id - 1)}
        />
      ),
    },
    {
      field: "businessType",
      headerName: "Business Type",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => (
        <MDAutocomplete
          label="Select"
          value={{ mValue: !checkForValue(param.row.businessType) ? param.row.businessType : "" }}
          options={getMaster("businessType")}
          onChange={(e, a) => assignValueId(a, `tblTreatyGroup.${param.id - 1}`, "businessType")}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 100,
      renderCell: (param) => {
        const handleDelete = () => {
          const newTblTreatyGroup = [
            ...dto.tblTreatyGroup.filter((x, ind) => ind !== param.row.id - 1),
          ];
          setDto((prevState) => ({ ...prevState, tblTreatyGroup: [...newTblTreatyGroup] }));
        };
        return (
          <Stack direction="row" spacing={2}>
            <IconButton color="primary" onClick={() => handleOpen(param.row.id - 1)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const addParticipant = () => {
    setDto((prevState) => ({
      ...prevState,
      tblParticipant: [
        ...prevState.tblParticipant,
        {
          reInsurerId: "",
          brokername: "",
          reinsurername: "",
          reInsurerBranchId: "",
          brokerId: "",
          brokerBranchId: "",
          sharePercentage: "",
          brokeragePercentage: "",
          ricommissionPercentage: "",
          bordereauxFreqId: "",
          status: "",
          isActive: "y",
        },
      ],
    }));

    setNoOfParticipants(noOfParticipants + 1);
  };

  /* eslint-disable */
  const EditToolbar = () => {
    const handleClick = () => {
      setDto((prevState) => ({
        ...prevState,
        tblTreatyGroup: [
          ...prevState.tblTreatyGroup,
          {
            treatyGroupName: "",
            businessTypeId: "",
            isActive: "",
            tblArrangement: [
              {
                allocationOnId: "",
                allocationLogicId: "",
                percentage: "",
                amount: "",
                noOfLines: "",
                higherOrLowerId: "",
                allocationBasisId: "",
                maxCeidingLimit: "",
                pla: "",
                cla: "",
                isActive: "",
              },
            ],
          },
        ],
      }));
    };

    return (
      <MDButton startIcon={<Add />} variant="text" onClick={handleClick}>
        Add Treaty Group
      </MDButton>
    );
  };
  const handleconsole = () => {
    console.log("genericdto", dto);

    console.log("noOfParticipants", noOfParticipants);
  };

  const handleSave = async () => {
    let validationFlag = true;
    let Treatygroupflag = true;
    let Treatypartricipantflag = true;
    let TotalShareflag = true;
    let tblarrangementflag = true;
    let tblpercentageflag = true;
    let tblimitflag = true;
    let tblpercentandlimitflag = true;
    let tbllinesflag = true;

    const saveDto = {
      ...dto,
    };
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(saveDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (dto.tblTreatyGroup.length > 0) {
      dto.tblTreatyGroup.forEach((branch) => {
        if (!branch.treatyGroupName || !branch.businessTypeId) {
          Treatygroupflag = false;
        }
      });

      dto.tblTreatyGroup.forEach((branch) => {
        branch.tblArrangement.forEach((branch2) => {
          if (!branch2.allocationLogicId) {
            tblarrangementflag = false;
          }
        });

        branch.tblArrangement.forEach((Percentage) => {
          if (!Percentage.percentage && Percentage.allocationLogicId === 20) {
            setNextFlg(true);

            tblpercentageflag = false;
          }
        });
        branch.tblArrangement.forEach((amount) => {
          if (!amount.limit && amount.allocationLogicId === 21) {
            setNextFlg(true);

            tblimitflag = false;
          }
        });

        branch.tblArrangement.forEach((percentageamount) => {
          if (percentageamount.allocationLogicId === 22) {
            if (!percentageamount.limit || !percentageamount.percentage) {
              setNextFlg(true);

              tblpercentandlimitflag = false;
            }
          }
        });

        branch.tblArrangement.forEach((noOfLines) => {
          if (!noOfLines.noOfLines && noOfLines.allocationLogicId === 33) {
            setNextFlg(true);

            tbllinesflag = false;
          }
        });
      });
    }

    if (dto.tblParticipant.length > 0) {
      dto.tblParticipant.forEach((branch) => {
        if (!branch.sharePercentage) {
          Treatypartricipantflag = false;
        }
      });
      let totalSharePercentage = 0;
      dto.tblParticipant.forEach((obj) => {
        if (obj.sharePercentage) {
          totalSharePercentage += parseInt(obj.sharePercentage, 10);
        }
      });

      if (totalSharePercentage !== 100) {
        TotalShareflag = false;
      }
    }
    if (validationFlag === false) {
      setNextFlg(true);

      swal({
        text: "Please fill all required fields",
        icon: "error",
      });
    }
    if (dto.tblParticipant.length === 0 || dto.tblTreatyGroup.length === 0) {
      if (dto.tblParticipant.length === 0) {
        setNextFlg(true);
        Treatypartricipantflag = false;
        swal({
          text: "Please Add Atleast one Participant ",
          icon: "error",
        });
      }

      if (dto.tblTreatyGroup.length === 0) {
        setNextFlg(true);
        Treatygroupflag = false;
        swal({
          text: "Please Add Atleast One TreatyGroup",
          icon: "error",
        });
      }
    }
    if (dto.tblParticipant.length !== 0 || dto.tblTreatyGroup.length !== 0) {
      if (Treatygroupflag === false) {
        setNextFlg(true);
        swal({
          text: "TreatyGroup details are incomplete",
          icon: "error",
        });
      }
      if (tblarrangementflag === false) {
        setNextFlg(true);
        swal({
          text: "Please Edit Group details ",
          icon: "error",
        });
      }

      if (tblpercentageflag === false) {
        setNextFlg(true);
        swal({
          text: "Percentage Required in Edit Group Details",
          icon: "error",
        });
      }
      if (tblimitflag === false) {
        setNextFlg(true);
        swal({
          text: "Limit Required in Edit Group Details",
          icon: "error",
        });
      }
      if (tblpercentandlimitflag === false) {
        setNextFlg(true);
        swal({
          text: "Percentage and Limit Required in Edit Group Details",
          icon: "error",
        });
      }
      if (tbllinesflag === false) {
        setNextFlg(true);
        swal({
          text: "No of Lines Required in Edit Group Details",
          icon: "error",
        });
      }

      if (TotalShareflag === false) {
        setNextFlg(true);
        swal({
          text: "Share% should be 100 ",
          icon: "error",
        });
      }

      if (Treatypartricipantflag === false) {
        setNextFlg(true);

        swal({
          text: "Participant details are incomplete",
          icon: "error",
        });
      }
    }

    if (
      validationFlag === true &&
      Treatygroupflag === true &&
      Treatypartricipantflag === true &&
      TotalShareflag === true &&
      tblarrangementflag === true &&
      tblpercentageflag === true &&
      tbllinesflag === true &&
      tblpercentandlimitflag === true &&
      tblimitflag === true
    ) {
      setNextFlg(false);
      setLoading(true);
      if (dto.searchtreatycode === "") {
        dto.TreatyRequest = JSON.stringify(dto);

        const saveDtoTreaty = {
          ...dto,
        };
        console.log("saveDtoTreaty", saveDtoTreaty);

        const response = await SaveTreatyData({ ...saveDtoTreaty, status: "Sent for Approval" });
        setLoading(false);
        const res = response.data;
        if (res !== undefined && res.status <= 3) {
          swal({
            text: res.responseMessage,
            icon: "success",
          });
          setDto({
            treatyCode: "",
            treatyDescription: "",
            treatyCategoryId: 1,
            treatyTypeId: "",
            treatyYearId: "",
            startDate: "",
            endDate: "",
            treatyBasisId: "",
            treatyBasis: "",
            accountingToId: "",
            currencyId: "",
            borderauxFreqId: "",
            statusId: "",
            remarks: "",
            isActive: "",
            isApproved: "",
            treatyYear: "",
            status: "",
            comment: "",
            roleid: localStorage.getItem("roleId"),
            tblParticipant: [
              {
                reInsurerId: "",
                brokername: "",
                reinsurername: "",
                reInsurerBranchId: "",
                brokerId: "",
                brokerBranchId: "",
                sharePercentage: "",
                brokeragePercentage: "",
                ricommissionPercentage: "",
                bordereauxFreqId: "",
                status: "",
                isActive: "",
              },
            ],
            tblTreatyGroup: [],
            groupDeltedList: [],
          });
        } else {
          swal({
            text: "Data Save failed. Please Try Again!",
            icon: "error",
          });
        }
      } else {
        handleUpdate();
      }
    }
  };

  const IsNumericNonZeroandhundred = (number) => {
    // const regex = /^[0-9]*$/;
    // const regex = /^[1-9][0-9]*$/;
    const regex = /^(?:[1-9][0-9]*)?$/;
    if (regex.test(number)) {
      if (number <= 100) {
        return true;
      }
    }

    if (number > 100) {
      return "Percentage should not be more than 100 ";
    }

    return "Allows only number";
  };

  const IsNumericNonZero = (number) => {
    // const regex = /^[0-9]*$/;
    // const regex = /^[1-9][0-9]*$/;
    const regex = /^(?:[1-9][0-9]*)?$/;
    if (regex.test(number)) return true;
    return "Allows only number";
  };

  const handleUpdate = async () => {
    let validationFlag = true;
    dto.TreatyRequest = JSON.stringify(dto);
    const saveDto = {
      ...dto,
    };

    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(saveDto, x2.path);
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
      const response = await ModifyTreaty(treatyId, saveDto);
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
      } else
        swal({
          text: "Data Save failed. Please Try Again!",
          icon: "error",
        });
    }
  };

  const participants = () => {
    const visible = tab === 1 && !checkForValue(dto.treatyType);
    const basePath = `tblParticipant.${noOfParticipants}`;
    return [
      {
        type: "AutoComplete",
        label: "Reinsurer Code",
        path: `${basePath}.reinsurerCode`,
        visible,
        spacing: 4,
        options: getMaster("reinsurerCode"),
        customOnChange: async (e, a) => {
          setLoading(true);
          const branchData = await GetBranchCode(a.mID);
          const participantData = await GetParticipantNameByCode(a.mValue);
          setLoading(false);

          if (participantData.data.length !== 0) {
            const newParticipantData = dto.tblParticipant.map((x, i) =>
              i === noOfParticipants
                ? {
                    ...x,
                    reinsurername:
                      participantData.data && participantData.data[0]
                        ? participantData.data[0].participantName
                        : "",
                    reinsurerCode: a.mValue,
                    reinsurerCodeId: a.mID,
                  }
                : { ...x }
            );

            setDto((prevState) => ({ ...prevState, tblParticipant: [...newParticipantData] }));
          } else {
            swal({
              text: "Participant not found ",
              icon: "error",
            });
          }
          if (branchData.data.length !== 0) {
            setMasters((prevState) => ({
              ...prevState,
              reInsurerBranchCode: branchData.data[0].mdata,
            }));
          } else {
            swal({
              text: "BranchCode not found ",
              icon: "error",
            });
          }
        },
      },
      {
        label: "Reinsurer Name",
        path: `${basePath}.reinsurername`,
        type: "Input",
        visible,
        disabled: true,
        spacing: 4,
      },
      {
        type: "AutoComplete",
        label: "Branch Code",
        path: `${basePath}.reInsurerBranchCode`,
        visible,
        spacing: 4,
        options: getMaster("reInsurerBranchCode"),
        customOnChange: async (e, a) => assignValueId(a, basePath, "reInsurerBranchCode"),
      },
      {
        type: "AutoComplete",
        label: "Broker Code",
        path: `${basePath}.brokerCode`,
        visible,
        spacing: 4,
        options: getMaster("brokerCode"),
        customOnChange: async (e, a) => {
          setLoading(true);
          const branchData = await GetBranchCode(a.mID);
          const participantData = await GetParticipantNameByCode(a.mValue);
          setLoading(false);

          if (participantData.data.length !== 0) {
            const newParticipantData = dto.tblParticipant.map((x, i) =>
              i === noOfParticipants
                ? {
                    ...x,
                    brokername:
                      participantData.data && participantData.data[0]
                        ? participantData.data[0].participantName
                        : "",
                    brokerCode: a.mValue,
                    brokerCodeId: a.mID,
                  }
                : { ...x }
            );

            setDto((prevState) => ({ ...prevState, tblParticipant: [...newParticipantData] }));
          } else {
            swal({
              text: "Participant not found ",
              icon: "error",
            });
          }

          if (branchData.data.length !== 0) {
            setMasters((prevState) => ({ ...prevState, brokerBranch: branchData.data[0].mdata }));
          } else {
            swal({
              text: "BranchCode not found ",
              icon: "error",
            });
          }
        },
      },
      {
        label: "Broker Name",
        path: `${basePath}.brokername`,
        type: "Input",
        visible,
        disabled: true,
        spacing: 4,
      },
      {
        type: "AutoComplete",
        label: "Branch Code",
        path: `${basePath}.brokerBranch`,
        visible,
        spacing: 4,
        options: getMaster("brokerBranch"),
        customOnChange: async (e, a) => assignValueId(a, basePath, "brokerBranch"),
      },
      {
        label: "Share (%)",
        path: `${basePath}.sharePercentage`,
        type: "Input",
        visible,

        onBlurFuncs: [IsNumericNonZeroandhundred],
        spacing: 4,
      },
      {
        label: "RI Commision (%)",
        path: `${basePath}.ricommissionPercentage`,
        type: "Input",

        onBlurFuncs: [IsNumericNonZeroandhundred],
        visible,
        spacing: 4,
      },
      {
        type: "AutoComplete",
        label: "Bordeareaux Frequency",
        path: `${basePath}.bordereauxFreq`,
        visible,
        spacing: 4,
        options: getMaster("borderauxFreq"),
        customOnChange: async (e, a) => assignValueId(a, basePath, "bordereauxFreq"),
      },

      {
        type: "Custom",
        visible: true,
        spacing: 12,
        return: <MDBox sx={{ height: "1rem" }} />,
      },
      {
        type: "Button",
        label: "Add Participant",
        spacing: 12,
        visible: true,
        justifyContent: "center",
        onClick: addParticipant,
      },
    ];
  };

  const participantColumnMap = {
    "Reinsurer Code": "reinsurerCode",
    "Reinsurer Name": "reinsurername",
    "RI Branch Code": "reInsurerBranchCode",
    "Broker Code": "brokerCode",
    "Broker Name": "brokername",
    "Broker Branch Code": "brokerBranch",
    "Share (%)": "sharePercentage",
    "RI Commision(%)": "ricommissionPercentage",
    "Bordereaux Freq": "bordereauxFreq",
  };

  const participantColumns = [
    {
      field: "id",
      headerName: "S No",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    ...Object.keys(participantColumnMap).map((x) => ({
      field: participantColumnMap[x],
      headerName: x,
      width: 200,
      headerAlign: "center",
      align: "center",
    })),
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 100,
      hide: dto.tblParticipant.length === 1,
      renderCell: (param) => {
        const handleDelete = () => {
          const newTblParticipant = [
            ...dto.tblParticipant.filter((x, ind) => ind !== param.row.id - 1),
          ];
          setNoOfParticipants(noOfParticipants - 1);
          setDto((prevState) => ({ ...prevState, tblParticipant: [...newTblParticipant] }));
        };
        return (
          <IconButton color="error" onClick={handleDelete}>
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const basePath = `tblTreatyGroup.${selectedIndex}`;
  const arrangements = [
    {
      type: "Typography",
      spacing: 12,
      visible: true,
      label: "Arrangements",
      sx: { ...headingStyle, justifyContent: "center" },
    },
    { type: "Typography", spacing: 2, visible: true, label: "Treaty Group:" },
    {
      type: "TypographyVal",
      spacing: 10,
      visible: true,
      color: "primary",
      value: get(dto, `${basePath}.treatyGroupName`),
    },
    {
      type: "AutoComplete",
      label: "Allocation Logic",
      path: `${basePath}.tblArrangement.0.allocationLogic`,
      visible: true,
      spacing: 3,
      required: true,
      options:
        dto.treatyTypeId === 4
          ? getMaster("allocationLogic").filter((x) => x.mValue !== "Lines")
          : getMaster("allocationLogic").filter((x) => x.mValue === "Lines"),
      customOnChange: (e, a) => assignValueId(a, `${basePath}.tblArrangement.0`, "allocationLogic"),
    },
    {
      type: "Input",
      label: "Percentage",
      path: `${basePath}.tblArrangement.0.percentage`,
      onBlurFuncs: [IsNumericNonZeroandhundred],
      visible:
        (dto.treatyTypeId === 4 &&
          get(dto, `${basePath}.tblArrangement.0.allocationLogic`) === "Percentage") ||
        get(dto, `${basePath}.tblArrangement.0.allocationLogic`) === "Percentage with Limit",
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Limit",
      path: `${basePath}.tblArrangement.0.limit`,
      onBlurFuncs: [IsNumericNonZero],
      visible:
        (dto.treatyTypeId === 4 &&
          get(dto, `${basePath}.tblArrangement.0.allocationLogic`) === "Limit") ||
        get(dto, `${basePath}.tblArrangement.0.allocationLogic`) === "Percentage with Limit",
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "No of Lines",
      onBlurFuncs: [IsNumericNonZero],
      path: `${basePath}.tblArrangement.0.noOfLines`,
      visible: dto.treatyTypeId === 5,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Priliminary Loss Advice",
      path: `${basePath}.tblArrangement.0.pla`,
      visible: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Claim Loss Advice",
      path: `${basePath}.tblArrangement.0.cla`,
      visible: true,
      spacing: 3,
    },
  ];
  const renderItems = [
    {
      type: "Button",
      label: "console",
      spacing: 12,
      visible: true,
      justifyContent: "left",
      onClick: handleconsole,
    },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      path: "treatyCategoryId",
      justifyContent: "left",
      radioLabel: { labelVisible: true, label: "Treaty Category" },
      radioList: [
        { label: "Proportional", value: 1 },
        { label: "Non Proportional", value: 2, disabled: true },
        // { label: "Both", value: 3, disabled: true },
      ],
    },
    {
      label: "Treaty Code",
      path: "treatyCode",
      type: "Input",
      required: true,
      visible: true,

      // disabled: !checkForValue(treatyId),
      // readOnly: !checkForValue(treatyId),
      spacing: 3,
      onChangeFuncs: [IsAlphaNumSpace],
      customOnChange: (e, a, setErrorFlag, setErrorText) => {
        setDto((prevState) => ({
          ...prevState,
          treatyCode: e.target.value,
          treatyType: "",
          treatyTypeId: "",
        }));
        setErrorFlag(false);
        setErrorText("");
      },
      customOnBlur: validateCode,
    },
    {
      label: "Treaty Description",
      path: "treatyDescription",
      onChangeFuncs: [IsAlphaNumSpace],
      type: "Input",
      required: true,
      visible: true,
      spacing: 3,
    },
    {
      type: "AutoComplete",
      label: "Treaty Type",
      path: "treatyType",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("treatyType"),
      customOnChange: (e, a) => assignValueId(a, "", "treatyType"),
    },
    {
      type: "AutoComplete",
      label: "Treaty Year",
      path: "treatyYear",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("treatyYear"),
      customOnChange: (e, a) => assignValueId(a, "", "treatyYear"),
    },
    {
      type: "MDDatePicker",
      label: "Start Date",
      path: "startDate",
      required: true,
      visible: dto.treatyYear !== "",
      spacing: 3,
      customOnChange: (e, d) => onstartDate(e, d),
    },
    {
      type: "MDDatePicker",
      label: "End Date",
      path: "endDate",
      required: true,
      visible: dto.treatyYear !== "",
      spacing: 3,
      customOnChange: (e, d) => onEndDate(e, d),
    },
    {
      type: "AutoComplete",
      label: "Treaty Basis",
      path: "treatyBasis",
      visible: true,
      required: true,
      spacing: 3,
      options: getMaster("treatyBasis"),
      customOnChange: (e, a) => assignValueId(a, "", "treatyBasis"),
    },
    {
      type: "AutoComplete",
      label: "Accounting To",
      path: "accountingTo",
      required: true,
      visible: true,
      spacing: 3,
      options: getMaster("accountingTo"),
      customOnChange: (e, a) => assignValueId(a, "", "accountingTo"),
    },
    {
      type: "AutoComplete",
      label: "Currency",
      path: "currency",
      visible: true,
      required: true,
      spacing: 3,
      options: getMaster("currency"),
      //   customOnChange: (e, a) => assignValueId(a, "", "currency"),
    },

    {
      type: "AutoComplete",
      label: "Bordereaux Frequency",
      path: "borderauxFreq",
      visible: true,
      required: true,
      spacing: 3,
      options: getMaster("borderauxFreq"),
      customOnChange: (e, a) => assignValueId(a, "", "borderauxFreq"),
    },
    {
      type: "Input",
      label: "Comments",
      path: "comment",
      visible: true,
      spacing: 3,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: <MDBox sx={{ height: "1rem" }} />,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 1,
      return: <MDBox sx={{ width: "100%" }} />,
    },
    {
      type: "Tabs",
      value: tab,
      visible: !checkForValue(dto.treatyType),
      customOnChange: (e, newValue) => setTab(newValue),
      tabs: [
        {
          value: 0,
          label: "Add Treaty Group",
        },
        {
          value: 1,
          label: "Add Treaty Participant",
        },
      ],
      spacing: 10,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 1,
      return: <MDBox sx={{ width: "100%" }} />,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 1,
      return: <MDBox sx={{ width: "100%" }} />,
    },
    {
      type: "Custom",
      spacing: 10,
      visible: tab === 0 && !checkForValue(dto.treatyType),
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.id}
            disableSelectionOnClick={true}
            components={{ Toolbar: EditToolbar }}
          />
        </MDBox>
      ),
    },
    {
      type: "Custom",
      spacing: 10,
      visible: tab === 1 && !checkForValue(dto.treatyType),
      return: (
        <Grid container spacing={2} sx={{ pt: "1rem" }}>
          {participants().map(
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
                  <NewRenderControl item={item} dto={dto} setDto={setDto} nextFlag={nextFlg} />
                </Grid>
              )
          )}
        </Grid>
      ),
    },
    {
      type: "Custom",
      visible: true,
      spacing: 1,
      return: <MDBox sx={{ width: "100%" }} />,
    },
    {
      type: "Typography",
      visible: !checkForValue(dto.treatyType),
      spacing: 12,
      label: "Treaty Participants",
    },
    {
      type: "Custom",
      spacing: 12,
      visible: !checkForValue(dto.treatyType),
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={dto.tblParticipant.map((x, ind) => ({ ...x, id: ind + 1 }))}
            columns={participantColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.id}
            disableSelectionOnClick={true}
          />
        </MDBox>
      ),
    },

    {
      type: "Custom",
      spacing: 12,
      visible: open,
      return: (
        <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
          <MDBox
            sx={{
              position: "absolute",
              top: "40%",
              left: "40%",
              width: "70%",
              transform: "translate(-30%, -30%)",
              overflow: "scroll",
              bgcolor: "background.paper",

              height: "100%",

              display: "block",
            }}
          >
            <Grid ml={2} mr={2}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <IconButton onClick={handleClose} color="primary">
                  <Cancel fontSize="large" />
                </IconButton>
              </Stack>
              <Grid container spacing={2} sx={{ pt: "1rem" }}>
                {arrangements.map(
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
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </MDBox>
        </Modal>
      ),
    },
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: <MDBox sx={{ height: "1rem" }} />,
    },

    {
      type: "Button",
      label: "Save",
      spacing: 6,
      visible: checkForValue(treatyId),
      justifyContent: "right",
      onClick: handleSave,
    },
    {
      type: "Button",
      label: "Save and submit for approval",
      spacing: 6,
      visible: checkForValue(treatyId),
      justifyContent: "left",
      onClick: handleSave,
    },

    {
      type: "Button",
      label: "Update",
      spacing: 12,
      visible: !checkForValue(treatyId),
      justifyContent: "center",
      onClick: handleSave,
    },
  ];
  /* eslint-enable */

  const filterMasterMType = (master, mType) => {
    if (master.filter((x) => x.mType === mType)[0]) {
      return [...master.filter((x) => x.mType === mType)[0].mdata];
    }
    return [];
  };

  useEffect(async () => {
    const mst = { ...masters };
    setLoading(true);
    const res = await GetMasterDataType();
    const yearData = await GetyearinRetention();
    const brokerData = await GetBrokers();
    const reinsurerData = await GetReinsurers();
    setLoading(false);
    if (yearData.data) {
      if (localStorage.getItem("userName") === "upasana@gmail.com") {
        yearData.data[0].mdata.shift();
        yearData.data[0].mdata.shift();
        mst.treatyYear = yearData.data[0].mdata;
      } else {
        mst.treatyYear = yearData.data[0].mdata;
      }
    }
    if (brokerData.data) {
      mst.brokerCode = brokerData.data[0]?.mdata;
    }
    if (reinsurerData.data) {
      mst.reinsurerCode = reinsurerData.data[0]?.mdata;
    }

    const mTypeMap = {
      treatyType: "TreatyType",
      treatyCategory: "TreatyCategory",
      treatyBasis: "TreatyBasis",
      accountingTo: "TreatyAccountingTo",
      borderauxFreq: "Bordereaux Frequency",
      businessType: "BusinessType",
      allocationLogic: "AllocationLogic",
      currency: "Currency",
    };
    Object.keys(mTypeMap).forEach((x) => {
      mst[x] = filterMasterMType(res.data, mTypeMap[x]);
    });

    if (!checkForValue(treatyId)) {
      setLoading(true);

      const treatyData = await GetTreatyById(treatyId);

      const TreatyStringData = JSON.parse(treatyData.data.treatyRequest);
      console.log("GetTreatyById", treatyData);

      console.log("TreatyStringData", TreatyStringData);

      setDto({
        ...TreatyStringData,
        searchtreatycode: TreatyStringData.treatyCode,
        searchTreatyGroup: TreatyStringData.tblTreatyGroup,
        startDate: DateFormatFromDateObject(new Date(treatyData.data.startDate), "m-d-y"),
        endDate: DateFormatFromDateObject(new Date(treatyData.data.endDate), "m-d-y"),
        treatyYear: !checkForValue(treatyData.data.treatyYearId)
          ? getAutocompleteValue(mst.treatyYear, treatyData.data.treatyYearId).mValue
          : "",

        treatyType: !checkForValue(treatyData.data.treatyTypeId)
          ? getAutocompleteValue(mst.treatyType, treatyData.data.treatyTypeId).mValue
          : "",
        treatyBasis: !checkForValue(treatyData.data.treatyBasisId)
          ? getAutocompleteValue(mst.treatyBasis, treatyData.data.treatyBasisId).mValue
          : "",

        accountingTo: !checkForValue(treatyData.data.accountingToId)
          ? getAutocompleteValue(mst.accountingTo, treatyData.data.accountingToId).mValue
          : "",

        currency: !checkForValue(treatyData.data.currencyId)
          ? getAutocompleteValue(mst.currency, treatyData.data.currencyId).mValue
          : "",

        borderauxFreq: !checkForValue(treatyData.data.borderauxFreqId)
          ? getAutocompleteValue(mst.borderauxFreq, treatyData.data.borderauxFreqId).mValue
          : "",
      });
      setLoading(false);
    }

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem", boxShadow: !checkForValue(treatyId) && "unset" }}>
        <MDTypography sx={headingStyle}>
          {checkForValue(treatyId) ? "Create" : "Modify"} Treaty
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
                    <NewRenderControl item={item} dto={dto} setDto={setDto} nextFlag={nextFlg} />
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default CreateTreaty;
