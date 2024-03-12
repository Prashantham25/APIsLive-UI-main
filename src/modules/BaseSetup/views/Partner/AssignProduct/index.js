import { useState, useEffect } from "react";
import {
  Grid,
  // Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
  ListItemIcon,
  Checkbox,
  List,
  Paper,
  ListItem,
  Modal,
  CircularProgress,
  Backdrop,
  Card,
  Radio,
} from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GridToolbar } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
// import RuleConfig from "../RuleConfig/index";
import SearchPartner from "assets/images/searching-a-person.png";
import SearchProduct from "assets/images/search-product.png";
// import AssignedProducts from "assets/images/assigned-products.png";
// import MDDataGrid from "../../components/MDDataGrid";
import MDDataGrid from "../../../../../components/MDDataGrid";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import {
  GetMasterDataAsync,
  SearchPartnerApi,
  GetProductMaster,
  GetAssignProductbyId,
  GetAssignProduct,
  GetGroupList,
  SaveAssignProduct,
  EditAssignProductDate,
  GetAttachedPlanListOfPartner,
  UpdateGroupPlans,
  CheckMasterPolicyHaveActivePolicy,
} from "../data/index";
import MDDatePicker from "../../../../../components/MDDatePicker/index";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function AssignProduct() {
  const [MasterPartnerType, setMasterPartnerType] = useState([]);
  const [MasterPartnerClass, setMasterPartnerClass] = useState([]);
  const [MasterLOB, setMasterLOB] = useState([]);
  const [MasterCOB, setMasterCOB] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [rows4, setRows4] = useState([]);
  // const [rows4Obj, setRows4Obj] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [PartnerID, setPartnerID] = useState();
  const [ProductID, setProductID] = useState();
  const [MasterPolicyNo, setMasterPolicyNo] = useState();
  const [SelectedPartner, setSelectedPartner] = useState({});
  const [selectedGroupList, setSelectedGroupList] = useState([]);

  const [searchProductFlag, setSearchProductFlag] = useState(false);
  const [ProductFlag, setProductFlag] = useState(false);
  const [GridFlag, setGridFlag] = useState(false);
  const [flag, setFlag] = useState(false);

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const navigate = useNavigate();
  const [Backdropflag, setBackdropflag] = useState(false);

  const [PartnerSearchObj, setPartnerSearchObj] = useState({
    email: "",
    mobile: "",
    pan: "",
    partnerClassId: "",
    partnerCode: "",
    partnerId: "",
    partnerName: "",
    partnerTypeId: "",
    status: "",
  });
  const [ProductSearchObj, setProductSearchObj] = useState({
    activeFrom: null,
    activeTo: null,
    cobid: "",
    createdBy: null,
    createdDate: null,
    lobid: "",
    modifyBy: null,
    modifyDate: null,
    partnerId: "",
    premiumAmount: 0,
    productCode: "",
    productId: 0,
    productName: "",
    productStatusId: 0,
  });
  const [saveObj, setSaveObj] = useState({
    assignDate: "",
    assignProductID: 0,
    effectiveFrom: "",
    effectiveTo: "",
    isActive: true,
    isPaymentReceived: true,
    lstProductId: [[]],
    partnerCode: "",
    partnerId: "",
    productId: 0,
  });
  console.log("saveObj", saveObj);
  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };
  const [dateDisable, setDateDisable] = useState(true);
  const [obj2, setObj2] = useState({
    policyEndDate: "",
  });

  const onRowClick = async (id, param, partnerid) => {
    console.log("id", id);
    setBackdropflag(true);
    setSelectedPartner(param.row);
    setGridFlag(false);
    setSaveObj({ ...saveObj, partnerId: partnerid });
    const r = await GetAssignProduct(partnerid);
    let arr = [];
    if (r) if (r.data) arr = [...r.data];

    arr.forEach((x, i) => {
      if (x.policyEndDate) {
        const x1 = x.policyEndDate.split("T")[0];
        arr[i].policyEndDate = x1;
      }
      if (x.policyStartDate) {
        const x2 = x.policyStartDate.split("T")[0];
        arr[i].policyStartDate = x2;
      }
      if (x.policyIssueDate) {
        const x3 = x.policyIssueDate.split("T")[0];
        arr[i].policyIssueDate = x3;
      }
    });

    setRows2(arr);

    setSearchProductFlag(true);
    setBackdropflag(false);
  };

  const columns1 = [
    {
      field: "select",
      headerName: "Select",
      width: 160,
      renderCell: (param) => (
        <Radio
          onClick={(e) => onRowClick(e, param, param.row.partnerId)}
          // onClick={(e) => onPolicyRowSelect(e, param.row.policyNumber, param.row.productIdPk)}
        />
      ),
    },
    {
      field: "partnerCode",
      headerName: "Partner Code",
      width: 250,
    },

    {
      field: "partnerName",
      headerName: "Partner Name",
      width: 250,
    },
    {
      field: "partnerType",
      headerName: "Partner Type",
      width: 250,
    },
    {
      field: "partnerClass",
      headerName: "Partner Class",
      width: 250,
    },
  ];
  const columns2 = [
    {
      field: "partnerName",
      headerName: "Partner Name",
      width: 150,
    },
    {
      field: "partnerCode",
      headerName: "Partner No",
      width: 150,
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "masterPolicyNo",
      headerName: "Master Policy No",
      width: 150,
    },
    {
      field: "policyIssueDate",
      headerName: "Assign Date",
      width: 120,
    },
    {
      field: "policyStartDate",
      headerName: "Effective From",
      width: 120,
    },
    {
      field: "policyEndDate",
      headerName: "Effective To",
      width: 130,
      renderCell: (p) => {
        console.log(p);
        const onDateChanger = (e, date) => {
          setObj2({ policyEndDate: date });
        };
        return (
          <MDDatePicker
            fullWidth
            onChange={(e, date) => onDateChanger(e, date)}
            value={p.row.policyEndDate}
            input={{ disabled: dateDisable }}
            options={{
              dateFormat: "Y-m-d",
              altFormat: "Y-m-d",
              altInput: true,
              minDate: p.row.policyStartDate,
            }}
          />
        );
      },
    },
    {
      field: "EditEffectiveTo",
      headerName: "Edit Effective To",
      width: 150,
      renderCell: (p) => {
        const [editFlag, setEditFlag] = useState(false);

        const onEdit = () => {
          setEditFlag(true);
          setDateDisable(false);
          console.log("pppppppp", p);
        };
        const ChangeDate = async () => {
          await EditAssignProductDate(p.row.policyId, obj2).then((r) => {
            if (r.data.status === 3) swal({ icon: "success", text: r.data.responseMessage });
          });
          setEditFlag(false);
          setDateDisable(true);
          setObj2({});
          navigate("/home/Dashboard");
        };
        const onClear = () => {
          setEditFlag(false);
          setDateDisable(true);
          setObj2({});
        };
        return (
          <div>
            {!editFlag && (
              <IconButton onClick={onEdit}>
                <EditIcon />
              </IconButton>
            )}
            {editFlag && (
              <IconButton onClick={ChangeDate}>
                <CheckIcon />
              </IconButton>
            )}
            {editFlag && (
              <IconButton>
                <ClearIcon onClick={onClear} />
              </IconButton>
            )}
          </div>
        );
      },
    },
    {
      field: "EditAssignedPlans",
      headerName: "Edit Assigned Plans",
      width: 180,
      renderCell: (p) => {
        const onEdit = async () => {
          setBackdropflag(true);
          console.log("pp", p);
          await GetAttachedPlanListOfPartner(p.row.agentId, p.row.productIdPk).then((x) => {
            setRows4(x.data.mappedSections);
            // setRows4Obj(x.data.mappedSections);
            setProductID(p.row.productIdPk);
            setPartnerID(p.row.agentId);
            setMasterPolicyNo(p.row.masterPolicyNo);
          });
          setFlag(true);
          setBackdropflag(false);
        };
        return (
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];
  const columns3 = [
    {
      field: "productName",
      headerName: "Product Name",
      width: 300,
    },

    {
      field: "groupName",
      headerName: "Section Name",
      width: 300,
    },
    {
      field: "Select",
      headerName: "Select",
      width: 150,
      renderCell: (p) => {
        const onCheckChange = (e) => {
          if (e.target.checked) {
            selectedGroupList.push(p.row);
            setSelectedGroupList(selectedGroupList);
            console.log("row", p.row);
          } else {
            const arr = selectedGroupList.filter((a) => a.groupId !== p.row.groupId);
            console.log(arr, "arr");
            setSelectedGroupList(arr);
          }
        };

        return <Checkbox onChange={onCheckChange} />;
      },
    },
  ];
  const columns4 = [
    {
      field: "groupName",
      headerName: "Plan Name",
      width: 300,
    },

    {
      field: "Select",
      headerName: "Select",
      width: 150,
      renderCell: (p) => {
        const [CheckCount, setCheckCount] = useState(p.row.isSelected ? 0 : 1);
        const onCheck = async (e) => {
          const checked11 = e.target.checked;
          const cObj = {
            plan: p.row.groupName,
            masterPolicyNo: MasterPolicyNo,
            productId: ProductID,
          };
          if (checked11 === false && CheckCount === 0) {
            const resp = await CheckMasterPolicyHaveActivePolicy(cObj);
            if (resp.data.finalResult !== "0")
              swal({ icon: "error", text: resp.data.responseMessage });
            else {
              rows4.forEach((x1, i) => {
                if (x1.groupId === p.row.groupId) rows4[i].isSelected = checked11;
              });
              setRows4([...rows4]);
              setCheckCount(CheckCount + 1);
            }
          } else {
            rows4.forEach((x1, i) => {
              if (x1.groupId === p.row.groupId) rows4[i].isSelected = checked11;
            });
            setRows4([...rows4]);
            setCheckCount(CheckCount + 1);
          }
        };
        return <Checkbox onChange={onCheck} checked={p.row.isSelected} />;
      },
    },
  ];
  const onModelClose = () => {
    setFlag(false);
  };

  const onMDChange = (e, v, type) => {
    if (e.target.name === "partnerName")
      setPartnerSearchObj({ ...PartnerSearchObj, [e.target.name]: e.target.value });
    else setPartnerSearchObj({ ...PartnerSearchObj, [type]: v.mID });
  };

  const onPartnerSearch = async () => {
    if (
      PartnerSearchObj.partnerName === "" &&
      PartnerSearchObj.partnerClassId === "" &&
      PartnerSearchObj.partnerTypeId === ""
    )
      swal({ icon: "error", text: "Please enter any one search parameter" });
    else {
      setBackdropflag(true);
      const res = await SearchPartnerApi(PartnerSearchObj);
      const arr = res.data;
      arr.forEach((ev, i) => {
        arr[i].id = i;
      });
      setRows1(res.data);
      setGridFlag(true);
      setBackdropflag(false);
    }
  };

  const onProductChange = (e, v, type) => {
    if (type === "cobid") setProductSearchObj({ ...ProductSearchObj, cobid: v.mID });
    else setProductSearchObj({ ...ProductSearchObj, [e.target.name]: e.target.value });
  };

  const onLOBClick = async (e, v) => {
    const res1 = await GetProductMaster("COB", v.mID);
    setProductSearchObj({ ...ProductSearchObj, lobid: v.mID });
    setMasterCOB(res1.data);
  };

  const onProductSearch = async () => {
    setBackdropflag(true);
    await GetAssignProductbyId(ProductSearchObj).then((res) => {
      setLeft(res.data);
    });

    setProductFlag(true);
    setBackdropflag(false);
  };

  const onDateChange = (e, d, type) => {
    if (type === "assignDate") setSaveObj({ ...saveObj, assignDate: d });
    if (type === "effectiveTo") setSaveObj({ ...saveObj, effectiveTo: d });
    if (type === "effectiveFrom") {
      const arr = d.split("-");
      const date1 = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
      console.log("date1", date1);
      const mm1 = date1.getMonth();
      const dd1 = date1.getDate();
      if (dd1 === 1 && mm1 === 0) {
        //
        date1.setMonth(12);
      } else {
        date1.setFullYear(date1.getFullYear() + 1);
      }

      date1.setDate(date1.getDate() - 1);

      const date2 = date1
        .getFullYear()
        .toString()
        .concat("-", (date1.getMonth() + 1).toString(), "-", date1.getDate().toString());

      // const yyyy = parseInt(arr[0], 10);
      // const nyyyy = yyyy + 1;
      // arr[0] = nyyyy;
      // const fDate = arr.join("-");
      setSaveObj({ ...saveObj, effectiveFrom: d, effectiveTo: date2 });
    }
  };
  const [OSFlag, setOSFlag] = useState(false);
  const onClickSave = async () => {
    if (saveObj.effectiveFrom === "" || saveObj.effectiveTo === "" || saveObj.assignDate === "") {
      setOSFlag(true);
      swal({ icon: "error", text: "Some fields are missing" });
    } else if (right.length === 0) {
      swal({ icon: "error", text: "Please select at least 1 Product" });
    } else {
      setOSFlag(false);
      setBackdropflag(true);
      const arr = [];
      right.forEach((x) => {
        arr.push({ ProductId: x.mID, SectionMapping: { MappedSections: [] }, MasterPolicy: false });
      });
      console.log("selectedGroupList", selectedGroupList);
      selectedGroupList.forEach((x1) => {
        arr.forEach((x2, i2) => {
          if (x1.productid === x2.ProductId) {
            x2.SectionMapping.MappedSections.push({
              GroupID: x1.groupId,
              GroupType: x1.groupTypeId,
              GroupName: x1.groupName,
            });
            arr[i2].MasterPolicy = true;
          }
        });
      });

      saveObj.lstProductId = [[...arr]];
      await SaveAssignProduct(saveObj).then((x) => {
        if (x.data.status === 2) {
          swal({ icon: "success", text: x.data.responseMessage });
          navigate("/home/Dashboard");
        } else swal({ icon: "error", text: x.data.responseMessage });
      });
      await GetAssignProduct(SelectedPartner.partnerId).then((r) => {
        const arr3 = r.data;
        arr3.forEach((x, i) => {
          if (x.policyEndDate) {
            const x1 = x.policyEndDate.split("T")[0];
            arr3[i].policyEndDate = x1;
          }
          if (x.policyStartDate) {
            const x2 = x.policyStartDate.split("T")[0];
            arr3[i].policyStartDate = x2;
          }
          if (x.policyIssueDate) {
            const x3 = x.policyIssueDate.split("T")[0];
            arr3[i].policyIssueDate = x3;
          }
        });
        setRows2(arr3);
      });
      setBackdropflag(false);
      console.log("onSave", saveObj);

      setLeft([...left, ...right]);
      setRight([]);
      setOSFlag(false);
      saveObj.assignDate = "";
      saveObj.effectiveFrom = "";
      saveObj.effectiveTo = "";
      setSaveObj({ ...saveObj });
    }
  };

  const onUpdate = async () => {
    const updateObj = {
      MappedSections: [],
    };
    const TArr = [];
    rows4.forEach((r) => {
      if (r.isSelected === true)
        TArr.push({ GroupID: r.groupId, GroupName: r.groupName, GroupType: r.groupTypeID });
    });
    updateObj.MappedSections = TArr;
    await UpdateGroupPlans(ProductID, PartnerID, updateObj).then((x) => {
      if (x.data.status === 3)
        swal({
          icon: "success",
          text: x.data.responseMessage,
          buttons: {
            buttonTwo: {
              text: "OK",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            setFlag(false);
          }
        });
      else {
        swal({
          icon: "error",
          text: x.data.responseMessage,
          buttons: {
            buttonTwo: {
              text: "Cancel",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            setFlag(false);
          }
        });
      }
    });
  };

  useEffect(async () => {
    const res1 = await GetMasterDataAsync();
    res1.data.forEach((x) => {
      if (x.mType === "PartnerType") setMasterPartnerType(x.mdata);
      if (x.mType === "PartnerClass") setMasterPartnerClass(x.mdata);
    });
    const res2 = await GetProductMaster("LOB", 0);
    setMasterLOB(res2.data);
  }, []);

  const handleAllRight = async () => {
    setRight(right.concat(left));
    setLeft([]);
    console.log("handleAllRight", right.concat(left));
    const arr1 = [];
    right.concat(left).forEach((x) => arr1.push(x.mID));

    const arr2 = [];
    await GetGroupList(arr1).then((res) => {
      res.data.forEach((r1) => {
        r1.groupData.forEach((r2) => {
          arr2.push({
            groupId: r2.groupId,
            groupTypeId: r2.groupTypeId,
            groupName: r2.groupName,
            productName: r1.productName,
            productid: r1.productid,
          });
        });
      });
    });
    setRows3(arr2);
  };

  const handleCheckedRight = async () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    const arr1 = [];
    right.concat(leftChecked).forEach((x) => arr1.push(x.mID));
    const arr2 = [];
    await GetGroupList(arr1).then((res) => {
      res.data.forEach((r1) => {
        r1.groupData.forEach((r2) => {
          arr2.push({
            groupId: r2.groupId,
            groupTypeId: r2.groupTypeId,
            groupName: r2.groupName,
            productName: r1.productName,
            productid: r1.productid,
          });
        });
      });
    });
    setRows3(arr2);
  };

  const handleCheckedLeft = async () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    const arr1 = [];
    not(right, rightChecked).forEach((x) => arr1.push(x.mID));
    const arr2 = [];
    await GetGroupList(arr1).then((res) => {
      res.data.forEach((r1) => {
        r1.groupData.forEach((r2) => {
          arr2.push({
            groupId: r2.groupId,
            groupTypeId: r2.groupTypeId,
            groupName: r2.groupName,
            productName: r1.productName,
            productid: r1.productid,
          });
        });
      });
    });
    setRows3(arr2);
  };

  const handleAllLeft = async () => {
    setLeft(left.concat(right));
    setRight([]);
    const arr1 = [];
    [].forEach((x) => arr1.push(x.mID));
    const arr2 = [];
    await GetGroupList(arr1).then((res) => {
      res.data.forEach((r1) => {
        r1.groupData.forEach((r2) => {
          arr2.push({
            groupId: r2.groupId,
            groupTypeId: r2.groupTypeId,
            groupName: r2.groupName,
            productName: r1.productName,
            productid: r1.productid,
          });
        });
      });
    });
    setRows3(arr2);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const customList = (items) => (
    <Paper sx={{ width: 500, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.label} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <MDBox p={2}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Backdropflag}
      >
        <CircularProgress />
      </Backdrop>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
              }}
            >
              <MDBox component="img" src={SearchPartner} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            Search Partner
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Partner Name"
                name="partnerName"
                value={PartnerSearchObj.partnerName}
                onChange={onMDChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerType}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                renderInput={(params) => <MDInput {...params} label="Partner Type" />}
                onChange={(e, v) => onMDChange(e, v, "partnerTypeId")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerClass}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                renderInput={(params) => <MDInput {...params} label="Partner Class" />}
                onChange={(e, v) => onMDChange(e, v, "partnerClassId")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onPartnerSearch}>SEARCH</MDButton>
              </MDBox>
            </Grid>

            {GridFlag && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ width: "100%" }}>
                  <MDDataGrid
                    autoHeight
                    rows={rows1}
                    columns={columns1}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.id}
                    // onRowClick={(id) => onRowClick(id)}
                  />
                </MDBox>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {searchProductFlag && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
              <Card
                sx={{
                  backgroundColor: "#ff4d4d",
                }}
              >
                <MDBox component="img" src={SearchProduct} sx={{ width: "100%" }} />
              </Card>
            </Grid>
            <MDTypography variant="body1" color="primary">
              Search Product
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography variant="body1" color="primary">
                    Partner Name :{SelectedPartner.partnerName}{" "}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Product Code"
                  name="productCode"
                  value={ProductSearchObj.productCode}
                  onChange={onProductChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Product Name"
                  name="productName"
                  value={ProductSearchObj.productName}
                  onChange={onProductChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterLOB}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="Line of Business" />}
                  onChange={onLOBClick}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCOB}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="Class of Business" />}
                  onChange={(e, v) => onProductChange(e, v, "cobid")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onProductSearch}>SEARCH</MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {ProductFlag && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="body1" color="primary">
              Products
            </MDTypography>
          </AccordionSummary>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="body2" color="primary">
              Product Code- Product Name
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item>{customList(left)}</Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <MDButton
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                  >
                    ≫
                  </MDButton>
                  <MDButton
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                  >
                    &gt;
                  </MDButton>
                  <MDButton
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                  >
                    &lt;
                  </MDButton>
                  <MDButton
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                  >
                    ≪
                  </MDButton>
                </Grid>
              </Grid>
              <Grid item>{customList(right)}</Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography> </MDTypography>
              </Grid>
              {rows3.length > 0 && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ width: "100%" }}>
                    <MDDataGrid
                      autoHeight
                      rows={rows3}
                      columns={columns3}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      pageSizeOptions={[5, 10, 15, 20]}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      components={{ Toolbar: GridToolbar }}
                      editField="inEdit"
                      getRowId={(row) => row.groupId}
                      pagination
                    />
                  </MDBox>
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  fullWidth
                  input={{
                    value: saveObj.assignDate,
                    label: "Assign Date",
                    required: true,
                    error: OSFlag && saveObj.assignDate === "",
                    helperText: OSFlag && saveObj.assignDate === "" && "This Field is Required",
                  }}
                  value={saveObj.assignDate}
                  onChange={(e, date) => onDateChange(e, date, "assignDate")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "Y-m-d",
                    altInput: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  fullWidth
                  input={{
                    value: saveObj.effectiveFrom,
                    label: "Effective From",
                    required: true,
                    error: OSFlag && saveObj.effectiveFrom === "",
                    helperText: OSFlag && saveObj.effectiveFrom === "" && "This Field is Required",
                  }}
                  value={saveObj.effectiveFrom}
                  onChange={(e, date) => onDateChange(e, date, "effectiveFrom")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "Y-m-d",
                    altInput: true,
                    maxDate: saveObj.effectiveTo,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  fullWidth
                  input={{
                    value: saveObj.effectiveTo,
                    label: "Effective To",
                    required: true,
                    error: OSFlag && saveObj.effectiveTo === "",
                    helperText: OSFlag && saveObj.effectiveTo === "" && "This Field is Required",
                  }}
                  value={saveObj.effectiveTo}
                  onChange={(e, date) => onDateChange(e, date, "effectiveTo")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "Y-m-d",
                    altInput: true,
                    minDate: saveObj.effectiveFrom, // new Date(saveObj.effectiveFrom)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onClickSave}>Save</MDButton>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
                  <Card
                    sx={{
                      backgroundColor: "#ff4d4d",
                    }}
                  >
                    <MDBox component="img" src={AssignedProducts} sx={{ width: "100%" }} />
                  </Card>
                </Grid> */}
                <MDTypography variant="body1" color="primary">
                  Assigned Products
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ width: "100%" }}>
                  <MDDataGrid
                    autoHeight
                    rows={rows2}
                    columns={columns2}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.policyId}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      <Modal
        open={flag}
        sx={{
          display: "flex",
          // flexDirection: "column",
          // border: "2px solid black",
          // overflowY: "scroll",
          // width: "50%",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Accordion>
          <Grid container spacing={4} p={5}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onModelClose}>X</MDButton>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDTypography variant="body1" color="primary">
                  Assigned Plans
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDDataGrid
                  autoHeight
                  rows={rows4}
                  columns={columns4}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  editField="inEdit"
                  getRowId={(row) => row.groupId}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onUpdate}>Update</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Accordion>
      </Modal>
    </MDBox>
  );
}
export default AssignProduct;
