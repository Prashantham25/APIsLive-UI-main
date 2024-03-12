import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import { Cancel, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";

import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../../components/MDLoader";
import NewRenderControl from "../../../../../../../../Common/RenderControl/NewRenderControl";

import { DeleteRetention, GetMasterDataType, GetyearinRetention, SearchRetention } from "../data";

import { get } from "../../../../../../../../Common/RenderControl/objectPath";

import DefineRetention from "../DefineRetention";

import { DateFormatFromDateObject } from "../../../../../../../../Common/Validations";

function SearchRetentionFunc() {
  const [dto, setDto] = useState({
    retentionGroupName: null,
    year: "",
    yearId: "",
    businessTypeId: "",
    businessType: "",
    effectiveFrom: "",
    effectiveTo: "",
    status: "",
  });
  const [nextCount, setNextCount] = useState(0);
  const [masters, setMasters] = useState({ participantType: [] });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [nextFlg, setNextFlg] = useState(false);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);
  const [searchRetention, setSearchRetention] = useState(false);
  const [selectedId, setSelectedId] = useState("");

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

  const handleYearChange = (e, a) => {
    setRows([]);
    if (a === null) {
      setDto({ ...dto, year: "", effectiveTo: "", effectiveFrom: "" });
    } else {
      setDto({ ...dto, year: a.mValue, effectiveTo: "", effectiveFrom: "" });
    }
  };

  const onstartDate = (e, d) => {
    setRows([]);
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
    setRows([]);
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

  const handledtoChange = (e, a, key) => {
    setRows([]);
    if (key === "retentionGroupName") {
      if (e.target.value) {
        setDto({ ...dto, retentionGroupName: e.target.value });
      } else {
        setDto({ ...dto, retentionGroupName: "" });
      }
    }
    if (key === "status") {
      if (a !== null) {
        setDto({ ...dto, status: a.mValue });
      } else {
        setDto({ ...dto, status: "" });
      }
    }
    // if (key === "effectiveFrom") {
    //   if (a) {
    //     setDto({ ...dto, effectiveFrom: a });
    //   } else {
    //     setDto({ ...dto, effectiveFrom: "" });
    //   }
    // }
    // if (key === "effectiveTo") {
    //   if (a) {
    //     setDto({ ...dto, effectiveTo: a });
    //   } else {
    //     setDto({ ...dto, effectiveTo: "" });
    //   }
    // }
    console.log("dto", dto);
  };
  const assignValueId = (a, valueParam, idParam) => {
    setRows([]);
    if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
    else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
  };

  const handleSearch = async (flag) => {
    setNextCount(nextCount + 1);
    if (flag === true) {
      setSearchRetention(true);
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setSearchRetention(true);
    setOpen(false);
  };

  const columns = [
    {
      field: "year",
      headerName: "Year",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "businessType",
      headerName: "Business Type",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "retentionGroupName",
      headerName: "Retention Group",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "effectiveFrom",
      headerName: "Effective From Date",
      width: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "effectiveTo",
      headerName: "Effective To Date",
      width: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 100,
      renderCell: (param) => {
        const deleteRow = () => {
          swal({
            icon: "error",
            text: "Are you sure to Delete Retention Permanently ?",
            buttons: {
              buttonOne: {
                text: "Cancel",
                value: "cancel",
                visible: true,
              },
              buttonTwo: {
                text: "OK",
                value: "Confirm",
                visible: true,
              },
            },
          }).then(async (value) => {
            if (value === "Confirm") {
              setLoading(true);
              const Data = await DeleteRetention(param.row.retentionGroupId);
              setLoading(false);
              if (Data.data.status === 2) {
                swal({
                  text: Data.data.responseMessage,
                  icon: "success",
                });
                setSearchRetention(true);
              } else {
                swal({ text: "Data delete failed", icon: "error" });
              }
            }
          });
        };

        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => handleOpen(param.row.retentionGroupId)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={deleteRow} color="error">
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const renderItems = [
    {
      type: "AutoComplete",
      label: "Year",
      path: "year",
      validationId: 1,
      visible: true,
      spacing: 3,
      required: true,
      options: masters.year,
      // customOnChange: (e, a) => assignValueId(a, "year", "yearId"),
      customOnChange: (e, a) => handleYearChange(e, a),
    },
    {
      type: "AutoComplete",
      label: "Business Type",
      path: "businessType",
      visible: true,
      validationId: 1,
      spacing: 3,
      required: true,
      options: masters.businessType,
      customOnChange: (e, a) => assignValueId(a, "businessType", "businessTypeId"),
    },
    {
      label: "Retention Group Name",
      path: "retentionGroupName",
      type: "Input",
      visible: true,
      spacing: 3,
      InputProps: { maxLength: 20 },
      customOnChange: (e, a) => handledtoChange(e, a, "retentionGroupName"),
    },
    {
      type: "MDDatePicker",
      label: "Effective From Date",
      path: "effectiveFrom",
      visible: dto.year !== "",
      spacing: 3,
      // disable: dto.year === "",
      // customOnChange: (e, a) => handledtoChange(e, a, "effectiveFrom"),
      customOnChange: (e, d) => onstartDate(e, d),
    },
    {
      type: "MDDatePicker",
      label: "Effective To Date",
      path: "effectiveTo",
      visible: dto.year !== "",
      spacing: 3,
      // customOnChange: (e, a) => handledtoChange(e, a, "effectiveTo"),
      customOnChange: (e, d) => onEndDate(e, d),
    },
    {
      type: "AutoComplete",
      label: "Status",
      path: "status",
      visible: true,
      spacing: 3,
      options: masters.Status,
      customOnChange: (e, a) => handledtoChange(e, a, "status"),
    },
    {
      type: "ValidationControl",
      subType: "Button",
      validationId: 1,
      spacing: 12,
      visible: true,
      label: "Search",
      justifyContent: "center",
      onClick: handleSearch,
    },
    {
      type: "Custom",
      spacing: 12,
      visible: rows.length > 0,
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
            getRowId={(x) => x.retentionGroupId}
          />
        </MDBox>
      ),
    },
    {
      type: "Custom",
      spacing: 12,
      visible: open,
      return: (
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
              <DefineRetention retentionGroupId={selectedId} setOpen={setOpen} />
            </Grid>
          </MDBox>
        </Modal>
      ),
    },
  ];

  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      setMidNextValidationId(1);
      setNextFlg(true);
    } else {
      setMidNextValidationId(-1);
      setNextFlg(false);
    }
    return validationFlag;
  };

  useEffect(async () => {
    console.log(masters);
    const mst = { ...masters };
    setLoading(true);
    const res = await GetMasterDataType();
    const yearData = await GetyearinRetention();
    setLoading(false);
    if (res.data.filter((x) => x.mType === "BusinessType")[0]) {
      mst.businessType = [...res.data.filter((x) => x.mType === "BusinessType")[0].mdata];
    }
    if (res.data.filter((x) => x.mType === "Status")[0]) {
      mst.Status = [...res.data.filter((x) => x.mType === "Status")[0].mdata];
    }
    console.log(res, mst);
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

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  console.log(masters);

  useEffect(async () => {
    if (searchRetention === true) {
      setLoading(true);
      const res = await SearchRetention(dto);
      setLoading(false);
      if (res.data.length > 0) {
        setRows(
          res.data.map((x) => ({
            ...x,
            effectiveFrom: DateFormatFromDateObject(new Date(x.effectiveFrom), "d-m-y"),
            effectiveTo: DateFormatFromDateObject(new Date(x.effectiveTo), "d-m-y"),
          }))
        );
      } else {
        setRows([]);
        swal({
          text: "Sorry No Data Found! Try again",
          icon: "error",
        });
      }
      setSearchRetention(false);
    }
  }, [searchRetention]);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <MDTypography sx={headingStyle}>Search Retention</MDTypography>
        <MDBox>
          <Grid container spacing={2} sx={{ pt: "1rem" }}>
            {renderItems.map(
              (item) =>
                item.visible === true && (
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
                      onMidNextValidation={midValidationCheck}
                      midNextValidationId={midNextValidationId}
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

export default SearchRetentionFunc;
