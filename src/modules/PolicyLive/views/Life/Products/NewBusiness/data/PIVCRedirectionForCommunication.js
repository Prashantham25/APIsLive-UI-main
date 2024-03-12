import { useEffect, useState } from "react";
import { buildForm } from "Common/Validations";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import {
  GetPayLoadByQueryDynamic,
  // GetProposalByNumber,
  GetProdPartnerMasterData,
  GenericApi,
} from ".";
import MDBox from "../../../../../../../components/MDBox";
import NavBar from "./NavBar";
import MDButton from "../../../../../../../components/MDButton";
import MDLoader from "../../../../../../../components/MDLoader";
import MDTypography from "../../../../../../../components/MDTypography";
import { Authenticate } from "../../../../../../Login/data";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

export default function PIVCRedirectionForCommunication() {
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");
  const [ProposerName, setProposerName] = useState("");
  const [CoreProposalNo, setCoreProposalNo] = useState("");
  const [Loader, setLoader] = useState(false);
  const [BranchCode, setBranchCode] = useState("");
  const [completionStatus, setCompletionStatus] = useState(false);

  const GetProposalYear = () => {
    const cDate = new Date();

    const cMonthFlag = cDate.getMonth() <= 3;
    if (cMonthFlag) return cDate.getFullYear() - 1;
    return cDate.getFullYear();
  };

  useEffect(async () => {
    setLoader(true);

    const loginuser = {
      Username: "LICCustomer01@gmail.com",
      Password: "Mica@123",
      ProductType: "Mica",
      envId: process.env.REACT_APP_EnvId,
    };
    await Authenticate(loginuser).then((res) => {
      if (res.data.status === 1) {
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("roleId", res.data.roleId);
        localStorage.setItem("organizationId", res.data.organizationId);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("partnerId", res.data.partnerId);
        localStorage.setItem("profilePicture", res.data.profileImage);
        localStorage.setItem("firstName", res.data.firstName);
      }
    });

    localStorage.removeItem("POSPSales");
    localStorage.removeItem("Type");
    localStorage.removeItem("BrokerUser");

    localStorage.setItem("LifeProduct", "");
    localStorage.setItem("LifeProductCode", "");
    localStorage.setItem("LifeProductId", "");
    localStorage.setItem("LifeProposalCommunicationId", "");
    // location.replace(`${window.origin}/customerLifeLanding`);
    // navigate(`/customerLifeLanding`);

    const res = await GetPayLoadByQueryDynamic({
      reportname: "PIVCSuccessStatus",
      paramList: [
        {
          parameterName: "OpportunityId",
          parameterValue: selectedId,
        },
      ],
    });

    if (res.finalResult !== true) {
      await GetPayLoadByQueryDynamic({
        reportname: "PIVCQuery",
        paramList: [
          {
            parameterName: "OpportunityId",
            parameterValue: selectedId,
          },
        ],
      }).then(async (res1) => {
        setProposerName(res1?.finalResult?.[0]?.ProposerName);
        setCoreProposalNo(res1?.finalResult?.[0]?.CoreProposalNo);

        if (
          res1?.finalResult?.[0]?.DivisionCode === "" ||
          res1?.finalResult?.[0]?.DivisionCode === null ||
          res1?.finalResult?.[0]?.DivisionCode === undefined
        ) {
          await GetProdPartnerMasterData("LifeCityMaseter", {}).then((res4) => {
            if (Array.isArray(res4))
              res4.forEach((x1) => {
                if (x1.BranchCode === res1?.finalResult?.[0]?.BranchCode) {
                  if (x1.mID.toString().length === 2) setBranchCode(`V0${x1.mID}`);
                  else setBranchCode(`V${x1.mID}`);
                }
              });
          });
        } else {
          setBranchCode(res1?.finalResult?.[0]?.DivisionCode);
        }
      });
    } else {
      setCompletionStatus(true);
    }
    // "finalResult": [
    //   {
    //     "ProposalNo": "24987/800004",
    //     "ProposerName": "ROHIT",
    //     "DivisionCode": "",
    //     "BranchCode": "987"
    //   }
    // ]

    setLoader(false);
    // GetOpportunity().then((res) => {
    //   setLoader(false);
    //   setProposerName(res);
    //   setCoreProposalNo();
    // });
  }, []);

  const onClickVideo = async () => {
    //   {"opportunityid": 10002334,
    //   "proposalnumber": "1030119",
    //   "proposalyear":"2023",
    //   "proposername": "TestName15",
    //   "BranchCode":"V048"
    // }
    if (CoreProposalNo === "") {
      window.location.reload();
    } else {
      await GenericApi("LifeInsurance", "LIC_PIVC", {
        // opportunityId: selectedId,
        proposalnumber: CoreProposalNo,
        proposalyear: GetProposalYear(),
        proposername: ProposerName,
        opportunityid: selectedId,
        BranchCode,
      }).then((res) => {
        const form = buildForm({ action: res.finalResult.URL, params: res.finalResult });
        document.body.appendChild(form);
        form.submit();
        form.remove();
      });
    }
  };

  return (
    <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }}>
      <NavBar />
      <MDBox mt={20} sx={{ minHeight: "90vh" }}>
        {completionStatus ? (
          <MDBox mt={40}>
            <MDTypography
              color="success"
              variant="h5"
              sx={{ textAlign: "center", fontSize: "1rem" }}
            >
              Already Video Verification Completed
            </MDTypography>
          </MDBox>
        ) : (
          <MDBox>
            <MDLoader loader={Loader} />
            <Stack spacing={3} p={2}>
              <MDTypography sx={{ textAlign: "center", fontSize: "1rem" }}>
                You are required to record a self-identification video of 10 seconds from the link
                provided below. While recording video, please speak your name and four digit code
                displayed on the screen.
              </MDTypography>
              <MDTypography sx={{ textAlign: "center", fontSize: "1rem" }}>
                You need to enable access to LOCATION, MICROPHONE, CAMERA on the recording device
                preferably mobile phone/Laptop while recording self-identification video. Please do
                not use desktop computers since it may not have location and other required access
                facility. While recording video, please speak your name and four digit code
                displayed on the screen
              </MDTypography>
            </Stack>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={onClickVideo}>Video Verification</MDButton>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}
