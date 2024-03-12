import nameImg from "assets/images/Life/name.png";
import detailsImg from "assets/images/Life/details.png";
import locationImg from "assets/images/Life/location.png";
import birthDayImg from "assets/images/Life/birthDay.png";
import contactImg from "assets/images/Life/contact.png";
import { IsEmail } from "Common/Validations";
import MDTypography from "components/MDTypography";

export default function Lead({ dto, setDto, getAge, getMaster, mobileView }) {
  const imgSX = { height: "45px" };
  const checkForValue = (value) => value === "" || value === undefined || value === null;
  const onCity = (e, v) => {
    const lDto = { ...dto };
    lDto.ProposerDetails.PermanentAddress.City = v.mValue;
    lDto.ProposerDetails.PermanentAddress.BranchCode = v.BranchCode;
    lDto.ChannelDetails = {
      ...(lDto.ChannelDetails ? lDto.ChannelDetails : {}),
      BranchCode: v.BranchCode,
      BranchName: v.BranchName,
      Email: v.Email,
      Mobile: v.Mobile,
      Address1: v.Address1,
      Address2: v.Address2,
      Address3: v.Address3,
      DivisionCode: "V".concat(v.mID.padStart(3, "0")),
      Pincode: v.BranchPincode,
      ZoneCode: v.ZoneCode,
    };
    setDto({ ...lDto });
  };
  const minAge = dto.productDetails[0].planDetailsJson?.Limits?.minAge || 0;
  const maxAge = dto.productDetails[0].planDetailsJson?.Limits?.maxAge || 200;

  const minAnnualIncome = dto.productDetails[0].planDetailsJson?.minAnnualIncome || 0;
  const applicableForOthers = dto.productDetails[0].planDetailsJson?.applicableForOthers;

  const validateAge = () => {
    if (dto.ProposerDetails.Age >= minAge && dto.ProposerDetails.Age <= maxAge) return true;
    return false;
  };
  const getIcon = (gender) =>
    ({ Male: "man", Female: "woman", Transgender: "accessibility" }[gender]);
  const genderList = dto.productDetails[0].planDetailsJson?.Limits?.genderList
    ? dto.productDetails[0].planDetailsJson.Limits.genderList.map((elem) => ({
        text: elem,
        icon: getIcon(elem),
      }))
    : [
        { icon: "man", text: "Male" },
        { icon: "woman", text: "Female" },
        { icon: "accessibility", text: "Transgender" },
      ];
  return [
    [
      { type: "Img", visible: mobileView === true, src: nameImg, spacing: 1, sx: imgSX },
      {
        type: "Input",
        label: "Full Name",
        visible: true,
        path: "ProposerDetails.FirstName",
        required: true,
        spacing: 5.5,
        onChangeFuncs: ["IsAlphaSpace"],
      },
      { type: "Custom", visible: true, spacing: 5.5, return: null },
      {
        type: "Input",
        label: "Last Name",
        visible: false,
        path: "ProposerDetails.LastName",
        required: true,
        spacing: 5.5,
        onChangeFuncs: ["IsAlphaSpace"],
      },
      { type: "Img", visible: mobileView === true, src: birthDayImg, spacing: 1, sx: imgSX },

      {
        type: "MDDatePicker",
        label: "Date of Birth",
        visible: true,
        path: "ProposerDetails.DOB",
        required: true,
        dateFormat: "Y-m-d",
        allowInput: true,
        spacing: 4,
        maxDate: new Date(new Date() - 86400000 * 365 * 18),
        customOnChange: (e, a, setErrorFlag, setErrorText) =>
          getAge(`ProposerDetails`, a, setErrorFlag, setErrorText),
        errorFlag: dto.ProposerDetails.IsProposerSameAsInsured === "Yes" && !validateAge(),
        errorText:
          dto.ProposerDetails.IsProposerSameAsInsured === "Yes" && !validateAge()
            ? `Min Age allowed: ${minAge},Max Age allowed: ${maxAge}`
            : "",
      },

      {
        type: "Input",
        label: "Age",
        visible: true,
        path: "ProposerDetails.Age",
        spacing: 1.5,
        readOnly: true,
      },

      {
        type: "Gender",
        visible: true,
        path: "ProposerDetails.Gender",
        spacing: 5.5,
        required: true,
        options: genderList,
      },
      { type: "Img", visible: mobileView === true, src: contactImg, spacing: 1, sx: imgSX },

      {
        type: "Input",
        label: "Email ID",
        visible: true,
        path: "ProposerDetails.EmailId",
        required: true,
        endAdornmentIcon: "mail",
        spacing: 5.5,
        errorFlag: IsEmail(dto?.ProposerDetails?.EmailId) !== true,
        errorText:
          IsEmail(dto?.ProposerDetails?.EmailId) !== true
            ? IsEmail(dto?.ProposerDetails?.EmailId)
            : "",
      },

      {
        type: "Input",
        label: "Mobile No.",
        visible: true,
        path: "ProposerDetails.ContactNo",
        required: true,
        endAdornmentIcon: "smartphone",
        spacing: 5.5,
        // errorFlag: IsMobileNumber(dto?.ProposerDetails?.ContactNo) !== true,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        onBlurFuncs: ["IsMobileNumber"],
        // errorText:
        //   IsMobileNumber(dto?.ProposerDetails?.ContactNo) !== true
        //     ? IsMobileNumber(dto?.ProposerDetails?.ContactNo)
        //     : "",
        // customOnBlur: (e, a, setErrorFlag, setErrorText) => {
        //   const response = IsMobileNumber(e.target.value);
        //   if (response !== true) {
        //     setErrorFlag(true);
        //     setErrorText(response);
        //   } else {
        //     setErrorFlag(false);
        //     setErrorText("");
        //   }
        // },
      },

      { type: "Img", visible: mobileView === true, src: detailsImg, spacing: 1, sx: imgSX },

      // {
      //   type: "Input",
      //   label: "Annual Income",
      //   visible: true,
      //   path: "ProposerDetails.AnnualIncome",
      //   endAdornmentIcon: "currency_rupee",
      //   required: true,
      //   spacing: 5.5,
      // },
      {
        type: "CurrencyInput",
        visible: true,
        spacing: 5.5,
        path: "ProposerDetails.AnnualIncome",
        // path: `RiskItems.0.Occupation.AnnualIncome1`,
        required: minAnnualIncome > 0,
        label: "Annual Income",
        errorFlag: dto.ProposerDetails.AnnualIncome < minAnnualIncome,
        errorText: `Minimum Annual Income is ${minAnnualIncome}`,
        // maxValue: Math.min(
        //   x.AdditionalDetailsJson.Limit[0].Max,
        //   productDetails.SumAssured ? productDetails.SumAssured : 0
        // ),
        // multipleOf: x.AdditionalDetailsJson.Limit[0].MultipleOf,
      },
      // [!checkForValue(productDetailsContent) && productDetailsContent, ...productDetailsContent]
      //   .filter((x) => x?.label === "Relation with Proposer")
      //   .map((item) => {
      //     const { accordionId, splitId, ...newItem } = item;
      //     return newItem;
      //   })[0],
      { type: "Typography", visible: true, spacing: 5.5 },
      {
        type: "AutoComplete",
        label: "City you Live",
        visible: false,
        path: "ProposerDetails.PermanentAddress.City",
        required: true,
        spacing: 5.5,
      },
      { type: "Img", visible: mobileView === true, src: locationImg, spacing: 1, sx: imgSX },

      {
        type: "AutoComplete",
        label: "Residential Status",
        visible: true,
        path: "ProposerDetails.ResidentStatus",
        options: getMaster("ResidentStatus"),
        required: true,
        spacing: 5.5,
      },

      {
        type: "AutoComplete",
        label: "Country of Residency",
        visible:
          !checkForValue(dto?.ProposerDetails?.ResidentStatus) &&
          dto?.ProposerDetails?.ResidentStatus !== "Resident Indian",
        options: getMaster("Country"),
        path: "ProposerDetails.PermanentAddress.Country",
        required:
          // !checkForValue(dto?.ProposerDetails?.ResidentStatus) &&
          dto?.ProposerDetails?.ResidentStatus !== "Resident Indian",
        spacing: 5.5,
        paths: [
          { parameter: "mValue", path: "ProposerDetails.CountryOfResidency" },
          { parameter: "RESIDENCEGROUP", path: "ProposerDetails.CountryOfResidencyGroup" },
        ],
      },
      {
        type: "Typography",
        visible: dto?.ProposerDetails?.ResidentStatus !== "Resident Indian",
        spacing: 1,
      },

      {
        type: "AutoComplete",
        label: "City",
        visible: !checkForValue(dto?.ProposerDetails?.ResidentStatus),
        options: [...getMaster("City")],
        path: "ProposerDetails.PermanentAddress.City",
        required: true,
        spacing: 5.5,
        customOnChange: (e, v) => onCity(e, v),
      },

      // !checkForValue(productDetailsContent) && productDetailsContent,
      // [...productDetailsContent],

      // [],
      {
        type: "RadioGroup",
        visible: applicableForOthers !== false,
        path: `ProposerDetails.IsProposerSameAsInsured`,
        radioLabel: {
          labelVisible: true,
          label: "Are you taking policy for",
          fontSize: "1rem",
          fontWeight: 600,
        },
        radioList: [
          { label: "Yourself", value: "Yes" },
          { label: "Your family member", value: "No" },
        ],
        // justifyContent: "space-between",
        spacing: 12,
        required: true,
      },
      {
        type: "Custom",
        spacing: 6,
        visible: false,
      },

      {
        type: "Checkbox",
        spacing: 12,
        visible: true,
        label:
          "I hereby confirm that the mobile number provided by me is registered in my own name and email provided is my own. By ticking this box, I hereby authorize Life Insurance Corporation of India and its representatives/associates to contact me through calls on my Mobile Number/WhatsApp or send emails to my Email-Id to assist and verify the information provided by me, even if I am registered in the Do Not Call /NDNC List of the Telecom Regulatory Authority of India. further details and ask to upload related documents etc. I further consent to share my information on confidential basis with its related third parties (Like call-center, TPAs/MSPs etc.) for evaluating and processing this online proposal.",
        path: `ProposerDetails.Declarations.PersonalDecl`,
        checkedVal: true,
        sx: { alignItems: "flex-start" },
        textSX: {
          fontSize: "0.8rem",
          marginTop: "8px",
          textAlign: "justify",
          textJustify: "inter-word",
        },
        required: true,
      },
      {
        type: "Checkbox",
        spacing: 12,
        visible: true,
        label:
          "I consciously chose to bypass the suitability module even though the same is recommended.",
        path: `ProposerDetails.Declarations.ConsciouslychoseDecl`,
        sx: { alignItems: "flex-start" },
        textSX: {
          fontSize: "0.8rem",
          marginTop: "8px",
          textAlign: "justify",
          textJustify: "inter-word",
        },
        checkedVal: true,
      },
      {
        type: "Custom",
        visible: false,
        spacing: 12,
        return: (
          <MDTypography sx={{ fontSize: "1rem" }}>
            By clicking on Proceed, you are agreeing to our{" "}
            <a
              href="https://licindia.in/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0071D9" }}
              tabIndex={-1}
            >
              Privacy policy
            </a>
            ,{" "}
            <a
              href="https://licindia.in/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0071D9" }}
              tabIndex={-1}
            >
              Terms of Use
            </a>{" "}
            &{" "}
            <a
              href="https://licindia.in/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0071D9" }}
              tabIndex={-1}
            >
              Disclaimer
            </a>
          </MDTypography>
        ),
      },
    ],
  ];
}
