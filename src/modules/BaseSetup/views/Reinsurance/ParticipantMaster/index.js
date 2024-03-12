import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import swal from "sweetalert";
import { Cancel, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../components/MDLoader";
import {
  IsMobileNumber,
  IsAlphaNumSpace,
  IsAlphaSpace,
  IsFreetextNoSpace,
  IsEmail,
} from "../../../../../Common/Validations";
import {
  GetLocationdata,
  GetParticipantinSearch,
  RIValidations,
  SaveParticipentData,
  UpDatePartyInSearch,
} from "../data";

import { get } from "../../../../../Common/RenderControl/objectPath";

function Branches({ dto, setDto, styles, BranchCodeD, nextCount }) {
  const { headingStyle } = styles;

  const [rows, setRows] = useState(
    dto.tblParticipantBranch
      ? dto.tblParticipantBranch.map((x, index) => ({ ...x, id: index + 1 }))
      : []
  );

  const handleBlur = async (e, i) => {
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
    // if (e.target.name === "branchCode" && rows[i - 1].Editable !== "No") {
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

        if (RI.data.responseMessage !== null && RI.data.status === 9 && RI.data) {
          rows[i - 1][e.target.name] = "";
          swal({
            text: RI.data.responseMessage,
            icon: "error",
          });
        }
      }
    }

    setRows([...rows]);
  };

  const handleChange = async (e, i) => {
    if (e.target.name === "branchCode") {
      if (IsAlphaNumSpace(e.target.value) === true) {
        rows[i - 1][e.target.name] = e.target.value;

        if (e.target.value.length > 10) {
          rows[i - 1][e.target.name] = "";

          swal({
            text: "Branch Code should not be more than 10 Charcters",
            icon: "error",
          });
        }
      } else {
        rows[i - 1][e.target.name] = "";

        swal({
          text: "Enter only alphabets numbers and Space",
          icon: "error",
        });
      }

      setRows([...rows]);
    }

    if (e.target.name === "branchName") {
      if (IsAlphaNumSpace(e.target.value) === true) {
        rows[i - 1][e.target.name] = e.target.value;
      } else {
        rows[i - 1][e.target.name] = "";

        swal({
          text: "Enter only alphabets numbers and Space",
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
    if (rows.length === 0) {
      swal({
        text: "Please Add Atleast One Branch",
        icon: "error",
      });
    } else {
      console.log("111", rows);

      rows.forEach((branch) => {
        if (!branch.branchCode || !branch.branchName || !branch.branchSpocemailId) {
          swal({
            text: "Branch details are incomplete",
            icon: "error",
          });
        } else {
          swal({
            text: "Branch details saved successfully",
            icon: "success",
          });
        }
      });
    }

    setDto((prevState) => ({ ...prevState, tblParticipantBranch: [...rows] }));
  };

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
      // editable: ,
      renderCell: (p) => (
        <MDInput
          name="branchCode"
          onChange={(e) => handleChange(e, p.row.id)}
          value={rows[p.row.id - 1].branchCode}
          onBlur={(e) => handleBlur(e, p.row.id)}
          // InputProps={{
          //   readOnly: rows[p.row.id - 1].Editable === "No",
          // }}
        />
      ),
    },

    {
      field: "branchName",
      headerName: "Branch Name",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: (p) => (
        <MDInput
          name="branchName"
          onChange={(e) => handleChange(e, p.row.id)}
          value={rows[p.row.id - 1].branchName}
        />
      ),
    },
    {
      field: "branchSpocemailId",
      headerName: "Email Details",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,

      renderCell: (p) => (
        <MDInput
          name="branchSpocemailId"
          onChange={(e) => handleChange(e, p.row.id)}
          value={rows[p.row.id - 1].branchSpocemailId}
          onBlur={(e) => handleBlur(e, p.row.id)}
        />
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
        const deleteRow = () => {
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
            {item.visible === true && (
              <NewRenderControl
                item={item}
                dto={dto}
                setDto={setDto}
                BranchCodeD={BranchCodeD}
                nextCount={nextCount}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

function ParticipantMaster({ participantId }) {
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
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState([]);
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
    setOpen(true);
    //     }
    //   });
  };

  const handleClose = () => setOpen(false);

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
        setErrorText(RI.data.responseMessage);
        setErrorFlag(true);
        setDto((prevState) => ({ ...prevState, participantCode: "" }));
      }
    }
  };

  /* eslint-disable */
  const handleSave = async () => {
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
      const response = await UpDatePartyInSearch(participantId, dto);
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
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
    },
    /* eslint-disable eqeqeq */
    {
      label: `${dto.participantTypeId == 8 ? "Reinsurer" : "Broker"} Code`,
      path: "participantCode",
      type: "Input",
      required: true,

      onChangeFuncs: [IsAlphaNumSpace],
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
      onChangeFuncs: [IsAlphaSpace],
      spacing: 3,
    },
    /* eslint-enable eqeqeq */
    {
      label: "Contact No",
      path: "contactNo",
      type: "Input",
      required: true,
      visible: true,
      onBlurFuncs: [IsMobileNumber],
      spacing: 3,
      maxLength: 10,
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
      onBlurFuncs: [IsFreetextNoSpace],
      required: true,
    },
    {
      label: "Address 2",
      path: "address2",
      visible: true,
      type: "Input",
      onBlurFuncs: [IsFreetextNoSpace],
    },
    {
      label: "Address 3",
      path: "address3",
      visible: true,
      type: "Input",
      onBlurFuncs: [IsFreetextNoSpace],
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
      label: "City",
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
      visible: true,
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
      spacing: 6,
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

              {/* eslint-disable */}
              <Branches
                dto={dto}
                setDto={setDto}
                styles={styles}
                handleClose={handleClose}
                participantId={participantId}
                BranchCodeD={BranchCodeD}
                setBranchCodeD={setBranchCodeD}
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
    const mst = { ...masters };
    let newDto = { ...dto };
    setLoading(true);
    const res = await GetLocationdata("Country", 0);
    mst.country = res.data;

    if (!checkForValue(participantId)) {
      const res1 = await GetParticipantinSearch(participantId);
      // const BranchCodeD = [];

      // const branchDetails = [];
      // res1.data.forEach((x) => {
      //   branchDetails.push(x.branch);
      // });
      newDto = res1.data;
      setEdit(res1.data);
      newDto.ParticipantSearchname = res1.data.participantCode;
      const Tarr = res1.data.tblParticipantBranch;
      res1.data.tblParticipantBranch.forEach((x) => {
        BranchCodeD.push(x.branchCode);
      });
      setBranchCodeD([...BranchCodeD]);
      console.log("x", BranchCodeD);
      // Tarr.forEach((x, i) => {
      //   if (Tarr[i].branchCode !== "") {
      //     Tarr[i].Editable = "No";
      //   } else {
      //     Tarr[i].Editable = "Yes";
      //   }
      // });
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
  console.log("editvalue", edit);

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
