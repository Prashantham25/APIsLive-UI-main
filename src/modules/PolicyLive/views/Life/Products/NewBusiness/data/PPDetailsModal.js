import { Grid } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

import objectPath from "object-path";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import MDButton from "../../../../../../../components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import { GenericApi } from ".";
import { DateFormatFromStringDate } from "../../../../../../../Common/Validations";

export default function PPDetailsModal({
  dto,
  setDto,
  setPpdFlag,
  onAddPPD,
  Gender,
  DOB,
  setLoading,
  AddedPPDDetails,
}) {
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(-1);
  const [fetchFlag, setFetchFlag] = useState(false);

  const statusCodeMap = {
    21: "Inforce",
    31: "Reduced Paid Up",
    32: "Fully Paid Up",
    33: "Single Premium",
    41: "Lapsed without surrender value",
    42: "Lapsed without acquiring paid up value but some amount is guaranteed by way of policy condition like surrender value",
    81: "Policy Surrendered",
    82: "Death Claim Paid",
    83: "Maturity Claim Paid",
    84: "Policy Cancelled",
  };

  const TermsOfAcceptanceMap = {
    "1 ": "Accepted at OR",
    "2 ": "Accepted With Extra",
    "3 ": "Accepted on Modified Terms",
    "4 ": "Accepted with Occupation Extra",
    "5 ": "Accepted with Health Extra or Lean",
    "6 ": "Accepted with H.E/Lean/Occupation Extras",
    "7 ": "Accepted with Clause 4B",
    "8 ": "Accepted with Clause 4B and Occupation Extras.",
    "9 ": "Accepted with Age Extra",
  };

  const dObj = {
    policyno: "",
    custid: "",
    name: "",
    plancd: "",
    policyterm: "",
    premiumpayingterm: "",
    sumassured: "",
    commencementdate: "",
    premiummode: "",
    premiummodedesc: "",
    statuscd: "",
    medicalflag: null,
    instpremium: "",
    fupdt: "",
    sex: "",
    birthdt: "",
    revival_DT: "",
    sum_ASSURED_OPTION: "",
    decision: "",
    acceptance_CD: "",
    ta_SUM_ASSURED: "",
    ci_SUM_ASSURED: "",
    net_NCO: "",
    pwb_OPTED: "",
    tabular_RATE: "",
    ab_SUMASSURED: "",
    addb_SUMASSURED: "",
    annuity_OPTION: "",
    mode_ANNUITY: "",
    current_ANNUITY_INST: "",
    Noofyears: 0,
    InsurerType: "LIC",
  };

  const PreferredMode = [
    { mValue: "Yearly" },
    { mValue: "Half-Yearly" },
    { mValue: "Quarterly" },
    { mValue: "Monthly" },
    { mValue: "Single" },
  ];

  const onCommencementDate = (e, a) => {
    try {
      setDto({
        ...dto,
        commencementdate: a,
        Noofyears: new Date().getFullYear() - new Date(e).getFullYear(),
      });
    } catch {
      //
    }
  };

  const onPolicyNo = async (e) => {
    let addedPPDflag = false;
    console.log("AddedPPDDetails", AddedPPDDetails);
    if (Array.isArray(AddedPPDDetails)) {
      AddedPPDDetails.forEach((x) => {
        if (x.policyno === e.target.value) addedPPDflag = true;
      });
    }

    if (addedPPDflag) {
      Swal.fire({
        icon: "info",
        text: ` ${e.target.value} - policy number details are already added.`,
      });
    } else {
      setLoading(true);
      const res2 = await GenericApi("LifeInsurance", "LIC_PreviousPoliy_Individual", {
        policyno: e.target.value,
        sessionparam: {
          regsource: "N",
          accessid: "419494586",
          plan: "846",
          propformtype: "F300",
          lifeid: "L",
          agenttype: "A",
        },
      });
      setLoading(false);

      if (
        res2?.finalResult?.policydetails?.plan !== null &&
        res2?.finalResult?.policydetails?.plan !== undefined &&
        res2?.finalResult?.policydetails?.plan !== ""
      ) {
        const pp = res2.finalResult.policydetails;

        // 21 – Inforce
        // 31 – Reduced Paid Up
        // 32 – Fully Paid Up
        // 33 – Single Premium
        // 41 – Lapsed without surrender value
        // 42 – Lapsed without acquiring paid up value but some amount is guaranteed by way of policy condition like surrender value
        // 81 – Policy Surrendered
        // 82 – Death Claim Paid
        // 83 – Maturity Claim Paid
        // 84 – Policy Cancelled

        if (DOB.split("-").join("") === pp.dob && Gender[0] === pp.gender) {
          if (
            pp.status === 21 ||
            pp.status === 31 ||
            pp.status === 32 ||
            pp.status === 33 ||
            pp.status === 41 ||
            pp.status === 42
          ) {
            setDto({
              ...pp,
              policyterm: pp.term,
              plancd: pp.plan,
              ci_SUM_ASSURED: pp.cisum,
              ta_SUM_ASSURED: pp.tasum,
              annuity_OPTION: pp.annuityoption,
              statuscd: `0${pp.status}`,
              statusName: statusCodeMap[pp.status],
              acceptance_CD: `0${pp.termsaccepted[0]}`,
              acceptance_Name: TermsOfAcceptanceMap[pp.termsaccepted],
              commencementdate: DateFormatFromStringDate(pp.doc, "d-m-y", "y-m-d"),
              Noofyears:
                new Date().getFullYear() -
                new Date(DateFormatFromStringDate(pp.doc, "d-m-y", "y-m-d")).getFullYear(),
              InsurerType: "LIC",
            });
            setFetchFlag(true);
          } else
            Swal.fire({
              icon: "info",
              text: "Policy status not in Inforce, Reduced Paid Up, Fully Paid Up, Single Premium",
            });
        } else {
          Swal.fire({ icon: "warning", text: "Details not matching with insurable person !" });
          setDto({ ...dObj, policyno: e.target.value });
          setFetchFlag(false);
        }
      } else {
        // Swal.fire({ icon: "error", text: "Policy Details Not Found" });
        setDto({ ...dObj, policyno: e.target.value });
        setFetchFlag(false);

        // setFetchFlag(true);
      }
    }
  };

  const ppdControls = [
    {
      type: "IconButton",
      visible: true,
      spacing: 12,
      icon: "cancel",
      color: "error",
      justifyContent: "right",
      onClick: () => {
        setDto({ ...dObj });
        setPpdFlag(false);
      },
    },
    ...[
      {
        label: "Previous Policy Details",
        type: "Typography",
        spacing: 12,
      },
      {
        path: `policyno`,
        label: "Policy Number",
        type: "Input",
        required: true,
        customOnBlur: onPolicyNo,
        disabled: false,
      },
      {
        path: `plancd`,
        label: "Plan Code",
        type: "Input",
        required: true,
        onChangeFuncs: ["IsNumeric"],
      },
      {
        path: `sumassured`,
        label: "Sum Assured",
        type: "CurrencyInput",
        required: !fetchFlag,
      },
      {
        path: `policyterm`,
        label: "Policy Term",
        type: "Input",
        required: !fetchFlag,
        onChangeFuncs: ["IsNumeric"],
      },
      {
        path: `premiumpayingterm`,
        label: "Premium Paying Term",
        type: "Input",
        required: !fetchFlag,
        onChangeFuncs: ["IsNumeric"],
      },
      {
        path: `commencementdate`,
        label: "Commencement Date",
        type: "MDDatePicker",
        maxDate: new Date(),
        allowInput: true,
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        required: !fetchFlag,
        customOnChange: onCommencementDate,
      },
      {
        path: `premiummodedesc`,
        label: "Premium Mode",
        type: "AutoComplete",
        options: PreferredMode,
        required: false,
      },
      {
        path: `sum_ASSURED_OPTION`,
        label: "Sum Assured Option",
        type: "AutoComplete",
        options: [{ mValue: "Level Sum Assured" }, { mValue: "Increasing Sum Assured" }],
        required: false,
      },

      {
        path: `acceptance_CD`,
        label: "Terms of Acceptance",
        type: "AutoComplete",
        options: [
          { mID: "1 ", mValue: "Accepted at OR" },
          { mID: "2 ", mValue: "Accepted With Extra" },
          { mID: "3 ", mValue: "Accepted on Modified Terms" },
          { mID: "4 ", mValue: "Accepted with Occupation Extra" },
          { mID: "5 ", mValue: "Accepted with Health Extra or Lean" },
          { mID: "6 ", mValue: "Accepted with H.E/Lean/Occupation Extras" },
          { mID: "7 ", mValue: "Accepted with Clause 4B" },
          { mID: "8 ", mValue: "Accepted with Clause 4B and Occupation Extras." },
          { mID: "9 ", mValue: "Accepted with Age Extra" },
        ],
        required: false,
        customOnChange: (e, a) =>
          setDto({ ...dto, acceptance_CD: a.mID, acceptance_Name: a.mValue }),
      },
      {
        path: `ta_SUM_ASSURED`,
        label: "Term Assurance",
        type: "CurrencyInput",
        required: false,
      },
      {
        path: `ci_SUM_ASSURED`,
        label: "Critical Illness",
        type: "CurrencyInput",
        required: false,
      },
      {
        path: `ab_SUMASSURED`,
        label: "AD Sum Assured",
        type: "CurrencyInput",
        required: false,
      },
      {
        path: `addb_SUMASSURED`,
        label: "ADDB Sum Assured",
        type: "CurrencyInput",
        required: false,
      },

      {
        path: `pwb_OPTED`,
        label: "Premium Waiver Benefit Opted",
        type: "AutoComplete",
        options: [{ mValue: "Yes" }, { mValue: "No" }],
        required: false,
      },

      {
        path: `revival_DT`,
        label: "Date of Revival",
        type: "MDDatePicker",
        maxDate: new Date(),
        allowInput: true,
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        required: false,
      },
      {
        path: `fupdt`,
        label: "Date of FUP",
        type: "MDDatePicker",
        maxDate: new Date(),
        allowInput: true,
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        required: false,
      },

      {
        path: `statusName`,
        label: "Policy Status",
        type: "AutoComplete",
        options: [
          { mID: 21, mValue: "In-force" },
          { mID: 31, mValue: "Reduced Paid Up" },
          { mID: 31, mValue: "Fully Paid Up" },
          { mID: 33, mValue: "Single Premium" },
          { mID: 41, mValue: "Lapsed without surrender value" },
          { mID: 81, mValue: "Policy Surrendered" },
          { mID: 82, mValue: "Death Claim Paid" },
          { mID: 83, mValue: "Maturity Claim Paid" },
        ],
        customOnChange: (e, a) => setDto({ ...dto, statuscd: a.mID, statusName: a.mValue }),
      },

      // 21 – Inforce
      // 31 – Reduced Paid Up
      // 32 – Fully Paid Up
      // 33 – Single Premium
      // 41 – Lapsed without surrender value
      // 42 – Lapsed without acquiring paid up value but some amount is guaranteed by way of policy condition like surrender value
      // 81 – Policy Surrendered
      // 82 – Death Claim Paid
      // 83 – Maturity Claim Paid
      // 84 – Policy Cancelled

      // {
      //   path: `annuity_OPTION`,
      //   label: "Annuity Option",
      //   type: "Input",
      //   required: false,
      // },
    ].map((x) => ({ visible: true, spacing: 3, disabled: fetchFlag, ...x })),
  ];

  const onAdd = () => {
    let validationFlg = true;
    ppdControls.forEach((x) => {
      if (x.visible === true && x.path && x.required === true) {
        const val = objectPath.get(dto, x.path);
        if (val === "" || val === undefined || val === null) validationFlg = false;
      }
    });

    if (validationFlg) {
      setNextFlag(false);
      onAddPPD();
      setPpdFlag(false);
    } else {
      setNextCount(nextCount + 1);
      setNextFlag(true);
    }
  };

  return (
    <Grid container spacing={2}>
      {ppdControls.map(
        (item) =>
          item.visible === true && (
            <Grid
              item
              xs={12}
              sm={12}
              md={item.spacing || 4}
              lg={item.spacing || 4}
              xl={item.spacing || 4}
              xxl={item.spacing || 4}
            >
              <NewRenderControl
                item={item}
                setDto={setDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
                dto={dto}
                onMidNextValidation={() => console.log()}
                midNextValidationId={-1}
              />
            </Grid>
          )
      )}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDButton onClick={onAdd}>ADD</MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}
