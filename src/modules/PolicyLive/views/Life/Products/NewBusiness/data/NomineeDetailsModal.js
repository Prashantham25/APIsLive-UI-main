import Swal from "sweetalert2";
import { Grid } from "@mui/material";
import { useState } from "react";
import objectPath from "object-path";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import MDButton from "../../../../../../../components/MDButton";
import { AgeCalculator } from "../../../../../../../Common/Validations";
import MDBox from "../../../../../../../components/MDBox";
import "./SwalStyle.css";

export default function NomineeDetailsModal({
  dto,
  setDto,
  closeNomineeModal,
  setNomineeFlg,
  EditFlg,
  onAddNominee,
  onUpdateNominee,
  AvailableNomineePercentage,
  proposerAddress,
  LifeNomineeRelation,
  LifeAppointeeRelation,
  proposalJson,
}) {
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(-1);
  const onDOB = (a, name1, name2) => {
    setDto({ ...dto, [name1]: a, [name2]: AgeCalculator(new Date(a)) });
  };

  const IsAlphaSpaceDot = (str) => {
    const regex = /^[a-zA-Z\s.]*$/;
    if (regex.test(str)) return true;
    return "Allows only alphabets, space, and dot (.)";
  };

  const onSameAddress = (e) => {
    if (e.target.checked === true)
      setDto({
        ...dto,
        IsNomineeAddressSameAsProposer: true,
        NomineeAddressLine1: proposerAddress?.AddressLine1,
        NomineeAddressLine2: proposerAddress?.AddressLine2,
        NomineeCity: proposerAddress?.City,
        NomineeState: proposerAddress?.State,
        NomineePincode: proposerAddress?.Pincode,
      });
    else
      setDto({
        ...dto,
        IsNomineeAddressSameAsProposer: false,
        NomineeAddressLine1: "",
        NomineeAddressLine2: "",
        NomineeCity: "",
        NomineeState: "",
        NomineePincode: "",
      });
  };

  const DivyanjanNomineeFlag = proposalJson?.IfProposalForDivyanjanStatus === "As Nominee";

  const nomineeControls = [
    ...[
      {
        type: "IconButton",
        visible: true,
        spacing: 12,
        icon: "cancel",
        color: "error",
        justifyContent: "right",
        onClick: closeNomineeModal,
      },
      // { type: "Typography", spacing: 12, visible: true },
      // {
      //   label: "Divyanjan as Nominee",
      //   visible: DivyanjanNomineeFlag,
      //   type: "Typography",
      //   spacing: 12,
      //   color: "error",
      // },
      {
        label: `Nominee Details ${DivyanjanNomineeFlag ? "(Divyanjan as Nominee)" : ""}`,
        visible: true,
        type: "Typography",
        spacing: 12,
      },
      {
        path: `NomineeName`,
        label: "Nominee Name",
        visible: true,
        type: "Input",
        spacing: 3,
        onChangeFuncs: [IsAlphaSpaceDot],
      },
      {
        label: "Date of Birth",
        path: "NomineeDOB",
        visible: true,
        allowInput: true,
        type: "MDDatePicker",
        required: true,
        maxDate: "today",
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        customOnChange: (e, a) => onDOB(a, "NomineeDOB", "NomineeAge"),
        spacing: 3,
      },

      {
        path: `NomineeRelationWithProposer`,
        label: "Relation With Insurable Person",
        visible: true,
        type: "AutoComplete",
        spacing: 3,
        options: LifeNomineeRelation,
      },
      {
        path: `PercentageOfShare`,
        label: "Percentage Of Share",
        visible: true,
        type: "Input",
        spacing: 3,
        maxLength: 3,
        onChangeFuncs: ["IsNumeric"],
        disabled: DivyanjanNomineeFlag,
      },

      {
        label: "Nominee Address Details",
        visible: true,
        type: "Typography",
        spacing: 12,
      },
      {
        type: "Checkbox",
        visible: true,
        path: "IsNomineeAddressSameAsProposer",
        label: "Is nominee address same as proposer address",
        checkedVal: true,
        customOnChange: onSameAddress,
        spacing: 12,
        required: false,
      },
      {
        path: `NomineeAddressLine1`,
        label: "Nominee Address Line 1",
        visible: true,
        type: "Input",
        spacing: 3,
        disabled: dto.IsNomineeAddressSameAsProposer,
        required: !dto.IsNomineeAddressSameAsProposer,
      },
      {
        path: `NomineeAddressLine2`,
        label: "Nominee Address Line 2",
        visible: true,
        type: "Input",
        spacing: 3,
        disabled: dto.IsNomineeAddressSameAsProposer,
        required: !dto.IsNomineeAddressSameAsProposer,
      },

      {
        path: `NomineeCity`,
        label: "City",
        visible: true,
        type: "Input",
        spacing: 3,
        disabled: dto.IsNomineeAddressSameAsProposer,
        required: !dto.IsNomineeAddressSameAsProposer,
      },
      {
        path: `NomineeState`,
        label: "State",
        visible: true,
        type: "Input",
        spacing: 3,
        disabled: dto.IsNomineeAddressSameAsProposer,
        required: !dto.IsNomineeAddressSameAsProposer,
      },
      {
        path: `NomineePincode`,
        label: "Pincode",
        visible: true,
        type: "Input",
        spacing: 3,
        maxLength: 6,
        onChangeFuncs: ["IsNumeric"],
        disabled: dto.IsNomineeAddressSameAsProposer,
        required: !dto.IsNomineeAddressSameAsProposer,
      },
      {
        label: "Appointee Details",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "Typography",
        spacing: 12,
      },
      {
        path: `AppointeeName`,
        label: "Appointee Name",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "Input",
        spacing: 3,
        onChangeFuncs: ["IsAlphaSpace"],
      },
      {
        path: `AppointeeDOB`,
        label: "Appointee DOB",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "MDDatePicker",
        // maxDate: new Date(),
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        spacing: 3,
        allowInput: true,
        customOnChange: (e, a) => onDOB(a, "AppointeeDOB", "AppointeeAge"),
      },
      {
        path: `RelationshipWithAppointee`,
        label: "Relation with nominee",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "AutoComplete",
        spacing: 3,
        options: LifeAppointeeRelation,
      },
      {
        path: `AppointeeEmailId`,
        label: "Appointee Email Id",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "Input",
        spacing: 3,
      },
      {
        path: `AppointeeMobileNo`,
        label: "Appointee Mobile No",
        visible: dto.NomineeAge < 18 || DivyanjanNomineeFlag,
        type: "Input",
        spacing: 3,
        endAdornmentIcon: "smartphone",
      },
    ].map((x) => ({ required: true, ...x })),
  ];

  const onAdd = () => {
    let validationFlg = true;
    nomineeControls.forEach((x) => {
      if (x.visible === true && x.path && x.required === true) {
        const val = objectPath.get(dto, x.path);
        if (val === "" || val === undefined || val === null) validationFlg = false;
      }
    });

    if (dto.NomineeAge < 18 && dto.AppointeeAge < 18) {
      Swal.fire({ icon: "warning", text: "Appointee age should not be less the 18 years" });
    } else if (!EditFlg && parseInt(dto.PercentageOfShare, 10) > AvailableNomineePercentage) {
      Swal.fire({ icon: "warning", text: "Percentage of share is exceeded !" });
    } else if (validationFlg) {
      setNextFlag(false);
      if (EditFlg === true) {
        onUpdateNominee();
      } else {
        onAddNominee();
      }
      setNomineeFlg(false);
    } else {
      setNextCount(nextCount + 1);
      setNextFlag(true);
    }
  };

  return (
    <MDBox>
      <Grid container spacing={2}>
        {nomineeControls.map(
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
            <MDButton onClick={onAdd}>{`${EditFlg === true ? "Update" : "Add"}`}</MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
