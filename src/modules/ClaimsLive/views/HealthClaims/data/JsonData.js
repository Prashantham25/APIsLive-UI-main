const TravelClaimJsonData = {
  isValid: true,
  claimStatusId: 0,
  ClaimNumber: "",
  ClaimVersion: 1,
  createdDate: "",
  modifiedDate: "",
  createdBy: "",
  modifiedBy: "",
  fnol: "",
  policyDetailsId: 0,
  countryId: 0,
  stateId: 0,
  districtId: 0,
  cityId: 0,
  areaId: 0,
  intimationModeId: 0,
  intimationById: 0,
  incidentDateTime: "",
  incidentLocation: "",
  isFir: true,
  firdateTime: "",
  nameOfPoliceStation: "",
  isAnyWitness: true,
  isAnyOtherVehicleInAccident: true,
  driverOfTheVehicleId: 0,
  driverName: "",
  driverLicenseNo: "",
  driverLicenseExpiryDateTime: "",
  rtodetailId: 0,
  dlauthorizedToDriveId: 0,
  roadTypeId: 0,
  purposeOfTravelId: 0,
  isVehicleParked: true,
  vehicleSpeed: 0,
  numberOfPasanger: 0,
  weatherCondition: "",
  firno: "",
  driverAge: 0,
  drivingExperience: 0,
  driverQualificationId: 0,
  driverDob: "",
  fathersName: "",
  isTrailerAttached: true,
  registeredLadenWeightKg: 0,
  registeredUnLadenWeightKg: 0,
  weightOfGoodsCarriedKg: 0,
  typeOfGoodsCarried: "",
  natureOfGoodsCarried: "",
  registeredPassengerCarryingCapacity: 0,
  passengersCarried: 0,
  natureOfPermit: "",
  typeOfPermit: "",
  permitValidForAreas: "",
  permitValidUpTo: "",
  fitnessValidUpTo: "",
  mobileNumber: "",
  email: "",
  partnerId: 0,
  productId: 0,
  eventId: "",
  claimBasicDetails: "",
  basicDetails: {
    claimId: 0,
    claimNo: "",
    workItemType: "",
    uhid: "",
    policyType: null,
    productCode: "",
    policyInceptionDate: "",
    policyDetails: {
      policyNumber: "",
      customerId: "",
      policyStartDate: "",
      policyEndDate: "",
      tripType: "",
      geography: "",
    },
    claimDetails: {
      travelStartDate: "",
      travelEndDate: "",
    },
    memberDetails: {
      memberId: "",
      insuredName: "",
      gender: "",
      insuredAge: "",
      patientRelationship: "",
      memberAttachmentDate: "",
      employeeId: 0,
      employeeName: "",
    },
    nomineeDetails: {
      nomineeDOB: "",
      nomineeName: "",
      relationWithInsured: "",
      address1: "",
      address2: "",
      address3: "",
      nomineeCity: "",
      nomineeEmailID: "",
      nomineeMobile: "",
      nomineePincode: "",
      nomineeState: "",
    },
  },
  claimTransactionDTO: [
    {
      transactionId: 0,
      isValid: true,
      TransactionNumber: "",
      createdDateTime: "",
      modifiedDateTime: "",
      createdBy: "",
      modifiedBy: "",
      occurrence: "",
      claimId: 0,
      statusId: 0,
      claimTypeId: 0,
      claimServiceTypeId: 0,
      causeOfLossId: 0,
      actionId: 0,
      isServeyorAssign: true,
      isWorkshopAssign: true,
      isInvestigatorAssign: true,
      isBackByManager: true,
      isReOpen: true,
      isRoadSideAssistance: true,
      approximateEstimatedCost: 0,
      remark: "",
      internalRemark: "",
      emergencyContact: "",
      emergencyEmail: "",
      queryReasonIds: "",
      rejectionReasonIds: "",
      accidentFactor: "",
      accidentFactorDescription: "",
      isRead: true,
      approvedAmount: 0,
      decisionTypeid: 0,
      settlementTypeid: 0,
      closeReasonIds: "",
      isPriorityClaim: true,
      reopenReasonIds: "",
      advanceAmount: 0,
      claimNo: "",
      workItemNo: "",
      workItemId: 0,
      userName: "",
      transactionDetails: "",
      transactionDetailsDto: {
        claimCategory: null,
        claimSubType: "",
        natureOfClaim: "",
        causeOfLoss: null,
        typeOfLoss: "",
        reasonofLoss: "",
        country: null,
        placeOfLoss: "",
        claimantContactName: "",
        claimantContactNo: "",
        claimantEmail: "",
        remarks: "",
        doaDol: "",
        dod: "",
        noOfDays: "",
        noOfHours: "",
        isTpa: "false",
        tpaDetails: {
          name: "",
          registrationNo: "",
          nameOfCAOCEO: "",
          contactNo: "",
          email: "",
        },
        hospitalDetails: {
          hospitalName: "",
          hospitalCountry: "",
          hospitalState: "",
          pincode: "",
          hospitalDistrict: "",
          hospitalAddress: "",
          hospitalInvoiceDate: "",
          isNetwork: "false",
          contactNo: "",
          faxNo: "",
          emailId: "",
        },
        courierDetails: {
          physicalDocsReceived: "",
          isTypeOfCourier: "",
          isClaimReceivedAtBranch: false,
          isClaimReceivedAtHo: false,
          sentDateTime: "",
          courierNameBranch: "",
          courierNameHo: "",
          podBranch: "",
          podHo: "",
          walkindt: "",
          customertName: "",
          contactNo: "",
        },
        benefitDetails: [],
        paymentObj: {
          isApprovedAmountCorrect: false,
          approvedAmount: "",
          Work: false,
          Customer: false,
          A1: false,
          A2: false,
          paymentDetails: [],
          action: "",
          remarks: "",
        },
        documentDetails: {
          firDoc: "",
          medicalCert: "",
          pan: "",
          passport: "",
          aadhar: "bg (3) (2).jpg",
          drivingLicense: "",
          others: "",
          othersName: "",
          tripTicket: "",
          passportVisaStamp: "",
          isDocCorrect: false,
          docDate: "",
        },
      },
    },
  ],
};

const HelathJson = {
  Prefix: "INT,MHDI/6115/24/02/",
  claimId: 0,
  claimStatusId: 0,
  claimStatus: "",
  // claimNumber: "",
  claimAmount: 0,
  claimManagerRemarks: "",
  approvedClaimAmount: 0,
  createdDate: "",
  createdBy: "",
  lossDateTime: "",
  locationOfEvent: "",
  lossOfDescription: "",
  policyId: 0,
  active: true,
  modifiedBy: "",
  modifiedDate: "",
  partnerId: 0,
  organizationId: 0,
  policyNo: "",
  masterPolicyNo: "",
  // doc: "",
  productIdPk: 1022,
  ProductCode: "MagmaHospiCash01",
  claimFields: "",
  company: "",
  lob: "",
  DocumentUploadFlag: "false",
  Plan: "",
  claimBasicDetails: {
    masterpolicyHolderName: "",
    masterPolicyNo: "",
    memberDetails: {
      Relationship: "",
      memberId: "",
      insuredName: "",
      COIHolderName: "",
      EmailId: "",
      MobileNo: "",
      Dob: "",
      Gender: "",
      MemberBenefit: [{ CoverName: "", Benefit: "", Value: "" }],
      PolicyStartDate: "",
      CoverageEndDate: "",
      DOC: "",
    },
    policyDetails: {
      PolicyNumber: "",
      Plan: "",
      ProductCode: "",
    },
    benefitDetails: [{ mID: "", mValue: "" }],
  },
  proposerDetails: {
    Name: "",
    Age: "",
  },
  claimVersion: 0,
  transactionDataDTO: [
    {
      transactionId: 0,
      isValid: true,
      createdDateTime: "",
      modifiedDateTime: "",
      createdBy: "",
      modifiedBy: "",
      occurrence: "",
      claimId: 0,
      statusId: 0,
      claimTypeId: 0,
      claimServiceTypeId: 0,
      causeOfLossId: 0,
      actionId: 0,
      isServeyorAssign: true,
      isWorkshopAssign: true,
      isInvestigatorAssign: true,
      isBackByManager: true,
      isReOpen: true,
      isRoadSideAssistance: true,
      approximateEstimatedCost: 0,
      remark: "",
      internalRemark: "",
      emergencyContact: "",
      emergencyEmail: "",
      queryReasonIds: "",
      rejectionReasonIds: "",
      accidentFactor: "",
      accidentFactorDescription: "",
      isRead: true,
      approvedAmount: 0,
      decisionTypeid: 0,
      settlementTypeid: 0,
      closeReasonIds: "",
      isPriorityClaim: true,
      reopenReasonIds: "",
      advanceAmount: 0,
      claimN: "",
      workItemNo: "",
      workItemId: 0,
      userName: "",
      transactionDetails: {
        SearchDisableFlag: "false",
        ResendFlag: [{ ResendStatus: "No" }],
        CustomerExpense: "",
        ApprovalDetails: [],
        CommunicationDetails: [
          {
            UserName: "",
            RoleName: "",
            Status: "",
            Remarks: "",
          },
        ],
        hospitalizationDetails: {
          doa: "",
          dod: "",
          diagnosis: "",
          lengthOfStay: "",
          PatientName: "",
          BlackListedHospital: "",
          // PolicyStartDate: "",
        },
        financierDetails: {
          AccountNo: "",
          IFSCCode: "",
          BankName: "",
          FinancierName: "",
        },
        benefitDetails: {
          BenefitId: "",
          benefit: "",
          benefitName: "",
          benefitCategory: "",
          ClaimedAmount: "",
          DateOfInjury: "",
          Date: "",
          CalculatedClaimAmount: "",
          Deductible: "",
          RoomDays: "",
          RoomAmount: "",
          ICUDays: "",
          ICUAmount: "",
          ChildAge: "",
          PayoutAmount: "",
          // NoOfdyasCtoA: "",
          Name: "",
          NoofDaysFromCToInjury: "",
          NoofDaysFromCToAdmission: "",
          MonthlySalary: "",
        },

        queryDetails: [],
        ailmentDetails: [
          {
            AilmentName: "",
            ICDLevelcode: "",
            ICDDescription: "",
            PreExisting: "",
            AdmissionType: "",
            TreatmentType: "",
          },
        ],
        expenseDetails: [
          {
            ExpensePayout: "",
            ExpenseAmount: "",
            GSTAmount: "",
            filename: "",
            DocId: "",
            ExpensePennydrop: "",
            TotalExpenseAmount: "",
          },
        ],
        documentDetails: [],
        investigatorDetails: [],
        // {
        //   claimAction: "",
        //   InvestigatorId: "",
        //   InvestigatorName: "",
        //   ReportNo: "",
        //   ReportDate: "",
        //   InvoiceDate: "",
        //   InvoiceNo: "",
        //   DecisionCategory: "",
        //   Remarks: "",
        // },
        // ],
        templateDetails: [
          {
            Status: "",
          },
        ],
        Investigator: {
          claimAction: "",
          InvestigatorId: "",
          InvestigatorName: "",
          ReportNo: "",
          ReportDate: "",
          InvoiceDate: "",
          InvoiceNo: "",
          DecisionCategory: "",
          Remarks: "",
          VerifiedInvestigator: "",
          claimDescription: "",
        },

        hospitalDetails: {
          hospitalName: "",
          hospitalAddress: "",
          hospitalCity: "",
          hospitalState: "",
          hospitalPincode: "",
          pin: [{ mID: "", mValue: "" }],
          city: [{ mID: "", mValue: "" }],
        },
        paymentObj: {
          payeeName: "",
          bankName: "",
          accountNo: "",
          ifscCode: "",
          modeofPayment: "IMPS",
          PaymentDetails: [],
          finalPayoutCustomer: "",
          finalPayoutFinancier: "",
        },
      },
      transactionNumber: "",
      transactionStageStatusId: 0,
      transactionStageId: 0,
      isActive: true,
    },
  ],
};

export { TravelClaimJsonData, HelathJson };