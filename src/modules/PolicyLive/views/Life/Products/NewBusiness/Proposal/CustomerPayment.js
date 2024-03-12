import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import { Card, Stack, Grid, Drawer } from "@mui/material";
import billdesk from "assets/images/Life/billdesk.png";
import paytm from "assets/images/Life/paytm.png";
import rayzorpay from "assets/images/Life/rayzorpay.png";
import Swal from "sweetalert2";
import ReactJson from "react-json-view";

import { buildForm, DateFormatFromDateObject } from "../../../../../../../Common/Validations";
import MDCheckbox from "../../../../../../../components/MDCheckbox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import {
  GetOpportunity,
  GetProposalByNumber,
  GenericApi,
  UpdateProposalDetails,
  SaveOpportunity,
} from "../data";
import RayzorPay from "../../../../Retail/data/RayzorPay";
import MDLoader from "../../../../../../../components/MDLoader";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import NavBar from "../data/NavBar";

// import { Policies } from "../../../../Retail/data/Apis";

export default function CustomerPayment() {
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");
  const [paymentSelection, setPaymentSelection] = useState("");
  const navigate = useNavigate();
  const [DrawerFlg, setDrawerFlg] = useState(false);
  const [TotalPremium, setTotalPremium] = useState(0);
  const [ProposerContactNo, setProposerContactNo] = useState("");
  const [ProposerEmailID, setProposerEmailID] = useState("");
  const [FirstProposalNo, setFirstProposalNo] = useState("");
  const [loader, setLoader] = useState(false);
  const [OpportunityDetails, setOpportunityDetails] = useState({});
  const [dto, setDto] = useState({
    ProposalList: [],
    ProposalData: [],
    RiskItems: [],
    scheduleType: "",
    appointmentDate: "",
    appointmentTime: "",
    MSP: {},
    ProposerDetails: {},
    Payment: {},
  });

  const paymentOptions = [
    {
      label: "PayTM",
      description: "Do payment with PayTm",
      value: "PayTm",
      img: paytm,
      disabled: false,
      visible: true,
    },
    {
      label: "NEFT",
      description: "Do payment with PayTm",
      value: "NEFT",
      imgT: "NEFT/RTGS",
      disabled: false,
      visible: parseInt(TotalPremium, 10) > 100000,
    },
    {
      label: "BillDesk",
      description: "Do Payment with BillDesk",
      value: "BillDesk",
      img: billdesk,
      disabled: true,
      visible: false,
    },
    {
      label: "Rayzor Pay",
      description: "Do Payment with RazorPay",
      value: "RayzorPay",
      img: rayzorpay,
      disabled: true,
      visible: false,
    },
  ];

  const onPaymentChange = (val, node) => {
    setPaymentSelection(val);
    dto.Payment[node] = val;
    setDto({ ...dto });
  };

  console.log("OpportunityDetails", OpportunityDetails);

  useEffect(async () => {
    if (selectedId !== "" && selectedId !== undefined) {
      await GetOpportunity(selectedId).then((res) => {
        if (res.AdditionalDetailsJson?.AutoSave?.workflowStage === "payment") {
          if (res.AdditionalDetailsJson?.AutoSave?.PremiumDetails?.TotalPremium) {
            setOpportunityDetails(res);
            setProposerContactNo(res.AdditionalDetailsJson?.AutoSave?.ProposerContactNo);
            // setProposerEmailID(res.AdditionalDetailsJson?.AutoSave?.ProposerEmailId);
            setTotalPremium(res.AdditionalDetailsJson?.AutoSave?.PremiumDetails?.TotalPremium);
            dto.RiskItems = res.AdditionalDetailsJson.AutoSave.RiskItems;
            if (res.OpportunityDetails !== undefined) {
              dto.ProposalList = _.uniqBy(
                [...res.OpportunityDetails.filter((x) => x.stageId === 4 && x.txnValue !== null)],
                "txnValue"
              ).map((x1) => x1.txnValue);
              setDto({ ...dto });
            }

            dto.ProposalList.forEach(async (proposalNo, i) => {
              if (i === 0) setFirstProposalNo(proposalNo);
              await GetProposalByNumber(proposalNo).then((res1) => {
                if (res1[0] && res1[0].policyDetails !== undefined)
                  setDto((prevState) => ({
                    ...prevState,
                    ProposalData: [...prevState.ProposalData, res1[0].policyDetails],
                    ProposerDetails: res1[0].policyDetails.ProposerDetails,
                    proposalId: res1[0]?.policyId,
                  }));
                setProposerEmailID(res1[0]?.email);
              });
            });
          } else {
            Swal.fire({
              icon: "info",
              text: "Something went wrong. Please try again !",
              allowOutsideClick: false,
            }).then(() => {
              window.location.reload();
            });
          }
        } else if (res.AdditionalDetailsJson?.AutoSave?.workflowStage === "proposal") {
          navigate(`/lifeCustomerProposals?OpportunityId=${selectedId}`);
        } else if (res.AdditionalDetailsJson?.AutoSave?.workflowStage === "postPayment") {
          navigate(`/LifePostPayment?OpportunityId=${selectedId}`);
        }
      });
    }
  }, [selectedId]);

  const onPayment = async (e) => {
    if (e.status === "success") {
      // try {
      //   const res = await Policies({
      //     ...dto.QuotationData[0],
      //     "Product Code": dto.QuotationData[0]?.ProductCode,
      //   });
      //   lDto.QuotationData[0].PolicyNo = res?.finalResult?.id;
      //   setDto({ ...lDto });
      // } catch {
      //   //
      // }
    }
  };
  const onProceedPayment = () => {
    if (TotalPremium === 0) {
      Swal.fire({
        icon: "info",
        text: "Something went wrong. Please try again !",
        allowOutsideClick: false,
      }).then(() => {
        window.location.reload();
      });
    }
    if (paymentSelection === "") {
      Swal.fire({ icon: "warning", text: "Please select payment option" });
    } else {
      if (paymentSelection === "PayTm") {
        dto.ProposalData.map((x) =>
          UpdateProposalDetails({
            ...x,
            PaymentDetails: { PaymentMode: "Online", PaymentMethod: "Paytm" },
          })
        );
        setLoader(true);
        const dt = new Date();
        GenericApi("LifeInsurance", "LIC_PaytmRedirection", {
          PaymentType: "Paytm",
          opportunityId: selectedId,

          TotalPremium,
          ContactNo: ProposerContactNo,
          TxnDate: DateFormatFromDateObject(new Date(), "d-m-y"),
          TxnTime: `${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`,
        }).then((res) => {
          SaveOpportunity({
            opportunityId: selectedId,
            isAutoSave: true,
            AutoSave: {
              ...OpportunityDetails.AdditionalDetailsJson.AutoSave,
              workflowStage: "payment",
              PaymentDetails: { PaymentMode: "Online", PaymentMethod: "Paytm" },
            },
          });

          setLoader(false);
          // const formData = {
          //   action: "https://securegw-stage.paytm.in/theia/customProcessTransaction",
          //   params: {
          //     msg: "LICofI06230095794482|480977489A314614|NA|9483|NA|NA|NA|INR|NA|R|ABCD|NA|NA|F|55K|480977489|8789405931|936|05|11-12-2023|15-07-53|https://techprouat2.licindia.in/eProcess/processpaytmpayment.do|C29B8697C53AA146EAFD18C1F0579C19316807D69F5180D84C3DAF65A9B4707E",
          //     mid: "LICofI06230095794482",
          //     orderid: "480977489A314614",
          //   },
          // };
          const form = buildForm({ action: res.finalResult.URL, params: res.finalResult });
          document.body.appendChild(form);
          form.submit();
          form.remove();
        });
      }
      if (paymentSelection === "NEFT") {
        const d = new Date();
        GenericApi("LifeInsurance", "AxisNeftInitiation", {
          OpportunityId: dto?.proposalId,
          TimeStamp: `${d.getFullYear()}${d.getMonth()}${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`,
          Amount: TotalPremium,
          TxnType: "AxisVPN",
          communicationId: "379",
          ProposalNo: FirstProposalNo,
          EmailID: ProposerEmailID,
          ContactNo: ProposerContactNo,
        }).then((res2) => {
          if (res2.status === 1) {
            SaveOpportunity({
              opportunityId: selectedId,
              isAutoSave: true,
              AutoSave: {
                ...OpportunityDetails.AdditionalDetailsJson.AutoSave,
                workflowStage: "postPayment",
                PaymentDetails: { PaymentMode: "Online", PaymentMethod: "NEFT" },
              },
            });

            Swal.fire({
              icon: "success",
              text: "NEFT details will share to your Mail-ID",
              allowOutsideClick: false,
            }).then(() => {
              navigate(
                `/LifePostPayment?TxnStatus=Success&PaymentType=neft&OpportunityId=${selectedId}`
              );
            });
          }
        });
      }
      if (paymentSelection === "RayzorPay") {
        RayzorPay({
          key: "rzp_test_KK09FiPyLY2aKI",
          amount: 1000,
          // total !== "" && total !== null && gst !== "" && gst !== null
          //   ? parseInt(total, 10) + parseInt(gst, 10)
          //   : 1000,
          PayeeName: dto.ProposerDetails.FirstName,
          PayeeEmail: dto.ProposerDetails.EmailId,
          PayeeContact: dto.ProposerDetails.ContactNo,
          PayeeAddress: "Maharastra",
          onPayment,
        });
      }
    }
  };

  return (
    <MDBox>
      {" "}
      <NavBar />
      <MDBox sx={{ m: 2, mt: 10 }}>
        <MDLoader loader={loader} />
        <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }}>
          {process.env.NODE_ENV === "development" && (
            <MDButton variant="text" onClick={() => setDrawerFlg(true)}>
              View Dto
            </MDButton>
          )}
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography sx={{ textAlign: "center" }}>How would you like to pay?</MDTypography>
            </Grid>
            <Grid item xs={12} md={12} lg={3.5} xl={3.5} xxl={3.5} />
            <Grid item xs={12} md={12} lg={5} xl={5} xxl={5}>
              <Stack spacing={2}>
                {paymentOptions.map(
                  (x) =>
                    x.visible === true && (
                      <Card
                        sx={{
                          bgcolor:
                            dto.Payment?.PaymentMethod === x.value
                              ? "#90caf9"
                              : `${x.disabled ? "#cfd8dc" : "#e3f2fd"}`,
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => onPaymentChange(x.value, "PaymentMethod", x.disabled)}
                      >
                        <Stack direction="row" width="100%" spacing={1} p={2}>
                          <MDCheckbox checked={x.value === dto.Payment?.PaymentMethod} />
                          <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {x.img ? (
                              <MDBox
                                component="img"
                                src={x.img}
                                sx={{ display: "flex", maxHeight: "4rem" }}
                                draggable="false"
                              />
                            ) : (
                              <MDTypography variant="h2" sx={{ textAlign: "center" }}>
                                {x.imgT}
                              </MDTypography>
                            )}
                          </MDBox>
                        </Stack>
                      </Card>
                    )
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={12} lg={3.5} xl={3.5} xxl={3.5} />
            <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }} m={3}>
                <MDButton onClick={onProceedPayment}>Proceed</MDButton>{" "}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Drawer
          sx={{
            width: "50vw",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "50vw",
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          open={DrawerFlg}
          onClose={() => setDrawerFlg(false)}
        >
          <ReactJson
            src={dto}
            displayDataTypes={0}
            displayArrayKey={0}
            displayObjectSize={0}
            // enableClipboard={0}
            onAdd={(e) => setDto({ ...e.updated_src })}
            onDelete={(e) => setDto({ ...e.updated_src })}
            onEdit={(e) => setDto({ ...e.updated_src })}
            style={{ fontSize: 15 }}
            collapsed={1}
          />
        </Drawer>
      </MDBox>
    </MDBox>
  );
}
