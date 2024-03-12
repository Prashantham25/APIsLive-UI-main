export default function Disclaimer({ dto }) {
  // const planProposalDeclaration = {
  //   proposal1: [],
  //   proposal2: [862, 857, 858],
  //   proposal3: [905],
  //   proposal4: [],
  //   proposal5: [],
  // };

  // 300 F for

  const checkThereIsMinor = () => {
    let flag = false;
    const arr = dto?.QuotationData?.[0]?.InsurableItem?.[0]?.RiskItems;
    if (Array.isArray(arr))
      arr.forEach((x) => {
        if (x.Age < 18) flag = true;
      });
    return flag;
  };

  const getSecondLifeName = () => {
    let sName = "";

    const arr = dto?.QuotationData?.[0]?.InsurableItem?.[0]?.RiskItems;
    if (Array.isArray(arr))
      arr.forEach((x) => {
        if (x.Relation !== "Self") sName = x.Name;
      });

    return sName;
  };

  const proposerOnlyLifeAssured =
    dto?.QuotationData?.[0]?.InsurableItem?.[0]?.RiskItems?.length === 1 &&
    dto?.QuotationData?.[0]?.InsurableItem?.[0]?.RiskItems?.[0]?.Relation === "Self";

  const line1 =
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard";
  const line2 =
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .";
  const line3 =
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc.";
  const line4 =
    "I also understand that the premiums, charges and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.";
  const line5 = `I ${dto?.ProposerDetails?.Name} the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`;
  const line6 =
    "I understand that if I have deposited “application money” as a token consideration under this proposal for insurance, the closing NAV of the date of completion only will be applied for allotment of units.";

  const proposal1 = [
    line5,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation ,and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement.",
    "And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    line1,
    line2,
    line3,
    line4,
  ];
  const proposal2 = [
    "Declaration by annuitant",
    `I ${dto?.ProposerDetails?.Name} do hereby declare that the foregoing statements and answers are true and complete in every particular and do agree and declare that these statements and this declaration shall be the basis of the contract of annuity between me/us and the Life Insurance Corporation of India. In case of fraud, mis-statement and suppression of material facts the policy contract shall be treated in accordance with the Section45 of Insurance Act, 1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, I/We authorize the Corporation to share the information pertaining to my proposal to any Authorized Organization / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of investigation / risk mitigation / fraud control and/or claim settlement.",
    line1,
    line3,
    line4,
  ];

  const proposal3 = [
    `I ${dto?.ProposerDetails?.Name} hereby declare, that the foregoing statements and answers have been given by me in this proposal form after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between us and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "I understand that the information provided by me will form the basis of the insurance policy, is subject to the Board approved underwriting policy of the Corporation and that the policy will come into force only after full payment of the premium chargeable. I understand that the Corporation reserves the right to accept /postpone/ drop / regret or decline this proposal for health insurance.",
    "I further declare that any change related to my health, occupation or any other adverse circumstance after the submission of this proposal to the Corporation shall be conveyed in writing before the issuance of the First Premium Receipt/ communication of acceptance of risk. I also declare that I will inform about dropping, deferment, acceptance at terms other than as proposed of any proposal/ revival of policy made to the Corporation or any other insurance company. Any omission on my part to do so shall render this contract invalid .",
    "I declare that I consent to the Corporation seeking medical information from any doctor or hospital who/which at any time has attended me or from any past or present employer concerning anything which affects my physical or mental health and seeking information from any insurer to whom an application for insurance on my life has been made for the purpose of underwriting the proposal and/or claim settlement.",
    "I authorize the Corporation to share information pertaining to my proposal including my medical records for the sole purpose of underwriting the proposal and/or claims settlement and with any Governmental and/or Regulatory authority.",
    line1,
    line3,
    line4,
    "I do hereby declare that I have understood the plan features and I have taken a personal and independent decision in an informed manner to take the plan in consultation with the agent/intermediary.",
  ];

  const proposal41 = [
    `I ${dto?.ProposerDetails?.Name} the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India . And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938, and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital, diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financials etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. ",
    line1,
    line2,
    line3,
    "I hereby give my consent for undergoing medical examinations / test including test for HIV as required by the Corporation.",
    "I further declare that I have discussed my financial standing with the agent/intermediary. I have been informed about the risk profile of the ULIP plan(s) and fund(s). In consultation with the agent/intermediary, I have taken a personal and independent decision in an informed manner to go for the Plan and Fund which I have chosen.",
    line6,
  ];

  const proposal42 = [
    `I ${dto?.ProposerDetails?.Name} (Name of the proposer) do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital, diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about the life to be assured concerning the health, insurance , financial etc. on the grounds of privacy, I , on behalf of myself, the life to be assured, our heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in this policy contract issued on the life to be assured, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. ",
    "And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt any change in the general health of the life to be assured or that of any members of his family occurs, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time. ",
    "I further declare that I have discussed my financial standing with the agent/intermediary. I have been informed about the risk profile of the ULIP plan(s) and fund(s). In consultation with the agent/intermediary, I have taken a personal and independent decision in an informed manner to go for the Plan and Fund which I have chosen. ",
    line6,
    line1,
    line2,
    line3,
    line4,
  ];

  const proposal5 = [
    line5,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation ,and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement.And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time. ",
    line1,
    line2,
    line3,
    line4,
    "I hereby declare that the detail furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein within 30 days of such changes. In case any of the above information is found to be false or untrue or misleading or misrepresenting, I am aware that I may be held liable for it.",
  ];

  const proposal6 = [
    line5,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation ,and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt",
    "(i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or",
    "(ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    line1,
    line2,
    line3,
    line4,
  ];

  const proposal71 = [
    line5,
    "Not-withstanding the provision of any law, I authorize the Corporation to share the information pertaining to my proposal to any Authorized Organization / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of investigation / risk mitigation / fraud control and/or claim settlement.",
    line1,
    line3,
    line6,
    line4,
  ];

  const proposal72 = [
    `I ${dto?.ProposerDetails?.Name} ( Name of the Proposer) do hereby declare that the statement and answers of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and agree and declare that these statements and this declaration along with the statements made by the Life to be assured in the proposal form and declaration relative thereto shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment to be contained there in the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls, SMS/ E mail from Central KYC registry in this regard.",
    line6,
    line4,
  ];

  const P7MainLife = [
    `I ${dto?.ProposerDetails?.Name} do hereby declare that the statement and answers under the headings Section I ( A) and Section II of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and agree and declare that these statements and this declaration along with the statements made by the life to be assured under heading Section -I(B), and Section III of the proposal form and declaration relative thereto shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment to be contained there in the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "And I further declare that if after the date of submission of the proposal but before the issue of first premium receipt ( i) any changein the occupation of the life to be assured or any adverse circumstances connected with the financial position or general health of the life to be assured or that of any member of his family occurs or (ii) if a proposal for assurance or an application for revival of a policy on the life to be assured made to any office of the Corporation has been withdrawn or dropped , deferred or declined or accepted with an increased premium or subject to lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance . Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance.",
    "I hereby give my consent to receive phone calls, SMS/E mail on the below mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc.",
    "I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];
  // const P7SecondMainLife = [...P7MainLife];
  const P7SecondMainLife = [
    ...P7MainLife,
    "",
    "",
    `I ${getSecondLifeName()} the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any Authorised Organisation/ Institution/ Agency/ and Governmental/ Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls, SMS/ E mail from Central KYC registry in this regard.",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance.",
    "I hereby give my consent to receive phone calls, SMS/E mail on the below mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc",
    "I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];

  const P7MinorLife = [
    `I ${dto?.ProposerDetails?.Name} (Name of the proposer) do here by declare that the fore going statement and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about the life to be assured concerning the health, insurance , financial etc. on the grounds of privacy, I , on behalf of myself, the life to be assured, our heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in this policy contract issued on the life to be assured, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement.",
    "And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt anychange in the general health of the life to be assured or that of any members of his family occurs, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard",
    "I understand that the Corporation reserves the right to accept/Postpone/drop/decline or offer alternate terms on this proposal for life insurance.",
    "I hereby give my consent to receive phone calls, SMS/E mail on the below mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc.",
    "I also understand that the premium and benefits under the policy are subject to taxes/ duties/charges in accordance with the laws as applicable from time to time.",
  ];

  const P8MainLife = [
    `I ${dto?.ProposerDetails?.Name} the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation ,and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard.",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];
  const P8SecondMainLife = [
    `I ${dto?.ProposerDetails?.Name} ( Name of the Proposer) do hereby declare that the statement and answers under the headings Section I ( A) and Section II of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and agree and declare that these statements and this declaration along with the statements made by the Life to be assured under heading Section - I(B), and Section III of the proposal form and declaration relative thereto shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment to be contained there in the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "And I further declare that if after the date of submission of the proposal but before the issue of first premium receipt ( i) any change in the occupation of the Life to be assured or any adverse circumstances connected with the financial position or general health of the Life to be assured or that of any member of his family occurs or (ii) if a proposal for assurance or an application for revival of a policy on the Life to be assured made to any office of the Corporation has been withdrawn or dropped , deferred or declined or accepted with an increased premium or subject to lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance . Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc",
    "I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
    "",
    "",
    `I ${getSecondLifeName()} ( Name of the Life to be assured) whose life is herein being proposed to be assured, do hereby declare that the statements and answers under heading Section -I(B), and Section III of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information.`,
    "Notwithstanding the provisions of any law , usage , custom or convention for the time being in force prohibiting any doctor , Hospital, diagnostic center and /or Employer , reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment, occupation, insurance , financial etc on the ground of Privacy , I/ my heirs , executors , administrators and assignees or any person or persons , having interest of any kind whatsoever in the policy contract issued to me , hereby agree , that such authority, having such knowledge or information , shall at any time be at liberty to divulge any such knowledge or information to the Corporation and the  Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard.",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc ",
    "I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time",
  ];
  const P8MinorLife = [
    `I ${dto?.ProposerDetails?.Name} (Name of the proposer) do hereby declare that the foregoing statement and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time. Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about the Life to be assured concerning the health, insurance , financial etc. on the grounds of privacy, I , on behalf of myself, the Life to be assured, our heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in this policy contract issued on the Llife to be assured, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt any change in the general health of the Life to be assured or that of any members of his family occurs, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time. I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard`,
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance . I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc. I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];

  const P9MainLife = [
    `I ${dto?.ProposerDetails?.Name} the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and answers have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information and I do hereby agree and declare that these statements and this declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time.`,
    "Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any doctor, hospital ,diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment , occupation, insurance , financial etc. on the grounds of privacy, I , my heirs, executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the policy contract issued to me, hereby agree that such authority , having such knowledge or information, shall at any time be at liberty to divulge any such knowledge or information to the Corporation ,and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement. And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i) any change in my occupation or any adverse circumstances connected with my financial position or the general health of myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard.",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];
  const P9SecondLife = [
    `I ${dto?.ProposerDetails?.Name} ( Name of the Proposer) do hereby declare that the statement and answers under the headings Section I ( A) and Section II of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and agree and declare that these statements and this declaration along with the statements made by the Life to be assured under heading Section - I(B), and Section III of the proposal form and declaration relative thereto shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and that if any untrue averment to be contained there in the said contract shall be dealt with as per provisions of Section 45 of the Insurance Act,1938 as amended from time to time. `,
    "And I further declare that if after the date of submission of the proposal but before the issue of first premium receipt ( i) any change in the occupation of the Life to be assured or any adverse circumstances connected with the financial position or general health of the Life to be assured or that of any member of his family occurs or (ii) if a proposal for assurance or an application for revival of a policy on the Life to be assured made to any office of the Corporation has been withdrawn or dropped , deferred or declined or accepted with an increased premium or subject to lien or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider the terms of acceptance . Any omission on my part to do so shall render this contract to be dealt with as per provisions of Section 45 of the Insurance Act, 1938 as amended from time to time. ",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    "I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc",
    "I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
    "",
    "",
    `I ${getSecondLifeName()} ( Name of the Life to be assured) whose life is herein being proposed to be assured, do hereby declare that the statements and answers under heading Section -I(B), and Section III of the proposal form have been given by me after fully understanding the questions and the same are true and complete in every particular and that I have not withheld any information.`,
    "Notwithstanding the provisions of any law , usage , custom or convention for the time being in force prohibiting any doctor , Hospital, diagnostic center and /or Employer , reinsurer/ credit bureau from divulging any knowledge or information about me concerning my health or employment, occupation, insurance , financial etc on the ground of Privacy , I/ my heirs , executors , administrators and assignees or any person or persons , having interest of any kind whatsoever in the policy contract issued to me , hereby agree , that such authority, having such knowledge or information , shall at any time be at liberty to divulge any such knowledge or information to the Corporation and the Corporation to divulge the same to any Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of underwriting / investigation / risk mitigation / fraud control and/or claim settlement.",
    "I undertake to inform the Corporation immediately of any changes in KYC documents such as residence. I also give my consent to share my data with Central KYC Registry and to receive phone calls , SMS/ E mail from Central KYC registry in this regard.",
    "I understand that the Corporation reserves the right to accept /Postpone/ drop/ decline or offer alternate terms on this proposal for life insurance .",
    " I hereby give my consent to receive phone calls, SMS/E mail on the above mentioned registered number/ E mail address from / on behalf of the Corporation with respect to my life insurance policy/regarding servicing of insurance policies/enhancing insurance awareness/ notifying about the status of Claim etc I also understand that the premium and benefits under the policy are subject to taxes / duties/ charges in accordance with the laws as applicable from time to time.",
  ];

  const GetMinorOrSecondLife = (a, b) => (checkThereIsMinor() ? a : b);

  const ProposalDeclaration = {
    860: proposal1,
    868: proposal1, // main life, main life + life to be Assured,  minor life
    865: proposerOnlyLifeAssured ? P7MainLife : GetMinorOrSecondLife(P7MinorLife, P7SecondMainLife), // Jeevan Azad done
    869: proposerOnlyLifeAssured ? P8MainLife : GetMinorOrSecondLife(P8MinorLife, P8SecondMainLife), // main life, main life + life to be Assured,  minor life
    871: proposal1,
    863: proposal6, // done

    862: proposal2, //
    857: proposal2, //
    858: proposal2, //
    905: proposal3, // Cancer cover done
    872: proposal2,
    849: checkThereIsMinor() ? proposal42 : proposal41, // minor different declaration done
    852: checkThereIsMinor() ? proposal42 : proposal41, // minor different declaration done
    954: proposal5, //
    870: proposerOnlyLifeAssured ? P9MainLife : P9SecondLife, // main life, main life + life to be Assured,  minor life
    867: checkThereIsMinor() ? proposal72 : proposal71,
    874: proposal1,
  };

  const disclaimer = [
    "Life Insurance Corporation reserves the right to cancel the proposal or policy after deducting cancellation charges and medical fees and is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of non issuance of the policy document or the cancellation of the policy number allotted in case:",
    "1. Payment of First Premium is through net-banking account of a third party or the online transactions get rejected or is not processed due to RBI guidelines or any reason whatsoever.",
    "2. It is found that the policy was issued on the basis of incorrect information or wrong declaration.",
    "3. On due verification by Life Insurance Corporation of the KYC and other documents submitted, if information as revealed from the documents submitted does not match with the information given at proposal stage.",
    "It is also clarified that the tax benefits are available as per the prevailing income tax laws. The service tax and education cess would be levied as per the applicable tax laws.# No chargeback will be entertained once the payment has been made to LIC of India.# On issuance of the Proposal Deposit Receipt for the amount paid, the refund, if any, will be processed within 180 days from the date of payment or else the customer may contact the Servicing Branch Office.# To avoid Duplicate payments, check your Bank Account for deduction of amount transacted, before initiating another transaction.",
  ];

  const section45 = [
    "(1) No policy of life insurance shall be called in question on any ground whatsoever after the expiry of three years from the date of the policy, i.e. from the date of issuance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later.",
    "(2) A policy of life insurance may be called in question at any time within three years from the date of issuance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later, on the ground of fraud : Provided that the insurer shall have to communicate in writing to the insured or the legal representatives or nominees or assignees of the insured the grounds and the materials on which such decision is based.",

    "Explanation I - For the purpose of this subsection, the expression 'fraud' means any of the following acts committed by the insured or by his agent, with the intent to deceive the insurer or to induce the insurer to issue a life insurance policy :",
    "(a) The suggestion, as a fact of that which is not true and which the insured does not believe to be true; (b) The active concealment of the fact by the insured having knowledge or belief of the fact; (c) Any other act fitted to deceive; and (d) Any such act or omission as the law specially declares to be fraudulent.",
    "Explanation II - Mere silence as to facts likely to affect the assessment of the risk by the insurer is not fraud, unless the circumstances of the case are such that regard being had to them, it is the duty of the insured or his agent, keeping silence to speak, or unless his silence is, in itself, equivalent to speak.",
    "(3) Not withstanding anything contained in sub-section(2), no insurer shall repudiate a life insurance policy on the ground of fraud if the insured can proved that the mis-statement of or suppression of a material fact are within the knowledge and belief or that there was no deliberate intention to suppress the fact or that such mis-statement of or suppression of a material fact are within the knowledge of the insurer: Provided that in case of fraud, the onus of disproving lies upon the beneficiaries, in case the policy holder is not alive. Explanation : A person who solicits and negotiates a contract of insurance shall be deemed for the purpose of the formation of the contract, to be agent of the Insurer.",
    "(4) A policy of life insurance may be called in question at any time within three years from the date of issuance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later, on the ground that any statement of or suppression of a fact material to the expectancy of the life to be insured was incorrectly made in the proposal or other document on the basis of which the policy was issued or revived or rider issued : Provided that the insurer shall have to communicate in writing to the insured or the legal representatives or nominees or assignees of the insured the grounds and materials on which such decision to repudiate the policy of life insurance is based : Provided further that in case of repudiation of the policy on the ground of mis-statement or suppression of a material fact, and not on ground of fraud, the premiums collected on the policy till the date of repudiation shall be paid to the insured or the legal representatives or nominees or assignees of the insured within a period of ninety days from the date of such repudiation. Explanation - For the purposes of this sub-section, the mis-statement of or suppression of fact shall not be considered material unless it has a direct bearing on the risk undertaken by the insurer, the onus is on the insurer to show that had the insurer been aware of the said fact no life insurance policy would have been issued to the insured.",
    "(5) Nothing in this section shall prevent the insurer from calling for proof of age at any time if he is entitled to do so, and no policy shall be deemed to be called in question merely because the terms of the policy are adjusted on subsequent proof that the age of the life insured was incorrectly stated in the proposal.",
    "Section 45 of the Insurance Act 1938 as amended by Insurance Laws (Amendment) Act, 2015",
  ];

  const section41 = [
    "In accordance with the applicable provision of Section 41 of the Insurance Act 1938",
    "No person shall allow or offer to allow, either directly or indirectly, as an inducement to any person to take out or renew or continue an insurance in respect of any kind of risk relating to lives or property in India, any rebate of the whole or part of the commission payable or any rebate of the premium shown on th policy, nor shall any person taking out or renewing or continuing a policy accept any rebate , except such rebate as may be allowed in accordance with the published prospectus or tables of the insurer",
    "Various sections of the Insurance Act, 1938 applicable to LIC to apply as amended from time to time",
  ];

  return [
    {
      type: "Split",
      visible: true,
      split: [
        { splitId: 3, md: 8, lg: 8, xl: 8, xxl: 8, visible: true },
        { splitId: 4, md: 4, lg: 4, xl: 4, xxl: 4, visible: true },
      ],
      spacing: 12,
    },
    {
      type: "Accordion",
      visible: true,
      spacing: 12,
      splitId: 3,
      accordionList: [
        { accordionId: 5, visible: true, label: "Proposal Declaration" },
        { accordionId: 4, visible: true, label: "Section 45" },
        { accordionId: 6, visible: true, label: "Section 41" },
        { accordionId: 3, visible: true, label: "Disclaimer" },
      ],
    },

    ...disclaimer.map((x) => ({
      type: "Typography",
      visible: true,
      splitId: 3,
      accordionId: 3,
      spacing: 12,
      variant: "h6",
      sx: { mt: 2, fontWeight: 400, textAlign: "justify", textJustify: "inter-word" },
      label: x,
    })),
    ...section45.map((x) => ({
      type: "Typography",
      visible: true,
      splitId: 3,
      accordionId: 4,
      spacing: 12,
      variant: "h6",
      sx: { mt: 2, fontWeight: 400, textAlign: "justify", textJustify: "inter-word" },
      label: x,
    })),
    ...(ProposalDeclaration[dto?.QuotationData?.[0]?.PlanNumber]
      ? ProposalDeclaration[dto?.QuotationData?.[0]?.PlanNumber]
      : []
    ).map((x) => ({
      type: "Typography",
      visible: true,
      splitId: 3,
      accordionId: 5,
      spacing: 12,
      variant: "h6",
      sx: { mt: 2, fontWeight: 400, textAlign: "justify", textJustify: "inter-word" },
      label: x,
    })),
    ...section41.map((x) => ({
      type: "Typography",
      visible: true,
      splitId: 3,
      accordionId: 6,
      spacing: 12,
      variant: "h6",
      sx: { mt: 2, fontWeight: 400, textAlign: "justify", textJustify: "inter-word" },
      label: x,
    })),
  ];
}
