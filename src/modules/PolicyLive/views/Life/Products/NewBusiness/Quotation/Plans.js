import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Chip, Grid, Stack, Drawer, IconButton, Icon, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import documentLoadingImg from "assets/images/Gifs/DocumentLoader.gif";

import MDBox from "../../../../../../../components/MDBox";
// import MDButton from "../../../../../../../components/MDButton";
import PlanCard from "../data/PlanCard";
import MDTypography from "../../../../../../../components/MDTypography";
import MDInput from "../../../../../../../components/MDInput";
import { GeneratePDF, GetContact, GetProdPartnerMasterData, SaveContact } from "../data";
import MDButton from "../../../../../../../components/MDButton";
import { useDataController, setLifeDetails } from "../../../../../../BrokerPortal/context";
import MDLoader from "../../../../../../../components/MDLoader";
import GetTranslate from "../../../../../../../components/Translation/GetTranslate";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function ImportAll(brands) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

// function PDFViewer({ base64Pdf }) {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(null);

//   useEffect(() => {
//     const iframe = document.getElementById("pdfIframe");

//     iframe.src = `data:application/pdf;base64,${base64Pdf}#page=${pageNumber}`;

//     iframe.onload = () => {
//       // Extract total number of pages from the iframe content
//       const pageCount = iframe.contentWindow.document.querySelector(".page").dataset.pageNumber;
//       setNumPages(parseInt(pageCount, 10));
//     };
//   }, [base64Pdf, pageNumber]);

//   const handlePreviousPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (pageNumber < numPages) {
//       setPageNumber(pageNumber + 1);
//     }
//   };

//   return (
//     <div>
//       <iframe
//         id="pdfIframe"
//         title="PDF Viewer"
//         width="100%"
//         height="500px"
//         style={{ border: "1px solid #ccc" }}
//       >
//         Your browser does not support embedded PDF files.
//       </iframe>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//       <button onClick={handlePreviousPage} disabled={pageNumber === 1} type="button">
//         Previous Page
//       </button>
//       <button onClick={handleNextPage} disabled={pageNumber === numPages} type="button">
//         Next Page
//       </button>
//     </div>
//   );
// }

export default function Plans({ editFlag, onModalClose, chosenPlans, productList }) {
  const [controller, dispatch] = useDataController();

  const [productsList, setProductsList] = useState([]);
  const [productType, setProductType] = useState(0);
  const [selectedPlans, setSelectedPlans] = useState(Array.isArray(chosenPlans) ? chosenPlans : []);
  const [planDetails, setPlanDetails] = useState({ flag: false, planName: "" });
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [LeadDetails, setLeadDetails] = useState({});

  const [base64Pdf, setBase64Pdf] = useState("");

  const { channelDetails } = controller;
  const maxPlanCount = channelDetails.ChannelType === "A2C" ? 5 : 1;
  const navigateURl =
    channelDetails.ChannelType === "A2C"
      ? `/Quotation?page=Generate Quote`
      : `/eSales/liconline/setprop?plan=`;

  const matchesSm = useMediaQuery("(min-width:400px)");
  const matchesXl = useMediaQuery("(min-width:1000px)");
  const cardRef = useRef(null);
  const [boxPosition, setBoxPosition] = useState({});

  const navigate = useNavigate();
  const { search } = useLocation();
  const LeadId = new URLSearchParams(search).get("LeadId");

  const plansType = [
    { label: "All Plans", productType: 0 },
    { label: "Endowment", productType: 5 },
    { label: "Whole Life", productType: 12 },
    { label: "Money Back", productType: 10 },
    { label: "Health Plans", productType: 7 },
    { label: "Term Assurance", productType: 8 },
    { label: "Pension", productType: 6 },
    { label: "ULIP", productType: 11 },
  ];

  const onPlanSelect = (e, planNumber, ProductId, Product) => {
    if (e.target.checked === true) {
      if (selectedPlans.length < maxPlanCount)
        setSelectedPlans([
          ...selectedPlans,
          { planNumber, ProductId, Product, mID: ProductId, mValue: Product },
        ]);
    } else setSelectedPlans(selectedPlans.filter((x) => x.planNumber !== planNumber));
  };

  useEffect(async () => {
    await GetContact(LeadId).then((res) => {
      console.log("res", res);
      setLeadDetails(res.finalResult);
    });
  }, [LeadId !== "" && LeadId !== null]);

  useEffect(async () => {
    if (planDetails.planName !== "" && planDetails.flag === true) {
      setBase64Pdf("");
      const response = await GeneratePDF(
        `${planDetails.planName.replace("LIC's ", "").split(" ").join("")}_PlanDetails`,
        {}
      );
      console.log("Testing", response.fileUploadResp.fileData, base64Pdf);
      setBase64Pdf(response.fileUploadResp.fileData);
    }
  }, [planDetails]);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const { width } = cardRef.current.getBoundingClientRect();
      setBoxPosition({ left: cardRef.current.offsetLeft, width });
    }
    const handleResize = () => {
      setTimeout(() => {
        if (cardRef.current) {
          const { width } = cardRef.current.getBoundingClientRect();
          setBoxPosition({ left: cardRef.current.offsetLeft, width });
        }
      }, 0);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const images = ImportAll(require.context("assets/images/Life/LICProducts", false));

  useEffect(async () => {
    if (!Array.isArray(productList)) {
      setLoading(true);
      const res = await GetProdPartnerMasterData("Product", { parentID: "0" });
      setLoading(false);
      if (Array.isArray(res)) setProductsList([...res]);
    } else {
      setProductsList([...productList]);
    }
  }, []);

  const onProceed = async () => {
    if (selectedPlans.length === 0) {
      Swal.fire({ text: "Select atleast 1 product", icon: "error" });
    } else {
      if (LeadId === "" || LeadId === undefined || LeadId === null || editFlag === true) {
        setLifeDetails(dispatch, { plans: selectedPlans }); // !LeadId
      } else {
        const obj = {
          ...LeadDetails,
          needAnalysisJson: {
            selectedProducts: selectedPlans,
          },
        };
        console.log("obj", obj);
        await SaveContact(obj);
      }
      if (editFlag !== true) {
        navigate(
          channelDetails.ChannelType === "A2C"
            ? navigateURl
            : `${navigateURl}${selectedPlans[0].planNumber}`
        );
      }
      if (editFlag === true && onModalClose) onModalClose();
    }
  };
  const onBack = () => {
    if (editFlag !== true) navigate("/life/Dashboard");
    if (editFlag === true && onModalClose) onModalClose();
  };

  return (
    <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus, minHeight: "100vh" }}>
      <MDLoader loader={loading} />
      <Grid container ref={cardRef} rowSpacing={3} columnSpacing={5} pl={3} pr={4} pt={1} pb={10}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4">Plans</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6">
            Maximum {maxPlanCount} {maxPlanCount > 1 ? "plans" : "plan"} can be selected
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <Stack direction="row" spacing={2}>
              {plansType.map((x) => (
                <Chip
                  label={GetTranslate(x.label)}
                  size="medium"
                  sx={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontSize: "1rem",
                    fontWeight: "500",
                    // lineHeight: "120%",
                    // textTransform: "capitalize",
                    bgcolor:
                      x.productType === productType ? ColorsSetting().primary.main : "#ECECEC",
                    color: x.productType === productType ? "#ffffff" : "#000000",
                    "&:hover": {
                      backgroundColor:
                        x.productType === productType ? ColorsSetting().primary.main : "#d3d3d3",
                    },
                  }}
                  clickable
                  onClick={() => setProductType(x.productType)}
                />
              ))}
            </Stack>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} />
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Icon>search</Icon>
                </IconButton>
              ),
            }}
          />
        </Grid>

        {productType !== 0 &&
          productsList
            .filter((x) => x.productType === productType)
            .filter((x) =>
              searchName !== ""
                ? x.mValue.toUpperCase().indexOf(searchName.toUpperCase()) !== -1
                : true
            )
            .map((x) => (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <PlanCard
                  {...x}
                  images={images}
                  value={selectedPlans}
                  onChange={onPlanSelect}
                  onDetailsClick={setPlanDetails}
                  planNumber={x.planNumber || x.mID}
                />
              </Grid>
            ))}
        {productType === 0 &&
          productsList
            .filter((x) =>
              searchName !== ""
                ? x.mValue.toUpperCase().indexOf(searchName.toUpperCase()) !== -1
                : true
            )
            .map((x) => (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ alignItems: "" }}>
                <PlanCard
                  {...x}
                  images={images}
                  value={selectedPlans}
                  onChange={onPlanSelect}
                  onDetailsClick={setPlanDetails}
                  planNumber={x.planNumber || x.mID}
                />
              </Grid>
            ))}
      </Grid>{" "}
      <MDBox
        sx={{
          bgcolor: ColorsSetting().secondary.focus,
          position: "fixed",
          // left: boxPosition.left,
          bottom: 0,
          // width: editFlag === true ? "79%" : "82%",
          width: boxPosition.width - 50,
          boxShadow: "0px 2px  5px #9e9e9e inset",
        }}
        p={2}
        // ml={editFlag === true ? "10%" : "18%"}
      >
        <Stack direction="row" justifyContent="space-between">
          <MDButton
            variant="outlined"
            onClick={onBack}
            sx={{ height: "40px", visibility: "hidden" }}
          >
            Back
          </MDButton>

          <MDTypography sx={{ textAlign: "center" }}>
            {matchesSm
              ? `${selectedPlans.length}/${maxPlanCount} Plans selected`
              : `${selectedPlans.length}/${maxPlanCount}`}
          </MDTypography>
          <MDButton
            onClick={onProceed}
            sx={{ height: "40px", visibility: selectedPlans.length > 0 ? "visible" : "hidden" }}
          >
            {editFlag === true ? "Add Products" : "Proceed"}
          </MDButton>
        </Stack>
      </MDBox>
      <Drawer
        variant="persistent"
        anchor="right"
        open={planDetails.flag}
        sx={{
          "& .MuiDrawer-paper": {
            margin: "0rem",
            width: matchesXl ? "50vw" : "100vw",
            height: "100vh",
          },
        }}
      >
        <MDBox p={2}>
          <Stack direction="row" justifyContent="space-between">
            <MDTypography>{planDetails.planName}</MDTypography>
            <IconButton onClick={() => setPlanDetails({ flag: false })}>
              <Icon>close</Icon>
            </IconButton>
          </Stack>
          {planDetails.planName !== "" && (
            <iframe
              // src={`data:application/pdf;base64,${base64Pdf}`}
              src={
                images[
                  `${planDetails.planName?.replace("LIC's ", "").split(" ").join("")}_PlanDetails`
                ]
              }
              style={{ width: matchesXl ? "50vw" : "100vw", height: "85vh", overflowY: "auto" }}
              title={planDetails.planName}
            />
            // <PDFViewer base64Pdf={base64Pdf} />
          )}
          {planDetails.planName === "" && (
            <MDBox
              sx={{
                width: "100%",
                height: "85vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img src={documentLoadingImg} alt="..." />
            </MDBox>
          )}
        </MDBox>
      </Drawer>
    </MDBox>
  );
}
