import { useState, useEffect } from "react";
import { Card, Grid, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDAutocomplete from "../../../../../components/MDAutocomplete";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDLoader from "../../../../../components/MDLoader";
import {
  GetDescriptionRIGrid,
  GetRImappingBYId,
  GetRetentionGroupsByYear,
  GetTreatiesByYearId,
  GetTreatyGroupsById,
  GetyearinRetention,
  ModifyRIMapping,
  SaveRIMapping,
} from "../data";
import { get, set } from "../../../../../Common/RenderControl/objectPath";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import { DateFormatFromDateObject } from "../../../../../Common/Validations";

function GroupSequencing({ riMappingId }) {
  const [dto, setDto] = useState({
    year: "",
    status: "",
    comment: "",
    level: "",
    lobProductCover: "",
    retentionGroupId: "",
    sequenceNo: "0",
    GroupRefCode: "",
    tblRimappingDetail: [],
    roleid: localStorage.getItem("roleId"),
  });
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState({ year: [], retentionGroup: [], treatyCodeValue: [] });
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

  const { headingStyle } = styles;

  const idValueMap = {
    year: "yearId",
    retentionGroup: "retentionGroupId",
    treatyCodeValue: "treatyCode",
    treatyGroup: "treatyGroupId",
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
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

  const getMaster = (name) => (!checkForValue(masters[name]) ? masters[name] : []);

  const validateCode = async (e, a, setErrorFlag, setErrorText) => {
    // const RI = await RIValidationsinRetention(e.target.value, dto.year, "RetentionGroupName");
    const RI = { data: null };
    if (RI.data.responseMessage !== null && RI.data.status === 9) {
      setErrorText(RI.data.responseMessage);
      setErrorFlag(true);
      setDto((prevState) => ({ ...prevState, retentionGroupName: "" }));
    }
  };

  const handleChange = (e, index) => {
    const newRiMapping = dto.tblRimappingDetail.map((x, i) =>
      i === index ? { ...x, [e.target.id]: e.target.value } : { ...x }
    );
    setDto({ ...dto, tblRimappingDetail: [...newRiMapping] });
  };

  const columns = [
    {
      field: "id",
      headerName: "S No",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "treatyCodeValue",
      headerName: "Treaty Code",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => (
        <MDAutocomplete
          label="Treaty Code"
          value={{
            mValue: !checkForValue(param.row.treatyCodeValue) ? param.row.treatyCodeValue : "",
          }}
          options={getMaster("treatyCodeValue")}
          onChange={async (e, b) => {
            const a = b !== null ? { ...b } : { mID: "", mValue: "" };
            setLoading(true);
            const descriptionData = await GetDescriptionRIGrid(a.mID);
            const groupsList = await GetTreatyGroupsById(a.mID);
            setLoading(false);
            setMasters((prevState) => ({
              ...prevState,
              [`treatyGroup-${a.mValue}`]:
                groupsList && !checkForValue(groupsList.data) && !checkForValue(groupsList.data[0])
                  ? groupsList.data[0].mdata
                  : "",
            }));
            set(
              dto,
              `tblRimappingDetail.${param.id - 1}`,
              {
                ...dto.tblRimappingDetail[param.id - 1],
                treatyCodeValue: a.mValue,
                treatyCode: a.mID,
                treatydescription:
                  descriptionData &&
                  !checkForValue(descriptionData.data) &&
                  !checkForValue(descriptionData.data[0])
                    ? descriptionData.data[0].treatyDescription
                    : "",
                treatyType:
                  descriptionData &&
                  !checkForValue(descriptionData.data) &&
                  !checkForValue(descriptionData.data[0])
                    ? descriptionData.data[0].treatyType
                    : "",
              },
              setDto
            );
          }}
        />
      ),
    },
    {
      field: "treatydescription",
      headerName: "Treaty Description",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "treatyGroup",
      headerName: "Treaty Group",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => (
        <MDAutocomplete
          label="Treaty Group"
          value={{
            mValue: !checkForValue(param.row.treatyGroup) ? param.row.treatyGroup : "",
          }}
          options={
            !checkForValue(param.row.treatyCodeValue)
              ? getMaster(`treatyGroup-${param.row.treatyCodeValue}`)
              : []
          }
          onChange={(e, a) => assignValueId(a, `tblRimappingDetail.${param.id - 1}`, "treatyGroup")}
        />
      ),
    },
    {
      field: "treatyType",
      headerName: "Treaty Type",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sequenceNo",
      headerName: "Sequence No",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => (
        <MDInput
          id="sequenceNo"
          onChange={(e) => handleChange(e, param.id - 1)}
          value={param.row.sequenceNo}
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
          const newMapping = [
            ...dto.tblRimappingDetail.filter((x, ind) => ind !== param.row.id - 1),
          ];
          setDto((prevState) => ({ ...prevState, tblRimappingDetail: [...newMapping] }));
        };
        return (
          <IconButton color="error" onClick={handleDelete}>
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  /* eslint-disable */
  const handleSave = async () => {
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
      const response = await SaveRIMapping({ ...dto, status: "Sent for Approval" });
      setLoading(false);
      const res = response.data;
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
        setDto({
          year: "",
          status: "",
          comment: "",
          level: "",
          lobProductCover: "",
          retentionGroupId: "",
          sequenceNo: "0",
          GroupRefCode: "",
          tblRimappingDetail: [
            {
              treatyCode: "",
              treatydescription: "",
              treatyGroupId: "",
              treatyType: "",
              sequenceNo: "",
            },
          ],
          roleid: localStorage.getItem("roleId"),
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
      const response = await ModifyRIMapping(riMappingId, dto);
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

  const EditToolbar = () => {
    const handleClick = () => {
      setDto((prevState) => ({
        ...prevState,
        tblRimappingDetail: [
          ...prevState.tblRimappingDetail,
          {
            treatyCode: "",
            treatydescription: "",
            treatyGroupId: "",
            treatyType: "",
            sequenceNo: "",
          },
        ],
      }));
    };

    return (
      <MDButton startIcon={<Add />} variant="text" onClick={handleClick}>
        Add Treaty
      </MDButton>
    );
  };

  const renderItems = [
    {
      type: "AutoComplete",
      label: "Year",
      path: "year",
      visible: true,
      spacing: 3,
      required: true,
      options: getMaster("year"),
      customOnChange: async (e, b) => {
        const a = b !== null ? { ...b } : { mID: "", mValue: "" };
        setLoading(true);
        const retentionData = await GetRetentionGroupsByYear(a.mValue);
        const treatyData = await GetTreatiesByYearId(a.mID);
        setLoading(false);
        setMasters((prevState) => ({
          ...prevState,
          retentionGroup:
            retentionData && retentionData.data && retentionData.data[0]
              ? retentionData.data[0].mdata
              : [],
          treatyCodeValue:
            treatyData && treatyData.data && treatyData.data[0] ? treatyData.data[0].mdata : [],
        }));
        setDto((prevState) => ({
          ...prevState,
          year: a.mValue,
          yearId: a.mID,
          retentionGroup: "",
          retentionGroupId: "",
          tblRimappingDetail: [],
        }));
      },
    },
    {
      label: "Reference Name",
      path: "GroupRefCode",
      type: "Input",
      disabled: checkForValue(dto.year),
      required: true,
      visible: true,
      spacing: 3,
      customOnChange: (e, a, setErrorFlag, setErrorText) => {
        setDto((prevState) => ({
          ...prevState,
          GroupRefCode: e.target.value,
        }));
        setErrorFlag(false);
        setErrorText("");
      },
      customOnBlur: validateCode,
    },
    {
      type: "Input",
      label: "Comments",
      path: "comment",
      visible: true,
      spacing: 3,
    },
    {
      type: "Typography",
      label: "Retention Mapping",
      spacing: 12,
      visible: !checkForValue(dto.year),
    },
    {
      type: "AutoComplete",
      label: "Retention Group",
      path: "retentionGroup",
      visible: !checkForValue(dto.year),
      spacing: 3,
      options: getMaster("retentionGroup"),
      customOnChange: (e, a) => assignValueId(a, "", "retentionGroup"),
    },
    {
      type: "Input",
      label: "Sequence No",
      path: "sequenceNo",
      visible: !checkForValue(dto.year),
      spacing: 3,
      disabled: true,
    },
    {
      type: "Typography",
      label: "Treaty Mapping",
      spacing: 12,
      visible: !checkForValue(dto.year),
    },
    {
      type: "Custom",
      spacing: 12,
      visible: !checkForValue(dto.year),
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={dto.tblRimappingDetail.map((x, ind) => ({ ...x, id: ind + 1 }))}
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
      type: "Button",
      label: "Save and submit for approval",
      spacing: 12,
      visible: checkForValue(riMappingId),
      justifyContent: "center",
      onClick: handleSave,
    },
    {
      type: "Button",
      label: "Update",
      spacing: 12,
      visible: !checkForValue(riMappingId),
      justifyContent: "center",
      onClick: handleUpdate,
    },
  ];
  /* eslint-enable */

  useEffect(async () => {
    const mst = { ...masters };
    setLoading(true);
    const yearData = await GetyearinRetention();
    setLoading(false);
    if (yearData.data) {
      mst.year = yearData.data[0].mdata;
    }

    if (!checkForValue(riMappingId)) {
      setLoading(true);
      const result = await GetRImappingBYId(riMappingId);
      setDto({
        ...result.data,
        effectiveFrom: DateFormatFromDateObject(new Date(result.data.effectiveFrom), "m-d-y"),
        effectiveTo: DateFormatFromDateObject(new Date(result.data.effectiveTo), "m-d-y"),
      });
      setLoading(false);
    }

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem", boxShadow: !checkForValue(riMappingId) && "unset" }}>
        <MDTypography sx={headingStyle}>RI Grouping & Sequencing</MDTypography>
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
export default GroupSequencing;
