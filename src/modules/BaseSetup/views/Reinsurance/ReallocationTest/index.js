import { useState, useEffect } from "react";
import { Card, Grid, Stack, IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";
import MDLoader from "../../../../../components/MDLoader";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";

import {
  AllocationByPolicyNo,
  GetAllocationById,
  GetAllocationByPolicyNo,
  GetReinsurers,
  GetBrokers,
  GetBranchCode,
  GetParticipantNameByCode,
  GetMasterDataType,
  ModifyReAllocation,
} from "../data";
import { DateFormatFromDateObject } from "../../../../../Common/Validations";
import { GetEndorsementJson } from "../../../../PolicyLive/views/Retail/Products/NepalProds/data/APIs/MotorCycleApi";

// import { get } from "../../../../../Common/RenderControl/objectPath";
// import { DateFormatFromDateObject } from "../../../../../Common/Validations";

function ReallocationTest() {
  const [dto, setDto] = useState({
    PolicyNo: "",
    EndorsementNo: "",
    searchpolicydetailslist: [],
    result: {},
    ParticipantId: "",
    addParticipanttrue: "",
    GetAllocationByPolicyNo: {},
    ModifyDto: {
      allocationAmount: "",
      Level: "",
      Name: "",
      mappingId: 0,
      policyNo: "",
      premium: 0,
      AllocationId: 0,
      allocationDetails: "",
    },

    resallocationrows: [],
    reinsurerCode: "",
    brokername: "",
    reInsurerBranchId: "",
    brokerBranchId: "",
    tblParticipantDetails: [],
    tblParticipant: {
      reInsurerId: "",
      brokername: "",
      reinsurername: "",
      reInsurerBranchId: "",
      brokerId: "",
      brokerBranchId: "",
      sharePercentage: 0,
      brokeragePercentage: 0,
      ricommissionPercentage: 0,
      bordereauxFreqId: 0,
      status: "",
      isActive: "",
    },
  });

  const [masters, setMasters] = useState({
    reinsurerCode: [],
    brokerCode: [],
    reInsurerBranchCode: [],
    brokerBranch: [],
    bordereauxFrequency: [],
  });
  const [rows, setRows] = useState([]);
  const [allocationrows, setallocationrows] = useState([]);
  const [participantrows, setparticipantrows] = useState([]);

  // const [noOfParticipants, setNoOfParticipants] = useState(0);

  useEffect(async () => {
    const mst = { ...masters };
    const res = await GetMasterDataType();
    const brokerData = await GetBrokers();
    const reinsurerData = await GetReinsurers();

    if (brokerData.data) {
      mst.brokerCode = brokerData.data[0]?.mdata;
    }
    if (reinsurerData.data) {
      mst.reinsurerCode = reinsurerData.data[0]?.mdata;
    }
    if (res.data) {
      mst.bordereauxFrequency = res.data[4]?.mdata;
    }

    setMasters((prevState) => ({ ...prevState, ...mst }));
  }, []);

  const columns = [
    {
      field: "endorsementNo",

      headerName: "Allocation/Reallocation",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 300,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "action",
      headerName: "View",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (param) => {
        const Viewfunc = async () => {
          const Data = await GetAllocationById(param.row.aLloacationId, false);

          const Tarr = Data.data.mapDetails;

          Tarr.forEach((x, i) => {
            Tarr[i].srNo = i + 1;
          });
          dto.resallocationrows = Tarr;
          setallocationrows(Tarr);
        };

        return (
          <Stack direction="row" spacing={2}>
            <IconButton color="primary" onClick={Viewfunc}>
              <VisibilityIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const participantcolums = [
    {
      field: "ReInsurarName",
      headerName: "Reinsurer Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "BrokerName",
      headerName: "Broker Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Share",
      headerName: "SharePercentage",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "AllocatedAmount",
      headerName: "Amount",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "AllocatedPremium",
      headerName: "Premium",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Brokerage",
      headerName: "Brokerage",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Commission",
      headerName: "Commission",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

  const allocationcolums = [
    {
      field: "Type",
      headerName: "Retention/Treaty",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AllocationLogic",
      headerName: "Allocation Logic",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Percentage",
      headerName: "Percentage",
      width: 250,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Limit",
      headerName: "Limit",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AllocationBasis",
      headerName: "Sum Insured",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "NoOfLines ",
      headerName: "Lines",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AllocatedAmount",
      headerName: "AllocatedAmount",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AllocatedPremium",
      headerName: "Premium",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "ParticipantDetails",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (param) => {
        const Viewfunc = async () => {
          dto.ParticipantId = param.row.srNo;

          setparticipantrows(dto.resallocationrows[dto.ParticipantId - 1].participants);
        };

        return (
          <Stack direction="row" spacing={2}>
            <IconButton color="primary" onClick={Viewfunc}>
              <VisibilityIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

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

  // const checkForValue = (value) => value === "" || value === undefined || value === null;

  const [searchRetention, setSearchRetention] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showparticipant, setshowparticipant] = useState(false);

  const addParticipant = async () => {
    dto.addParticipanttrue = "Yes";
    setshowparticipant(true);
    const res = await GetAllocationByPolicyNo(dto.PolicyNo);
    dto.GetAllocationByPolicyNo = res.data;
  };

  const saveParticipant = async () => {
    dto.tblParticipantDetails.push({ ...dto.tblParticipant });
    dto.GetAllocationByPolicyNo.mapDetails[3].participants.push({ ...dto.tblParticipant });

    dto.ModifyDto.allocationDetails = JSON.stringify(dto.GetAllocationByPolicyNo);

    dto.bordereauxFrequency = "";
    dto.brokerBranchId = "";
    dto.brokerCodeId = "";
    dto.brokername = "";
    dto.reInsurerBranchId = "";
    dto.reinsurerCode = "";
    dto.tblParticipant.bordereauxFreqId = "";
    dto.tblParticipant.brokerBranchId = "";
    dto.tblParticipant.brokeragePercentage = "";
    dto.tblParticipant.brokername = "";
    dto.tblParticipant.reInsurerBranchId = "";
    dto.tblParticipant.reInsurerId = "";
    dto.tblParticipant.reinsurername = "";
    dto.tblParticipant.ricommissionPercentage = "";
    dto.tblParticipant.sharePercentage = "";
  };

  const ModifyReallocation = async () => {
    dto.ModifyDto.allocationAmount = dto.GetAllocationByPolicyNo.AllocationAmount;
    dto.ModifyDto.Level = dto.GetAllocationByPolicyNo.Level;
    dto.ModifyDto.Name = dto.GetAllocationByPolicyNo.Name;
    dto.ModifyDto.mappingId = dto.GetAllocationByPolicyNo.MappingId;
    dto.ModifyDto.policyNo = dto.GetAllocationByPolicyNo.PolicyNumber;
    dto.ModifyDto.premium = dto.GetAllocationByPolicyNo.PremiumAmount;
    dto.ModifyDto.AllocationId = dto.GetAllocationByPolicyNo.AllocationId;
    const finalresult = await ModifyReAllocation(
      dto.GetAllocationByPolicyNo.MappingId,
      dto.ModifyDto
    );

    if (finalresult.status === 200) {
      swal({
        text: "data Reallocated successfully",
        icon: "success",
      });
    } else {
      swal({
        text: "Please Try Again",
        icon: "success",
      });
    }
  };
  useEffect(async () => {
    if (searchRetention === true) {
      setLoading(true);
      let res = "";
      if (dto.EndorsementNo !== "") {
        const GetEndorsementJsonres = await GetEndorsementJson(dto.EndorsementNo);

        console.log("GetEndorsementJsonres", GetEndorsementJsonres);

        if (GetEndorsementJsonres.data.finalResult.EndorsementDetails.PolicyNumber !== "") {
          res = await AllocationByPolicyNo(
            GetEndorsementJsonres.data.finalResult.EndorsementDetails.PolicyNumber
          );
        } else {
          setLoading(false);
          setRows([]);
          swal({
            text: "Sorry No Data Found! Try again",
            icon: "error",
          });
        }
      } else {
        res = await AllocationByPolicyNo(dto.PolicyNo);
        setLoading(false);
        if (res.data.policyDetails === null) {
          setRows([]);
          swal({
            text: "Sorry No Data Found! Try again",
            icon: "error",
          });
        }
      }

      dto.result = { ...res.data };
      dto.result.policyDetails = JSON.parse(res.data.policyDetails);

      if (res.data.policyDetails !== null) {
        dto.searchpolicydetailslist = [JSON.parse(res.data.policyDetails)];

        setRows(
          res.data.allocationDetails.map((x) => ({
            ...x,
            endorsementNo: x.endorsementNo ? x.endorsementNo : dto.PolicyNo,
            createdDate: DateFormatFromDateObject(new Date(x.createdDate), "d-m-y"),
          }))
        );
      } else {
        swal({
          text: "Sorry No Data Found! Try again",
          icon: "error",
        });
      }
      setSearchRetention(false);
    }
  }, [searchRetention]);

  const handleConsole = async () => {
    console.log("setdto.", dto);
    console.log("masters", masters);
  };

  const handleSearch = async () => {
    if (dto.PolicyNo === "" && dto.EndorsementNo === "") {
      swal({
        text: "Please Enter Policy Number or  Endorsement Number",
        icon: "error",
      });
    } else {
      setSearchRetention(true);
    }
  };

  const renderItems = [
    {
      type: "Button",
      label: "console",
      spacing: 12,
      visible: true,
      justifyContent: "center",
      onClick: handleConsole,
    },
    {
      type: "Input",
      label: "Policy Number",
      path: "PolicyNo",
      visible: true,
      spacing: 3,
    },

    {
      type: "Input",
      label: "Endorsement Number",
      path: "EndorsementNo",
      visible: true,
      spacing: 3,
    },

    {
      type: "Button",

      spacing: 6,
      visible: true,
      label: "Search",
      justifyContent: "left",
      onClick: handleSearch,
    },

    {
      type: "Custom",

      visible:
        dto.result.policyDetails !== null &&
        dto.result.policyDetails !== undefined &&
        dto.result.policyDetails !== "",

      spacing: 12,
      return: (
        <Stack rowGap={2}>
          {dto.searchpolicydetailslist.map((item) => (
            <Grid container columnSpacing={2}>
              {/* Assuming you want to display each key-value pair in a grid */}
              {Object.entries(item).map(([key, value]) => (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} key={key} mt="10px">
                  {/* Render MDInput for each key-value pair */}
                  <MDInput
                    label={key}
                    name={key}
                    value={value} // Accessing the value of the current key
                    // Handle onChange and onBlur events if needed
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Stack>
      ),
    },

    {
      type: "Typography",
      label: "RI Arrangement Details",
      spacing: 12,

      visible:
        dto.result.policyDetails !== null &&
        dto.result.policyDetails !== undefined &&
        dto.result.policyDetails !== undefined,
    },

    {
      type: "Input",
      label: "Level",
      path: "result.rIArrangementDetails.level",

      visible:
        dto.result.policyDetails !== null &&
        dto.result.policyDetails !== undefined &&
        dto.result.policyDetails !== undefined,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Value Of Level",
      path: "result.rIArrangementDetails.valueOfLevel",

      visible:
        dto.result.policyDetails !== null &&
        dto.result.policyDetails !== undefined &&
        dto.result.policyDetails !== undefined,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Basis",
      path: "result.rIArrangementDetails.basis",

      visible:
        dto.result.policyDetails !== null &&
        dto.result.policyDetails !== undefined &&
        dto.result.policyDetails !== undefined,
      readOnly: true,
      required: true,
      spacing: 3,
    },

    {
      type: "Typography",
      label: "Allocation Details",
      spacing: 12,
      visible: rows.length > 0,
    },

    {
      type: "Custom",
      spacing: 8,
      justifyContent: "centre",
      visible: rows.length > 0,
      return: (
        <MDBox
          sx={{
            width: "100%",
            justifyContent: "centre",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.aLloacationId}
          />
        </MDBox>
      ),
    },
    {
      type: "Typography",
      label: "",
      visible: true,
      spacing: 4,
    },
    {
      type: "Typography",
      label: "Allocation",
      spacing: 12,
      visible: allocationrows.length > 0,
    },

    {
      type: "Custom",
      spacing: 12,
      visible: allocationrows.length > 0,
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={allocationrows}
            columns={allocationcolums}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.srNo}
          />
        </MDBox>
      ),
    },

    {
      type: "Typography",
      label: "Participant Details",
      spacing: 12,
      visible: participantrows.length > 0,
    },

    {
      type: "Custom",
      spacing: 12,
      visible: participantrows.length > 0,
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={participantrows}
            columns={participantcolums}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.ReInsurerId}
          />
        </MDBox>
      ),
    },

    {
      type: "Typography",
      label: "Retention Details",
      spacing: 12,
      visible: allocationrows.length > 0,
    },

    {
      type: "Input",
      label: "Retention Group",
      path: "resallocationrows[0].GroupName",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Business Type",
      path: "resallocationrows[0].BusinessType",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Allocation Logic",
      path: "resallocationrows[0].AllocationLogic",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Typography",
      label: "Current Status",
      spacing: 12,
      visible: allocationrows.length > 0,
    },

    {
      type: "Input",
      label: "Percentage",
      path: "resallocationrows[0].Percentage",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Sum Insured",
      path: "resallocationrows[0].AllocationBasis",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Premium",
      path: "resallocationrows[0].AllocatedPremium",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Limit",
      path: "resallocationrows[0].Limit",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },

    {
      type: "Typography",
      label: "Reallocation",
      spacing: 12,
      visible: allocationrows.length > 0,
    },

    // {
    //   type: "Input",
    //   label: "Percentage",
    //   path: "resallocationrows[0].",
    //   visible: allocationrows.length > 0,
    //   readOnly: true,
    //   required: true,
    //   spacing: 3,
    // },
    {
      type: "Input",
      label: "Sum Insured",
      path: "resallocationrows[0].AllocatedAmount",
      visible: allocationrows.length > 0,
      // readOnly: true,
      // required: true,
      spacing: 3,
    },
    {
      type: "Input",
      label: "Premium",
      path: "resallocationrows[0].AllocatedPremium",
      visible: allocationrows.length > 0,
      readOnly: true,
      required: true,
      spacing: 3,
    },

    {
      type: "Custom",

      visible: true,

      spacing: 12,
      return: (
        <Stack rowGap={2}>
          {dto.resallocationrows.map(
            (item) =>
              item.Type === "QS" && (
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h5" color="">
                      QuotaShare/Obligatory Details
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Treaty Group" name="GroupName" value={item.GroupName} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Share %" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Allocation Logic"
                      name="AllocationLogic"
                      value={item.AllocationLogic}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="">
                      Current Status
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Reallocation
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />
                  </Grid>
                </Grid>
              )
          )}
        </Stack>
      ),
    },

    {
      type: "Custom",

      visible: true,

      spacing: 12,
      return: (
        <Stack rowGap={2}>
          {dto.resallocationrows.map(
            (item) =>
              item.Type === "Surplus" && (
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Surplus
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Treaty Group" name="GroupName" value={item.GroupName} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Allocation Logic"
                      name="AllocationLogic"
                      value={item.AllocationLogic}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="No of Lines" name="NoOfLines" value={item.NoOfLines} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Current Status
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    {" "}
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />{" "}
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Reallocation
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />
                  </Grid>
                </Grid>
              )
          )}
        </Stack>
      ),
    },
    {
      type: "Custom",

      visible: true,

      spacing: 12,
      return: (
        <Stack rowGap={2}>
          {dto.resallocationrows.map(
            (item) =>
              item.Type === "FAC" && (
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      FAC
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Current Status
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="10px">
                    <MDTypography variant="h6" color="primary">
                      Reallocation
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Percentage" name="Percentage" value={item.Percentage} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput
                      label="Sum Insured"
                      name="AllocatedAmount"
                      value={item.AllocatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt="10px">
                    <MDInput label="Premium" name="Premium" value={item.AllocatedPremium} />
                  </Grid>
                </Grid>
              )
          )}
        </Stack>
      ),
    },

    {
      type: "Button",
      label: "Add Participant",
      spacing: 12,
      visible: allocationrows.length > 0,
      justifyContent: "center",
      onClick: addParticipant,
    },

    {
      type: "AutoComplete",
      label: "Reinsurer Code",
      spacing: 4,
      visible: showparticipant,
      path: "reinsurerCode",
      options: masters.reinsurerCode,
      required: true,
      customOnChange: async (e, a) => {
        const branchData = await GetBranchCode(a.mID);
        const participantData = await GetParticipantNameByCode(a.mValue);
        dto.reinsurerCode = a.mValue;
        dto.tblParticipant.reinsurername = participantData.data[0].participantName;

        dto.tblParticipant.reInsurerId = a.mID;
        dto.reInsurerBranchId = "";
        setDto({ ...dto });
        setMasters((prevState) => ({
          ...prevState,
          reInsurerBranchCode: branchData.data[0].mdata,
        }));
      },
    },

    {
      label: "Reinsurer Name",
      path: "tblParticipant.reinsurername",
      type: "Input",
      visible: showparticipant,
      disabled: true,
      spacing: 4,
    },
    {
      type: "AutoComplete",
      label: "Branch Code",
      path: "reInsurerBranchId",
      visible: showparticipant,
      spacing: 4,
      options: masters.reInsurerBranchCode,
      customOnChange: async (e, a) => {
        dto.reInsurerBranchId = a.mValue;
        dto.tblParticipant.reInsurerBranchId = a.mID;

        setDto({ ...dto });
      },
    },

    {
      type: "AutoComplete",
      label: "Broker Code",
      path: "brokername",
      visible: showparticipant,
      spacing: 4,
      options: masters.brokerCode,
      customOnChange: async (e, a) => {
        const branchData = await GetBranchCode(a.mID);
        const participantData = await GetParticipantNameByCode(a.mValue);

        dto.tblParticipant.brokername = participantData.data[0].participantName;

        dto.brokername = a.mValue;
        dto.brokerCodeId = a.mID;
        setDto({ ...dto });
        setMasters((prevState) => ({ ...prevState, brokerBranch: branchData.data[0].mdata }));
      },
    },

    {
      label: "Broker Name",
      path: "tblParticipant.brokername",
      type: "Input",
      visible: showparticipant,
      disabled: true,
      spacing: 4,
    },

    {
      type: "AutoComplete",
      label: "Branch Code",
      path: "brokerBranchId",
      visible: showparticipant,
      spacing: 4,
      options: masters.brokerBranch,
      customOnChange: async (e, a) => {
        dto.brokerBranchId = a.mValue;
        dto.tblParticipant.brokerBranchId = a.mID;

        setDto({ ...dto });
      },
    },
    {
      type: "Input",
      label: "Share(%)",
      path: "tblParticipant.sharePercentage",

      visible: showparticipant,
      required: true,
      spacing: 4,
    },
    {
      type: "Input",
      label: "Brokerage(%)",
      path: "tblParticipant.brokeragePercentage",
      visible: showparticipant,
      spacing: 4,
    },

    {
      type: "Input",
      label: "RICommision(%)",
      path: "tblParticipant.ricommissionPercentage",
      visible: showparticipant,
      spacing: 4,
    },
    {
      type: "AutoComplete",
      label: "Bordereaux Frequency",
      path: "bordereauxFrequency",
      visible: showparticipant,
      spacing: 4,
      options: masters.bordereauxFrequency,
      customOnChange: async (e, a) => {
        dto.bordereauxFrequency = a.mValue;
        dto.tblParticipant.bordereauxFreqId = a.mID;

        setDto({ ...dto });
      },
    },

    {
      type: "Typography",
      label: "",
      visible: showparticipant,
      spacing: 6,
    },
    {
      type: "Button",
      label: "Save Participant",
      spacing: 6,
      visible: showparticipant,
      justifyContent: "right",
      onClick: saveParticipant,
    },
    {
      type: "Button",
      label: "Modify Reallocation",
      spacing: 12,
      visible: allocationrows.length > 0,
      justifyContent: "right",
      onClick: ModifyReallocation,
    },
  ];
  /* eslint-enable */

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <MDTypography sx={headingStyle}>Policy Details</MDTypography>
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
                    <NewRenderControl item={item} dto={dto} setDto={setDto} />
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default ReallocationTest;
