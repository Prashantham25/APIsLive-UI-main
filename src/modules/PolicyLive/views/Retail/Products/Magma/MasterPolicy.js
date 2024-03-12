import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../BrokerPortal/context";
import {
  GetAllMasterPolicyDetails,
  GetAssignProductByMasterPolicyNumber,
  GetPermissions,
} from "./data/index";

export default function ListOfMaster() {
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericPolicyDto } = control;
  let dto = genericPolicyDto;
  const [id, setId] = useState();
  const { genericInfo } = control;
  const [listDetails, setListDetails] = useState([]);
  console.log("genericInfo", genericInfo);

  useEffect(async () => {
    const response = await GetAllMasterPolicyDetails();
    setListDetails(response);
  }, []);
  console.log(id);
  const magmauserid = localStorage.getItem("userId");
  const MagmaMaster = localStorage.getItem("roleId");
  const onMP = async (params) => {
    // console.log(params);
    // setGenericInfo(dispatch, {
    //   ...genericInfo,
    //   prod: "MagmaMasterPolicy",
    //   prodlabel: "Master Policy",

    // });
    const permission = await GetPermissions(magmauserid, MagmaMaster);
    console.log("permission", permission);
    const urlJson = JSON.parse(permission[0]?.url);
    console.log("urlJson", urlJson);
    const parameters = urlJson.parametersList;
    const EnabledPathArray = [];
    parameters.forEach((x) => {
      if (x.parameterPath !== "AdditionalDetails.Questionnaire.0.QText") {
        EnabledPathArray.push({ parameterPath: x.parameterPath });
      } else {
        EnabledPathArray.push({
          parameterPath: "AdditionalDetails.Questionnaire.0.QText",
          isArray: true,
        });
      }
    });

    const navigation = urlJson.navigationButtons;
    const EnableButton = [];
    navigation.forEach((y) => {
      if (y.button1 !== "" || y.button2 !== "") {
        EnableButton.push({ button1: y.button1, button2: y.button2 });
      }
    });
    console.log("EnableButton", EnableButton);
    setGenericInfo(dispatch, {
      ...genericInfo,
      prod: "MagmaMasterPolicy",
      prodLabel: "Master Policy",
      Endorsement: true,
      EndorsementControlList: EnabledPathArray,
      EndorsementNavigationList: EnableButton,
    });
    const res = await GetAssignProductByMasterPolicyNumber(params);
    const masterpolicyJson = res.finalResult[0].masterPolicyDetails;
    console.log("GetAssignProductByMasterPolicyNumber1111111111", res.finalResult[0]);
    masterpolicyJson.agentId = res.finalResult[0].agentId;
    masterpolicyJson.productIdPk = res.finalResult[0].productIdPk;
    console.log("GetAssignProductByMasterPolicyNumber", masterpolicyJson);
    dto = masterpolicyJson;
    dto.MasterPolicyNo = params;
    setGenericPolicyDto(dispatch, dto);
    Navigate(`/retail?MasterID=${params}`);
  };
  const rows = listDetails.map((x, index) => ({
    id: index,
    MasterPolicyNo: x.masterPolicyNo,
    StartDate: new Date(x.masterPolicyDetails.PolicyStartDate).toLocaleDateString("en-GB"),
    EndDate: new Date(x.masterPolicyDetails.PolicyEndDate).toLocaleDateString("en-GB"),
    MasterPolicyHolderName: x.masterPolicyDetails.MasterPolicyHolderName,
    CustomerID: x.masterPolicyDetails?.ProposerDetails?.CustomerID,
    // CustomerID:
    //   x.masterPolicyDetails &&
    //   x.masterPolicyDetails.ProposerDetails &&
    //   x.masterPolicyDetails.ProposerDetails.CustomerID,
    Intermediary:
      x.masterPolicyDetails &&
      x.masterPolicyDetails.Channel &&
      x.masterPolicyDetails.Channel.IntermediaryCode,
    Bussiness:
      x.masterPolicyDetails &&
      x.masterPolicyDetails.ProposerDetails &&
      x.masterPolicyDetails.ProposerDetails.BusinessType,
    Proposer:
      x.masterPolicyDetails &&
      x.masterPolicyDetails.ProposerDetails &&
      x.masterPolicyDetails.ProposerDetails.FirstName,
    ProposerType: x.masterPolicyDetails.PolicyCoverType,
    UnderWritingStatus: x.masterPolicyDetails && x.masterPolicyDetails.underWriterStatus,
    ClaimsStatus: x.masterPolicyDetails && x.masterPolicyDetails.claimsStatus,
    OperationsStatus: x.masterPolicyDetails && x.masterPolicyDetails.operationsStatus,
  }));

  const columns = [
    {
      field: "MasterPolicyNo",
      headerName: "Master Policy No",
      headerAlign: "center",
      align: "center",
      width: 190,

      renderCell: (params) => {
        const rowId = params.row.id;
        setId(params.row.id);
        console.log("concateRowId", rowId);
        return (
          <MDButton variant="text" onClick={() => onMP(params.row.MasterPolicyNo)}>
            {params.row.MasterPolicyNo}
          </MDButton>
        );
      },
    },
    {
      field: "StartDate",
      headerName: "MP Start Date",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "EndDate",
      headerName: "MP End Date",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "MasterPolicyHolderName",
      headerName: "Master Policy Holder Name",
      headerAlign: "center",
      align: "center",
      width: 180,
    },
    {
      field: "OperationsStatus",
      headerName: "Operations Status",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "ClaimsStatus",
      headerName: "Claims Status",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "UnderWritingStatus",
      headerName: "UnderWriting Status",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "CustomerID",
      headerName: "Customer ID",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "Intermediary",
      headerName: "Intermediary Code",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "Bussiness",
      headerName: "Bussiness Type",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    // {
    //   field: "Proposer",
    //   headerName: "Proposer Name",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 160,
    // },
    {
      field: "ProposerType",
      headerName: "Proposer Type",
      headerAlign: "center",
      align: "center",
      width: 180,
    },
  ];
  return (
    <Card>
      <MDTypography variant="h3" ml={2} mb={4}>
        Master Policies
      </MDTypography>
      <MDBox sx={{ height: 600, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </MDBox>
    </Card>
  );
}
