import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import swal from "sweetalert";
import { Cancel, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../../components/MDTypography";
import MDInput from "../../../../../../../../components/MDInput";
import NewRenderControl from "../../../../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../../../../components/MDLoader";
import {
  // IsMobileNumber,
  IsAlphaNumSpace,
  IsFreetextNoSpace,
  // IsEmail,
  // IsNumeric,
  // IsNumaricSpecial,
} from "../../../../../../../../Common/Validations";

import { IsAlphaNumNoSpace, IsAlphaNoSpace } from "../../data/APIs/MotorCycleApi";

import {
  GetLocationdata,
  GetParticipantinSearch,
  RIValidations,
  SaveParticipentData,
  UpDatePartyInSearch,
  // SearchParticipantMethod,
  DeleteBranchDetails,
} from "../data";

import { get } from "../../../../../../../../Common/RenderControl/objectPath";

const delArr = [];
// let openmodel;
function Branches({ dto, setDto, styles, BranchCodeD, setOpen }) {
  const { headingStyle } = styles;

  // const [del, setDel] = useState(false);
  const [branchDet, setBranchDet] = useState(true);
  const [rows, setRows] = useState(
    dto.tblParticipantBranch
      ? dto.tblParticipantBranch.map((x, index) => ({ ...x, id: index + 1 }))
      : []
  );
  const IsEmail = (email) => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i;
    if (email.length !== 0) {
      if (emailRegex.test(email)) return true;
      return "Not a valid Email";
    }
    return false;
  };

  const handleBlur = async (e, i) => {
    setBranchDet(false);
    if (e.target.name === "branchSpocemailId") {
      if (IsEmail(e.target.value) === true) {
        rows[i - 1][e.target.name] = e.target.value;
      } else {
        rows[i - 1][e.target.name] = "";

        swal({
          text: "Not a valid Email",
          icon: "error",
        });
      }
    }
    // const checkForValue = (value) => value === "" || value === undefined || value === null;
    // const checkparticipantId = !checkForValue(participantId);
    const arr = rows;
    if (e.target.name === "branchCode") {
      arr.forEach((x, y) => {
        if (x.branchCode === e.target.value && y !== i - 1 && x.branchCode !== "") {
          rows[i - 1][e.target.name] = "";

          swal({
            text: `Branch Code Already Exist`,
            icon: "error",
          });
        }
      });
      if (e.target.value !== BranchCodeD[i - 1]) {
        const RI = await RIValidations(e.target.value, "ParticipantBranchCode");

        if (RI.data.responseMessage !== null && RI.data.status === 9) {
          rows[i - 1][e.target.name] = "";
          swal({
            text: RI.data.responseMessage,
            icon: "error",
          });
        }
      }
    }
    // const arr = rows;
    // console.log(BranchCodeD);
    // const enteredBranchCode =
    //   e.target.name === "branchCode" ? e.target.value : rows[i - 1].branchCode;
    // const enteredBranchName =
    //   e.target.name === "branchName" ? e.target.value : rows[i - 1].branchName;

    // if (
    //   arr.some(
    //     (obj) =>
    //       obj.branchCode === enteredBranchCode &&
    //       obj.branchName === enteredBranchName &&
    //       obj.branchId !== rows[i - 1].branchId
    //   )
    // ) {
    //   swal({
    //     text: "Branch Code and Branch Name already exist",
    //     icon: "error",
    //   });
    //   rows[i - 1].branchCode = "";
    //   rows[i - 1].branchName = "";
    //   console.log(rows);
    //   return;
    // }

    setRows([...rows]);
  };
  // const [Saveflag, setSaveflag] = useState(false);
  // const [textflag, setTextflag] = useState(false);
  // const helperText = "This field is Required";

  const handleChange = async (e, i) => {
    setBranchDet(false);
    if (e.target.name === "branchCode") {
      if (IsAlphaNumSpace(e.target.value) === true) {
        rows[i - 1][e.target.name] = e.target.value;

        if (e.target.value.length > 12) {
          rows[i - 1][e.target.name] = "";
          // setTextflag(false);
          swal({
            text: "Branch Code should not be more than 10 Charcters",
            icon: "error",
          });
        }
        //  else {
        //   setTextflag(true);
        // }
      } else {
        rows[i - 1][e.target.name] = "";

        swal({
          text: "Enter only alphabets numbers and Space",
          icon: "error",
        });
        // setSaveflag(true);
      }

      setRows([...rows]);
    }

    if (e.target.name === "branchName") {
      if (IsAlphaNumSpace(e.target.value) === true) {
        rows[i - 1][e.target.name] = e.target.value;
        if (e.target.value.length > 30) {
          rows[i - 1][e.target.name] = "";
          // setTextflag(false);
          swal({
            text: "Branch Name should not be more than 30 Charcters",
            icon: "error",
          });
        }
      } else {
        rows[i - 1][e.target.name] = "";

        swal({
          text: "Enter only alphabets and Space",
          icon: "error",
        });
      }

      setRows([...rows]);
    }

    if (e.target.name === "branchSpocemailId") {
      rows[i - 1][e.target.name] = e.target.value;

      setRows([...rows]);
    }
  };

  const addBranch = () => {
    setBranchDet(false);
    const newBranch = {
      id: rows.length + 1,
      branchCode: "",
      branchName: "",
      branchSpocemailId: "",
      flag: false,
      emailflag: false,
    };
    setRows([...rows, newBranch]);
  };

  const onSave = () => {
    let hasChanges = false;
    rows.forEach((branch) => {
      console.log(rows, dto.tblParticipantBranch);
      const match = dto.tblParticipantBranch.find(
        (item) =>
          item.branchSpocemailId === branch.branchSpocemailId &&
          item.branchName === branch.branchName &&
          item.branchCode === branch.branchCode
      );
      if (!match) {
        hasChanges = true;
      }
    });
    const hasIncompleteBranch = rows.some(
      (branch) => !branch.branchCode || !branch.branchName || !branch.branchSpocemailId
    );

    if (rows.length === 0) {
      swal({
        text: "Please Add Atleast One Branch",
        icon: "error",
      });
    } else if (hasIncompleteBranch) {
      swal({
        text: "Branch details are incomplete",
        icon: "error",
      });
    } else if (hasChanges) {
      swal({
        text: "Branch details saved successfully",
        icon: "success",
      });
      setOpen(false);
    } else {
      setOpen(false);
    }

    setDto((prevState) => ({ ...prevState, tblParticipantBranch: [...rows] }));
  };

  // const onSave = () => {
  //   let isSame = true;

  //   rows.forEach((branch) => {
  //     const match = dto.tblParticipantBranch.find((item) => {
  //       if (
  //         branch.branchCode &&
  //         branch.branchName &&
  //         branch.branchSpocemailId &&
  //         item.branchCode &&
  //         item.branchName &&
  //         item.branchSpocemailId
  //       ) {
  //         return (
  //           item.branchSpocemailId === branch.branchSpocemailId &&
  //           item.branchName === branch.branchName &&
  //           item.branchCode === branch.branchCode
  //         );
  //       }
  //       return false;
  //     });
  //     if (!match) {
  //       isSame = false;
  //     }
  //   });

  //   console.log(dto.tblParticipantBranch, rows);
  //   if (rows.length === 0) {
  //     swal({
  //       text: "Please Add Atleast One Branch",
  //       icon: "error",
  //     });
  //   } else {
  //     console.log("111", rows);

  //     rows.forEach((branch) => {
  //       if (!isSame) {
  //         swal({
  //           text: "Branch details saved successfully",
  //           icon: "success",
  //         });
  //         setOpen(false);
  //       }
  //       if (isSame) {
  //         setOpen(false);
  //       }
  //       if (!branch.branchCode || !branch.branchName || !branch.branchSpocemailId) {
  //         swal({
  //           text: "Branch details are incomplete",
  //           icon: "error",
  //         });
  //         setOpen(true);
  //       }
  //     });
  //   }

  //   setDto((prevState) => ({ ...prevState, tblParticipantBranch: [...rows] }));
  // };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 50,
      hidden: true,
    },
    {
      field: "branchCode",
      headerName: "Branch Code",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      // required: true,
      // editable: ,
      renderCell: (p) => (
        <div>
          <MDInput
            name="branchCode"
            onChange={(e) => handleChange(e, p.row.id)}
            value={rows[p.row.id - 1].branchCode}
            onBlur={(e) => handleBlur(e, p.row.id)}
            // error={Saveflag && rows[p.row.id - 1].branchCode === ""}
            // helperText={Saveflag && rows[p.row.id - 1].branchCode === "" ? helperText : ""}
            // style={{ borderColor: rows[p.row.id - 1].branchCode === "" ? "red" : "" }}
          />
        </div>
      ),
    },
    {
      field: "branchName",
      headerName: "Branch Name",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      maxLength: 10,
      renderCell: (p) => (
        <div>
          <MDInput
            name="branchName"
            InputProps={{ maxLength: 10 }}
            onChange={(e) => handleChange(e, p.row.id)}
            value={rows[p.row.id - 1].branchName}
            // onBlur={(e) => handleBlur(e, p.row.id)}
            // error={Saveflag && rows[p.row.id - 1].branchName === ""}
            // helperText={Saveflag && rows[p.row.id - 1].branchName === "" ? helperText : ""}
          />
        </div>
      ),
    },
    {
      field: "branchSpocemailId",
      headerName: "Email Details",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,

      renderCell: (p) => (
        <div>
          <MDInput
            name="branchSpocemailId"
            onChange={(e) => handleChange(e, p.row.id)}
            value={rows[p.row.id - 1].branchSpocemailId}
            onBlur={(e) => handleBlur(e, p.row.id)}
            // error={Saveflag && rows[p.row.id - 1].branchSpocemailId === ""}
            // helperText={Saveflag && rows[p.row.id - 1].branchSpocemailId === "" ? helperText : ""}
          />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,
      renderCell: (p) => {
        const deleteRow = async () => {
          setBranchDet(false);
          // setDel(true);
          if (p.row.branchId !== undefined) {
            delArr.push(p.row.branchId);
          }
          const newArray = rows.filter((x) => x.id !== p.row.id);

          newArray.forEach((x, i) => {
            newArray[i].id = i + 1;
          });

          setRows([...newArray]);

          setDto((prevState) => ({ ...prevState, tblParticipantBranch: [...rows] }));
        };

        return <Delete color="error" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

  const renderItems = [
    { type: "Typography", visible: true, spacing: 9, sx: headingStyle, label: "Branch Details" },
    {
      type: "Button",
      visible: true,
      spacing: 3,
      label: "Add Branch",
      startIcon: "add",
      onClick: addBranch,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: (
        <MDBox
          sx={{
            mt: 3,
            ml: 10,
            width: "90%",
          }}
        >
          <DataGrid
            rowHeight={70}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.id}
          />
        </MDBox>
      ),
    },
    {
      type: "Button",
      visible: true,
      spacing: 12,
      label: "Save",
      justifyContent: "center",
      disabled: branchDet,
      onClick: onSave,
    },
  ];
  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {renderItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={item.spacing ? item.spacing : 3}
            lg={item.spacing ? item.spacing : 3}
            xl={item.spacing ? item.spacing : 3}
            xxl={item.spacing ? item.spacing : 3}
          >
            {item.visible === true && <NewRenderControl item={item} dto={dto} setDto={setDto} />}
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

function ParticipantMaster({ participantId, setOpen1 }) {
  const [dto, setDto] = useState({
    participantTypeId: "8",
    participantCode: "",
    participantName: "",
    contactNo: "",
    address1: "",
    address2: "",
    address3: "",
    stateId: "",
    countryId: "",
    districtId: "",
    cityId: "",
    pincode: "",
    isActive: "",
    tblParticipantBranch: [],
    ParticipantSearchname: "",
  });
  const [searchdto, setSearchdto] = useState({
    participantTypeId: "8",
    participantCode: "",
    participantName: "",
    participantType: "",
  });

  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [BranchCodeD, setBranchCodeD] = useState([]);
  const [nextCount, setNextCount] = useState(0);

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

  const handleOpen = () => {
    // swal({
    //   text: "Do you want to edit Branches/Offices ?",
    //   buttons: {
    //     buttonOne: {
    //       text: "No",
    //       value: "cancel",
    //       visible: true,
    //     },
    //     buttonTwo: {
    //       text: "Yes",
    //       value: "Confirm",
    //       visible: true,
    //     },
    //   },
    // }).then((value) => {
    //   if (value === "Confirm") {
    // openmodel = true;
    setOpen(true);
    //     }
    //   });
  };

  const handleClose = () => {
    setOpen(false);
    // openmodel = null;
  };

  const idValueMap = {
    country: "countryId",
    state: "stateId",
    district: "districtId",
    city: "cityId",
    pincode: "pincodeId",
  };

  const getMaster = (name) => masters[name];
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const locationMasters = async (masterType, newValue) => {
    const order = ["Country", "State", "District", "City", "Pincode"];
    const keyOrder = ["country", "state", "district", "city", "pincode"];
    const ind = keyOrder.indexOf(masterType);
    const newAddress = { ...dto };
    keyOrder.forEach((x, index) => {
      if (index > ind) {
        setMasters((prevState) => ({ ...prevState, [x]: [] }));
        newAddress[x] = "";
        newAddress[idValueMap[x]] = "";
      }
    });

    if (newValue) {
      newAddress[masterType] = newValue.mValue;
      newAddress[idValueMap[masterType]] = newValue.mID;
      if (masterType !== "pincode") {
        setLoading(true);
        await GetLocationdata(order[ind + 1], newValue.mID).then((res) => {
          setLoading(false);
          if (!checkForValue(res.data))
            setMasters((prevState) => ({ ...prevState, [keyOrder[ind + 1]]: res.data }));
        });
      }
    } else {
      newAddress[masterType] = "";
      newAddress[idValueMap[masterType]] = "";
    }
    setDto((prevState) => ({ ...prevState, ...newAddress }));
  };

  const validateCode = async (e, a, setErrorFlag, setErrorText) => {
    if (dto.ParticipantSearchname !== e.target.value) {
      const RI = await RIValidations(e.target.value, "ParticipantCode");
      if (RI.data.responseMessage !== null && RI.data.status === 9) {
        // setErrorText(RI.data.responseMessage);
        // setErrorFlag(true);
        swal({
          text: `${RI.data.responseMessage}`,
          icon: "error",
        });
        setDto((prevState) => ({ ...prevState, participantCode: "" }));
      }
    }
    setErrorText("");
    setErrorFlag(false);
  };

  const OnFinancingDetails = (e) => {
    setNextCount((prev) => prev + 1);
    setNextFlg(false);
    if (e !== null) {
      dto.participantTypeId = e.target.value;
      searchdto.participantTypeId = e.target.value;
    } else {
      dto.participantTypeId = "";
      searchdto.participantTypeId = "";
    }
    dto.participantCode = "";
    dto.participantName = "";
    dto.contactNo = "";
    dto.address1 = "";
    dto.address2 = "";
    dto.address3 = "";
    dto.state = "";
    dto.country = "";
    dto.district = "";
    dto.city = "";
    dto.pincode = "";
    dto.isActive = "";
    dto.tblParticipantBranch = [];
    dto.ParticipantSearchname = "";
    setSearchdto({ ...searchdto });
    setDto({ ...dto });
  };

  /* eslint-disable */
  const handleSave = async () => {
    // setOpen(true);
    setNextCount(nextCount + 1);
    let validationFlag = true;
    let branchnewflag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (dto.tblParticipantBranch.length > 0) {
      dto.tblParticipantBranch.forEach((branch) => {
        if (!branch.branchCode || !branch.branchName || !branch.branchSpocemailId) {
          branchnewflag = false;
          validationFlag = false;
        }
      });
    }

    if (validationFlag === false || dto.tblParticipantBranch.length === 0) {
      setNextFlg(true);

      if (dto.tblParticipantBranch.length === 0) {
        swal({
          text: "Please Add Atleast One Branch",
          icon: "error",
        });
      }

      if (branchnewflag === false) {
        swal({
          text: "Branch details are incomplete",
          icon: "error",
        });
      }

      if (validationFlag === false && branchnewflag === true) {
        swal({
          text: "Please fill the required fields",
          icon: "error",
        });
      }
    } else {
      setNextFlg(false);
      setLoading(true);
      const response = await SaveParticipentData(dto);
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
        setDto({
          participantTypeId: 8,
          participantCode: "",
          participantName: "",
          contactNo: "",
          address1: "",
          address2: "",
          address3: "",
          stateId: "",
          countryId: "",
          districtId: "",
          cityId: "",
          pincode: "",
          isActive: "y",
          tblParticipantBranch: [],
        });
        setSearchdto({ ...dto, participantTypeId: 8 });
      } else
        swal({
          text: "Data Save failed. Please Try Again!",
          icon: "error",
        });
    }
  };

  const handleUpdate = async () => {
    let validationFlag = true;

    let branchnewflag = true;
    setNextCount(nextCount + 1);
    if (dto.tblParticipantBranch.length > 0) {
      dto.tblParticipantBranch.forEach((branch) => {
        if (!branch.branchCode || !branch.branchName || !branch.branchSpocemailId) {
          branchnewflag = false;
          validationFlag = false;
        }
      });
    }
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (validationFlag === false || dto.tblParticipantBranch.length === 0) {
      setNextFlg(true);
      if (dto.tblParticipantBranch.length === 0) {
        swal({
          text: "Please Add Atleast One Branch",
          icon: "error",
        });
      }

      if (branchnewflag === false) {
        swal({
          text: "Branch details are incomplete",
          icon: "error",
        });
      }

      if (validationFlag === false) {
        swal({
          text: "Please fill the required fields",
          icon: "error",
        });
      }
    } else {
      setNextFlg(false);
      setLoading(true);
      setDto((prevDto) => ({
        ...prevDto,
        DeleteBranch: true,
      }));

      console.log(dto);
      if (delArr.length !== 0) {
        for (const x of delArr) {
          const d = await DeleteBranchDetails(x);
          console.log(d);
        }
      }
      const response = await UpDatePartyInSearch(participantId, dto);
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        // onClose = null;
        setOpen1(false);
        swal({
          text: res.responseMessage,
          icon: "success",
        });
      } else
        swal({
          text: res.errors[0].errorMessage,
          icon: "error",
        });
    }
  };

  const IsNumaricSpecial = (val) => {
    const regex = /^[0-9-+()]+[0-9-+()\s]*$/;
    if (regex.test(val) || val === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };
  // const handleconsole = () => {
  //   console.log("genericdto", dto);

  //   console.log("noOfParticipants", noOfParticipants);
  // };

  const renderItems = [
    // {
    //   type: "Button",
    //   label: "console",
    //   spacing: 12,
    //   visible: true,
    //   justifyContent: "left",
    //   onClick: handleconsole,
    // },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      required: true,
      path: "participantTypeId",
      justifyContent: "left",
      radioLabel: { labelVisible: true, label: "Reinsurer Type" },
      radioList: [
        { label: "Reinsurer", value: 8 },
        { label: "Broker", value: 9 },
      ],
      customOnChange: (e) => OnFinancingDetails(e),
      // customOnChange: (e, a, setErrorFlag, setErrorText) => {
      //   setErrorFlag(false);
      //   setErrorText("");
      //   OnFinancingDetails(e);
      // },
    },
    /* eslint-disable eqeqeq */
    {
      label: `${dto.participantTypeId == 8 ? "Reinsurer" : "Broker"} Code`,
      path: "participantCode",
      type: "Input",
      required: true,
      InputProps: { maxLength: 10 },
      onChangeFuncs: [IsAlphaNumNoSpace],
      // disabled: !checkForValue(participantId),
      visible: true,
      spacing: 3,
      customOnChange: (e, a, setErrorFlag, setErrorText) => {
        setDto((prevState) => ({
          ...prevState,
          participantCode: e.target.value,
        }));
        setErrorFlag(false);
        setErrorText("");
      },
      customOnBlur: validateCode,
    },
    {
      label: `${dto.participantTypeId == 8 ? "Reinsurer" : "Broker"} Name`,
      path: "participantName",
      type: "Input",
      required: true,
      visible: true,
      onChangeFuncs: [IsAlphaNoSpace],
      InputProps: { maxLength: 30 },
      spacing: 3,
      // customOnBlur: validateCode,
    },
    /* eslint-enable eqeqeq */
    {
      label: "Contact No",
      path: "contactNo",
      type: "Input",
      required: true,
      visible: true,
      // onBlurFuncs: [IsNumaricSpecial],
      onChangeFuncs: [IsNumaricSpecial],
      InputProps: { maxLength: 20 },
      spacing: 3,
    },
    {
      type: "Button",
      spacing: 3,
      visible: true,
      label: "Branches",
      // justifyContent: "center",
      onClick: handleOpen,
    },

    {
      label: "Address 1",
      path: "address1",
      visible: true,
      type: "Input",
      onChangeFuncs: [IsFreetextNoSpace],
      required: true,
      InputProps: { maxLength: 150 },
    },
    {
      label: "Address 2",
      path: "address2",
      visible: true,
      type: "Input",
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 150 },
    },
    {
      label: "Address 3",
      path: "address3",
      visible: true,
      type: "Input",
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 150 },
    },
    {
      label: "Country",
      path: "country",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("country"),
      customOnChange: (e, a) => locationMasters("country", a),
    },
    {
      label: "State",
      path: "state",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("state"),
      disabled: checkForValue(dto.country),
      customOnChange: (e, a) => locationMasters("state", a),
    },
    {
      label: "District",
      path: "district",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("district"),
      disabled: checkForValue(dto.state),
      customOnChange: (e, a) => locationMasters("district", a),
    },
    {
      label: localStorage.getItem("userName") === "upasana@gmail.com" ? "Municipality" : "City",
      path: "city",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("city"),
      disabled: checkForValue(dto.district),
      customOnChange: (e, a) => locationMasters("city", a),
    },
    {
      label: "Pincode",
      path: "pincode",
      visible: localStorage.getItem("userName") === "upasana@gmail.com" ? false : true,
      type: "AutoComplete",
      options: getMaster("pincode"),
      disabled: checkForValue(dto.city),
      customOnChange: (e, a) => locationMasters("pincode", a),
    },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      required: true,
      path: "isActive",
      radioLabel: { labelVisible: true, label: "Status" },
      radioList: [
        { label: "Active", value: "y" },
        { label: "Inactive", value: "n" },
      ],
    },
    {
      type: "Button",
      spacing: 5,
      visible: checkForValue(participantId),
      label: "Save ",
      justifyContent: "right",
      onClick: handleSave,
    },

    {
      type: "Button",
      spacing: 6,
      visible: checkForValue(participantId),
      label: "Save and submit for approval",
      justifyContent: "left",
      onClick: handleSave,
    },
    {
      type: "Button",
      spacing: 12,
      visible: !checkForValue(participantId),
      label: "Update",
      justifyContent: "center",
      onClick: handleUpdate,
    },
    {
      type: "Custom",
      spacing: 12,
      visible: open,
      return: (
        //  onClose={handleClose}
        <Modal open={open} onClose={null} sx={{ overflow: "scroll" }}>
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

              {/* eslint-disable */}
              <Branches
                dto={dto}
                setDto={setDto}
                styles={styles}
                handleClose={handleClose}
                participantId={participantId}
                setBranchCodeD={setBranchCodeD}
                BranchCodeD={BranchCodeD}
                setOpen={setOpen}
              />
              {/* eslint-enable */}
            </Grid>
          </MDBox>
        </Modal>
      ),
    },
  ];
  /* eslint-enable */

  useEffect(async () => {
    console.log(dto);
    const mst = { ...masters };
    let newDto = { ...dto };

    setLoading(true);
    const res = await GetLocationdata("Country", 0);
    mst.country = res.data.filter((x) => x.mID === 5);

    if (!checkForValue(participantId)) {
      const res1 = await GetParticipantinSearch(participantId);

      newDto = res1.data;
      newDto.ParticipantSearchname = res1.data.participantCode;
      const Tarr = res1.data.tblParticipantBranch;
      res1.data.tblParticipantBranch.forEach((x) => {
        BranchCodeD.push(x.branchCode);
      });
      setBranchCodeD([...BranchCodeD]);
      console.log("x", BranchCodeD);
      Tarr.forEach((x, i) => {
        if (Tarr[i].branchCode !== "") {
          Tarr[i].Editable = "No";
        } else {
          Tarr[i].Editable = "Yes";
        }
      });
      dto.tblParticipantBranch = Tarr;

      newDto.country = mst.country.filter((x) => x.mID === newDto.countryId)[0]
        ? mst.country.filter((x) => x.mID === newDto.countryId)[0].mValue
        : "";

      const state = await GetLocationdata("State", newDto.countryId);
      mst.state = state.data;
      newDto.state = mst.state.filter((x) => x.mID === newDto.stateId)[0]
        ? mst.state.filter((x) => x.mID === newDto.stateId)[0].mValue
        : "";

      const district = await GetLocationdata("District", newDto.stateId);
      mst.district = district.data;
      newDto.district = mst.district.filter((x) => x.mID === newDto.districtId)[0]
        ? mst.district.filter((x) => x.mID === newDto.districtId)[0].mValue
        : "";

      const city = await GetLocationdata("City", newDto.districtId);
      mst.city = city.data;
      newDto.city = mst.city.filter((x) => x.mID === newDto.cityId)[0]
        ? mst.city.filter((x) => x.mID === newDto.cityId)[0].mValue
        : "";

      const pincode = await GetLocationdata("Pincode", newDto.cityId);
      mst.pincode = pincode.data;

      newDto.pincode = res1.data.pincode ? res1.data.pincode : "";
      //     ? mst.pincode.filter((x) => x.mID === newDto.pincodeId)[0].mValue
      //     : "";
    }
    setDto({ ...newDto });
    setMasters({ ...mst });
    setLoading(false);
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem", boxShadow: !checkForValue(participantId) && "unset" }}>
        <MDTypography sx={headingStyle}>Participant Master</MDTypography>
        <MDBox>
          <Grid container spacing={2}>
            {renderItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={item.spacing ? item.spacing : 3}
                lg={item.spacing ? item.spacing : 3}
                xl={item.spacing ? item.spacing : 3}
                xxl={item.spacing ? item.spacing : 3}
              >
                {item.visible === true && (
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag={nextFlg}
                    nextCount={nextCount}
                    setBranchCodeD={setBranchCodeD}
                    BranchCodeD={BranchCodeD}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default ParticipantMaster;
