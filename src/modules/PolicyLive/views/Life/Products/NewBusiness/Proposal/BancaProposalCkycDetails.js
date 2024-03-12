import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import {
  OrderingArrayElementsByIds,
  // ParentChildNodeOrder,
} from "../../../../../../../Common/RenderControl/Version3/RenderControlFunctions";
import {
  ExecuteProcedure,
  GetQuoteDetails,
  SaveOpportunity,
  // GetContact,
  GenericApi,
} from "../data"; // GenericApi

function BancaProposalCkycDetails() {
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  console.log("search", search);
  const type = new URLSearchParams(search).get("OpportunityId");
  console.log("type1", type);
  const navigate = useNavigate();

  const CKYCDetails = async () => {
    const defaultValues = {
      Tax_CountryDetails: [],
      TaxDeclaration: "",
      Tax_26: "no",
      Tax_23: "no",
      Tax_25: "no",
      Tax_28: "no",
      Tax_22: "no",
      Tax_20: "no",
      Tax_19: "no",
      Civil_8: "no",
      Civil_23: "no",
      Civil_28: "no",
      Civil_30: "no",
      Civil_32: "no",
      Civil_33: "no",
      Civil_36: "no",
      Civil_37: "no",
      Civil_39: "no",
      Civil_41: "no",
      Civil_42: "no",
      Civil_43: "no",
      Civil_45: "no",
      Civil_47: "no",
      Civil_48: "no",
      Mining_7: "no",
      Mining_11: "no",
      OilNatural_7: "no",
      OilNatural_8: "no",
      OilNatural_9: "no",
      OilNatural_11: "no",
      OilNatural_12: "no",
      Sewage_6: "yes",
      Sewage_7: "yes",
      Army_7: "no",
      Army_9: "no",
      Army_11: "no",
      Army_13: "no",
      Army_15: "no",
      Army_17: "no",
      Army_19: "no",
      Army_21: "no",
      Navy_2: "no",
      Navy_4: "no",
      Navy_6: "no",
      Navy_8: "no",
      Navy_10: "no",
      Navy_11: "no",
      Navy_12: "no",
      Navy_13: "no",
      Navy_16: "no",
      Navy_18: "no",
      Navy_20: "no",
      Manufacture_6: "no",
      Manufacture_7: "no",
      Manufacture_8: "no",
      Manufacture_9: "no",
    };
    // const contactres = await GetContact("47089");
    // console.log("contactID", contactres);
    const res1 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
      OpportunityId: type,
    });
    setLoading(false);

    let ProposerDetails = {};
    let ChannelDetails = {};
    if (res1.finalResult !== undefined && res1.finalResult.QuotationList !== undefined) {
      const res3 = await GetQuoteDetails(res1.finalResult.QuotationList[0]);
      ProposerDetails = res3.quotationDetail?.QuotationDetails?.ProposerDetails;
      ChannelDetails = res3.quotationDetail?.QuotationDetails?.ChannelDetails;
    }
    console.log("ChannelDetails", ChannelDetails);

    if (Array.isArray(res1.finalResult?.RiskItems)) {
      const RiskArr2 = res1.finalResult.RiskItems;
      let RiskArr1 = [];
      try {
        RiskArr1.push({
          ...RiskArr2.filter((x) => x.Relation === "Self")[0],
          CountryOfResidency: ProposerDetails?.CountryOfResidency,
          CountryOfResidencyGroup: ProposerDetails?.CountryOfResidencyGroup,
        });
      } catch {
        //
      }
      RiskArr2.forEach((x) => {
        if (x.Relation !== "Self") RiskArr1.push(x);
      });

      const SelfItem = RiskArr1.filter((x) => x.Relation === "Self");
      if (SelfItem.length === 0) {
        // Proposer diff from Insurer
        RiskArr1 = [
          {
            Relation: "Self",
            DocumentDetails: [],
            Questionnare: [],
            ACR: [],
            ...ProposerDetails,
            CountryOfResidency: ProposerDetails?.CountryOfResidency,
            CountryOfResidencyGroup: ProposerDetails?.CountryOfResidencyGroup,
          },
          ...RiskArr1,
        ];
      }

      RiskArr1.forEach((x, i) => {
        if (x.Relation === "Self") {
          RiskArr1[i] = { ...x, ...ProposerDetails };
        }
      });

      let arr1 = Array.isArray(RiskArr1)
        ? RiskArr1.map((x) =>
            OrderingArrayElementsByIds(x.Questionnare.filter((y) => Object.keys(y).length > 0))
          )
        : [];

      arr1 = arr1.map((x1) => x1.map((x2) => ({ ...x2, Answer: x2.DefaultValue })));

      arr1.forEach((x1, i1) => {
        const getRenderQuestion = (x, i2) => {
          const arr = [];

          if (x.ControlType === "Radio")
            arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue.toLowerCase() : "";
          else if (x.ControlType === "GridView") arr1[i1][i2].Answer = [[], []];
          else arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue : "";
          if (x.DetailsLabel) arr1[i1][i2][x.DetailsLabel] = "";
          return arr;
        };

        x1.reduce((group1, product, index) => {
          const group = group1;
          const { QSubType } = product;
          group[QSubType] = group[QSubType] ?? [];
          group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
          return group;
        }, {});
      });

      let ProposalList = {};
      res1.finalResult.QuotationList.forEach((x) => {
        ProposalList = { ...ProposalList, [x]: [] };
      });
      const GenderMaster = {
        Male: "Male",
        Minor_Male: "Male",
        Female: "Female",
        Minor_Female: "Female",
        "Third Gender": "Third Gender",
        "Minor_Third Gender": "Third Gender",
      };

      try {
        setLoading(true);
        const res = await GenericApi("LifeInsurance", "LICCkycDownload", {
          ckycnumber: "50061283922295",
          DOB: "15-01-2000",
          ProposalKey: "111-1111-1131-111111-111",
          Master_Key: "111-1111-1131-111111-111",
          SourceID: "IT",
          ReferenceID: "11111111280920230001",
          "Product Code": "LifeInsurance",
          ProductCode: "LifeInsurance",
        });
        console.log("res", res);
        setLoading(false);

        if (res.finalResult?.message === "Success" && res.finalResult?.error_cd === "000") {
          //   setKycDetails(res.finalResult.personaldetails);
          const kycDetails = res.finalResult.personaldetails;
          const dto = {
            opportunityId: type,
            isAutoSave: true,
            AutoSave: {
              ChannelType: "A2C",
              PremiumDetails: {
                TotalPremium: "",
              },
              QuotationData: [],
              productDetails: [
                {
                  Product: "",
                  PlanNumber: "",
                },
              ],
              currentDate: "02-28-2024",
              //   opportunityId: "5456",
              RiskItems: RiskArr1.map((x, i) => ({
                KYCThrough: "ckyc",
                CKYCThrough: "PAN",
                CKYCDeclaration: "Yes",
                isGSTIN: "No",
                GSTIN: "",
                CKYCDetails: {
                  ckyc_number: "50061283922295",
                  full_name: kycDetails.FULLNAME,
                  // father_name: kycDetails.FATHER_FULLNAME,
                  age: "24",
                  image_type: "jpg",
                  // kyc_date: kycDetails.KYC_DATE,
                  update_date: "27-08-2023",
                  image: `data:image/jpg;base64,${res.finalResult.Imagedetails[1].IMAGE_DATA}`,
                  DOB: kycDetails.DOB,
                  Gender: kycDetails.GENDER,
                  CONSTITUTION_TYPE: "",
                  PLACE_OF_INCORPORATION: "",
                  CustomerType: "I",
                  CONSTI_TYPE: kycDetails.CONSTI_TYPE,
                  ACC_TYPE: kycDetails.ACC_TYPE,
                  CKYC_NO: kycDetails.CKYC_NO,
                  PREFIX: kycDetails.PREFIX,
                  FNAME: kycDetails.FNAME,
                  MNAME: kycDetails.MNAME,
                  LNAME: kycDetails.LNAME,
                  FULLNAME: kycDetails.FULLNAME,
                  MAIDEN_PREFIX: kycDetails.MAIDEN_PREFIX,
                  MAIDEN_FNAME: kycDetails.MAIDEN_FNAME,
                  MAIDEN_MNAME: kycDetails.MAIDEN_MNAME,
                  MAIDEN_LNAME: kycDetails.MAIDEN_LNAME,
                  MAIDEN_FULLNAME: kycDetails.MAIDEN_FULLNAME,
                  FATHERSPOUSE_FLAG: kycDetails.FATHERSPOUSE_FLAG,
                  FATHER_PREFIX: kycDetails.FATHER_PREFIX,
                  FATHER_FNAME: kycDetails.FATHER_FNAME,
                  FATHER_MNAME: kycDetails.FATHER_MNAME,
                  FATHER_LNAME: kycDetails.FATHER_LNAME,
                  FATHER_FULLNAME: kycDetails.FATHER_FULLNAME,
                  MOTHER_PREFIX: kycDetails.MOTHER_PREFIX,
                  MOTHER_FNAME: kycDetails.MOTHER_FNAME,
                  MOTHER_MNAME: kycDetails.MOTHER_MNAME,
                  MOTHER_LNAME: kycDetails.MOTHER_LNAME,
                  MOTHER_FULLNAME: kycDetails.MOTHER_FULLNAME,
                  GENDER: kycDetails.GENDER,
                  MARITAL_STATUS: kycDetails.MARITAL_STATUS,
                  NATIONALITY: null,
                  OCCUPATION: null,
                  RESI_STATUS: null,
                  JURI_FLAG: null,
                  JURI_RESI: null,
                  TAX_NUM: null,
                  BIRTH_COUNTRY: null,
                  BIRTH_PLACE: null,
                  PERM_TYPE: null,
                  PERM_LINE1: "PURANI GUDRI MHABIR CHOWK WARD",
                  PERM_LINE2: "NO 1O",
                  PERM_LINE3: "BETTIAH",
                  PERM_CITY: "West Champaran",
                  PERM_DIST: "Pashchim Champaran",
                  PERM_STATE: "BR",
                  PERM_COUNTRY: "IN",
                  PERM_PIN: "845438",
                  PERM_POA: "09",
                  PERM_POAOTHERS: null,
                  PERM_CORRES_SAMEFLAG: "N",
                  CORRES_LINE1: "31 2nd floor rbi layout",
                  CORRES_LINE2: "Kothnur main road",
                  CORRES_LINE3: "Jp nagar 7th phase",
                  CORRES_CITY: "Bengaluru",
                  CORRES_DIST: "BENGALURU URBAN",
                  CORRES_STATE: "KA",
                  CORRES_COUNTRY: "IN",
                  CORRES_PIN: "560078",
                  JURI_SAME_FLAG: null,
                  JURI_LINE1: null,
                  JURI_LINE2: null,
                  JURI_LINE3: null,
                  JURI_CITY: null,
                  JURI_STATE: null,
                  JURI_COUNTRY: null,
                  JURI_PIN: null,
                  RESI_STD_CODE: "",
                  RESI_TEL_NUM: "",
                  OFF_STD_CODE: "",
                  OFF_TEL_NUM: "",
                  MOB_CODE: "91",
                  MOB_NUM: "9135060898",
                  FAX_CODE: null,
                  FAX_NO: null,
                  EMAIL: "ABHISHEKSONTI750@GMAIL.COM",
                  REMARKS: "",
                  DEC_DATE: "05-08-2023",
                  DEC_PLACE: "BangaloreJpNagar7thPhase",
                  KYC_DATE: "********",
                  DOC_SUB: "02",
                  KYC_NAME: "********",
                  KYC_DESIGNATION: "********",
                  KYC_BRANCH: "********",
                  KYC_EMPCODE: "********",
                  ORG_NAME: "********",
                  ORG_CODE: "********",
                  NUM_IDENTITY: "3",
                  NUM_RELATED: "0",
                  NUM_LOCALADDRESS: null,
                  NUM_IMAGES: "4",
                  NAME_UPDATE_FLAG: null,
                  PERSONAL_UPDATE_FLAG: null,
                  ADDRESS_UPDATE_FLAG: null,
                  CONTACT_UPDATE_FLAG: null,
                  REMARKS_UPDATE_FLAG: null,
                  KYC_UPDATE_FLAG: null,
                  IDENTITY_UPDATE_FLAG: null,
                  RELPERSON_UPDATE_FLAG: null,
                  IMAGE_UPDATE_FLAG: null,
                  CONSTI_TYPE_OTHERS: null,
                  PLACE_INC: null,
                  COUN_INC: null,
                  TIN_GST: null,
                  TIN_COUN: null,
                  PAN: null,
                  MOB_CODE1: null,
                  MOB_NUM1: null,
                  MOB_CODE2: null,
                  MOB_NUM2: null,
                },
                SuitabiltyAnalysis: {
                  ObjectiveInsurance: "",
                  Category: "",
                  RiskProfile: "",
                  SecuredLoan: "",
                },
                Occupation: {
                  EducationalQualification: "",
                  EducationalQualificationCode: "",
                  PresentOccupation: "",
                  PresentOccupationCode: "",
                  SourceOfIncome: "",
                  SourceOfIncomeCode: "",
                  NatureOfDuty: "",
                  NatureOfDutyCode: "",
                  EmployerName: "",
                  Experience: "",
                  AnnualIncome1: "",
                  AnnualIncome2: "",
                  AnnualIncome3: "",
                  ITAssessess: "",
                  Questionnare: [],
                  ActiveAgent: "No",
                  Annuxure: { ...defaultValues },
                  TaxResidency: "No",
                },
                CommunicationAddress: {
                  City: kycDetails.CORRES_CITY,
                  State: kycDetails.CORRES_STATE,
                  Country: kycDetails.CORRES_COUNTRY,
                  Pincode: kycDetails.CORRES_PIN,
                  AddressLine1: kycDetails.CORRES_LINE1,
                  AddressLine2: kycDetails.CORRES_LINE2,
                  AddressLine3: kycDetails.CORRES_LINE3,
                  Landmark: "",
                  District: kycDetails.CORRES_DIST,
                },
                sameComAddress: kycDetails.PERM_CORRES_SAMEFLAG,
                PermanentAddress: {
                  City: kycDetails.PERM_CITY,
                  State: kycDetails.PERM_STATE,
                  Country: kycDetails.PERM_COUNTRY,
                  Pincode: kycDetails.PERM_PIN,
                  AddressLine1: kycDetails.PERM_LINE1,
                  AddressLine2: kycDetails.PERM_LINE2,
                  AddressLine3: kycDetails.PERM_LINE3,
                  Landmark: "",
                  District: kycDetails.PERM_DIST,
                },
                ForeignAddress: {
                  OCI: "",
                  AddressLine1: "",
                  AddressLine2: "",
                  AddressLine3: "",
                  City: "",
                  District: "",
                  State: "",
                  Country: "",
                  Pincode: "",
                },
                PreviousPolicyDetails: [],
                NonLICPreviousPolicyDetails: [],
                NonLICPreviousPolicyExist: "No",
                FamilyPreviousPolicyDetails: [],
                FamilyNonLICPreviousPolicyDetails: [],
                NonLICPPDDeclaration: true,
                LICPPDDeclaration: true,
                FamilyHistory: [
                  {
                    Relation: "Father",
                    Age: "",
                    HealthStatus: "",
                    LivingDead: "",
                  },
                  { Relation: "Mother", Age: "", HealthStatus: "", LivingDead: "" },
                ],
                BankDetails: {
                  IFSCode: "",
                  AccountNo: "",
                  AccountType: "Savings",
                  AccountTypeId: "1",
                  HolderName: "",
                  BankName: "",
                  Branch: "",
                  BranchAddress: "",
                  NachSameAsNeft: "No",
                  NachIFSCode: "",
                  NachAccountNo: "",
                  NachAccountType: "Savings",
                  NachAccountTypeId: "1",
                  NachHolderName: "",
                  NachBankName: "",
                  NachBranch: "",
                  NachBranchAddress: "",
                  NachBankType: "eNach", // nach // eNach
                },

                MemberId: 0,
                Name: "MR ABHISHEK  KUMAR",
                Gender: GenderMaster[x.Gender],
                Relation: "Self",
                DOB: "2000-01-15",
                Age: 24,
                proposerNotAnInsured: "No",
                Category: {
                  NMCategory: "NMS",
                  FemaleCategory: "",
                  MedicalType: "NoMed",
                  MedicalReports: "",
                  IsMHR: "No",
                  MHRType: "",
                },
                Questionnare: arr1[i],
                // opportunityId: 14044,
                contactId: 47248,
                contactTypeId: null,
                contactType: "",
                IdentificationNo: "",
                FirstName: "ABHISHEK",
                LastName: "KUMAR",
                ContactNo: "9135060898",
                HomeNo: "",
                WorkNo: "",
                OccupationCode: "",
                Salutation: "MR",
                SalutationId: "",
                PassportNo: "",
                EmailId: "ABHISHEKSONTI750@GMAIL.COM",
                Place: "",
                AnnualIncome: "",
                MaritalStatus: "Single",
                leadNo: "",
                leadDate: "",
                MiddleName: "",
                ResidentStatus: "Resident Indian",
                TypeOfProposal: "Individual",
                isPermanentAddrSameasCommAddr: true,
                "": 1,
                WhatsAppNo: "6363428664",
                creationDate: "2024-02-28T13:54:15.445Z",
                lastUpdated: "2024-02-28T13:55:43.749Z",
                needAnalysisJson: {
                  finAnalysis: {
                    fromYear: "2023",
                    toYear: "2033",
                    inflationRate: "8",
                    planYears: "10",
                    interestRate: "8",
                    assetProt: "0",
                    incomeProt: "0",
                    emergencyFund: 0,
                    assets: [],
                    liabilities: [],
                    income: [],
                    expenses: [],
                    reserves: {
                      criticalIllness: {
                        req: "",
                        avlb: "",
                      },
                      hospitalisation: {
                        req: "",
                        avlb: "",
                      },
                      additional: {
                        req: "",
                        avlb: "",
                      },
                    },
                    dreams: [],
                    dreamInfo: {
                      currReq: "",
                      estAmt: "",
                      avlFund: "",
                      gap: "",
                    },
                    policyEmergencyFund: "",
                    policyMaturityFund: "",
                    dreamGap: 0,
                  },
                  graphData: [],
                  questions: [],
                  selectedProducts: [
                    {
                      planNumber: "936",
                      ProductId: "47",
                      Product: "LIC's Jeevan Labh",
                      mID: "47",
                      mValue: "LIC's Jeevan Labh",
                    },
                    {
                      mID: 47,
                      mValue: "LIC's Jeevan Labh",
                    },
                  ],
                },
                selectedProducts: [
                  {
                    planNumber: "936",
                    ProductId: "47",
                    Product: "LIC's Jeevan Labh",
                    mID: "47",
                    mValue: "LIC's Jeevan Labh",
                  },
                ],
                stageId: 2,
                stageStatusId: 1,
                txnType: "",
                txnValue: "",
                txnValueId: "",
                // selectedProducts: [],
                MobileNo: "9135060898",
                DocumentList: {},
                DocumentDetails: [
                  {
                    DocumentId: 8,
                    DocumentCode: "D007",
                    DocumentName: "Self Cancelled Cheque",
                    DocumentSubType: "",
                    DocumentType: "Self Cancelled Cheque",
                    IsMandatory: "1",
                    SubdocumentCount: 1,
                    SubdocumentMandatory: "",
                    localType: "Self Cancelled Cheque ",
                  },
                ],
                ACR: [],
                IsNach: "Yes",
                DoYouKnowYourCKYCNumber: "No",
                PANNo: "HJDPK4016F",
                CKYCNo: "50061283922295",
                FatherName: "MR MANOJ  SINGH",
                MotherName: "MRS UMA  DEVI",
                AlternativeContactNo: "4926496616",
                MaritalStatusId: 6,
                MaritalQuestionnare: [],
                BirthPlace: "KA",
              })),
              QuotationList: ["2410000481"],
              ProposerSameAsInsurable: "Yes",
              ChannelDetails,
              ProposalList: {
                2410000481: [],
              },
              ProposerContactNo: "6363428338",
              MHRAllocation: {},
              workflowStage: "proposal",
            },

            MHRAllocation: {},
            stageStatusId: 0,
          };

          const Save = await SaveOpportunity({
            opportunityId: dto.opportunityId,

            isAutoSave: true,
            AutoSave: {
              currentDate: "15-01-2000",
              opportunityId: dto.opportunityId,
              RiskItems: dto.AutoSave.RiskItems,
              QuotationList: res1.finalResult.QuotationList,
              ProposalList,
              workflowStage: "proposal",
            },
          });
          console.log("saveopportunity", Save);
          if (Save.status === 3) {
            navigate(`/Proposal?OpportunityId=${dto.opportunityId}`);
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "c-KYC details not fetched!",
            allowOutsideClick: false,
          });
        }
      } catch (error) {
        console.error("Error fetching CKYC details:", error);
      }

      //   const dto = {
      //     opportunityId: contactres.finalResult.opportunityId,
      //     // OpportunityNumber: "2450012486",
      //     ProposerDisclaimerConsent: true,
      //     ProposerDetails,
      //     ProposerSameAsInsurable: SelfItem.length === 0 ? "No" : "Yes",
      //     QuotationList: res1.finalResult.QuotationList,
      //     ProposalList,
      //     QuotationData: [],
      //     isMSP: false,
      //     ChannelDetails,
      //     MHRAllocation: {},
      //     RiskItems: RiskArr1.map((x, i) => ({
      //       KYCThrough: x.Age <= 12 ? "nokyc" : "ckyc",
      //       CKYCThrough: "",
      //       CKYCDeclaration: "",
      //       isGSTIN: "No",
      //       GSTIN: "",
      //       CKYCDetails: {},
      //       SuitabiltyAnalysis: {},
      //       Pregnant: "No",
      //       DeliveryHistory: "No",
      //       Gynecologist: "No",
      //       Abortion: "No",
      //       AlternativeContactNo: "9916408742",

      //       Occupation: {
      //         EducationalQualification: "",
      //         EducationalQualificationCode: "",
      //         PresentOccupation: "",
      //         PresentOccupationCode: "",
      //         SourceOfIncome: "",
      //         SourceOfIncomeCode: "",
      //         NatureOfDuty: "",
      //         NatureOfDutyCode: "",
      //         EmployerName: "",
      //         Experience: "",
      //         AnnualIncome1: "",
      //         AnnualIncome2: "",
      //         AnnualIncome3: "",
      //         ITAssessess: "",
      //         Questionnare: [],
      //         ActiveAgent: "No",
      //         Annuxure: { ...defaultValues },
      //         TaxResidency: "No",
      //       },

      //       CommunicationAddress: {
      //         AddressLine1: "",
      //         AddressLine2: "",
      //         AddressLine3: "",
      //         Country: "",
      //         State: "",
      //         District: "",
      //         City: "",
      //         Pincode: "",
      //       },
      //       sameComAddress: "",
      //       PermanentAddress: {
      //         AddressLine1: "",
      //         AddressLine2: "",
      //         AddressLine3: "",
      //         Country: "",
      //         State: "",
      //         District: "",
      //         City: "",
      //         Pincode: "",
      //       },
      //       ForeignAddress: {
      //         OCI: "No",
      //         AddressLine1: "",
      //         AddressLine2: "",
      //         AddressLine3: "",
      //         City: "",
      //         District: "",
      //         State: "",
      //         Country: "",
      //         Pincode: "",
      //       },

      //       PreviousPolicyDetails: [],
      //       NonLICPreviousPolicyDetails: [],
      //       NonLICPreviousPolicyExist: "No",
      //       FamilyPreviousPolicyDetails: [],
      //       FamilyNonLICPreviousPolicyDetails: [],
      //       NonLICPPDDeclaration: false,
      //       LICPPDDeclaration: false,
      //       FamilyHistory: [{ Relation: "Father" }, { Relation: "Mother" }],
      //       BankDetails: {
      //         IFSCode: "",
      //         AccountNo: "",
      //         AccountType: "Savings",
      //         AccountTypeId: "1",
      //         HolderName: "",
      //         BankName: "",
      //         Branch: "",
      //         BranchAddress: "",
      //         NachSameAsNeft: "No",
      //         NachIFSCode: "",
      //         NachAccountNo: "",
      //         NachAccountType: "Savings",
      //         NachAccountTypeId: "1",
      //         NachHolderName: "",
      //         NachBankName: "",
      //         NachBranch: "",
      //         NachBranchAddress: "",
      //         NachBankType: "eNach", // nach // eNach
      //       },

      //       ...x,
      //       MobileNo: x.ContactNo,
      //       Gender: GenderMaster[x.Gender],
      //       DocumentList: {},
      //       DocumentDetails: [],

      //       Questionnare: arr1[i],
      //       // ACR: arr2[i],
      //       ACR: [],
      //       Category: {},
      //     })),
      //   };
    }
  };

  useEffect(() => {
    CKYCDetails();
  }, []);

  return (
    <div>
      <h4>CKYC Details</h4>
      {loading && <p>Loading CKYC details...</p>}
      {/* {!loading && !ckycDetails && <p>No CKYC details found</p>}
      {!loading && ckycDetails && <pre>{JSON.stringify(ckycDetails, null, 2)}</pre>} */}
    </div>
  );
}

export default BancaProposalCkycDetails;
