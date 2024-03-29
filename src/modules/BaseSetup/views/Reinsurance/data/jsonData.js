const RIObj = {
  ParticipantMaster: {
    // BrokerRadioSelect: "",
    // BrokerRadio: "",
    participantTypeId: "",
    participantCode: "",
    participantName: "",
    contactNo: "",
    address1: "",
    address2: "",
    address3: "",
    stateId: "",
    countryId: "",
    districtId: "",
    cityId: "",
    pincode: "",
    isActive: "",

    tblParticipantBranch: [],
  },
  SearchParticipant: {
    participantTypeId: "",
    participantCode: "",
    participantName: "",
  },
  Retention: {
    retentionGroupId: 0,
    retentionGroupName: "",
    retentionYear: "",

    year: "",
    businessTypeId: "",
    businessType: "",
    retentionLogicId: "",
    retentionType: "",
    percentage: "",
    limit: "",
    effectiveFrom: "",
    effectiveTo: "",
    roleid: "",
    status: "",
    isApproved: "N",
    comment: "",
    createdDate: null,
    createdBy: null,
    modifiedDate: null,
    modifiedBy: null,
    isActive: null,

    tblRimappingDetail: [],
  },
};
export default RIObj;
