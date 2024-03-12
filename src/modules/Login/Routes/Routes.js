import React, { lazy } from "react";
import Icon from "@mui/material/Icon";
import ProcessingV2 from "../../ClaimsLive/views/GenericClaims/ProcessingV2";
import TakafulDashboard from "../../ClaimsLive/views/GenericClaims/ProcessingV2/Products/TakafulOman/TakafulDashBoard";

//
// const PLPagesLayout = lazy(() => import("../Layouts/PLPagesLayout/PLPagesLayout"));
const BaseTest = lazy(() => import("../../BaseSetup/views/BaseTest"));
const Template = lazy(() => import("../../BaseSetup/views/Templates"));
const RateExecution = lazy(() => import("../../BaseSetup/views/Rating/RateExecution"));
const ViewRateTable = lazy(() => import("../../BaseSetup/views/Rating/ViewRateTable"));
const ReportConfiguration = lazy(() => import("../../BaseSetup/views/Reports/ReportConfiguration"));
const ReportGeneration = lazy(() => import("../../BaseSetup/views/Reports/ReportGeneration"));
const ReportUpdate = lazy(() => import("../../BaseSetup/views/Reports/ReportUpdate"));
const Dispatcher = lazy(() => import("../../BaseSetup/views/ProductDispatcher/Dispatcher"));
const CloneDispatcher = lazy(() =>
  import("../../BaseSetup/views/ProductDispatcher/CloneDispatcher")
);
const EditDispatcher = lazy(() => import("../../BaseSetup/views/ProductDispatcher/EditDispatcher"));
const Configuration = lazy(() => import("../../BaseSetup/views/Communication/Configuration"));
const Execution = lazy(() => import("../../BaseSetup/views/Communication/Execution"));
const GroupCommunication = lazy(() =>
  import("../../BaseSetup/views/Communication/GroupCommunication")
);
const PolicySearch = lazy(() => import("../../BaseSetup/views/Policy/PolicySearch"));
const QuoteSearch = lazy(() => import("../../BaseSetup/views/Quote/QuoteSearch"));
const RateParameters = lazy(() => import("../../BaseSetup/views/Rating/RateParameters"));
const ParameterGroup = lazy(() => import("../../BaseSetup/views/Rating/ParameterGroup"));
const RateTable = lazy(() => import("../../BaseSetup/views/Rating/RateTable"));
const CalculationConfig = lazy(() => import("../../BaseSetup/views/Rating/CalculationConfig"));
const CalculationResult = lazy(() => import("../../BaseSetup/views/Rating/CalculationResult"));
const CalculationDisplay = lazy(() => import("../../BaseSetup/views/Rating/CalculationDisplay"));
const EditCalculationConfig = lazy(() =>
  import("../../BaseSetup/views/Rating/EditCalculationConfig")
);

const CreateCDAccount = lazy(() => import("../../BaseSetup/views/ManageCD/CreateCDAccount"));
const CDView = lazy(() => import("../../BaseSetup/views/ManageCD/CDView"));

const CDReplenish = lazy(() => import("../../BaseSetup/views/ManageCD/CDReplenish"));
const IllustrationConfig = lazy(() => import("../../BaseSetup/views/Rating/IllustrationConfig"));
const IllustrationResult = lazy(() => import("../../BaseSetup/views/Rating/IllustrationResult"));
const ObjectMapper = lazy(() => import("../../BaseSetup/views/ProductDispatcher/ObjectMapper"));
const ConfigureEntity = lazy(() =>
  import("../../BaseSetup/views/ProductDispatcher/ConfigureEntity")
);
const ProductGenericAPI = lazy(() =>
  import("../../BaseSetup/views/ProductDispatcher/ProductGenericAPI")
);
const DispatcherExecution = lazy(() =>
  import("../../BaseSetup/views/ProductDispatcher/DispatcherExecution")
);
const ProductConfiguration = lazy(() =>
  import("../../BaseSetup/views/Products/ProductConfiguration")
);
const ProductSearch = lazy(() => import("../../BaseSetup/views/Products/ProductSearch"));
const ProductClone = lazy(() => import("../../BaseSetup/views/Products/ProductClone"));

const GeneratePolicyJson = lazy(() => import("../../BaseSetup/views/Products/GeneratPolicyJson"));
const CoverGrouping = lazy(() => import("../../BaseSetup/views/Products/CoverGrouping"));
const CoverGroupingV2 = lazy(() => import("../../BaseSetup/views/Products/CoverGroupingV2"));

const ClaimIntimation = lazy(() => import("../../BaseSetup/views/TravelClaims/ClaimIntimation"));
const ClaimProcessing = lazy(() => import("../../BaseSetup/views/TravelClaims/ClaimProcessing"));

const MotorIntimation = lazy(() =>
  import("../../ClaimsLive/views/MotorClaims/Processing/Intimation/index")
);
const SearchClaims = lazy(() =>
  import("../../ClaimsLive/views/MotorClaims/Processing/Intimation/SearchClaims")
);
const Endorsement = lazy(() => import("../../BaseSetup/views/Endorsement/Endorsement"));
const EndorsementConfig = lazy(() =>
  import("../../BaseSetup/views/Endorsement/Configuration/index")
);
const EndorsementExecution1 = lazy(() =>
  import("../../BaseSetup/views/Endorsement/EndorsementExecution/EndorsementExecution1")
);
const EndorsementExecution2 = lazy(() =>
  import("../../BaseSetup/views/Endorsement/EndorsementExecution/EndorsementExecution2")
);
const UserCreation = lazy(() => import("../../BaseSetup/views/Users/UserCreation"));
const MyProfile = lazy(() => import("../../BaseSetup/views/Users/MyProfile"));
const BulkUpload = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NBRetail/COI/BulkUpload")
);
const QrScanner = lazy(() => import("../../PolicyLive/views/Retail/Products/USGI/QrScanner"));
const BulkUploadStatus = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NBRetail/COI/UploadStatus")
);
const BulkUploadHistory = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NBRetail/COI/UploadHistory")
);

const StudentEnrollment = lazy(() => import("../../BaseSetup/views/Enrolment/StudentEnrollment"));
const ReadyforUpload = lazy(() => import("../../BaseSetup/views/Enrolment/ReadyforUpload"));

const ChangePassword = lazy(() => import("../../BaseSetup/views/Users/ChangePassword"));
const ModifyUser = lazy(() => import("../../BaseSetup/views/Users/ModifyUser"));
const CreateRole = lazy(() => import("../../BaseSetup/views/Users/CreateRole"));
const EditRole = lazy(() => import("../../BaseSetup/views/Users/EditRole"));

const AssignRole = lazy(() => import("../../BaseSetup/views/Users/AssignRole"));
const Dashboard = lazy(() => import("../Dashboard"));
const EditRules = lazy(() => import("../../BaseSetup/views/RuleEngine/EditRules"));
const Parameters = lazy(() => import("../../BaseSetup/views/RuleEngine/Parameters"));
const RuleConfig = lazy(() => import("../../BaseSetup/views/RuleEngine/RuleConfig"));
const RuleExecution = lazy(() => import("../../BaseSetup/views/RuleEngine/RuleExecution"));
const RuleObject = lazy(() => import("../../BaseSetup/views/RuleEngine/RuleObject"));
const MotorProcessing = lazy(() => import("../../ClaimsLive/views/MotorClaims/Processing"));
const HomeInsurance = lazy(() => import("../../PolicyLive/views/Home"));
const BLUS = lazy(() => import("../../PolicyLive/views/BLUS"));
const CPM = lazy(() => import("../../PolicyLive/views/CPM"));
const ReportExecution = lazy(() => import("../../PolicyLive/views/Reports/ReportExecution"));

const ViewPolicy = lazy(() => import("../../PolicyLive/views/ViewPolicy/Viewpolicy"));
const DentalInsurance = lazy(() => import("../../PolicyLive/views/Health/Chomp"));
const COI = lazy(() => import("../../PolicyLive/views/Health/Chomp/COI"));
const CustomerFLow = lazy(() => import("../../PolicyLive/views/Health/CustomerFLow"));
const SpecificVoyage = lazy(() => import("../../PolicyLive/views/Marine/SpecificVoyage"));
const IMDProfileCreation = lazy(() =>
  import("../../PolicyLive/views/Marine/IMDProfileCreation/IMDProfileCreation")
);
const MasterPolicyStop = lazy(() => import("../../PolicyLive/views/Marine/MSTOP/MasterPolicyStop"));
const MasterPolicyOpen = lazy(() => import("../../PolicyLive/views/Marine/MOPEN/MasterPolicyOpen"));
const CertificateIssueOpen = lazy(() =>
  import("../../PolicyLive/views/Marine/MOPEN/CertificateIssueOpen")
);
const CertificateIssueStop = lazy(() =>
  import("../../PolicyLive/views/Marine/MSTOP/CertificateIssueStop")
);
const ViewCertificateStop = lazy(() =>
  import("../../PolicyLive/views/Marine/MSTOP/ViewCertificateStop")
);
const ViewCertificateOpen = lazy(() =>
  import("../../PolicyLive/views/Marine/MOPEN/ViewCertificateOpen")
);
const CreateCertificateStop = lazy(() =>
  import("../../PolicyLive/views/Marine/MSTOP/CreateCertificateStop")
);
const CreateCertificateOpen = lazy(() =>
  import("../../PolicyLive/views/Marine/MOPEN/CreateCertificateOpen")
);
const CreatePartner = lazy(() => import("../../BaseSetup/views/Partner/CreatePartner"));
const AssignProduct = lazy(() => import("../../BaseSetup/views/Partner/AssignProduct"));
const SearchPartner = lazy(() => import("../../BaseSetup/views/Partner/SearchPartner"));
const OffHierarchy = lazy(() => import("../../BaseSetup/views/OffHierarchy"));
const WFDashboard = lazy(() => import("../../BaseSetup/views/WorkFlow/WFDashboard"));
const WFInstance = lazy(() => import("../../BaseSetup/views/WorkFlow/WFInstance"));
const WFConfigurator = lazy(() => import("../../BaseSetup/views/WorkFlow/WFConfigurator"));
const WFExecution = lazy(() => import("../../BaseSetup/views/WorkFlow/WFExecution"));
const TravelInfinity = lazy(() => import("../../PolicyLive/views/Travel/TravelInfinity"));
const CreateTreaty = lazy(() => import("../../BaseSetup/views/Reinsurance/CreateTreaty"));
const DefineRetention = lazy(() => import("../../BaseSetup/views/Reinsurance/DefineRetention"));
const GroupSequencing = lazy(() => import("../../BaseSetup/views/Reinsurance/GroupSequencing"));
const Reallocation = lazy(() => import("../../BaseSetup/views/Reinsurance/Reallocation"));
const ReallocationTest = lazy(() => import("../../BaseSetup/views/Reinsurance/ReallocationTest"));
const SearchParticipant = lazy(() => import("../../BaseSetup/views/Reinsurance/SearchParticipant"));
const SearchRetention = lazy(() => import("../../BaseSetup/views/Reinsurance/SearchRetention"));
const SearchTreaty = lazy(() => import("../../BaseSetup/views/Reinsurance/SearchTreaty"));
const SearchgroupingSequencing = lazy(() =>
  import("../../BaseSetup/views/Reinsurance/SearchGroupingSequencing")
);

const ParticipantMaster = lazy(() => import("../../BaseSetup/views/Reinsurance/ParticipantMaster"));

const ImageProcessing = lazy(() => import("../../BaseSetup/views/MachineLearning/ImageProcessing"));

// AVO Life Modules
const DashboardLife = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/DashBoard/DashboardIndex")
);
const LifeEmployeeDashboardIndex = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/DashBoard/EmployeeDashboard")
);

const CustomerDocumentUpload = lazy(() =>
  import("../../PolicyLive/views/Life/Products/Customer/data/CustomerDocumentUpload")
);
const EmployeeViewDocuments = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/DashBoard/ViewDocuments")
);
const Lead = lazy(() => import("../../PolicyLive/views/Life/Products/NewBusiness/Lead"));
const Prospect = lazy(() => import("../../PolicyLive/views/Life/Products/NewBusiness/Prospect"));
const Quotation = lazy(() => import("../../PolicyLive/views/Life/Products/NewBusiness/Quotation"));
const Proposal = lazy(() => import("../../PolicyLive/views/Life/Products/NewBusiness/Proposal"));
const LifeCalculators = lazy(() => import("../../PolicyLive/views/Life/Products/Calculators"));
const LifePlans = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/Quotation/Plans")
);
const CustomerApplication = lazy(() =>
  import("../../PolicyLive/views/Life/Products/Customer/data/TrackApplications")
);

const CustomerLifeLanding = lazy(() => import("../../PolicyLive/views/Life/Products/Customer"));
const CustomerQuote = lazy(() => import("../../PolicyLive/views/Life/Products/Customer/Quote"));

//

const ViewDashboard = lazy(() => import("../../BaseSetup/views/DynamicDashboards/ViewDashboard"));

const NepalLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/LandingPages/NepalLandingPage")
);
const AllRetailLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/LandingPages/AllRetailLandingPage")
);
const AllRetailDemoLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/LandingPages/AllRetailDemoLandingPage")
);
const StepperV1 = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV1"));
const StepperV2 = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV2"));
const QRFooter = lazy(() => import("../../PolicyLive/views/Retail/Products/USGI/QRFooter"));
const StepperV3 = lazy(() => import("../../PolicyLive/views/Retail/Layout/Version3/StepperV3"));
// const StepperV2 = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV2"));
// const StepperV2ShopKeeper = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV2"));
// const StepperV2Cyber = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV2"));
// const StepperV2GroupTravel = lazy(() => import("../../PolicyLive/views/Retail/Layout/StepperV2"));

const Failurepage = lazy(() => import("../../PolicyLive/views/Retail/Payment/FailurePage"));
const SuccessPage = lazy(() => import("../../PolicyLive/views/Retail/Payment/SuccessPage"));
const NepalDashboard = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/PolicyNSTP/NepalDashboard")
);
const NepalManagerDashboard = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/PolicyNSTP/NepalManagerDashboard")
);
const MagmaLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/LandingPages/MagmaLandingPage")
);
const UploadStatus = lazy(() => import("../../BaseSetup/views/ExcelUpload/UploadStatus"));
const TemplateUpload = lazy(() => import("../../BaseSetup/views/ExcelUpload/TemplateUpload"));
const ExcelUpload = lazy(() => import("../../BaseSetup/views/ExcelUpload/ExcelUpload"));
const MagmaSuccess = lazy(() => import("../../PolicyLive/views/Retail/Payment/MagmaSuccess"));
const Intimation = lazy(() => import("../../ClaimsLive/views/HealthClaims/Intimation"));
const Processing = lazy(() => import("../../ClaimsLive/views/GenericClaims/ClaimProcessingSearch"));

// const MagmaRazor = lazy(() => import("../../PolicyLive/views/Retail/Payment/MagmaRazor"));
const ReyzorPay = lazy(() => import("../../PolicyLive/views/Retail/Products/NBRetail/ReyzorPay"));
const ListOfMaster = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/MasterPolicy")
);
const MagmaCoiList = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/MagmaCoiList")
);
const IssuanceReport = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/IssuanceReport")
);
const NBRetailSuccess = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NBRetail/NBRetailSuccess")
);
const MagmaOnlineSuccess = lazy(() =>
  import("../../PolicyLive/views/Retail/Payment/MagmaOnlineSuccess")
);
const NepalIssuedPolicies = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/PolicyNSTP/NepalIssuedPolicies")
);
const ManagerIssuedPolicies = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/PolicyNSTP/ManagerIssuedPolicies")
);
const ClaimReport = lazy(() => import("../../PolicyLive/views/Retail/Products/Magma/ClaimReport"));
const UploadStatusMagma = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/UploadStatusMagma")
);
const UploadStatusActions = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/UploadStatusActions")
);
const AgentDashboard = lazy(() => import("../../PolicyLive/views/Dashboards/AgentDashboard"));
const EmployeeDashboard = lazy(() => import("../../PolicyLive/views/Dashboards/EmployeeDashboard"));
const MasterPolicySetup = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/MasterPolicySetup")
);
const TravelClaimIntimation = lazy(() =>
  import("../../ClaimsLive/views/TravelClaims/ClaimIntimation")
);
const TravelClaimProcessing = lazy(() =>
  import("../../ClaimsLive/views/TravelClaims/ClaimProcessing")
);
const TravelClaimEnquiry = lazy(() => import("../../ClaimsLive/views/TravelClaims/ClaimEnquiry"));
const TravelGenerateReport = lazy(() =>
  import("../../ClaimsLive/views/TravelClaims/GenerateReport")
);
const TravelUploadReport = lazy(() => import("../../ClaimsLive/views/TravelClaims/UploadReport"));
// const ClaimHome = lazy(() => import("../views/TravelClaims/ClaimHome"));
const TravelInfinityInsurance = lazy(() => import("../../PolicyLive/views/Travel/TravelInfinity"));
// const MasterPolicyStop = lazy(() => import("../../PolicyLive/views/Marine/MSTOP/MasterPolicyStop"));
const GeneralInsurance = lazy(() => import("../../PolicyLive/views/GeneralInsurance"));
const SalesManager = lazy(() => import("../../PolicyLive/views/GeneralInsurance/SalesManager"));
const UnderWriter = lazy(() => import("../../PolicyLive/views/GeneralInsurance/UnderWriter"));
const Finance = lazy(() => import("../../PolicyLive/views/GeneralInsurance/Finance/index"));
const Operational = lazy(() => import("../../PolicyLive/views/GeneralInsurance/Operational"));

const NepalEndrosementLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Endorsement/LandingPage")
);
// const NepalB2CProd = lazy(() =>
//   import("../../PolicyLive/views/Retail/Products/NepalProds/B2C/B2CProd")
// );
const ClaimReports = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/Intimation/ClaimReports")
);
const ClaimReOpen = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/Intimation/ClaimReOpen")
);
const ClaimSearch = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/Intimation/ClaimSearch")
);
const ProcessingClaimSearch = lazy(() =>
  import("../../ClaimsLive/views/GenericClaims/ClaimSearch/ProcessingClaimSearch")
);
const Home = lazy(() => import("../../ClaimsLive/views/HealthClaims/Intimation/Home"));
const ReceiveQuery = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/Intimation/ReceiveQuery")
);
const MakeExpensePayout = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/Intimation/MakeExpensePayout")
);
const Processing1 = lazy(() => import("../../ClaimsLive/views/GenericClaims/Processing"));
const RedirectToRetail = lazy(() => import("../../PolicyLive/views/Retail/data/RedirectToRetail"));
const SinglePageV2 = lazy(() => import("../../PolicyLive/views/Retail/Layout/SinglePageV2"));
const NewCourses = lazy(() =>
  import("../../PolicyLive/views/LICDemo/Admin/AdminCourse/NewCourses")
);
const ApplicationList = lazy(() =>
  import("../../PolicyLive/views/LICDemo/Admin/AppLication/ApplicationList")
);
const PospOnboarding = lazy(() => import("../../PolicyLive/views/LICDemo/Admin/AppLication/index"));
const CourseList = lazy(() =>
  import("../../PolicyLive/views/LICDemo/Admin/AdminCourse/CoursesList")
);

const LifeUnderWriterDashboard = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/LifeUnderWriterDashboard")
);

const LifeMHRDashboard = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/LifeMHRDashboard")
);

const NSTPDashboard = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/NSTP/NSTPDashboard")
);
const ProposalList = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/ProposalList")
);
const EndorsementList = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/Endorsement/EndorsementList")
);
const CreateEndorsement = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/Endorsement/CreateEndorsement")
);
const EndorsementSuccess = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/Magma/Endorsement/EndorsementSuccess")
);
const ExcelUpload1 = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NBRetail/ExcelUpload")
);
const NepalCollections = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/Collections")
);
const NepalBankDeposite = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/BankDeposite")
);
const NepalBankCredits = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/BankCredits")
);
const NepalCreditsNotesPayments = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/CreditsNotesPayments")
);
const NepalTotalAccounting = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/TotalAccounting")
);
const NepalCreditNotePaymentsDetails = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/Accounting/CreditsNotesPaymentsDetails")
);

const NepalReportsExecutionLandingPage = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/ReportGeneration/ReportsExecution")
);
const NepalEndorsementPerformaInvoice = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/EndorsementNSTP/PerformaInvoice")
);
const NepalEndorsementManagerPerformaInvoice = lazy(() =>
  import(
    "../../PolicyLive/views/Retail/Products/NepalProds/NSTP/EndorsementNSTP/ManagerPerformaInvoice"
  )
);
const NepalEndorsementIssuseList = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NSTP/EndorsementNSTP/EndorsementList")
);
const NepalManagerEndorsementIssuseList = lazy(() =>
  import(
    "../../PolicyLive/views/Retail/Products/NepalProds/NSTP/EndorsementNSTP/ManagerEndorsementList"
  )
);
const ClausesUpdate = lazy(() =>
  import("../../PolicyLive/views/Marine/ClausesUpdate/ClausesUpdate")
);

const NepalReInsuranceParticipantMaster = lazy(() =>
  import(
    "../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/ParticipantMaster/index"
  )
);

const NepalReInsuranceSearchParticipant = lazy(() =>
  import(
    "../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/SearchParticipant/index"
  )
);

const NepalReInsuranceDefineRetention = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/DefineRetention/index")
);
const NepalReInsuranceSearchRetention = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/SearchRetention/index")
);
const NepalReInsuranceCreateTreaty = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/CreateTreaty/index")
);
const NepalReInsuranceSearchTreaty = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/NepalReinsurance/SearchTreaty/index")
);

const PartnerSearch = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/ParnterSearch")
);
const CreatePartners = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreatePartners")
);
const ViewPlans = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/ViewPlans")
);
const CreatePlan = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreatePlan")
);
const MasterPolicySearch = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/MasterPolicySearch")
);
const CreateMasterPolicy = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreateMasterPolicy")
);
const SearchCOIs = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/SearchCOI")
);
const CreateCerficate = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreateCertificate")
);
// const CreateCOI = lazy(() =>
//   import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreateCOI")
// );
const CreateUser = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/CreateUser")
);
const ModifyUsers = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/USGI/Travel/ModifyUsers")
);
const NepalClaims = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimIntimation")
);
const NepalClaimsWithdrow = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimWithdrow")
);
const NepalClaimsRegistration = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimRegistration")
);
const NepalSurveyorDeputation = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/SurveyorDeputation")
);
const NepalClaimsDashboard = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/Dashboard")
);
const NepalSurveyorFeeApproval = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/SurveyorFeeApproval")
);
const NepalClaimAssessment = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimAssessment")
);
const NepalRIApproval = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/RIApproval")
);
const NepalAdavacePayment = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimAdvancePayment")
);
const NepalDischargevoucher = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/Dischargevoucher")
);
const NepalClaimApproval = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimApproval")
);
const NepalClaimSettlement = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/ClaimSettlement")
);
const NepalSurveyorfeesettlement = lazy(() =>
  import("../../ClaimsLive/views/HealthClaims/NepalClaims/Surveyorfeesettlement")
);
const NepalCreateUser = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/UserManagement/CreateUser")
);
const NepalModifyUser = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/UserManagement/ModifyUser")
);
const NepalCreateRole = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/UserManagement/CreateRole")
);
const NepalAssignRole = lazy(() =>
  import("../../PolicyLive/views/Retail/Products/NepalProds/UserManagement/AssignRole")
);
const ViewEditObjectMapper = lazy(() =>
  import("../../BaseSetup/views/ProductDispatcher/ViewEditObjectMapper")
);
const BancaProposalCkycDetails = lazy(() =>
  import("../../PolicyLive/views/Life/Products/NewBusiness/Proposal/BancaProposalCkycDetails")
);
const LibertyBGR = lazy(() => import("../../PolicyLive/views/LibertyBGR"));

const routes = [
  {
    type: "collapse",
    name: "Policy Live Login",
    key: "pl-dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/BaseTest",
    component: <BaseTest />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "Dashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/home/Dashboard",
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Create User",
    key: "UserCreation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/CreateUser",
    component: <UserCreation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "MyProfile",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/MyProfile",
    component: <MyProfile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Bulk Upload",
    key: "BulkUpload",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/COI/BulkUpload",
    component: <BulkUpload />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Upload Status",
    key: "UploadStatus",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/COI/UploadStatus",
    component: <BulkUploadStatus />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Upload History",
    key: "UploadHistory",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/COI/UploadHistory",
    component: <BulkUploadHistory />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Enrolment",
    key: "Enrolment",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Enrolment/Enrolment",
    component: <StudentEnrollment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReadyforUpload",
    key: "ReadyforUpload",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Enrolment/ReadyforUpload",
    component: <ReadyforUpload />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Change Password",
    key: "ChangePassword",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/ChangePassword",
    component: <ChangePassword />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewEditObjectMapper",
    key: "ViewEditObjectMapper",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/ViewEditObjectMapper",
    component: <ViewEditObjectMapper />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Modify User",
    key: "ModifyUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/ModifyUser",
    component: <ModifyUser />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Create Role",
    key: "CreateRole",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/CreateRole",
    component: <CreateRole />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Edit Role",
    key: "EditRole",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/EditRole",
    component: <EditRole />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Assign Role",
    key: "Assign Role",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users/AssignRole",
    component: <AssignRole />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Template",
    key: "template",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Template/Configure",
    component: <Template />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RateParameters",
    key: "rateParameters",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/RateParameters",
    component: <RateParameters />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ParameterGroup",
    key: "parameterGroup",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/RateConfig",
    component: <ParameterGroup />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RateTable",
    key: "rateTable",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/RateRules",
    component: <RateTable />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RateExecution",
    key: "rateExecution",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/RateExecution",
    component: <RateExecution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CalculationConfig",
    key: "calculationConfig",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/CalculationConfig",
    component: <CalculationConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CalculationResult",
    key: "calculationResult",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/CalculationResult",
    component: <CalculationResult />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CalculationDisplay",
    key: "calculationDisplay",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/CalculationDisplay",
    component: <CalculationDisplay />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditCalculationConfig",
    key: "editCalculationConfig",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/EditCalculationConfig",
    component: <EditCalculationConfig />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "CreateCDAccount",
    key: "createCDAccount",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Payment/CreateAccount",
    component: <CreateCDAccount />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CDView",
    key: "cdView",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Payment/ViewAccount",
    component: <CDView />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CDReplenish",
    key: "cdReplenish",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Payment/Replenish",
    component: <CDReplenish />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IllustrationConfig",
    key: "illustrationConfig",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/IllustrationConfig",
    component: <IllustrationConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IllustrationResult",
    key: "illustrationResult",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/IllustrationResult",
    component: <IllustrationResult />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewRateTable",
    key: "viewRateTable",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Rating/ViewRateTable",
    component: <ViewRateTable />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReportConfiguration",
    key: "reportConfiguration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/DynamicReports/ReportConfig",
    component: <ReportConfiguration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReportGeneration",
    key: "reportGeneration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/DynamicReports/ReportExecution",
    component: <ReportGeneration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReportUpdate",
    key: "reportUpdate",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/DynamicReports/ReportUpdate",
    component: <ReportUpdate />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ConfigureEntity",
    key: "configureEntity",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/ConfigureEntity",
    component: <ConfigureEntity />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ObjectMapper",
    key: "objectMapper",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/ObjectMapper",
    component: <ObjectMapper />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dispatcher",
    key: "dispatcher",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/Dispatcher",
    component: <Dispatcher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CloneDispatcher",
    key: "CloneDispatcher",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/CloneDispatcher",
    component: <CloneDispatcher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditDispatcher",
    key: "EditDispatcher",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/EditDispatcher",
    component: <EditDispatcher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ProductGenericAPI",
    key: "productGenericAPI",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/ProductGenericAPI",
    component: <ProductGenericAPI />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DispatcherExecution",
    key: "DispatcherExecution",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductDispatcher/DispatcherExecution",
    component: <DispatcherExecution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "PolicySearch",
    key: "PolicySearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Policy/PolicySearch",
    component: <PolicySearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "QuoteSearch",
    key: "QuoteSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/QuoteSearch",
    component: <QuoteSearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Setup",
    key: "commsetup",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Communication/Configuration",
    component: <Configuration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Check",
    key: "commcheck",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/config/Check",
    component: <Execution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Setup",
    key: "commsetup",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Communication/GroupCommunication",
    component: <GroupCommunication />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product Configuration",
    key: "productconfiguration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductConfig/ProductConfiguaration",
    component: <ProductConfiguration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Cover Grouping",
    key: "coverGrouping",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductConfig/CoverGrouping",
    component: <CoverGrouping />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CoverGroupingV2",
    key: "coverGroupingV2",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Products/CoverGroupingV2",
    component: <CoverGroupingV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Intimation",
    key: "claimIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/TravelClaims/TravelClaimIntimation",
    component: <ClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Claim Processing",
    key: "claimProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Processing",
    component: <ClaimProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Endorsement",
    key: "endorsement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/Endorsement",
    component: <Endorsement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ConfigureEndorsement",
    key: "ConfigureEndorsement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/RefundUpload",
    component: <EndorsementExecution1 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ConfigureEndorsement",
    key: "ConfigureEndorsement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/PolicyCancellation",
    component: <EndorsementExecution2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ConfigureEndorsement",
    key: "ConfigureEndorsement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/ConfigureEndorsement",
    component: <EndorsementConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RuleEngine",
    key: "RuleEngine",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RuleEngine/Parameters",
    component: <Parameters />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RuleEngine",
    key: "RuleEngine",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RuleEngine/RuleObject",
    component: <RuleObject />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RuleEngine",
    key: "RuleEngine",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RuleEngine/RuleConfig",
    component: <RuleConfig />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RuleEngine",
    key: "RuleEngine",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RuleEngine/RuleExecution",
    component: <RuleExecution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RuleEngine",
    key: "RuleEngine",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RuleEngine/EditRules",
    component: <EditRules />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MotorProcessing",
    key: "motorprocessing",
    icon: <Icon fontSize="small">handshake</Icon>,
    route: "/MotorClaims/Processing",
    component: <MotorProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Home Insurance",
    key: "pl-home",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/BGR",
    component: <HomeInsurance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Home Insurance",
    key: "pl-home",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/LibertyHome",
    component: <LibertyBGR />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "BLUS",
    key: "pl-BLUS",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/BLUS",
    component: <BLUS />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CPM",
    key: "pl-CPM",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/CPM",
    component: <CPM />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReportExecution",
    key: "pl-ReportExecution",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reports/ReportExecution",
    component: <ReportExecution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewPolicy",
    key: "pl-viewPolicy",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Home/ViewPolicy",
    component: <ViewPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chmmp",
    key: "pl-Chomp",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Health/Chomp",
    component: <DentalInsurance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CustomerFLow",
    key: "pl-customerflow",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Health/CustomerFLow",
    component: <CustomerFLow />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Search Policies",
    key: "pl-SearchPolicies",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "SearchPolicies",
    component: <COI />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Specific Voyage",
    key: "pl-marineSV",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Marine/SpecificVoyage",
    component: <SpecificVoyage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IMDProfile Creation",
    key: "pl-IMDProfileCreation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Marine/IMDProfileCreation",
    component: <IMDProfileCreation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Stop",
    key: "pl-MasterPolicyStop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Marine/MSTOP",
    component: <MasterPolicyStop />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Open",
    key: "pl-MasterPolicyOpen",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MOPEN",
    component: <MasterPolicyOpen />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Open",
    key: "pl-CerificateIssueOpen",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MOPEN/CertificateIssueOpen",
    component: <CertificateIssueOpen />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Stop",
    key: "pl-CerificateIssueStop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MSTOP/CertificateIssueStop",
    component: <CertificateIssueStop />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Stop",
    key: "pl-ViewCertificateStop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MSTOP/ViewCertificateStop",
    component: <ViewCertificateStop />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Open",
    key: "pl-ViewCertificateOpen",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MOPEN/ViewCertificateOpen",
    component: <ViewCertificateOpen />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Stop",
    key: "pl-CreateCertificateStop",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MSTOP/CreateCertificateStop",
    component: <CreateCertificateStop />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marine Open",
    key: "pl-CreateCertificateOpen",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Marine/MOPEN/CreateCertificateOpen",
    component: <CreateCertificateOpen />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Assign Product",
    key: "pl-AssignProduct",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Partners/Assign",
    component: <AssignProduct />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Search Partner",
    key: "pl-SearchPartner",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Partners/SearchPartner",
    component: <SearchPartner />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Create Partner",
    key: "pl-CreatePartner",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Partners/CreatePartner",
    component: <CreatePartner />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Off Hierarchy",
    key: "pl-OffHierarchy",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Partners/OffHierarchy",
    component: <OffHierarchy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "WFDashboard",
    key: "pl-WFDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Workflow/WFDashboard",
    component: <WFDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "WFConfigurator",
    key: "pl-WFConfigurator",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Workflow/WorkflowConfigurator",
    component: <WFConfigurator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "WFExecution",
    key: "pl-WFExecution",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Workflow/WorkflowExecution",
    component: <WFExecution />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "WFInstance",
    key: "pl-WFInstance",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Workflow/WFInstance",
    component: <WFInstance />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "CreateTreaty",
    key: "CreateTreaty",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/CreateTreaty",
    component: <CreateTreaty />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "DefineRetention",
    key: "DefineRetention",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/DefineRetention",
    component: <DefineRetention />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GroupSequencing",
    key: "GroupSequencing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/GroupingSequencing",
    component: <GroupSequencing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Reallocation",
    key: "Reallocation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/Reallocation",
    component: <Reallocation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReallocationTest",
    key: "ReallocationTest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/ReallocationTest",
    component: <ReallocationTest />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SearchParticipant",
    key: "SearchParticipant",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/SearchParticipantMaster",
    component: <SearchParticipant />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SearchRetention",
    key: "SearchRetention",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/SearchRetention",
    component: <SearchRetention />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SearchTreaty",
    key: "SearchTreaty",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/SearchTreaty",
    component: <SearchTreaty />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SearchgroupingSequencing",
    key: "SearchgroupingSequencing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/SearchGroupingSequencing",
    component: <SearchgroupingSequencing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ParticipantMaster",
    key: "ParticipantMaster",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Reinsurance/ParticipantMaster",
    component: <ParticipantMaster />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TravelInfinity",
    key: "TravelInfinity",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "GroupPolicy/PolicyCertificateIssuance",
    component: <TravelInfinity />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ImageProcessing",
    key: "ImageProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "MachineLearning/OCR",
    component: <ImageProcessing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalLandingPage",
    key: "pl-travel",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/home",
    component: <NepalLandingPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AllRetailLandingPage",
    key: "pl-travel",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "AllRetailLandingPage",
    component: <AllRetailLandingPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AllRetailDemoLandingPage",
    key: "pl-travel",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "AllRetailDemoLandingPage",
    component: <AllRetailDemoLandingPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail",
    component: <StepperV1 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "newRetail",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/stepperV3",
    component: <StepperV3 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "QrScanner",
    key: "pl-QrScanner",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/QrScanner",
    component: <QrScanner />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/WC",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "BusinessShield/ShopKeeper",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/GroupTravel",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/CyberInsurance",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Travel/CreateCOI",
    component: <StepperV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/Combi",
    component: <StepperV2 />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Retail",
  //   key: "pl-Retail",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "Home/QRCode",
  //   // component: <StepperV2 />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Retail",
    key: "pl-Retail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Home/QRCode",
    component: <QRFooter />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Failurepage",
    key: "Failurepage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/Payment/FailurePage",
    component: <Failurepage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SuccessPage",
    key: "SuccessPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/Payment/SuccessPage",
    component: <SuccessPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalDashboard",
    key: "NepalDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/Dashboard",
    component: <NepalDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ProductSearch",
    key: "ProductSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductConfig/ProductSearch",
    component: <ProductSearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GeneratePolicyJson",
    key: "GeneratePolicyJson",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ProductConfig/GeneratePolicyJson",
    component: <GeneratePolicyJson />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalManagerDashboard",
    key: "NepalManagerDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/ManagerDashboard",
    component: <NepalManagerDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MagmaLandingPage",
    key: "mg-health",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "retail/MagmaHome",
    component: <MagmaLandingPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ExcelUpload",
    key: "ExcelUpload",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ExcelUpload/ExcelUpload",
    component: <ExcelUpload />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TemplateUpload",
    key: "TemplateUpload",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ExcelUpload/TemplateConfig",
    component: <TemplateUpload />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "UploadStatus",
    key: "UploadStatus",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ExcelUpload/UploadStatus",
    component: <UploadStatus />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MagmaSuccess",
    key: "MagmaSuccess",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/Payment/MagmaSuccess",
    component: <MagmaSuccess />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Intimation",
    key: "claim-intimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ClaimsLive/ClaimIntimation",
    component: <Intimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MotorIntimation",
    key: "MotorIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/MotorIntimation",
    component: <MotorIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SearchClaims",
    key: "SearchClaims",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/SearchClaims",
    component: <SearchClaims />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Processing",
    key: "claim-Processing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ClaimsLive/ClaimProcessing",
    component: <Processing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Processing",
    key: "claim-Processing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ClaimsLive/ClaimProcessingV2",
    component: <ProcessingV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Processing",
    key: "claim-Processing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Takaful/Dashboard",
    component: <TakafulDashboard />,
    noCollapse: true,
  },

  // {
  //   type: "collapse",
  //   name: "MagmaRazor",
  //   key: "MagmaRazor",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/retail/Payment/MagmaRazor",
  //   component: <MagmaRazor />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "ListOfMaster",
    key: "ListOfMaster",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ListOfMaster",
    component: <ListOfMaster />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MagmaCoiList",
    key: "MagmaCoiList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "MagmaCoiList",
    component: <MagmaCoiList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "IssuanceReport",
    key: "IssuanceReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Magma/IssuanceReport",
    component: <IssuanceReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReyzorPay",
    key: "ReyzorPay",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ReyzorPay",
    component: <ReyzorPay />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "NBRetailSuccess",
    key: "NBRetailSuccess",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/Products/NBRetail/NBRetailSuccess",
    component: <NBRetailSuccess />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MagmaOnlineSuccess",
    key: "MagmaOnlineSuccess",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/Payment/MagmaOnlineSuccess",
    component: <MagmaOnlineSuccess />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalIssuedPolicies",
    key: "NepalIssuedPolicies",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/IssuedPolicies",
    component: <NepalIssuedPolicies />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ManagerIssuedPolicies",
    key: "ManagerIssuedPolicies",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/retail/ManagerIssuedPolicies",
    component: <ManagerIssuedPolicies />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ClaimReport",
    key: "ClaimReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/ClaimReport",
    component: <ClaimReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "UploadStatusMagma",
    key: "UploadStatusMagma",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UploadStatusMagma",
    component: <UploadStatusMagma />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "UploadStatusActions",
    key: "UploadStatusActions",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UploadStatusActions",
    component: <UploadStatusActions />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AgentDashboard",
    key: "AgentDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/AgentDashboard",
    component: <AgentDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EmployeeDashboard",
    key: "EmployeeDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/EmployeeDashboard",
    component: <EmployeeDashboard />,
    noCollapse: true,
  },

  // AVO Life Routes
  {
    type: "collapse",
    name: "DashboardLife",
    key: "DashboardLife",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/life/dashboard",
    component: <DashboardLife />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CustomerDocumentUpload",
    key: "CustomerDocumentUpload",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/life/CustomerDocumentUpload",
    component: <CustomerDocumentUpload />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EmployeeViewDocuments",
    key: "EmployeeViewDocuments",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/life/ViewProposalsDocuments",
    component: <EmployeeViewDocuments />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Lead",
    key: "Lead",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/lead",
    component: <Lead />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Prospect",
    key: "Prospect",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/prospect",
    component: <Prospect />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quotation",
    key: "Quotation",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/Quotation",
    component: <Quotation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Proposal",
    key: "Proposal",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/Proposal",
    component: <Proposal />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Calculators",
    key: "Calculators",
    icon: <Icon fontSize="small">calculate</Icon>,
    route: "/Calculators",
    component: <LifeCalculators />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Lead",
    key: "Lead",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/life/plans",
    component: <LifePlans />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Home",
    key: "Home",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/life/customerApplications",
    component: <CustomerApplication NavbarHidden />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "CustomerLifeLanding",
    key: "CustomerLifeLanding",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/modules/CustomerLifeLanding",
    component: <CustomerLifeLanding />,
    noCollapse: true,
  },
  {
    name: "CustomerQuote",
    key: "CustomerQuote",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/modules/Quote",
    component: <CustomerQuote />,
  },

  //

  {
    type: "collapse",
    name: "MasterPolicySetup",
    key: "MasterPolicySetupr",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "MasterPolicySetup",
    component: <MasterPolicySetup />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "TravelClaimIntimation",
    key: "TravelClaimIntimation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TravelClaimIntimation",
    component: <TravelClaimIntimation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TravelClaimProcessing",
    key: "TravelClaimProcessing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TravelClaimProcessing",
    component: <TravelClaimProcessing />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Claim Processing Search",
  //   key: "claimProcessing",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/ClaimProcessingSearch",
  //   component: <ClaimProcessingSearch />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "TravelClaimEnquiry",
    key: "TravelClaimEnquiry",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TravelClaimEnquiry",
    component: <TravelClaimEnquiry />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TravelGenerateReport",
    key: "TravelGenerateReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TravelGenerateReport",
    component: <TravelGenerateReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TravelUploadReport",
    key: "TravelUploadReport",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/TravelUploadReport",
    component: <TravelUploadReport />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewDashboard",
    key: "ViewDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/DynamicDashboards/ViewDashboard",
    component: <ViewDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TravelInfinityInsurance",
    key: "TravelInfinityInsurance",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/GroupTravel",
    component: <TravelInfinityInsurance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GeneralInsurance",
    key: "GeneralInsurance",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GeneralInsurance",
    component: <GeneralInsurance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SalesManager",
    key: "SalesManager",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GMC/SM",
    component: <SalesManager />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "UnderWriter",
    key: "UnderWriter",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GMC/UW",
    component: <UnderWriter />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Operational",
    key: "Operational",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GMC/OP",
    component: <Operational />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Finance",
    key: "Finance",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/GMC/FN",
    component: <Finance />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ClaimReports",
    key: "cl-ClaimReports",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ClaimReports",
    component: <ClaimReports />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "NepalEndrosementLandingPage",
    key: "NepalEndrosementLandingPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/Dashboard",
    component: <NepalEndrosementLandingPage />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "NepalB2CProd",
  //   key: "NepalB2CProd",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Nepal/B2CMotorCycle",
  //   component: <NepalB2CProd />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "ClaimReopen",
    key: "claim-reopen",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ClaimReOpen",
    component: <ClaimReOpen />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ClaimSearch",
    key: "ClaimSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ClaimSearch",
    component: <ClaimSearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ProcessingClaimSearch",
    key: "ProcessingClaimSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ProcessingClaimSearch",
    component: <ProcessingClaimSearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ReceiveQuery",
    key: "ReceiveQuery",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/ReceiveQuery",
    component: <ReceiveQuery />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Home",
    key: "Home",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/Home",
    component: <Home />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MakeExpensePayout",
    key: "MakeExpensePayout",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Claims/MakeExpensePayout",
    component: <MakeExpensePayout />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RedirectToRetail",
    key: "RedirectToRetail",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/RedirectToRetail",
    component: <RedirectToRetail />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SinglePageV2",
    key: "SinglePageV2",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/SingleRetailV2",
    component: <SinglePageV2 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Clone Product",
    key: "ProductClone",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Products/ProductClone",
    component: <ProductClone />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Processing1",
    key: "claim-Processing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Claim/Processing",
    component: <Processing1 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AgentApplications",
    key: "AgentApplications",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Agent/AgentApplications",
    component: <ApplicationList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreateCourse",
    key: "CreateCourse",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Courses/CreateCourse",
    component: <NewCourses />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin Application",
    key: "PospOnboarding",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Admin/Application",
    component: <PospOnboarding />,
    noCollapse: true,
  },
  {
    type: "collapse",

    name: "CourseList",
    key: "CourseList",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Admin/CoursesList",
    component: <CourseList />,
    noCollapse: true,
  },

  {
    type: "collapse",

    name: "LifeUnderWriterDashboard",
    key: "LifeUnderWriterDashboard",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Life/UWInbox",
    component: <LifeUnderWriterDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",

    name: "LifeMHRDashboard",
    key: "LifeMHRDashboard",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Life/MHRInbox",
    component: <LifeMHRDashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "NSTPDashboard",
    key: "NSTPDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Magma/NSTPDashboard",
    component: <NSTPDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ProposalList",
    key: "ProposalList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "ProposalList",
    component: <ProposalList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EndorsementList",
    key: "EndorsementList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "EndorsementList",
    component: <EndorsementList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreateEndorsement",
    key: "CreateEndorsement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "CreateEndorsement",
    component: <CreateEndorsement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EndorsementSuccess",
    key: "EndorsementSuccess",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "EndorsementSuccess",
    component: <EndorsementSuccess />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ExcelUpload",
    key: "ExcelUpload",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "NBRetail/ExcelUpload",
    component: <ExcelUpload1 />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalCollections",
    key: "NepalCollections",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/Collections",
    component: <NepalCollections />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalBankDeposite",
    key: "NepalBankDeposite",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/BankDeposits",
    component: <NepalBankDeposite />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalBankCredits",
    key: "NepalBankCredits",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/BankCredits",
    component: <NepalBankCredits />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalCreditsNotesPayments",
    key: "NepalCreditsNotesPayments",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/CreditNotePayments",
    component: <NepalCreditsNotesPayments />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalTotalAccounting",
    key: "NepalTotalAccounting",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/TotalAccounting",
    component: <NepalTotalAccounting />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalCreditNotePaymentsDetails",
    key: "NepalCreditNotePaymentsDetails",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Accounting/CreditNotePaymentsDetails",
    component: <NepalCreditNotePaymentsDetails />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReportsExecutionLandingPage",
    key: "NepalReportsExecutionLandingPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Report/ReportGeneration",
    component: <NepalReportsExecutionLandingPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalEndorsementPerformaInvoice",
    key: "NepalEndorsementPerformaInvoice",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Endorsement/PerformaInvoice",
    component: <NepalEndorsementPerformaInvoice />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalEndorsementManagerPerformaInvoice",
    key: "NepalEndorsementManagerPerformaInvoice",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Endorsement/ManagerPerformaInvoice",
    component: <NepalEndorsementManagerPerformaInvoice />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Clauses Update",
    key: "pl-ClausesUpdate",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Marine/ClausesUpdate",
    component: <ClausesUpdate />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalEndorsementIssuseList",
    key: "NepalEndorsementIssuseList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endorsement/EndorsementList/",
    component: <NepalEndorsementIssuseList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalManagerEndorsementIssuseList",
    key: "NepalManagerEndorsementIssuseList",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Endrosement/ManagerEndorsementList",
    component: <NepalManagerEndorsementIssuseList />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "NepalReInsuranceParticipantMaster",
    key: "NepalReInsuranceParticipantMaster",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/ParticipantMaster",
    component: <NepalReInsuranceParticipantMaster />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReInsuranceSearchParticipant",
    key: "NepalReInsuranceSearchParticipant",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/SearchParticipant",
    component: <NepalReInsuranceSearchParticipant />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReInsuranceDefineRetention",
    key: "NepalReInsuranceDefineRetention",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/DefineRetention",
    component: <NepalReInsuranceDefineRetention />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReInsuranceSearchRetention",
    key: "NepalReInsuranceSearchRetention",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/SearchRetention",
    component: <NepalReInsuranceSearchRetention />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReInsuranceCreateTreaty",
    key: "NepalReInsuranceCreateTreaty",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/CreateTreaty",
    component: <NepalReInsuranceCreateTreaty />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalReInsuranceSearchTreaty",
    key: "NepalReInsuranceSearchTreaty",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalReinsurance/SearchTreaty",
    component: <NepalReInsuranceSearchTreaty />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "PartnerSearch",
    key: "PartnerSearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/PartnerSearch",
    component: <PartnerSearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreatePartners",
    key: "CreatePartners",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/CreatePartners",
    component: <CreatePartners />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ViewPlans",
    key: "ViewPlans",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/ViewPlans",
    component: <ViewPlans />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreatePlan",
    key: "CreatePlan",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/CreatePlan",
    component: <CreatePlan />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreateUser",
    key: "CreateUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/CreateUser",
    component: <CreateUser />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ModifyUsers",
    key: "ModifyUsers",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/ModifyUsers",
    component: <ModifyUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MasterPolicySearch",
    key: "MasterPolicySearch",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/MasterPolicySearch",
    component: <MasterPolicySearch />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CreateMasterPolicy",
    key: "CreateMasterPolicy",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/CreateMasterPolicy",
    component: <CreateMasterPolicy />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "CreateMasterPolicy",
    key: "CreateMasterPolicy",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/SearchCOI",
    component: <SearchCOIs />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "CreateCerficate",
  //   key: "CreateCerficate",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/Travel/CreateCOIs",
  //   component: <CreateCOI />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "CreateCerficate",
    key: "CreateCerficate",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Travel/CreateCerficate",
    component: <CreateCerficate />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaims",
    key: "NepalClaims",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimIntimation",
    component: <NepalClaims />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimsRegistration",
    key: "NepalClaimsRegistration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimRegistration",
    component: <NepalClaimsRegistration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalSurveyorDeputation",
    key: "NepalSurveyorDeputation",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/SurveyorDeputation",
    component: <NepalSurveyorDeputation />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimsWithdrow",
    key: "NepalClaimsWithdrow",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimWithdrawal",
    component: <NepalClaimsWithdrow />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalCreateUser",
    key: "NepalCreateUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UserManagement/CreateUser",
    component: <NepalCreateUser />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalModifyUser",
    key: "NepalModifyUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UserManagement/ModifyUser",
    component: <NepalModifyUser />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalCreateRole",
    key: "NepalCreateRole",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UserManagement/CreateRole",
    component: <NepalCreateRole />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalAssignRole",
    key: "NepalAssignRole",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/UserManagement/AssignRole",
    component: <NepalAssignRole />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimsDashboard",
    key: "NepalClaimsDashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/Dashboard",
    component: <NepalClaimsDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimAssessment",
    key: "NepalClaimAssessment",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimAssessment",
    component: <NepalClaimAssessment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalRIApproval",
    key: "NepalRIApproval",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/RIApproval",
    component: <NepalRIApproval />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "NepalAdavacePayment",
    key: "NepalAdavacePayment",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/AdvancePayment",
    component: <NepalAdavacePayment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalDischargevoucher",
    key: "NepalDischargevoucher",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/Dischargevoucher",
    component: <NepalDischargevoucher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimApproval",
    key: "NepalClaimApproval",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimApproval",
    component: <NepalClaimApproval />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalClaimSettlement",
    key: "NepalClaimSettlement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/ClaimSettlement",
    component: <NepalClaimSettlement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalSurveyorfeesettlement",
    key: "NepalSurveyorfeesettlement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/Surveyorfeesettlement",
    component: <NepalSurveyorfeesettlement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NepalSurveyorFeeApproval",
    key: "NepalSurveyorFeeApproval",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/NepalClaims/SurveyorFeeApproval",
    component: <NepalSurveyorFeeApproval />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "BancaProposalCkycDetails",
    key: "BancaProposalCkycDetails",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Proposal/BancaProposalCkycDetails",
    component: <BancaProposalCkycDetails />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EmployeeDashboardIndex",
    key: "EmployeeDashboardIndex",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/life/EmployeeDashboard",
    component: <LifeEmployeeDashboardIndex />,
    noCollapse: true,
  },
];

export default routes;
