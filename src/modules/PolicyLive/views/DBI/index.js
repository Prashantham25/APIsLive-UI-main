import { useState } from "react";
import MDBox from "components/MDBox";
import QuickQuote from "./QuickQuote";
import Driver from "./Driver";
import Steps from "./Steps";

function DBI() {
  const [pageNo, setPageNo] = useState(0);
  // Wrapper calculate premium api
  const [obj, setObj] = useState({
    WCPRequest: {
      stateCode: "KA",
      si: 100000,
      additionalDriver: 0,
      billingFrequency: "Monthly",
      noOfPC: 1,
      noOfTW: 0,
      driverAge: "",
      driverExp: "",
    },
    WCPResponse: {},
    ProposerReq: {
      InsurableItem: [
        {
          InsurableName: "Driver",
          RiskCount: 1,
          RiskItems: [
            {
              Salutation: "",
              Name: "",
              IsPrimaryDriver: "Yes",
              "Identification Number": "",
              DOB: "",
              Age: "",
              "Driving Experience": "",
              DriverId: 1,
              Documents: [
                {
                  FileName: "",
                  DocumentID: "",
                  DocumentType: "",
                },
              ],
            },
          ],
        },
        {
          InsurableName: "Vehicle",
          RiskCount: 1,
          RiskItems: [
            {
              "Make Model": "",
              "Vehicle Number": "",
              "Year of Registration": "",
              "Vehicle Type": "",
              Documents: [
                {
                  FileName: " ",
                  DocumentID: "",
                  DocumentType: "",
                  VehicleView: "",
                },
              ],
              NCBValue: 0,
            },
          ],
        },
      ],
      Salutation: "",
      Name: "",
      "Identification Number": "1960",
      "Product Code": "DBI001",
      "Policy Start Date": "",
      "Mobile Number": "",
      "Policy End Date": "",
      "Email ID": "",
      PinCode: "577001",
      stateCode: "KA",
      si: "100000",
      noOfPC: 1,
      noOfTW: 0,
      driverAge: "",
      driverExp: "",
      additionalDriver: 0,
      billingFrequency: "Monthly",
      PaymentReferenceNumber: "P1",
      PaymentInfo: [
        {
          RefrenceNumber: "1",
          Amount: "",
        },
      ],
    },
    declaration: {
      underTPPolicy: "",
      DeclarationGoesHere: "",
      confirmUnderTPPolicy: "",
    },
    riskDetails: {
      Salutation: "",
      Name: "",
      IsPrimaryDriver: "No",
      "Identification Number": "",
      DOB: "",
      Age: "",
      "Driving Experience": "",
      DriverId: 1,
      Documents: [
        {
          FileName: "",
          DocumentID: "",
          DocumentType: "",
        },
      ],
    },
  });
  console.log("obj", obj);
  return (
    <MDBox sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {pageNo === 0 && <QuickQuote obj={obj} setObj={setObj} setPageNo={setPageNo} />}
      {pageNo === 1 && <Driver setPageNo={setPageNo} obj={obj} setObj={setObj} />}
      {pageNo === 2 && <Steps setPageNo={setPageNo} obj={obj} setObj={setObj} />}
    </MDBox>
  );
}
export default DBI;
