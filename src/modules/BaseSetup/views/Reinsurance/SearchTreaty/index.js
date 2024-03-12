import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import { Cancel, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../components/MDLoader";
import { DeleteTreaty, GetyearinRetention, SearchTreaty } from "../data";
import { get } from "../../../../../Common/RenderControl/objectPath";
import { DateFormatFromDateObject } from "../../../../../Common/Validations";
import CreateTreaty from "../CreateTreaty";

function SearchTreatyFunc() {
  const [dto, setDto] = useState({
    treatyCode: null,
    treatyDescription: null,
    startDate: null,
    endDate: null,
    treatyYear: "",
  });
  const [masters, setMasters] = useState({ treatyYear: [] });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [nextFlg, setNextFlg] = useState(false);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);
  const [searchTreaty, setSearchTreaty] = useState(false);
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

  const assignValueId = (a, valueParam, idParam) => {
    if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
    else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
  };

  const handleSearch = async (flag) => {
    if (flag === true) {
      setSearchTreaty(true);
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setSearchTreaty(true);
    setOpen(false);
  };

  const columns = [
    {
      field: "treatyCode",
      headerName: "Treaty Code",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "treatyDescription",
      headerName: "Treaty Description",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "treatyYear",
      headerName: "Treaty Year",
      width: 100,
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
            text: "Are you sure to Delete Treaty Permanently ?",
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
              const Data = await DeleteTreaty(param.row.treatyId);
              setLoading(false);
              if (Data.data.status === 2) {
                swal({
                  text: Data.data.responseMessage,
                  icon: "success",
                });
                setSearchTreaty(true);
              } else {
                swal({ text: "Data delete failed", icon: "error" });
              }
            }
          });
        };

        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => handleOpen(param.row.treatyId)} color="primary">
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
      label: "Treaty Code",
      path: "treatyCode",
      type: "Input",
      visible: true,
      required: true,
      validationId: 1,
      spacing: 3,
    },
    {
      label: "Treaty Description",
      path: "treatyDescription",
      type: "Input",
      visible: true,
      spacing: 3,
    },
    {
      type: "MDDatePicker",
      label: "Effective From Date",
      path: "startDate",
      visible: true,
      spacing: 3,
    },
    {
      type: "MDDatePicker",
      label: "Effective To Date",
      path: "endDate",
      visible: true,
      spacing: 3,
    },
    {
      type: "AutoComplete",
      label: "Year",
      path: "treatyYear",
      visible: true,
      spacing: 3,
      options: masters.treatyYear,
      customOnChange: (e, a) => assignValueId(a, "treatyYear", "treatyYearId"),
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
            getRowId={(x) => x.treatyId}
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
              <CreateTreaty treatyId={selectedId} />
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
    const mst = { ...masters };
    setLoading(true);
    const yearData = await GetyearinRetention();
    setLoading(false);
    if (yearData.data) {
      mst.treatyYear = yearData.data[0].mdata;
    }

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  useEffect(async () => {
    if (searchTreaty === true) {
      setLoading(true);
      const res = await SearchTreaty(dto);
      setLoading(false);
      if (res.data.length > 0) {
        setRows(
          res.data.map((x) => ({
            ...x,
            startDate: DateFormatFromDateObject(new Date(x.startDate), "d-m-y"),
            endDate: DateFormatFromDateObject(new Date(x.endDate), "d-m-y"),
          }))
        );
      } else {
        setRows([]);
        swal({
          text: "Sorry No Data Found! Try again",
          icon: "error",
        });
      }
      setSearchTreaty(false);
    }
  }, [searchTreaty]);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <MDTypography sx={headingStyle}>Search Treaty</MDTypography>
        <MDBox>
          <Grid container spacing={2} sx={{ pt: "1rem" }}>
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
                    onMidNextValidation={midValidationCheck}
                    midNextValidationId={midNextValidationId}
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

export default SearchTreatyFunc;
