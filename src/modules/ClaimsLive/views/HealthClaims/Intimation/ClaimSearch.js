import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TableCell,
  TableBody,
  TableRow,
  Chip,
  Table,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import CustomDropDown from "components/CustomDropDown/index";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDInput from "components/MDInput";
import getGridData from "../../GenericClaims/ClaimProcessingSearch/data/index";
import { setClaimsJson, useDataController, setpolicyData } from "../../../../BrokerPortal/context";
import {
  getProdPartnermasterData, // benefit type autocomplete option
  getAllClaimDetail, // search claim button
  SearchClaimDetailsByRegClaimNo, // navigate
  getPolicyDetails, // navigate
  getProdPartnermasterDatastatus, // claim status autocomplete option
} from "../data/index";
import MDButton from "../../../../../components/MDButton";

function ClaimSearch() {
  const [claimData, setClaimData] = useState({
    COINumber: "",
    ClaimNumber: "",
    UHID: "",
    ClaimStatus: "",
    BenefitType: "",
    productId: 1022,
    pageNumber: 1,
    pageSize: 10,
  });

  const [Search, setSearch] = useState(false);
  const [Benifite, setBenifite] = useState([]);
  const [ClaimStatus, setClaimStatus] = useState([]);
  const [Rows, setRows] = useState([]);
  const [rowntoshow, setRowtoShow] = useState(false);
  const [Rowtotable, setRowtotable] = useState([]);
  // Navigation
  const [controller, dispatch] = useDataController();
  const { ClaimsJson } = controller;
  const [ProductCode, setProductCode] = useState("");
  console.log("product", ProductCode);
  const [gridData, setGridData] = useState([]);
  console.log("griddata1", gridData);
  const [input, setInput] = useState({
    claim: false,
    PatientName: false,
    coi: false,
    status: false,
    type: false,
    Benifite: false,
    nextpage: false,
    productId: 1022,
  });
  const [valid, setvalid] = useState(false);
  const [errors, setError] = useState([{ claim: false, uhid: false, coi: false }]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); // Set your desired rows per page
  console.log("trueeeeee", input.claim);
  useEffect(async () => {
    const data = {
      MasterType: "BenefitType",
    };
    const data1 = { productId: 1022, MasterType: "BenefitType" };
    const abc = await getProdPartnermasterData(data1.productId, data1.MasterType, data);
    const master = abc.data;
    setBenifite(master);
    console.log("adccc", data);
  }, []);

  useEffect(async () => {
    const data = {
      MasterType: "ClaimStatus",
    };
    const data1 = { productId: 1022, MasterType: "ClaimStatus" };
    const abc = await getProdPartnermasterDatastatus(data1.productId, data1.MasterType, data);
    const master = abc.data;

    // Filter out the unwanted values
    const filteredClaimStatus = master.filter(
      (item) =>
        item.mValue !== "Claim Approved" &&
        item.mValue !== "Assigned to Investigation" &&
        item.mValue !== "Claim Reffered Back" &&
        item.mValue !== "Refer To Medical Adjudicator"
    );

    // Add 'Claim under investigation' to the filtered array
    filteredClaimStatus.push({ mID: "235", mValue: "Claim under investigation" });

    setClaimStatus(filteredClaimStatus);
    console.log("adccc1", ClaimStatus);
  }, []);

  const [obj1, setObj1] = useState([]);
  const onInd = (e) => {
    setObj1([...e]);
    const selectedValuesStatus = [...e].map((option) => option.mValue);
    const selectedValuesStatusString = selectedValuesStatus.join(",");
    claimData.ClaimStatus = selectedValuesStatusString;
    setClaimData({ ...claimData });
    console.log("123", claimData);
  };

  const [obj2, setObj2] = useState([]);
  const onInd1 = (e) => {
    setObj2([...e]);
    const selectedValuesStatus = [...e].map((option) => option.mValue);
    const selectedValuesStatusString = selectedValuesStatus.join(",");
    claimData.BenefitType = selectedValuesStatusString;
    setClaimData({ ...claimData });
    console.log("123", claimData);
  };

  const totalPages = Math.floor(Rows.length / rowsPerPage);
  console.log("123", totalPages);
  const handlePrevPage = async () => {
    setPage((prevPage) => prevPage - 1);
    setLoading(true);
    console.log("prevpage", page);
    claimData.pageNumber = page;
    setClaimData(claimData);

    const passclaimSearch = await getAllClaimDetail(claimData);
    if (passclaimSearch.data.length > 0) {
      setError(false);
      setSearch(true);
      const row = passclaimSearch.data;
      setRowtotable(row);
      setLoading(false);
      setRows(row);
      console.log("123", Rows);
      setRowtoShow(false);
    }
  };

  const handleNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
    claimData.pageNumber = page + 2;
    setClaimData(claimData);
    console.log("claimdataaa", claimData);
    const passclaimSearch = await getAllClaimDetail(claimData);
    if (passclaimSearch.data.length > 0) {
      setError(false);
      setSearch(true);
      const row = passclaimSearch.data;
      setRowtotable(row);
      setLoading(false);
      setRows(row);
      console.log("123", Rows);
      setRowtoShow(false);
    }
    setLoading(false);
  };
  console.log("page", page);
  const navigate = useNavigate();
  const onNext = async (rowid) => {
    setLoading(true);
    const dataByClaimNo = await SearchClaimDetailsByRegClaimNo("", rowid);
    const abc = dataByClaimNo.finalResult;
    // abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [];
    abc.transactionDataDTO[0].transactionDetails.investigatorDetails = [];
    abc.transactionDataDTO[0].transactionDetails.SearchDisableFlag = "true";
    setClaimsJson((prev) => ({ ...prev, ...abc }));
    console.log("abc", abc);
    const result = await getPolicyDetails(abc.policyNo);
    console.log("resultmagma", result);
    if (result.status === 200) {
      const data = getGridData(result.data.ProductCode);
      setpolicyData(dispatch, result.data);
      setProductCode(result.data.ProductCode);
      setClaimsJson(dispatch, { ...abc });
      console.log("ABCdata", { ...abc });
      if (data !== null) {
        setGridData(data);
        setLoading(false);
        navigate(`/Claim/Processing`, {
          state: {
            gridData: { ...abc },
            productCode: "MagmaHospiCash01",
          },
        });
      }
    }
    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
  };

  const handleChange = async (e) => {
    if (e.target.name === "ClaimNumber") {
      if (e.target.value.length < 240) {
        const numRegex = /^[A-Z0-9'//]*$/;
        if (numRegex.test(e.target.value)) {
          setClaimData({ ...claimData, [e.target.name]: e.target.value });
        }
      }
    }
    if (e.target.name === "COINumber") {
      if (e.target.value.length < 240) {
        const numRegex = /^[A-Z0-9'//-]*$/;
        if (numRegex.test(e.target.value)) {
          setClaimData({ ...claimData, [e.target.name]: e.target.value });
        }
      }
    }
    if (e.target.name === "UHID") {
      if (e.target.value.length < 18) {
        const numRegex = /^[A-Z0-9]*$/;
        if (numRegex.test(e.target.value)) {
          setClaimData({ ...claimData, [e.target.name]: e.target.value });
          console.log("Claim", claimData);
        }
      }
    }
  };

  const handleSearch = async () => {
    claimData.pageNumber = 1;
    setClaimData(claimData);
    setLoading(true);
    const passclaimSearch = await getAllClaimDetail(claimData);
    if (passclaimSearch.data.length > 0) {
      setError(false);
      setSearch(true);
      const row = passclaimSearch.data;
      setRowtotable(row);
      setLoading(false);
      setRows(row);
      console.log("123", Rows);
      setRowtoShow(false);
    } else {
      if (claimData.ClaimNumber !== "") {
        if (
          claimData.ClaimNumber !== "" &&
          (claimData.BenefitType !== "" || claimData.ClaimStatus !== "")
        ) {
          setError({ claim: false });
        } else {
          setError({ claim: true });
        }
        setRowtoShow(false);
        setSearch(false);
      }
      if (claimData.UHID !== "") {
        if (
          claimData.UHID !== "" &&
          (claimData.BenefitType !== "" || claimData.ClaimStatus !== "")
        ) {
          setError({ uhid: false });
        } else {
          setError({ uhid: true });
        }
        setRowtoShow(false);
        setSearch(false);
      }
      if (claimData.COINumber !== "") {
        if (
          claimData.COINumber !== "" &&
          (claimData.BenefitType !== "" || claimData.ClaimStatus !== "")
        ) {
          setError({ coi: false });
        } else {
          setError({ coi: true });
        }
        setRowtoShow(false);
        setSearch(false);
      }
      if (claimData.BenefitType !== "" || claimData.ClaimStatus !== "") {
        setRowtoShow(true);
        setSearch(true);
      }
      setLoading(false);
    }
  };

  const handleSearchTable = (e) => {
    // debugger;
    if (e.target.name === "patientname") {
      const patientname = Rowtotable.filter(
        (item) => item.patientName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      if (patientname.length === 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
      setRows(patientname);
    }
    if (e.target.name === "claim") {
      const claim = Rowtotable.filter(
        (item) => item.claimNO.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      if (claim.length === 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
      setRows(claim);
    }

    if (e.target.name === "Coi") {
      const coi = Rowtotable.filter(
        (item) => item.coiNumber.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      if (coi.length === 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
      setRows(coi);
    }
    if (e.target.name === "benifite") {
      const benifite = Rowtotable.filter(
        (item) => item.benefitType.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      setRows(benifite);
      if (benifite.length === 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
      setRows(benifite);
    }
    if (e.target.name === "status") {
      const status = Rowtotable.filter(
        (item) => item.claimStatus.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      if (status.length === 0) {
        setvalid(true);
      } else {
        setvalid(false);
      }
      setRows(status);
    }
    if (!e.target.value) {
      setRows(Rowtotable);
      setvalid(false);
    }
  };

  return (
    <Card>
      <Grid container p={2}>
        <MDTypography variant="body1" color="primary">
          Claims Search
        </MDTypography>
      </Grid>
      <Grid container spacing={4} p={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="COI NO"
            name="COINumber"
            onChange={handleChange}
            value={claimData.COINumber}
          />
          {errors.coi === true && claimData.COINumber !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "12px" }}>
              Please enter valid COI Number
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="UHID ID" name="UHID" onChange={handleChange} value={claimData.UHID} />
          {errors.uhid === true && claimData.UHID !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "12px" }}>
              Please enter valid UHID Number
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Claim No"
            name="ClaimNumber"
            onChange={handleChange}
            value={claimData.ClaimNumber}
          />
          {errors.claim === true && claimData.ClaimNumber !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "12px" }}>
              Please enter valid Claim Number
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <CustomDropDown
            label="Claim Status"
            options={[...ClaimStatus]}
            optionLabel="mValue"
            optionId="mID"
            onChange={onInd}
            value={obj1}
            all="true"
            // sx={{ width: 500 }}
            // sx={{
            //   "& .MuiOutlinedInput-root": {
            //     padding: "4px!important",
            //   },
            // }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <CustomDropDown
            label="Benefit Type"
            options={[...Benifite]}
            optionLabel="mValue"
            optionId="mID"
            onChange={onInd1}
            value={obj2}
            all="true"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={63}>
          <MDButton
            startIcon={<SearchIcon />}
            color="error"
            onClick={handleSearch}
            // disabled={
            //   claimData.ClaimNumber.length !== 24 &&
            //   // claimData.COINumber.length !== 32 &&
            //   claimData.UHID.length !== 17 &&
            //   claimData.BenefitType === "" &&
            //   claimData.ClaimStatus === ""
            // }
          >
            Search Claims
          </MDButton>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
        </Grid>
      </Grid>
      {Search && (
        <>
          <Grid container ml={2} width="100%" mt={1}>
            <Table aria-label="simple table" width="100%">
              <TableRow tabIndex={-2}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Claim No
                  <IconButton
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        claim: !prevInput.claim,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.claim === true ? (
                      <MDInput name="claim" onChange={handleSearchTable} />
                    ) : null}
                    {valid === true && input.claim === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null}
                  </Grid>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Patient Name
                  <IconButton
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        PatientName: !prevInput.PatientName,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.PatientName === true ? (
                      <MDInput name="patientname" onChange={handleSearchTable} />
                    ) : null}
                    {valid === true && input.PatientName === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null}
                  </Grid>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  COI Holder Name
                  <IconButton
                    name="Coi"
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        coi: !prevInput.coi,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.coi === true ? (
                      <MDInput name="Coi" onChange={handleSearchTable} />
                    ) : null}
                    {valid === true && input.coi === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null}
                  </Grid>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Claim Type
                  <IconButton
                    name="type"
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        type: !prevInput.type,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.type === true ? <MDInput name="type" /> : null}
                    {/* {valid === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null} */}
                  </Grid>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Benefit Type
                  <IconButton
                    name="benifite"
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        Benifite: !prevInput.Benifite,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.Benifite === true ? (
                      <MDInput name="benifite" onChange={handleSearchTable} />
                    ) : null}
                    {valid === true && input.Benifite === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null}
                  </Grid>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Claim Status
                  <IconButton
                    onClick={() =>
                      setInput((prevInput) => ({
                        ...prevInput,
                        status: !prevInput.status,
                      }))
                    }
                  >
                    <SearchIcon />
                  </IconButton>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {input.status === true ? (
                      <MDInput name="status" onChange={handleSearchTable} />
                    ) : null}
                    {valid === true && input.status === true ? (
                      <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                        No match found
                      </MDTypography>
                    ) : null}
                  </Grid>
                </TableCell>
              </TableRow>
              {rowntoshow === true ? (
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>No Matches Found</TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {Rows.map((row) => (
                    <TableRow>
                      <TableCell
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => onNext(row.claimNO)}
                      >
                        {row.claimNO}
                      </TableCell>

                      {/* <TableCell>{row.id}</TableCell> */}
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.coiHolderName}</TableCell>
                      <TableCell>Reimbursement</TableCell>
                      <TableCell>{row.benefitType}</TableCell>
                      <TableCell>
                        <Chip label={row.claimStatus} style={{ color: "#000000" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Grid>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "0 25px" }}>
                <div>
                  <IconButton onClick={handlePrevPage} disabled={page === 0}>
                    <KeyboardArrowLeft />
                    <span style={{ fontSize: "15px" }}>PREVIOUS</span>
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={handleNextPage} disabled={totalPages === 0}>
                    <span style={{ fontSize: "15px" }}>NEXT</span>
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}
export default ClaimSearch;
