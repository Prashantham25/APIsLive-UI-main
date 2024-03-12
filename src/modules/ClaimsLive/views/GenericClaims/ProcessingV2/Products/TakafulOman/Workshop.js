import Swal from "sweetalert2";

const getTopLevelContent = () => [
  { label: "Claim No", path: "claimNo", visible: true },
  { label: "Master Claim No", path: "masterClaimNo", visible: true },
  { label: "Policy No", path: "policyNo", visible: true },
];

const getMenus = () => [
  { label: "Vehicle Repair Details", icon: "", visible: true },
  { label: "Upload/Review Doc", icon: "", visible: true },
];

const getAccordions = ({ menuIndex }) => {
  let data = [];
  switch (menuIndex) {
    case 0:
      data = [{ label: "Documents ", visible: true }];
      break;
    case 1:
      data = [{ label: "Documents", visible: true }];
      break;
    default:
      data = [];
      break;
  }
  return data;
};

const getControls = ({ menuIndex, dto, setDto }) => {
  const lDto = dto;
  const oncheckfasttrack = (e) => {
    if (e.target.checked === true) {
      Swal.fire({
        title: "Are you sure this is a Fast track settlement?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Are you sure to proceed as Fast Track settlement?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result1) => {
            if (result1.isConfirmed) {
              lDto.check1 = true;
              setDto({ ...lDto });
            } else {
              lDto.check1 = false;
              setDto({ ...lDto });
            }
          });
        } else {
          lDto.check1 = false;
          setDto({ ...lDto });
        }
      });
    } else lDto.check1 = false;
    setDto({ ...lDto });
  };
  const oncheckrepairs = (e) => {
    if (e.target.checked === true) {
      Swal.fire({
        title: "Are you sure the vehicle repairs are completed?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Are you sure to proceed with changing the status to vehicle repairs completed?",
            icon: "question",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result1) => {
            if (result1.isConfirmed) {
              lDto.check2 = true;
              setDto({ ...lDto });
            } else {
              lDto.check2 = false;
              setDto({ ...lDto });
            }
          });
        } else {
          lDto.check2 = false;
          setDto({ ...lDto });
        }
      });
    } else lDto.check2 = false;
    setDto({ ...lDto });
  };
  const onFunction1 = () => {
    // alert(flag.toString());
  };
  let data = [];
  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            path: "1",
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            required: true,
            label: "Vehicle First Presented",
            validationId: 1,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: "2",
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            // required : when user try to click on upload button of vehicle repair invoice in upload document tab
            label: "Vehicle Received for Repairs",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: "3",
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            // required : when user try to click on upload button of vehicle repair invoice in upload document tab
            label: "Repair Completion",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: "4",
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            // required : when user try to click on upload button of vehicle repair invoice in upload document tab
            label: "Vehicle Delivered",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: "check1",
            visible: true,
            type: "Checkbox",
            label: "Is this a Fast track Settlement ?",
            spacing: 12,
            checkedVal: true,
            uncheckedVal: false,
            customOnChange: (e) => oncheckfasttrack(e),
          },
          {
            path: "check2",
            visible: true,
            type: "Checkbox",
            label: "Vehicle repairs completed.",
            spacing: 12,
            checkedVal: true,
            uncheckedVal: false,
            customOnChange: (e) => oncheckrepairs(e),
          },
          {
            visible: true,
            type: "ValidationControl",
            validationId: 1,
            subType: "Button",
            label: "Save",
            onClick: onFunction1,
            justifyContent: "center",
            spacing: 12,
          },
        ],
      ];
      break;
    case 1:
      data = [];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = () => ({
  claimNo: "OD24020005269",
  masterClaimNo: "CM2402000279",
  policyNo: "P/101/1010/2024/00041",
});

const getMasters = () => ({});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
