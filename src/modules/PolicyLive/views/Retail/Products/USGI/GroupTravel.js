import React, { useEffect } from "react";
import swal from "sweetalert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import objectPath from "object-path";
import { PolicyJson } from "./data/Json/GroupTravel";
import {
  getGroupPartnerList,
  getMasterPolicyOnPartnerID,
  getAssignProductOnPartnerID,
  getPartnerDetailsonpartnerId,
  PartnerAccountSearchCd,
  getPlanOnMasterPolicy,
  getProductById,
  getPlanDetailsOnGroupId,
  GetAllMasterData,
  getGroupingDetails,
  GetPolicyTripTenureMaster,
  calculatePremium,
} from "./data/APIs/GroupTravelApi";
import { formatDate } from "./data/Json/USGIWCJson";
import {
  fetchPaymentURL,
  calculateProposal,
  GetProdPartnermasterData,
} from "./data/APIs/USGIWCApi";
import Payment from "./components/Payment";
import ProposalDetails from "./components/ProposalDetails";
import MemberDetails from "./components/GroupTravelModel";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = ["Partner Details", "Proposer Details", "Member Details", "Premium Summary"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Partner Details", visible: true, defaultExpanded: true },
        { name: "Cover Details", visible: true, defaultExpanded: true },
        { name: "Policy Details", visible: true, defaultExpanded: true },
        { name: "Contact Details", visible: true, defaultExpanded: true },
      ];
      break;
    case 1:
      // steps = [

      //   { name: "Proposer Details", visible: true, defaultExpanded: true },
      //   // { name: "b3", visible: true },
      // ];
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        { name: "Proposer Details", visible: true, defaultExpanded: true },
        { name: "CKYC/Permanent Address", visible: true, defaultExpanded: true },
        { name: "Communication Address", visible: true, defaultExpanded: true },
        { name: "Hypothecation", visible: true, defaultExpanded: true },
        { name: "Document Details", visible: true, defaultExpanded: true },
        { name: "Proposal Consent", visible: true, defaultExpanded: true },
      ];
      break;
    case 2:
      steps = [
        { name: "Member Details", visible: true, defaultExpanded: true },
        { name: "Nominee Details", visible: true, defaultExpanded: true },
        // { name: "c3", visible: true },
      ];
      break;
    case 3:
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        // { name: "d2", visible: true },
        // { name: "d3", visible: true },
      ];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;
  // let destinData = [];
  const handleSetAutoComplete = async (e, v, type) => {
    if (type === "partnerName") {
      lDto.PartnerDetails.partnerCode = v.mID;
      lDto.PartnerDetails[type] = v.mValue;
      const policyonpartnerid = await getMasterPolicyOnPartnerID(v.mID);
      if (policyonpartnerid.status === 200) {
        if (policyonpartnerid.data[0].mValue > 0) {
          console.log("partneridd", policyonpartnerid);
          lMasters.selectmaster = policyonpartnerid.data;

          const Product = await getAssignProductOnPartnerID(v.mID);

          if (Product.status === 200) {
            lMasters.Policyid = Product.data[0].policyId;
            lMasters.productidpk = Product.data[0].productIdPk;
            // setPolicyid(Product.data[0].policyId);
            // setProductidpk(Product.data[0].productIdPk);
            lDto.ProductId = lDto.PartnerDetails.productId;

            const partnerdetails = await getPartnerDetailsonpartnerId(v.mID);

            if (partnerdetails.status === 200) {
              console.log("partnerdetails", partnerdetails);
              const sdate = Product.data[0].policyStartDate.split("T")[0];
              lDto.MasterPolicyStartDate = sdate;
              const edate = Product.data[0].policyEndDate.split("T")[0];
              lDto.MasterPolicyEndDate = edate;
              const numberofpolicy = Product.data[0].policyNo;
              lDto.PartnerDetails.accountNo = numberofpolicy;
              // console.log("date1", TInfinityDto);
            }
          }

          const Data = await PartnerAccountSearchCd(dto.PartnerDetails);
          console.log("SearchData", Data);

          // setInfinityDto((prevState) => ({
          //   ...prevState,
          //   ...TInfinityDto,
          // }));
          // console.log("fill", TInfinityDto);

          // setpoly(true);
        }
      }
    }
    if (type === "masterPolicyNo") {
      lDto.PartnerDetails[type] = v.mValue;
      lDto.PartnerDetails.Plan = "";

      // setInfinityDto((prevState) => ({
      //   ...prevState,
      //   ...TInfinityDto,
      // }));

      // setplanflag(true);

      if (masters.productidpk !== "") {
        const productById = await getProductById(masters.productidpk);

        const group = productById.groupDTO[0].groupTypeId;
        lMasters.grouptypeID = group;
        // setGrouptypeID(group);
        // console.log("groupDTO", grouptypeID, "group", group);
      }

      const planonmaster = await getPlanOnMasterPolicy(masters.Policyid);

      console.log("PLANNDATA", planonmaster);

      if (planonmaster.length >= 0) {
        console.log("planonmaster", planonmaster);
        lMasters.planData = planonmaster;
        // setplanData([...planonmaster]);
        // setInfinityDto((prevState) => ({
        //   ...prevState,
        //   ...TInfinityDto,
        // }));

        // setplanflag(false);
      } else {
        swal({
          text: "Sorry No plan Found! Try again",
          icon: "error",
        });
      }
      // setplanData([...planonmaster]);
      // // setplanflag(false);
    }
    if (type === "Plan") {
      lDto[type] = v.mValue;

      lDto.Geography = "";
      lMasters.groupID = v.mID;
      // setGroupID(value1.mID);
      lDto.GroupId = v.mID;
      // console.log("groupid od plan", groupID);

      const Data = await getPlanDetailsOnGroupId(v.mID);
      console.log("grouping dataaaaaa", Data);

      Data.forEach((item) => {
        if (item.mType === "Region") {
          // setgeography(item.mdata);
          lMasters.geography = item.mdata;
        }
        if (item.mType === "SI") {
          // setsuminsure(item.mdata);
          lMasters.suminsure = item.mdata;
        }
        if (item.mType === "Type") {
          // settripType(item.mdata);
          lMasters.tripType = item.mdata;
        }
      });

      console.log("gro", Data);

      // setInfinityDto((prevState) => ({
      //   ...prevState,
      //   ...TInfinityDto,
      // }));
    }
    if (type === "Geography") {
      lDto[type] = v.mValue;
      lDto.SumInsured = "";

      lDto.FilterCriteria.Region = v.mValue;

      if (lDto[type] === "DOM") {
        lDto.FilterCriteria.currency = "INR";
        lDto.Currency = "INR";

        await GetAllMasterData("Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });

          // console.log("lod", destinationdata);
        });
      } else if (lDto[type] === "APAC") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";

        await GetAllMasterData("APAC").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });
        });
      } else if (lDto[type] === "WW" || lDto[type] === "WWIC") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";
        await GetAllMasterData("Worldwide").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });

          // console.log("lod", destinationdata);
        });
      } else if (lDto[type] === "WWX" || lDto[type] === "WWEU") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";
        await GetAllMasterData("Worldwide Excluding US/Canada").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });
        });
      } else if (lDto[type] === "APAC_DOM") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";
        await GetAllMasterData("APAC With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });
        });
      } else if (lDto[type] === "WW_DOM" || lDto[type] === "WWIC_DOM") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";
        await GetAllMasterData("Worldwide incl USA/Canada With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });
        });
      } else if (lDto[type] === "WWX_DOM" || lDto[type] === "WWEU_DOM") {
        lDto.FilterCriteria.currency = "USD";
        lDto.Currency = "USD";
        await GetAllMasterData("Worldwide excl USA/Canada With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            // setdestinationdata(x.mdata);
            lMasters.destinationdata = x.mdata;
          });
        });
      }
      // setgeographydata(value1.mValue);
      lMasters.geographydata = v.mValue;

      // setInfinityDto((prevState) => ({
      //   ...prevState,
      //   ...TInfinityDto,
      // }));
    }
    if (type === "SumInsured") {
      lDto[type] = v.mValue;
      lDto.TripType = "";
      lDto.FilterCriteria.SI = v.mValue;
      // setsuminsuredata(value1.mValue);
      lMasters.suminsuredata = v.mValue;
      // setInfinityDto((prevState) => ({
      //   ...prevState,
      //   ...TInfinityDto,
      // }));
    }
    if (type === "TripType") {
      lDto[type] = v.mValue;
      lDto.FilterCriteria.Type = v.mValue;
      // settripTypedata(value1.mValue);
      lMasters.tripTypedata = v.mValue;
      // console.log("tripTypedata", tripTypedata);

      // setgridflag(true);
      const plancovers = {
        productId: masters.productidpk,
        groupId: masters.groupID,
        filterCriteria: {
          SI: masters.suminsuredata,
          Type: v.mValue,
          Region: masters.geographydata,
          currency: lDto.FilterCriteria.currency,
        },
      };

      const Data = await GetPolicyTripTenureMaster(lDto.ProductId, lDto.TripType);
      // settriptenuredata([...Data.data]);
      lMasters.triptenuredata = Data.data;
      // setplanflag(true);

      const benefitList = await getGroupingDetails(plancovers);
      // setplanflag(false);
      if (benefitList.data.sectionMappingDetails === null) {
        swal({
          icon: "error",
          text: "The selected combination for Plan, Geography, Sum Insured and Trip type does not exist/Delayed response, please try again",
          buttons: {
            buttonTwo: {
              text: "OK",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            window.location.reload();
          }
        });
      } else {
        // setbenefitList1(benefitList.data.sectionMappingDetails.BenefitDetails);
        lMasters.benefitList1 = benefitList.data.sectionMappingDetails.BenefitDetails;
        // console.log("TInfinityDto", TInfinityDto);
        lDto.BenefitList = benefitList.data.sectionMappingDetails.BenefitDetails;
        // settableflag(true);
      }
    }
    if (type === "ListOfDestination") {
      // destinData = [...v];
      // const arr = [];
      // v.forEach((x) => {
      //   arr.push(x.mValue);
      // });

      lDto[type] = v.mValue;
      // v.forEach((item) => {
      //   lMasters.DestinationType.push(item.mValue);
      //   lDto[type] = [...lMasters.DestinationType].join(",");
      // });
    }
    if (type === "NOOfDays") {
      lDto[type] = v.mID;
      // const nooftraveldays = value1.mID;

      if (type === "NOOfDays" && lDto.TripType === "StudentTravel") {
        const currDup1 = lDto.TripStartDate;
        const currDup = new Date(currDup1);

        const tripend = new Date(currDup.setDate(currDup.getDate() + (lDto.NOOfDays - 1)));
        const format2 = tripend;
        const tripend2 = [format2.getFullYear(), format2.getMonth() + 1, format2.getDate()].join(
          "-"
        );
        console.log("dateofend", tripend2);
        let [yyyy1, mmm1, ddd1] = tripend2.split("-");
        if (mmm1 <= 9) {
          mmm1 = `0${mmm1}`;
        }
        if (ddd1 <= 9) {
          ddd1 = `0${ddd1}`;
        }
        yyyy1 = `${yyyy1}`;
        const tdate = `${yyyy1}-${mmm1}-${ddd1}`;
        lDto.TripEndDate = tdate;

        lDto.PolicyEndDate = lDto.TripEndDate;
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onDateChange = async (e, type, date) => {
    switch (dto.TripType) {
      case "SingleTrip":
        if (type === "PolicyStartDate") {
          lDto.PolicyStartDate = date;
          lDto.TripStartDate = lDto.PolicyStartDate;

          lDto.PolicyEndDate = "";

          lDto.TripEndDate = "";
          lDto.NOOfDays = "";
        } else if (type === "PolicyEndDate") {
          if (lDto.PolicyStartDate <= date) {
            lDto.PolicyEndDate = date;

            lDto.TripEndDate = lDto.PolicyEndDate;
            const d1 = lDto.TripStartDate.split("-");
            const d2 = date.split("-");
            const date1 = new Date([d1[1], d1[2], d1[0]].join("-"));
            const date2 = new Date([d2[1], d2[2], d2[0]].join("-"));
            const difference = date2.getTime() - date1.getTime();
            const nodays = difference / (1000 * 3600 * 24);
            const days = nodays + 1;

            lDto.NOOfDays = days.toString();
            console.log("10101", days);
          } else {
            lDto.TripEndDate = "";

            swal({
              text: " Trip End Date is Invalid!",
              icon: "error",
            });
          }

          break;
        }

        break;

      case "MultiTrip": {
        const today = e[0];

        const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const mm1 = date1.getMonth().toString();
        const dd1 = date1.getDate().toString();
        if (dd1 === 31 && mm1 === 0) {
          date1.setMonth(0);

          date1.setFullYear(date1.getFullYear() + 1);
        } else {
          date1.setFullYear(date1.getFullYear() + 1);
        }

        date1.setDate(date1.getDate() - 1);

        const format = date1;
        const finald = [format.getFullYear(), format.getMonth() + 1, format.getDate()].join("-");

        let [yyyy1, mmm1, ddd1] = finald.split("-");
        if (mmm1 <= 9) {
          // mm1 = "0" + mm1;
          mmm1 = `0${mmm1}`;
        }
        if (ddd1 <= 9) {
          // dd1 = "0" + dd1;
          ddd1 = `0${ddd1}`;
        }
        yyyy1 = `${yyyy1}`;
        const ddate = `${yyyy1}-${mmm1}-${ddd1}`;

        if (type === "PolicyStartDate") {
          lDto[type] = date;
          lDto.NOOfDays = "";
          lDto.TripEndDate = ddate;
          lDto.TripStartDate = date;
          lDto.PolicyEndDate = ddate;
        }

        break;
      }
      case "StudentTravel":
        if (type === "PolicyStartDate") {
          lDto[type] = date;
          lDto.TripEndDate = "";
          lDto.NOOfDays = "";

          lDto.TripStartDate = date;
          lDto.PolicyEndDate = "";
        }
        break;

      default: {
        console.log("wrong date");
      }
    }

    if (lDto.TripType === "SingleTrip" && lDto.Geography !== "DOM") {
      if (lDto.NOOfDays > 180) {
        lDto.NOOfDays = "";
        lDto.TripEndDate = "NA";

        swal({
          text: "This policy does not cover Travel days beyond 180 days",
          icon: "error",
        });
      }
    } else if (lDto.TripType === "SingleTrip" && lDto.Geography === "DOM" && lDto.NOOfDays > 30) {
      lDto.NOOfDays = "";
      lDto.TripEndDate = "NA";
      swal({
        text: "This policy does not cover Travel days beyond 30",
        icon: "error",
      });
    }
    setDto({ ...lDto });
  };

  const onOpen = () => {
    lMasters.addFlag = true;
    setMasters({ ...lMasters });
  };

  useEffect(() => {
    let timer;
    if (lMasters.proposerProps.counter > 0 && lMasters.proposerProps.startCounterFlag) {
      timer = setTimeout(() => {
        lMasters.proposerProps.counter -= 1;
        lMasters.proposerProps.sendOtpFlag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.proposerProps.counter === 0) {
      lMasters.proposerProps.counter = 30;
      lMasters.proposerProps.startCounterFlag = false;
      lMasters.proposerProps.timerFlag = true;
      lMasters.proposerProps.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [masters.proposerProps.counter, masters.proposerProps.startCounterFlag]);

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Select Partner",
            visible: true,
            spacing: 3,
            path: `PartnerDetails.partnerName`,
            options: masters.partnerlist,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "partnerName"),
          },

          {
            type: "AutoComplete",
            label: "Select Master Policy",
            visible: true,
            spacing: 3,
            path: `PartnerDetails.masterPolicyNo`,
            options: masters.selectmaster,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "masterPolicyNo"),
          },
          {
            type: "AutoComplete",
            label: "Plan",
            visible: true,
            spacing: 3,
            path: `Plan`,
            options: masters.planData,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "Plan"),
          },
          {
            type: "AutoComplete",
            label: "Geography",
            visible: true,
            spacing: 3,
            path: `Geography`,
            options: masters.geography,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "Geography"),
          },
          {
            type: "AutoComplete",
            label: "Sum Insured",
            visible: true,
            spacing: 3,
            path: `SumInsured`,
            options: masters.suminsure,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "SumInsured"),
          },
          {
            type: "AutoComplete",
            label: "Trip Type",
            visible: true,
            spacing: 3,
            path: `TripType`,
            options: masters.tripType,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "TripType"),
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "CoverName",
            path: "BenefitList",
            rowPerPage: 20,
            columns: [
              // {
              //   field: "SNo",
              //   headerName: "S. No",
              //   width: 80,
              // },
              // {
              //   field: "MaturityDate",
              //   headerName: "Maturity Date",
              //   width: 200,
              // },
              {
                field: "CoverName",
                headerName: "Cover Name",
                width: 350,
              },
              {
                field: "Value",
                headerName: "Benefit Amount",
                width: 300,
              },
              {
                field: "Deductible",
                headerName: "Benefit Deductible Value",
                width: 300,
              },
              {
                field: "DeductibleType",
                headerName: "Deductible Type",
                width: 300,
              },
            ],
          },
        ],
        [
          {
            type: "MDDatePicker",
            label: "Master Policy Start Date",
            visible: true,
            dateFormat: "Y-m-d",
            spacing: 3,
            path: `MasterPolicyStartDate`,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Master Policy End Date",
            visible: true,
            dateFormat: "Y-m-d",
            path: "MasterPolicyEndDate",
            spacing: 3,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            dateFormat: "Y-m-d",
            altFormat: "d/m/Y",
            altInput: true,
            path: "PolicyStartDate",
            spacing: 3,
            customOnChange: (e, d) => onDateChange(e, "PolicyStartDate", d),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            dateFormat: "Y-m-d",
            path: "PolicyEndDate",
            spacing: 3,
            altFormat: "d/m/Y",
            altInput: true,
            customOnChange: (e, d) => onDateChange(e, "PolicyEndDate", d),
          },
          {
            type: "MDDatePicker",
            label: "Travel Start Date",
            visible: true,
            dateFormat: "Y-m-d",
            path: "PolicyStartDate",
            disabled: true,
            spacing: 3,
          },
          {
            type: "MDDatePicker",
            label: "Travel End Date",
            visible: true,
            dateFormat: "Y-m-d",
            path: "PolicyEndDate",
            disabled: true,
            spacing: 3,
          },
          {
            type: "Input",
            label: "No of Days",
            visible: dto.TripType === "SingleTrip",
            spacing: 3,
            disabled: true,
            path: `NOOfDays`,
          },
          {
            type: "AutoComplete",
            label: "No of Days",
            visible: dto.TripType !== "SingleTrip",
            spacing: 3,
            path: `NOOfDays`,
            options: masters.triptenuredata,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "NOOfDays"),
          },
          {
            type: "AutoComplete",
            label: "Countries To Visit",
            visible: true,
            spacing: 3,
            path: `ListOfDestination`,
            // multiple: true,
            // value: [...destinData],
            // value: dto.ListOfDestination,
            options: masters.destinationdata,
            disableOnReset: false,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "ListOfDestination"),
          },
        ],
        [
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: `QuoteEmail`,
            spacing: 3,
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: `QuoteMobileNo`,
            spacing: 3,
          },
        ],
      ];
      break;
    case 1:
      data = ProposalDetails({
        dto,
        setDto,
        masters,
        setMasters,
      });
      break;
    case 2:
      data = [
        [
          // {
          //   type: "Custom",
          //   label: "",
          //   visible: true,
          //   spacing: 9,
          // },
          {
            type: "Button",
            label: "Add Member",
            visible: true,
            spacing: 3,
            onClick: onOpen,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 8,
            return: (
              <MemberDetails dto={dto} setDto={setDto} masters={masters} setMasters={setMasters} />
            ),
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            path: "InsurableItem.0.RiskItems",
            rowPerPage: 20,
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
              },
              {
                field: "Action",
                headerName: "Action",
                width: 80,
                renderCell: (params) => {
                  console.log("params", params);
                  const onDelete = () => {
                    const updatedData = dto.InsurableItem[0].RiskItems.filter(
                      (item) => item.SNo !== params.row.SNo
                    );
                    lDto.InsurableItem[0].RiskItems = updatedData;
                    updatedData.forEach((x, i) => {
                      updatedData[i].SNo = i + 1;
                    });
                  };

                  const onEdit = () => {
                    lMasters.addFlag = true;
                    lMasters.editFlag = true;
                    lMasters.rowId = params.row.SNo;
                    lMasters.newRisk.Name = params.row.Name;
                    lMasters.newRisk.Gender = params.row.Gender;
                    lMasters.newRisk.DOB = params.row.DOB;
                    lMasters.newRisk.MAge = params.row.MAge;
                    lMasters.newRisk.relationShipToProposer = params.row.relationShipToProposer;
                    lMasters.newRisk.Nationality = params.row.Nationality;
                    lMasters.newRisk.PassportNo = params.row.PassportNo;
                    lMasters.newRisk.MobileNoMember = params.row.MobileNoMember;
                    lMasters.RelationWithInsured = "";
                    lMasters.VisaType = " ";
                    setMasters({ ...lMasters });
                  };
                  return (
                    <>
                      <EditIcon color="primary" onClick={() => onEdit()} />
                      <DeleteIcon color="primary" onClick={() => onDelete()} />
                    </>
                  );
                },
              },
              {
                field: "Name",
                headerName: "Names",
                width: 200,
              },
              {
                field: "Gender",
                headerName: "Gender",
                width: 200,
              },
              {
                field: "DOB",
                headerName: "Date of Birth",
                width: 200,
              },
              {
                field: "MAge",
                headerName: "Age",
                width: 200,
              },
              {
                field: "relationShipToProposer",
                headerName: "Relationship with Proposer",
                width: 200,
              },
              {
                field: "Nationality",
                headerName: "Nationality",
                width: 200,
              },
              {
                field: "PassportNo",
                headerName: "Passport Number",
                width: 200,
              },
              {
                field: "MobileNoMember",
                headerName: "Mobile Number",
                width: 200,
              },
            ],
          },
        ],
        [
          {
            type: "Input",
            label: "Nominee Name",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeName`,
          },
          {
            type: "MDDatePicker",
            label: "Nominee Date of Birth",
            visible: true,
            dateFormat: "Y-m-d",
            path: `NomineeDetails[0].NomineeDOB`,
            spacing: 3,
          },
          {
            type: "Input",
            label: "Nominee Relationship",
            visible: true,
            path: `NomineeDetails[0].NomineeRelationWithProposer`,
            spacing: 3,
          },
          {
            type: "Input",
            label: "Email Id",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeEmailID`,
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeMobile`,
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            path: `NomineeDetails[0].NomineePincode`,
            spacing: 3,
          },
          {
            type: "Input",
            label: "City/District",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeCity`,
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeState`,
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeAddressLine1`,
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeAddressLine2`,
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: true,
            spacing: 3,
            path: `NomineeDetails[0].NomineeAddressLine3`,
          },
        ],
        [],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Custom",
            spacing: 1,
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Payment Type *", labelVisible: true },
            radioList: [
              { value: "ClientPayment", label: "Client Payment" },
              { value: "AgentPayment", label: "Agent Payment" },
            ],
            path: "PaymentDetails.paymentType",
            spacing: 11,
          },
          {
            type: "Custom",
            visible:
              dto.PaymentDetails.paymentType === "ClientPayment" ||
              dto.PaymentDetails.paymentType === "AgentPayment",
            spacing: 12,
            return: <Payment dto={dto} setDto={setDto} masters={masters} setMasters={setMasters} />,
          },
        ],
      ];
      break;
    case 4:
      data = [[], [], []];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep, dto, setDto, masters, setMasters }) => {
  let fun = true;
  const lDto = dto;
  const lMasters = masters;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      lDto.ProposerDetails.DOB = formatDate(dto.ProposerDetails.DOB);
      console.log("DOB", lDto.ProposerDetails.DOB);
      setDto({ ...lDto });
      fun = true;

      break;
    case 2:
      {
        lDto.NoOfTravellers = String(dto.InsurableItem[0].RiskItems.length);
        lDto.NOOfTravellers = String(dto.InsurableItem[0].RiskItems.length);
        // lDto.ProposerDetails.DOB = formatPolDate(dto.ProposerDetails.DOB);

        setDto({ ...lDto });

        const mDto = { ...dto };
        objectPath.del(mDto, "ProposerDetails.Age");
        const Data = await calculatePremium(mDto);
        lDto.PaymentDetails.ChequeAmount = Data.data.premiumDetail.TotalPremium;
        lDto.PremiumDetails["Net Premium"] = Data.data.premiumDetail.BasicPremium;
        lDto.PremiumDetails.GST =
          Number(Data.data.premiumDetail.TaxDetails[0].Amount) +
          Number(Data.data.premiumDetail.TaxDetails[1].Amount) +
          Number(Data.data.premiumDetail.TaxDetails[2].Amount);
        lDto.PremiumDetails.GrossPremium = Data.data.premiumDetail.BasicPremium;
        lDto.PremiumDetails["Total with Tax"] = Data.data.premiumDetail.TotalPremium;
        lDto.PremiumDetails.TotalPremium = Data.data.premiumDetail.TotalPremium;
        lDto.PremiumDetails.CGST = Data.data.premiumDetail.TaxDetails[0].Amount;
        lDto.PremiumDetails.SGST = Data.data.premiumDetail.TaxDetails[1].Amount;
        console.log("Data", Data);
        setDto({ ...lDto });

        const res = await calculateProposal(dto);
        console.log("res", res);
        lDto.proposalNumber = res.data.proposalNumber;
        lMasters.SavePymtDTO.proposalNo = res.data.proposalNumber;
        setDto({ ...lDto });
        setMasters({ ...lMasters });

        const res1 = await fetchPaymentURL(
          1204,
          dto.proposalNumber,
          dto.PremiumDetails["Total with Tax"]
        );
        lDto.TransactionID = res1.transactionID;
        lMasters.SavePymtDTO.paymentDetailsDTO.transactionNo = res1.transactionID;
        lDto.PaymentDetails.paymentRefNo = res1.paymentRefNo;
        lMasters.bodyData.firstname = dto.ProposerDetails["First Name"];
        lMasters.bodyData.email = dto.QuoteEmail;
        lMasters.bodyData.phone = dto.QuoteMobileNo;
        lMasters.bodyData.txnid = res1.transactionID;
        lMasters.bodyData.amount = dto.PremiumDetails["Total with Tax"];
        lMasters.bodyData.surl = res1.surl;
        lMasters.bodyData.furl = res1.furl;
        setDto({ ...lDto });
        setMasters({ ...lMasters });

        fun = true;
      }

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
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
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

const getMasterData = async () => {
  const mst = {
    proposerProps: {
      tabIndex: 0,
      cancelIcon: false,
      var: { status: "" },
      commCD: "",
      permCD: "",
      sendOtpFlag: true,
      timerFlag: false,
      counter: 30,
      status: false,
      startCounterFlag: false,
      otpflag: false,
    },
    bodyData: {
      key: "7Y4RPX",
      txnid: "",
      amount: "",
      productinfo: "GruopTravel",
      firstname: "",
      email: "",
      phone: "",
      surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
      furl: "/paymentfailure",
      salt: "hl8aISlY",
    },
    SavePymtDTO: {
      paymentDetailsDTO: {
        ChequeAmount: "",
        InstrumentNo: "",
        InstrumentDate: "",
        BankName: "",
        transactionNo: "",
        paymentSource: "CHEQUE",
        paymentId: "",
        paymentResponse: "",
      },
      proposalNo: "",
      policyNo: "",
    },

    newRisk: {
      SNo: "",
      Name: "",
      Gender: "",
      DOB: "",
      MAge: "",
      relationShipToProposer: "",
      Nationality: "",
      PassportNo: "",
      MobileNoMember: "",
      RelationWithInsured: "",
      VisaType: " ",
    },
    addFlag: false,
    editFlag: false,
    errRisk: false,
  };
  const partnerlist = await getGroupPartnerList();
  mst.partnerlist = partnerlist;
  const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
  const doc = await GetProdPartnermasterData(1037, "DocumentsNameWC", {
    MasterType: "DocumentsNameWC",
  });
  mst.doc = doc;

  const HypothecationCPM = await GetProdPartnermasterData(1039, "HypothecationCPM", {
    MasterType: "HypothecationCPM",
  });
  mst.HypothecationCPM = HypothecationCPM;
  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
