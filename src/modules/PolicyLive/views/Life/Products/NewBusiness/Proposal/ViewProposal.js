import { useEffect, useState } from "react";

// import { Popover } from "@mui/material";
import { IconButton, Stack, Icon, FormControlLabel, Checkbox } from "@mui/material";

import swal from "sweetalert";
import {
  SendDocuSignNotification,
  GetDocumentInformation,
  Proposals,
  SaveOpportunity,
  // GetDocumentById,
  GetProposalByNumber,
  AllocationLogic,
  GetQuoteDetails,
  GeneratePDF,
} from "../data";
import PolicyJson from "./Json/LifeProposalJson";
import { base64toBlob, DateFormatFromStringDate } from "../../../../../../../Common/Validations";
import MDBox from "../../../../../../../components/MDBox";
// import DocumentUploadCard from "../data/DocumentUploadCard";
import { GetQuestionsControls } from "../data/DynamicContent";
import NomineeDetailsModal from "../data/NomineeDetailsModal";

function formatCurrency(newValue) {
  if (!newValue) return "";
  const value = `${newValue}`;
  const numericValue = value.replace(/[^0-9-]/g, "");
  const parts = numericValue.split(".");
  const integerPart = parts[0];
  const formatter = new Intl.NumberFormat("en-IN");
  const formattedIntegerPart = formatter.format(integerPart);
  return `${formattedIntegerPart}`;
}

const getPolicyDto = (data) => {
  console.log(".");
  if (data) return data;
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = ["Proposal Details"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, customerView, hideButtons }) => {
  let steps = [];
  switch (activeStep) {
    case 3:
      steps = [
        { name: "Policy related information", visible: true, endorsement: true },
        { name: "Settlement option for maturity benefit", visible: true },
        { name: "Settlement option for death benefit", visible: true },
        { name: "Additional Information", visible: true },
        { name: "Nominee Details (Maximum 3 Nominees)", visible: true },
        { name: "", visible: true },
      ];
      break;

    case 0:
      steps = [
        { name: "Product Details", visible: true, endorsement: true },
        { name: "Proposer Details", visible: true, endorsement: true },
        { name: "Address Details", visible: true, endorsement: true },
        { name: "Occupation Details", visible: true, endorsement: true },
        { name: "Previous Policy Details", visible: true, endorsement: true },
        { name: "Family History", visible: true, endorsement: true },
        { name: "Bank Account Details", visible: true, endorsement: true }, // hideButtons === true
        { name: "Questionnaire", visible: true, endorsement: true },
        { name: "Nominees", visible: true, endorsement: hideButtons === true },
        customerView !== true && { name: "Member Level Decision", visible: true },
        customerView !== true && { name: "Policy Level Decision", visible: true },
        { name: "", visible: hideButtons !== true },
      ];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters } otherData, setOtherData

// let base64 = "";

const getSectionContent = ({
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  selectedId,
  quotationList,
  setQuotationList,
  selectedList,
  setLoading,
  customerView,
  hideButtons,
}) => {
  let data = [];
  const lMasters = masters;
  const lDto = dto;
  const lQuotationList = quotationList;
  const [tab, setTab] = useState(0);
  const [subTypeTab, setSubTypeTab] = useState(0);
  const [memberLevelTab, setMemberLevelTab] = useState(0);

  // const [anchorEl, setAnchorEl] = useState(null);

  // const open = Boolean(anchorEl);
  // const [img, setImg] = useState("");

  /* eslint-disable no-param-reassign */

  if (selectedId === undefined) selectedId = selectedList ? selectedList.QuoteNo : "";

  /* eslint-enable no-param-reassign */

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const getTemplateName = (product) =>
    ({
      "LIC's Jeevan Labh": "ProposalForm_EndowmentPlan_T",
      "Jeevan Akshay": "ProposalForm_PensionPlan_T",
      "Cancer Cover": "ProposalForm_HealthPlan_T",
      "LIC's Bima Jyoti": "LICBhimJyothi",
    }[product]);

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const onViewDraftProposal = async () => {
    setLoading(true);
    // const obj = {
    //   key: selectedList?.ProposalNo,
    //   keyValue: "",
    //   templateKey: "",
    //   templateId: selectedList?.proposalTemplateId,
    //   requestData: "",
    //   referenceId: "",
    //   communicationId: 0,
    // };
    // const res = await GetTemplatePayload(obj);

    console.log("Testing", getTemplateName(selectedList.Product), selectedList);

    const res = await GeneratePDF(getTemplateName(selectedList.Product), selectedList);
    quotationList.forEach((x, i) => {
      if (x.QuoteNo === selectedId) lQuotationList[i].src = res.fileUploadResp?.fileData;
    });
    setQuotationList([...lQuotationList]);
    generateFile(res.fileUploadResp?.fileData, "proposerForm");
    setLoading(false);
    // const src = `data:application/pdf;base64,${res}`;
    // const pdfWindow = window.open("", "_blank");
    // pdfWindow.document.write(
    //   `<html><head><title>Proposer form</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    // );
  };

  const onSendForSignature = async () => {
    setLoading(true);
    const obj = {
      signerDetails: {
        email: dto.ProposerDetails.EmailId,
        name: dto.ProposerDetails.FirstName,
        recipientId: 1,
        routingOrder: 1,
      },
      ccDetails: {
        email: dto.ProposerDetails.EmailId,
        name: dto.ProposerDetails.FirstName,
        recipientId: 2,
        routingOrder: 2,
      },
      emailSubject: "string",
      status: "sent",
      signatureTags: [
        {
          anchorString: "signerSignature",
          anchorUnits: "pixels",
          anchorYOffset: "10",
          anchorXOffset: "20",
        },
      ],
      documentDetails: [
        {
          name: "Prop",
          fileExtension: "pdf",
          documentId: selectedList?.docId,
          documentBase64: selectedList?.src,
        },
      ],
    };
    await SendDocuSignNotification(obj).then((res) => {
      setLoading(false);
      if (res.status === 1) {
        quotationList.forEach((x, i) => {
          if (x.QuoteNo === selectedId) lQuotationList[i].envelopeId = res.responseMessage;
        });
        setQuotationList([...lQuotationList]);
      }
    });

    swal({ icon: "success", text: "PDF Sent to Proposer" });
  };

  const onPdfClose = () => {
    lMasters.pdfViewer = false;
    setMasters({ ...lMasters });
  };

  const onSaveProposal = async () => {
    setLoading(true);
    const saveJson = !checkForValue(selectedList)
      ? {
          ...selectedList,
          PolicyStartDate: new Date(),
          PolicyEndDate: new Date(),
          NomineeDetails: [...(dto.NomineeDetails || [])],
          BankDetails: { ...(dto.BankDetails || {}) },
        }
      : { ...dto, PolicyStartDate: new Date(), PolicyEndDate: new Date() };
    const res = await Proposals(saveJson);

    setLoading(false);
    if (
      res.status === 1 &&
      res.finalResult.ProposalResponse.proposalNumber !== null &&
      res.finalResult.ProposalResponse.proposalNumber !== undefined
    ) {
      setLoading(true);
      const opportunityJson = {
        opportunityId: dto.opportunityId !== undefined ? dto.opportunityId : 0,
        needAnalysisJson: null,
        stageId: 4,
        stageStatusId: 1,
        txnType: "",
        txnValue: res.finalResult.ProposalResponse.proposalNumber,
        txnValueId: res.finalResult.ProposalResponse.id,
      };

      quotationList.forEach((x, i) => {
        if (x.QuoteNo === selectedId)
          lQuotationList[i].ProposalNo = res.finalResult.ProposalResponse.proposalNumber;
      });
      setQuotationList([...lQuotationList]);
      await SaveOpportunity(opportunityJson);
      setLoading(false);
      swal({
        text: res.finalResult?.ProposalResponse.responseMessage,
        icon: "success",
      });

      if (
        res.finalResult.DeviationDetails !== undefined &&
        res.finalResult.DeviationDetails.outcome === "Fail"
      ) {
        setLoading(true);
        await AllocationLogic(
          res.finalResult.ProposalResponse.proposalNumber,
          res.finalResult.DeviationDetails
        ).then(() => setLoading(false));
      }
      // swal({ icon: "success", text: res.finalResult.responseMessage });
    } else {
      swal({ icon: "error", text: res.finalResult.ProposalResponse.errors[0].errorMessage });
    }
  };

  const viewPDFFile = (content, title) => {
    const blob = base64toBlob(content);
    const url = URL.createObjectURL(blob);
    const src = `data:application/pdf;base64,${encodeURI(content)}`;
    console.log(url, src);

    const newWindow = window.open("");
    newWindow.document.write(
      `<html><head><title>${title}</title></head><body> <iframe src=${src} title=${title} type="application/pdf"  width="300" height="200"  /></body></html>`
    );
  };
  const onViewSignedCopy = async () => {
    setLoading(true);

    await GetDocumentInformation(selectedList.envelopeId, selectedList.docId).then((res) => {
      setLoading(false);
      quotationList.forEach((x, i) => {
        if (x.QuoteNo === selectedId) lQuotationList[i].signedSrc = res.data;
      });
      setQuotationList([...lQuotationList]);
      generateFile(res.data, "Signed Document");
      viewPDFFile(res.data, "Signed Document");
    });
  };

  // const getFile = async (e, fileName) => {
  //   setLoading(true);
  //   setAnchorEl(e.currentTarget);
  //   await GetDocumentById(fileName).then((res) => {
  //     setLoading(false);
  //     const src = `data:application/img;base64,${res.data}`;
  //     setImg(src);
  //     // const link = document.createElement("a");
  //     // link.href = src;
  //     // link.download = fileName;
  //     // link.click();
  //   });
  // };
  // const spreadDocComponents = () => {
  //   const arr = [];
  //   if (dto.InsurableItem && dto.InsurableItem[0].RiskItems) {
  //     dto.InsurableItem[0].RiskItems[tab].DocumentDetails?.forEach((x, i) => {
  //       arr.push(
  //         {
  //           type: "Custom",
  //           visible: true,
  //           spacing: 6,
  //           return: (
  //             <DocumentUploadCard details={x} index={i} generateFile={getFile} disabled="true" />
  //           ),
  //         },
  //         { type: "Typography", visible: true, spacing: 6 }
  //       );
  //     });
  //   }
  //   return arr;
  // };
  const [nomineeFlg, setNomineeFlg] = useState(false);
  const [EditFlg, setEditFlg] = useState(false);
  const [nomineeObj, setNomineeObj] = useState({
    NomineeName: "",
    NomineeDOB: "",
    NomineeRelationWithProposer: "",
    PercentageOfShare: "",
    RelationshipWithAppointee: "",
    AppointeeName: "",
    AppointeeDOB: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineeCity: "",
    NomineeState: "",
    NomineePincode: "",
  });
  const dNomineeObj = {
    NomineeName: "",
    NomineeDOB: "",
    NomineeRelationWithProposer: "",
    PercentageOfShare: "",
    RelationshipWithAppointee: "",
    AppointeeName: "",
    AppointeeDOB: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineeCity: "",
    NomineeState: "",
    NomineePincode: "",
  };
  const onAddNominee = () => {
    try {
      lDto.NomineeDetails = [...(lDto.NomineeDetails ? lDto.NomineeDetails : []), nomineeObj];
      setDto({ ...lDto });

      quotationList.forEach((x, i) => {
        if (x.QuoteNo === selectedId)
          lQuotationList[i].NomineeDetails = [
            ...(lQuotationList[i].NomineeDetails ? lQuotationList[i].NomineeDetails : []),
            nomineeObj,
          ];
      });
      setQuotationList([...lQuotationList]);
      setNomineeObj({ ...dNomineeObj });
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateNominee = () => {
    try {
      lDto.NomineeDetails[nomineeObj.id] = nomineeObj;
      setDto({ ...lDto });
      quotationList.forEach((x, i) => {
        if (x.QuoteNo === selectedId) lQuotationList[i].NomineeDetails[nomineeObj.id] = nomineeObj;
      });
      setQuotationList([...lQuotationList]);
      setNomineeObj({ ...dNomineeObj });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNominee = (index) => {
    try {
      lDto.NomineeDetails = lDto.NomineeDetails.filter((x, i) => i !== index);
      // const noOfNominee = dto.NomineeDetails.length;
      // const newNomineeDetails = [...dto.NomineeDetails];
      // for (let i = index; i < noOfNominee - 1; i += 1)
      //   newNomineeDetails[i] = { ...newNomineeDetails[i + 1] };
      // lDto.NomineeDetails = [...newNomineeDetails.slice(0, -1)];
      setDto({ ...lDto });

      quotationList.forEach((x, i) => {
        if (x.QuoteNo === selectedId)
          lQuotationList[i].NomineeDetails = lQuotationList[i].NomineeDetails.filter(
            (x1, i1) => i1 !== index
          );
      });
      setQuotationList([...lQuotationList]);
    } catch (e) {
      console.log(e);
    }
  };

  const onEditNominee = (x) => {
    setNomineeObj({ ...x });
    setEditFlg(true);
    setNomineeFlg(true);
  };

  const onNomineeSame = (e) => {
    try {
      quotationList.forEach((x, i) => {
        lQuotationList.IsNomineeSameForAll = e.target.checked;
        if (e.target.checked === true) lQuotationList[i].NomineeDetails = dto.NomineeDetails;
      });
      setQuotationList([...lQuotationList]);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const mst = [];
    dto.InsurableItem[0].RiskItems.forEach((x1, i1) => {
      const getRenderQuestion = (x, i2) => {
        const arr = [];
        if (x.ControlType === "Header" && x.Visibility === "true") {
          arr.push({
            type: "Typography",
            visible: true,
            label: x.QText,
            spacing: 12,
            QSubType: x.QSubType,
            splitId: 2,
          });
        }

        if (x.ControlType === "Radio" && x.Visibility === "true") {
          arr.push({
            type: "RadioGroup",
            visible: true,
            value: dto.InsurableItem[0].RiskItems[i1].Questionnare[i2].Answer,
            radioLabel: {
              labelVisible: true,
              label: x.QText,
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            justifyContent: "space-between",
            spacing: 9,
            splitId: 2,
          });

          if (x.DetailsLabel) {
            arr.push({
              type: "Input",
              visible: "visibleDetails",
              visibleDetails: {
                path: `InsurableItem.0.RiskItems.${i1}.Questionnare.${i2}.Answer`,
                value: x.ShowDetailsOnValue,
              },
              path: `InsurableItem.0.RiskItems.${i1}.Questionnare.${i2}.${x.DetailsLabel}`,
              label: x.DetailsLabel,
              spacing: 3,
              splitId: 2,
              multiline: true,
            });
          }
        }

        if (x.ControlType === "TextBox" && x.Visibility === "true") {
          arr.push({
            type: "Input",
            visible: true,
            path: `InsurableItem.0.RiskItems.${i1}.Questionnare.${i2}.Answer`,
            label: x.QText,
            spacing: 4,
            splitId: 2,
            multiline: true,
          });
        }
        return arr;
      };

      /* eslint-disable */
      const newQuestions = x1.Questionnare?.filter((x1) => x1 !== undefined && x1 !== null);
      const tGroupArr = newQuestions?.reduce((group1, product, index) => {
        const group = group1;
        const { QSubType } = product;
        group[QSubType] = group[QSubType] ?? [];
        group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
        return group;
      }, {});
      /* eslint-enable */
      mst.push(tGroupArr);
    });
    setMasters((prevState) => ({ ...prevState, questions: [...mst] }));
  }, []);

  const questions = dto.InsurableItem[0].RiskItems[tab].Questionnare;
  const getSubTypeLabel = (ind) =>
    Object.keys(
      GetQuestionsControls({
        questions,
        tab,
        node1: "InsurableItem.0.RiskItems",
        node2: "Questionnare",
        setDto,
      })
    )[ind];

  const spreadFamilyHistory = () => {
    const arr = [];
    lDto.InsurableItem[0].RiskItems[tab].FamilyHistory.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          visible: true,
          label: "Relation",

          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.Relation`,
        },
        {
          type: "AutoComplete",
          visible: true,

          label: "Living / Dead",
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.LivingDead`,
        },
        {
          type: "Input",
          visible: true,
          required: true,
          label: `Age ${x.LivingDead === "Dead" ? "of Death" : ""}`,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.Age`,
          inputType: "number",
          // maxLength: 2,
        },
        {
          type: "Typography",
          label: "",
          visible: x.LivingDead !== "Living" && x.LivingDead !== "Dead",
          spacing: 2.5,
        },
        {
          type: "AutoComplete",
          label: "State of Health",
          visible: x.LivingDead === "Living",
          required: true,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.HealthStatus`,
        },
        {
          type: "Input",
          label: "Cause of Death",
          visible: x.LivingDead === "Dead",
          required: true,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.CauseOfDeath`,
        }
      );
    });
    return arr;
  };

  const PPDColumns = [
    {
      field: "policyno",
      headerName: "Policy Number",
    },
    {
      field: "insurer",
      headerName: "Insurer",
    },
    {
      field: "plancd",
      headerName: "Plan",
    },
    {
      field: "policyterm",
      headerName: "Term",
    },
    {
      field: "sumassured",
      headerName: "Sum Assured",

      align: "right",
    },
    {
      field: "commencementdate",
      headerName: "Commencement Date",
      width: 200,
    },
  ].map((x) => ({ align: "center", headerAlign: "center", width: 150, ...x }));

  switch (activeStep) {
    case 0:
      data = [
        [
          { type: "Input", spacing: 3, label: "Product", path: "Product", visible: true },
          { type: "Input", spacing: 3, label: "Plan Code", path: "PlanCode", visible: true },
          {
            type: "Input",
            spacing: 3,
            label: "Sum Assured",
            path: "SumAssured",
            visible: !checkForValue(dto.SumAssured),
          },
          {
            type: "Input",
            spacing: 3,
            label: "Policy Term",
            path: "PolicyTerm",
            visible: !checkForValue(dto.PolicyTerm),
          },
          {
            type: "Input",
            spacing: 3,
            label: "Premium Paying Term",
            path: "PremiumPayingTerm",
            visible: !checkForValue(dto.PremiumPayingTerm),
          },
          {
            type: "Input",
            spacing: 3,
            label: "Preferred Mode",
            path: "PreferredMode",
            visible: !checkForValue(dto.PreferredMode),
          },
          {
            type: "Input",
            spacing: 3,
            label: "Policy Type",
            path: "PolicyType",
            visible: !checkForValue(dto.PolicyType),
          },
          {
            type: "Input",
            spacing: 3,
            label: "Nach",
            path: "Nach",
            visible: !checkForValue(dto.Nach),
          },
        ],
        [
          {
            type: "AutoComplete",
            visible: false,
            label: "Salutation",
            path: "ProposerDetails.Salutation",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "First Name",
            path: "ProposerDetails.FirstName",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "Middle Name",
            path: "ProposerDetails.MiddleName",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "Last Name",
            path: "ProposerDetails.LastName",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "Father's Name",
            path: "ProposerDetails.FatherName",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "Mother's Name",
            path: "ProposerDetails.MotherName",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "Mobile No.",
            path: "ProposerDetails.ContactNo",
            spacing: 3,
          },
          {
            type: "Input",
            visible: true,
            label: "WhatsApp No.",
            path: "ProposerDetails.WhatsAppNo",
            spacing: 3,
          },
          {
            label: "Email Id",
            visible: true,
            path: `ProposerDetails.EmailId`,
            type: "Input",
            required: true,
          },
          {
            label: "Gender",
            path: `ProposerDetails.Gender`,
            visible: true,
            type: "AutoComplete",

            disabled: true,
          },
          {
            label: "Date of Birth",
            path: `ProposerDetails.DOB`,
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            disabled: true,
            dateFormat: "Y-m-d",
          },
          {
            label: "Marital Status",
            path: `ProposerDetails.MaritalStatus`,
            visible: true,
            type: "AutoComplete",
            options: [],
          },
          {
            label: "Resident Status",
            visible: true,
            path: `ProposerDetails.ResidentStatus`,
            type: "Input",
          },
          {
            label: "Country of Residency",
            visible: true,
            path: `ProposerDetails.CountryOfResidency`,
            type: "Input",
          },

          {
            label: "PAN No.",
            visible: true,
            path: `ProposerDetails.PANNo`,
            type: "Input",
          },
        ],
        [
          { type: "Typography", label: "Permanent Address", spacing: 12, visible: true },
          {
            label: "Address 1",
            path: "ProposerDetails.PermanentAddress.AddressLine1",
            visible: true,
            type: "Input",
            required: true,
            disabled: true,
          },
          {
            label: "Address 2",
            path: `ProposerDetails.PermanentAddress.AddressLine2`,
            visible: true,
            type: "Input",
            disabled: true,
          },
          {
            label: "Address 3",
            path: `ProposerDetails.PermanentAddress.AddressLine3`,
            visible: true,
            type: "Input",
            disabled: true,
          },
          {
            label: "Country",
            path: `ProposerDetails.PermanentAddress.Country`,
            visible: true,
            type: "AutoComplete",
            required: true,

            disabled: true,
          },
          {
            label: "State",
            path: `ProposerDetails.PermanentAddress.State`,
            visible: true,
            type: "AutoComplete",
            required: true,

            disabled: true,
          },
          {
            label: "District",
            path: `ProposerDetails.PermanentAddress.District`,
            visible: true,
            type: "AutoComplete",

            disabled: true,
          },
          {
            label: "City",
            path: `ProposerDetails.PermanentAddress.City`,
            visible: true,
            type: "AutoComplete",

            disabled: true,
          },
          {
            label: "Pincode",
            path: `ProposerDetails.PermanentAddress.Pincode`,
            visible: true,
            type: "Input",
            // required: true,
            // options: getMaster("Pincode"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.City),
            // customOnChange: (e, a) =>
            //   locationMasters("Pincode", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          { type: "Typography", label: "Communication Address", spacing: 12, visible: true },
          {
            type: "Checkbox",
            spacing: 12,
            visible: true,
            label: "Is communication address same as permanent address?",
            path: `ProposerDetails.sameComAddress`,
            checkedVal: true,
          },
          ...[
            {
              label: "Address 1",
              path: `ProposerDetails.CommunicationAddress.AddressLine1`,
              visible: true,
              type: "Input",
            },
            {
              label: "Address 2",
              path: `ProposerDetails.CommunicationAddress.AddressLine2`,
              visible: true,
              type: "Input",
            },
            {
              label: "Address 3",
              path: `ProposerDetails.CommunicationAddress.AddressLine3`,
              visible: true,
              type: "Input",
            },
            {
              label: "Country",
              path: `ProposerDetails.CommunicationAddress.Country`,
              visible: true,
              type: "Input",
            },
            {
              label: "State",
              path: `ProposerDetails.CommunicationAddress.State`,
              visible: true,
              type: "Input",
            },
            {
              label: "District",
              path: `ProposerDetails.CommunicationAddress.District`,
              visible: true,
              type: "Input",
            },
            {
              label: "City",
              path: `ProposerDetails.CommunicationAddress.City`,
              visible: true,
              type: "Input",
            },
            {
              label: "Pincode",
              path: `ProposerDetails.CommunicationAddress.Pincode`,
              visible: true,
              type: "Input",
            },
          ].map((x) => ({ ...x, disabled: dto.ProposerDetails?.sameComAddress === true })),

          {
            type: "RadioGroup",
            visible: true,
            path: `ProposerDetails.ForeignAddress.OCI`,
            radioLabel: {
              labelVisible: true,
              label: "Are you holding valid Overseas Citizen of India card(OCI Card)",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            justifyContent: "space-between",
            spacing: 8,
          },
          {
            type: "Typography",
            label: "Address outside India (Applicable only for NRI/FNIO)",
            spacing: 12,
            visible: dto.ProposerDetails.ForeignAddress?.OCI === "Yes",
          },
          ...[
            {
              label: "Address 1",
              path: `ProposerDetails.ForeignAddress.AddressLine1`,
              type: "Input",
            },
            {
              label: "Address 2",
              path: `ProposerDetails.ForeignAddress.AddressLine2`,
              type: "Input",
            },
            {
              label: "Address 3",
              path: `ProposerDetails.ForeignAddress.AddressLine3`,
              type: "Input",
            },
            {
              label: "Country",
              path: `ProposerDetails.ForeignAddress.Country`,
              type: "Input",
            },
            {
              label: "State",
              path: `ProposerDetails.ForeignAddress.State`,
              type: "Input",
            },
            {
              label: "District",
              path: `ProposerDetails.ForeignAddress.District`,
              type: "Input",
            },
            {
              label: "City",
              path: `ProposerDetails.ForeignAddress.City`,
              type: "Input",
            },
            {
              label: "Pincode",
              path: `ProposerDetails.ForeignAddress.Pincode`,
              type: "Input",
            },
          ].map((x) => ({
            ...x,
            visible: dto.ProposerDetails?.ForeignAddress?.OCI === "Yes",
            required: dto.ProposerDetails?.ForeignAddress?.OCI === "Yes",
          })),
        ],

        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          },
          { type: "Typography", spacing: 12, visible: true },

          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.PresentOccupation`,
            label: "Present Occupation",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            // options: masters.Occupation,
            required: true,
            // customOnChange: onOccpation,
          },
          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.NatureOfDuty`,
            label: "Exact Nature of duties",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            required: true,
            // options: masters.NatureOfDuty,
            // customOnChange: onNatureOfDuty,
          },
          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.SourceOfIncome`,
            label: "Source of Income",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            // options: masters.SourceOfIncome,
            required: true,
            // customOnChange: onSourceOfIncome,
          },

          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.EducationalQualification`,
            label: "Educational qualification",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            // options: masters.EducationalQualification,
            required: true,
            endAdornmentIcon: "school",
            disableClearable: true,
          },
          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.Experience`,
            label: "Length of service (Months)",
            visible: true,
            type: "Input",
            inputType: "number",
            spacing: 3,
          },

          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.EmployerName`,
            label: "Name of the present employer",
            visible: true,
            type: "Input",
            spacing: 3,
            onChangeFuncs: ["IsAlpha"],
          },

          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome1`,
            label: "Annual Income 2022-2023",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
            required: true,
          },
          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome2`,
            label: "Annual Income 2021-2022",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
            required: true,
          },
          {
            path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome3`,
            label: "Annual Income 2020-2021",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
            required: true,
          },
        ],
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          },
          { type: "Typography", spacing: 12, visible: true },

          {
            type: "DataGrid",
            visible: true,
            spacing: 12,
            columns: PPDColumns,
            value: dto.InsurableItem[0]?.RiskItems?.[tab]?.PreviousPolicyDetails?.map((x, i) => ({
              ...x,
              id: i,
              insurer: "LIC",
              policyno: `XXXXXX${x.policyno?.slice(-3)}`,
              sumassured: formatCurrency(x.sumassured),
              commencementdate: DateFormatFromStringDate(x.commencementdate, "y-m-d", "d/m/y"),
            })),
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
          },

          {
            type: "Divider",
            visible: true,
            spacing: 12,
          },

          {
            type: "DataGrid",
            visible:
              dto.InsurableItem[0]?.RiskItems?.[tab]?.NonLICPreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: PPDColumns,
            value: dto.InsurableItem[0]?.RiskItems?.[tab]?.NonLICPreviousPolicyDetails?.map(
              (x, i) => ({
                ...x,
                id: i,
              })
            ),
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
          },
        ],

        [...spreadFamilyHistory()],

        [
          { type: "Typography", visible: true, label: "NEFT", spacing: 12, variant: "h5" },
          {
            type: "Input",
            visible: true,
            label: "IFS Code",
            path: `ProposerDetails.BankDetails.IFSCode`,
          },
          {
            type: "Input",
            visible: true,
            label: "Account Number",
            path: `ProposerDetails.BankDetails.AccountNo`,
          },
          {
            type: "Input",
            visible: true,
            label: "Account Holder's Name",
            path: `ProposerDetails.BankDetails.HolderName`,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Account Type",
            path: `ProposerDetails.BankDetails.AccountType`,
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Name",
            path: `ProposerDetails.BankDetails.BankName`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Branch",
            path: `ProposerDetails.BankDetails.Branch`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Branch Address",
            path: `ProposerDetails.BankDetails.BranchAddress`,
            disabled: true,
          },
          {
            type: "Typography",
            visible: dto.ProposerDetails?.Nach === "Yes",
            label: "NACH",
            spacing: 12,
            variant: "h5",
          },

          {
            type: "RadioGroup",
            visible: dto.ProposerDetails?.Nach === "Yes",
            path: `ProposerDetails.BankDetails.NachSameAsNeft`,
            radioLabel: {
              labelVisible: true,
              label: "Is NACH Account same as NEFT?",
              fontSize: "1rem",
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            spacing: 12,
          },

          ...[
            {
              type: "Input",
              label: "IFS Code",
              path: `ProposerDetails.BankDetails.NachIFSCode`,
            },
            {
              type: "Input",
              label: "Account Number",
              path: `ProposerDetails.BankDetails.NachAccountNo`,
            },
            {
              type: "Input",
              label: "Account Holder's Name",
              path: `ProposerDetails.BankDetails.NachHolderName`,
            },
            {
              type: "AutoComplete",
              label: "Account Type",
              path: `ProposerDetails.BankDetails.NachAccountType`,
            },
            {
              type: "Input",
              label: "Bank Name",
              path: `ProposerDetails.BankDetails.NachBankName`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Bank Branch",
              path: `ProposerDetails.BankDetails.NachBranch`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Branch Address",
              path: `ProposerDetails.BankDetails.NachBranchAddress`,
              disabled: true,
            },
          ].map((x) => ({
            ...x,
            visible: dto.ProposerDetails?.Nach === "Yes",
          })),
        ],

        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          },
          {
            type: "Split",
            visible: true,
            split: [
              { md: 3, lg: 3, xl: 3, xxl: 3, splitId: 1 },
              { md: 9, lg: 9, xl: 9, xxl: 9, splitId: 2 },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: subTypeTab,
            visible: true,
            orientation: "vertical",
            customOnChange: (e, newValue) => setSubTypeTab(newValue),
            tabs: Object.keys(
              GetQuestionsControls({
                questions,
                tab,
                node1: "InsurableItem.0.RiskItems",
                node2: "Questionnare",
                setDto,
              })
            ).map((elem, index) => ({
              value: index,
              label: elem,
            })),

            spacing: 12,
            splitId: 1,
          },
          ...(GetQuestionsControls({
            questions,
            tab,
            node1: "InsurableItem.0.RiskItems",
            node2: "Questionnare",
            setDto,
          })?.[getSubTypeLabel(subTypeTab)] !== undefined
            ? GetQuestionsControls({
                questions,
                tab,
                node1: "InsurableItem.0.RiskItems",
                node2: "Questionnare",
                setDto,
              })[getSubTypeLabel(subTypeTab)]
            : []),
        ],

        [
          // {
          //   type: "Tabs",
          //   value: tab,
          //   visible: true,
          //   customOnChange: (e, newValue) => setTab(newValue),
          //   tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
          //     value: index,
          //     label: elem.name !== "" ? elem.name : "Main Life",
          //   })),
          //   spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          // },
          {
            type: "Button",
            label: "Add Nominee",
            variant: "outlined",
            visible: true,
            startIcon: <Icon>add</Icon>,
            onClick: () => {
              setEditFlg(false);
              setNomineeFlg(true);
            },
            spacing: 12,
            justifyContent: "right",
            disabled: dto.NomineeDetails?.length >= 3,
          },
          {
            type: "DataGrid",
            visible: true,
            spacing: 12,
            rowId: "id",
            columns: [
              { field: "NomineeName", headerName: "Nominee Name", width: 200 },
              { field: "NomineeRelationWithProposer", headerName: "Relationship", width: 200 },
              { field: "PercentageOfShare", headerName: "Share", width: 200 },
              // { field: "date", headerName: "Address", width: 200 },
              // { field: "remarks", headerName: "Pincode", width: 200 },

              {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (p) => (
                  <Stack direction="row" spacing={1}>
                    {/* <IconButton>
                      <Icon>visibility</Icon>
                    </IconButton> */}
                    <IconButton onClick={() => onEditNominee(p.row)}>
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon onClick={() => deleteNominee(p.row.id)}>delete</Icon>
                    </IconButton>
                  </Stack>
                ),
              },
            ],
            value: dto.NomineeDetails?.map((x, i) => ({ ...x, id: i })),
            // value: quotationList
            //   .filter((x, i) => i === selectedId)[0]
            //   ?.NomineeDetails?.map((x, i) => ({ ...x, id: i })),
          },
          {
            type: "Custom",
            spacing: 4,
            visible: true,
            return: (
              <FormControlLabel
                control={<Checkbox />}
                label="Nominee same for all Proposals"
                // checked={NomineeDetails.isNomineeSameForAll}
                onChange={onNomineeSame}
              />
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 12,
            open: nomineeFlg,
            return: (
              <NomineeDetailsModal
                dto={nomineeObj}
                setDto={setNomineeObj}
                setNomineeFlg={setNomineeFlg}
                onAddNominee={onAddNominee}
                EditFlg={EditFlg}
                onUpdateNominee={onUpdateNominee}
              />
            ),
            sx: { top: "10%", left: "15%", width: "70%", height: "80%" },
          },
        ],

        // [
        //   {
        //     type: "Tabs",
        //     value: tab,
        //     visible: true,
        //     customOnChange: (e, newValue) => setTab(newValue),
        //     tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
        //       value: index,
        //       label: elem.name !== "" ? elem.name : "Main Life",
        //     })),
        //     spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
        //   },
        //   {
        //     type: "Custom",
        //     spacing: 12,
        //     visible: true,
        //     return: (
        //       <Popover
        //         open={open}
        //         onClick={() => {
        //           setAnchorEl(null);
        //           setImg("");
        //         }}
        //         anchorOrigin={{
        //           vertical: "center",
        //           horizontal: "center",
        //         }}
        //         transformOrigin={{
        //           vertical: "center",
        //           horizontal: "center",
        //         }}
        //       >
        //         {img !== "" && (
        //           <MDBox width="800px" height="500px" component="img" src={img} alt="" />
        //         )}
        //       </Popover>
        //     ),
        //   },
        //   ...spreadDocComponents(),
        // ],
        [
          {
            type: "Tabs",
            value: tab,
            visible: customerView !== true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
              value: index,
              label: elem.name !== "" ? elem.name : "Main Life",
            })),
            spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          },
          {
            type: "Tabs",
            value: memberLevelTab,
            visible: customerView !== true,
            customOnChange: (e, newValue) => setMemberLevelTab(newValue),
            tabs: [
              { label: "Summary", value: 0 },
              { label: "Underwriting Field Rules", value: 1 },
              { label: "Documents", value: 2 },
              { label: "Decision", value: 3 },
              { label: "History", value: 4 },
            ],
            spacing: 12,
          },
          { type: "Input", visible: customerView !== true && memberLevelTab === 0, label: "Name" },
          { type: "Input", visible: customerView !== true && memberLevelTab === 0, label: "Age" },
          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 0,
            label: "Occupation",
          },
          { type: "Input", visible: customerView !== true && memberLevelTab === 0, label: "SAR" },
          {
            type: "Input",
            visible: customerView !== true && memberLevelTab === 0,
            label: "Total Annual Premium",
          },
          {
            type: "Input",
            visible: customerView !== true && memberLevelTab === 0,
            label: "BMI Value",
          },

          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 1,
            label: "BMI out of range",
          },
          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 1,
            spacing: 6,
            label: `State of Health Questions are answered "yes"`,
          },

          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 2,
            label: "Document Type",
          },
          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 2,
            label: "Select Additional Documents",
            multiple: true,
            value: [],
          },

          {
            type: "RadioGroup",
            visible: customerView !== true && memberLevelTab === 2,
            spacing: 12,
            path: "",
            radioLabel: { labelVisible: true, label: "Medical Fee paid by" },
            radioList: [
              { label: "By Company", value: "By Company" },
              { label: "By Customer", value: "By Customer" },
            ],
          },
          {
            type: "Typography",
            visible: customerView !== true && memberLevelTab === 2,
            spacing: 12,
            label: "Medical Document Details",
          },
          {
            type: "DataGrid",
            visible: customerView !== true && memberLevelTab === 2,
            spacing: 12,
            rowId: "id",
            columns: [
              { field: "id", headerName: "Document", width: 200 },
              { field: "link", headerName: "Link", width: 200 },
              { field: "status", headerName: "Status", width: 200 },
              { field: "date", headerName: "Date", width: 200 },
              { field: "remarks", headerName: "Remarks", width: 200 },
            ],
            value: [{ id: 1 }],
          },
          {
            type: "Typography",
            visible: customerView !== true && memberLevelTab === 2,
            spacing: 12,
            label: "Non-Medical Document Details",
          },
          {
            type: "DataGrid",
            visible: customerView !== true && memberLevelTab === 2,
            spacing: 12,
            rowId: "id",
            columns: [
              { field: "id", headerName: "Document", width: 200 },
              { field: "link", headerName: "Link", width: 200 },
              { field: "status", headerName: "Status", width: 200 },
              { field: "date", headerName: "Date", width: 200 },
              { field: "remarks", headerName: "Remarks", width: 200 },
            ],
            value: [{ id: 1 }],
          },

          {
            type: "AutoComplete",
            visible: customerView !== true && memberLevelTab === 3,
            label: "Under Writing Decision",
          },
          {
            type: "Input",
            visible: customerView !== true && memberLevelTab === 3,
            label: "Remarks",
          },
        ],
        [
          {
            type: "AutoComplete",
            visible: customerView !== true,
            label: "Under Writing Decision",
            options: [
              { mID: 1, mValue: "Approve" },
              { mID: 2, mValue: "Reject" },
              { mID: 3, mValue: "Request Add.info" },
            ],
          },
          { type: "MDDatePicker", visible: customerView !== true, label: "Commencement Date" },
          { type: "Input", visible: customerView !== true, label: "Remarks" },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            return: <MDBox sx={{ height: "1.5rem" }} />,
            visible: true,
          },
          {
            type: "GroupButton",
            visible: true,
            spacing: 12,
            justifyContent: "center",
            buttons: [
              {
                label: "Save Proposal",
                visible: true,
                onClick: onSaveProposal,
                startIcon: "save",
              },
              {
                label: "View Draft Proposal",
                visible: true,
                onClick: onViewDraftProposal,
                disabled: selectedList?.ProposalNo === undefined,
                startIcon: "download",
              },
              {
                label: "send for Signature",
                visible: false,
                onClick: onSendForSignature,
                disabled: selectedList?.src === "",
              },
              {
                label: "View Signed Copy",
                visible: false,
                onClick: onViewSignedCopy,
                disabled: selectedList?.envelopeId === "",
              },
            ],
          },
          {
            type: "Button",
            spacing: 12,
            label: "Save Proposal",
            visible: hideButtons !== true && false,
            variant: "outlined",
            justifyContent: "right",
            onClick: onSaveProposal,
            startIcon: "save",
          },
          {
            type: "PdfViewer",
            visible: false,
            spacing: 12,
            title: "Proposer Form",
            src: selectedList?.signedSrc,
            open: selectedList?.signedSrc !== "",
            onClose: onPdfClose,
            startIcon: "download",
          },
        ],
      ];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ setDto, selectedId, setLoading, selectedProposalNo }) => {
  const dto = getPolicyDto();
  const mst = { pdfViewer: false, src: "" };
  if (selectedId !== null && selectedId !== undefined) {
    setLoading(true);
    await GetQuoteDetails(selectedId).then((res) => {
      setLoading(false);
      if (res.finalResult !== undefined) setDto({ ...dto, ...res.finalResult });
    });
  }

  if (selectedProposalNo !== null && selectedProposalNo !== undefined) {
    setLoading(true);
    await GetProposalByNumber(selectedProposalNo).then((res) => {
      setLoading(false);
      if (res[0] && res[0].policyDetails !== undefined) setDto({ ...res[0].policyDetails });
    });
  }
  return mst;
};

const getViewProposalStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getViewProposalStepper;
