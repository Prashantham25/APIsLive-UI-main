import { useState, useEffect } from "react";
import { Card, Grid, IconButton, Modal, Stack } from "@mui/material";
import { Cancel, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../components/MDLoader";
import { DeleteParticipant, GetMasterDataType, SearchParticipantMethod } from "../data";
import ParticipantMaster from "../ParticipantMaster";
import { get } from "../../../../../Common/RenderControl/objectPath";
import { IsAlphaNumSpace, IsAlphaSpace } from "../../../../../Common/Validations";

function SearchParticipant() {
  const [dto, setDto] = useState({
    participantTypeId: "",
    participantCode: "",
    participantName: "",
  });
  const [masters, setMasters] = useState({ participantType: [] });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [nextFlg, setNextFlg] = useState(false);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);
  const [searchParticipant, setSearchParticipant] = useState(false);
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
      setSearchParticipant(true);
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "participantType",
      headerName: "Participant Type",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "participantCode",
      headerName: "Participant Code",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "participantName",
      headerName: "Participant Name",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      renderCell: (param) => {
        const deleteRow = () => {
          swal({
            icon: "error",
            text: "Are you sure to Delete Participant Permanently ?",
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
              const Data = await DeleteParticipant(param.row.participantMasterId);
              setLoading(false);
              if (Data.data.status === 2) {
                swal({
                  text: Data.data.responseMessage,
                  icon: "success",
                });
                setSearchParticipant(true);
              } else {
                swal({ text: "Data delete failed", icon: "error" });
              }
            }
          });
        };

        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => handleOpen(param.row.participantMasterId)} color="primary">
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
      label: "Participant Type",
      path: "participantType",
      type: "AutoComplete",

      // validationId: 1,
      visible: true,
      options: masters.participantType,
      customOnChange: (e, a) => assignValueId(a, "participantType", "participantTypeId"),
      spacing: 3,
    },
    {
      label: "Participant Name",
      path: "participantName",
      type: "Input",
      spacing: 3,
      visible: true,
      onChangeFuncs: [IsAlphaSpace],
    },
    {
      label: "Participant Code",
      path: "participantCode",
      type: "Input",
      visible: true,
      spacing: 3,
      onChangeFuncs: [IsAlphaNumSpace],
    },
    {
      type: "ValidationControl",
      subType: "Button",
      validationId: 1,
      spacing: 3,
      visible: true,
      label: "Search",
      // justifyContent: "center",
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
            getRowId={(x) => x.participantMasterId}
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
              <ParticipantMaster participantId={selectedId} />
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
    setLoading(true);
    const res = await GetMasterDataType();
    setLoading(false);
    if (res.data.filter((x) => x.mType === "TreatyAccountingTo")[0]) {
      setMasters((prevState) => ({
        ...prevState,
        participantType: [...res.data.filter((x) => x.mType === "TreatyAccountingTo")[0].mdata],
      }));
    }
  }, []);

  useEffect(async () => {
    if (searchParticipant === true) {
      setLoading(true);
      if (
        dto.participantCode !== "" ||
        dto.participantName !== "" ||
        dto.participantTypeId !== ""
      ) {
        const res = await SearchParticipantMethod(dto);
        setLoading(false);
        if (res.data.length > 0) {
          setRows(res.data);
        }
      } else {
        setRows([]);
        swal({
          text: "Sorry No Data Found! Try again",
          icon: "error",
        });
        setLoading(false);
      }
      setSearchParticipant(false);
    }
  }, [searchParticipant]);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <MDTypography sx={headingStyle}>Search Participant</MDTypography>
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

export default SearchParticipant;
